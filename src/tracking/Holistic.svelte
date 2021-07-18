<script context="module">
import {DIM,isSafari,infoExpanded,getLocalStorage,subLocalStorage} from '../stores.js';
import {cameraOn,hideCamera,videoReady,videoEl} from './webcam.svelte';
import {writable,get} from 'svelte/store'
  
 export const options = writable({
  face:{
    running:false,
    enable:!isSafari ? false : true,
    model:{
      maxContinuousChecks:5,
      detectionConfidence:.9,
      maxFaces:1,
      iouThreshold:.3,
      scoreThreshold:.85
    },
    predict:{
      input: null,
      returnTensors:false,
      flipHorizontal:false,
      predictIrises:true
    }
  },
  holistic:{
    running:false,
    enable:!isSafari ? true : false,
    model:{
      modelComplexity: 1,
  smoothLandmarks: true,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5
    }
  }
}) 
 
getLocalStorage(options,'options',get(options));
  
subLocalStorage(options,'options')  
 

</script>
<script>
import {onMount} from 'svelte';
import { spring } from 'svelte/motion';
import * as THREE from 'three';
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';
import * as tf from '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';
import '@mediapipe/holistic/holistic';

import faceMap,{eyeTracking} from '../utils/faceMap/index.js'
import Vector from '../utils/vector.js'
import {clamp} from '../utils/helpers.js'

import {p2pConnection} from '../connections/Peer.svelte';
import {profiles} from '../scene/profiles.svelte'
import {pipEnabled} from '../scene/pip.svelte';
import {onFacemeshResults} from './onFacemeshResults.svelte'
import {onHolisticResults} from './onHolisticResults.svelte'
import {sendTrackingData} from "./sendTrackingToPeer.svelte"
  
  
let facemesh = null;
  
//INIT FACEMESH
async function initFacemesh() {
  await tf.setBackend('webgl');
  facemesh = await faceLandmarksDetection.load(
    faceLandmarksDetection.SupportedPackages.mediapipeFacemesh,
    $options.face.model);
}
initFacemesh()
  
//INIT HOLISTIC
const holistic = new Holistic({locateFile: (file) => {
  return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`;
}});
holistic.setOptions($options.holistic.model);
holistic.onResults(onHolisticResults); //holistic has callback function

//PREDICTIONS LOOP
async function predict(){
  
  if(!$videoReady || !$cameraOn || $infoExpanded){
      $profiles.user.detected = false;
      $options.face.running = false
      $options.holistic.running = false
      return
  }else{
      
      if($options.face.enable){
        const predictions = await facemesh.estimateFaces({
          input: videoEl,
          returnTensors:$options.face.predict.returnTensors,
          flipHorizontal:$options.face.predict.flipHorizontal,
          predictIrises:$options.face.predict.predictIrises
        });
        onFacemeshResults(predictions)
      }
      
      if($options.holistic.enable){
        await holistic.send({image: videoEl});
      }
    
      $profiles.user.detected = true;
      requestAnimationFrame(predict);
  }  
}
  
$:{
  if($videoReady && $cameraOn && holistic && facemesh && !$infoExpanded){
    predict();
  }
}

$:{
  $profiles.user.tracking.face.enable = $options.face.enable
  $profiles.user.tracking.pose.enable = $options.holistic.enable
}
  
</script>

<!-- FOR TESTING -->

<!-- {#if options.holistic.running}
{#each ['Right','Left'] as side}
  <ul id={side} class="stats">
    <li>
      <label>Head</label>
      <p>x:{$profiles.user.tracking.face.head.normalized.x.toFixed(2)}</p>
      <p>y:{$profiles.user.tracking.face.head.normalized.y.toFixed(2)}</p>
      <p>z:{$profiles.user.tracking.face.head.normalized.z.toFixed(2)}</p>
      <p>width:{$profiles.user.tracking.face.head.width.toFixed(2)}</p>
      <p>height:{$profiles.user.tracking.face.head.height.toFixed(2)}</p>
      <p>centerX:{$profiles.user.tracking.face.head.center.x.toFixed(2)}</p>
      <p>centerY:{$profiles.user.tracking.face.head.center.y.toFixed(2)}</p>
    </li>
     <li>
      <label>Spine</label>
      <p>x:{$profiles.user.tracking.pose['Spine'].x.toFixed(2)}</p>
      <p>y:{$profiles.user.tracking.pose['Spine'].y.toFixed(2)}</p>
      <p>z:{$profiles.user.tracking.pose['Spine'].z.toFixed(2)}</p>
    </li>
    <li>
      <label>Upper Arm</label>
      <p>x:{$profiles.user.tracking.pose[side+'UpperArm'].x.toFixed(2)}</p>
      <p>y:{$profiles.user.tracking.pose[side+'UpperArm'].y.toFixed(2)}</p>
      <p>z:{$profiles.user.tracking.pose[side+'UpperArm'].z.toFixed(2)}</p>
    </li>
    <li>
      <label>Lower Arm</label>
      <p>x:{$profiles.user.tracking.pose[side+'LowerArm'].x.toFixed(2)}</p>
      <p>y:{$profiles.user.tracking.pose[side+'LowerArm'].y.toFixed(2)}</p>
      <p>z:{$profiles.user.tracking.pose[side+'LowerArm'].z.toFixed(2)}</p>
    </li>
    <li>
      <label>Hand</label>
      <p>x:{$profiles.user.tracking.pose[side+'Hand'].x.toFixed(2)}</p>
      <p>y:{$profiles.user.tracking.pose[side+'Hand'].y.toFixed(2)}</p>
      <p>z:{$profiles.user.tracking.pose[side+'Hand'].z.toFixed(2)}</p>
    </li>
  </ul>
{/each}
{/if} -->

<style>
  .stats{
     position:fixed;
    top:10px;
    color:white;
    z-index:999;
      width:120px;
    list-style:none;
    margin: 0;
    padding: 0;
  }
  label{
    font-size:12px;
    margin:0;
  }
  p{
    font-size:24px;
    margin:0;
    margin-left:8px;
  }
  #Left{
    right:10px;
  }
  #Right{
    left:10px;
  }
</style>