<script context="module">
import { writable,get } from 'svelte/store';
import {urlBase,setLang,getLocalStorage,subLocalStorage} from '../stores.js'

export const ftueState = writable({
  camera:true,
  char:true,
  call:true,
  bg:true,
  sticker:true
});
export const updateFtue = (val)=>{
  if(get(ftueState)[val]){
    get(ftueState)[val] = false
    ftueState.set(get(ftueState))
  }
}
getLocalStorage(ftueState,'ftueState',{
  camera:true,
  char:true,
  call:true,
  bg:true,
  sticker:true
});
  
subLocalStorage(ftueState,'ftueState')  
</script>
  
<script>
import { fade, fly, scale } from 'svelte/transition';
import { cubicInOut } from "svelte/easing"; 
import {ftueText} from '../text/translations.js';
  
export let selected;
export let style = '';

let ftueList = {
  char:"https://cdn.glitch.com/29e07830-2317-4b15-a044-135e73c7f840%2Fcharupload1clippedcropped.mp4?v=1625730916425",
  bg:"https://cdn.glitch.com/29e07830-2317-4b15-a044-135e73c7f840%2Fbgupload1.mp4?v=1625732427215",
  sticker:"https://cdn.glitch.com/29e07830-2317-4b15-a044-135e73c7f840%2Fstickerdropcrop.mp4?v=1625760067751",
  call:"https://cdn.glitch.com/29e07830-2317-4b15-a044-135e73c7f840%2Fcall_small.mp4?v=1626041341731"
}

</script>

{#if selected && $ftueState[selected]}
<container 
  style="{style}"
   in:scale="{{ delay:1000, duration: 300, easing: cubicInOut, baseScale: 0.9 }}"
     out:fade="{{duration: 200}}"
           >
<video class="content {selected}" 
           src="{ftueList[selected]}" 
           alt={'uploaded sticker'} autoplay muted playsinline loop></video>
  <div>
   
  <p>
    {@html ftueText[selected].message[$setLang]}  
  </p>
   <p class="confirm" on:click="{()=>updateFtue(selected)}">{ftueText[selected].confirm[$setLang]}</p>
  </div>
</container>
{/if}

<!-- <div class="ftueframe">
  
</div> -->

<style>
  @keyframes -global-rotate1 {
  0% {
    transform: rotate(4deg);
  }
  100% {
    transform: rotate(-1deg);
  }
  }
  .ftueframe{
    width: calc(100vw - 160px);
    height: calc(100vh - 160px);
    position: fixed;
    top: 80px;
    left: 80px;
    z-index: 1;
    transform: scale(1);
    pointer-events: none;
  }
  .ftueframe:after{
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 12px;
    width: 100%;
    height: 100%;
    box-shadow: 20px 0px 0px 2000px #4c7fe7;
  
  }
  container{
    --container-w-d:160px;
    --container-h-m:210px;
    position:fixed;
/*     left:calc(var(--container-w-d) + 20px); */
    right:10px;
    bottom:10px;
    width:440px;
    height:auto;
    z-index: 4;
        border-radius: 24px;
    border-bottom-right-radius: 0px;
    overflow:hidden;
    background: white;
    color: var(--darkgrey);
    display:flex;
/*     flex-direction:column; */
       flex-direction:row;
        justify-content: center;
    align-items: center;
    -webkit-box-shadow: 2px 2px 15px 3px rgb(82 119 204 / 10%); 
box-shadow: 2px 2px 15px 3px rgb(82 119 204 / 10%)
  }

  video{
    width: 170px;
    height: 100%;
    display: block;
    object-fit: cover;
    position: absolute;
    left: 0;
    z-index: -1;
  }
  video.live2d{
    width:190px;
  }
  video.sticker{
    width:190px;
  }
  video.bg{
    width:160px;
  }
  video.call{
    object-fit:cover;
    width:180px;
  }
  p{
    padding: 24px 18px 0 0;
    margin: 0;
    margin-left:180px;
    height:max-content;
    font-size: 16px;
        line-height: 1.4;
  }
  
  .confirm{
    color:var(--lightBlue);
    padding: 8px 18px 24px 0;
  }
  .confirm:hover{
    text-decoration:underline;
    color:var(--lapizBlue);
    cursor:pointer;
  }
  @media only screen and (max-width: 600px) {
    container{
      bottom: calc(var(--container-h-m) + 10px);
    width: calc(100vw - 20px);
    right: 10px;
    flex-direction: row;
    max-width: 420px;
  }
    p{
      font-size:14px;
      margin-left:180px;
    }
    
    .ftueframe{
    width: calc(100vw - 40px);
    height: calc(100vh - 40px);
    top:20px;
    left:20px;
    
  }
  }
  </style>
