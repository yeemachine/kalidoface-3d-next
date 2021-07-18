<script>
import {onMount} from 'svelte';
import { spring } from 'svelte/motion';
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';
import * as tf from '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';
// import * as tfjsWasm from '@tensorflow/tfjs-backend-wasm';
// tfjsWasm.setWasmPaths(
//     `https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-wasm@${tfjsWasm.version_wasm}/dist/`);
// import {facePoints} from '../scene/pixi.cam.svelte';
import faceMap from '../utils/faceMap/faceMap.js'
// import {drawFace} from '../utils/faceMap/drawPoints.js'
import {p2pConnection} from '../connections/Peer.svelte';
import {DIM} from '../stores.js';
import {cameraOn,hideCamera,videoReady,videoEl} from './webcam.svelte';
import {profiles} from '../scene/character.svelte'
import {pipEnabled} from '../scene/pip.svelte';

let mlModel;
  
let user_smooth = spring({
  eye:{l:1,r:1},
  mouth:{x:0,y:0},
  head:{x:0,y:0,z:0},
  brow:0,
  pupil:{x:0,y:0}
  }, {
  stiffness: 0.15,
  damping: 0.7
});
  
user_smooth.subscribe(val=>{
  $profiles.user.tracking.head = val.head
  if(val.head.x >= -29 && val.head.x <= 29 && val.head.y >= -29 && val.head.y <= 29){
    $profiles.user.tracking.brow = val.brow
    let stabilizedBlink = faceMap.stabilizeBlink(val.eye,$profiles.user.tracking.head.x)
    $profiles.user.tracking.eye = stabilizedBlink
    if(stabilizedBlink.r >.5 && stabilizedBlink.l > .5){
      $profiles.user.tracking.pupil = val.pupil  
    }
    $profiles.user.tracking.mouth = val.mouth
  }
})
  
let config = {
  model:{
      maxContinuousChecks:5,
      detectionConfidence:.9,
      maxFaces:1,
      iouThreshold:.3,
      scoreThreshold:.85
  },
  predict:{
      input: $videoEl,
      returnTensors:false,
      flipHorizontal:false,
      predictIrises:true
  }
}
$: config.predict.input = $videoEl

async function init() {
  
  await tf.setBackend('webgl');
  mlModel = await faceLandmarksDetection.load(
    faceLandmarksDetection.SupportedPackages.mediapipeFacemesh,
    config.model);
}

async function predict(){

      if(!$videoReady || !$cameraOn){
          $profiles.user.detected = false;
          // facePoints.clear()
          return
      }else{
          $profiles.user.detected = true;
          
          const predictions = await mlModel.estimateFaces(config.predict);
          if (predictions.length > 0) {
              // facePoints.clear()
              // $pointsOverlay.clear();
                  //track 1 face
                  const lm = predictions[0].scaledMesh
                  const normalizedFace = faceMap.update(lm)
                  user_smooth.set({
                    eye:normalizedFace.eye,
                    mouth:normalizedFace.mouth,
                    head:normalizedFace.head,
                    brow:normalizedFace.brow,
                    pupil:normalizedFace.pupil
                  })

                  //only send face tracking when connected
                  if($p2pConnection){
                      $p2pConnection.send({
                        headX: normalizedFace.head.x,
                        headY: normalizedFace.head.y,
                        headZ: normalizedFace.head.z,
                        eyeL: normalizedFace.eye.l,
                        eyeR: normalizedFace.eye.r,
                        brow: normalizedFace.brow,
                        pupilX: normalizedFace.pupil.x,
                        pupilY: normalizedFace.pupil.y,
                        mouthX: normalizedFace.mouth.x,
                        mouthY: normalizedFace.mouth.y,
                        detected: $profiles.user.detected,
                        type: 'tracking'
                      })
                  } 

                  // draw landmark face guides
                  // if (!$hideCamera && $videoReady && !$pipEnabled) {
                  //   drawFace(lm,facePoints, $videoEl, $DIM)
                  // }

          }
          requestAnimationFrame(predict);
      }  
}
  
$:{
  if($videoReady && $cameraOn && mlModel){
    predict();
  }
}
  
onMount(()=>{
  init()
}) 
  

  
</script>

<!-- <p style="position:fixed;top:-40px;left:10px;z-index:999;color:white;font-size:48px">
  {fps.toFixed(0)}
</p> -->