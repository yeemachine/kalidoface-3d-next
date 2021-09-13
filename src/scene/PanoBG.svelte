<script>
import * as THREE from 'three';
import {urlBase,getLocalStorage,subLocalStorage} from '../stores.js'

export let scene;
export let texture=null;

const geometry = new THREE.SphereGeometry( 80, 640, 640 );

// invert the geometry on the x-axis so that all of the faces point inward
geometry.scale( - 1, 1, 1 );
  
const loader = new THREE.TextureLoader();

const material = new THREE.MeshBasicMaterial();
material.fog = false;

const panoBG = new THREE.Mesh( geometry, material );
panoBG.rotation.y = - Math.PI * 1.00
$:{
  if(texture){
   panoBG.visible = true
  if(panoBG.material.map){
    panoBG.material.map.dispose()
  }
   
   panoBG.material.map = texture;
   panoBG.material.needsUpdate = true;
 }else{
   panoBG.visible = false
 }
}

scene.add( panoBG );
  
</script>