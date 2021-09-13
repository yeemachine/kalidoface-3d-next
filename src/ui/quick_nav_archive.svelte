<script>
import {onMount} from 'svelte'
import { fade,scale } from 'svelte/transition';
import { cubicInOut } from "svelte/easing"; 
import {quickNavExpanded,firstLoad,inactive,infoExpanded,DIM,largeWipe,setLang,hasPIP} from '../stores.js'
import {ftueState,updateFtue} from './ftue.svelte';
import {cameraOn} from '../tracking/webcam.svelte';
import {peerState,callTime} from '../connections/Peer.svelte';
import {userExps} from '../scene/character.svelte';
import {pipEnabled,togglePIP} from '../scene/pip.svelte';
import {toggleView,toggleFirstPerson,cameraConfig} from '../scene/CameraControls.svelte';


import SubNav from './sub_nav.svelte'
import SideNav from './side_nav.svelte'
import Filedrop from './filedrop.svelte';
import {tooltip} from '../text/translations.js';
  
let selected;
let sideSelected;
let sidenav
let time;
  
const handleClick = (e,state)=>{
  e.preventDefault()
  if(state === 'exp' && $userExps.list.length === 0){
    return
  }
  if(state === 'exp'){
    if(sideSelected === 'exp'){
      sidenav.closeMobile()
      return
    }
    sideSelected = state
  }else{
    selected = state
  }
}

const handleCamera = () =>{
  updateFtue('camera')
  cameraOn.set(!$cameraOn)
}


const handleInfo = e => {
  // e.preventDefault()
  if(!$largeWipe.transition){
    infoExpanded.set(!$infoExpanded)
  }
}

  const resetTimer = () => {
    clearTimeout(time);
    time = setTimeout(()=>{
      if(!$quickNavExpanded){
        inactive.set(true)
      }
    }, 2000)
  }
  
  const handleInactivity = () => {
    if(!$inactive && !$quickNavExpanded){
      resetTimer()
    }
  }
  
  const unhide = (e) => {
    e.preventDefault()
    inactive.set(false);
    resetTimer()
  }
  
  $:{
    if($firstLoad && !$quickNavExpanded){
      handleInactivity()
    }else{
      clearTimeout(time);
    }
  }
  
  firstLoad.subscribe(e=>{
    if(e){
      setTimeout(()=>{
      quickNavExpanded.set(true)
       },800)
    }
  })
  
  
</script>

<nav class="menu no_highlights {selected ? 'disabled' : ''} {$inactive ? 'inactive' : ''}">
  <input bind:checked={$quickNavExpanded} type="checkbox" href="#" class="menu-open" name="menu-open" id="menu-open"/>
  <label class="menu-open-button no_highlights" for="menu-open"
         on:mouseover={()=>{clearTimeout(time)}}
        on:mouseout={resetTimer}
         >
    <i class="kalicon fill notranslate">jellyfill</i>
    <i class="kalicon solid variable notranslate"></i>
  </label>
  

  <button class="menu-item no_highlights char" 
          on:click={(e)=>{handleClick(e,'live2d')}}
          on:touch={(e)=>{handleClick(e,'live2d')}}
          data-text="{tooltip.char[$setLang]}"
  > <i class="kalicon notranslate fill {selected==='live2d' ? 'forceAnimate' : ''}">jellyfill</i><i class="kalicon solid notranslate">charalt</i></button>
    <button class="menu-item no_highlights sticker"
             on:click={(e)=>{handleClick(e,'sticker')}}
          on:touchend={(e)=>{handleClick(e,'sticker')}}
      data-text="{tooltip.sticker[$setLang]}"
  > <i class="kalicon notranslate fill {selected==='sticker' ? 'forceAnimate' : ''}">jellyfill</i><i class="kalicon notranslate solid">sticker</i> </button>
  <button class="menu-item video no_highlights {$cameraOn ? 'selected' : ''}"
    data-text="{$cameraOn ? tooltip.cameraOn[$setLang] : tooltip.cameraOff[$setLang]}"
    on:click={handleCamera}
  > 
    <i class="kalicon notranslate fill">jellyfill3</i>
    <i class="kalicon notranslate solid variable {$cameraOn ? 'end' : ''}">video</i> 
    {#if $ftueState.camera}
      <div out:fade="{{duration:600}}" class="pulse"></div>
    {/if}
  </button>
  <button class="menu-item no_highlights bg"
          on:click={(e)=>{handleClick(e,'bg')}}
          on:touchend={(e)=>{handleClick(e,'bg')}}
    data-text="{tooltip.bg[$setLang]}"
  > <i class="kalicon notranslate fill {selected==='bg' ? 'forceAnimate' : ''}">jellyfill2</i><i class="kalicon notranslate solid">backgroundalttwo
</i> </button>
  
    <button class="menu-item no_highlights {$peerState} call"
          on:click={(e)=>{handleClick(e,'call')}}
          on:touchend={(e)=>{handleClick(e,'call')}}
      data-text="{($peerState === 'connected') ? $callTime : tooltip.call[$setLang]}"
  > <i class="kalicon notranslate fill {selected==='call' ? 'forceAnimate' : ''}">jellyfill3</i>
      <i class="kalicon notranslate solid">phone</i> 
      {#if $peerState === 'connected'}
      <div class="pulse"></div>
      {/if}
  </button>

</nav>

<SubNav bind:selected={selected} bind:sideSelected={sideSelected}/>
<SideNav bind:this={sidenav} bind:selected={sideSelected}/>

{#if $quickNavExpanded}
  <button class="subButton infoToggle no_highlights 
                 {$infoExpanded ? 'selected' : ''}
                 {$cameraOn ? 'disabled' : ''}
                 "
          transition:fade="{{ duration: 200, delay:0 }}" 
          on:click={handleInfo}
  >
    <i class="kalicon notranslate fill small">jellyfill3</i> 
    <i class="kalicon notranslate solid small variable {$infoExpanded ? 'end' : ''}">
    info
    </i> 
</button>
{/if}

<section class="secondaryMenu">
  {#if $quickNavExpanded && $userExps.list.length > 0 }
    <button class="subButton expToggle no_highlights exp
                    {sideSelected==='exp' ? 'selected' : ''}"
               on:click={(e)=>{handleClick(e,'exp')}}
            on:touchend={(e)=>{handleClick(e,'exp')}}
      data-text="{tooltip.exp[$setLang]}"
      in:scale="{{ duration: 300, easing: cubicInOut }}"
      out:scale="{{ duration: 300, easing: cubicInOut}}"
    > <i class="kalicon notranslate fill small {selected==='exp' ? 'forceAnimate' : ''}">jellyfill</i>
      <i class="kalicon notranslate solid small">emotealt</i> 
  </button>
  {/if}
    {#if !$pipEnabled && hasPIP}
  <button class="subButton pip"
             on:click={togglePIP}
          class:hide={!$quickNavExpanded} 
          in:scale="{{ duration: 300, easing: cubicInOut }}"
          out:scale="{{ duration: 300, easing: cubicInOut}}"
          data-text="{tooltip.pip[$setLang]}"
  > <i class="kalicon notranslate fill small">jellyfill</i>
    <i class="kalicon notranslate solid small">background</i> 
</button>
{/if}
  



</section>
  <div class="tabs">
    
    <button class="subButton"
             on:click={toggleView}
          class:hide={!$quickNavExpanded} 
          class:selected={($cameraConfig.freeCamera && !$cameraConfig.firstPerson)}
          in:scale="{{ duration: 300, easing: cubicInOut }}"
          out:scale="{{ duration: 300, easing: cubicInOut}}"
          data-text="{tooltip.selfie[$setLang]}"
  >
    <i class="kalicon notranslate solid small">background</i> 
</button>
      <button class="subButton"
             on:click={toggleFirstPerson}
          class:hide={!$quickNavExpanded} 
          class:selected={$cameraConfig.firstPerson}
          in:scale="{{ duration: 300, easing: cubicInOut }}"
          out:scale="{{ duration: 300, easing: cubicInOut}}"
          data-text="{tooltip.firstPerson[$setLang]}"
  > 
    <i class="kalicon notranslate solid small">background</i> 
</button>
</div>

<div 
     class="scrim {!$inactive ? 'hide' : ''}"
     on:mousemove={unhide}
     on:mouseout={resetTimer}
     on:click={unhide}
     on:touchstart={unhide}
></div>

<Filedrop selected={selected}/>

<style>

    .menu-item:before{
      position: absolute;
      width: max-content;
      top: 56px; 
      font-size: 10px;
      padding: 8px;
      margin-top: 4px;
      height: max-content;
      line-height: 1.5;
      background: #7f7c93;
      color: white;
      font-weight: 700;
      border-radius:4px;
      pointer-events: none;
      opacity: 0;
      transition: .2s;
    }
 
    .menu-item.char:before{
      left: -2px;
      content: attr(data-text);
    }
    .menu-item.sticker:before{
      content: attr(data-text);
    }
    .menu-item.video:before{
      content: attr(data-text);
    }
  .menu-item.video .kalicon.fill{
    color:var(--lightBlue);
  }
/*   .menu-item.video:hover .kalicon.fill{
    color:var(--lightBlue);
  } */
  .menu-item.video.selected .kalicon.fill{
    color:var(--lightRed);
  }
  
  .pulse{
    --scale:2.4;
    top: 7px;
    width:80%;
    height:80%;
    z-index:-1;
/*      background: radial-gradient(circle, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 55%, rgba(255,255,255,.3) 80%, rgba(255,255,255,.3) 100%); */
  }
  
    .menu-item.bg:before{
      content: attr(data-text);
    }
    .menu-item.call:before{
      left: -2px;
      content: attr(data-text);
    }
  .menu-item.call.connected:before{
    min-width:36px;
  }
  .secondaryMenu{
    position:fixed;
    top:42px;
    right:0;
    display:block;
    z-index:1;
  }
  .secondaryMenu .subButton{
    position:relative;
/*     height:48px; */
    z-index:3;
  }
  .tabs{
/*     background:rgba(0,0,0,0.2); */
/*     border-radius:8px; */
/*     margin-right:8px; */
    top: unset;
    bottom: calc(env(safe-area-inset-bottom, 0) / 2 + 8px);
    position: fixed;
    z-index: 1;
    right: 0;
  }
  .tabs .subButton{
/*     width:auto; */
    background:rgba(0,0,0,0.4);
    border-bottom:1px solid rgba(255,255,255,0.1);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    position:relative;
/*     height:36px; */
  }
  .tabs .subButton:first-child{
    border-top-left-radius:8px;
    border-top-right-radius:8px;
  }
  .tabs .subButton:last-child{
    margin-top:0;
    border-bottom-left-radius:8px;
    border-bottom-right-radius:8px;
    border-bottom:0
  }
  .tabs .subButton.selected{
    background:white;
  }
  .tabs hr{
    width:36px;
    padding:0;
    margin:0;
  }
  
  .subButton.hide{
    opacity:0;
  }
  .subButton.pip{
/*     position: fixed;
    bottom: 0; */
    top: unset;
/*     height: 64px; */
  } 
    .subButton{
    width: 40px;
    height: 40px;
    position:fixed;
    margin-right:8px;
    margin-top:8px;
    top:0;
    top: calc(env(safe-area-inset-top, 0) + env(safe-area-inset-right, 0) / 2);
    right:0;
    right:calc(env(safe-area-inset-right, 0) / 2);
    color:white;
    z-index:5;
    display: flex;
    align-items: center;
    justify-content: center;
    transition:opacity .2s;
  }
  .subButton:before{
      position: absolute;
      width: max-content;
      right: 52px;
      font-size: 10px;
      padding: 8px;
      margin-top: 4px;
      height: max-content;
      line-height: 1.5;
      background: #7f7c93;
      color: white;
      font-weight: 700;
      border-radius:4px;
      pointer-events: none;
      opacity: 0;
      transition: .2s;
    }


/*   .infoToggle{
    margin-right:8px;
  } */
  .secondaryMenu .subButton:before{
    content: attr(data-text);
  }

  .subButton.selected .solid{
    color:var(--lightBlue);
  }
  .infoToggle.selected .solid{
    color:var(--lightRed);
  }
  .subButton.selected .fill{
    color:white;
    opacity:1;
  }
  .subButton .hide:not(.selected),.subButton .inactive:not(.selected){
    opacity:0;
    pointer-events:none;
  }
  .subButton .fill{
    color:var(--iconbg);
    opacity:0.35;
  }

  .subButton .solid{
    color:white;
  }
    .scrim{
    width: 100px;
    height: 100%;
    position:fixed;
    bottom:0;
    left:0;
    z-index:2
  }
  .scrim.hide{
    pointer-events:none
  }
  .menu {
  --menu-width:190px;
  --menu-height:280px;
/*   --open1: translate3d(7px, -96.33693px, 0);
  --open2: translate3d(64.95044px, -68.7509px, 0);
  --open3: translate3d(95.09158px, -0.00004px, 0);
  --open4: translate3d(64.95044px, 64.2491px, 0);
  --open5: translate3d(7px, 96.66307px, 0); */
  --open1: translate3d(7px, -92.33693px, 0);
  --open2: translate3d(58.95044px, -56.7509px, 0);
  --open3: translate3d(92.09158px, -0.00004px, 0);
  --open4: translate3d(58.95044px, 56.2491px, 0);
  --open5: translate3d(7px, 92.66307px, 0);
  position: fixed;
  left: 10px;
  left:calc(env(safe-area-inset-left, 10px));
  bottom: calc(50% - (var(--menu-height) * 0.5));
  padding-top: 20px;
  padding-left: calc(var(--menu-width) * 0.5);
  width: var(--menu-width);
  height: var(--menu-height);
  box-sizing: border-box;
  font-size: 20px;
  text-align: left;
  z-index:2;
  pointer-events:none;
  transition:opacity .2s;
}

.menu-item, .menu-open-button {
  --button-width:48px;
  border-radius: 100%;
  width: var(--button-width);
  height: var(--button-width);
  position: absolute;
  margin-top: calc(var(--button-width) * -0.5);
  margin-left:auto;
  bottom: calc(50% - (var(--button-width) * 0.5));
  left: 10px;
  color: white;
  justify-content: center;
  align-items: center;
  display: flex;
  text-align: center;
  line-height: 48px;
  -webkit-transform: translate3d(0, 0, 0);
          transform: translate3d(0, 0, 0);
  -webkit-transition: -webkit-transform ease-out 200ms;
  transition: -webkit-transform ease-out 200ms;
  transition: transform ease-out 200ms;
  transition: transform ease-out 200ms, -webkit-transform ease-out 200ms;
  pointer-events:all;
}
  .disabled .menu-item{
    pointer-events:none;
  }
  .inactive .menu-item,.inactive label{
    pointer-events:none;
  }
  .menu.inactive{
    opacity:0;
  }
  .menu-open:checked ~ .menu-item.connected:after{
    content: '';
    position: absolute;
    top: 7px;
    right: 0px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #4bc34b;
    animation: greenBG 2.4s infinite;
    animation-timing-function: cubic-bezier(0.26, 0.3, 0.66, 0.65);
  }
  
  .menu-open:checked ~ .menu-item.connected:after{
    content: '';
    position: absolute;
    top: 7px;
    right: 0px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #4bc34b;
    animation: greenBG 2.4s infinite;
    animation-timing-function: cubic-bezier(0.26, 0.3, 0.66, 0.65);
  }
  
  
  .menu-item.unavailable{
    cursor:default;
  }
  .menu-item.unavailable .kalicon{
    opacity:0.3;
  }
.menu-open-button .kalicon.solid:after{
  content:'plus';
  transition: .2s;
}

.menu-open:checked + .menu-open-button .kalicon.solid:after{
  font-variation-settings:'anim' 100;
  color:var(--iconbg)
}

  .menu-open-button .solid{
    color:var(--lightBlue)
  }
  .menu-open-button .fill{
    color:white;
  }
  
  .menu-open:checked + .menu-open-button .kalicon.fill{
    color:white;
  }

.menu-open {
  display: none;
}

.menu-item:nth-child(7) {
  -webkit-transition-duration: 70ms;
          transition-duration: 70ms;
}
.menu-item:nth-child(6) {
  -webkit-transition-duration: 130ms;
          transition-duration: 130ms;
}
.menu-item:nth-child(5) {
  -webkit-transition-duration: 190ms;
          transition-duration: 190ms;
}
.menu-item:nth-child(4) {
  -webkit-transition-duration: 250ms;
          transition-duration: 250ms;
}
.menu-item:nth-child(3) {
  -webkit-transition-duration: 310ms;
          transition-duration: 310ms;
}

.menu-open-button {
  z-index: 2;
  -webkit-transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
          transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
  -webkit-transition-duration: 400ms;
          transition-duration: 400ms;
  -webkit-transform: scale(1, 1) translate3d(0, 0, 0);
          transform: scale(1, 1) translate3d(0, 0, 0);
  cursor: pointer;
}

.menu-open-button:hover {
  -webkit-transform: scale(1.1, 1.1) translate3d(0, 0, 0);
          transform: scale(1.1, 1.1) translate3d(0, 0, 0);
}

.menu-open:checked + .menu-open-button {
  -webkit-transition-timing-function: linear;
          transition-timing-function: linear;
  -webkit-transition-duration: 200ms;
          transition-duration: 200ms;
  -webkit-transform: scale(0.6, 0.6) translate3d(0, 0, 0);
          transform: scale(0.6, 0.6) translate3d(0, 0, 0);
}

.menu-open:checked ~ .menu-item {
  -webkit-transition-timing-function: cubic-bezier(0.935, 0, 0.34, 1.33);
          transition-timing-function: cubic-bezier(0.935, 0, 0.34, 1.33);
}

.menu-open:not(:checked) ~ .menu-item .fill{
  text-shadow:none
}
.menu-open:checked ~ .menu-item:nth-child(7) {
  -webkit-transition-duration: 200ms;
          transition-duration: 200ms;
  -webkit-transform: var(--open5);
          transform: var(--open5);
}
.menu-open:checked ~ .menu-item:nth-child(6) {
  -webkit-transition-duration: 280ms;
          transition-duration: 280ms;
  -webkit-transform: var(--open4);
          transform: var(--open4);
}
.menu-open:checked ~ .menu-item:nth-child(5) {
  -webkit-transition-duration: 360ms;
          transition-duration: 360ms;
  -webkit-transform: var(--open3);
          transform: var(--open3);
}
.menu-open:checked ~ .menu-item:nth-child(4) {
  -webkit-transition-duration: 440ms;
          transition-duration: 440ms;
  -webkit-transform: var(--open2);
          transform: var(--open2);
}
.menu-open:checked ~ .menu-item:nth-child(3) {
  -webkit-transition-duration: 520ms;
          transition-duration: 520ms;
  -webkit-transform: var(--open1);
          transform: var(--open1);
}
  

  
  
  @media only screen and (max-width: 600px) {
  .menu{
    --menu-width:300px;
    --menu-height:190px;
    --open1: translate3d(-104.40705px, -8.33693px, 0);
    --open2: translate3d(-62.04956px, -60.7509px, 0);
    --open3: translate3d(0.09158px, -83.00004px, 0);
    --open4: translate3d(62.18543px, -60.7509px, 0);
    --open5: translate3d(104.42548px, -8.51916px, 0);
    left: 50%;
    bottom:8px;
    margin-left: calc(var(--menu-width) * -0.5);
  }
  .menu-item, .menu-open-button {
    margin-top:auto;
    margin-left: calc(var(--button-width) * -0.5);
    bottom: 8px;
    left:auto;
  }
    .scrim{
      width:100%;
      height:80px;
    }
    
    .menu-item:before{
      top:unset;
      bottom: 56px; 
    }
    .menu-item.call:before{
      left: unset;
      right:-2px;
    }
    .tabs{
/*     position: relative; */
    top: calc(env(safe-area-inset-bottom, 0) / 2 + 56px);
/*     bottom: calc(env(safe-area-inset-bottom, 0) / 2 + 160px); */
    bottom: unset;
/*     height: 48px; */
  } 

} 
  
@media all and (display-mode: fullscreen) and (max-width: 600px) {
  .menu{
    bottom:calc(env(safe-area-inset-bottom, 0) / 2);
  }
}
 
  
  @media only screen and (hover: hover) and (pointer: fine) {
    .menu-item:hover{
      z-index:1;
    }
    .subButton:hover:before,.menu-item:hover:before{
      opacity:1;
    }
  
  }
  
  @media only screen and (hover: none) {
    .video:hover .fill, label:hover .fill{
      animation: jiggle 0.4s 1;
      animation-timing-function: cubic-bezier(0.26, 0.3, 0.66, 0.65);
    }
   
  }
  


</style>