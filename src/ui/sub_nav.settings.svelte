<script>
import { fade } from 'svelte/transition';
import { cubicInOut } from "svelte/easing"; 
import {DIM, setLang, isSafari} from '../stores.js';
import {ftueState,updateFtue} from './ftue.svelte';
import {onMount} from 'svelte';
import {capturedDevices,videoDeviceId,hideCamera,hideFace} from '../tracking/webcam.svelte'
import {options} from '../tracking/Holistic.svelte'
import Toggle from './components/toggle.svelte'
import {haptic} from '../utils/helpers.js'

const toggleTracking = (e,type) => {
  e.preventDefault;
  if(!$options.holistic.enable && $options.face.enable && type==='face'){
    return
  }
  $options[type].enable = !$options[type].enable
  haptic()
  if(!$options.holistic.enable && !$options.face.enable){
    $options.face.enable = true
    return
  }
}
</script>

<container
     in:fade="{{easing: cubicInOut,duration: 300, delay:400 }}" 
     out:fade="{{duration:$DIM.w > 600 ? 200 : 0}}"
           >
    <div class="setting"
         in:fade="{{easing: cubicInOut,duration: 300, delay:400 }}" >
    <div class="select">
      <h4 style="margin:0;">Body Tracking Options
      </h4>
       <div class="tracking">
         <div class="trackingOption" 
              class:selected={$options.face.enable}
              on:click="{(e)=>{toggleTracking(e,'face')}}"
             >
           <img src="https://cdn.glitch.com/29e07830-2317-4b15-a044-135e73c7f840%2Fezgif-4-4ba643734ef0%20(1).gif?v=1625551589261"/>
           <label>Face/Eye</label>
   
         </div>
         <div class="trackingOption" 
              class:selected={$options.holistic.enable}
             class:disabled={isSafari}
              on:click="{(e)=>{toggleTracking(e,'holistic')}}"
            >
           <img src="https://cdn.glitch.com/29e07830-2317-4b15-a044-135e73c7f840%2Fezgif-4-07c2fc13313d.gif?v=1625552166030"/>
           <label>Full Body</label>
           
         </div>
      </div>
       {#if isSafari}
          <p class="info warning">Full body tracking isn't available on Safari yet. Please use face tracking instead.</p>
        {:else if ($DIM.w < 600)}
           <p class="info">Full body tracking is resource instensive and recommended on desktop browsers.</p>
        {:else}
          <p class="info">Full body tracking doesn't include eye movement/blink detection. For more expression, use both tracking methods. For performance, choose only ONE.</p>
        {/if}
    </div>
  </div>

 
  
   <div class="setting"
        in:fade="{{easing: cubicInOut,duration: 300, delay:400 }}" >
    <div class="toggle">
      <h4 style="margin:0;">Hide Camera Panel</h4>
      <Toggle
        name="{$hideCamera ? 'Hide Video Feed' : 'Show Video Feed'}"
        setting="{hideCamera}"
      />
    </div>
     <div class="toggle">
      <h4 style="margin:0;">Hide Webcam Feed</h4>
      <Toggle
        name="{$hideFace ? 'Hide Face' : 'Show Face'}"
        setting="{hideFace}"
      />
    </div>
  </div>
  <div class="setting" 
       in:fade="{{easing: cubicInOut,duration: 300, delay:400 }}" >
    <h4>Change Camera</h4>
    <div class="select">
         {#if $capturedDevices.videoinput.length>0}

      <select
        aria-label="Change Video Source"
        name="Video Source"
        bind:value="{$videoDeviceId}"
      >
        {#each $capturedDevices.videoinput as deviceInfo}
        <option value={deviceInfo.deviceId}>{deviceInfo.label}</option>
        {/each}
      </select>
      <div class="select_arrow"></div>
      
      {:else}
       <p class="info">Allow webcam access to see camera list.</p>
        {/if}

    </div>
  </div>

  
    
    

</container>

<style>
 container{
    width:100%;
    height:100%;
    position:absolute;
    overflow-y:scroll;
    z-index:1;
     display:flex;
   flex-direction:column;
   align-items:center;
   justify-content:flex-start;
   color:white;
  }
 .tracking{
    margin:20px 0 20px 0;
    display:flex;
    justify-content:center;
  }
  .info{
    font-size: 12px;
    text-align: left;
    padding: 12px 0 0 0;
  }
  .warning{
    color:var(--crimson);
  }
  .trackingOption:first-child{
    margin-right: 16px; 
  }
  .trackingOption{
    --bg-radius:12px;
    flex-grow: 1;
    background:#00000030;
    position:relative;
        display: flex;
    align-items: center;
    justify-content: center;
    border-radius:var(--bg-radius);
  }
    .trackingOption:before{
    width:calc(100% + 12px);
    height:calc(100% + 12px);
    content:'';
    position:absolute;
    background:#ffffff20;
    z-index:-1;
    transition:.24s ease;
    transform:scale(.85);
    border-radius: calc(var(--bg-radius) + 4px);
  }
  .trackingOption.selected:before{
    background:var(--lightBlue);
    transform: scale(1);
    transition:.4s ease;
  }
  
  .trackingOption:hover{
    cursor: pointer;
  }
  .trackingOption img{
    width:100%;
    display:block;
    border-radius:var(--bg-radius);
    overflow:hidden;
  }

  .trackingOption label{
   position:absolute;
    bottom: 8px;
    left: 0;
    width: 100%;
        font-size: 14px;
    text-align: center;
    display:none;
  }

  .trackingOption.disabled{
    pointer-events:none;
    opacity:0.3;
    filter:grayscale(1);
  }
  
  h4 {
    margin: 0 0 12px 0;
    font-size: 12px;
    line-height: 1;
    font-weight: bold;
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
  }

  .toggle {
    width: 100%;
    height: max-content;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 24px;
    padding-top: 24px;
    border-top:1px solid #ffffff10;
  }
  .toggle:first-child{
    margin-top:0;
    padding-top:0;
    border-top:none;
  }

  .setting {
    --padding: 24px;
    --margin:8px;
    width: calc(100% - var(--padding)*2 - var(--margin)*2);
    padding: var(--padding);
    margin: 8px var(--margin) 0 var(--margin);
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    background: #ffffff10;
    border-radius: 28px;
  }
  .setting:first-child{
    margin-top:80px;
  }
  .setting > container {
    display: flex;
    width: 100%;
  }
 
  hr {
    border: 1px solid;
    width: calc(100% - 2px);
    opacity: 0.05;
    margin: 8px 0 8px 0;
  }

  select {
    outline: none;
  }

  div {
    text-align: center;
  }

  select,
  select option {
    text-transform: capitalize;
  }

  .select.hide {
    opacity: 0.2;
    pointer-events: none;
  }

  .select {
    position: relative;
    display: inline-block;
    width: 100%;
  }

  .select select {
        width: 100%;
    font-size: 16px;
    display: inline-block;
    cursor: pointer;
    padding: 0 10px 7px 0;
    height: 40px;
    outline: 0;
    border-radius: 0;
    background: #00000000;
    border-bottom: 1px solid white;
    border: none;
    appearance: none;
    border-bottom: 1px solid white;
    -webkit-appearance: none;
    -moz-appearance: none;
    /* border-radius: 12px; */
    color: white;
  }
  .select select::-ms-expand {
    display: none;
  }

  .select_arrow {
    position: absolute;
    top: 16px;
    right: 0;
    pointer-events: none;
    border-style: solid;
    border-width: 8px 5px 0px 5px;
    border-color: white transparent transparent transparent;
  }
  .select_grad{
    height:100%;
    width:60px;
    position:absolute;
    right:0;
    top:0;
    background: rgb(255,255,255);
    background: linear-gradient(90deg, rgba(35,35,35,0) 0%, rgba(35,35,35,1) 60%);
    border-radius: 5px;
    pointer-events:none;
  }

@media only screen and (max-width: 600px) {
   .setting:first-child{
    margin-top: 24px; 
     
  }
  .setting:last-child{
    margin-bottom: 24px; 
     
  }
    
  }
  
    @media only screen and (hover: hover) and (pointer: fine) {

      .trackingOption:hover:before{
        transform:scale(1.025);
      }
      .trackingOption.selected:hover:before{
        transform:scale(1);
      }
     
  }
  
</style>