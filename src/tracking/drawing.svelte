<script context="module">
import '@mediapipe/drawing_utils/drawing_utils';
import {videoEl,canvasEl,canvasCtx} from './webcam.svelte';
import { get } from 'svelte/store';

export function drawResults(results,type="holistic") {
  canvasEl.width = videoEl.videoWidth;
  canvasEl.height = videoEl.videoHeight;
  canvasCtx.save();
  canvasCtx.clearRect(0, 0, canvasEl.width, canvasEl.height);
  // canvasCtx.drawImage(
  //   videoEl,
  //   0,
  //   0,
  //   canvasEl.width,
  //   canvasEl.height
  // );
  switch (type){
    case 'holistic':
        drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS, {
          color: "#00cff7",
          lineWidth: 4
        });
        drawLandmarks(canvasCtx, results.poseLandmarks, {
          color: "#ff0364",
          lineWidth: 2
        });
        drawConnectors(canvasCtx, results.faceLandmarks, FACEMESH_TESSELATION, {
          color: "#C0C0C070",
          lineWidth: 1
        });
        drawConnectors(canvasCtx, results.leftHandLandmarks, HAND_CONNECTIONS, {
          color: "#eb1064",
          lineWidth: 5
        });
        drawLandmarks(canvasCtx, results.leftHandLandmarks, {
          color: "#00cff7",
          lineWidth: 2
        });
        drawConnectors(canvasCtx, results.rightHandLandmarks, HAND_CONNECTIONS, {
          color: "#22c3e3",
          lineWidth: 5
        });
        drawLandmarks(canvasCtx, results.rightHandLandmarks, {
          color: "#ff0364",
          lineWidth: 2
        });
      break;
    case 'facemesh':
       let lm = []
       for(let i=0;i<results.scaledMesh.length;i++){
         lm.push({
           visibility:undefined,
           x:results.scaledMesh[i][0]/videoEl.videoWidth,
           y:results.scaledMesh[i][1]/videoEl.videoHeight,
           z:results.scaledMesh[i][2]/videoEl.videoWidth
          })
       }
      drawConnectors(canvasCtx, lm, FACEMESH_TESSELATION, {
          color: "#C0C0C070",
          lineWidth: 1
        });
      let pupils = [lm[468],lm[468+5]]
      drawLandmarks(canvasCtx, pupils, {
          color: "#ffe603",
          lineWidth: 2
      });
       
      break;
    default:
      break;
  }


  canvasCtx.restore();
}
</script>