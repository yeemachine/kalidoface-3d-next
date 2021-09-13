<script>
import { fade } from 'svelte/transition';
import { cubicInOut } from "svelte/easing"; 
import {DIM, setLang, isSafari} from '../stores.js';
import {ftueState,updateFtue} from './ftue.svelte';
import {onMount} from 'svelte';
import Toggle from './components/toggle.svelte'
import {haptic} from '../utils/helpers.js'
import {profiles} from '../scene/profiles.svelte'

const toggleVisibility = (part) => {
  part.visible = !part.visible
  profiles.set($profiles)
}
  
</script>

<container
     in:fade="{{easing: cubicInOut,duration: 300, delay:400 }}" 
     out:fade="{{duration:$DIM.w > 600 ? 200 : 0}}"
           >
  <div class="setting"
         in:fade="{{easing: cubicInOut,duration: 300, delay:400 }}" 
         out:fade="{{duration:0}}">
        <h2>{$profiles.user.model.name}</h2>
        <p class="info">Show/hide clothes, accessories, or body parts.
          <b>Label names come directly from the model file.</b> <br><br>Good luck（/･∀･)つ!</p>

     </div>
    <div class="setting tabs"
         in:fade="{{easing: cubicInOut,duration: 300, delay:400 }}" 
         out:fade="{{duration:0}}">
      {#each $profiles.user.model.extractedParts as part, i (part)}
        <p
           class="part"
           class:visible={part.visible}
           on:click={()=>{toggleVisibility(part)}}
           >{part.name}</p>
      {/each}
      
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
  h2{
    width:100%;
    text-align:left;
    margin:0;
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
  
  .part{
    padding:8px 12px 8px 12px;
    background:#ffffff10;
    margin:4px;
    border-radius:40px;
    font-size:14px;
  }
  .part.visible{
    background:var(--lightBlue)
  }

  p{
    font-size:12px;
  }
  .list {
    width: 100%;
    height: max-content;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 24px;
    padding-top: 24px;
    border-top:1px solid #ffffff10;
  }
  .list:first-child{
    margin-top:0;
    padding-top:0;
    border-top:none;
  }

  .setting {
    --padding: 0px;
    --margin:16px;
    width: calc(100% - var(--padding)*2 - var(--margin)*2);
    padding: var(--padding);
    margin: 8px var(--margin) 0 var(--margin);
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: row;
    flex-wrap:wrap;
/*     background:#ffffff10;
    border-radius:28px; */
  }
  .setting.tabs{
    --margin:12px;
    background:none;
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

 

@media only screen and (max-width: 600px) {
   .setting:first-child{
    margin-top: 24px; 
     
  }
  .setting:last-child{
    margin-bottom: 24px; 
     
  }
    
  }
  
  @media only screen and (hover: hover) and (pointer: fine) {
  .part:hover{
    cursor:pointer;
  }
     
  }
  
</style>