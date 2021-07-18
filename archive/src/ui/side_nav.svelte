<script context="module">
import interact from "interactjs";
</script>
<script>
import {onMount} from 'svelte'
import SVGWipe from '../components/SVGWipe.svelte'
import {getCSSCustomProp} from '../utils/helpers.js'
import {DIM} from '../stores.js'
import {userExps} from '../scene/character.svelte'

export let selected = null;
let savedState = null

let wipeComponent;
let sidenav;
let theme = 'var(--iconbg)';
let customVars = ''
let maxY = 300
$:{
  switch(selected) {
  case 'exp':
      theme='var(--iconbg)'
      customVars="--container-w-d:90px;--container-h-m:210px;"
      maxY = 210
    break;
  default:
  }
}
  
$:{
  if(selected === "exp" && $userExps.list.length === 0){
    close()
  }
}

const interactThreshold = 100;
let x=0,y=0;
  
const openClose = () => { 
    if(wipeComponent.isOpen){
      if(!selected){
        close()
      }
    }else if(!wipeComponent.isOpen){
       open()
    }
}

export const close = () => {
  let isMobile = $DIM.w < 600;
   wipeComponent.animate({
    action:'close',
    axis:isMobile ? 'y' : 'x',
    _flip:isMobile ? false : false,
    _numPoints:3,
    _duration:isMobile ? 0 : 600,
    pattern:[0,0,0,0,0]})
  selected = null
}

export const closeMobile = () => {
    y = maxY
    sidenav.setAttribute('data-status', 'transition');
    // mark as done after CSS transition
    sidenav.addEventListener('transitionend', transitionListener);
    sidenav.style.setProperty('--container-y', y + 'px');
}

const open = () => {
  let isMobile = $DIM.w < 600;
   wipeComponent.animate({
        action:'open',
        _curve:'wave',
        axis:isMobile ? 'y' : 'x',
        _flip:isMobile ? true : true,
        _numPoints:3,
        _duration:600})
}

$:{
  if(selected && wipeComponent){
    openClose()
  }
}
  
function dragMoveListener (event) {
    event.preventDefault()
		// keep the dragged position in the custom properties
		x = (getCSSCustomProp('--container-x', sidenav, 'float') || 0) + event.dx
		y = (getCSSCustomProp('--container-y', sidenav, 'float') || 0) + event.dy
    if (x > 0) x = 0
    if (y<0) y = 0
		// update styles
    sidenav.setAttribute('data-status', '');
		sidenav.style.setProperty('--container-x', x + 'px');
		sidenav.style.setProperty('--container-y', y + 'px');    
}
  
function transitionListener (e) {
  if(e.propertyName === 'transform'){
    sidenav.setAttribute('data-status', 'waiting');
    sidenav.removeEventListener('transitionend',transitionListener)
    sidenav.style.setProperty('--container-x', '0px');
    sidenav.style.setProperty('--container-y', '0px');
    close()
  }
}

onMount(()=>{
  interact('.sidenav[data-dragging="false"] .nav-touch').on('tap',closeMobile)
  interact('.sidenav[data-dragging="false"] .nav-touch').draggable({
    onstart: () => {
				// signify dragging
			sidenav.setAttribute('data-dragging', true);
		},
    onmove: dragMoveListener,
    onend: (event) => {
      sidenav.setAttribute('data-dragging', false);
      	// calculate how far card moved
				let moved = (Math.sqrt(Math.pow(event.pageX - event.x0, 2) + Math.pow(event.pageY - event.y0, 2) | 0));
				if (moved > interactThreshold) {
	
          y = maxY
          sidenav.setAttribute('data-status', 'transition');
					// mark as done after CSS transition
					sidenav.addEventListener('transitionend', transitionListener);
				}
				else {
					// reset vars
					x = 0;
					y = 0;
				}
				// update x and y pos
				sidenav.style.setProperty('--container-x', x + 'px');
				sidenav.style.setProperty('--container-y', y + 'px');
    }
  })
})

</script>

 <container 
    bind:this={sidenav} 
    class="sidenav {!selected ? 'hide' : ''}"
    style="{customVars}"
    data-dragging="false"
    data-status="waitiing"
  >
   
  <button 
    class="sidenav-close"
    on:click={close}
  > 
    <i class="kalicon fill small">jellyfill</i>
    <i class="kalicon solid small">close</i> 
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
   {#if selected === 'exp'}
    {:else} 
   {/if}
   
</container>

<style>
  container{
    --container-x:0;
    --container-y:0;
    --container-w-d:190px;
    --container-w-m:100%;
    --container-h-d:100%;
    --container-h-m:190px;
    position:fixed;
    bottom:0;
    right:0;
    width:var(--container-w-d);
    width:calc(var(--container-w-d) + env(safe-area-inset-right, 0) / 2);
    height:var(--container-h-d);
    z-index:6;
    touch-action:none;
    transform: translate(0,0);
    overflow-y: scroll;
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
  :global(.sidenav[data-dragging="false"]){
    transition: transform 0.35s;
  }
  :global(.sidenav[data-status="transition"]){
    pointer-events:none;
  }
/*   :global(.sidenav[data-status="waiting"]:before){
    opacity:0;
    transition: opacity 0s;
  } */
  
  :global(.sidenav[data-status="waiting"]) {
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
  .sidenav-close{
    --button-width:64px;
    border-radius: 100%;
    width: var(--button-width);
    height: 64px;
    position: absolute;
    justify-content: center;
    align-items: center;
    display: flex;
    text-align: center;
    top:0;
/*     top:calc(env(safe-area-inset-top, 0)); */
    right: 0px;
    right:calc(env(safe-area-inset-right, 0) / 2);
    z-index: 2;
    transition:.2s .5s;
/*     transform:scale(.6,.6); */
    color:var(--lightRed)
  }
  .sidenav-close .fill{
    color:white;
    opacity:1;
/*     text-shadow: none; */
  }
  .sidenav-close:hover .fill{
    opacity:1
  }
  .hide .sidenav-close{
    pointer-events:none;
    opacity:0;
    transition:.2s;
  }
  @media only screen and (max-width: 600px) {
    container{
      width:var(--container-w-m);
      height:var(--container-h-m);
      transform: translate(0, var(--container-y));
    border-top-left-radius: 24px;
    border-top-right-radius: 24px;
          border-bottom-right-radius: 0;
    z-index:4;
    }

    container:before{
      display:block;
    }
    .nav-touch{
      display:block;
    }
    .sidenav-close{
      display:none;
    }
    section{
    overflow: hidden;
    width: 100%;
    height: 100%;
    position: absolute;
      pointer-events:none;
          overflow: hidden;
    }
} 
  
  
</style>