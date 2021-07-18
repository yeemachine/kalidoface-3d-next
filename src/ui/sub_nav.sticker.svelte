<script context="module">
import { writable,get } from 'svelte/store';
import {stickerLayers,stickerList} from '../scene/stickers.svelte'
import {randomString,isImageVideo} from '../utils/helpers.js'
import {notifText} from './notif.svelte'

export const handleStickerImage = (files) => {
  for (var i = 0; i < files.length; i++) {
    let type = isImageVideo(files[i])
    if(!type){
      notifText.set({type:'error','text':'Stickers can only be .jpg, .png, .gif or .mp4'})
      return
    }
      const objectURL = URL.createObjectURL(files[i])
      let reader = new FileReader();
      reader.onload = function(e) {
        let data = e.target.result
        let newSticker = {
          url:objectURL,
          data:data,
          default:.5,
          type:type,
          uploaded:true,
          zIndex:get(stickerLayers).length + 1
        }
        stickerList.set([newSticker,...get(stickerList)])
        addSticker(newSticker)
      };  
      reader.readAsDataURL(files[i]);
    }
}  

export const addSticker = (sticker) => {
    stickerLayers.set([...get(stickerLayers),{
    id:randomString(6, '0123456789'),
    url:sticker.url,
    type: sticker.type ? sticker.type 
          : sticker.url.includes('.mp4') ? 'video' 
          : 'img',
    default:sticker.default,
    zIndex:get(stickerLayers).length + 1
  }])
}
</script>

<script>
import { fade, fly,scale } from 'svelte/transition';
import { cubicInOut } from "svelte/easing"; 
import { flip } from 'svelte/animate';
import {DIM,setLang} from '../stores.js';
import {ftueState,updateFtue} from './ftue.svelte';
import {dropzone} from './filedrop.svelte'
import {subnav_sticker_text} from '../text/translations.js';

const handleClickUpload = (e) => {
  handleStickerImage(e.target.files)
}

//remove from sticker list
const removeImage = (url) => {
  let layerIndex = checkIndex(url,$stickerList,'url')
  if(layerIndex !== null){
    let newArray = $stickerList
    newArray.splice(layerIndex, 1)
    if(layerIndex > -1){
      $stickerList=newArray
    }
  }
  removeSticker(url)
  return layerIndex
}

const checkIndex = (url,array,key) => {
  let index = null
   array.forEach((e,i)=>{
    if(e[key].includes(url)){
      index = i
      return
    }
  })
  return index
}

const removeSticker = (url) => {
  let layerIndex = checkIndex(url,$stickerLayers,'url')
  if(layerIndex !== null){
    let newArray = $stickerLayers
    newArray.splice(layerIndex, 1)
    if(layerIndex > -1){
      stickerLayers.set(newArray)
    }
  }
  return layerIndex
}



const handleClick = (sticker) => {
  let layerIndex = removeSticker(sticker.url)
  if(layerIndex !==null) return
  addSticker(sticker)
}
</script>

<container
      class:drop_zone={$dropzone}
      data-text="{subnav_sticker_text.upload[$setLang]}"
           >
  <div class="sticker-list"
       in:fly="{{ x: $DIM.w > 600 ? 0 : 20, y: $DIM.w > 600 ? 20 : 0, easing: cubicInOut,duration: 400, delay:200 }}" 
     out:fade="{{duration:$DIM.w > 600 ? 200 : 0}}"
       >
    
    <label class="sticker" for="uploadImage">
      <div data-text="{subnav_sticker_text.upload[$setLang]}">
        <svg viewBox="0 0 300 300">
          <rect class="dotted" x="4" y="4" width="291" height="291" rx="20"/>
        </svg>
        <i class="kalicon notranslate solid variable">file</i> 
      </div>
      <input type="file" id="uploadImage" name="fileList" accept=".jpg,.png,.gif,.mp4" on:change={handleClickUpload}>
    </label>

    {#each $stickerList as sticker,i (sticker)}
    
        <div 
          animate:flip="{{ duration: 300 }}" out:scale|local="{{ duration: 250 }}" in:scale|local="{{ duration: 250 }}"
           class="sticker {$stickerLayers.length>0 && checkIndex(sticker.url,$stickerLayers,'url') !== null ? 'selected' : ''}">
       
          <div class="contentContainer">
      {#if sticker.type==="video"}
        <video class="content" src="{sticker.url}" alt={'uploaded sticker'+i}  autoplay muted playsinline loop on:click={()=>{handleClick(sticker)}}/>
      {:else}
        <img class="content" src={sticker.url} alt={'uploaded sticker'+i} on:click={()=>{handleClick(sticker)}}/>
      {/if}
         </div> 
          
      {#if sticker.uploaded}
        <button 
          class="remove"
          on:click={()=>{removeImage(sticker.url)}}
        > 
          <i class="kalicon notranslate fill small">jellyfill</i>
          <i class="kalicon notranslate solid small">minus</i> 
        </button>
      {/if}
    </div>
    {/each}
  </div>
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
    right: -14px;
    top: -15px;
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
    --drop-padding-w:16px;
    --drop-padding-h:16px;
    content: attr(data-text);
    padding:var(--drop-padding-h) var(--drop-padding-w) var(--drop-padding-h) var(--drop-padding-w);
    width: calc(100% - 8px - var(--drop-padding-w) * 2);
    height: calc(100% - 8px - var(--drop-padding-h) * 2);
    position: fixed;
    top: 0px;
    left: 0;
    background: #2d2d2df5;
     text-align:center;
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
   .sticker-list{
    --sticker-list-margin-w:16px;
    --sticker-list-margin-h:48px;
    width:calc(100% - var(--sticker-list-margin-w) * 2);
/*     height:calc(100% - var(--sticker-list-margin-h) * 2); */
    padding:var(--sticker-list-margin-h) var(--sticker-list-margin-w) var(--sticker-list-margin-h) var(--sticker-list-margin-w);
    padding-left:calc(var(--sticker-list-margin-w) + env(safe-area-inset-left, 0px) * .25);
    padding-right:calc(var(--sticker-list-margin-w) - env(safe-area-inset-left, 0px) * .25);
    align-items: center;
    flex-direction: column;
    justify-content:flex-start;
    display: flex;
     overflow:hidden;
     color:white;
     text-align:center;
  }
  .sticker{
    --sticker-width: 87px;
    --sticker-height: 87px;
    --sticker-margin:16px;
    --sticker-color:var(--offblack);
    --sticker-radius:8px;
    width:var(--sticker-width);
    height:var(--sticker-height);
    margin:var(--sticker-margin);
    position:relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .contentContainer {
      width: 100%;
      height: 100%;
      border-radius: var(--sticker-radius);
      overflow: hidden;
      background:var(--sticker-color);
  }
  div.sticker:after{
    width:100%;
    height:100%;
    content:'';
    background:var(--offblack);
    border-radius: var(--sticker-radius);
    position:absolute;
    z-index:-1;
    transform:scale(1);
    
  }
  div.sticker:before{
    width:calc(100% + 12px);
    height:calc(100% + 12px);
    content:'';
    position:absolute;
    background:#ffffff20;
    z-index:-2;
    transition:.24s ease;
    transform:scale(.85);
    border-radius: calc(var(--sticker-radius) + 4px);
  }
  div.sticker.selected:before{
    background:var(--lightBlue);
    transform: scale(1);
    transition:.4s ease;
  }


    .content{
    width: calc(100% - 16px);
    height:calc(100% - 16px);
    padding:8px;
    background:var(--offblack);
    object-fit: contain;
  }

   rect {
  fill: transparent;
  stroke: #ffffff90;
  stroke-width: 8;
  }
  .solid{
    stroke-dasharray: none;
  }
  .dashed {
    stroke-dasharray: 8, 8.5;
  }
  .dotted {
    stroke-dasharray: 0.1, 28.8;
    stroke-linecap: round;
  }
  
    label.sticker{
    position:relative;
    background:none;
    -webkit-box-shadow: none;
    box-shadow: none;
    border-radius:var(--sticker-radius);
/*     border: 2px dashed #00000060; */
  }
  label div:before{
    --inset : 12px;
    content:'';
    position:absolute;
    top:var(--inset);
    left:var(--inset);
    width:calc(100% - var(--inset) * 2);
    height:calc(100% - var(--inset) * 2);
    z-index:-1;
    background:#ffffff00;
    border-radius:4px;
    transition:background-color .2s 
  }
  label:hover div:before,label:active div:before{
    background:#ffffff10;
  }
   label div:after{
    content:attr(data-text);
    position: absolute;
      width: max-content;
      top: var(--sticker-width);
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

  svg{
    width:100%;
    height:100%;
    position: absolute;
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
    color:#ffffff90;
  }
  label div .kalicon{
     margin-bottom:8px;
  }
  label:hover div .variable{
    font-variation-settings:'anim' 100;
  }
  @media only screen and (max-width: 600px) {
    .sticker-list{
      --sticker-list-margin-h: 24px;
      flex-direction:row;
      width:max-content;
      height:calc(100% - var(--sticker-list-margin-h) * 2);
    }
    .sticker{
      --sticker-width: 94px;
      --sticker-height: 94px;
      --sticker-radius:4px;
    }
    
    
  }
  
  @media only screen and (hover: hover) and (pointer: fine) {
    .sticker .remove{
      opacity:0;
    }
    .sticker:hover .remove{
      opacity:1;
    }
    div.sticker:hover{
    cursor:pointer;
  }
      div.sticker:hover:before{
        transform:scale(1.1);
      }
      div.sticker.selected:hover:before{
        transform:scale(1);
      }
    

      label:hover div:after{
    opacity:1;
  }
  }
</style>