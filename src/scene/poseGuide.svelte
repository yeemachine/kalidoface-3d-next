<script context="module">
import * as THREE from 'three';
import { VRMSchema } from '@pixiv/three-vrm';
import {poseLandmarks} from '../tracking/onHolisticResults.svelte' 
import { writable,get } from 'svelte/store';
// transform webcam coordinates to threejs 3d coordinates
export const webcam2space = (x,y,z,videoWidth=0,videoHeight=0) => {
  let offset = 3.2
  //inverse
  x = 1-x
  // z=1-z
  let scaleDown = .5
   return new THREE.Vector3(
     (x-.5)*scaleDown,
    (-y+offset)*scaleDown, // in threejs, +y is up
    (-z)*scaleDown
  )
}

export const getLandmarkProperty = (i) => {
  var palms = [0,1,2,5,9,13,17] //landmark indices that represent the palm

  var idx = palms.indexOf(i);
  var isPalm = idx != -1;
  var next; // who to connect with?
  if (!isPalm){ // connect with previous finger landmark if it's a finger landmark
    next = i-1;
  }else{ // connect with next palm landmark if it's a palm landmark
    next = palms[(idx+1)%palms.length];
  }
  return {isPalm,next};
}

export let poseMeshes = []; // array of threejs objects that makes up the hand rendering
export let posePoints = []
</script>
<script>
import {cameraOn,hideCamera,videoReady,videoEl} from '../tracking/webcam.svelte';
import {profiles} from './profiles.svelte'
export let scene;
  
const boneSchema = {
    RightUpperArm:[11,13],
    LeftUpperArm:[12,14],
    RightLowerArm:[13,15],
    LeftLowerArm:[14,16],
    LeftUpperLeg:[24,26],
    RightUpperLeg:[23,25],
    RightLowerLeg:[25,27],
    LeftLowerLeg:[26,28],
    Shoulders:[12,11],
    Hips:[24,23],
    RightHand:[15,17,19],
    LeftHand:[16,18,20],
}



for (var i = 0; i < 33; i++){ // 33 keypoints

  var obj = new THREE.Object3D(); // a parent object to facilitate rotation/scaling

  var geometry = new THREE.SphereGeometry(.01, 32, 32);

  var material = new THREE.MeshNormalMaterial();

  var mesh = new THREE.Mesh( geometry, material );
  mesh.castShadow = true;
  mesh.rotation.x = Math.PI/2;

  obj.add( mesh );
  obj.position.set(.2,-2,-.5)
  scene.add(obj);
  posePoints.push(obj);
}

for (var i = 0; i < Object.keys(boneSchema).length; i++){ // 10 segments

  var obj = new THREE.Object3D(); // a parent object to facilitate rotation/scaling

  // we make each bone a cylindrical shape, but you can use your own models here too
  var geometry = new THREE.CylinderGeometry( .00125, .0025, 1);
  var material = new THREE.MeshNormalMaterial();
  var mesh = new THREE.Mesh( geometry, material );
  mesh.rotation.x = Math.PI/2;

  obj.add( mesh );
  obj.position.set(.2,-2,-.5)
  scene.add(obj);
  poseMeshes.push(obj);
}
  
function updateMeshes(p0,p1,i){
    // compute the center of the bone (midpoint)
    var mid = p0.clone().lerp(p1,0.5);
    poseMeshes[i].position.set(mid.x,mid.y,mid.z);

    // compute the length of the bone
    poseMeshes[i].scale.z = p0.distanceTo(p1);

    // compute orientation of the bone
    poseMeshes[i].lookAt(p1); 
    // console.log(handMeshes[3].rotation)
    if($profiles.user.model){
      // let currentVrm = $profiles.user.model
      // const UpperArm = currentVrm.humanoid.getBoneNode( VRMSchema.HumanoidBoneName['LeftUpperArm'] )
      // UpperArm.lookAt(posePoints[14].position)
      // var scratchMat = new THREE.Matrix4();
      // UpperArm.matrix.copy(armBone.matrixWorld);
      // UpperArm.applyMatrix(scratchMat.getInverse(UpperArm.parent.matrixWorld));     
      
      // UpperArm.rotation.x = armBone.rotation.y
      // UpperArm.rotation.y = armBone.rotation.x
      // console.log(UpperArm.getWorldQuaternion(),armBone)
      // UpperArm.rotation.z = armBone.rotation.z
      // console.log(UpperArm.quaternion,armBone.quaternion)
      // UpperArm.quaternion.copy( armBone.quaternion);
    }
}
  
  
poseLandmarks.subscribe(val=>{
  if(val){
    let rightShoulder = val[12]
    let rightElbow = val[14]
    
    let keys = Object.keys(boneSchema)
    
    for (var i = 0; i < keys.length; i++){ // 10 segments
      
      let bodypart = keys[i]
      let indexes = boneSchema[bodypart]
      let p0 = val[indexes[0]]
      p0 = webcam2space(p0.x,p0.y,p0.z)
      let p1 = val[indexes[1]]
      p1 = webcam2space(p1.x,p1.y,p1.z)

      if(indexes.length > 2){
        let p2 = val[indexes[2]]
        p2 = webcam2space(p2.x,p2.y,p2.z)
        p1 = p1.clone().lerp(p2,0.5)
      }  
      
     updateMeshes(p0,p1,i)
      
    }

    val.forEach((e,i)=>{
      let newPoint = webcam2space(e.x,e.y,e.z)
      // console.log(newPoint)
      posePoints[i].position.copy(newPoint)
    })
  }
})

  
</script>