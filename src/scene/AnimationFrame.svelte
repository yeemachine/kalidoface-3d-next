<script>
import * as THREE from 'three';
import {updateBG,bgURL} from './bg.svelte'
import {updateSea} from './SeaBG.svelte'
import {updateVRM} from './character.svelte'
import {profiles} from './profiles.svelte'
import {camera,handleView} from './CameraControls.svelte'
import {sendTrackingData} from "../tracking/sendTrackingToPeer.svelte"
import {infoExpanded} from '../stores.js'
  
export let scene
export let renderer

const clock = new THREE.Clock();
let delta = 0;
// 30 fps
let interval = 1 / 10;

function animate() {
  requestAnimationFrame( animate );

  delta = clock.getDelta();
  // updateBG()
  
  if($infoExpanded){return}
  if($bgURL && $bgURL.sea){
    updateSea()
  }
  
  updateVRM('user',delta,clock)
  updateVRM('friend',delta,clock)

  handleView()

  renderer.render( scene, $camera );
  // composer.render();
  
  //limit fps
  // if (delta  > interval) {
  //      delta = delta % interval;
  //  }
 
}

animate();
</script>