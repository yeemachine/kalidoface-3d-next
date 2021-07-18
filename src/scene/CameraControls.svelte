<script context="module">
import * as THREE from 'three';
import { writable, get } from 'svelte/store';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';
import { DeviceOrientationControls } from 'three/examples/jsm/controls/DeviceOrientationControls.js';
import { profiles } from './profiles.svelte';
import { clamp, remap, haptic } from '../utils/helpers.js';
import { toggleFirstPersonLayer } from './character.svelte';
import { animateArm, animateHead } from './charRigger.svelte';
import Vector from '../utils/vector.js';
import { firstLoad0_1 } from '../stores.js';

export const cameraConfig = writable({ firstPerson: false, freeCamera: false });
export const staticCamera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 700);
staticCamera.position.set(0.0, 1.0, 1);

export const freeCamera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000);

export const pivotPoint = new THREE.Object3D();
export const pivotRotation = writable(0);

pivotPoint.position.set(0.0, 1.35, 0);
pivotPoint.add(freeCamera);
freeCamera.position.set(0.0, 0, 1);
// freeCamera.rotation.order = 'YXZ';
pivotPoint.rotation.order = 'YXZ';
export let orbitControls;
export let pointerLockControls = null;

export let camera = writable(staticCamera);

export const toggleView = () => {
    haptic();
    cameraConfig.set({
        freeCamera: !get(cameraConfig).freeCamera,
        firstPerson: get(cameraConfig).firstPerson,
    });
};

export const toggleFirstPerson = () => {
    cameraConfig.set({
        firstPerson: !get(cameraConfig).firstPerson,
        freeCamera: get(cameraConfig).freeCamera,
    });
};

export let gyroPresent = false;
window.addEventListener('devicemotion', function(event) {
    if (event.rotationRate.alpha || event.rotationRate.beta || event.rotationRate.gamma) gyroPresent = true;
});

export const handleView = () => {
    handleOrientation(orientationControls, freeCamera, pivotPoint);
    handlePointerLock(pointerLockControls, freeCamera, pivotPoint);
    if (orbitControls && !get(cameraConfig).freeCamera) {
        orbitControls.update();
    }
};

export let orientationControls;
  
export const faceToCam = (obj, cam, type = 'user') => {
  //rotates character y axis to face a given camera or resets when not in freecam
  if(!obj || !cam){return}
  let firstPerson = get(cameraConfig).firstPerson
  let freeCamera = get(cameraConfig).freeCamera
  
  if(!freeCamera){
    obj.scene.rotation.y = 0;
    animateHead(obj, get(profiles)[type].tracking.face);
    return
  }
  
  let cameraPostion = new THREE.Vector3();
  cam.getWorldPosition(cameraPostion);
  
  let lookatRotation = Math.atan2( ( cameraPostion.x - obj.scene.position.x ), ( cameraPostion.z - obj.scene.position.z ))
  if(firstPerson && obj.isUser){
    obj.scene.rotation.y = lookatRotation + Math.PI
  }else if(firstPerson && !obj.isUser){
    obj.scene.rotation.y = 0
  }else{
    obj.scene.rotation.y = lookatRotation
  } 
  
}

export const panZoomCam = (camera) => {
  if (!get(cameraConfig).firstPerson) {
        let offsetZ = clamp(1.15 + (get(profiles).user.tracking.face.head.width - 0.3) * -1.9, 0.2, 24.5);
        let offsetX = clamp((get(profiles).user.tracking.face.head.center.x - 0.5) * 0.35, -1.5, 1.5);
        let offsetY = clamp((get(profiles).user.tracking.face.head.center.y - 0.5) * 0.35, -1.5, 1.5);
        camera.position.set(offsetX, offsetY, offsetZ);
    } else {
        camera.position.set(0, 0.03, -0.05);
    }
}
                    
const handleOrientation = (controls, camera, pivot) => {
    if (!controls) {
        return;
    }
    const currentVrm = get(profiles).user.model;
    const currentFriendVrm = get(profiles).friend.model;

    faceToCam(currentVrm,camera,'user')        
    faceToCam(currentFriendVrm,camera,'friend');
  
    if (!get(cameraConfig).freeCamera) {
        return;
    }

    controls.update();
    let newRotation = (Vector.normalizeAngle(pivot.rotation.y) + 1) / 2;
    if (newRotation !== get(pivotRotation)) {
        pivotRotation.set(newRotation);
    }

    //set bounds to up down rotation
    pivot.rotation.x = clamp(
        pivot.rotation.x * (get(cameraConfig).firstPerson ? 1 : -1),
        get(cameraConfig).firstPerson ? -Math.PI * 0.25 : -Math.PI,
        0.7,
    );
    pivot.rotation.y *= get(cameraConfig).firstPerson ? 1 : -1;

    panZoomCam(camera)
};

const handlePointerLock = (controls, camera, pivot, delta) => {
    const currentVrm = get(profiles).user.model;
    const currentFriendVrm = get(profiles).friend.model;
    if (!controls) {
        return;
    }
  
    //Rotate character to freecam or reset
    faceToCam(currentVrm,camera,'user')        
    faceToCam(currentFriendVrm,camera,'friend');
  
    if (controls.isLocked === false) {
        return;
    }
  
    let newRotation = (Vector.normalizeAngle(pivot.rotation.y) + 1) / 2;
    if (newRotation !== get(pivotRotation)) {
        pivotRotation.set(newRotation);
    }

    pivot.rotation.x = clamp(pivot.rotation.x, get(cameraConfig).firstPerson ? -Math.PI * 0.25 : -Math.PI, 0.7);

    panZoomCam(camera)
  
};

  
</script>
<script>
export let scene;
export let renderer;

const askForGyro = () => {
    if (typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function') {
        // (optional) Do something before API request prompt.
        DeviceMotionEvent.requestPermission()
            .then(response => {
                // (optional) Do something after API prompt dismissed.
                if (response == 'granted') {
                    window.addEventListener('devicemotion', e => {
                        // do something for 'e' here.
                        if (e.rotationRate.alpha || e.rotationRate.beta || e.rotationRate.gamma) gyroPresent = true;
                        initOrientationControls();
                    });
                }
            })
            .catch(console.error);
    } else {
        // alert( "DeviceMotionEvent is not defined" );
    }
};

const initOrientationControls = () => {
    if (orientationControls || !gyroPresent) {
        return;
    }
    orientationControls = new DeviceOrientationControls(pivotPoint);
    // orientationControls.addEventListener( 'change', function () {
    //   alert('orientation')
    //   handleOrientation(orientationControls,freeCamera,pivotPoint)
    // } );
    toggleFirstPersonLayer($profiles.user.model);
};

const initPointerLockControls = () => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        return;
    }
    if (orientationControls || pointerLockControls) {
        //don't initialize pointerlockcontrols if already have orientation controls
        return;
    }
    pointerLockControls = new PointerLockControls(pivotPoint, renderer.domElement);
    pointerLockControls.addEventListener('lock', function() {
        toggleFirstPersonLayer($profiles.user.model);
    });
    pointerLockControls.addEventListener('unlock', function() {
        cameraConfig.set({
            firstPerson: $cameraConfig.firstPerson,
            freeCamera: false,
        });
    });
};

// camera controls
orbitControls = new OrbitControls(staticCamera, renderer.domElement);
orbitControls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
orbitControls.dampingFactor = 0.2;
orbitControls.screenSpacePanning = true;
orbitControls.maxPolarAngle = Math.PI * 0.52;
orbitControls.maxDistance = 10;
orbitControls.minDistance = 0.25;
orbitControls.target.set(0.0, 1.0, 0.0);
orbitControls.update();

scene.add(pivotPoint);

$: {
    if ($cameraConfig.freeCamera) {
        if (!gyroPresent) {
            askForGyro();
        }
        initOrientationControls();
        initPointerLockControls();

        if (pointerLockControls) {
            pointerLockControls.lock();
        }
        // if($cameraConfig.firstPerson && orientationControls){
        //   toggleFirstPersonLayer($profiles.user.model);
        // }
        if (orientationControls) {
            toggleFirstPersonLayer($profiles.user.model);
        }
        if (orbitControls) {
            // orbitControls.enabled = false
        }
    } else {
        if (pointerLockControls) {
            pointerLockControls.unlock();
        }
        if (orbitControls) {
            // orbitControls.enabled = true
        }
        toggleFirstPersonLayer($profiles.user.model);
    }
}

$: camera.set($cameraConfig.freeCamera ? freeCamera : staticCamera);

$: staticCamera.position.z = 1 + 2.5 * (1 - $firstLoad0_1);

</script>