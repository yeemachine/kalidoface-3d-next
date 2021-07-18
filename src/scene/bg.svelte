<script context="module">
import { writable,get } from 'svelte/store';
import {urlBase,getLocalStorage,subLocalStorage,firstLoad} from '../stores.js'
import {createBlobURL} from '../utils/helpers.js'
export const bgURL = writable(null);
export let bgTexture = writable(null)


getLocalStorage(bgURL,'bgURL', {type:'img',url:"https://cdn.glitch.com/29e07830-2317-4b15-a044-135e73c7f840%2Fbackground.jpg?v=1617947011126",thumbnail:"https://cdn.glitch.com/29e07830-2317-4b15-a044-135e73c7f840%2Fbgthumbnail1.jpg?v=1624862110038",pano:true,sea:true},createBlobURL);
  
subLocalStorage(bgURL,'bgURL')  
  
export let bgList = writable([
  
    {type:'img',url:"https://cdn.glitch.com/29e07830-2317-4b15-a044-135e73c7f840%2Fbackground.jpg?v=1617947011126",thumbnail:"https://cdn.glitch.com/29e07830-2317-4b15-a044-135e73c7f840%2Fbgthumbnail1.jpg?v=1624862110038",pano:true,sea:true},
   {type:'img',url:"https://cdn.glitch.com/29e07830-2317-4b15-a044-135e73c7f840%2FPerseverance_Panorama_8k-2.jpg?v=1617946716257",thumbnail:"https://cdn.glitch.com/29e07830-2317-4b15-a044-135e73c7f840%2Fbgthumbnail2.jpg?v=1624862106759",pano:true,sea:true},
  {type:'img',url:"https://cdn.glitch.com/29e07830-2317-4b15-a044-135e73c7f840%2FMonValley_A_LookoutPoint_8k.jpg?v=1617946394321",thumbnail:"https://cdn.glitch.com/29e07830-2317-4b15-a044-135e73c7f840%2Fbgthumbnail3.jpg?v=1624867728087",pano:true,sea:true},
    {type:'color',url:'#00fc01'},
    {type:'color',url:'#0033cc'},
    {type:'color',url:'#ff00ff'},
    {type:'color',url:'#ffffff'},
    {type:'color',url:'#00fc0100'}
])
getLocalStorage(bgList,'bgList',get(bgList),createBlobURL)
subLocalStorage(bgList,'bgList')

export const updateBG = (width,height) => {
   let texture = get(bgTexture)
   if(texture && texture.image && !texture.isPano){
      // const canvasAspect = window.innerWidth / window.innerHeight;
      const canvasAspect = width / height;
      const imageAspect = texture.image.width / texture.image.height;
      const aspect = imageAspect / canvasAspect;
      texture.offset.x = aspect > 1 ? (1 - 1 / aspect) / 2 : 0;
      texture.repeat.x = aspect > 1 ? 1 / aspect : 1;

      texture.offset.y = aspect > 1 ? 0 : (1 - aspect) / 2;
      texture.repeat.y = aspect > 1 ? 1 : aspect;
     }
}
</script>
<script>
import * as THREE from 'three';
import {DIM} from "../stores.js";
import PanoBG from './PanoBG.svelte'
import SeaBG from './SeaBG.svelte'
// import GeoBG from './GeoBG.svelte'
export let scene;
export let light;
export let renderer;



const loader = new THREE.TextureLoader();
  
bgURL.subscribe(async val=>{
  if(val){
    switch (val.type){
      case 'img':  
        loader.load(val.url,(res)=>{
          res.isPano = val.pano
          bgTexture.set(res)
          scene.background = $bgTexture;
          updateBG($DIM.w,$DIM.h)
        })
        
        break;
      case 'color':
        if(val.url.length>7){
          scene.background = null;
        }else{
          scene.background = new THREE.Color(val.url);
        }
        break
      case 'iro':
        scene.background = new THREE.Color(val.url);
        break
      default:
        break
    }

  }
})
  
$:{
  updateBG($DIM.w,$DIM.h)
}
  
  

</script>

<svelte:body
	class:transparent={(firstLoad && bgURL && $bgURL.url.length>7)}></svelte:body>

<PanoBG scene={scene} texture={($bgURL && $bgURL.pano) === true ? $bgTexture : null}/>
<SeaBG scene={scene} light={light} hide={($bgURL && !$bgURL.sea)}/>

<style>
container{
  --bg-color:var(--offblack);
  position:fixed;
  top:0;left:0;
  height:100vh;
  width:100vw;
  display:flex;
  align-items:center;
  justify-content:center;
  z-index:-1;
  background:var(--bg-color);
}
  img,video{
    width:100%;
    height:100%;
    object-fit: cover;
  }
</style>