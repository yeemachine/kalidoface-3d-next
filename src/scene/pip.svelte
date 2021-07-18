<script context="module">
import { writable,get } from 'svelte/store';
export const pipEnabled = writable(false);
  
export const togglePIP = async (e) => {
    pipEnabled.set(true)
}
</script>

<script>
import { onMount } from "svelte";
import { fade,scale } from 'svelte/transition'
import { cubicInOut } from "svelte/easing"; 
import {tooltip} from '../text/translations.js';
import {setLang,quickNavExpanded} from '../stores.js'
export let canvas
let Stream,pip

  const getStream = async () => {
    if (!Stream || Stream.active === false) {
      try{
        Stream = canvas.captureStream()
        handleStream(Stream,pip)
      }catch(error){
        pipEnabled.set(false)
        console(error)
      }
    }
  }
  
  let checkStream
const handleStream = (stream,videoObj) => {
  // console.log(stream)
  videoObj.srcObject = stream;
  checkStream = setInterval(() => {
    if (videoObj.readyState >= 3) {
      videoObj.play();
      activatePIP(videoObj)
      //stop checking every half second
      clearInterval(checkStream);
    }
  }, 500);
}

const stopStream = () => {
  if (Stream) {
    Stream.getTracks().forEach(track => track.stop());
  }
  pipEnabled.set(false)
  clearInterval(checkStream)
};
  
  const activatePIP = async (pip) => {
    try {
      // let pip = document.querySelector('#pip')
      if (pip !== document.pictureInPictureElement){
          pip.play();
          await pip.requestPictureInPicture();
      }
        else {
          await pip.exitPictureInPicture();
      }
    } catch (error) {
      console.log(`> Argh! ${error}`);
    } finally {
    }
  }
  
  pipEnabled.subscribe(val=>{
    if(val){
      getStream()
    }else{
      stopStream()
    }
  })
  

</script>

<video id="pip" bind:this={pip} class:enabled={$pipEnabled} on:enterpictureinpicture={()=>{}} on:leavepictureinpicture={()=>{pipEnabled.set(false)}} muted playsinline></video>



<style>
  #pip{
    position:absolute;
    bottom:-1000px;
    right:-1000px;
    max-width:240px;
    z-index:2;
    opacity:0;
    background:var(--offblack);
    pointer-events:none;
  }

</style>