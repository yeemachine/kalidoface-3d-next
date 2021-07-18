<script context="module">
import { writable } from 'svelte/store';

export const profiles = writable({
  user: {
    id:'user',
    model:null,
    live2d:null,
    position:{x:0,y:window.innerWidth > 600 ? .7 : .55,z:0},
    currentExp:0,
    expressions:[],
    zoom:.5,
    destroying:false,
    detected:false,
    tracking:{
      face:{
        head:{x:0,y:0,z:0},
        normalized:{
          x:0,y:0,z:0
        },
        width:.3,
        height:.6,
        center:{x:0,y:0,z:0},
        mouth:{x:0,y:0,shape:{A:0,E:0,I:0,O:0,U:0}},
        eye:{l:1,r:1},
        brow:0,
        pupil:{x:0,y:0}
      },
      pose:{
        RightUpperArm:{x:0,y:0,z:.6*180},
        LeftUpperArm:{x:0,y:0,z:.6*180},
        RightLowerArm:{x:0,y:0,z:0},
        LeftLowerArm:{x:0,y:0,z:0},
        LeftUpperLeg:{x:0,y:0,z:0},
        RightUpperLeg:{x:0,y:0,z:0},
        RightLowerLeg:{x:0,y:0,z:0},
        LeftLowerLeg:{x:0,y:0,z:0},
        LeftHand:{x:0,y:0,z:0},
        RightHand:{x:0,y:0,z:0},
        Spine:{x:0,y:0,z:0},
        Hips:{
          position:{x:0,y:0,z:0},
          rotation:{x:0,y:0,z:0}
        }
      },
      hand:{
        ///Right
        RightWrist:{x:0,y:0,z:0},
        
        RightRingProximal:{x:0,y:0,z:0},
        RightRingIntermediate:{x:0,y:0,z:0},
        RightRingDistal:{x:0,y:0,z:0},
        
        RightIndexProximal:{x:0,y:0,z:0},
        RightIndexIntermediate:{x:0,y:0,z:0},
        RightIndexDistal:{x:0,y:0,z:0},
        
        RightMiddleProximal:{x:0,y:0,z:0},
        RightMiddleIntermediate:{x:0,y:0,z:0},
        RightMiddleDistal:{x:0,y:0,z:0},
        
        RightThumbProximal:{x:0,y:0,z:0},
        RightThumbIntermediate:{x:0,y:0,z:0},
        RightThumbDistal:{x:0,y:0,z:0},
        
        RightLittleProximal:{x:0,y:0,z:0},
        RightLittleIntermediate:{x:0,y:0,z:0},
        RightLittleDistal:{x:0,y:0,z:0},
        
        ///Left
        LeftWrist:{x:0,y:0,z:0},
        
        LeftRingProximal:{x:0,y:0,z:0},
        LeftRingIntermediate:{x:0,y:0,z:0},
        LeftRingDistal:{x:0,y:0,z:0},
        
        LeftIndexProximal:{x:0,y:0,z:0},
        LeftIndexIntermediate:{x:0,y:0,z:0},
        LeftIndexDistal:{x:0,y:0,z:0},
        
        LeftMiddleProximal:{x:0,y:0,z:0},
        LeftMiddleIntermediate:{x:0,y:0,z:0},
        LeftMiddleDistal:{x:0,y:0,z:0},
        
        LeftThumbProximal:{x:0,y:0,z:0},
        LeftThumbIntermediate:{x:0,y:0,z:0},
        LeftThumbDistal:{x:0,y:0,z:0},
        
        LeftLittleProximal:{x:0,y:0,z:0},
        LeftLittleIntermediate:{x:0,y:0,z:0},
        LeftLittleDistal:{x:0,y:0,z:0}
      }
    }
  },
  friend: {
    id:'friend',
    model:null,
    live2d:null,
    position:{x:1,y:window.innerWidth > 600 ? .7 : .55,z:0},
    currentExp:0,
    expressions:[],
    zoom:.5,
    destroying:false,
    detected:false,
    tracking:{
      face:{
        head:{x:0,y:0,z:0},
        normalized:{
          x:0,y:0,z:0
        },
        width:.3,
        height:.6,
        center:{x:0,y:0,z:0},
        mouth:{x:0,y:0,shape:{A:0,E:0,I:0,O:0,U:0}},
        eye:{l:1,r:1},
        brow:0,
        pupil:{x:0,y:0}
      },
      pose:{
        RightUpperArm:{x:0,y:0,z:.6*180},
        LeftUpperArm:{x:0,y:0,z:.6*180},
        RightLowerArm:{x:0,y:0,z:0},
        LeftLowerArm:{x:0,y:0,z:0},
        LeftUpperLeg:{x:0,y:0,z:0},
        RightUpperLeg:{x:0,y:0,z:0},
        RightLowerLeg:{x:0,y:0,z:0},
        LeftLowerLeg:{x:0,y:0,z:0},
        LeftHand:{x:0,y:0,z:0},
        RightHand:{x:0,y:0,z:0},
        Spine:{x:0,y:0,z:0},
        Hips:{
          position:{x:0,y:0,z:0},
          rotation:{x:0,y:0,z:0}
        }
      },
      hand:{
        
        ///Right
        RightRingProximal:{x:0,y:0,z:0},
        RightRingIntermediate:{x:0,y:0,z:0},
        RightRingDistal:{x:0,y:0,z:0},
        
        RightIndexProximal:{x:0,y:0,z:0},
        RightIndexIntermediate:{x:0,y:0,z:0},
        RightIndexDistal:{x:0,y:0,z:0},
        
        RightMiddleProximal:{x:0,y:0,z:0},
        RightMiddleIntermediate:{x:0,y:0,z:0},
        RightMiddleDistal:{x:0,y:0,z:0},
        
        RightThumbProximal:{x:0,y:0,z:0},
        RightThumbIntermediate:{x:0,y:0,z:0},
        RightThumbDistal:{x:0,y:0,z:0},
        
        RightLittleProximal:{x:0,y:0,z:0},
        RightLittleIntermediate:{x:0,y:0,z:0},
        RightLittleDistal:{x:0,y:0,z:0},
        
        ///Left
        LeftRingProximal:{x:0,y:0,z:0},
        LeftRingIntermediate:{x:0,y:0,z:0},
        LeftRingDistal:{x:0,y:0,z:0},
        
        LeftIndexProximal:{x:0,y:0,z:0},
        LeftIndexIntermediate:{x:0,y:0,z:0},
        LeftIndexDistal:{x:0,y:0,z:0},
        
        LeftMiddleProximal:{x:0,y:0,z:0},
        LeftMiddleIntermediate:{x:0,y:0,z:0},
        LeftMiddleDistal:{x:0,y:0,z:0},
        
        LeftThumbProximal:{x:0,y:0,z:0},
        LeftThumbIntermediate:{x:0,y:0,z:0},
        LeftThumbDistal:{x:0,y:0,z:0},
        
        LeftLittleProximal:{x:0,y:0,z:0},
        LeftLittleIntermediate:{x:0,y:0,z:0},
        LeftLittleDistal:{x:0,y:0,z:0}
      }
    }
  }
})

</script>