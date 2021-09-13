<script>
import {onMount} from 'svelte'
import { fade,scale } from 'svelte/transition';
import { cubicInOut } from "svelte/easing"; 
import {quickNavExpanded,firstLoad,inactive,infoExpanded,DIM,largeWipe,setLang,hasPIP,isTouch} from '../stores.js'
import {haptic} from '../utils/helpers.js'

import {ftueState,updateFtue} from './ftue.svelte';
import {cameraOn} from '../tracking/webcam.svelte';
import {peerState,callTime} from '../connections/Peer.svelte';
import {profiles} from '../scene/profiles.svelte';
import {pipEnabled,togglePIP} from '../scene/pip.svelte';
import {toggleView,toggleFirstPerson,cameraConfig,pivotRotation} from '../scene/CameraControls.svelte';


import SubNav, {wipeComponent} from './sub_nav.svelte'
import Filedrop from './filedrop.svelte';
import SvgBlob from "./svgBlob.svelte"
import SvgBlobSmall from "./svgBlobSmall.svelte"
import SvgOrientation from "./svgOrientation.svelte"
import SvgSettings from "./icons/svgSettings.svelte"
import SvgFlip from "./icons/svgFlip.svelte"
import SvgLight from "./icons/svgLight.svelte"
import SvgClothing from "./icons/svgClothing.svelte"

import {tooltip} from '../text/translations.js';
  
let selected;
let forceClose = false;
let hoverCameraControls = false;
let time;
  
const handleClick = (e,state)=>{
  e.preventDefault()
  if(selected === state){
    let isMobile = $DIM.w < 600;
    if(isMobile){
      forceClose = true;
      return
    }
    // selected = null;
    updateFtue(selected)
    wipeComponent.animate({
      action:'close',
      axis:isMobile ? 'y' : 'x',
      _flip:isMobile ? false : true,
      _curve:"curve",
      _numPoints:5,
      _duration:isMobile ? 0 : 600
    })
    selected = null
  }else{
    selected = state
  }
}

const handleCamera = () =>{
  updateFtue('camera')
  cameraOn.set(!$cameraOn)
  haptic()
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

<nav class="menu no_highlights {!$quickNavExpanded ? 'hide' : ''}">
    
  <input bind:checked={$quickNavExpanded} type="checkbox" href="#" class="menu-open" name="menu-open" id="menu-open"/>
  
    <button class="menu-item video no_highlights {$cameraOn ? 'selected' : ''}"
    data-text="{$cameraOn ? tooltip.cameraOn[$setLang] : tooltip.cameraOff[$setLang]}"
    on:click={handleCamera}
  > 
    <i class="kalicon notranslate fill">jellyfill3</i>
    <i class="kalicon notranslate solid variable {$cameraOn ? 'end' : ''}">video</i> 
  </button>

  <button class="menu-item no_highlights char {selected==='char' ? 'selected' : ''}" 
          on:click={(e)=>{handleClick(e,'char')}}
          on:touch={(e)=>{handleClick(e,'char')}}
          data-text="{tooltip.char[$setLang]}"
  > <i class="kalicon notranslate fill medium {selected==='char' ? 'forceAnimate' : ''}">jellyfill</i>
    <i class="kalicon solid medium notranslate">charalt</i></button>
    <button class="menu-item no_highlights sticker {selected==='sticker' ? 'selected' : ''}"
             on:click={(e)=>{handleClick(e,'sticker')}}
          on:touchend={(e)=>{handleClick(e,'sticker')}}
      data-text="{tooltip.sticker[$setLang]}"
  > <i class="kalicon notranslate fill medium {selected==='sticker' ? 'forceAnimate' : ''}">jellyfill</i>
      <i class="kalicon notranslate solid medium">sticker</i> </button>

  <button class="menu-item no_highlights bg {selected==='bg' ? 'selected' : ''}"
          on:click={(e)=>{handleClick(e,'bg')}}
          on:touchend={(e)=>{handleClick(e,'bg')}}
    data-text="{tooltip.bg[$setLang]}"
  > <i class="kalicon notranslate fill medium {selected==='bg' ? 'forceAnimate' : ''}">jellyfill2</i>
    <i class="kalicon notranslate solid medium">backgroundalttwo
</i> </button>
  
    <button class="menu-item no_highlights {$peerState} call {selected==='call' ? 'selected' : ''}"
          on:click={(e)=>{handleClick(e,'call')}}
          on:touchend={(e)=>{handleClick(e,'call')}}
      data-text="{($peerState === 'connected') ? $callTime : tooltip.call[$setLang]}"
  > <i class="kalicon notranslate fill medium {selected==='call' ? 'forceAnimate' : ''}">jellyfill3</i>
      <i class="kalicon notranslate solid medium">phone</i> 
      {#if $peerState === 'connected'}
      <div class="pulse"></div>
      {/if}
  </button>
  
  {#if $quickNavExpanded && $profiles.user.model && $profiles.user.model.extractedParts.length>0}
      <button class="menu-item no_highlights exp {selected==='exp' ? 'selected' : ''}"
                in:scale="{{ duration: 300, easing: cubicInOut }}"
        out:scale="{{ duration: 300, easing: cubicInOut}}"
            on:click={(e)=>{handleClick(e,'exp')}}
            on:touchend={(e)=>{handleClick(e,'exp')}}
        data-text="{tooltip.exp[$setLang]}"
    > <i class="kalicon notranslate fill medium {selected==='exp' ? 'forceAnimate' : ''}">jellyfill3</i>
        <i class="kalicon notranslate solid medium svgIcon"><SvgClothing/></i> 
    </button>
  {/if}

    <SvgBlob hide={!$quickNavExpanded}/>

</nav>

<SubNav bind:selected={selected} bind:forceClose={forceClose}/>

{#if 
(!$inactive || $infoExpanded ) 
&& ((!selected && $DIM.w < 600) || $DIM.w > 600 )}
    <button class="subButton infoToggle no_highlights 
                 {$infoExpanded ? 'selected' : ''}
                 {$cameraOn ? 'disabled' : ''}
                 "
          style="{$infoExpanded ? 'z-index:5' : ''}"
           in:scale="{{ duration: 300, easing: cubicInOut }}"
      out:scale="{{ duration: 300, easing: cubicInOut,delay:hasPIP ? 150 : 100}}"
          on:click={handleInfo}
  >
    <i class="kalicon notranslate fill small">jellyfill3</i> 
    <i class="kalicon notranslate solid small variable {$infoExpanded ? 'end' : ''}">
    info
    </i> 
</button>

<section class="secondaryMenu">
  
   <button class="subButton no_highlights"
           class:selected={selected==="settings"}
           on:mouseover={()=>{clearTimeout(time)}}
        on:mouseout={resetTimer}
               on:click={(e)=>{handleClick(e,'settings')}}
          on:touchend={(e)=>{handleClick(e,'settings')}}
      data-text="{tooltip.settings[$setLang]}"
      in:scale="{{ duration: 300, easing: cubicInOut, delay:50 }}"
      out:scale="{{ duration: 300, easing: cubicInOut,delay:hasPIP ? 100 : 50}}"
    > <i class="kalicon notranslate fill small {selected==='settings' ? 'forceAnimate' : ''}">jellyfill</i>
      <i class="kalicon notranslate solid small">
        settings
     </i> 
  </button>
  
     <button class="subButton no_highlights"
           class:selected={selected==="lights"}
           on:mouseover={()=>{clearTimeout(time)}}
        on:mouseout={resetTimer}
               on:click={(e)=>{handleClick(e,'lights')}}
          on:touchend={(e)=>{handleClick(e,'lights')}}
      data-text="{tooltip.lights[$setLang]}"
      in:scale="{{ duration: 300, easing: cubicInOut, delay:50 }}"
      out:scale="{{ duration: 300, easing: cubicInOut,delay:hasPIP ? 100 : 50}}"
    > <i class="kalicon notranslate fill small {selected==='lights' ? 'forceAnimate' : ''}">jellyfill</i>
      <i class="kalicon notranslate solid small svgIcon">
        <SvgLight/>
     </i> 
  </button>
  
   <button class="subButton no_highlights"
           on:mouseover={()=>{clearTimeout(time)}}
        on:mouseout={resetTimer}
               on:click={(e)=>{e.preventDefault();quickNavExpanded.set(!$quickNavExpanded)}}
            on:touchend={(e)=>{e.preventDefault();quickNavExpanded.set(!$quickNavExpanded)}}
      data-text="{$quickNavExpanded ? tooltip.hide[$setLang] : tooltip.show[$setLang]}"
      in:scale="{{ duration: 300, easing: cubicInOut, delay:100 }}"
      out:scale="{{ duration: 300, easing: cubicInOut,delay:hasPIP ? 50 : 0}}"
    > <i class="kalicon notranslate fill small {selected==='exp' ? 'forceAnimate' : ''}">jellyfill</i>
      <i class="kalicon notranslate solid small">
        {$quickNavExpanded ? 'show' : 'hide'}
     </i> 
  </button>
  


  
  {#if !$pipEnabled && hasPIP}
  <button class="subButton pip"
             on:click={togglePIP}
          in:scale="{{ duration: 300, easing: cubicInOut, delay:150 }}"
          out:scale="{{ duration: 300, easing: cubicInOut}}"
          data-text="{tooltip.pip[$setLang]}"
  > 
    <i class="kalicon notranslate fill small">jellyfill</i>
    <i class="kalicon notranslate solid small">
        pip
     </i> 
  </button>
  {/if}

</section>
{/if}



<section 
    class="cameraMenu"
    class:hide={!$quickNavExpanded}
    on:mouseleave="{()=>{
                   if(isTouch){return}
                   hoverCameraControls=false
                   }}"
         >
   <button class="menu-item no_highlights {$cameraConfig.freeCamera ? 'selected' : ''}"
    class:hide={!$quickNavExpanded || (!hoverCameraControls && !$cameraConfig.freeCamera)}
    data-text="{$cameraConfig.firstPerson ? tooltip.firstPerson[$setLang] : tooltip.selfie[$setLang]}"
    on:mouseover="{()=>{
                  if(isTouch){return}
                  hoverCameraControls=true
                  }}"
    on:click={toggleView}
  > 
     <SvgOrientation active={$cameraConfig.freeCamera} rotation={$pivotRotation}/>

  </button>
   <button class="menu-item no_highlights"
    class:hide={!$quickNavExpanded || (!hoverCameraControls && !$cameraConfig.freeCamera)}
    data-text="{tooltip.flip[$setLang]}"
    on:click={toggleFirstPerson}
  > 
    <i class="kalicon notranslate fill medium">jellyfill3</i>
    <i class="kalicon notranslate solid medium">flip</i> 
  </button>
 <SvgBlobSmall hide={!$quickNavExpanded || (!hoverCameraControls && !$cameraConfig.freeCamera)}/>
</section>

{#if $inactive}
<div 
     class="scrim"
     on:mousemove={unhide}
     on:mouseout={resetTimer}
     on:click={unhide}
     on:touchstart={unhide}
></div>
{/if}

<Filedrop selected={selected}/>

<style>

  .menu-item.selected .kalicon.fill{
    --iconbg:var(--bgThemeLight)
  }
  .cameraMenu{
    --close1: translate3d(-56px, 21.33693px, 0);
    --scale1: scale(.8);
    position: fixed;
        width: 119px;
    height: 88px;
    left: 16px;
    left: calc(env(safe-area-inset-left,0) / 3 + 8px);
    bottom: 24px;
    bottom: calc(env(safe-area-inset-bottom,0) + 8px);
    z-index: 1;
    transition:opacity .4s;
  }
  .cameraMenu .menu-item:before{
    right:unset;
    left:8px;
    border-bottom-right-radius:4px;
    border-bottom-left-radius:0;
  }
  .cameraMenu .menu-item:first-child{
        --button-width: 66px;
    bottom: 11px;
    right: unset;
    left: 10px;
    z-index: 1;
    transition:background .2s, transform .36s;
    background:var(--iconbg)
  }
  .cameraMenu .menu-item:first-child:before{
    bottom:72px;
    left:4px;
  }
  .cameraMenu .menu-item.selected:first-child:before{
    opacity:0;
  }
  .cameraMenu .menu-item:nth-child(2){
       bottom: 41px;
    right: unset;
    left: 75px;
     -webkit-transition-duration: 360ms;
          transition-duration: 360ms;
  }
  .menu-item:nth-child(1).hide{
    -webkit-transform: var(--scale1);
    transform: var(--scale1);
  }
  .menu-item:nth-child(2).hide{
    -webkit-transform: var(--close1);
    transform: var(--close1);
    pointer-events:none;
  }
  
    .menu-item:before{
      content: attr(data-text);
      position: absolute;
      width: max-content;
      bottom: 48px; 
      right:8px;
      font-size: 10px;
      padding: 8px;
      margin-top: 4px;
      height: max-content;
      line-height: 1.5;
      color: #7f7c93;
      background: white;
      font-weight: 700;
      border-radius:4px;
      border-bottom-right-radius:0px;
      pointer-events: none;
      opacity: 0;
      transition: .2s;
    }
 
    .menu-item.char:before{
/*       left: -2px; */
      content: attr(data-text);
    }
    .menu-item.sticker:before{
      content: attr(data-text);
    }
 .menu-item.exp:before{
      bottom:40px;
    }
  .menu-item.video{
    --button-width: 80px;
    right: 16px;
    bottom: 30px;
    z-index: 1;
  }  
    .menu-item.video:before{
      content: attr(data-text);
      bottom:84px;
    }
   .menu-item.video .kalicon{
        font-size: 120px;
     transition:.28s;
  }
  .menu-item.video .kalicon.solid{
    font-size: 100px;
    margin-bottom: -3px;
  }
  .menu-open:not(:checked) ~ .menu-item.video .kalicon{
    -webkit-transform:scale(0.8) translate(0.5px, 4px);
    transform:scale(0.8) translate(0.5px, 4px)
  }
  .menu-item.video .kalicon.fill{
    color:var(--lightBlue);
  }

  .menu-item.video.selected .kalicon.fill{
    color:var(--lightRed);
  }
  
  .pulse{
    --scale:2.4;
    top: 7px;
    width:80%;
    height:80%;
    z-index:-1;
  }
  
    .menu-item.bg:before{
      content: attr(data-text);
    }
    .menu-item.call:before{
      content: attr(data-text);
    }
  .menu-item.call.connected:before{
    min-width:36px;
  }
  .secondaryMenu{
    position:fixed;
    top:44px;
    right:0;
    display:block;
    z-index:1;
  }
  .secondaryMenu .subButton{
    position:relative;
    z-index:3;
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
    width: 32px;
    height: 32px;
    position:fixed;
    margin-right:8px;
    margin-top:12px;
    top:0;
    top: calc(env(safe-area-inset-top, 0) + env(safe-area-inset-right, 0) / 2);
    right:0;
    right:calc(env(safe-area-inset-right, 0) / 2);
    color:white;
    z-index:4;
    display: flex;
    align-items: center;
    justify-content: center;
    transition:opacity .2s;
  }
  .subButton:before{
      position: absolute;
      width: max-content;
      right: 36px;
      font-size: 10px;
      padding: 8px;
      margin-top: 4px;
      height: max-content;
      line-height: 1.5;
      color: #7f7c93;
      background: white;
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

  .infoToggle.selected .solid{
    color:var(--lightRed);
  }
  .subButton.selected .fill{
    color:var(--bgThemeLight);
    opacity:1;
  }
  .infoToggle.selected .fill{
    color:white;
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
    top:0;
    right:0;
    z-index:2;
  }
  .scrim.hide{
    pointer-events:none
  }
  .menu {
  --menu-width:160px;
  --menu-height:160px;
        --open1: translate3d(-56px, 40.66307px, 0);
    --open2: translate3d(-65.04956px, -9.7509px, 0);
    --open3: translate3d(-27.04956px, -52.9909px, 0);
    --open4: translate3d(28px, -54.33693px, 0);
       --open5: translate3d(-113px, 40.66307px, 0);
  position: fixed;
  right: 16px;
  right:calc(env(safe-area-inset-right,0) / 3 + 8px);
  bottom: 16px;
  bottom: calc(env(safe-area-inset-bottom,0) + 8px);
/*   bottom:calc(env(safe-area-inset-botom,0) / 3 + 16px); */
  padding-left: calc(var(--menu-width) * 0.5);
  width: var(--menu-width);
  height: var(--menu-height);
  box-sizing: border-box;
  font-size: 20px;
  text-align: left;
  z-index:2;
  transition:opacity .4s;
}
  .cameraMenu.hide,.menu.hide{
    opacity:0;
    transition-delay:.2s;
    pointer-events:none;
  }

.menu-item{
  --iconbg: #2E525F;
  --button-width:48px;
  border-radius: 100%;
  width: var(--button-width);
  height: var(--button-width);
  position: absolute;
  margin-top: calc(var(--button-width) * -0.5);
  margin-left:auto;
      bottom: 52px;
    right: 40px;
  color: white;
  justify-content: center;
  align-items: center;
  display: flex;
  text-align: center;
  line-height: 48px;
  -webkit-transform: translate3d(0, 0, 0);
          transform: translate3d(0, 0, 0);
  -webkit-transition: -webkit-transform ease-out 360ms;
  transition: -webkit-transform ease-out 360ms;
  transition: transform ease-out 360ms;
  transition: transform ease-out 360ms, -webkit-transform ease-out 360ms;
}
   .menu-item:active,.menu-item:hover:active{
      --iconbg: var(--bgThemeLight)
    }

  .menu-open:checked ~ .menu-item.connected:after{
    content: '';
    position: absolute;
    top: 15px;
    right: 12px;
    width: 8px;
    height: 8px;
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



  


.menu-open {
  display: none;
}
.menu-item:nth-child(7) {
  -webkit-transition-duration: 70ms;
          transition-duration: 70ms;
  -webkit-transform: var(--open5);
          transform: var(--open5);
}
.menu-item:nth-child(6) {
  -webkit-transition-duration: 70ms;
          transition-duration: 70ms;
}
.menu-item:nth-child(5) {
  -webkit-transition-duration: 130ms;
          transition-duration: 130ms;
}
.menu-item:nth-child(4) {
  -webkit-transition-duration: 250ms;
          transition-duration: 250ms;
}
.menu-item:nth-child(3) {
  -webkit-transition-duration: 310ms;
          transition-duration: 310ms;
}

.menu-open:checked ~ .menu-item {
  -webkit-transition-timing-function: cubic-bezier(0.935, 0, 0.34, 1.33);
          transition-timing-function: cubic-bezier(0.935, 0, 0.34, 1.33);
}

.menu-open:not(:checked) ~ .menu-item .fill{
  text-shadow:none
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

    .scrim{
      width:80px;
      height:200px;
    }
 

} 
  
/* @media all and (display-mode: fullscreen) and (max-width: 600px) {
  .menu{
    bottom:calc(env(safe-area-inset-bottom, 0) / 2);
  }
} */
 
  
  @media only screen and (hover: hover) and (pointer: fine) {
    .menu-item:hover{
      z-index:2;
      --iconbg: #43636F;
    }
    .subButton:hover:before,.menu-item:hover:before{
      opacity:1;
      z-index:3;
    }
  
  }
  
  @media only screen and (hover: none) {
    .video:active .fill{
      animation: jiggle 0.4s 1;
      animation-timing-function: cubic-bezier(0.26, 0.3, 0.66, 0.65);
    }
   
  }
  


</style>