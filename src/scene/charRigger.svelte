<script context="module">
import { get,writable } from 'svelte/store';
import { VRMSchema } from '@pixiv/three-vrm';
import { clamp,remap } from "../utils/helpers.js";
import {camera,cameraConfig,staticCamera,freeCamera,pivotPoint} from './CameraControls.svelte'
import {getLocalStorage,subLocalStorage} from '../stores.js'
import {options} from '../tracking/Holistic.svelte'
import Vector from '../utils/vector.js'

import * as THREE from 'three';

//EXPEREMENTAL FLAGS
export const allowLegs = writable(false)
export const allowRoom = writable(true)
export const allowSmile = writable(true)
getLocalStorage(allowLegs,'allowLegs',get(allowLegs))
subLocalStorage(allowLegs,'allowLegs')
getLocalStorage(allowRoom,'allowRoom',get(allowRoom))
subLocalStorage(allowRoom,'allowRoom')
getLocalStorage(allowRoom,'allowSmile',get(allowRoom))
subLocalStorage(allowRoom,'allowSmile')
  
export const animateHead = (currentVrm,face,pose,flipHorizontal = false) => {
  if(!face || !pose){return}
  
  let invert = flipHorizontal ? -1 : 1

  const Neck = currentVrm.humanoid.getBoneNode( VRMSchema.HumanoidBoneName.Neck )
  const Hips = currentVrm.humanoid.getBoneNode( VRMSchema.HumanoidBoneName.Hips )
  //offset center tilt to face selfie camera
  let offsetX = (get(cameraConfig).freeCamera && !get(cameraConfig).firstPerson) ? clamp(-pivotPoint.rotation.x,-.4,.4) : 0
  //offset head rotation when body is turned to the side.
  let offsetY = get(options).holistic.enable && Hips ? clamp(
    Hips.rotation.y - Math.PI,-Math.PI,Math.PI) : 0

  let dampener = 1
  
  if(Neck){
    //turn left right    
    Neck.rotation.y = clamp(face.head.y*dampener - offsetY,-.8,.8) * invert
    //lean forward/back
    Neck.rotation.x = get(options).holistic.enable ? clamp(face.head.x*dampener + offsetX,-.8,.8) 
      : clamp(face.head.x*dampener + offsetX,-.8,.8),
    //lean side to side
    Neck.rotation.z = clamp(face.head.z*dampener*.8,-.3,.3) * invert
  }

}

export const animateChest = (currentVrm,face,pose,flipHorizontal = false) => {
  if(!face || !pose){return}
  let invert = flipHorizontal ? -1 : 1
  
  let upperChest = currentVrm.humanoid.getBoneNode( VRMSchema.HumanoidBoneName.UpperChest )
  const Chest = currentVrm.humanoid.getBoneNode( VRMSchema.HumanoidBoneName.Chest )
  const Spine = currentVrm.humanoid.getBoneNode( VRMSchema.HumanoidBoneName.Spine )
  let dampener = .1
  //Note: decreased rotation to help with selfee demo
  if(Chest){
  Chest.rotation.x = clamp((face.head.x*dampener),-.3,.3);
  Chest.rotation.z = get(options).holistic.enable ? clamp((pose.Spine.z*dampener),-.7,.7)* invert 
  : clamp((face.head.z*dampener),-.3,.3) * invert; 
  Chest.rotation.y = get(options).holistic.enable ? clamp((pose.Spine.y*dampener*0.2),-.7,.7)
    : clamp((face.head.y*.5),-.3,.3);
  }

  if(Spine){
  Spine.rotation.x = clamp((face.head.x*dampener),-.3,.3);
    Spine.rotation.z = get(options).holistic.enable ? clamp((pose.Spine.z*dampener),-.7,.7) * invert
    :clamp((face.head.z*dampener),-.3,.3) * invert;
  Spine.rotation.y = get(options).holistic.enable  ? clamp((pose.Spine.y*dampener*0.2),-.4,.4)
    : clamp((face.head.y*.5),-.3,.3);
  }
  
  if(upperChest){
  upperChest.rotation.x = clamp((face.head.x*.2),-.3,.3);
     upperChest.rotation.z = get(options).holistic.enable ? clamp((pose.Spine.z*dampener),-.7,.7)* invert
    : clamp((face.head.z*.5),-.3,.3)* invert;
    upperChest.rotation.y = get(options).holistic.enable ? clamp((pose.Spine.y*dampener*0.2),-.3,.3)
    : clamp((face.head.y*.2),-.3,.3);
    
  }

}

export const animateFace = (currentVrm,face) => {
    if(!face){return}
     // Blendshapes and Preset Name Schema
    const Blendshape = currentVrm.blendShapeProxy
    const PresetName = VRMSchema.BlendShapePresetName

    const mouthX = remap(face.mouth.x-.4,0,.5)
    const mouthY = face.mouth.y
    
    let eye = face.eye
    
    let joy = 0
    
    if(get(allowSmile)){
      // Warning! Joy blendshape changes both Blink and Mouth behaviors
      //Calc Joy value based on mouth X + eye closed ratio
      joy = clamp(mouthX*1,0,1)
      joy *= eye.l !== eye.r ? 0 : (1-remap(eye.l,.2,.8))
    }

    //handle Wink
    if(eye.l !== eye.r){
      eye.l = clamp(1-eye.l,0,1)
      eye.r = clamp(1-eye.r,0,1)
      //Joy blendshape clashes with BlinkL and BlinkR blenshapes. Reset Joy
      joy = 0
      
      Blendshape.setValue( PresetName.Blink, 0 )
      Blendshape.setValue( PresetName.BlinkL, eye.l )
      Blendshape.setValue( PresetName.BlinkR, eye.r )
    }else{
      const stabilizedBlink = clamp((1-eye.l),0,1)
      //Subtract joy values from Blink values to avoid clipping
      Blendshape.setValue( PresetName.Blink, stabilizedBlink-joy)
      Blendshape.setValue( PresetName.BlinkL, 0)
      Blendshape.setValue( PresetName.BlinkR, 0)
    }

    Blendshape.setValue( PresetName.I, face.mouth.shape.I - joy );
    Blendshape.setValue( PresetName.A, face.mouth.shape.A - joy );
    Blendshape.setValue( PresetName.E, face.mouth.shape.E - joy );
    Blendshape.setValue( PresetName.O, face.mouth.shape.O - joy );
    Blendshape.setValue( PresetName.U, face.mouth.shape.U - joy );
  
    Blendshape.setValue( PresetName.Joy, joy)
  
    //PUPILS
    //lookat method accepts Three.euler objects
    let lookTarget;
    if(!get(options).face.enable){
      //Keep Eye contact on camera if eye tracking unavailable
      currentVrm.lookAt.target = get(camera)
    }else{
      //Reset Look Target to manually animate eyes
      currentVrm.lookAt.target = null
      lookTarget = new THREE.Euler( 
        clamp(.8 * face.pupil.y, -.6 , .6), 
        face.pupil.x , 
        0, 
        'XYZ' )
      currentVrm.lookAt.applyer.lookAt(lookTarget)
    }
   
}

export const animateArm = (currentVrm,pose,side="Right",flipHorizontal = false) => {
    if(!pose){return}
    let invertedSide = (side==="Right" && flipHorizontal) ? 'Left'
      : (side==="Left" && flipHorizontal) ? 'Right'
      : side
    let invert = flipHorizontal ? -1 : 1
  
    const UpperArm = currentVrm.humanoid.getBoneNode( VRMSchema.HumanoidBoneName[invertedSide+'UpperArm'] )
    const LowerArm = currentVrm.humanoid.getBoneNode( VRMSchema.HumanoidBoneName[invertedSide+'LowerArm'] )
    
    UpperArm.rotation.z = pose[side+'UpperArm'].z * invert
    UpperArm.rotation.y = pose[side+'UpperArm'].y * invert
    UpperArm.rotation.x = pose[side+'UpperArm'].x
  
    LowerArm.rotation.z = pose[side+'LowerArm'].z * invert
    LowerArm.rotation.y = pose[side+'LowerArm'].y * invert
    LowerArm.rotation.x = pose[side+'LowerArm'].x
  
    const Hand = currentVrm.humanoid.getBoneNode( VRMSchema.HumanoidBoneName[side+'Hand'] )
    Hand.rotation.z = pose[side+'Hand'].z
    
}

export const animateFingers = (currentVrm,hand,pose,side="Right",flipHorizontal = false) => {    
    if(!hand || !pose){return}
    let invertedSide = (side==="Right" && flipHorizontal) ? 'Left'
      : (side==="Left" && flipHorizontal) ? 'Right'
      : side
    let invert = flipHorizontal ? -1 : 1
  
    let digits = ['Ring','Index','Little','Thumb','Middle']
    let segments = ['Proximal','Intermediate','Distal']
    const Hand = currentVrm.humanoid.getBoneNode( VRMSchema.HumanoidBoneName[invertedSide+'Hand'] )
    
    if(Hand){
      //Animate Wrist
      //fix weird jumping
      if(Math.abs(Hand.rotation.y - hand[side+'Wrist'].y) < .6){
        Hand.rotation.y = hand[side+'Wrist'].y * invert
      }
      Hand.rotation.x = hand[side+'Wrist'].x
    }
  
    //Animate Fingers
    digits.forEach(e=>{
      segments.forEach(j=>{
        const trackedFinger = hand[side+e+j]
        const Finger = currentVrm.humanoid.getBoneNode( VRMSchema.HumanoidBoneName[invertedSide+e+j] )
        if(!Finger){
          return
        }
        if(e === "Thumb"){
          Finger.rotation.z = trackedFinger.z * invert
          Finger.rotation.y = trackedFinger.y * invert
          Finger.rotation.x = trackedFinger.x
        }else{
          Finger.rotation.z = trackedFinger.z * invert
        }
      })
    })
}

//Dampening multipliers for when animating legs using only head input
const bendXMult = .85
const posXMult = bendXMult/6

export const animateLegs = (currentVrm,pose,face,side="Right") => {
  if(!face || !pose){return}
  let invert = side === 'Right' ? 1 : -1 
  const UpperLeg = currentVrm.humanoid.getBoneNode( VRMSchema.HumanoidBoneName[side+'UpperLeg'] )
  const LowerLeg = currentVrm.humanoid.getBoneNode( VRMSchema.HumanoidBoneName[side+'LowerLeg'] )
  const Foot = currentVrm.humanoid.getBoneNode( VRMSchema.HumanoidBoneName[side+'Foot'] )
  const Chest = currentVrm.humanoid.getBoneNode( VRMSchema.HumanoidBoneName.Chest )
  
  //Animate Legs if Pose Tracking is available and experimental Flag is checked
  if(get(options).holistic.enable && (pose[side+'UpperLeg'].z !== 0) && get(allowLegs)){
    
    UpperLeg.rotation.z = pose[side+'UpperLeg'].z;
    UpperLeg.rotation.x = pose[side+'UpperLeg'].x
    LowerLeg.rotation.x= pose[side+'LowerLeg'].x
    return
  }
  
  // Animate Legs based on torso/head movement
  // counter rotate against hip movement
  UpperLeg.rotation.z = .015*invert //starting stance
  UpperLeg.rotation.z = UpperLeg.rotation.z + clamp(face.head.z,-1.3,1.3)*-.3;  
  UpperLeg.rotation.x = clamp((face.head.x),-1,0)*-bendXMult;   
  
  let dampener = .3
  UpperLeg.rotation.y = clamp(face.head.y*dampener,-1.3,1.3)*-bendXMult;
  LowerLeg.rotation.x = clamp(face.head.x,-1,0)*bendXMult*2; 
  //Bend foot counter to leg bend
  Foot.rotation.x = clamp(face.head.x,-1,0)*-bendXMult; 
}

export const animateHips = (currentVrm,pose,face,flipHorizontal = false) => {
  if(!face || !pose){return}
  
  let invert = flipHorizontal ? -1 : 1

  const Hips = currentVrm.humanoid.getBoneNode( VRMSchema.HumanoidBoneName.Hips )
  const Spine = currentVrm.humanoid.getBoneNode( VRMSchema.HumanoidBoneName.Spine )
  const Chest = currentVrm.humanoid.getBoneNode( VRMSchema.HumanoidBoneName.Chest )
  let dampener = .2

  //rotate hip based on head turn to simulate more natural 
  Hips.position.y = currentVrm.humanoid.restPose.hips.position[1] - clamp((face.head.x),-1,0)*-posXMult;
  
  let newHipsX = Vector.lerp(
    Hips.position.x,
    pose.Hips.position.x,
    .05+pose.Hips.position.z*-.15)
  let newHipsZ = Vector.lerp(
    Hips.position.z,
    pose.Hips.position.z,
    .05+pose.Hips.position.z*-.15)
  
  Hips.position.x = get(allowRoom) && !flipHorizontal ? clamp(newHipsX,-3,3) : 0;  
  Hips.position.z = get(allowRoom) && !flipHorizontal ? clamp(newHipsZ,-10,3) : 0;  
  
  Hips.rotation.z = clamp(face.head.z,-1.3,1.3)*.3 * invert
  Hips.rotation.x = get(options).holistic.enable ? clamp((pose.Hips.rotation.z),-1.3,1.3)*-bendXMult*.1
  : clamp((face.head.x*dampener),-1.3,1.3)*-bendXMult*.1;

  //compensate for weird lerp values when turning
  //don't lerp y rotation when facing backwards
  let diffY = Math.abs(Hips.rotation.y - (pose.Hips.rotation.y + Math.PI))
  let lerpValY = remap(diffY,.01,.05)
  let isFacingBack = remap(Math.abs(pose.Hips.rotation.y),.3,.5) 

  Hips.rotation.y = get(options).holistic.enable && !flipHorizontal  ? 
    Vector.lerp(Hips.rotation.y , pose.Hips.rotation.y+ Math.PI, Math.min(.1 + .9 * isFacingBack + .3 * lerpValY,1))
    : (Math.PI*(flipHorizontal ? 0 : 1) + clamp(Chest.rotation.y,-1.3,1.3)*.75)
  
}


</script>

