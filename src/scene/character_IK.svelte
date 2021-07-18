<script context="module">
import { VRM, VRMSchema, VRMUtils } from "@pixiv/three-vrm";
import { writable,get } from 'svelte/store';
import localForage from 'localforage';
import {firstLoad,DIM,getLocalStorage,subLocalStorage,urlBase} from '../stores.js'
import {createBlobURL} from '../utils/helpers.js'
import {animateHead,animateChest,animateFace,animateArm,animateFingers,animateLegs,animateHips} from './charRigger.svelte';
import {profiles} from './profiles.svelte'
import {user_smooth_pose} from '../tracking/smooth.svelte'
import {cameraOn} from '../tracking/webcam.svelte'
import {cameraConfig,staticCamera,freeCamera,pivotPoint} from './CameraControls.svelte'
import {posePoints} from './poseGuide.svelte'
  
export let randomColors = ['#73a9ff','#ff9785','#ff6385','#ffd75e','#97ff94','#d791ff','#5ce9ff']

export let modelList = writable([
  {'id':0,'name':'Alicia Solid','type':'url',date:1,'url':'https://cdn.glitch.com/29e07830-2317-4b15-a044-135e73c7f840%2FAliciaSolid.vrm?v=1615143017744','icon':'https://cdn.glitch.com/29e07830-2317-4b15-a044-135e73c7f840%2Fdownload%20(1).png?v=1615916420033',color:null},
   {'id':0,'name':'Ghost','type':'url',date:2,'url':'https://cdn.glitch.com/29e07830-2317-4b15-a044-135e73c7f840%2Fghost.vrm?v=1616176394323',color:randomColors[Math.floor(Math.random() * randomColors.length)]},
  {'id':0,'name':'Girl','type':'url',date:3,'url':'https://cdn.glitch.com/29e07830-2317-4b15-a044-135e73c7f840%2Fthree-vrm-girl.vrm?v=1615143009061',color:randomColors[Math.floor(Math.random() * randomColors.length)]}
])
getLocalStorage(modelList,'modelList',get(modelList),createBlobURL)
subLocalStorage(modelList,'modelList')

export const userModel = writable(null)

let defaultURL = "https://cdn.glitch.com/29e07830-2317-4b15-a044-135e73c7f840%2FAliciaSolid.vrm?v=1615143017744"
getLocalStorage(userModel,'userModel',{
  type:'url',
  date:1,
  url:defaultURL},createBlobURL)   
subLocalStorage(userModel,'userModel')
  
export const friendModel = writable(null)
export const userExps = writable({
  current:null,
  list:[]
});
export const hoverOver = writable(null);
  
export const updateVRM = (type,deltaTime,clock) => {
  let profile = get(profiles)[type]
  let currentVRM = profile.model
  if(!currentVRM){
    return
  }
  // animateArm2(currentVRM,profile.tracking.pose,'Left')
  // let s = Math.sin( Math.PI * clock.elapsedTime ); // -1 _ 1 idle oscillation
  if(get(cameraConfig).freeCamera || profile.detected){
    animateHead(currentVRM,profile.tracking.face)
  }
   if(profile.detected){ 

      animateFace(currentVRM,profile.tracking.face)

      //fake chest based on head rotation
      animateChest(currentVRM,profile.tracking.face)

      //fake legs based on head rotation
      animateLegs(currentVRM,profile.tracking.face,'Right')
      animateLegs(currentVRM,profile.tracking.face,'Left')
      // animateHips(currentVRM,profile.tracking.face) 

      //only calculate when pose tracking is enabled
      if(profile.tracking.pose.enable){
        animateArm(currentVRM,profile.tracking.pose,'Right')
        animateArm(currentVRM,profile.tracking.pose,'Left')
        animateFingers(currentVRM,profile.tracking.hand,'Right')
        animateFingers(currentVRM,profile.tracking.hand,'Left')
      }

    }
  
   // updateIK(currentVRM, ikList, pivotList, bonesList, nodesList)
  // update vrm
  currentVRM.update( deltaTime );
   
}

 // IKの準備
const ikList = [new IK(), new IK()] // IKシステム
const chainList = [new IKChain(), new IKChain()] // チェーン
const pivotList = [] // ピボット
const bonesList = [] // ボーン
const nodesList = [] // ノード

let boneName = [
  [VRMSchema.HumanoidBoneName.LeftUpperArm,
    VRMSchema.HumanoidBoneName.LeftLowerArm,
    VRMSchema.HumanoidBoneName.LeftHand],
  [VRMSchema.HumanoidBoneName.RightUpperArm,
   VRMSchema.HumanoidBoneName.RightLowerArm,
   VRMSchema.HumanoidBoneName.RightHand]]

  // 腕の更新
  const updateArm = (bones, nodes, offset) => {
    const q = new THREE.Quaternion()
    q.setFromAxisAngle( new THREE.Vector3(0, 1, 0), offset)
    nodes[0].setRotationFromQuaternion(bones[0].quaternion.multiply(q))
    nodes[1].setRotationFromQuaternion(bones[1].quaternion)
    nodes[2].setRotationFromQuaternion(bones[2].quaternion)
  }

  // フレーム毎回に呼ばれる
  const updateIK = (vrm, ikList, pivotList, bonesList, nodesList) => {
    // ターゲットの移動
    pivotList[0].rotation.z -= 0.01
    pivotList[1].rotation.z += 0.01

    // IKの更新
    ikList[0].solve()
    ikList[1].solve()

    // 腕の更新
    updateArm(bonesList[0], nodesList[0], Math.PI / 2)
    updateArm(bonesList[1], nodesList[1], -Math.PI / 2)

    // フレーム更新
  }


        

</script>

<script>
import { onMount } from "svelte";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { IK, IKChain, IKJoint, IKHelper } from '../IK/THREE.IK.js';
export let scene;
export let renderer;
export let composer;
export let bgTexture;

onMount(async () => {
  userModel.subscribe(e => {
    if (e) {
      console.log(e);
      load($profiles.user, e.url);
    }
  });
  friendModel.subscribe(e => {
    if (e) {
      console.log(e);
      load($profiles.friend, e.url);
    }
  });
});

// gltf and vrm
const loader = new GLTFLoader();
loader.crossOrigin = "anonymous";

function load(profile, url) {
  loader.crossOrigin = "anonymous";
  loader.load(
    url,

    gltf => {
      VRMUtils.removeUnnecessaryJoints(gltf.scene);

      VRM.from(gltf).then(vrm => {
        if (profile.model) {
          scene.remove(profile.model.scene);
          profile.model.dispose();
        }
        
         vrm.firstPerson.setup();

         //enable head layer for normal camera
         staticCamera.layers.disable(vrm.firstPerson.firstPersonOnlyLayer);
         staticCamera.layers.enable(vrm.firstPerson.thirdPersonOnlyLayer);
         freeCamera.layers.disable(vrm.firstPerson.firstPersonOnlyLayer);
         freeCamera.layers.enable(vrm.firstPerson.thirdPersonOnlyLayer);
         //disable head layer for firstPersonCamera
         pivotPoint.position.setFromMatrixPosition( vrm.firstPerson.firstPersonBone.matrixWorld )
         freeCamera.lookAt(pivotPoint.position)
         // pivotPoint.position.y += .04    
        
        vrm.pivotPoint = {x:pivotPoint.position.x,y:pivotPoint.position.y}
        vrm.scene.rotation.order = 'YXZ';
        scene.add(vrm.scene);

        // vrm.humanoid.getBoneNode(VRMSchema.HumanoidBoneName.Hips).rotation.y =
        //   Math.PI;
        // vrm.scene.rotation.y = Math.PI;

        console.log(vrm);
        console.log(vrm.lookAt);

        //add model to profile
        profile.model = vrm;
        
        //init model from T pose to current pose
        // animateHead(vrm,profile.tracking.face)
        // animateFace(vrm,profile.tracking.face)
        // animateChest(vrm,profile.tracking.face)
        // animateLegs(vrm,profile.tracking.face,'Right')
        // animateLegs(vrm,profile.tracking.face,'Left')
        // animateHips(vrm,profile.tracking.face)  
        // animateArm(vrm,profile.tracking.pose,'Right')
        // animateArm(vrm,profile.tracking.pose,'Left')
        // animateFingers(vrm,profile.tracking.hand,'Right')
        // animateFingers(vrm,profile.tracking.hand,'Left')
 
        for (let j = 0; j < 2; j++) {
          // ターゲットの生成
          const movingTarget = new THREE.Mesh(
            new THREE.SphereGeometry(0.05),
            new THREE.MeshBasicMaterial({color: 0xff0000}))
          movingTarget.position.x = -0.2
          let pivot = new THREE.Object3D()
          pivot.add(movingTarget)
          pivot.position.x =  j == 0 ? -0.3 : 0.3
          pivot.position.y = 1.2
          pivot.position.z = -0.3
          scene.add(pivot)
          pivotList.push(pivot)
          
          // チェーンの生成
          const bones = [] // ボーン
          const nodes = [] // ノード
          for (let i = 0; i < 3; i++) {
            // ボーンとノードの生成
            const bone = new THREE.Bone()
            let node = vrm.humanoid.getBoneNode(boneName[j][i])
 
            if (i == 0) {
              node.getWorldPosition(bone.position)
            } else {
              bone.position.set(node.position.x, node.position.y, node.position.z)
              bones[i - 1].add(bone)
            }
            bones.push(bone)
            nodes.push(node)

            // チェーンに追加
            // const target = i === 2 ? movingTarget : null
            const target = i === 2 && j===1 ? posePoints[15] 
            : i === 2 && j===0  ? posePoints[16] 
            : null
            
            chainList[j].add(new IKJoint(bone, {}), {target})
          }

          // IKシステムにチェーン追加
          ikList[j].add(chainList[j])

          // リストに追加
          bonesList.push(bones)
          nodesList.push(nodes)

          // ルートボーンの追加
          scene.add(ikList[j].getRootBone())   
        }
        
       
        
        
        //create thumbnail
        $modelList.forEach((e, i) => {
          if (e.url === url) {
            if (!e.icon && typeof OffscreenCanvas !== "undefined") {
              try {
                VRMUtils.extractThumbnailBlob(renderer, vrm, 256).then(blob => {
                  var reader = new FileReader();
                  reader.onload = function(e) {
                    let objectURL = e.target.result;
                    $modelList[i].icon = objectURL;
                    $modelList[i].color = null;
                    console.log($modelList);
                  };
                  reader.readAsDataURL(blob);
                });
              } catch (err) {
                console.error(err);
              }
            }
          }
        });
      });
    },

    progress =>
      console.log(
        "Loading model...",
        100.0 * (progress.loaded / progress.total),
        "%"
      ),

    error => console.error(error)
  );
} 

// helpers
const gridHelper = new THREE.GridHelper(10, 10);
const axesHelper = new THREE.AxesHelper(5);
// scene.add(gridHelper, axesHelper );

</script>



