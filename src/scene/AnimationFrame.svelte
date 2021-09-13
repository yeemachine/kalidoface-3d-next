<script>
import * as THREE from 'three';
import {updateBG,bgURL} from './bg.svelte'
import {updateSea} from './SeaBG.svelte'
import {updateVRM} from './character.svelte'
import {profiles} from './profiles.svelte'
import {camera,handleView} from './CameraControls.svelte'
import {sendTrackingData} from "../tracking/sendTrackingToPeer.svelte"
import {infoExpanded} from '../stores.js'
import {enableEffects,spinSun} from './shaders.svelte'


export let scene
export let renderer
export let composer

const clock = new THREE.Clock();
let delta = 0;
// 30 fps
let interval = 1 / 30;

function animate() {
  requestAnimationFrame( animate );

  delta = clock.getDelta();
  // updateBG()
  
  if($infoExpanded){return}

  
  updateVRM('user',delta,clock)
  updateVRM('friend',delta,clock)

  handleView()

  
  if(composer && $enableEffects){
    composer.render(delta);
    spinSun(clock)
  }else{
    renderer.render( scene, $camera );
  }
  
  if($bgURL && $bgURL.sea){
      updateSea()
  }
 
}

animate();
</script>