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
import {lightIntensity,lightColor,lightRotY,lightRotX} from '../scene/canvas.svelte'
import {shadowStrength,shadowBlur} from '../scene/Shadows.svelte'
import {enableEffects} from '../scene/shaders.svelte'

import iro from '@jaames/iro';

let tempPicker
let intensityPicker
onMount(()=>{
  tempPicker = new iro.ColorPicker("#temp", {
    color:$lightColor,
     layout: [
        { component: iro.ui.Box,
       
        
        },
       { component: iro.ui.Slider,
         options: {
            // can also be 'saturation', 'value', 'red', 'green', 'blue', 'alpha' or 'kelvin'
            sliderType: 'hue',
           sliderSize:40
          }
        
        },
      ],
    layoutDirection:"horizontal",
    display:'flex',
    width: 200,
    boxheight:200,
    borderWidth: 0,
    borderColor: "var(--offblack)",
  });
  tempPicker.forceUpdate()
  tempPicker.on('color:change', function(color) {
    lightColor.set(color.hexString)
    lightIntensity.set(color.value/100)
  });

})
</script>

<container
     in:fade="{{easing: cubicInOut,duration: 300, delay:400 }}" 
     out:fade="{{duration:$DIM.w > 600 ? 200 : 0}}"
           >


 
  
   <div class="setting"
        in:fade="{{easing: cubicInOut,duration: 300, delay:400 }}" >
     <h4>Light Position X
      </h4>
     <input
        aria-label="Light Position Y"
        name="lightRotY"
        type="range"
        min="{0}"
        max="{1}"
        step=".01"
        bind:value="{$lightRotY}"
        style="background-size:{$lightRotY * 100}% 100%"
      />
     <hr/>
     <h4 >Light Position Y
      </h4>
      <input
        aria-label="Light Position X"
        name="lightRotX"
        type="range"
        min="{0}"
        max="{1}"
        step=".01"
        bind:value="{$lightRotX}"
        style="background-size:{$lightRotX * 100}% 100%"
      />
     <hr/>
      <h4 style="margin:0;">Light Color</h4>
     <div id="temp" 
            in:fade="{{easing: cubicInOut,duration:300,delay:400}}"
             out:fade="{{duration:$DIM.w > 600 ? 200 : 0}}"></div>
  </div>
  
  
  <div class="setting"
         in:fade="{{easing: cubicInOut,duration: 300, delay:400 }}" >
      <h4 >Shadow Strength
      </h4>
      <input
        aria-label="Shadow Strength"
        name="shadowStrength"
        type="range"
        min="{0}"
        max="{1}"
        step=".01"
        bind:value="{$shadowStrength}"
        style="background-size:{$shadowStrength * 100}% 100%"
      />
      <hr/>
      <h4 >Shadow Blur
      </h4>
      <input
        aria-label="Shadow Blur"
        name="shadowBlur"
        type="range"
        min="{0}"
        max="{1}"
        step=".01"
        bind:value="{$shadowBlur}"
        style="background-size:{$shadowBlur * 100}% 100%"
      />
  </div>

  <div class="setting"
         in:fade="{{easing: cubicInOut,duration: 300, delay:400 }}" >
    <div class="toggle">
      <h4 style="margin:0;">Light Cube Experiment</h4>
      <Toggle
        name="{$enableEffects ? 'Disable Experiment' : 'Enable Experiment'}"
        setting="{enableEffects}"
      />
    </div>
  </div>
  
    
    

</container>

<style>
  #temp{
    width:100%;
  }
  :global(#temp .IroColorPicker){
        width: 100%;
    flex-direction: row;
    height: 200px;
    margin-top: 16px;
  }
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
    font-size: 14px;
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
    margin: 20px 0 20px 0
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
  
  input[type="range"] {
    box-sizing: border-box;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 13px 0 8px 0;
    outline: none;
    padding: 0;
    width: 100%;
    height: 6px;
    background-color: var(--darkgrey);
    background-image: -webkit-gradient(
      linear,
      50% 0%,
      50% 100%,
      color-stop(0%, var(--lightBlue)),
      color-stop(100%, var(--lightBlue))
    );
    background-size: 50% 100%;
    background-repeat: no-repeat;
    border-radius: 10px;
    cursor: grab;
    -webkit-appearance: none;
  }

  input[type="range"]:active,
  input[type="range"]:focus {
    outline: none;
  }

  input[type="range"]::-webkit-slider-runnable-track {
    box-shadow: none;
    border: none;
    background: transparent;
    -webkit-appearance: none;
  }

  input[type="range"]::-webkit-slider-thumb {
    height: 32px;
    width: 18px;
    border: 0;
    background: white;
    border: none;
    border-radius: 8px;
    box-shadow: 0 0 1px 0px rgba(0, 0, 0, 0.1);
    -webkit-appearance: none;
    appearance: none;
    cursor: grab;
  }

  input[type="range"]::-ms-thumb {
    box-shadow: 0 0 1px 0px rgba(0, 0, 0, 0.1);
    border: none;
    height: 32px;
    width: 18px;
    border-radius: 8px;
    background: white;
    cursor: grab;
  }

  input[type="range"]::-moz-range-thumb {
    box-shadow: 0 0 1px 0px rgba(0, 0, 0, 0.1);
    border: none;
    height: 32px;
    width: 18px;
    border-radius: 8px;
    background: white;
    cursor: grab;
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