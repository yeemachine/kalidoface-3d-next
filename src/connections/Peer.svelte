<script context="module">
import { writable,get } from 'svelte/store';
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
  import {userModel,friendModel,findDataURLFromList} from '../scene/character.svelte'
  import {profiles} from '../scene/profiles.svelte'
  import { spring } from 'svelte/motion';
  import faceMap,{stabilizeBlink} from '../utils/faceMap/index.js'
  import {initCounter,counter,resetTimer} from './timer.js'
  import {randomString} from '../utils/helpers.js'
  import Peer from 'peerjs';
  import {notifText} from '../ui/notif.svelte'
  import {cameraConfig} from '../scene/CameraControls.svelte'
  import {resolveJump} from '../tracking/onHolisticResults.svelte'
  import {SpringManager} from '../tracking/smooth.svelte';
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
  
    let localStream, remoteStream
  
let rString = randomString(6, '0123456789');
let currentConnection = null;
myID.set(rString)
  
  let peer = new Peer(rString,{
        host: 'kalidoface-peer.glitch.me',
        path: '/peerjs/myapp',
        config: {
          iceServers: [
            { urls: "stun:stun.stunprotocol.org" },
            { urls: "turn:avaritia.akiroz.life", username: "kf",  credential: "kf" }
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
        // console.log(data)
        SpringManager.friend.head.set({
            x:data.headX,
            y:data.headY,
            z:data.headZ,
            width: 0.3,
            height: 0.6,
            position: {
                x: 0.5,
                y: 0.5,
                z: 0,
            }
        })
        SpringManager.friend.face.set({
          eye:{l:data.eyeL,r:data.eyeR},
          mouth:{x:data.mouthX,y:data.mouthY,
                 shape:{A:data.mouthA,E:data.mouthE,I:data.mouthI,O:data.mouthO,U:data.mouthU}
                },
          head:{
            x:data.headX,
            y:data.headY,
            z:data.headZ,
            width: 0.3,
            height: 0.6,
            position: {
                x: 0.5,
                y: 0.5,
                z: 0,
            },
          },
          brow:data.brow,
          pupil:{x:data.pupilX,y:data.pupilY}
        })
        $profiles.friend.tracking.Pose.enable = true;
        $profiles.friend.detected = data.detected;
      }
      
      if(data.type === "holistic"){
        let incomingPose = {}
        expandXYZ(incomingPose,"RightUpperArm",data)
        expandXYZ(incomingPose,"LeftUpperArm",data)
        expandXYZ(incomingPose,"RightLowerArm",data)
        expandXYZ(incomingPose,"LeftLowerArm",data)
        expandXYZ(incomingPose,"RightUpperLeg",data)
        expandXYZ(incomingPose,"LeftUpperLeg",data)
        expandXYZ(incomingPose,"RightLowerLeg",data)
        expandXYZ(incomingPose,"LeftLowerLeg",data)
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
        
        let unJumpHips = resolveJump(
          get(SpringManager.friend.pose).Hips.rotation.y,
          incomingPose.Hips.rotation.y,
          1)

        if(unJumpHips){
          get(SpringManager.friend.pose).Hips.rotation.y = unJumpHips
        }
        SpringManager.friend.pose.set(incomingPose)
        
        let incomingHands = {Left:{},Right:{}}
        
        Object.keys(incomingHands).forEach(e=>{
          expandXYZ(incomingHands[e],e+"Wrist",data)
          expandXYZ(incomingHands[e],e+"RingProximal",data)
          expandXYZ(incomingHands[e],e+"RingIntermediate",data)
          expandXYZ(incomingHands[e],e+"RingDistal",data)
          expandXYZ(incomingHands[e],e+"IndexProximal",data)
          expandXYZ(incomingHands[e],e+"IndexIntermediate",data)
          expandXYZ(incomingHands[e],e+"IndexDistal",data)
          expandXYZ(incomingHands[e],e+"MiddleProximal",data)
          expandXYZ(incomingHands[e],e+"MiddleIntermediate",data)
          expandXYZ(incomingHands[e],e+"MiddleDistal",data)
          expandXYZ(incomingHands[e],e+"ThumbProximal",data)
          expandXYZ(incomingHands[e],e+"ThumbIntermediate",data)
          expandXYZ(incomingHands[e],e+"ThumbDistal",data)
          expandXYZ(incomingHands[e],e+"LittleProximal",data)
          expandXYZ(incomingHands[e],e+"LittleIntermediate",data)
          expandXYZ(incomingHands[e],e+"LittleDistal",data)
          SpringManager.friend.hands[e].set(incomingHands[e])
        })
                
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
          let newModel = $userModel
          newModel.data = findDataURLFromList(newModel)
          let base64 = btoa(JSON.stringify(newModel));
        console.log(newModel)
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
        let newModel = e
        newModel.data = findDataURLFromList(e)
        let base64 = btoa(JSON.stringify(newModel));
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