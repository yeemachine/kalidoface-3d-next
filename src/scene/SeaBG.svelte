<script context="module">
import {writable,get} from 'svelte/store'
import * as THREE from 'three';
import { Water } from 'three/examples/jsm/objects/Water.js';
import { Sky } from 'three/examples/jsm/objects/Sky.js';
import {getLocalStorage,subLocalStorage} from '../stores.js'

export const animateWater = writable(false);
getLocalStorage(animateWater,'animateWater',get(animateWater))
subLocalStorage(animateWater,'animateWater')  

export var sea;
export let updateSea = () => {
  if (!sea || !get(animateWater)) return;
  sea.material.uniforms[ 'time' ].value += .5 / 60.0;
}
  
</script>
<script>  
  import {lightRotY,lightRotX} from './canvas.svelte'
  export let scene;
  export let light;
  export let hide=false;
  

  const baseGeometry = new THREE.PlaneGeometry( 100, 100 );
  const loader = new THREE.TextureLoader()
  loader.crossOrigin = "anonymous";

  sea = new Water(
    baseGeometry,
    {
      textureWidth: 512,
      textureHeight: 512,
      waterNormals: loader.load( 'https://cdn.glitch.com/29e07830-2317-4b15-a044-135e73c7f840%2F95d0cfb2406ee5a65491bbaba429713684b5b089.jpeg?v=1622566026664', function ( texture ) {

        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

      } ),
      sunDirection: new THREE.Vector3(),
      sunColor: 0xffffff,
      waterColor: 0x001e0f,
      distortionScale: 3.7,
      fog: scene.fog !== undefined
    }
  );
  
  sea.rotation.x = - Math.PI / 2;
  sea.position.y = .01

  
  $: sea.visible = !hide
  
  const waterUniforms = sea.material.uniforms;
  waterUniforms.distortionScale.value = 1.2
  waterUniforms.size.value = 10
  waterUniforms.time.value = 40.5
  waterUniforms.waterColor.value.r = 66/255
  waterUniforms.waterColor.value.g = 135/255
  waterUniforms.waterColor.value.b = 245/255
  
  
  $:{
    if($lightRotY || $lightRotX){
      const worldPos = new THREE.Vector3();
      light.getWorldPosition(worldPos)
      worldPos.y -= 1;
    waterUniforms.sunDirection.value.copy(worldPos)
    }
  }
  
	scene.add( sea );
</script>