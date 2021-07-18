<script context="module">
//Takes predicted values, smoothes, and updates profile object
  
import { spring } from 'svelte/motion';
import faceMap,{stabilizeBlink} from '../utils/faceMap/index.js'
import {profiles} from '../scene/profiles.svelte'
import { get } from 'svelte/store';

export let user_face_position = spring({
   head:{
      x:0,
      y:0,
      z:0
    },
    width:.3,
    height:.6,
    center:{
      x:0.5,y:0.5,z:0
    }
  }, {
  stiffness: 0.05,
  damping: 0.65,
  precision:.01
})

user_face_position.subscribe(val=>{
   if(val && profiles){
    const face = get(profiles).user.tracking.face
    face.head.width = val.width
    face.head.height = val.height
    face.head.center = val.center
     
    face.head.x = val.head.x
    face.head.y = val.head.y
    face.head.z = val.head.z
   }
})

export let user_smooth_face = spring({
  eye:{l:1,r:1},
  mouth:{x:0,y:0,shape:{A:0,E:0,I:0,O:0,U:0}},
  head:{
    x:0,
    y:0,
    z:0
  },
  brow:0,
  pupil:{x:0,y:0},
  
  }, {
  //  stiffness: 0.1,
  // damping: 0.8,
  stiffness: 0.15,
  damping: 0.7,
  precision:.01

});
  
user_smooth_face.subscribe(val=>{
   if(val && profiles){
    const face = get(profiles).user.tracking.face
    // face.head.x = val.head.x
    // face.head.y = val.head.y
    // face.head.z = val.head.z
    if(val.head.x >= -29 && val.head.x <= 29 && val.head.y >= -29 && val.head.y <= 29){
      face.brow = val.brow
      face.pupil = val.pupil  
      face.eye = stabilizeBlink(val.eye,val.head.x)
      face.mouth = val.mouth
    }
     
   }
}) 
  
  
export let user_smooth_pose = spring({
    RightUpperArm:{x:0,y:0,z:.55*180},
    LeftUpperArm:{x:0,y:0,z:.55*180}, //y: 0 > -.5 // z: -.5>.5
    RightLowerArm:{x:0,y:0,z:0},
    LeftLowerArm:{x:0,y:0,z:0}, //x: 0 > -4, z: 0 to -.9
    // LeftUpperLeg:{x:0,y:0,z:0},
    // RightUpperLeg:{x:0,y:0,z:0},
    // RightLowerLeg:{x:0,y:0,z:0},
    // LeftLowerLeg:{x:0,y:0,z:0},
    LeftHand:{x:0,y:0,z:0},
    RightHand:{x:0,y:0,z:0},
    Spine:{x:0,y:0,z:0},
    Hips:{
      position:{x:0,y:0,z:0},
      rotation:{x:0,y:0,z:0}
    }
}, {
  stiffness: 0.05,
  damping: 0.9,
  precision:.01
});
  
user_smooth_pose.subscribe(val=>{
  if(val && profiles){
    const pose = get(profiles).user.tracking.pose
    pose.RightUpperArm = val.RightUpperArm
    pose.LeftUpperArm = val.LeftUpperArm
    pose.RightLowerArm = val.RightLowerArm
    pose.LeftLowerArm = val.LeftLowerArm
    // pose.RightUpperLeg = val.RightUpperLeg
    // pose.LeftUpperLeg = val.LeftUpperLeg
    // pose.RightLowerLeg = val.RightLowerLeg
    // pose.LeftLowerLeg = val.LeftLowerLeg
    pose.LeftHand = val.LeftHand
    pose.RightHand = val.RightHand
    pose.Spine = val.Spine
    pose.Hips.position = val.Hips.position
    pose.Hips.rotation = val.Hips.rotation
  }
})
  
export let user_smooth_hand = {Right:{},Left:{}}

for (let i=0; i<2; i++){
  let e = i==0 ? 'Right' : 'Left'
  user_smooth_hand[e] = spring({
    Wrist:{x:0,y:0,z:0},
    RingProximal:{x:0,y:0,z:0},
    RingIntermediate:{x:0,y:0,z:0},
    RingDistal:{x:0,y:0,z:0},

    IndexProximal:{x:0,y:0,z:0},
    IndexIntermediate:{x:0,y:0,z:0},
    IndexDistal:{x:0,y:0,z:0},

    MiddleProximal:{x:0,y:0,z:0},
    MiddleIntermediate:{x:0,y:0,z:0},
    MiddleDistal:{x:0,y:0,z:0},

    ThumbProximal:{x:0,y:0,z:0},
    ThumbIntermediate:{x:0,y:0,z:0},
    ThumbDistal:{x:0,y:0,z:0},

    LittleProximal:{x:0,y:0,z:0},
    LittleIntermediate:{x:0,y:0,z:0},
    LittleDistal:{x:0,y:0,z:0}
  }, {
    stiffness: 0.15,
    damping: 0.7,
    precision:.01
  });
  
  user_smooth_hand[e].subscribe(val=>{
    if(val && profiles){
      const hand = get(profiles).user.tracking.hand
      hand[e+'Wrist'] = val.Wrist
      hand[e+'RingProximal'] = val.RingProximal
      hand[e+'RingIntermediate'] = val.RingIntermediate
      hand[e+'RingDistal'] = val.RingDistal

      hand[e+'IndexProximal'] = val.IndexProximal
      hand[e+'IndexIntermediate'] = val.IndexIntermediate
      hand[e+'IndexDistal'] = val.IndexDistal

      hand[e+'MiddleProximal'] = val.MiddleProximal
      hand[e+'MiddleIntermediate'] = val.MiddleIntermediate
      hand[e+'MiddleDistal'] = val.MiddleDistal

      hand[e+'ThumbProximal'] = val.ThumbProximal
      hand[e+'ThumbIntermediate'] = val.ThumbIntermediate
      hand[e+'ThumbDistal'] = val.ThumbDistal

      hand[e+'LittleProximal'] = val.LittleProximal
      hand[e+'LittleIntermediate'] = val.LittleIntermediate
      hand[e+'LittleDistal'] = val.LittleDistal
    }
  })
  
} 
  
  
</script>