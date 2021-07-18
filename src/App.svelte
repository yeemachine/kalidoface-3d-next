<script>
  import {onMount} from 'svelte'
  import {clamp} from './utils/helpers.js'
  import Canvas from './scene/canvas.svelte'
  import Webcam from './tracking/webcam.svelte'
  import FaceLandmarks from './tracking/Holistic.svelte'
  import Analytics from './data/analytics.svelte'
  // import FaceLandmarks from './tracking/FaceLandmarks.svelte'

  import QuickNav from './ui/quick_nav.svelte'
  import Peer from './connections/Peer.svelte'
  import Cover from './ui/cover.svelte'
  import Notif from './ui/notif.svelte'
  import {DIM,firstLoad,breakpoint} from './stores.js'
  
  let appContainer, appWidth=0, appHeight=0;
  
  const updateDim = e => {
    appWidth = appContainer.clientWidth;
    appHeight = appContainer.clientHeight;
  }
  
  const updateScale = () => {
    //max resolution of 1280
    let maxWidth = 1280
    // let scale = clamp(maxWidth/appWidth,1,2.5)
    let scale = Math.min(maxWidth/appWidth,1)
    // let scale = 1;
    DIM.set({
      w:appWidth,
      h:appHeight,
      s:scale,
      cw:appWidth*scale,
      ch:appHeight*scale
    })
    // console.log(scale)
    breakpoint.set(appWidth>600?'desktop':'mobile')
  }
  
  $:{
    if(appWidth && appHeight){
      updateScale()
    }
  }
  
  firstLoad.subscribe(e=>{
    if(e){
      const logo = document.querySelector('h1')
      logo.classList.add('fade')
      logo.addEventListener('transitionend', ()=>{logo.classList.add('pause')});
    }
  })
  
  onMount(()=>{
    updateDim()
    updateScale()
  })
  
</script>

<svelte:window 
on:orientationchange={updateDim}
on:resize={updateDim}
/> 
<Cover/>
<Notif/>
<QuickNav/>
<main
  class="no_highlights"
  bind:this = {appContainer}
  bind:clientWidth = {appWidth} 
  bind:clientHeight = {appHeight} 
>
<Canvas/>
  <FaceLandmarks/>
  <Webcam/>
  <Peer/>
  <Analytics/>
</main>

<style>

  main {
    position: fixed;
    margin: 0;
    padding:0;
    top: 0;
left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;    
    display:flex;
    justify-content:center;
    align-items:center;
  }
  
 
@media only screen and (max-width: 600px) {

  }
  

  

</style>
