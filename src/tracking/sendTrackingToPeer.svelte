<script context="module">
import { get } from 'svelte/store';
import {profiles} from "../scene/profiles.svelte"
import {newFace} from './onFacemeshResults.svelte'
import {newPose,newHand} from './onHolisticResults.svelte'
import {p2pConnection} from "../connections/Peer.svelte"
import {options} from './Holistic.svelte'
  
export const compressXYZ = (obj,key,val) => {
   obj[key+'X'] = val.x
   obj[key+'Y'] = val.y
   obj[key+'Z'] = val.z
 }

export const expandXYZ = (obj,key,val,side=null) => {
  if(side){
    obj[side][key] = {
       x:val[side+key+'X'],
       y:val[side+key+'Y'],
       z:val[side+key+'Z']
    } 
  }else{
    obj[key] = {
       x:val[key+'X'],
       y:val[key+'Y'],
       z:val[key+'Z']
    } 
  }
 }

export const sendTrackingData = () => {
    if(get(p2pConnection)){
       let profile = get(profiles).user
       let trackingData = {
          headX: newFace.head.x,
          headY: newFace.head.y,
          headZ: newFace.head.z,
          
          eyeL: newFace.eye.l,
          eyeR: newFace.eye.r,
          brow: newFace.brow,
          pupilX: newFace.pupil.x,
          pupilY: newFace.pupil.y,
          
          mouthX: newFace.mouth.x,
          mouthY: newFace.mouth.y,
          mouthA: newFace.mouth.shape.A,
          mouthE: newFace.mouth.shape.E,
          mouthI: newFace.mouth.shape.I,
          mouthO: newFace.mouth.shape.O,
          mouthU: newFace.mouth.shape.U,
         
          detected: profile.detected,
          type: 'face'
       }
    
       if(get(options).holistic.enable){
         compressXYZ(trackingData,"RightUpperArm",newPose.upperArm.r)
         compressXYZ(trackingData,"RightLowerArm",newPose.lowerArm.r)
         compressXYZ(trackingData,"RightHand",newPose.hand.r)
         
         compressXYZ(trackingData,"LeftUpperArm",newPose.upperArm.l)
         compressXYZ(trackingData,"LeftLowerArm",newPose.lowerArm.l)
         compressXYZ(trackingData,"LeftHand",newPose.hand.l)
         
         compressXYZ(trackingData,"Spine",newPose.spine)
         compressXYZ(trackingData,"HipsPosition",newPose.hips.position)
         compressXYZ(trackingData,"HipsRotation",newPose.hips.rotation)
         
         compressXYZ(trackingData,"RightWrist",newHand.Right.Wrist)
         
         compressXYZ(trackingData,"RightRingProximal",newHand.Right.RingProximal)
         compressXYZ(trackingData,"RightRingIntermediate",newHand.Right.RingIntermediate)
         compressXYZ(trackingData,"RightRingDistal",newHand.Right.RingDistal)
         
         compressXYZ(trackingData,"RightIndexProximal",newHand.Right.IndexProximal)
         compressXYZ(trackingData,"RightIndexIntermediate",newHand.Right.IndexIntermediate)
         compressXYZ(trackingData,"RightIndexDistal",newHand.Right.IndexDistal)
         
         compressXYZ(trackingData,"RightMiddleProximal",newHand.Right.MiddleProximal)
         compressXYZ(trackingData,"RightMiddleIntermediate",newHand.Right.MiddleIntermediate)
         compressXYZ(trackingData,"RightMiddleDistal",newHand.Right.MiddleDistal)
         
         compressXYZ(trackingData,"RightThumbProximal",newHand.Right.ThumbProximal)
         compressXYZ(trackingData,"RightThumbIntermediate",newHand.Right.ThumbIntermediate)
         compressXYZ(trackingData,"RightThumbDistal",newHand.Right.ThumbDistal)
         
         compressXYZ(trackingData,"RightLittleProximal",newHand.Right.LittleProximal)
         compressXYZ(trackingData,"RightLittleIntermediate",newHand.Right.LittleIntermediate)
         compressXYZ(trackingData,"RightLittleDistal",newHand.Right.LittleDistal)
         
         compressXYZ(trackingData,"LeftWrist",newHand.Left.Wrist)
         
         compressXYZ(trackingData,"LeftRingProximal",newHand.Left.RingProximal)
         compressXYZ(trackingData,"LeftRingIntermediate",newHand.Left.RingIntermediate)
         compressXYZ(trackingData,"LeftRingDistal",newHand.Left.RingDistal)
         
         compressXYZ(trackingData,"LeftIndexProximal",newHand.Left.IndexProximal)
         compressXYZ(trackingData,"LeftIndexIntermediate",newHand.Left.IndexIntermediate)
         compressXYZ(trackingData,"LeftIndexDistal",newHand.Left.IndexDistal)
         
         compressXYZ(trackingData,"LeftMiddleProximal",newHand.Left.MiddleProximal)
         compressXYZ(trackingData,"LeftMiddleIntermediate",newHand.Left.MiddleIntermediate)
         compressXYZ(trackingData,"LeftMiddleDistal",newHand.Left.MiddleDistal)
         
         compressXYZ(trackingData,"LeftThumbProximal",newHand.Left.ThumbProximal)
         compressXYZ(trackingData,"LeftThumbIntermediate",newHand.Left.ThumbIntermediate)
         compressXYZ(trackingData,"LeftThumbDistal",newHand.Left.ThumbDistal)
         
         compressXYZ(trackingData,"LeftLittleProximal",newHand.Left.LittleProximal)
         compressXYZ(trackingData,"LeftLittleIntermediate",newHand.Left.LittleIntermediate)
         compressXYZ(trackingData,"LeftLittleDistal",newHand.Left.LittleDistal)
            
          trackingData.type = "holistic"
       }
        get(p2pConnection).send(trackingData)
    }
}

</script>