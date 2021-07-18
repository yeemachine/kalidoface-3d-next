<script>
import { fade } from 'svelte/transition';
import { cubicInOut } from "svelte/easing"; 
import {DIM, setLang} from '../stores.js';
import {ftueState,updateFtue} from './ftue.svelte';
import {inputID,friendID,myID,PEER,peerState,p2pConnection,callTime} from '../connections/Peer.svelte';
import {onMount} from 'svelte';
import {subnav_call_text} from '../text/translations.js';

  let state = 'default'
  let copied = false
  let timeout

  const triggerNotif = () => {
    clearTimeout(timeout);
    copied=true
    timeout = setTimeout(()=>{
      copied=false
    }, 1000)
  }
  
  const handleCall = () => {
    if($p2pConnection){
      $p2pConnection.close();
      return
    }
    if($inputID.length === 6 && $inputID.match(/^[0-9]+$/)){
      friendID.set($inputID)
    }
    
  }
    
  const copyToClipboard = () => {
     const el = document.createElement('textarea');
      el.value = $myID;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      triggerNotif()
  }
  
</script>

<container>
  <div class="call {$peerState}"
         in:fade="{{easing: cubicInOut,duration: 300, delay:400 }}" 
     out:fade="{{duration:$DIM.w > 600 ? 200 : 0}}">
    
    
    {#if $peerState !== 'server-disconnect'}
        {#if !$p2pConnection}
           <label>
             {subnav_call_text.label.default[$setLang]}
          </label>
        <input bind:value={$inputID} 
               data-length={$inputID.length} 
               maxlength='6' 
               pattern="^[0-9]*$"
               spellcheck="false"
               onkeypress="return /[0-9]/i.test(event.key)"
               type="tel"
               placeholder='000000'
               />
        {/if}

 
      <div class="cover"></div>
        {#if $peerState === 'connecting'}
            <h4 class="loading">{subnav_call_text.connecting[$setLang]}</h4>
        {:else if $peerState === 'connected'}
            <label class="friend">{subnav_call_text.label.connected[$setLang]} <b>#{$p2pConnection.peer}</b></label>
            <h4 class="timer">{$callTime}</h4>
        {/if} 
       <button class="call-button no_highlights 
                       {$inputID.length === 6 && $inputID.match(/^[0-9]+$/) ? ''
                       : ($p2pConnection) ? ''
                       :'disabled'}"
                on:click={handleCall}
      > 
          <i class="kalicon notranslate fill">jellyfill</i>
          <i class="kalicon notranslate solid variable {$p2pConnection ? 'end' : ''}">phone</i>
          {#if $peerState === 'connected'}
            <div class="pulse"></div>
          {/if}
      </button>
    {:else}
      <label>{subnav_call_text.label.disconnected[$setLang]}</label>
      <button class="reconnect" on:click={()=>$PEER.reconnect()}>
        {subnav_call_text.disconnected[$setLang]}
    </button>
    {/if}
    
   
    
  </div>
  <button class="your-id {copied? 'copied' : ''}"
          on:click="{copyToClipboard}"
          in:fade="{{easing: cubicInOut,duration: 300, delay:500 }}" 
     out:fade="{{duration:$DIM.w > 600 ? 200 : 0}}"
          >
    {#if copied}
    {subnav_call_text.id.copied[$setLang]}
    {:else}
    {subnav_call_text.id.share[$setLang]} #<span>{$myID}</span>
    {/if}
  </button>
</container>

<style>
  @keyframes loading{
    0%{
      opacity:100%;
    }
    50%{
      opacity:30%;
    }
    0%{
      opacity:100%;
    }
  }
   .pulse{
    --scale:2;
    top: 4px;
    width:90%;
    height:90%;
    z-index:-1;
     background: radial-gradient(circle, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 55%, rgba(255,255,255,.3) 80%, rgba(255,255,255,.3) 100%);
  }
  .cover{
width:48px;
    height:48px;
    background:#269c6b;
    border-radius:50%;
    position:absolute;
    bottom:30px;
    transform-origin:center;
    transform:scale(0);
  }
  .connecting .cover{
    transform:scale(30);
/*     background:#33333f; */
    transition: transform ease-out 300ms, background ease-out 800ms 400ms;
  }
  .connected .cover{
    transform:scale(30);
    background:#33333f;
    transition: transform ease-out 300ms, background ease-out 800ms 400ms;
  }
  .reconnect{
        background: #269c6b;
    color: white;
    padding: 16px;
    margin-top: 16px;
    border-radius: 80px;
    font-size: 12px;
  }
  .reconnect:hover{
    background:#208058;
  }
 container{
    width:100%;
    height:100%;
    position:absolute;
    overflow:hidden;
    z-index:1;
     display:flex;
   flex-direction:column;
   align-items:center;
   justify-content:center;
  }
  label{
    text-align:center;
    color:#ffffff;
    font-size:12px;
    font-weight:400;
  }
  label b{
    font-weight:bold;
  }
  label.friend{
    z-index:2;
  }
  .timer{
   z-index:2;
    font-variant-numeric: tabular-nums;
  font-size: 44px;
  letter-spacing: 0ch;
    color:white;
    margin: 16px 0 24px 0;
  }
  .loading{
   z-index:2;
  font-size: 24px;
    color:white;
    margin: 32px 0 48px 0;
    animation: loading 1.2s infinite;
  animation-timing-function: ease-in-out;
  }
  .call{
       width: calc(100%);
    /* height: calc(50vh - 70px); */
    min-height: 136px;
    background: #00000030;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    overflow: hidden;
    position: relative;
    border-radius: 24px;
    -webkit-backface-visibility: hidden;
    -webkit-transform: translate3d(0,0,0);
    padding: 32px 0 80px 0;
    /* border-top-left-radius: 0; */
    /* border-top-right-radius: 0; */
    width: calc(100% - calc(env(safe-area-inset-left, 0px) * .5) - 16px);
    padding-left: calc(env(safe-area-inset-left, 0px) * .5);
    margin-top: 24px;
/*     border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px; */
  }
  input:hover{
    --defaultColor:var(--lapizBlue);
  }
 input {
  --defaultColor:var(--lightBlue);
  --selectedColor:white;
   font-variant-numeric: tabular-nums;
  font-size: 44px;
  letter-spacing: 0.5ch;
  display: block;
   font-weight:600;
  overflow:visible;
  margin: 24px -.5ch 24px 0;
  border: none;
   border-radius:0;
  padding: 0;
  width: 9.1ch;
   color:white;
  background: linear-gradient(to right, var(--defaultColor) 1ch, transparent 1ch 1.5ch, var(--defaultColor) 1.5ch 2.5ch, transparent 2.5ch 3ch, var(--defaultColor) 3ch 4ch, transparent 4ch 4.5ch, var(--defaultColor) 4.5ch 5.5ch, transparent 5.5ch 6ch, var(--defaultColor) 6ch 7ch, transparent 7ch 7.5ch, var(--defaultColor) 7.5ch) 0 100%/8.5ch 2px no-repeat;

}
  input[data-length='1'],input:focus[data-length='0']{
      background: linear-gradient(to right, var(--selectedColor) 1ch, transparent 1ch 1.5ch, var(--defaultColor) 1.5ch 2.5ch, transparent 2.5ch 3ch, var(--defaultColor) 3ch 4ch, transparent 4ch 4.5ch, var(--defaultColor) 4.5ch 5.5ch, transparent 5.5ch 6ch, var(--defaultColor) 6ch 7ch, transparent 7ch 7.5ch, var(--defaultColor) 7.5ch) 0 100%/8.5ch 2px no-repeat;
  }
    input[data-length='2']{
      background: linear-gradient(to right, var(--selectedColor) 1ch, transparent 1ch 1.5ch, var(--selectedColor) 1.5ch 2.5ch, transparent 2.5ch 3ch, var(--defaultColor) 3ch 4ch, transparent 4ch 4.5ch, var(--defaultColor) 4.5ch 5.5ch, transparent 5.5ch 6ch, var(--defaultColor) 6ch 7ch, transparent 7ch 7.5ch, var(--defaultColor) 7.5ch) 0 100%/8.5ch 2px no-repeat;
  }
   input[data-length='3']{
      background: linear-gradient(to right, var(--selectedColor) 1ch, transparent 1ch 1.5ch, var(--selectedColor) 1.5ch 2.5ch, transparent 2.5ch 3ch, var(--selectedColor) 3ch 4ch, transparent 4ch 4.5ch, var(--defaultColor) 4.5ch 5.5ch, transparent 5.5ch 6ch, var(--defaultColor) 6ch 7ch, transparent 7ch 7.5ch, var(--defaultColor) 7.5ch) 0 100%/8.5ch 2px no-repeat;
  }
    input[data-length='4']{
      background: linear-gradient(to right, var(--selectedColor) 1ch, transparent 1ch 1.5ch, var(--selectedColor) 1.5ch 2.5ch, transparent 2.5ch 3ch, var(--selectedColor) 3ch 4ch, transparent 4ch 4.5ch, var(--selectedColor) 4.5ch 5.5ch, transparent 5.5ch 6ch, var(--defaultColor) 6ch 7ch, transparent 7ch 7.5ch, var(--defaultColor) 7.5ch) 0 100%/8.5ch 2px no-repeat;
  }
   input[data-length='5']{
      background: linear-gradient(to right, var(--selectedColor) 1ch, transparent 1ch 1.5ch, var(--selectedColor) 1.5ch 2.5ch, transparent 2.5ch 3ch, var(--selectedColor) 3ch 4ch, transparent 4ch 4.5ch, var(--selectedColor) 4.5ch 5.5ch, transparent 5.5ch 6ch, var(--selectedColor) 6ch 7ch, transparent 7ch 7.5ch, var(--defaultColor) 7.5ch) 0 100%/8.5ch 2px no-repeat;
  }
   input[data-length='6']{
      background: linear-gradient(to right, var(--selectedColor) 1ch, transparent 1ch 1.5ch, var(--selectedColor) 1.5ch 2.5ch, transparent 2.5ch 3ch, var(--selectedColor) 3ch 4ch, transparent 4ch 4.5ch, var(--selectedColor) 4.5ch 5.5ch, transparent 5.5ch 6ch, var(--selectedColor) 6ch 7ch, transparent 7ch 7.5ch, var(--selectedColor) 7.5ch) 0 100%/8.5ch 2px no-repeat;
  }
  
input:focus {
  outline: none;
  color: white;
}
  
  /* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}

::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: var(--defaultColor);
  opacity: 1; /* Firefox */
}

:-ms-input-placeholder { /* Internet Explorer 10-11 */
  color: var(--defaultColor);
}

::-ms-input-placeholder { /* Microsoft Edge */
  color: var(--defaultColor);
}
  
  .call-button{
  --button-width:48px;
  border-radius: 100%;
  width: var(--button-width);
  height: var(--button-width);
  color: white;
  justify-content: center;
  align-items: center;
  display: flex;
  text-align: center;
  line-height: 48px;
  -webkit-transition: -webkit-transform ease-out 200ms;
  transition: -webkit-transform ease-out 200ms;
  transition: transform ease-out 200ms;
  transition: transform ease-out 200ms, -webkit-transform ease-out 200ms;
  pointer-events:all;
    z-index:2;  
    position: absolute;
    bottom: 24px;
}
  .call-button .fill{
    color:#269c6b;
    text-shadow:none;
  }
  .call-button.disabled{
    pointer-events:none
  }
  .call-button.disabled .fill{
    color:#ffffff10
  }
  .call-button.disabled .solid{
    color:#ffffff30;
  }
  .connecting .call-button.disabled{
    pointer-events:all;
  }
  .connecting .call-button.disabled .solid{
    color:white;
  }
  .connecting .call-button .fill,.connected .call-button .fill{
    color:var(--lightRed)
  }
  
  .your-id{
       padding: 0;
    color: white;
    background: var(--lightBlue);
    border-radius: 32px;
    font-size: 12px;
    margin: 8px 0 8px 0;
    font-weight: 400;
    width: calc(100% - 16px);
    height: 72px;
    min-width: 210px;
    max-width: 100%;
    transition: ease-out 200ms;
/*     border-top-left-radius: 8px;
    border-top-right-radius: 8px; */
  }
  .your-id:hover{
    background:var(--lapizBlue)
  }
  .your-id.copied{
    color:var(--lightBlue);
    background:white;
  }
  .your-id span{
    font-weight: bold;
  }
  
  @media only screen and (max-width: 600px) {
    container{
      justify-content:flex-start;
    }
    .call{
    height: 104px;
    min-height: 0;
    padding: 56px 0 72px 0;
/*     border-top-left-radius: 12px;
    border-top-right-radius: 12px; */
    }
    .connecting .cover{
        transform:scale(14);
      }
      .connected .cover{
        transform:scale(14);
      }
    
  }
  
</style>