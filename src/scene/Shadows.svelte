<script context="module">
  import {writable,get} from 'svelte/store'
  import {getLocalStorage,subLocalStorage} from '../stores.js'

  export const shadowStrength = writable(.3)
  export const shadowBlur = writable(.2)
  
  getLocalStorage(shadowStrength,'shadowStrength',get(shadowStrength))
  subLocalStorage(shadowStrength,'shadowStrength')  
  
  getLocalStorage(shadowBlur,'shadowBlur',get(shadowBlur))
  subLocalStorage(shadowBlur,'shadowBlur')  
</script>
<script> 
  import * as THREE from 'three';
  export let scene;
  export let light;
  export let hide=false;
  

  const baseGeometry = new THREE.PlaneGeometry( 100, 100 );
  
  const floorMaterial = new THREE.ShadowMaterial( { opacity: 0.2 } );
  const floor = new THREE.Mesh(baseGeometry, floorMaterial);
  floor.rotation.x = - Math.PI / 2;
  floor.position.y = .01
  floor.receiveShadow = true;
  
	scene.add( floor );
  
  $: floorMaterial.opacity = $shadowStrength
  $: floor.visible = $shadowStrength > 0
  $: light.shadow.radius = $shadowBlur * 10
</script>