<script>
  import { fade , fly} from 'svelte/transition';
  import { cubicInOut } from "svelte/easing"; 
  import SVGWipe from "../components/SVGWipe.svelte"
  import {DIM,firstLoad,quickNavExpanded,infoExpanded,largeWipe,setLang} from '../stores.js'
  import Credits from './credits.svelte';
  import {tagline} from '../text/translations.js';
  let pageTheme = ['var(--offblack)',"url(#gradient2)","url(#gradient3)"]
  
  infoExpanded.subscribe(e=>{
    if($firstLoad){
      if(e){
        pageTheme = ['#2b2a35','#2b2a35','none']
         $largeWipe.animate({
          action:'open',
          axis:'y',
          _curve:'wave',
          _flip:false,
          _numPoints:6,
          _duration:800
        })
      }else{
        pageTheme = ['#2b2a35','none','none']
        $largeWipe.animate({
          // action:'close',
          axis:'y',
          _curve:'wave',
          _flip:false,
          _numPoints:6,
          _duration:800
        })
      }
    }
  })
  
  firstLoad.subscribe(e=>{
    if(e){
       let isMobile = $DIM.w < 600
      $largeWipe.animate({
        axis:isMobile ? 'x' : 'x',
        _flip:isMobile ? false : false,
        _curve:'wave',
        _numPoints:6,
        _duration:1000
      })
    }
  })
  
</script>

<container class="{$firstLoad ? 'loaded' : ''} {$infoExpanded ? 'info' :''}">
   <SVGWipe bind:this={$largeWipe} isOpen={true}>
         <style>
           svg{
             position:absolute;
           }
         </style>
        <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stop-color="#5800C9"/>
          <stop offset="100%" stop-color="#ff0ea1"/>
        </linearGradient>
        <linearGradient id="gradient2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stop-color="#ffd392"/>
          <stop offset="100%" stop-color="#ff3898"/>
        </linearGradient>
        <linearGradient id="gradient3" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stop-color="#38DBFF"/>
          <stop offset="100%" stop-color="#5800C9"/>
        </linearGradient>
      </defs>
      <path class="shape-overlays__path" fill="{pageTheme[1]}"></path>
      <path class="shape-overlays__path" fill="{pageTheme[2]}"></path>
      <path class="shape-overlays__path" fill={pageTheme[0]}></path>
    </SVGWipe>
    
    {#if !$firstLoad}
      <p id="tagline" 
         out:fade="{{duration:200,delay:600}}"
         >
        {@html tagline[$setLang]}  
      </p>
    {/if}
  
    {#if $infoExpanded}
        <Credits/>
    {/if}
</container>

<style>
  container{
    position:fixed;
    height:100%;
    width:100%;
    top: 0;
left: 0;
    z-index:5;
    display: flex;
    align-items: center;
    justify-content:center;
/*         background: #00fc01; */
  }  
  
#tagline{
 color: white;
    z-index: 999;
    position: absolute;
    bottom: 24px;
    margin-top: 44px;
    font-size: clamp(18px, 4vw, 22px);
    margin: 0;
    font-weight: 300;
  display:flex;
  justify-content:center;
  animation: flyIn .4s 1;
  animation-fill-mode:ease;
  animation-timing-function: cubic-bezier(0.18, 0.89, 0.58, 1.07);
}
  :global(#tagline strong){
    color:white;
    font-weight: 300;
/*     animation: whiteToBlue .4s .8s 1;
    animation-fill-mode:forwards;
    animation-timing-function: linear; */
    padding:0 0 0 .4ch
  }
  #tagline:before{
    content: '';
    position: absolute;
    height: 3px;
    width: 100%;
    bottom: -24px;
    background: var(--lightBlue);
    border-radius:16px;
    transform:scale(0,0);
    animation: scaleOut 0.4s 1;
    animation-fill-mode:forwards;
    animation-timing-function: ease;
  }
  container.loaded{
    pointer-events:none;
  }
  container.info{
    pointer-events:all;
  }
  
/*   @media only screen and (max-width: 600px) {
    container{
      z-index:5;
    }
  } */

</style>