<script context="module">
import { get } from 'svelte/store';
import {profiles} from "../scene/profiles.svelte"
import {newTrackingProfile} from './onHolisticResults.svelte'
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
          headX: newTrackingProfile.Face.head.x,
          headY: newTrackingProfile.Face.head.y,
          headZ: newTrackingProfile.Face.head.z,
          
          eyeL: newTrackingProfile.Face.eye.l,
          eyeR: newTrackingProfile.Face.eye.r,
          brow: newTrackingProfile.Face.brow,
          pupilX: newTrackingProfile.Face.pupil.x,
          pupilY: newTrackingProfile.Face.pupil.y,
          
          mouthX: newTrackingProfile.Face.mouth.x,
          mouthY: newTrackingProfile.Face.mouth.y,
          mouthA: newTrackingProfile.Face.mouth.shape.A,
          mouthE: newTrackingProfile.Face.mouth.shape.E,
          mouthI: newTrackingProfile.Face.mouth.shape.I,
          mouthO: newTrackingProfile.Face.mouth.shape.O,
          mouthU: newTrackingProfile.Face.mouth.shape.U,
         
          detected: profile.detected,
          type: 'face'
       }
    
       if(get(options).holistic.enable){
         compressXYZ(trackingData,"RightUpperArm",newTrackingProfile.Pose.RightUpperArm)
         compressXYZ(trackingData,"RightLowerArm",newTrackingProfile.Pose.RightLowerArm)
         compressXYZ(trackingData,"RightHand",newTrackingProfile.Pose.RightHand)
         
         compressXYZ(trackingData,"LeftUpperArm",newTrackingProfile.Pose.LeftUpperArm)
         compressXYZ(trackingData,"LeftLowerArm",newTrackingProfile.Pose.LeftLowerArm)
         compressXYZ(trackingData,"LeftHand",newTrackingProfile.Pose.LeftHand)
         
         compressXYZ(trackingData,"Spine",newTrackingProfile.Pose.Spine)
         compressXYZ(trackingData,"HipsPosition",newTrackingProfile.Pose.Hips.position)
         compressXYZ(trackingData,"HipsRotation",newTrackingProfile.Pose.Hips.rotation)
         
         compressXYZ(trackingData,"RightUpperLeg",newTrackingProfile.Pose.RightUpperLeg)
         compressXYZ(trackingData,"RightLowerLeg",newTrackingProfile.Pose.RightLowerLeg)         
         compressXYZ(trackingData,"LeftUpperLeg",newTrackingProfile.Pose.LeftUpperLeg)
         compressXYZ(trackingData,"LeftLowerLeg",newTrackingProfile.Pose.LeftLowerLeg)
         
         compressXYZ(trackingData,"RightWrist",newTrackingProfile.RightHand.RightWrist)
         
         compressXYZ(trackingData,"RightRingProximal",newTrackingProfile.RightHand.RightRingProximal)
         compressXYZ(trackingData,"RightRingIntermediate",newTrackingProfile.RightHand.RightRingIntermediate)
         compressXYZ(trackingData,"RightRingDistal",newTrackingProfile.RightHand.RightRingDistal)
         
         compressXYZ(trackingData,"RightIndexProximal",newTrackingProfile.RightHand.RightIndexProximal)
         compressXYZ(trackingData,"RightIndexIntermediate",newTrackingProfile.RightHand.RightIndexIntermediate)
         compressXYZ(trackingData,"RightIndexDistal",newTrackingProfile.RightHand.RightIndexDistal)
         
         compressXYZ(trackingData,"RightMiddleProximal",newTrackingProfile.RightHand.RightMiddleProximal)
         compressXYZ(trackingData,"RightMiddleIntermediate",newTrackingProfile.RightHand.RightMiddleIntermediate)
         compressXYZ(trackingData,"RightMiddleDistal",newTrackingProfile.RightHand.RightMiddleDistal)
         
         compressXYZ(trackingData,"RightThumbProximal",newTrackingProfile.RightHand.RightThumbProximal)
         compressXYZ(trackingData,"RightThumbIntermediate",newTrackingProfile.RightHand.RightThumbIntermediate)
         compressXYZ(trackingData,"RightThumbDistal",newTrackingProfile.RightHand.RightThumbDistal)
         
         compressXYZ(trackingData,"RightLittleProximal",newTrackingProfile.RightHand.RightLittleProximal)
         compressXYZ(trackingData,"RightLittleIntermediate",newTrackingProfile.RightHand.RightLittleIntermediate)
         compressXYZ(trackingData,"RightLittleDistal",newTrackingProfile.RightHand.RightLittleDistal)
         
         compressXYZ(trackingData,"LeftWrist",newTrackingProfile.LeftHand.LeftWrist)
         
         compressXYZ(trackingData,"LeftRingProximal",newTrackingProfile.LeftHand.LeftRingProximal)
         compressXYZ(trackingData,"LeftRingIntermediate",newTrackingProfile.LeftHand.LeftRingIntermediate)
         compressXYZ(trackingData,"LeftRingDistal",newTrackingProfile.LeftHand.LeftRingDistal)
         
         compressXYZ(trackingData,"LeftIndexProximal",newTrackingProfile.LeftHand.LeftIndexProximal)
         compressXYZ(trackingData,"LeftIndexIntermediate",newTrackingProfile.LeftHand.LeftIndexIntermediate)
         compressXYZ(trackingData,"LeftIndexDistal",newTrackingProfile.LeftHand.LeftIndexDistal)
         
         compressXYZ(trackingData,"LeftMiddleProximal",newTrackingProfile.LeftHand.LeftMiddleProximal)
         compressXYZ(trackingData,"LeftMiddleIntermediate",newTrackingProfile.LeftHand.LeftMiddleIntermediate)
         compressXYZ(trackingData,"LeftMiddleDistal",newTrackingProfile.LeftHand.LeftMiddleDistal)
         
         compressXYZ(trackingData,"LeftThumbProximal",newTrackingProfile.LeftHand.LeftThumbProximal)
         compressXYZ(trackingData,"LeftThumbIntermediate",newTrackingProfile.LeftHand.LeftThumbIntermediate)
         compressXYZ(trackingData,"LeftThumbDistal",newTrackingProfile.LeftHand.LeftThumbDistal)
         
         compressXYZ(trackingData,"LeftLittleProximal",newTrackingProfile.LeftHand.LeftLittleProximal)
         compressXYZ(trackingData,"LeftLittleIntermediate",newTrackingProfile.LeftHand.LeftLittleIntermediate)
         compressXYZ(trackingData,"LeftLittleDistal",newTrackingProfile.LeftHand.LeftLittleDistal)
            
          trackingData.type = "holistic"
       }
        get(p2pConnection).send(trackingData)
    }
}

</script>