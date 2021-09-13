<script context="module">
import { writable,get } from 'svelte/store';
import {userModel,modelList,presetModels,randomColors,newRandomColor} from '../scene/character.svelte'
import {profiles} from '../scene/profiles.svelte'
import {dropzone} from './filedrop.svelte'
import {isZip} from '../utils/helpers.js';
import {notifText} from './notif.svelte'
  
export let input;
export let checkingModel = writable('done');

export const handleVrmFile = async (files)=>{
  
				if ( !files ) { return; }
				const file = files[0];
				if ( !file ) { return; }
				const blob = new Blob( [ file ], { type: "application/octet-stream" } );
				const url = URL.createObjectURL( blob );
  
      var reader = new FileReader();
        reader.onload = function(e) {
          let newDate = Date.now()
          let objectURL = e.target.result
          modelList.set([{
            name:file.name,
            data:objectURL,
            type:'blob',
            url:url,
            uploaded:newDate,
            icon:null,
            color:newRandomColor()
          },...get(modelList)])
          userModel.set({
          type:'blob',
          name:file.name,
          uploaded:newDate,  
          url:url})
          
        };  
        reader.readAsDataURL(file);
  }



</script>
<script>
import { fade, fly,scale } from 'svelte/transition';
import { flip } from 'svelte/animate';
import { cubicInOut } from "svelte/easing";
import {DIM,urlBase,setLang} from '../stores.js'
import {ftueState,updateFtue} from './ftue.svelte';
import {hideCamera} from '../tracking/webcam.svelte';
import {unzip} from '../utils/unzip.js'
import {subnav_live2d_text} from '../text/translations.js';
import {resetInput,checkJSONEqual} from '../utils/helpers.js'
import SvgLink from './icons/svgLink.svelte'

let dragging = false;  


const updateModel = (model) => {
  
  // if (typeof $userModel==='string' && $userModel === file){return}
  
  if (checkModel(model)){return}
  
  if(!$profiles.user.destroying){
    userModel.set({
      type:model.type,
      name:model.name,
      uploaded:model.uploaded,
      url:model.url 
    })
  }
}

const removeModel = (i) => {
    let newArray = $modelList
    newArray.splice(i, 1)
    if(i > -1){
      $modelList = newArray
    }
}
 
const handleClickUpload = (e) => {
  handleVrmFile(e.target.files)
}

const checkModel = (model) => {
  if($userModel.uploaded && model.uploaded){
    return $userModel.uploaded === model.uploaded
  }else if($userModel.url && model.url){
    return $userModel.url === model.url
  }
  return false
}

const getVRMFromPrompt = ()=>{
  let url = prompt('Enter the URL to your .vrm model ヾ(･ω･*)ﾉ')
  if(!url){return}
  userModel.set({
  type:'url',
  uploaded:Date.now(),
  name:null,
  url:url})
}

</script>

<container 
      class:drop_zone={$dropzone}
      data-text="{subnav_live2d_text.upload[$setLang]}"
           >
     <div class="tabs"
          in:fly="{{ x: $DIM.w > 600 ? 0 : 0, y: $DIM.w > 600 ? 20 : 0, easing: cubicInOut,duration: 400, delay:400 }}" 
     out:fade="{{duration:$DIM.w > 600 ? 200 : 0}}"
          >
      <p>
        <a href="https://kalidoface.com">Live2D</a>
      </p>
      <p class="selected">
        <a href="https://3d.kalidoface.com">3D VRM</a>
      </p>
    </div>
  <section
           
           >

   
<div 
     class="model-list"
     in:fly="{{ x: $DIM.w > 600 ? 0 : 20, y: $DIM.w > 600 ? 20 : 0, easing: cubicInOut,duration: 400, delay:200 }}" 
     out:fade="{{duration:$DIM.w > 600 ? 200 : 0}}"
     >
  
    
    <div class="upload">
      <label data-text="{subnav_live2d_text.upload[$setLang]}" for="uploadLive2D">
        <i class="kalicon notranslate solid variable">file</i>
        <input type="file" id="uploadLive2D" name="fileList" accept=".vrm" bind:this={input} on:change={handleClickUpload}>
      </label>
      <label data-text="Load from URL" on:click={getVRMFromPrompt}>
        <i class="svgIcon"><SvgLink/></i>
      </label>
    </div>

  
  
  {#each [...$modelList,...presetModels] as model, i (model)}
    <div class="model {
                typeof $userModel==='string' && $userModel === model.url
                ? 'selected' 
                : (typeof $userModel==='object' && checkModel(model)) 
                ? 'selected' 
                : ''}" 
        animate:flip="{{ duration: 300 }}" in:scale|local="{{ duration: 250 }}"
         name={model.name}
         style="--color:{model.color?model.color:''}"
    >   
        {#if model.icon}
          <img src="{model.icon}" alt="{model.name}" on:click={()=>{updateModel(model)}}/>
        {:else if model.url.icon}
          <img src="{model.url.icon}" class="noBorder" alt="{model.name}" on:click={()=>{updateModel(model)}}/>
        {:else}
          <div class="noicon" on:click={()=>{updateModel(model)}}>{model.name.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,"").charAt(0)}</div>
        {/if}
       {#if model.uploaded}
            <button 
              class="remove"
              on:click={(e)=>{e.preventDefault;removeModel(i)}}
            > 
              <i class="kalicon notranslate fill small">jellyfill</i>
              <i class="kalicon notranslate solid small">minus</i> 
            </button>
        {/if}
    </div>
  {/each}
            
            

</div>
    </section>


</container>

<style>
 
  .tabs{
    color:white;
    position:fixed;
    bottom:0;
    left:0;
    width:100%;
    padding:16px 0 16px 0;
    background:#1f2e33;
    z-index:3;
    white-space: nowrap;
    overflow: scroll;
    border-top-right-radius:18px;
    border-top-left-radius:18px;
    font-weight:600;
    font-size:14px;
        display: flex;
    align-items: center;
    justify-content: center;
  }
  .tabs p{
    display:flex;
    background:#ffffff00;
    border-radius:20px;
    padding:0;
    margin:0 0 0 8px
  }
  .tabs a{
    padding:8px 8px 8px 8px;
    color:white;
  }
  .tabs p:hover{
    background:#ffffff10;
    cursor:pointer;
  }
  .tabs p.selected{
    pointer-events:none;
  }
  .tabs p.selected{
    background:var(--lightBlue);
  }
  .tabs p:last-child{
    margin:0 8px 0 4px
  }
      .remove{
--button-width: 32px;
    width: var(--button-width);
    height: var(--button-width);
    border-radius: 100%;
    position: absolute;
    justify-content: center;
    align-items: center;
    display: flex;
    text-align: center;
    right: -6px;
    top: -6px;
    z-index: 2;
    transition: .2s;
    pointer-events: all;
  }
  .remove .fill{
    color: var(--lightRed);
  }
  .remove .solid{
    color: white;
  }
  container{
    width:100%;
    height:100%;
    position:absolute;
    overflow-x:scroll;
    z-index:1;
  }
  container.drop_zone:before{
    content: attr(data-text);
    --drop-padding-w:16px;
    --drop-padding-h:16px;
    padding:var(--drop-padding-h) var(--drop-padding-w) var(--drop-padding-h) var(--drop-padding-w);
    width: calc(100% - 8px - var(--drop-padding-w) * 2);
    height: calc(100% - 8px - var(--drop-padding-h) * 2);
    position: fixed;
    text-align:center;
    top: 0px;
    left: 0;
    background: #2d2d2df5;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    z-index: 1;
    border: 4px dotted #4a4a4a;
    font-size: 14px;
    font-weight: 500;
    color: #b1b1b1;
  }
  .drop_zone .model {
    pointer-events: none;
  }

  .model-list{
    --model-list-margin-w:24px;
    --model-list-margin-h:48px;
    width:calc(100% - var(--model-list-margin-w) * 2);
    padding:var(--model-list-margin-h) var(--model-list-margin-w) calc(var(--model-list-margin-h)*2) var(--model-list-margin-w);
    padding-left:calc(var(--model-list-margin-w) + env(safe-area-inset-left, 0px) * .25);
    padding-right:calc(var(--model-list-margin-w) - env(safe-area-inset-left, 0px) * .25);
    align-items: center;
    flex-direction: column;
    flex-wrap: nowrap;
        display: flex;
        position: relative;    
  }
  .model{
    --model-width: 100px;
    --model-b: 4px;
    --bg-image:'';
    width:var(--model-width);
    height:var(--model-width);
    border-radius: 50%;
    margin: 16px;
    background:#ffffff;
    background-image: var(--bg-image);
    background-position: center;
    background-size: cover;
    position: relative;
    display:flex;
    align-items:center;
    justify-content:center;  
    overflow:visible;
  }
  
  div.model{
    --color:white;
    width: calc(var(--model-width) - 2 * var(--model-b));
    height: calc(var(--model-width) - 2 * var(--model-b));
    border:var(--model-b) solid var(--color);
    background:var(--color);
  }
/*   div.model.selected{
    pointer-events:none;
  } */
  div.model:before{
    width:calc(100% + 22px);
    height:calc(100% + 22px);
    content:'';
    position:absolute;
    background:#ffffff20;
    z-index:-1;
    border-radius:50%;
    transition:.4s ease;
    transform:scale(.85);
  }
  div.model.selected:before{
    background:var(--lightBlue);
    transform: scale(1);
  }
  div.model[name]:after{
        content: attr(name);
    width: max-content;
    height: max-content;
    padding: 6px;
     background: #7f7c93;
    color: white;
    z-index: 1;
    text-align: center;
    font-size: 10px;
    font-weight: 700;
    border-radius: 8px;
    position: absolute;
    bottom: -30px;
    pointer-events: none;
    opacity: 0;
    transition: .2s;
  }
  div.model[name=""]:after {
    display: none;
  }

  img,.noicon{
    position:absolute;
    width:100%;
    height:100%;
    border-radius:50%;
    border: var(--model-b) solid var(--color);
  }
  img.noBorder{
    width: calc(100% + var(--model-b) * 2);
    height:calc(100% + var(--model-b) * 2);
    border: none;
  }  
  .noicon{
    display:flex;
    align-items:center;
    justify-content:center;
    font-size:64px;
    text-transform:uppercase;
    font-weight:bold;
    color:white;
    background:var(--color);
  }

  
  .check{
    color:white;
    margin-bottom:8px;
  }
  
  
    .upload{
       position: relative;
    background: none;
    /* border-radius: 48px; */
    /* border: 2px dotted #ffffff30; */
    border-bottom: 1px solid #ffffff30;
    height: 60px;
    width: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 0 14px 0;
    margin: 0 0 14px 0;
  }
  
  .upload label{
    position:relative;
     width:100%;
    height:100%;
    display:flex;
    align-items: center;
    justify-content: center;
    color:#ffffff80;
  }
  .upload label:last-child{
    margin:0 0 0 -4px
  }
   .upload label:before{
    --inset : 4px;
    content:'';
    position:absolute;
    top:var(--inset);
    left:var(--inset);
    width:calc(100% - var(--inset) * 2);
    height:calc(100% - var(--inset) * 2);
    z-index:-1;
    background:#ffffff00;
    border-radius:48px;
    transition:background-color .2s 
  }
  .upload label:after{
    content: attr(data-text);
    position: absolute;
      width: max-content;
      bottom: -28px;
      font-size: 10px;
      padding: 6px;
      margin-top: -7px;
    height: max-content;
    line-height: 1.5;
    background: #7f7c93;
    color: white;
    font-weight: 700;
    border-radius: 8px;
    pointer-events: none;
    opacity: 0;
    transition: .2s;
    z-index: 2;
  }

  .upload label:hover:before,.upload label:active:before{
    background:#ffffff10;
  }

  input[type="file"] {
        display:none;
    position: absolute;
    left: 0;
    opacity: 0;
    top: 0;
    bottom: 0;
    width: 100%;
  }
    label:hover{
      cursor:pointer;
    }

  .upload label i{
   position: absolute;
  }
  .upload label .kalicon{
     color: white;
        font-size: 60px;
    margin-bottom: 6px;
  }
  .upload label:hover .variable{
    font-variation-settings:'anim' 100;
  }

  .upload label svg{
    width:100%;
    height:100%;
    position:absolute;
    pointer-events:none;
  }

  
  

  @media only screen and (max-width: 600px) {
    .tabs{
      bottom:unset;
      top:0;
      justify-content:flex-start;
      background:transparent;
    }
    .tabs:first-child{
      margin-left:16px;
    }
    container{
          border-top-left-radius: 12px;
    border-top-right-radius: 12px;
      
    }
    section{
      display: inline-block;
      height:calc(100% - 65px);
      margin-top:65px;
    }
    .model-list{
      --model-list-margin-h: 24px;
      --model-list-margin-w: 16px;
      display:flex;
      flex-direction:row;
      width:max-content;
      margin-bottom:0;
      height: calc(100% - var(--model-list-margin-h) * 2);
      padding-bottom:calc(var(--model-list-margin-h) * 1);
       background: #00000030;
    border-top-left-radius: 28px;
    border-top-right-radius: 28px;
    }
    .model{
      --model-width: 110px;
    }
    .shadow{
      border-top-left-radius:12px;
      border-bottom-left-radius:0;
      border-top-right-radius:12px;
      border-bottom-right-radius:12px;
    }

    .upload{
      flex-direction:column;
      width: 60px;
      height: 120px;
      border-bottom:none;
      border-right:1px solid #ffffff30;
      margin:0 24px 0 0;
      padding:0 16px 0 0
    }
    .upload label{
      height:50%;
      
    }

      .upload label:after{
   bottom:-24px
  }
  }
  
    @media only screen and (hover: hover) and (pointer: fine) {
       .model .remove{
      opacity:0;
    }
    .model:hover .remove{
      opacity:1;
    }
        div.model:hover{
    cursor:pointer;
  }
      div.model:hover:before{
        transform:scale(1.1);
      }
      div.model:hover:after{
        opacity:1;
      }
      
      div.model.selected:hover:before{
        transform:scale(1);
      }

 
   
      .upload label:hover:after{
    opacity:1;
  }
  }
</style>