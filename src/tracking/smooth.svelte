<script context="module">
//Takes predicted values, smoothes, and updates profile object
  
import { spring } from 'svelte/motion';
import faceMap,{stabilizeBlink} from '../utils/faceMap/index.js'
import {profiles} from '../scene/profiles.svelte'
import { get } from 'svelte/store';
import {RestingDefault} from './utils/RestingDefault.js'

// Spring Manager
export let SpringManager = {
  user:{head:null,face:null,pose:null,hands:{}},
  friend:{head:null,face:null,pose:null,hands:{}}
}

const userGroups = ['user','friend']

userGroups.forEach(e=>{
  
  //Initialize Springs
   SpringManager[e].head = spring(RestingDefault.Face.head, {
    stiffness: 0.05,
    damping: 0.65,
    precision:.0001
  })
  SpringManager[e].face = spring(RestingDefault.Face, {
    stiffness: 0.15,
    damping: 0.7,
    precision:.0001
  })
  SpringManager[e].pose = spring(RestingDefault.Pose, {
    stiffness: 0.05,
    damping: 0.85,
    precision:.0001
  });
  SpringManager[e].hands.Right = spring(RestingDefault.RightHand, {
    stiffness: 0.1,
    damping: 0.8,
    precision:.0001
  });
  SpringManager[e].hands.Left = spring(RestingDefault.LeftHand, {
    stiffness: 0.1,
    damping: 0.8,
    precision:.0001
  });
  
  //Subscribe to Spring updates
  SpringManager[e].head.subscribe(val=>{
     if(val && profiles){
      get(profiles)[e].tracking.Face.head = val
     }
  })
  SpringManager[e].face.subscribe(val=>{
     if(val && profiles){
      const face = get(profiles)[e].tracking.Face
      if(val.head.x >= -29 && val.head.x <= 29 && val.head.y >= -29 && val.head.y <= 29){
        face.brow = val.brow
        face.pupil = val.pupil  
        face.eye = stabilizeBlink(val.eye,val.head.x)
        face.mouth = val.mouth
      }
     }
  })
   SpringManager[e].pose.subscribe(val=>{
      if(val && profiles ){
        const pose = get(profiles)[e].tracking.Pose
        Object.keys(val).forEach(key=>{
          pose[key] = val[key]
        })
      }
  })

    SpringManager[e].hands.Right.subscribe(val=>{
       if(val && profiles){
          const hand = get(profiles)[e].tracking.RightHand
          Object.keys(val).forEach(key=>{
            hand[key] = val[key]
          })
        }
    })
  
  SpringManager[e].hands.Left.subscribe(val=>{
       if(val && profiles){
          const hand = get(profiles)[e].tracking.LeftHand
          Object.keys(val).forEach(key=>{
            hand[key] = val[key]
          })
        }
    })                                  
})
  
</script>