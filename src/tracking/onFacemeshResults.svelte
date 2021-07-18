<script context="module">
import { get } from 'svelte/store';
import faceMap,{stabilizeBlink} from '../utils/faceMap/index.js'
import {user_smooth_face,user_face_position} from './smooth.svelte';
import {profiles} from '../scene/profiles.svelte'
import {options} from './Holistic.svelte';
import {drawResults} from './drawing.svelte'
import {videoEl} from './webcam.svelte';
import {cameraConfig} from '../scene/CameraControls.svelte'
import {threshold} from '../utils/helpers.js'
import {p2pConnection} from '../connections/Peer.svelte'
import {sendTrackingData} from "./sendTrackingToPeer.svelte"

export let newFace = {
  eye:{l:1,r:1},
  mouth:{x:0,y:0,shape:{A:0,E:0,I:0,O:0,U:0}},
  head:{
    x:0,
    y:0,
    z:0,
    width:.3,
    height:.6,
    center:{
      x:0.5,y:0.5,z:0
    }
  },
  brow:0,
  pupil:{x:0,y:0}
}
export let setFace = (a) => {
  newFace = a
}

export function onFacemeshResults(results){
  
   const profile = get(profiles).user
   let flipHorizontal = get(cameraConfig).firstPerson && get(cameraConfig).freeCamera;
  
   if (results.length > 0) {
     
      if (!get(options).holistic.enable) {
        drawResults(results[0],'facemesh');
      }
     
      const lm = results[0].scaledMesh
      newFace = faceMap.update(lm)
      //don't update pupil if blinking
      if(newFace.eye.r <.5 && newFace.eye.l < .5){
        newFace.pupil = get(user_smooth_face).pupil
      }
     
     //face mesh model gives back unnormalized values
     //normalize at this step
     newFace.head.width /= videoEl.videoWidth
     newFace.head.height /= videoEl.videoHeight
     newFace.head.center.x /= videoEl.videoWidth
     newFace.head.center.y /= videoEl.videoHeight
     newFace.head.x *= flipHorizontal ? -1 : 1
     
     const oldFace = get(user_smooth_face)
     
      user_smooth_face.set({
        eye:newFace.eye,
        mouth:newFace.mouth,
        head:{
          x:newFace.head.x,
          y:newFace.head.y,
          z:newFace.head.z
        },
        brow:newFace.brow,
        pupil:{
          x:threshold(oldFace.pupil.x,newFace.pupil.x,.1),
          y:threshold(oldFace.pupil.y,newFace.pupil.y,.1)
        }
      })
     
     const oldPos = get(user_face_position)
     
     user_face_position.set({
       head:{
          x:newFace.head.x,
          y:newFace.head.y,
          z:newFace.head.z
        },
        width:threshold(oldPos.width,newFace.head.width,.01),
        height:threshold(oldPos.height,newFace.head.height,.01),
        center:{
          x:threshold(oldPos.center.x,newFace.head.center.x,.01),
          y:threshold(oldPos.center.y,newFace.head.center.y,.01),
          z:newFace.head.center.z
        }
     })
     
    if(!get(options).face.running){
      get(options).face.running = true
      options.set(get(options))
    }
    sendTrackingData()
 
     
   }
}
</script>