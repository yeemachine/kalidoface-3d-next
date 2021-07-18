<script context="module">
import { writable } from 'svelte/store';
export const p2pConnection = writable(null)
export const inputID = writable('')
export const myID = writable(null);
export const friendID = writable(null);
export const PEER = writable(null);
export const peerState = writable('default');
export const callTime = writable('0:00');
export const isHost = writable(false);

</script>
<script>
  import {onMount} from 'svelte';
  import {DIM} from '../stores.js'
  import {userModel,friendModel} from '../scene/character.svelte'
  import {profiles} from '../scene/profiles.svelte'
  import { spring } from 'svelte/motion';
  import faceMap,{stabilizeBlink} from '../utils/faceMap/index.js'
  import {initCounter,counter,resetTimer} from './timer.js'
  import {randomString} from '../utils/helpers.js'
  import Peer from 'peerjs';
  import {notifText} from '../ui/notif.svelte'
  import {cameraConfig} from '../scene/CameraControls.svelte'
  import {friend_smooth_face,friend_smooth_pose,friend_smooth_hand} from '../tracking/smoothFriend.svelte';
  import {expandXYZ} from "../tracking/sendTrackingToPeer.svelte"
  
  peerState.subscribe(e=>{
    if(e==='connected'){
      if(!counter){
        initCounter()
      }
    }else{
        resetTimer()
    }
  })
  
  let friend_smooth = spring({
  eye:{l:1,r:1},
  mouth:{x:0,y:0,shape:{A:0,E:0,I:0,O:0,U:0}},
  head:{x:0,y:0,z:0},
  brow:0,
  pupil:{x:0,y:0}
  }, {
  stiffness: 0.15,
  damping: 0.7,
  precision:.1
});
  
  let friend_smoothPos = spring({
  position:{x:0,y:0,z:0},
  zoom:0.2,
  }, {
  stiffness: 0.15,
  damping: 0.7,
  precision:.1
});
  
  friend_smooth.subscribe(val=>{ 
    
    if(val && $profiles){
    const face = $profiles.friend.tracking.face
    face.head.x = val.head.x
    face.head.y = val.head.y
    face.head.z = val.head.z
    if(val.head.x >= -29 && val.head.x <= 29 && val.head.y >= -29 && val.head.y <= 29){
      face.brow = val.brow
      face.pupil = val.pupil  
      face.eye = stabilizeBlink(val.eye,val.head.x)
      face.mouth = val.mouth
    }  
   }

})
  
  friend_smoothPos.subscribe(val=>{
    if(!$profiles.friend.destroying){
              
        $profiles.friend.position.x = val.position.x
        $profiles.friend.position.y = val.position.y
        $profiles.friend.zoom = val.zoom
       // updatePos($profiles.friend.live2d,{
       //      width:$DIM.cw,
       //      height:$DIM.ch,
       //      zoom:$profiles.friend.zoom,
       //      position:$profiles.friend.position
       //    })
    }
  })
  
    let localStream, remoteStream
  
let rString = randomString(6, '0123456789');
let currentConnection = null;
myID.set(rString)
  
  let peer = new Peer(rString,{
        host: 'kalidoface-peer.glitch.me',
        path: '/peerjs/myapp',
        config: {
          iceServers: [
            { urls: "stun:stun.stunprotocol.org" }
          ]
        }
      });
  PEER.set(peer)
  
  friendID.subscribe(val=>{
    if(val){
      connectToPeer(val)
    }
  })
  
  const connectToPeer = (id) => {
  // let id = findURLParams().room;
  console.log(`Connecting to ${id}...`);
    // console.log(peer)
  let outConn = peer.connect(id);
    // console.log(outConn)
  handleConn(outConn)
  isHost.set(true)
  navigator.mediaDevices.getUserMedia({video: false, audio: true})
  .then((stream) => {
    localStream = stream
    let call = peer.call(id, stream);
    call.on('stream', renderAudio);
  })
  .catch((err) => {
    // logMessage('Failed to get local stream', err);
  });
};
  
  
  const handleDisconn = () => {
  stopStream()
  // console.log('disconnected')
  friendModel.set(null)
  friendID.set(null)
  p2pConnection.set(null);
  isHost.set(false)
  peerState.set('default')
}
  
  const stopStream = () => {
  if(localStream){
    localStream.getAudioTracks().forEach(track => track.stop());
    // console.log(localStream.getAudioTracks())
  }
  if(remoteStream){
    remoteStream.getAudioTracks().forEach(track => track.stop());
    // console.log(remoteStream.getAudioTracks())
  }
}

const renderAudio = stream => {
     document.querySelector('audio').srcObject = stream;
    document.querySelector('audio').play()
  }

  
let extconn = null
const handleConn = (conn,id) => {
    currentConnection = conn
    p2pConnection.set(currentConnection);
    // peerID.set(conn.peer)
    peerState.set('connecting')
    conn.on('data', (data) => {
      // console.log(data)
      if(data.type === 'modelObj'){
        console.log(JSON.parse(atob(data.res)))
        friendModel.set(JSON.parse(atob(data.res)))
        peerState.set('connected')
      }
 
      if(data.type === 'face' || data.type === "holistic"){
        friend_smooth_face.set({
          eye:{l:data.eyeL,r:data.eyeR},
          mouth:{x:data.mouthX,y:data.mouthY,
                 shape:{A:data.mouthA,E:data.mouthE,I:data.mouthI,O:data.mouthO,U:data.mouthU}
                },
          head:{x:data.headX,y:data.headY,z:data.headZ},
          brow:data.brow,
          pupil:{x:data.pupilX,y:data.pupilY}
        })
        $profiles.friend.tracking.pose.enable = true;
        $profiles.friend.detected = data.detected;
      }
      
      if(data.type === "holistic"){
        let incomingPose = {}
        expandXYZ(incomingPose,"RightUpperArm",data)
        expandXYZ(incomingPose,"LeftUpperArm",data)
        expandXYZ(incomingPose,"RightLowerArm",data)
        expandXYZ(incomingPose,"LeftLowerArm",data)
        expandXYZ(incomingPose,"LeftHand",data)
        expandXYZ(incomingPose,"RightHand",data)
        expandXYZ(incomingPose,"Spine",data)
        incomingPose.Hips = {
          position:{
                x:data.HipsPositionX,
                y:data.HipsPositionY,
                z:data.HipsPositionZ
          },
          rotation:{
                x:data.HipsRotationX,
                y:data.HipsRotationY,
                z:data.HipsRotationZ
          }
        }
        friend_smooth_pose.set(incomingPose)
        
        let incomingHands = {Left:{},Right:{}}
        
        expandXYZ(incomingHands,"Wrist",data,"Left")
        expandXYZ(incomingHands,"RingProximal",data,"Left")
        expandXYZ(incomingHands,"RingIntermediate",data,"Left")
        expandXYZ(incomingHands,"RingDistal",data,"Left")
        expandXYZ(incomingHands,"IndexProximal",data,"Left")
        expandXYZ(incomingHands,"IndexIntermediate",data,"Left")
        expandXYZ(incomingHands,"IndexDistal",data,"Left")
        expandXYZ(incomingHands,"MiddleProximal",data,"Left")
        expandXYZ(incomingHands,"MiddleIntermediate",data,"Left")
        expandXYZ(incomingHands,"MiddleDistal",data,"Left")
        expandXYZ(incomingHands,"ThumbProximal",data,"Left")
        expandXYZ(incomingHands,"ThumbIntermediate",data,"Left")
        expandXYZ(incomingHands,"ThumbDistal",data,"Left")
        expandXYZ(incomingHands,"LittleProximal",data,"Left")
        expandXYZ(incomingHands,"LittleIntermediate",data,"Left")
        expandXYZ(incomingHands,"LittleDistal",data,"Left")
        
        expandXYZ(incomingHands,"Wrist",data,"Right")
        expandXYZ(incomingHands,"RingProximal",data,"Right")
        expandXYZ(incomingHands,"RingIntermediate",data,"Right")
        expandXYZ(incomingHands,"RingDistal",data,"Right")
        expandXYZ(incomingHands,"IndexProximal",data,"Right")
        expandXYZ(incomingHands,"IndexIntermediate",data,"Right")
        expandXYZ(incomingHands,"IndexDistal",data,"Right")
        expandXYZ(incomingHands,"MiddleProximal",data,"Right")
        expandXYZ(incomingHands,"MiddleIntermediate",data,"Right")
        expandXYZ(incomingHands,"MiddleDistal",data,"Right")
        expandXYZ(incomingHands,"ThumbProximal",data,"Right")
        expandXYZ(incomingHands,"ThumbIntermediate",data,"Right")
        expandXYZ(incomingHands,"ThumbDistal",data,"Right")
        expandXYZ(incomingHands,"LittleProximal",data,"Right")
        expandXYZ(incomingHands,"LittleIntermediate",data,"Right")
        expandXYZ(incomingHands,"LittleDistal",data,"Right")
        
        friend_smooth_hand.Left.set(incomingHands.Left)
        friend_smooth_hand.Right.set(incomingHands.Right)
        
      }
 
    });
    conn.on('open', () => {
      conn.send('hello!');
      if($friendID){
        conn.send({
          res: $friendID,
          type: 'id'
        })
      }
      if(typeof $userModel === 'object'){
        let base64 = btoa(JSON.stringify($userModel));
        conn.send({
          res: base64,
          type: 'modelObj'
        })
      }

    });
    conn.on('close',()=>{
      // console.log('peer-disconnected')
      handleDisconn()
    })
  }
    
      peer.on('open', (id) => {
        console.log('My Chat ID is: ' + id);
        peerState.set('default')
      });
      peer.on('error', (error) => {
        if(error.message.includes('Could not connect to peer')){
          notifText.set({type:'error','text':'Could not connect to Chat ID'})
          handleDisconn()
        }
        console.error(error)
      });
      peer.on('disconnected',val => {
        handleDisconn()
        peerState.set('server-disconnect')
      })
      peer.on('close',val=>{
        // console.log('Connection Destroyed')
      })
    
      // Handle incoming data connection
      peer.on('connection', (conn) => {
        // console.log('incoming peer connection!');  
        handleConn(conn)
        isHost.set(false)
        console.log('being connect to')
        inputID.set(conn.peer)
      });
      
      peer.on('call', (call) => {
        navigator.mediaDevices.getUserMedia({video: false, audio: true})
          .then((stream) => {
            remoteStream = stream
            call.answer(stream); // Answer the call with an A/V stream.
            call.on('stream', renderAudio);
          })
          .catch((err) => {
            console.error('Failed to get local stream', err);
          });
      });
  
  
  
  userModel.subscribe(e=>{
    if($p2pConnection){
      if(typeof e === 'object'){
        let base64 = btoa(JSON.stringify(e));
        $p2pConnection.send({
          res: base64,
          type: 'modelObj'
        })
      }
      // if(typeof e === 'string'){
      //   $p2pConnection.send({
      //     res: e,
      //     type: 'modelString'
      //   })
      // }
    }
  })

</script>

<audio class="remote-audio" controls autoplay></audio>

<style>
  audio{
    pointer-events:none;
    opacity:0;
    position:absolute;
  }
</style>