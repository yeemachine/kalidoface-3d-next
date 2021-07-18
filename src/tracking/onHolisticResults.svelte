<script context="module">
import { writable,get } from 'svelte/store';
import faceMap,{stabilizeBlink} from '../utils/faceMap/index.js'
import {drawResults} from './drawing.svelte'
import {user_smooth_face,user_smooth_pose,user_smooth_hand,user_face_position} from './smooth.svelte';
import {options} from './Holistic.svelte'
import {calcPose} from './calcPose.svelte'
import {calcHand} from './calcHand.svelte'
import {videoEl} from './webcam.svelte'
import {threshold} from '../utils/helpers.js'
import {cameraConfig} from '../scene/CameraControls.svelte'
import {p2pConnection} from '../connections/Peer.svelte'
import {profiles} from "../scene/profiles.svelte"
import {newFace,setFace} from "./onFacemeshResults.svelte"
import {sendTrackingData} from "./sendTrackingToPeer.svelte"

export const poseLandmarks = writable(null);
export let newPose = {
    upperArm:{
      l:{x:0,y:0,z:.55*180},
      r:{x:0,y:0,z:.55*180}
    },
    lowerArm:{
      l:{x:0,y:0,z:0},
      r:{x:0,y:0,z:0}
    },
    hand:{
      l:{x:0,y:0,z:0},
      r:{x:0,y:0,z:0}
    },
    hips:{
      position:{x:0,y:0,z:0},
      rotation:{x:0,y:0,z:0}
    },
    spine:{x:0,y:0,z:0}
}
export let newHand = {
    Right:{
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
    },
    Left:{
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
  }
}

export let initialFrames = 0

export function onHolisticResults(results) {
  drawResults(results,'holistic');
  if(initialFrames < 60){
    initialFrames += 1
    return
  }
  let flipHorizontal = get(cameraConfig).firstPerson && get(cameraConfig).freeCamera;
  const connection = get(p2pConnection)
  // const flipHorizontal = false;
  const facelm = results.faceLandmarks || null;
  let poselm = results.poseLandmarks || null;
  let poselmW = results.W || null;

  const handlm = {
    Right: results.leftHandLandmarks || null,
    Left: results.rightHandLandmarks || null
  };

  if (facelm && !get(options).face.enable) {
    setFace(faceMap.update(facelm));
    newFace.head.x *= flipHorizontal ? -1 : 1
    sendTrackingData()

    user_smooth_face.set({
      eye: newFace.eye,
      mouth: newFace.mouth,
      head: newFace.head,
      brow: newFace.brow,
      pupil: newFace.pupil,
      width:newFace.head.width
    });
    
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
    
      if(connection){
        connection.send({
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
          detected: get(profiles).user.detected,
          type: 'face-tracking'
        })
      } 
    
  }

  for (let i = 0; i < 2; i++) {
    let e = i == 0 ? "Right" : "Left";
    let eFlipped = i == 0 ? "Left" : "Right";
    if (handlm[e] !== null) {
      newHand[e] = calcHand(handlm[e],e);
      user_smooth_hand[flipHorizontal ? eFlipped : e].set(newHand[e]);
    }
  }

  if (poselmW || (handlm.Right || handlm.Left)) {
    poseLandmarks.set(poselmW)
    let poselmWFlipped = [] 
    let poselmFlipped = []
    poselmW.forEach((e,i)=>{
     // e.x *= videoEl.videoWidth  
     // e.y *= videoEl.videoHeight
     // e.z *= videoEl.videoWidth * .65
     let newIndex = i===0 ? 0 : i % 2 == 0 ? i-1 : i+1
     poselmWFlipped[newIndex] = e
     poselmFlipped[newIndex] = e
    })
    
    newPose = calcPose(
      flipHorizontal ? poselmWFlipped : poselmW,
      flipHorizontal ? poselmFlipped : poselm);
    
    user_smooth_pose.set({
      RightUpperArm: newPose.upperArm.r,
      LeftUpperArm: newPose.upperArm.l,
      RightLowerArm: newPose.lowerArm.r,
      LeftLowerArm: newPose.lowerArm.l,
      RightHand: {
        z:newPose.hand.r.z,
        y:newHand.Right.Wrist.z,
        x:newHand.Right.Wrist.x
      },
      LeftHand: {
        z:newPose.hand.l.z,
        y:newHand.Left.Wrist.z,
        x:newHand.Left.Wrist.x
      },
      Hips: newPose.hips,
      Spine: newPose.spine
    });
    
  }
  
  if(!get(options).holistic.running){
    get(options).holistic.running = true
    options.set(get(options))
  }
}
</script>