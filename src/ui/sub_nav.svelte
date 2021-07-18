<script context="module">
import interact from "interactjs";
export let wipeComponent = null;
</script>
<script>
import {onMount} from 'svelte'
import SVGWipe from '../components/SVGWipe.svelte'
import {getCSSCustomProp} from '../utils/helpers.js'
import {DIM,subNavExpanded} from '../stores.js'
import CharList from './sub_nav.char.svelte'
import BGList from './sub_nav.bg.svelte'
import Call from './sub_nav.call.svelte'
import StickerList from './sub_nav.sticker.svelte'
import Settings from './sub_nav.settings.svelte'
import FTUE, {updateFtue} from './ftue.svelte'

export let selected = null;
export let sideSelected = null;
export let forceClose = false;


let subnav;
let theme = 'var(--iconbg)';
let customVars = ''
let maxY = 300

  
$:{
  subNavExpanded.set(selected)
}

const interactThreshold = 100;
let x=0,y=0;
  
const openClose = () => { 
    if(wipeComponent.isOpen){
      if(!selected || selected==="close"){
        close()
      }
    }else if(!wipeComponent.isOpen){
       open()
    }
}

const close = () => {
  updateFtue(selected)
  let isMobile = $DIM.w < 600;
   wipeComponent.animate({
    action:'close',
    axis:isMobile ? 'y' : 'x',
    _flip:isMobile ? false : true,
    _curve:"curve",
    _numPoints:5,
    _duration:isMobile ? 0 : 600})
  selected = null
  forceClose = false;
}

const open = () => {
  let isMobile = $DIM.w < 600;
   wipeComponent.animate({
        action:'open',
        axis:isMobile ? 'y' : 'x',
        _curve:"cuve",
        _flip:isMobile ? true : false,
        _numPoints:5,
        _duration:600})
  forceClose = false;
}

$:{
  if(selected && wipeComponent){
    openClose()
  }
}
  
$:{
  if(forceClose){
    closeMobile();
  }
}  
  
$:{
  switch(selected) {
  case 'char':
      theme='var(--darkgrey)'
      customVars=""
      maxY = 210
    break;
  case 'call':
      theme='var(--darkgrey)'
      customVars="--container-w-d:360px;--container-h-m:360px;"
      maxY = 360
    break;
  case 'bg':
      theme='var(--darkgrey)'
      customVars=""
      maxY = 210
    break;
  case 'sticker':
      theme='var(--darkgrey)'
      customVars=""
      maxY = 210
    break;
  case 'settings':
      theme='var(--darkgrey)'
      customVars="--container-w-d:360px;--container-h-m:550px;"
      maxY = 550;
    break;
  default:
  }
}
  
function dragMoveListener (event) {
    event.preventDefault()
		// keep the dragged position in the custom properties
		x = (getCSSCustomProp('--container-x', subnav, 'float') || 0) + event.dx
		y = (getCSSCustomProp('--container-y', subnav, 'float') || 0) + event.dy
    if (x > 0) x = 0
    if (y<0) y = 0
		// update styles
    subnav.setAttribute('data-status', '');
		subnav.style.setProperty('--container-x', x + 'px');
		subnav.style.setProperty('--container-y', y + 'px');    
}
  
function transitionListener (e) {
  if(e.propertyName === 'transform'){
    subnav.setAttribute('data-status', 'waiting');
    subnav.removeEventListener('transitionend',transitionListener)
    subnav.style.setProperty('--container-x', '0px');
    subnav.style.setProperty('--container-y', '0px');
    close()
  }
}
  
const closeMobile = () => {
     y = maxY
    subnav.setAttribute('data-status', 'transition');
    // mark as done after CSS transition
    subnav.addEventListener('transitionend', transitionListener);
    subnav.style.setProperty('--container-y', y + 'px');
    forceClose = false;
}

onMount(()=>{
  interact('.subnav[data-dragging="false"] .nav-touch').on('tap',closeMobile)
  interact('.subnav[data-dragging="false"] .nav-touch').draggable({
    onstart: () => {
				// signify dragging
			subnav.setAttribute('data-dragging', true);
		},
    onmove: dragMoveListener,
    onend: (event) => {
      subnav.setAttribute('data-dragging', false);
      	// calculate how far card moved
				let moved = (Math.sqrt(Math.pow(event.pageX - event.x0, 2) + Math.pow(event.pageY - event.y0, 2) | 0));
				if (moved > interactThreshold) {
	
          y = maxY
          subnav.setAttribute('data-status', 'transition');
					// mark as done after CSS transition
					subnav.addEventListener('transitionend', transitionListener);
				}
				else {
					// reset vars
					x = 0;
					y = 0;
				}
				// update x and y pos
				subnav.style.setProperty('--container-x', x + 'px');
				subnav.style.setProperty('--container-y', y + 'px');
    }
  })
})

</script>

 <container 
    bind:this={subnav} 
    class="subnav {!selected ? 'hide' : ''} {sideSelected ? 'dim' : ''}"
    style="{customVars}"
    data-dragging="false"
    data-status="waitiing"
  >
   
  <button 
    class="subnav-close"
    on:click={close}
  > 
    <i class="kalicon notranslate fill small">jellyfill</i>
    <i class="kalicon notranslate solid small">close</i> 
  </button>
   
  <div class="nav-touch no_highlights"></div>
  
  <section>
  <SVGWipe bind:this={wipeComponent} >
    <style>
      svg{
        pointer-events:none;
      }
    </style>
    <path class="shape-overlays__path" fill={theme}></path>
  </SVGWipe>
   </section>
   
   <div class="content">
     
   {#if selected === 'char'}
     <CharList/>
   {:else if selected === 'bg'}
     <BGList/>
   {:else if selected === 'sticker'}
     <StickerList/>
   {:else if selected === 'call'}
     <Call/>
    {:else if selected === 'settings'}
     <Settings/>
    {:else} 
   {/if}
  
    
   </div>
   
</container>
  <FTUE selected={selected} style={customVars}/>

<style>
/*   .content{
    transition:opacity .2s;
  }
  .dim .content{
    opacity:.2
  } */
  container{
    --container-x:0;
    --container-y:0;
    --container-w-d:160px;
    --container-w-m:100%;
    --container-h-d:100%;
    --container-h-m:210px;
    position:fixed;
    bottom:0;
    left:0;
    width: var(--container-w-d);
    width:calc(var(--container-w-d) + env(safe-area-inset-left, 0px));
    height:var(--container-h-d);
    z-index:4;
    touch-action:none;
    transform: translate(0,0);
/*     overflow: hidden; */
    overflow: visible;
  }
  container.hide{
    pointer-events:none;
  }
  container.hide:before{
    opacity:0;
    transition:0s;
  }
  container:before{
    --thumb-width: 80px;
    content: '';
    position: absolute;
    top: 6px;
    left: calc(50% - var(--thumb-width) * .5);
    width: var(--thumb-width);
    height: 4px;
    background: grey;
    z-index: 9;
    pointer-events: none;
    transition:opacity .4s .5s;
    border-radius: 16px;
    display:none;
  }
  :global(.subnav[data-dragging="false"]){
    transition: transform 0.35s;
  }
  :global(.subnav[data-status="transition"]){
    pointer-events:none;
  }
/*   :global(.subnav[data-status="waiting"]:before){
    opacity:0;
    transition: opacity 0s;
  } */
  
  :global(.subnav[data-status="waiting"]) {
    transition: 0s;
  }
  .hide{
    pointer-events:none;
  }
  .nav-touch{
    --touch-width:120px;
    height:64px;
    position:absolute;
    display:none;
    top:-32px;
    width: var(--touch-width);
    left: calc((100% - var(--touch-width)) * .5);
    z-index:3;
    touch-action:none;
  }
  .subnav-close{
    --button-width:64px;
    border-radius: 100%;
    width: var(--button-width);
    height: var(--button-width);
    position: absolute;
    justify-content: center;
    align-items: center;
    display: flex;
    text-align: center;
/*     line-height: 80px; */
    right: 0px;
    z-index: 2;
    transition:.2s .5s;
/*     transform:scale(.6,.6); */
    color:var(--lightRed)
  }
  .subnav-close .fill{
    color:white;
    opacity:1;
/*     text-shadow: none; */
  }
  .subnav-close:hover .fill{
    opacity:1
  }
  .hide .subnav-close{
    pointer-events:none;
    opacity:0;
    transition:.2s;
  }
  @media only screen and (min-width:600px){
    container{
    transition: width 400ms cubic-bezier(0.65, 0, 0.35, 1);
    }
  }
  @media only screen and (max-width: 600px) {
    container{
      width:var(--container-w-m);
      height:var(--container-h-m);
      transform: translate(0, var(--container-y));
        border-top-left-radius: 28px;
    border-top-right-radius: 28px;
          border-bottom-right-radius: 0;
    }

    container:before{
      display:block;
    }
    .nav-touch{
      display:block;
    }
    .subnav-close{
      display:none;
    }
    section{
        border-top-left-radius: 28px;
    border-top-right-radius: 28px;
    overflow: hidden;
    width: 100%;
    height: 100%;
    position: absolute;
      pointer-events:none;
          overflow: hidden;
    }
    .dim{
      pointer-events:none;
      
    }
    .content{
      transition:opacity .5s;
    }
    .dim .content{
      opacity:.3;
    }
    .dim:before{
      opacity:0;
/*       display:none; */
    }
    
} 
  
  
</style>