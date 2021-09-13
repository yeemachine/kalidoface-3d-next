<script context="module">
import { writable } from 'svelte/store';
import {getLocalStorage,subLocalStorage} from '../stores.js'

export const cameraOn = writable(false)
export const videoReady = writable(false)
export let videoEl = null
export let canvasEl = null;
export let canvasCtx = null;
export const hideCamera = writable(true);
export const hideFace = writable(true);

getLocalStorage(hideCamera,'hideCamera',false)
subLocalStorage(hideCamera,'hideCamera')
  
getLocalStorage(hideFace,'hideFace',true)
subLocalStorage(hideFace,'hideFace')
  
export const videoPosition = { 
  x: 0, 
  y: 0,
  sx:0,
  sy:0,
  m:8,
  hover:false,
  active:false
}
export const capturedDevices = writable({
  videoinput:[],
  audioinput:[],
  audiooutput:[],
  currentVideoIndex:0,
  currentAudioIndex:0
})
export let videoDeviceId = writable(null);
</script>
<script>
import {onMount} from 'svelte'
import { fade} from 'svelte/transition';
import { cubicInOut } from "svelte/easing"; 
import interact from "interactjs";
import {isTouch,DIM} from '../stores.js'
import {pipEnabled} from '../scene/pip.svelte';

function gotDevices(deviceInfos) {
  for (let i = 0; i !== deviceInfos.length; ++i) {
    const deviceInfo = deviceInfos[i];
    if (deviceInfo.kind === 'audioinput') {
      $capturedDevices.audioinput.push(deviceInfo)
    } else if (deviceInfo.kind === 'audiooutput') {
      $capturedDevices.audiooutput.push(deviceInfo)
    } else if (deviceInfo.kind === 'videoinput') {
      if(deviceInfo.deviceId!=='' && !$capturedDevices.videoinput.find(o => o.deviceId === deviceInfo.deviceId)){
        $capturedDevices.videoinput.push(deviceInfo)
      }
    } else {
      console.log('Some other kind of source/device: ', deviceInfo);
    }
  }
  
  $capturedDevices.videoinput.forEach((e,i)=>{
    //move any virtual cams to the end of array
    if(e.label.includes('Virtual') || e.label.includes('virtual')){
      $capturedDevices.videoinput.push($capturedDevices.videoinput.splice(i, 1)[0]);
    }
  })
  
  capturedDevices.set($capturedDevices) 
  if(!$videoDeviceId){
    videoDeviceId.set($capturedDevices.videoinput[0].deviceId)
  }
}
  
  function handleError(error) {
  console.log('navigator.MediaDevices.getUserMedia error: ', error.message, error.name);
}
  
navigator.mediaDevices.enumerateDevices().then(gotDevices).catch(handleError);
  
let Stream;

const getStream = () => {
  const constraints = {
    video: {
      deviceId: $videoDeviceId ? {exact: $videoDeviceId} : undefined,
      facingMode: "user",
      width: { min: 480, ideal: 640, max: 640 },
      height: { min: 480, ideal: 480, max: 640 },
    },
    audio: false
  };

  // Get access to the camera!
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    if (!Stream || Stream.active === false) {
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(stream => {
          Stream = stream;
          handleStream(stream);
          if($capturedDevices.videoinput.length === 0){
            return navigator.mediaDevices.enumerateDevices().then(gotDevices).catch(handleError);
          }
        })
        .catch(err => {
          alert('Please allow camera for facial tracking.');
          setTimeout(()=>{
            cameraOn.set(false)
            videoReady.set(false)
          }, 1000)
        });
    } else {
      stopStream();
    }
  }
};

let checkStream
const handleStream = (stream) => {
  // console.log(stream)
  videoEl.srcObject = stream;
  checkStream = setInterval(() => {
    if (videoEl.readyState >= 3) {
      videoReady.set(true)
      videoEl.play();
      videoEl.width = videoEl.videoWidth;
      videoEl.height = videoEl.videoHeight;
      //stop checking every half second
      clearInterval(checkStream);
    }
  }, 500);
}

const stopStream = () => {
  if (Stream) {
    Stream.getTracks().forEach(track => track.stop());
  }
  videoReady.set(false)
  clearInterval(checkStream)
};

cameraOn.subscribe(val=>{
  if(val){
    getStream()
  }else{
    setTimeout(stopStream,50)
  }
})
  
videoDeviceId.subscribe(val=>{
  if($cameraOn && $videoReady){
    stopStream()
    getStream()
  }
  // console.log(val)
})

  
  
  
  
  
onMount(()=>{
  canvasCtx = canvasEl.getContext('2d');
  interact('#drag-cam').draggable({
    // inertia: {
    //   resistance: isTouch ? 300 : 10,
    // },
    inertia:isTouch ? false : true,
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: 'parent',
        endOnly: true,
        elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
      })
    ],
    listeners: {
      start (event) {
        
      },
      move (event) {
        //save position in px
          videoPosition.x += event.dx
          videoPosition.y += event.dy
        //save position in ratio
          videoPosition.sx = videoPosition.x/($DIM.w - event.target.offsetWidth - videoPosition.m * 2)
          videoPosition.sy = videoPosition.y/($DIM.h - event.target.offsetHeight - videoPosition.m * 2)
        //apply position transforms
        event.target.style.webkitTransform =
        event.target.style.transform =
          `translate(${videoPosition.x}px, ${videoPosition.y}px)`
      }
    }
  }).on('down', function (event) {
    videoPosition.active = true
  }).on('up', function (event) {
    videoPosition.active = false
  })
  
})
  
  $:{
    if($videoReady){
      videoPosition.x = videoPosition.sx * ($DIM.w - videoEl.offsetWidth - videoPosition.m * 2)
      videoPosition.y = videoPosition.sy * ($DIM.h - videoEl.offsetHeight - videoPosition.m * 2)
      document.querySelector('#drag-cam').style.webkitTransform =
      document.querySelector('#drag-cam').style.transform =
        `translate(${videoPosition.x}px, ${videoPosition.y}px)`
    }
  }

</script>

<container>
<div id="drag-cam" 
     style="--margin:{videoPosition.m}" 
     class="{$hideCamera || !$cameraOn || !$videoReady || $pipEnabled ? 'hide' : ''}"
     on:mouseenter='{()=>{videoPosition.hover = true}}'
     on:mouseleave='{()=>{videoPosition.hover = false}}'
     >
  <video id="user-cam" class:hide={$hideFace} bind:this={videoEl}
         autoplay muted playsinline></video>
  <canvas bind:this={canvasEl} class="output_canvas" width="1280px" height="720px"></canvas>
   <button 
    on:click={()=>{hideCamera.set(true)}}
  > 
    <i class="kalicon notranslate solid small">close</i> 
  </button>
  </div>
</container>

<style>
  button{
    width:32px;
    height:32px;
    position:absolute;
    top:4px;
    right:8px;
    display:flex;
    align-items:center;
    justify-content:center;
    color:white;
    opacity:.5;
    z-index:2;
  }
  button:hover{
    opacity:1;
  }
container {
--margin:8px;
--topMargin:calc(env(safe-area-inset-top,0) + var(--margin));
--bottomMargin:calc(env(safe-area-inset-bottom,0) + var(--margin));
--leftMargin:calc(env(safe-area-inset-left,0) + var(--margin));
--rightMargin:calc(env(safe-area-inset-right,0) + var(--margin));
pointer-events:none;
width:calc(100% - var(--margin) - var(--margin));
  height:calc(100% - var(--topMargin) - var(--bottomMargin));
  position:absolute;
  top:var(--topMargin);left:var(--margin);
}


  #drag-cam{
    position:absolute;
    top:0;left:0;
        pointer-events:all;
    touch-action:none;
    z-index: 2;
    border-radius:28px;
    overflow:hidden;
    background:#2A2A2A;
    background-image:url(https://cdn.glitch.com/29e07830-2317-4b15-a044-135e73c7f840%2FVideoCover.png?v=1626221874809);
    background-size:contain;
    background-position: center;
    background-repeat: no-repeat;
  }
  #drag-cam.hide{
    pointer-events:none;
    opacity:0;
  }
  video{
    position:relative;
    display: block;
    width: 200px;
    height:auto;
    z-index: 2;
    margin: 0;
    padding: 0;
    transform-origin:center;
    transform:scale(-1,1);
    z-index:-1
/*     opacity: 0;
  */
  }
  video.hide{
    opacity:0;
  }
  .hide canvas{
    opacity:0;
  }
    canvas{
    position:absolute;
    width:100%;
    height:auto;
    z-index:1;
    bottom:0;
    left:0;
    transform-origin:center;
    transform:scale(-1,1)
  }
  
  
/*     @media only screen and (hover: hover) and (pointer: fine) {
      #drag-cam{
        background:#00000000
      }
      
      #drag-cam:hover{
        background:#00000040
      }

  } */
  @media only screen and (max-width: 600px) {
    video{
    width:160px
    }
  }
  
</style>