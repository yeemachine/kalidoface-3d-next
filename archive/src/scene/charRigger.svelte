<script context="module">
import { get } from 'svelte/store';
import { VRMSchema } from '@pixiv/three-vrm';
import { clamp,remap } from "../utils/helpers.js";
import {cameraConfig,staticCamera,freeCamera,pivotPoint} from './CameraControls.svelte'


import * as THREE from 'three';
  
export const animateHead = (currentVrm,face) => {
  
  const Neck = currentVrm.humanoid.getBoneNode( VRMSchema.HumanoidBoneName.Neck )
  //offset from pivot
  let offsetX = get(cameraConfig).freeCamera ? clamp(-pivotPoint.rotation.x,-.4,.4) : 0
  
  //turn LR
  Neck.rotation.y = clamp((face.head.x/50),-.6,.6) ; 
  //lean forward/back
  Neck.rotation.x = clamp((face.head.y/90 + offsetX ),-.8,.8) 
  //lean side to side
  Neck.rotation.z = clamp((face.head.z/90),-.3,.3); 

}

export const animateChest = (currentVrm,face) => {
  // let upperChest = currentVrm.humanoid.getBoneNode( VRMSchema.HumanoidBoneName.UpperChest )
  const Chest = currentVrm.humanoid.getBoneNode( VRMSchema.HumanoidBoneName.Chest )
  const Spine = currentVrm.humanoid.getBoneNode( VRMSchema.HumanoidBoneName.Spine )
  // upperChest.rotation.y = clamp((face.head.x/50*.2),-.3,.3);
  // upperChest.rotation.x = clamp((face.head.y/90*.2),-.3,.3);
  // upperChest.rotation.z = clamp((face.head.z/90*.8),-.3,.3);

  //Note: decreased rotation to help with selfee demo
  let dampener = .2
  Chest.rotation.y = clamp((face.head.x/50*dampener),-.3,.3);
  Chest.rotation.x = clamp((face.head.y/50*dampener),-.3,.3);
  Chest.rotation.z = clamp((face.head.z/90*dampener),-.3,.3);

  Spine.rotation.y = clamp((face.head.x/50*dampener),-.3,.3);
  Spine.rotation.x = clamp((face.head.y/50*dampener),-.3,.3);
  Spine.rotation.z = clamp((face.head.z/90*dampener),-.3,.3);
}

export const animateFace = (currentVrm,face) => {
  
    // head angle needed to compensate for wrong geometry
    // headTurn is 0 to 1 from -12 to -16 and from 12 to 16
    let headTurn = 1-((clamp(Math.abs(face.head.x)-12,0,6))/6) 
    headTurn = 1
    //Normalize for mouth values when turning head left
    // const mouthX = clamp(face.mouth.x-.5,0,.5)/.5*headTurn
    const mouthX = remap(face.mouth.x-.4,0,.5)*headTurn

    const mouthY = face.mouth.y
    
    let eye = face.eye
    
    //Calc Joy value based on mouth X + eye closed ratio
    let joy = clamp(mouthX,0,1)*1.2
    // joy *= eye.l !== eye.r ? 0 : (1-remap(eye.l,.2,.8))
  
    // Blendshapes and Preset Name Schema
    const Blendshape = currentVrm.blendShapeProxy
    const PresetName = VRMSchema.BlendShapePresetName

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
      //Blink blendshape needs to compensate for the eye warping from Joy blendshape
      const stabilizedBlink = clamp((1-eye.l),0,1)
      Blendshape.setValue( PresetName.Blink, stabilizedBlink)
      Blendshape.setValue( PresetName.BlinkL, 0)
      Blendshape.setValue( PresetName.BlinkR, 0)
      
      //  Blendshape.setValue( PresetName.BlinkL, stabilizedBlink )
      // Blendshape.setValue( PresetName.BlinkR, stabilizedBlink )
    }
    
    // Warning! Joy blendshape changes both Blink and Mouth behaviors
    // Not too great for puppetteering since it controls too many variables
    // Blendshape.setValue( PresetName.Joy, joy)
  
    Blendshape.setValue( PresetName.I, face.mouth.shape.I );
    Blendshape.setValue( PresetName.A, face.mouth.shape.A );
    Blendshape.setValue( PresetName.E, face.mouth.shape.E );
    Blendshape.setValue( PresetName.O, face.mouth.shape.O );
    Blendshape.setValue( PresetName.U, face.mouth.shape.U );
  
  face.mouth.shape.I

    //PUPILS
    //lookat method accepts Three.euler objects
    let lookMax = 1.3
    currentVrm.lookAt.applyer.lookAt(new THREE.Euler( lookMax * face.pupil.y, lookMax * face.pupil.x, 0, 'XYZ' ))
}
export const animateArm2 = (currentVrm,pose,side="Right") => {
  const invert = side === 'Right' ? 1 : -1 
  const UpperArm = currentVrm.humanoid.getBoneNode( VRMSchema.HumanoidBoneName[side+'UpperArm'] )
  const a = new THREE.Vector3( 10, 1, 1 );
  UpperArm.lookAt(a)
}

export const animateArm = (currentVrm,pose,side="Right") => {
    //Values invert based on left/right side
    const invert = side === 'Right' ? 1 : -1 
    const Shoulder = currentVrm.humanoid.getBoneNode( VRMSchema.HumanoidBoneName[side+'Shoulder'] )
    const UpperArm = currentVrm.humanoid.getBoneNode( VRMSchema.HumanoidBoneName[side+'UpperArm'] )
    const LowerArm = currentVrm.humanoid.getBoneNode( VRMSchema.HumanoidBoneName[side+'LowerArm'] )
    const Hand = currentVrm.humanoid.getBoneNode( VRMSchema.HumanoidBoneName[side+'Hand'] )

    // Shoulder.rotation.z = 0 * invert ;
    // Shoulder.rotation.y = 0 * invert;
    if(Shoulder){
    Shoulder.rotation.x = clamp(pose[side+'UpperArm'].y * -1, -1.3, 1.3) * invert;
    }
  
    // UpperArm.rotation.z = clamp(pose[side+'UpperArm'].z * -2.3, -1.3,1.3) * invert ;
    // UpperArm.rotation.y = clamp(pose[side+'UpperArm'].y * 2.3, -2.3, 2.3) * invert;
    // UpperArm.rotation.x = clamp(pose[side+'UpperArm'].x * .5, -2.3, 2.3) * invert;
  
  
    UpperArm.rotation.z = pose[side+'UpperArm'].z * -2.3 * invert ;
    UpperArm.rotation.y = pose[side+'UpperArm'].y * 2.3 * invert;
    UpperArm.rotation.x = pose[side+'UpperArm'].x * .5;
  
    UpperArm.rotation.z = clamp(UpperArm.rotation.z, -Math.PI/2,Math.PI/2)
    
    // UpperArm.rotation.y = clamp(UpperArm.rotation.y, -Math.PI,Math.PI)
    // UpperArm.rotation.x = clamp(UpperArm.rotation.x, -Math.PI,Math.PI)

    LowerArm.rotation.z = pose[side+'LowerArm'].z * -2.3 * invert ;
    LowerArm.rotation.y =pose[side+'LowerArm'].y * 2.3 * invert; 
    LowerArm.rotation.x =pose[side+'LowerArm'].x * 2.3* invert; 
            
    Hand.rotation.z = ((pose[side+'Hand'].z * -2.3)) * invert ; //up down
    // Hand.rotation.x = pose[side+'Hand'].y * 2.3 * invert ; // twist
    // Hand.rotation.y = pose[side+'Hand'].y * 2.3 * invert; //side to side
}

export const animateFingers = (currentVrm,hand,side="Right") => {
    const invert = side === 'Right' ? 1 : -1 
    let digits = ['Ring','Index','Little','Thumb','Middle']
    let segments = ['Proximal','Intermediate','Distal']
    
    digits.forEach(e=>{
      
      segments.forEach(j=>{
        
        const Finger = currentVrm.humanoid.getBoneNode( VRMSchema.HumanoidBoneName[side+e+j] )
        const trackedFinger = hand[side+e+j]
        const isThumb = e==='Thumb' ? -1 : 1;
        
        if(e==='Thumb'){
          //dampen thumb rotation depending on segment
          let dampener = j === 'Proximal' ? .5 
            : j === 'Intermediate' ? .5 
            : 1
          Finger.rotation.z = clamp(trackedFinger.z * -Math.PI*dampener  * invert,-2.3,2.3);
          Finger.rotation.x = clamp(trackedFinger.z * -Math.PI*dampener,-2.3,2.3);
          Finger.rotation.y = clamp(trackedFinger.z * -Math.PI*dampener  * invert,-2.3,2.3);

        }else{
          //will document human limits later 
          Finger.rotation.z = clamp(trackedFinger.z * -Math.PI * invert,side==="Right" ? -2.3 : 0,side==="Right" ? 0 : 2.3);
          Finger.rotation.z = clamp(trackedFinger.z * -Math.PI * invert,side==="Right" ? -2.3 : 0,side==="Right" ? 0 : 2.3); 
          Finger.rotation.z = clamp(trackedFinger.z * -Math.PI*invert,side==="Right" ? -2.3 : 0,side==="Right" ? 0 : 2.3);
        }

      })
    })
}

export const animateLegs = (currentVrm,face,side="Right") => {
  const UpperLeg = currentVrm.humanoid.getBoneNode( VRMSchema.HumanoidBoneName[side+'UpperLeg'] )
  const LowerLeg = currentVrm.humanoid.getBoneNode( VRMSchema.HumanoidBoneName[side+'LowerLeg'] )
  const Foot = currentVrm.humanoid.getBoneNode( VRMSchema.HumanoidBoneName[side+'Foot'] )
  //counter rotate against hip movement
  UpperLeg.rotation.x = clamp((face.head.y/90),-1,0)*-.1*5;   
  UpperLeg.rotation.z = clamp((face.head.z/90),-1.3,1.3)*-.3;  
  
  let dampener = .2
  UpperLeg.rotation.y = clamp((face.head.x/50*dampener),-1.3,1.3)*-.5;
  
  LowerLeg.rotation.x = clamp((face.head.y/90),-1,0)*.2*5; 
  Foot.rotation.x = clamp((face.head.y/90),-1,0)*-.1*5; 
}

export const animateHips = (currentVrm,face) => {
  const Hips = currentVrm.humanoid.getBoneNode( VRMSchema.HumanoidBoneName.Hips )
  //rotate hip based on head turn to simulate more natural 
  Hips.position.y = currentVrm.humanoid.restPose.hips.position[1] - clamp((face.head.y/90),-1,0)*-.007*5;  
  Hips.rotation.z = clamp((face.head.z/90),-1.3,1.3)*.3
  
  //reminder: decreased hip rotation to help showcase selfie mode
  let dampener = .2
  Hips.rotation.y = Math.PI + clamp((face.head.x/50*dampener),-1.3,1.3)*.75
}


</script>

