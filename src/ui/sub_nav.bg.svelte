<script context="module">
import { writable,get } from 'svelte/store';
import {bgURL,bgList} from '../scene/bg.svelte';
import {DIM,urlBase,breakpoint,getLocalStorage,subLocalStorage,setLang} from '../stores.js'
import {isImageVideo} from '../utils/helpers.js'
import {notifText} from './notif.svelte'

export const savedIro = writable('#fff');
getLocalStorage(savedIro,'savedIro','#fff')  
subLocalStorage(savedIro,'savedIro')
  
export const handleBGImage = (files) => {
  for (var i = 0; i < files.length; i++) {
    let type = isImageVideo(files[i])
    if(!type){
      console.log('File format not supported.')
      notifText.set({type:'error','text':'Backgrounds can only be .jpg, .png, or .mp4'})
      return
    }
    const blob = URL.createObjectURL(files[i])
    var reader = new FileReader();
    reader.onload = function(e) {
      let objectURL = e.target.result
      bgURL.set({
        type:type,
        data:objectURL,
        url:blob})
      bgList.set([{
        type:type,
        data:objectURL,
        url:blob,
        uploaded:true
      },...get(bgList)])
    };  
    reader.readAsDataURL(files[i]);
  }
} 
  
</script>
<script>
import iro from '@jaames/iro';
import { fade, fly,scale } from 'svelte/transition';
import { flip } from 'svelte/animate';
import { cubicInOut } from "svelte/easing"; 
import {ftueState,updateFtue} from './ftue.svelte';
import {onMount} from 'svelte'   
import {dropzone} from './filedrop.svelte'
import {subnav_bg_text} from '../text/translations.js';

const removeImage = (i) => {
    let newArray = $bgList
    newArray.splice(i, 1)
    if(i > -1){
      $bgList = newArray
    }
}

const handleSelect = (content) => {
  if ($bgURL.url === content.url){return}
  bgURL.set({type:content.type,data:content.data,url:content.url,sea:content.sea,pano:content.pano})
}

const handleClickUpload = (e) => {
  handleBGImage(e.target.files)
}

let colorPicker
onMount(()=>{
  colorPicker = new iro.ColorPicker("#picker", {
     layout: [
        { component: iro.ui.Wheel},
        { component: iro.ui.Slider},
      ],
    display:'flex',
    width: 126,
    color: $savedIro,
    borderWidth: 0,
    borderColor: "var(--offblack)",
  });
  colorPicker.forceUpdate()
  colorPicker.on('color:change', function(color) {
    savedIro.set(color.hexString)
    bgURL.set({
        type:'iro',
        url:color.hexString})
  });
})
  
$:{
  if(colorPicker && $breakpoint){
    colorPicker.state.layoutDirection = $breakpoint === 'desktop' ? 'vertical' : 'horizontal'
    colorPicker.forceUpdate()
  }
}
  
</script>

<container
      class:drop_zone={$dropzone}
      data-text="{subnav_bg_text.upload[$setLang]}"
           >
  <section>
  <div class="bg-list"
       in:fly="{{ x: $DIM.w > 600 ? 0 : 20, y: $DIM.w > 600 ? 20 : 0, easing: cubicInOut,duration: 400, delay:200 }}" 
     out:fade="{{duration:$DIM.w > 600 ? 200 : 0}}"
       >
    <label class="bg" for="uploadImage">
      <div data-text="{subnav_bg_text.upload[$setLang]}">
        <svg viewBox="0 0 300 300">
          <rect class="dotted" x="4" y="4" width="291" height="291" rx="20"/>
        </svg>
        <i class="kalicon notranslate solid variable">file</i> 
      </div>
      <input type="file" id="uploadImage" name="fileList" accept=".jpg,.png,.mp4" on:change={handleClickUpload}>
    </label>
          
          {#each $bgList as bg, i (bg)}
             <div 
                  
                  animate:flip="{{ duration: 300 }}" out:scale|local="{{ duration: 250 }}" in:scale|local="{{ duration: 250 }}"
                   class="bg {$bgURL.url === bg.url ? 'selected' : ''}"
                  style="--bg-color:{bg.type==='color'?bg.url:''}"
                  >
               <div class="contentContainer">
                
                {#if bg.type === 'video'}
                  <video class="content" src={bg.url} alt={'bg'+i} autoplay muted playsinline loop on:click="{(e)=>{e.preventDefault;handleSelect(bg)}}"/>
                {:else if bg.type ==='img'}
                  <img class="content" src={bg.thumbnail ? bg.thumbnail : bg.url} alt={'bg'+i} on:click="{(e)=>{e.preventDefault;handleSelect(bg)}}"/>
                {:else if bg.type === 'color'}
                 <div class="content color" 
                      class:transparent="{(bg.url.length>7)}"
                      style="--bgUrl:{bg.url}"
                      on:click="{(e)=>{e.preventDefault;handleSelect(bg)}}"></div>
                {/if}
                  
               </div>
                {#if bg.uploaded}
                  <button 
                    class="remove"
                    on:click={(e)=>{e.preventDefault;removeImage(i)}}
                  > 
                    <i class="kalicon notranslate fill small">jellyfill</i>
                    <i class="kalicon notranslate solid small">minus</i> 
                  </button>
                {/if}
              </div>           
    
          {/each}
          
         <div class="shadow" in:fade="{{easing: cubicInOut,duration:0,delay:1000}}"
         out:fade="{{duration: 0}}">
      </div>
  </div>
   <div class="spacer"></div>
  </section>
   
        <div id="picker" 
            in:fade="{{easing: cubicInOut,duration:0,delay:1000}}"
             out:fade="{{duration:0}}"></div>

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
  .shadow{
    position:absolute;
    width:100%;
    height:100%;
    background: var(--darkgrey);
    z-index:-2;
    top:0;
    left: 0;
    border-bottom-left-radius:28px;
    border-bottom-right-radius:28px;
  }
  .spacer{
    width:100%;
    height:260px;
    pointer-events:none;
  }
  section{
    pointer-events:none;
  }
  #picker{
/*     width: calc(100% + 2 * var(--bg-list-margin-w)); */
    background: #00000030;
/*     background:var(--bgThemeLight); */
/*     align-items: center; */
/*     justify-content: center; */
/*     margin-top: calc(2 * var(--bg-list-margin-w)); */
    height:100%;
    position:fixed;
    bottom:0;
    width:100%;
    width:calc(100% - calc(env(safe-area-inset-left, 0px) * .5));
    padding-left:calc(env(safe-area-inset-left, 0px) * .5);
    text-align:center;
    display:flex;
    align-items:flex-end;
    justify-content:center;
        z-index: -3;
  }
  :global(.IroColorPicker){
    width:100%;
    height:260px;
    flex-direction:column;
     align-items:center;
    justify-content:center;
  }
  :global(.IroWheel),:global(.IroSlider){
    pointer-events:all;
    position:relative;
  }
  container{
    width:100%;
    height:100%;
    position:absolute;
    overflow:visible;
    overflow-y:scroll;
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
    display: flex;
    align-items: center;
    text-align:center;
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
   .bg-list{
    --bg-list-margin-w:16px;
    --bg-list-margin-h:48px;
    width:calc(100% - var(--bg-list-margin-w) * 2);
    padding:var(--bg-list-margin-h) var(--bg-list-margin-w) var(--bg-list-margin-h) var(--bg-list-margin-w);
        padding-left:calc(var(--bg-list-margin-w) + env(safe-area-inset-left, 0px) * .25);
    padding-right:calc(var(--bg-list-margin-w) - env(safe-area-inset-left, 0px) * .25);
       align-items: center;
    flex-direction: column;
    flex-wrap: nowrap;
        display: flex;
        position: relative;
         pointer-events: all;
/*             margin-bottom: 280px; */
  }
  .bg{
    --bg-width: 87px;
    --bg-height: 87px;
    --bg-margin:16px;
    --bg-color:var(--offblack);
    --bg-radius:8px;
    width:var(--bg-width);
    height:var(--bg-height);
/*     background:var(--bg-color); */
    margin:var(--bg-margin);
    position:relative;
        display: flex;
    align-items: center;
    justify-content: center;
  }
  .contentContainer {
      width: 100%;
      height: 100%;
      border-radius: var(--bg-radius);
      overflow: hidden;
  }
  div.bg:before{
    width:calc(100% + 12px);
    height:calc(100% + 12px);
    content:'';
    position:absolute;
    transform:scale(1.2);
    background:#ffffff20;
    z-index:-1;
    transition:.24s ease;
    transform:scale(.85);
    border-radius: calc(var(--bg-radius) + 4px);
  }
  div.bg.selected:before{
    background:var(--lightBlue);
    transform: scale(1);
    transition:.4s ease;
  }

    .content{
    width:100%;
    height:100%;
    object-fit: cover;
  }
  
  .content.color{
    background:var(--bg-color);
  }
  
  .content.color.transparent{
        background-image: url(https://cdn.glitch.com/29e07830-2317-4b15-a044-135e73c7f840%2Fstripe_bb0280f8fd3add90c3f0fce480807c8b.png?v=1626306848694);
    background-repeat: repeat;
    background-size: 20px;

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
    label.bg{
    position:relative;
    background:none;
    -webkit-box-shadow: none;
    box-shadow: none;
    border-radius:var(--bg-radius);
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
      top: var(--bg-width);
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
   label.selected div{
    color:#ffffff;
  }
  label div .kalicon{
     margin-bottom:8px;
  }
  label:hover div .variable{
    font-variation-settings:'anim' 100;
  }
  @media only screen and (max-width: 600px) {
     container{
      border-top-left-radius:28px;
      border-top-right-radius:28px;
    }
    section{
          display: flex;
    width: max-content;
      pointer-events:none;
        height:100%;
    }
    .spacer{
      width:280px;
      height:100%;
    }
    .bg-list{
      --bg-list-margin-h: 24px;
      display:flex;
      flex-direction:row;
      width:max-content;
      margin-bottom:0;
      pointer-events:all;
    }
     .shadow{
      border-top-left-radius:28px;
      border-bottom-left-radius:0;
      border-top-right-radius:28px;
      border-bottom-right-radius:28px;
    }
    #picker{
      width: 100%;
      right: 0;
      height: 100%;
      border-top-left-radius: 28px;
      border-top-right-radius: 28px;
      justify-content:flex-end;
      align-items:center;
    }
    :global(.IroColorPicker){
      width:280px;
          flex-direction: row;
      height:100%;
    }
    .bg{
      --bg-width: 94px;
      --bg-height: 94px;
      --bg-radius:4px;
    }

  }
  
  @media only screen and (hover: hover) and (pointer: fine) {
    .bg .remove{
      opacity:0;
    }
    .bg:hover .remove{
      opacity:1;
    }

    
            div.bg:hover{
    cursor:pointer;
  }
      div.bg:hover:before{
        transform:scale(1.1);
      }
      div.bg.selected:hover:before{
        transform:scale(1);
      }
      label:hover div:after{
    opacity:1;
  }
  }
</style>