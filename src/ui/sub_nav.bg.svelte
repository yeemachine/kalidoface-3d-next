<script context="module">
import { writable,get } from 'svelte/store';
import {bgURL,bgList,presetBGs,preset3DBGs} from '../scene/bg.svelte';
import {DIM,urlBase,breakpoint,getLocalStorage,subLocalStorage,setLang} from '../stores.js'
import {isImageVideo} from '../utils/helpers.js'
import {notifText} from './notif.svelte'

export const savedIro = writable('#ffffff');
getLocalStorage(savedIro,'savedIro','#ffffff')  
subLocalStorage(savedIro,'savedIro')
  
export const BGState = writable('2D')
  
export const handleBGImage = (files) => {
  for (var i = 0; i < files.length; i++) {
    let file = files[i]
    let type = isImageVideo(file)
    if(!type){
      console.log('File format not supported.')
      notifText.set({type:'error','text':'Backgrounds can only be .jpg, .png, or .mp4'})
      return
    }
    const blob = URL.createObjectURL(file)
    var reader = new FileReader();
    reader.onload = function(e) {
      let objectURL = e.target.result
      bgURL.set({
        type:type,
        data:objectURL,
        name:file.name,
        pano:(get(BGState) === '3D'),
        url:blob})
      bgList.set([{
        type:type,
        data:objectURL,
        name:file.name,
        pano:(get(BGState) === '3D'),
        url:blob,
        uploaded:true
      },...get(bgList)])
    };  
    reader.readAsDataURL(file);
  }
} 

  
</script>
<script>
import { fade, fly,scale } from 'svelte/transition';
import { flip } from 'svelte/animate';
import { cubicInOut } from "svelte/easing"; 
import {ftueState,updateFtue} from './ftue.svelte';
import {dropzone} from './filedrop.svelte'
import {subnav_bg_text} from '../text/translations.js';
import IroPicker from './sub_nav.iro.svelte';
import SvgLink from './icons/svgLink.svelte'


const removeImage = (i) => {
    let newArray = $bgList
    newArray.splice(i, 1)
    if(i > -1){
      $bgList = newArray
    }
}

const handleSelect = (content) => {
  if ($bgURL.url === content.url){return}
  bgURL.set({type:content.type,data:content.data,url:content.url,sea:content.sea,pano:content.pano,light:content.light})
}

const handleClickUpload = (e) => {
  handleBGImage(e.target.files)
}

const filterArrByState = (list,state) => {
  let filteredList = []
  list.forEach(e=>{
    if((e.pano && state==='3D') || !e.pano && state==='2D'){
      filteredList.push(e)
    }
  })
  return filteredList
}

const getBGFromPrompt = ()=>{
  let url = prompt('Enter the URL to a .jpg or .png background (ﾉ◕ヮ◕)')
  if(!url){return}
  let newBg = {
    type:'img',
    pano:(get(BGState) === '3D'),
    url:url,
    uploaded:Date.now()
   }
   bgURL.set(newBg)
   bgList.set([newBg,...get(bgList)])
}  
</script>

<container
      class:drop_zone={$dropzone}
      data-text="{subnav_bg_text.upload[$setLang]}"
           >
  <section>
         <div class="tabs"
          in:fly="{{ x: $DIM.w > 600 ? 0 : 0, y: $DIM.w > 600 ? 20 : 0, easing: cubicInOut,duration: 400, delay:400 }}" 
     out:fade="{{duration:$DIM.w > 600 ? 200 : 0}}"
          >
           {#each ['2D','3D','Color'] as tab}
           <p class:selected={tab === $BGState}
              on:click={()=>{BGState.set(tab)}}
              >{tab}</p>
           {/each}
    </div>
  <div class="bg-list"
       in:fly="{{ x: $DIM.w > 600 ? 0 : 20, y: $DIM.w > 600 ? 20 : 0, easing: cubicInOut,duration: 400, delay:200 }}" 
     out:fade="{{duration:$DIM.w > 600 ? 200 : 0}}"
       >
    
    {#if $BGState === 'Color'}
     <IroPicker savedIro={savedIro} bgURL={bgURL}/>
    {:else}
      <div class="upload">
      <label data-text="{$BGState === '3D' ? subnav_bg_text.upload3D[$setLang] : subnav_bg_text.upload[$setLang]}" for="uploadImage">
        <i class="kalicon notranslate solid variable">file</i>
        <input type="file" id="uploadImage" name="fileList" accept=".jpg,.png,.mp4" on:change={handleClickUpload}>
      </label>
      <label data-text="Load from URL" on:click={getBGFromPrompt}>
        <i class="svgIcon"><SvgLink/></i>
      </label>
    </div>
    
<!--     <label class="bg" for="uploadImage">
      <div data-text="{$BGState === '3D' ? subnav_bg_text.upload3D[$setLang] : subnav_bg_text.upload[$setLang]}">
        <svg viewBox="0 0 300 300">
          <rect class="dotted" x="4" y="4" width="291" height="291" rx="20"/>
        </svg>
        <i class="kalicon notranslate solid variable">file</i> 
      </div>
      <input type="file" id="uploadImage" name="fileList" accept=".jpg,.png,.mp4" on:change={handleClickUpload}>
    </label> -->
          
          {#each [...filterArrByState($bgList,$BGState),...($BGState === '3D' ? preset3DBGs : presetBGs)] as bg, i (bg)}
             <div 
                  
                  animate:flip="{{ duration: 300 }}"  in:scale|local="{{ duration: 250 }}"
                   class="bg {$bgURL.url === bg.url ? 'selected' : ''}"
                  style="--bg-color:{bg.type==='color'?bg.url:''}"
                  name={bg.name}
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
    
    
    {/if}

  </div>
        
    
    
<!--    <div class="spacer"></div> -->
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
    pointer-events:all;
  }
  .tabs p{
    display:flex;
    background:#ffffff00;
    border-radius:20px;
    padding:8px 8px 8px 8px;
    color:white;
    margin:0 0 0 8px
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
    padding:var(--bg-list-margin-h) var(--bg-list-margin-w) calc(var(--bg-list-margin-h)*2) var(--bg-list-margin-w);
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
  .bg.hidden{
    display:none;
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
    div.bg[name]:after{
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
    bottom: -28px;
    -webkit-box-shadow: 0px 0px 15px 6px rgb(0 0 0 / 13%);
    box-shadow: 0px 0px 15px 6px rgb(0 0 0 / 13%);
    pointer-events: none;
    opacity: 0;
    transition: .2s;
  }
  div.bg[name=""]:after {
    display: none;
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
.upload label:first-child:after{
    left: -18px;
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
     container{
      border-top-left-radius:28px;
      border-top-right-radius:28px;
    }
    section{
          display: flex;
    width: max-content;
      pointer-events:none;
       height:calc(100% - 65px);
      margin-top:65px;
    }
     .tabs{
      bottom:unset;
      top:0;
      justify-content:flex-start;
       background:transparent;
    }
    .tabs:first-child{
      margin-left:16px;
    }
    .spacer{
      width:280px;
      height:100%;
    }
    .bg-list{
      --bg-list-margin-h: 24px;
      --bg-list-margin-w: 16px;
      display:flex;
      flex-direction:row;
      width:max-content;
      margin-bottom:0;
      pointer-events:all;
          background: #00000030;
      padding-bottom:calc(var(--bg-list-margin-h) * 1.5);
    border-top-left-radius: 28px;
    border-top-right-radius: 28px;
    }
   
    .bg{
      --bg-width: 94px;
      --bg-height: 94px;
      --bg-radius:4px;
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
    div.bg:hover:after{
        opacity:1;
      }
      div.bg.selected:hover:before{
        transform:scale(1);
      }
       .upload label:hover:after{
    opacity:1;
  }
  }
</style>