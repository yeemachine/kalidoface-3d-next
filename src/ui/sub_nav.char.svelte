<script context="module">
import { writable,get } from 'svelte/store';
import {userModel,modelList,randomColors} from '../scene/character.svelte'
import {profiles} from '../scene/profiles.svelte'
import {dropzone} from './filedrop.svelte'
import {isZip} from '../utils/helpers.js';
import {notifText} from './notif.svelte'
  
export let input;
export let checkingModel = writable('done');

export const newRandomColor = () =>{
  let newColor = randomColors[Math.floor(Math.random() * randomColors.length)];
  let currentColors = []
  get(modelList).forEach(e=>{
    if(e.color){currentColors.push(e.color)}
  })
  
  if(currentColors.length<randomColors.length){
    do {
      newColor = randomColors[Math.floor(Math.random() * randomColors.length)]
    }
    while (currentColors.includes(newColor))//random color;
  }else{
    do {
      newColor = randomColors[Math.floor(Math.random() * randomColors.length)]
    }
    while (get(modelList)[0].color === newColor)//non repeating color;
  }
 
  return newColor;
}
    
export const handleLive2DFiles = async (files)=>{

    for (var i = 0; i < files.length; i++) {
        let fileName = files[i].name
        if(!isZip(files[i].type)){return}
        try {
          
          checkingModel.set('checking')
          let unzipped = await unzip(files[i]);
          checkingModel.set('done')
       
          userModel.set(unzipped)
          modelList.set([{
            name:fileName,
            file:unzipped,
            icon:null,
            color:unzipped.icon ? null : newRandomColor()
          },...get(modelList)])
          
          if(input){
            resetInput(input)
          } 

        } catch(err) {
          checkingModel.set('error')
          console.error('Error: '+err)
          notifText.set({type:'error','text':err})
        } 
    }
  }  

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
            date:newDate,
            icon:null,
            color:newRandomColor()
          },...get(modelList)])
          userModel.set({
          type:'blob',
          data:objectURL,
          date:newDate,  
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

let dragging = false;  


const updateModel = (model) => {
  
  // if (typeof $userModel==='string' && $userModel === file){return}
  
  if (checkModel(model)){return}
  
  if(!$profiles.user.destroying){
    userModel.set(model)
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
  if($userModel.date && model.date){
    return $userModel.date === model.date
  }else if($userModel.url && model.url){
    return $userModel.url === model.url
  }
  return false
}

</script>

<container 
      class:drop_zone={$dropzone}
      data-text="{subnav_live2d_text.upload[$setLang]}"
           >
  <section>
<div 
     class="model-list"
     in:fly="{{ x: $DIM.w > 600 ? 0 : 20, y: $DIM.w > 600 ? 20 : 0, easing: cubicInOut,duration: 400, delay:200 }}" 
     out:fade="{{duration:$DIM.w > 600 ? 200 : 0}}"
     >
  
    <label class="model" for="uploadLive2D">
      <div data-text="{subnav_live2d_text.upload[$setLang]}">
        <svg viewBox="0 0 110 110">
          <circle cx="55" cy="55" r="53" class="dotted" />
        </svg>
        <i class="kalicon notranslate solid variable">file</i>
      </div>
      <input type="file" id="uploadLive2D" name="fileList" accept=".vrm" bind:this={input} on:change={handleClickUpload}>
    </label>
  
  {#each $modelList as model, i (model)}
    <div class="model {
                typeof $userModel==='string' && $userModel === model.url
                ? 'selected' 
                : (typeof $userModel==='object' && checkModel(model)) 
                ? 'selected' 
                : ''}" 
        animate:flip="{{ duration: 300 }}" out:scale|local="{{ duration: 250 }}" in:scale|local="{{ duration: 250 }}"
         data-model-name={model.name}
         style="--color:{model.color?model.color:''}"
    >   
        {#if model.icon}
          <img src="{model.icon}" alt="{model.name}" on:click={()=>{updateModel(model)}}/>
        {:else if model.url.icon}
          <img src="{model.url.icon}" class="noBorder" alt="{model.name}" on:click={()=>{updateModel(model)}}/>
        {:else}
          <div class="noicon" on:click={()=>{updateModel(model)}}>{model.name.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,"").charAt(0)}</div>
        {/if}
       {#if model.url.includes('blob')}
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
<!--   <div class="shadow" in:fade="{{easing: cubicInOut,duration:0,delay:1000}}"
         out:fade="{{duration:$DIM.w > 600 ? 0 : 0}}">
  </div> -->
</div>
    </section>
  
<!--   <button class="cameraToggle {$hideCamera ? '' : 'hide'}"
          in:fade="{{easing: cubicInOut,duration:0,delay:1000}}"
         out:fade="{{duration:$DIM.w > 600 ? 0 : 0,delay:0}}"
          >
    <p on:click={()=>{hideCamera.set(!$hideCamera)}}>{$hideCamera ? subnav_live2d_text.feed.on[$setLang] : subnav_live2d_text.feed.off[$setLang]}
    </p>
  </button> -->
</container>

<style>
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
    padding:var(--model-list-margin-h) var(--model-list-margin-w) var(--model-list-margin-h) var(--model-list-margin-w);
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
  
  .cameraToggle{
    background:var(--iconbg);
    color:white;
    font-size:12px;
    font-weight:500;
    height:100%;
    position:fixed;
    bottom:0;
    width:100%;
    text-align:center;
    display:flex;
    align-items:flex-end;
    justify-content:center;
        z-index: -3;

  }
  .cameraToggle p{
    border-bottom: 2px solid #ffffff00;
    padding-bottom: 1px;
    margin:24px;
  }
 
  .cameraToggle.hide{
    background:var(--lightBlue);
  }
  
  .check{
    color:white;
    margin-bottom:8px;
  }
   label>div:before{
    --inset : 12px;
    content:'';
    position:absolute;
    top:var(--inset);
    left:var(--inset);
    width:calc(100% - var(--inset) * 2);
    height:calc(100% - var(--inset) * 2);
    z-index:-1;
    background:#ffffff00;
    border-radius:50%;
     transition:background-color .2s 
  }
  label>div:after{
    content: attr(data-text);
    position: absolute;
      width: max-content;
      top: var(--model-width);
      font-size: 10px;
      padding: 8px;
      margin-top: 4px;
      height: max-content;
      line-height: 1.5;
      background: #7f7c93;
      color: white;
      font-weight: 700;
      border-radius: 4px;
      pointer-events: none;
      opacity: 0;
      transition: .2s;
    z-index:2;
  }

  .cameraToggle:before{
    --inset:4px;
  }
  label:hover div:before,label:active div:before,label.selected div:before{
    background:#ffffff10;
  }
  label.selected div:before{
    background:var(--lightBlue)
  }
  
  label.model{
    position:relative;
    background:none;
/*     border: 2px dashed #00000060; */
  }
      input[type="file"] {
    position: absolute;
    left: 0;
    opacity: 0;
    top: 0;
    bottom: 0;
    width: 100%;
  }
    input:hover{
      cursor:pointer;
    }

  label div {
    width:100%;
    height:100%;
    display:flex;
    align-items: center;
    justify-content: center;
    color:#ffffff80;
  }
/*   label.selected div{
    color:#ffffff;
  } */
  label div .kalicon{
     margin-bottom:8px;
  }
  label:hover div .variable{
    font-variation-settings:'anim' 100;
  }
  label div svg{
    width:100%;
    height:100%;
    position:absolute;
    pointer-events:none;
  }
  circle {
  fill: transparent;
  stroke: #ffffff80;
  stroke-width: 3;
  }
/*   .selected circle{
    stroke:var(--lightBlue);
  } */
  .solid{
    stroke-dasharray: none;
  }
  .dashed {
    stroke-dasharray: 8, 8.5;
  }
  .dotted {
    stroke-dasharray: 0.1, 8.9;
    stroke-linecap: round;
  }
/*   .selected .dotted{
    stroke-dasharray:none;
  } */
  
  

  @media only screen and (max-width: 600px) {
    container{
          border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    }
    section{
      display: inline-block;
      height:100%;
    }
    .model-list{
      --model-list-margin-h: 24px;
      display:flex;
      flex-direction:row;
      width:max-content;
      margin-bottom:0;
      height: calc(100% - var(--model-list-margin-h) * 2);
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
    .cameraToggle{
      width: 100%;
      right: 0;
      height: 100%;
      border-top-left-radius: 12px;
      border-top-right-radius: 12px;
      justify-content:flex-end;
      align-items:center;
    }
    .cameraToggle p{
      margin:24px;
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
      div.model.selected:hover:before{
        transform:scale(1);
      }

       .cameraToggle p:hover{
    border-bottom: 2px solid #ffffff80;
  }  
      label:hover div:after{
    opacity:1;
  }
  }
</style>