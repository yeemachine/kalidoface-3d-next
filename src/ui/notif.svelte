<script context="module">
import { writable,get } from 'svelte/store';
export const notifText = writable(null)
</script>
<script>
import { fly } from 'svelte/transition';
import { cubicInOut } from "svelte/easing";
import {DIM}from "../stores.js"
  let time;
   const resetTimer = () => {
    clearTimeout(time);
    time = setTimeout(()=>{
        notifText.set(null)
    }, 3000)
  }
  notifText.subscribe(val=>{
    if(val){
      resetTimer()
    }
  })
</script>

{#key $notifText}
{#if $notifText}
<div class="notification {$notifText.type}"
      in:fly="{{ y: $DIM.w > 600 ? 20 : -20, easing: cubicInOut,duration: 400 }}" 
     out:fly="{{  y: $DIM.w > 600 ? 20 : -20, easing: cubicInOut,duration: 400, delay:200 }}" 
     >{$notifText.text}</div>
{/if}
{/key}

<style>
  .notification{
    position:absolute;
    bottom:10px;
    bottom:calc(env(safe-area-inset-bottom, 10px) + 10px);
    background:var(--darkgrey);
    color:white;
    max-width:480px;
    padding:16px 22px 16px 22px;
    border-radius:8px;
    z-index:6;
        font-size: 14px;
    display:flex;
    align-items:center;
  }
  .notification.error{
    padding:16px 22px 16px 32px;
  }
  .notification.error:after{
    content:'';
    position:absolute;
    left:14px;
    width:8px;
    height:8px;
    border-radius:50%;
    background:var(--lightRed)
  }
  @media only screen and (max-width: 600px) {
    .notification{
      bottom:unset;
      top:10px;
      top:calc(env(safe-area-inset-top, 10px));
    }
  }
</style>