<script context="module">
  import {writable,get} from 'svelte/store'
  import {getLocalStorage,subLocalStorage} from '../stores.js'

  export const lightIntensity = writable(1)
  export const lightColor = writable('#ffffff')
  export const lightRotY = writable(.64)
  export const lightRotX = writable(0.75)
  
  getLocalStorage(lightIntensity,'lightIntensity',get(lightIntensity))
  subLocalStorage(lightIntensity,'lightIntensity')  
  
  getLocalStorage(lightColor,'lightColor',get(lightColor))
  subLocalStorage(lightColor,'lightColor')  
  
  getLocalStorage(lightRotY,'lightRotY',get(lightRotY))
  subLocalStorage(lightRotY,'lightRotY')  
  
  getLocalStorage(lightRotX,'lightRotX',get(lightRotX))
  subLocalStorage(lightRotX,'lightRotX')  
</script>
<script>
  import * as THREE from 'three';
  import { EffectComposer} from "postprocessing";
  // import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
  // import Effects, {fxaaPass} from './effects.svelte'
  import { onMount } from "svelte";
  import { clamp, getDistance } from "../utils/helpers.js";
  import { DIM,subNavExpanded,hasPIP } from "../stores.js";
  import CameraControls, {camera,staticCamera,freeCamera,cameraConfig} from './CameraControls.svelte'
  import Character from './character.svelte'
  import Shaders,{enableEffects} from './shaders.svelte'
  // import PoseGuide from './poseGuide.svelte'
  import Stickers from './stickers.svelte'
  import PIP from './pip.svelte'

  import BG from './bg.svelte'
  
  import AnimationFrame from './AnimationFrame.svelte'

  let canvasContainer = undefined
    
  const renderer = new THREE.WebGLRenderer({
    powerPreference: "high-performance",
    antialias: $enableEffects ? true : true,
    stencil: $enableEffects ? true : true,
    alpha:true,
    depth: $enableEffects ? true : true
  });
  
  // $:renderer.antialias = !$enableEffects
  // $:renderer.stencil = !$enableEffects
  // $:renderer.depth = !$enableEffects
  
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setPixelRatio( Math.max(2,window.devicePixelRatio) );
  renderer.shadowMap.enabled = true;
  
  let composer = null;
  $:composer = $enableEffects && !composer ? new EffectComposer(renderer) : composer;
    
  // scene
  const scene = new THREE.Scene();
  // scene.fog = new THREE.Fog( 0x98F3FD, 1, 100 );

  // light
  const lightPivot = new THREE.Object3D();
  lightPivot.position.set( 0, 1, 0 )
    scene.add(lightPivot)
  
  const light = new THREE.DirectionalLight( new THREE.Color($lightColor) );
    lightPivot.add(light)

  light.position.set( 0, 0, 1 )
  light.castShadow = true
  light.shadow.radius = 2;
  light.shadow.bias = 0.0000125;
  light.shadow.mapSize.width = 2048;
  light.shadow.mapSize.height = 2048;
 
  $: light.color = new THREE.Color($lightColor)
  $: light.intensity = $lightIntensity
  $: light.visible = !$enableEffects;
  $: lightPivot.rotation.y = Math.PI * 2 * $lightRotY
  $: lightPivot.rotation.x = Math.PI * $lightRotX
  
  
  const ambientLight = new THREE.AmbientLight(0xdc8874, .5);
  scene.add(ambientLight);
  
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


 
  
  if(composer){
    composer.setSize( width , height );
  }else{
    renderer.setSize( width, height );
  }
  // renderer.setPixelRatio( scale ); // makes things blurry

}
    
</script>

<container class="scene">
  <container 
             bind:this={canvasContainer} 
             class="canvasContainer {$subNavExpanded === 'sticker' ? 'disabled' : ''}" >
  </container>
  <Stickers/>
</container>
{#if composer}
<Shaders scene={scene} camera={$camera} renderer={renderer} composer={composer}/>
{/if}
<Character scene={scene} group={group} renderer={renderer}/>
<!-- <PoseGuide scene={scene} group={group} renderer={renderer}/>
 -->
<BG renderer={renderer} scene={scene} light={light}/>
<CameraControls scene={scene} renderer={renderer}/>
<AnimationFrame scene={scene} renderer={renderer} composer={composer}/>

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