<script>
import {onMount} from 'svelte';
import { spring } from 'svelte/motion';
import * as THREE from 'three';
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';
import * as tf from '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';
import '@mediapipe/pose/pose';

import faceMap from '../utils/faceMap/faceMap.js'
import Vector from '../utils/vector.js'
import {clamp} from '../utils/helpers.js'

import {p2pConnection} from '../connections/Peer.svelte';
import {DIM} from '../stores.js';
import {cameraOn,hideCamera,videoReady,videoEl} from './webcam.svelte';
import {profiles} from '../scene/character.svelte'
import {pipEnabled} from '../scene/pip.svelte';

let mlModel;
  
  
  var obj = new THREE.Object3D(); // a parent object to facilitate rotation/scaling

  // we make each bone a cylindrical shape, but you can use your own models here too
  var geometry = new THREE.CylinderGeometry( 10, 5, 1);

  var material = new THREE.MeshNormalMaterial();
  // another possible material (after adding a light source):
  // var material = new THREE.MeshPhongMaterial({color:0x00ffff});

  var mesh = new THREE.Mesh( geometry, material );
  mesh.rotation.x = Math.PI/2;

  obj.add( mesh );
  
  
  // transform webcam coordinates to threejs 3d coordinates
function webcam2space(x,y,z){
  return new THREE.Vector3(
     (x-$videoEl.videoWidth /2),
    -(y-$videoEl.videoHeight/2), // in threejs, +y is up
    - z
  )
}
  
  // Set starting and ending vectors
const findRotation = (a,b) => {
//   var myVector = new THREE.Vector3(a.x, a.y, a.z);
//   var targetVector = new THREE.Vector3(b.x, b.y, b.z);

//   // Normalize vectors to make sure they have a length of 1
//   myVector.normalize();
//   targetVector.normalize();

//   // Create a quaternion, and apply starting, then ending vectors
//   var quaternion = new THREE.Quaternion();
//   quaternion.setFromUnitVectors(myVector, targetVector);

//   // Quaternion now has rotation data within it. 
//   // We'll need to get it out with a THREE.Euler()
//   // console.log(quaternion)
//   var euler = new THREE.Euler();
//   euler.setFromQuaternion(quaternion);
  
//   return {x:euler.x,y:euler.y,z:euler.z}

    var p0 = webcam2space(a.x, a.y, a.z);  // one end of the bone
    var p1 = webcam2space(b.x, b.y, b.z);  // the other end of the bone

    // compute the center of the bone (midpoint)
    var mid = p0.clone().lerp(p1,0.5);
    obj.position.set(mid.x,mid.y,mid.z);

    // compute the length of the bone
    obj.scale.z = p0.distanceTo(p1);

    // compute orientation of the bone
    obj.lookAt(p1);
    
    return {x:obj.rotation.x/Math.PI,y:obj.rotation.y/Math.PI,z:obj.rotation.z/Math.PI}
}
  
let user_smooth = spring({
  eye:{l:1,r:1},
  mouth:{x:0,y:0},
  head:{x:0,y:0,z:0},
  brow:0,
  pupil:{x:0,y:0}
  }, {
  stiffness: 0.15,
  damping: 0.7
});

  
user_smooth.subscribe(val=>{
  $profiles.user.tracking.head = val.head
  if(val.head.x >= -29 && val.head.x <= 29 && val.head.y >= -29 && val.head.y <= 29){
    $profiles.user.tracking.brow = val.brow
    $profiles.user.tracking.pupil = val.pupil  
    $profiles.user.tracking.eye = faceMap.stabilizeBlink(val.eye,$profiles.user.tracking.head.x)
    $profiles.user.tracking.mouth = val.mouth
  }
})
  
  
let user_smooth_pose = spring({
    upperArmRight:{x:0,y:0,z:.4},
    upperArmLeft:{x:0,y:-.25,z:.4}, //y: 0 > -.5 // z: -.5>.5
    lowerArmRight:{x:0,y:0,z:.4},
    lowerArmLeft:{x:-.85,y:0,z:-.9} //x: 0 > -4, z: 0 to -.9
}, {
  stiffness: 0.15,
  damping: 0.7
});
  
user_smooth_pose.subscribe(val=>{
  $profiles.user.tracking.pose.upperArmRight = val.upperArmRight
  $profiles.user.tracking.pose.upperArmLeft = val.upperArmLeft
  $profiles.user.tracking.pose.lowerArmRight = val.lowerArmRight
  $profiles.user.tracking.pose.lowerArmLeft = val.lowerArmLeft

})
  
function onResults(results) {
    const pose = results.poseLandmarks
   
    if(pose){
      // console.log(pose[12],pose[11],pose[13]);
      // console.log(pose[15].z);

      let upperArm = {
        r:Vector.findRotation(
          new Vector(pose[11].x,pose[11].y,pose[11].z),
          new Vector(pose[13].x,pose[13].y,pose[13].z)),
        l:Vector.findRotation(
          new Vector(pose[12].x,pose[12].y,pose[12].z),
          new Vector(pose[14].x,pose[14].y,pose[14].z)
      )
      }
      upperArm.r.y = Vector.angleBetween3DCoords(pose[12],pose[11],pose[13]);
      upperArm.l.y = Vector.angleBetween3DCoords(pose[11],pose[12],pose[14]);
      // upperArm.l.x += .25
      // let upperArm = {
      //   r:findRotation(pose[11],pose[13]),
      //   l:findRotation(pose[12],pose[14])
      // }
      // let lowerArm = {
      //   r:{x:0,y:0,z:(1-Vector.find2DAngle(pose[11],pose[13],pose[15])/Math.PI)*-1},
      //   l:{x:0,y:0,z:(1-Vector.find2DAngle(pose[12],pose[14],pose[16])/Math.PI)*-1}
      // }
       let lowerArm = {
        r:findRotation(pose[13],pose[15]),
        l:findRotation(pose[14],pose[16])
      }
      // let lowerArm = {
      //   r:{x:0,y:0,z:(Vector.angleBetween3DCoords(pose[11],pose[13],pose[15])/Math.PI)*-1},
      //   l:{x:0,y:0,z:(Vector.angleBetween3DCoords(pose[12],pose[14],pose[16])/Math.PI)*-1}
      // }
      
      
      // lowerArm.r.x = clamp(lowerArm.r.x,-.8,0)
      // lowerArm.l.x = clamp(lowerArm.l.x,-.8,0)
      
      // lowerArm.r.z = clamp(lowerArm.r.z,-.8,0)
      // lowerArm.l.z = clamp(lowerArm.l.z,-.8,0)

            
      
      user_smooth_pose.set({
        upperArmRight:upperArm.r,
        upperArmLeft:upperArm.l,
        lowerArmRight:lowerArm.r,
        lowerArmLeft:lowerArm.l
      })

    }
 
}
  
  const holistic = new Pose({locateFile: (file) => {
  return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
}});
holistic.setOptions({
  upperBodyOnly: false,
  smoothLandmarks: true,
  minDetectionConfidence: 0.75,
  minTrackingConfidence: 0.75
});
holistic.onResults(onResults);
console.log(holistic)

async function predict(){

      if(!$videoReady || !$cameraOn){
          $profiles.user.detected = false;
          // facePoints.clear()
          return
      }else{
          $profiles.user.detected = true;
         await holistic.send({image: $videoEl});
          requestAnimationFrame(predict);
      }  
}
  
$:{
  if($videoReady && $cameraOn){
    predict();
  }
}


  
</script>

{#each ['Right','Left'] as side}
  <ul id={side} class="stats">
    <li>
      <label>Upper Arm</label>
      <p>x:{$profiles.user.tracking.pose['upperArm'+side].x.toFixed(2)}</p>
      <p>y:{$profiles.user.tracking.pose['upperArm'+side].y.toFixed(2)}</p>
      <p>z:{$profiles.user.tracking.pose['upperArm'+side].z.toFixed(2)}</p>
    </li>
    <li>
      <label>Lower Arm</label>
      <p>x:{$profiles.user.tracking.pose['lowerArm'+side].x.toFixed(2)}</p>
      <p>y:{$profiles.user.tracking.pose['lowerArm'+side].y.toFixed(2)}</p>
      <p>z:{$profiles.user.tracking.pose['lowerArm'+side].z.toFixed(2)}</p>
    </li>
  </ul>
{/each}

<style>
  .stats{
     position:fixed;
    top:10px;
    color:white;
    z-index:999;
      width:200px;
    list-style:none;
    margin: 0;
    padding: 0;
  }
  label{
    font-size:12px;
    margin:0;
  }
  p{
    font-size:24px;
    margin:0;
    margin-left:8px;
  }
  #Left{
    right:10px;
  }
  #Right{
    left:10px;
  }
</style>