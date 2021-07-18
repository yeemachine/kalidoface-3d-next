<script context="module">
	import interact from "interactjs";
</script>
<script>
	import { onMount } from 'svelte';
  import { fade,scale} from 'svelte/transition';
  import { cubicInOut } from "svelte/easing"; 
  
  import {getCSSCustomProp} from '../utils/helpers.js'
  import {DIM,setLang} from '../stores.js'
  import {cardEndText} from '../text/translations.js'
  let container;
  let currentCard = 0;
  let cards;
	const interactThreshold = 100;
	const interactMaxRotation = 15;
	let rotation = 0;
	let x = 0;
	let y = 0;
  
  const resetStack=()=>{
    cards[0].setAttribute('data-loop', 'peak');
    cards[0].setAttribute('data-status', 'current');
    currentCard=0
  }
  
	function dragMoveListener (event) {
    // console.log(x,y)
		var target = event.target
		// keep the dragged position in the custom properties
		x = (getCSSCustomProp('--card-x', target, 'float') || 0) + event.dx
		y = (getCSSCustomProp('--card-y', target, 'float') || 0) + event.dy
		// add rotation based on card position
		rotation = interactMaxRotation * (x / interactThreshold);
		if (rotation > interactMaxRotation) rotation = interactMaxRotation;
		else if (rotation < -interactMaxRotation) rotation = -interactMaxRotation;
		// update styles
		target.style.setProperty('--card-x', x + 'px');
		target.style.setProperty('--card-y', y + 'px');
		target.style.setProperty('--card-r', rotation + 'deg');
    
	}
  
  function transitionListener (event) {
    event.target.style.setProperty('--card-r', '');
    event.target.style.setProperty('--card-x', '');
    event.target.style.setProperty('--card-y', '');
    event.target.setAttribute('data-status', 'waiting');
    event.target.removeEventListener('transitionend',transitionListener)
  }
    
	onMount(() => {
    cards = document.querySelectorAll('.card')
	  // get viewport width
	  interact('.card[data-status="current"]').unset()
		// interact.js
		interact('.card[data-status="current"]').styleCursor(false).draggable({
			onstart: () => {
				// signify dragging
				event.target.setAttribute('data-dragging', true);
			},
			// call this function on every dragmove event
			onmove: dragMoveListener,
			// call this function on every dragend event
			onend: (event) => {
        const vw = document.documentElement.clientWidth;
        // create an off canvas x coordinate
        const offX = vw<500 ? 500 : vw;
        
        cards = event.target.parentNode.querySelectorAll('.card')
        const index = [...cards].indexOf(event.target)
        
				// signify dragging stopped
				event.target.setAttribute('data-dragging', false);
				// calculate how far card moved
				let moved = (Math.sqrt(Math.pow(event.pageX - event.x0, 2) + Math.pow(event.pageY - event.y0, 2) | 0));
				if (moved > interactThreshold) {
					// remove card
					event.target.setAttribute('data-status', "transition");
					if (x > 0) {
						x = offX;
					} else {
						x = (offX * -1);
					}
					// mark as done after CSS transition
					event.target.addEventListener('transitionend', transitionListener);
					
					// activate next card
          if(index < cards.length-1){
					  cards[index+1].setAttribute('data-status', 'current');
            currentCard=index+1
          }else{
            currentCard=index+1
            // cards[0].setAttribute('data-status', 'current');
            // currentCard=0
          }
          
          if(index === cards.length-1){
            cards[0].setAttribute('data-loop', 'load');
          }else{
            cards[0].setAttribute('data-loop', '');
          }
          
				}
				else {
					// reset vars
					x = 0;
					y = 0;
					rotation = 0;
					// update rotation
					event.target.style.setProperty('--card-r', rotation + 'deg');
				}
				// update x and y pos
				event.target.style.setProperty('--card-x', x + 'px');
				event.target.style.setProperty('--card-y', y + 'px');
			}
		});
    
  });
</script>

<main class="container {cards && currentCard === cards.length ? 'done' : ''}"  style="--maxWidth:{Math.max($DIM.w, $DIM.h)}px;--progress:{cards? currentCard/cards.length : 0}" bind:this={container}>
	<container>

    <slot></slot>
        <button class="no_highlights"
          on:click={resetStack}
          on:touchend={resetStack}
  > <span class="kalicon notranslate">refresh</span> {cardEndText.refresh[$setLang]}</button>
    
    {#if cards && (cards.length-currentCard-1) > 0}
    <div 
         class="counter"
         in:scale="{{ delay: 400, duration: 300, easing: cubicInOut }}"
          out:scale="{{ duration: 300, easing: cubicInOut}}"
    >{cards? cards.length-currentCard-1 : '0'}</div>
    {/if}
  </container>
</main>

<style>
  .counter{
    --card-w:clamp(0px,85vw,480px);
    --card-h:clamp(0px,85vh,calc(var(--card-w)*1.5));
      position: absolute;
    background: var(--lapizBlue);
    width: 48px;
    height: 48px;
    text-align: center;
    font-size:24px;
    font-weight:400;
    color: white;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    top: calc((100vh - var(--card-h)) / 2 - 8px);
    right: calc((100vw - var(--card-w)) / 2 - 14px);
  }
.container {
    width: 100vw;
    height: 100vh;
    position: relative;
    background-position: 50%;
  display:flex;
  align-items:center;
  justify-content:center;
  pointer-events:none;
  z-index:0;
}

  div{
    width: 100px;
    height: 100px;
    background: red;
    pointer-events:all;
  }
  button{
    margin-top:40px;
    font-size: 18px;
    pointer-events:all;
    color:white;
    display:flex;
    justify-content:center;
    align-items:center;
    width: 100%;
  }
  button span{
        font-size: 42px;
    margin-top: -4px;
    line-height: .2;
        margin-left: -10px;
  }
 
  button:hover{
    color:var(--lightBlue)
  }
  @media only screen and (max-width: 600px) {
    .counter{
    width: 40px;
    height: 40px;
    font-size:22px;
    }
  }
</style>