<script context="module">
</script>
<script>
  import * as THREE from 'three';
  // import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
  // import Effects, {fxaaPass} from './effects.svelte'
  import { onMount } from "svelte";
  import { clamp, getDistance } from "../utils/helpers.js";
  import { DIM,subNavExpanded,hasPIP } from "../stores.js";
  import CameraControls, {staticCamera,freeCamera,cameraConfig} from './CameraControls.svelte'
  import Character from './character.svelte'
  import PoseGuide from './poseGuide.svelte'
  import Stickers from './stickers.svelte'
  import PIP from './pip.svelte'

  import BG from './bg.svelte'
  
  import AnimationFrame from './AnimationFrame.svelte'

  let canvasContainer = undefined
  
 	const renderer = new THREE.WebGLRenderer({ antialias: true,alpha:true });
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setPixelRatio( Math.max(2,window.devicePixelRatio) );
    
  // scene
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog( 0x000000, 1, 2000 );

  // light
  const light = new THREE.DirectionalLight( 0xffffff );
  
  const ambientLight = new THREE.AmbientLight(0xdc8874, .5);
  scene.add(ambientLight);
  light.position.set( 1.0, 1.0, 1.0 ).normalize();
  scene.add( light );
  
  const group = new THREE.Group();
  scene.add(group)

  onMount(async()=>{
    canvasContainer.appendChild( renderer.domElement );
  })

  
DIM.subscribe(val=>{
  if(val.w > 0 && renderer){
    onWindowResize(val.w,val.h,val.s)
  }
})
  
  
function onWindowResize(width,height,scale) {
  let pixelRatio = renderer.getPixelRatio();

  let aspect = width / height
  staticCamera.aspect = aspect;
  staticCamera.updateProjectionMatrix();
  freeCamera.aspect = aspect;
  freeCamera.updateProjectionMatrix();

  // if(fxaaPass){
  //   fxaaPass.material.uniforms[ 'resolution' ].value.x = 1 / ( width  * pixelRatio );
  // fxaaPass.material.uniforms[ 'resolution' ].value.y = 1 / ( height * pixelRatio );
  // }
 
  renderer.setSize( width, height );
  // renderer.setPixelRatio( scale );
  // composer.setSize( width, height );

}
    
</script>

<container class="scene">
  <container 
             bind:this={canvasContainer} 
             class="canvasContainer {$subNavExpanded === 'sticker' ? 'disabled' : ''}" >
  </container>
  <Stickers/>
</container>

<Character scene={scene} group={group} renderer={renderer}/>
<PoseGuide scene={scene} group={group} renderer={renderer}/>

<BG renderer={renderer} scene={scene} light={light}/>
<CameraControls scene={scene} renderer={renderer}/>
<AnimationFrame scene={scene} renderer={renderer}/>

{#if hasPIP}
  <PIP canvas={renderer.domElement}/>
{/if}

<style>
  .canvasContainer,.scene{
    z-index:1;
  }
  .scene{
    display: flex;
    justify-content: center;
    align-items:center;
  }
 
  .hover{
    cursor:grab
  }
  .hover:active{
    cursor:grabbing
  }
  :global(canvas){
    width: 100%;
    height: 100%;
    display:block;
  }
  :global(canvas:hover){
    cursor:grab;
  }
   :global(canvas:active){
    cursor:grabbing;
  }
  

  
  @media only screen and (max-width: 600px) {
    .canvasContainer.disabled{
      pointer-events:none;
    }
  }
</style>