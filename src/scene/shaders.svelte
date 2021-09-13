<script context="module">
import * as THREE from 'three';
import {profiles} from './profiles.svelte'
import {get,writable} from 'svelte/store'
  
export let sunPivot = new THREE.Object3D();
export let sunlightPivot = new THREE.Object3D();

export const enableEffects = writable(false);
  
export const spinSun = (clock) => {
  if(!sunPivot){return}
  if(!get(profiles).user.model){return}
  
  let headPivot = get(profiles).user.model.pivotPoint
  sunPivot.rotation.y -= .03
  let osc = Math.sin(clock.getElapsedTime()) * .4
  sunPivot.rotation.x = osc
  
  if(headPivot.x !== sunPivot.position.x || headPivot.y !== sunPivot.position.y ){
    sunPivot.position.x = headPivot.x
    sunPivot.position.y = headPivot.y
    sunlightPivot.position.copy(sunPivot.position)
  }
  sunlightPivot.rotation.copy(sunPivot.rotation)
  
}
</script>
<script>

import {
	BlendFunction,
	EdgeDetectionMode,
	EffectPass,
	GodRaysEffect,
	KernelSize,
	SMAAEffect,
	SMAAImageLoader,
	SMAAPreset,
  RenderPass,
  EffectComposer,
  PredicationMode
} from "postprocessing";
export let scene
export let camera
export let renderer
export let composer

let effectPass=null,renderPass=null,godraysEffect=null;

const mainLight = new THREE.PointLight(0xffe3b1);
  $:mainLight.visible = $enableEffects
  mainLight.intensity = .8
  mainLight.shadow.radius = 8
  mainLight.position.set(0,2,3.25);
  mainLight.castShadow = true;
  mainLight.shadow.bias = 0.0000125;
  mainLight.shadow.mapSize.width = 2048;
  mainLight.shadow.mapSize.height = 2048;
    mainLight.shadow.camera.near = 0.5; // default
  mainLight.shadow.camera.far = 500; // default
  
// Sun

const sunMaterial = new THREE.MeshBasicMaterial({
  color: 0xffddaa,
  transparent: true,
  fog: false
});

const sunGeometry = new THREE.SphereBufferGeometry(0.05, 32, 32);
const cube = new THREE.BoxGeometry( .05, .05, .05 );
const sun = new THREE.Mesh(cube, sunMaterial);
sun.position.copy(mainLight.position)
sun.position.y -= 2
sun.position.z -= 3
sun.rotation.x = Math.PI/2
sun.updateMatrix();
sun.frustumCulled = false;
sun.matrixAutoUpdate = false;

// Using a group to check if matrix updates work correctly.
sunPivot.position.set(0 ,1.25 ,0);
// group.add(sun);
sunPivot.add(sun,mainLight)
sunlightPivot.add(mainLight)
scene.add(sunlightPivot)

function load() {

	const assets = new Map();
	const loadingManager = new THREE.LoadingManager();
	const smaaImageLoader = new SMAAImageLoader(loadingManager);

	return new Promise((resolve, reject) => {

		loadingManager.onLoad = () => resolve(assets);
		loadingManager.onError = reject;

		smaaImageLoader.load(([search, area]) => {

			assets.set("smaa-search", search);
			assets.set("smaa-area", area);

		});

	});

}
  
function initialize(assets) {

	const smaaEffect = new SMAAEffect(
		assets.get("smaa-search"),
		assets.get("smaa-area"),
    SMAAPreset.HIGH,
		EdgeDetectionMode.COLOR
	);
  
  	smaaEffect.edgeDetectionMaterial.setEdgeDetectionThreshold(0.02);
		smaaEffect.edgeDetectionMaterial.setPredicationMode(PredicationMode.DEPTH);
		smaaEffect.edgeDetectionMaterial.setPredicationThreshold(0.002);
		smaaEffect.edgeDetectionMaterial.setPredicationScale(1.0);
  
  godraysEffect = new GodRaysEffect(camera, sun, {
    height: 480,
    kernelSize: KernelSize.SMALL,
    density: 0.96,
    decay: 0.92,
    weight: 0.7,
    exposure: 0.54,
    samples: 60,
    clampMax: 1.0
  });  
  
  renderPass = new RenderPass(scene, camera);
  effectPass = new EffectPass(camera,smaaEffect,godraysEffect);
  effectPass.needsDepthTexture = false;

  effectPass.renderToScreen = true;

  composer.addPass(renderPass);
  composer.addPass(effectPass);
}
  
load().then(initialize).catch((e) => console.error(e));

$:{
  if(renderPass && effectPass && godraysEffect && camera){
    renderPass.camera = camera
    effectPass.camera = camera
    godraysEffect.camera = camera
  }
}
  
  
</script>