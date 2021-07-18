<script context="module">
import * as THREE from 'three';
import { Water } from 'three/examples/jsm/objects/Water.js';
import { Sky } from 'three/examples/jsm/objects/Sky.js';

  
export var sea;
export let updateSea = () => {
  if (!sea) return;
  sea.material.uniforms[ 'time' ].value += .5 / 60.0;
}
  
</script>
<script>  
  export let scene;
  export let light;
  export let hide=false;
  

  const waterGeometry = new THREE.PlaneGeometry( 100, 100 );
  const loader = new THREE.TextureLoader()
  loader.crossOrigin = "anonymous";

  sea = new Water(
    waterGeometry,
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
  waterUniforms.distortionScale.value = 1.7
  waterUniforms.size.value = 3
  waterUniforms.waterColor.value.r = 66/255
  waterUniforms.waterColor.value.g = 135/255
  waterUniforms.waterColor.value.b = 245/255
  waterUniforms.sunDirection.value.copy(light.position)
  
	scene.add( sea );
</script>