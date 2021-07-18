<script context="module">
  import {p2pConnection} from "./Peer.svelte"
  import {profiles} from "../scene/profiles.svelte"
  import { writable,get } from 'svelte/store';
  
  export const sendFaceTracking = async () => {
    let connection = get(p2pConnection)
    let profile = get(profiles).user

    if(!connection || !profile.detected){
      return
    }
  
    connection.send({
      headX: profile.tracking.face.head.x,
      headY: profile.tracking.face.head.y,
      headZ: profile.tracking.face.head.z,
      eyeL: profile.tracking.face.eye.l,
      eyeR: profile.tracking.face.eye.r,
      brow: profile.tracking.face.brow,
      pupilX: profile.tracking.face.pupil.x,
      pupilY: profile.tracking.face.pupil.y,
      mouthX: profile.tracking.face.mouth.x,
      mouthY: profile.tracking.face.mouth.y,
      mouthA: profile.tracking.face.mouth.shape.A,
      mouthE: profile.tracking.face.mouth.shape.E,
      mouthI: profile.tracking.face.mouth.shape.I,
      mouthO: profile.tracking.face.mouth.shape.O,
      mouthU: profile.tracking.face.mouth.shape.U,
      RightUpperArmX: profile.tracking.pose.RightUpperArm.x,
      RightUpperArmY: profile.tracking.pose.RightUpperArm.y,
      RightUpperArmZ: profile.tracking.pose.RightUpperArm.z,
      RightLowerArmX: profile.tracking.pose.RightLowerArm.x,
      RightLowerArmY: profile.tracking.pose.RightLowerArm.y,
      RightLowerArmZ: profile.tracking.pose.RightLowerArm.z,
      detected: profile.detected,
      type: 'face-tracking'
    })
     
  }

</script>