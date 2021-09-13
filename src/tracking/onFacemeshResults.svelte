<script context="module">
import { get } from 'svelte/store';
import faceMap,{stabilizeBlink} from '../utils/faceMap/index.js'
import {SpringManager} from './smooth.svelte';
import {profiles} from '../scene/profiles.svelte'
import {options} from './Holistic.svelte';
import {drawResults} from './drawing.svelte'
import {videoEl} from './webcam.svelte';
import {cameraConfig} from '../scene/CameraControls.svelte'
import {threshold} from '../utils/helpers.js'
import {p2pConnection} from '../connections/Peer.svelte'
import {sendTrackingData} from "./sendTrackingToPeer.svelte"
import {newTrackingProfile} from './onHolisticResults.svelte'

export let facelm = null;

export function onFacemeshResults(results){
  
   const profile = get(profiles).user
   let flipHorizontal = get(cameraConfig).firstPerson && get(cameraConfig).freeCamera;
  
   if (results.length > 0) {
      facelm = results[0]
      if(!get(options).holistic.enable){
        drawResults(results[0],'facemesh');
      }
     
     
      const lm = results[0].scaledMesh
      newTrackingProfile.Face = faceMap.update(lm,{type:'facemesh'})
      //don't update pupil if blinking
      if(newTrackingProfile.Face.eye.r <.5 && newTrackingProfile.Face.eye.l < .5){
        newTrackingProfile.Face.pupil = get(SpringManager.user.face).pupil
      }
     
     //face mesh model gives back unnormalized values
     //normalize at this step
     newTrackingProfile.Face.head.width = newTrackingProfile.Face.head.width/videoEl.videoWidth
     newTrackingProfile.Face.head.height = newTrackingProfile.Face.head.height/videoEl.videoHeight
     newTrackingProfile.Face.head.position.x /= videoEl.videoWidth
     newTrackingProfile.Face.head.position.y /= videoEl.videoHeight
     newTrackingProfile.Face.head.y *= flipHorizontal ? -1 : 1
     
     const oldFace = get(SpringManager.user.face)
     
      SpringManager.user.face.set({
        eye:newTrackingProfile.Face.eye,
        mouth:newTrackingProfile.Face.mouth,
        head:newTrackingProfile.Face.head,
        brow:newTrackingProfile.Face.brow,
        pupil:{
          x:threshold(oldFace.pupil.x,newTrackingProfile.Face.pupil.x,.1),
          y:threshold(oldFace.pupil.y,newTrackingProfile.Face.pupil.y,.1)
        }
      })
     
     const oldPos = get(SpringManager.user.head)
     
     SpringManager.user.head.set({
        x:newTrackingProfile.Face.head.x,
        y:newTrackingProfile.Face.head.y,
        z:newTrackingProfile.Face.head.z,
        width:threshold(oldPos.width,newTrackingProfile.Face.head.width,.01),
        height:threshold(oldPos.height,newTrackingProfile.Face.head.height,.01),
        position:{
          x:threshold(oldPos.position.x,newTrackingProfile.Face.head.position.x,.01),
          y:threshold(oldPos.position.y,newTrackingProfile.Face.head.position.y,.01),
          z:newTrackingProfile.Face.head.position.z
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