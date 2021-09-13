<script context="module">
import {DIM,isSafari,infoExpanded,getLocalStorage,subLocalStorage} from '../stores.js';
import {cameraOn,hideCamera,videoReady,videoEl} from './webcam.svelte';
import {writable,get} from 'svelte/store'
import {cameraConfig} from '../scene/CameraControls.svelte'

 export const options = writable({
   //Face Options
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
  // Pose Options
  holistic:{
    running:false,
    enable:!isSafari ? true : true,
    model:{
      modelComplexity: 1,
      smoothLandmarks: true,
      minDetectionConfidence: 0.7,
      minTrackingConfidence: 0.7
    },
    predict:{
      flipHorizontal:true,
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
import * as poseDetection from '@tensorflow-models/pose-detection';
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
import {onHolisticResults,onPoseResults} from './onHolisticResults.svelte'
import {sendTrackingData} from "./sendTrackingToPeer.svelte"
  
let holistic,facemesh,poseModel,poseDetector;  
//INIT FACEMESH
async function initFacemesh() {
  await tf.setBackend('webgl');
  facemesh = await faceLandmarksDetection.load(
    faceLandmarksDetection.SupportedPackages.mediapipeFacemesh,
    $options.face.model);
}
initFacemesh()

// INIT 3D POSE
async function initPose() {
    await tf.setBackend('webgl');
   poseModel = poseDetection.SupportedModels.BlazePose;
  const detectorConfig = {
    runtime: 'tfjs', // or 'mediapipe'
    modelType: 'lite',
    enableSmoothing: true
  };
  poseDetector = await poseDetection.createDetector(poseModel, detectorConfig);
      console.log(poseDetection,poseModel,poseDetector)

} 

  
//INIT HOLISTIC
async function initHolistic() {
  holistic = new Holistic({locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic@0.4.1628005088/${file}`;
  }});

  holistic.setOptions($options.holistic.model);
  holistic.onResults(onHolisticResults); //holistic has callback function
} 
  
if(isSafari){
  //load pose model if on safari since mediapipe backend doesn't support WebGL
   initPose()
}else{
  //load holistic model if not safari
  initHolistic()
   // initPose()

}

  


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
        if(poseDetector){
          // const timestamp = performance.now();
          const poses = await poseDetector.estimatePoses(videoEl,{flipHorizontal:true});
          if(poses.length>0){
            onPoseResults(poses[0])
          }
        }else{
          await holistic.send({image: videoEl});
        }
      }
    
      $profiles.user.detected = true;
      requestAnimationFrame(predict);
  }  
}
  
$:{
  if($videoReady && $cameraOn && (holistic || poseDetector) && facemesh && !$infoExpanded){
    predict();
  }
}

$:{
  $profiles.user.tracking.Face.enable = $options.face.enable
  $profiles.user.tracking.Pose.enable = $options.holistic.enable
}
  

  
</script>

<!-- FOR TESTING -->

<!-- {#if $options.holistic.running}
{#each ['Right','Left'] as side}
  <ul id={side} class="stats">
    <li>
      <label>Upper Leg</label>
      <p>x:{$profiles.user.tracking.pose[side+'UpperLeg'].x.toFixed(2)}</p>
      <p>y:{$profiles.user.tracking.pose[side+'UpperLeg'].y.toFixed(2)}</p>
      <p>z:{$profiles.user.tracking.pose[side+'UpperLeg'].z.toFixed(2)}</p>
    </li>
    <li>
      <label>Lower Leg</label>
      <p>x:{$profiles.user.tracking.pose[side+'UpperLeg'].x.toFixed(2)}</p>
      <p>y:{$profiles.user.tracking.pose[side+'UpperLeg'].y.toFixed(2)}</p>
      <p>z:{$profiles.user.tracking.pose[side+'UpperLeg'].z.toFixed(2)}</p>
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
      width:200px;
    list-style:none;
    margin: 0;
    padding: 0;
    pointer-events:none;
  }
  label{
    font-size:12px;
    margin:0;
  }
  p{
    font-size:48px;
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