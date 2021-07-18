<script context="module">
import { VRM, VRMSchema, VRMUtils } from "@pixiv/three-vrm";
import { writable,get } from 'svelte/store';
import localForage from 'localforage';
import {firstLoad,firstLoad0_1,DIM,getLocalStorage,subLocalStorage,urlBase,isSafari} from '../stores.js'
import {createBlobURL,randomString} from '../utils/helpers.js'
import {animateHead,animateChest,animateFace,animateArm,animateFingers,animateLegs,animateHips} from './charRigger.svelte';
import {profiles} from './profiles.svelte'
import {user_smooth_pose} from '../tracking/smooth.svelte'
import {cameraOn} from '../tracking/webcam.svelte'
import {cameraConfig,staticCamera,freeCamera,pivotPoint,orbitControls} from './CameraControls.svelte'
import {p2pConnection,isHost} from '../connections/Peer.svelte'
  
export let randomColors = ['#73a9ff','#ff9785','#ff6385','#ffd75e','#97ff94','#d791ff','#5ce9ff']

export let modelList = writable([
 
  {'id':11,'name':'SampleB','type':'url',date:12,'url':'https://cdn.glitch.com/29e07830-2317-4b15-a044-135e73c7f840%2FAvatarSample_B.vrm?v=1625714147292',icon:"https://cdn.glitch.com/29e07830-2317-4b15-a044-135e73c7f840%2FFrame%2065.png?v=1625722760568",color:null},
   {'id':12,'name':'SampleC','type':'url',date:13,'url':'https://cdn.glitch.com/29e07830-2317-4b15-a044-135e73c7f840%2FAvatarSample_C.vrm?v=1625714149347',icon:"https://cdn.glitch.com/29e07830-2317-4b15-a044-135e73c7f840%2FFrame%2064.png?v=1625722759085",color:null},
   {'id':13,'name':'SampleA','type':'url',date:14,'url':'https://cdn.glitch.com/29e07830-2317-4b15-a044-135e73c7f840%2FAvatarSample_A.vrm?v=1625714147154',icon:"https://cdn.glitch.com/29e07830-2317-4b15-a044-135e73c7f840%2FFrame%2063.png?v=1625722759780",color:null},
    {'id':0,'name':'Alicia Solid','type':'url',date:1,'url':'https://cdn.glitch.com/29e07830-2317-4b15-a044-135e73c7f840%2FAliciaSolid.vrm?v=1615143017744','icon':'https://cdn.glitch.com/29e07830-2317-4b15-a044-135e73c7f840%2Fdownload%20(1).png?v=1615916420033',color:null},
 {'id':4,'name':'Midori','type':'url',date:5,'url':'https://cdn.glitch.com/29e07830-2317-4b15-a044-135e73c7f840%2F%E7%B7%91%E5%AD%90%E3%81%A1%E3%82%83%E3%82%93%E3%83%AC%E3%83%95%E3%82%9A%E3%83%AA%E3%82%AB2.vrm?v=1625709656291',icon:"https://cdn.glitch.com/29e07830-2317-4b15-a044-135e73c7f840%2Fimage%2051.png?v=1625709571451",color:null}, 
    {'id':5,'name':'Faniel','type':'url',date:6,'url':'https://cdn.glitch.com/29e07830-2317-4b15-a044-135e73c7f840%2FFaniel%20(Free%20use).vrm?v=1625558607085',icon:"https://cdn.glitch.com/29e07830-2317-4b15-a044-135e73c7f840%2Fimage%2052.png?v=1625710958283",color:null},
  {'id':8,'name':'Camome','type':'url',date:9,'url':'https://cdn.glitch.com/29e07830-2317-4b15-a044-135e73c7f840%2Fcamome.vrm?v=1625558625960',icon:"https://cdn.glitch.com/29e07830-2317-4b15-a044-135e73c7f840%2Fimage%2046.png?v=1625710957701",color:null},
  {'id':9,'name':'Zundamon','type':'url',date:10,'url':'https://cdn.glitch.com/29e07830-2317-4b15-a044-135e73c7f840%2FZundamon(Flying%20Type)_vrm.vrm?v=1625558616368',icon:"https://cdn.glitch.com/29e07830-2317-4b15-a044-135e73c7f840%2Fimage%2047.png?v=1625713113952",color:null},
   {'id':3,'name':'Mono Cat','type':'url',date:4,'url':'https://cdn.glitch.com/29e07830-2317-4b15-a044-135e73c7f840%2Fmono_cat_cluster.vrm?v=1625558605665',icon:"https://cdn.glitch.com/29e07830-2317-4b15-a044-135e73c7f840%2Fimage%2050.png?v=1625710955316",color:null}
])
getLocalStorage(modelList,'modelList',get(modelList),createBlobURL)
subLocalStorage(modelList,'modelList')

export const userModel = writable(null)
export const isLoading = writable(false);
export const loadingPerc = writable(0);

getLocalStorage(userModel,'userModel',{
  type:'url',
  date:get(modelList)[0].date,
  url:get(modelList)[0].url},createBlobURL)   
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
  // let s = Math.sin( Math.PI * clock.elapsedTime ); // -1 _ 1 idle oscillation

  if((get(cameraConfig).freeCamera) || profile.detected){
    animateHead(currentVRM,profile.tracking.face)
  }
  if(currentVRM.scene.position.x !== profile.position.x){
    currentVRM.scene.position.x = profile.position.x
  }
  if(currentVRM.scene.position.z !== profile.position.z){
    currentVRM.scene.position.z = profile.position.z
  }
 if(profile.detected){ 

    animateFace(currentVRM,profile.tracking.face)

    //fake chest based on head rotation
    animateChest(currentVRM,profile.tracking.face,profile.tracking.pose)

    //fake legs based on head rotation
    animateLegs(currentVRM,profile.tracking.face,'Right')
    animateLegs(currentVRM,profile.tracking.face,'Left')
    animateHips(currentVRM,profile.tracking.face) 

    //only calculate when pose tracking is enabled
    if(profile.tracking.pose.enable){
      let flipHorizontal = get(cameraConfig).freeCamera && get(cameraConfig).firstPerson && type=="user"
      animateArm(currentVRM,profile.tracking.pose,'Right',flipHorizontal)
      animateArm(currentVRM,profile.tracking.pose,'Left',flipHorizontal)
      animateFingers(currentVRM,profile.tracking.hand,'Right',flipHorizontal)
      animateFingers(currentVRM,profile.tracking.hand,'Left',flipHorizontal)
      // animateArm(currentVRM,profile.tracking.pose,'Right')
      // animateArm(currentVRM,profile.tracking.pose,'Left')
      // animateFingers(currentVRM,profile.tracking.hand,'Right')
      // animateFingers(currentVRM,profile.tracking.hand,'Left')
    }

  }
  
  // update vrm
  currentVRM.update( deltaTime );
   
}

 export const toggleFirstPersonLayer = (currentVrm) => {
  if (!currentVrm) {return}
   
   if(get(cameraConfig).firstPerson && currentVrm.isUser){
    freeCamera.layers.enable(currentVrm.firstPerson.firstPersonOnlyLayer);
    freeCamera.layers.disable(currentVrm.firstPerson.thirdPersonOnlyLayer);
  }else{
    freeCamera.layers.disable(currentVrm.firstPerson.firstPersonOnlyLayer);
    freeCamera.layers.enable(currentVrm.firstPerson.thirdPersonOnlyLayer);
  }
}

        

</script>

<script>
import { onMount } from "svelte";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import {haptic} from '../utils/helpers.js'
  
export let scene;
export let group;
export let renderer;

onMount(async () => {
  userModel.subscribe(e => {
    if (e) {
      load($profiles.user, e.url);
    }
  });

  friendModel.subscribe(e => {
    if (e) {
      let url = e.type === "url" ? e.url : e.data
      load($profiles.friend, url);
    }else if($profiles.friend.model){
      group.remove($profiles.friend.model.scene);
      $profiles.friend.model.dispose();
    }
  });
});

// gltf and vrm
const loader = new GLTFLoader();
loader.crossOrigin = "anonymous";
  

function load(profile, url) {
  isLoading.set(true)
  loader.crossOrigin = "anonymous";
  loader.load(
    url,

    gltf => {
      VRMUtils.removeUnnecessaryJoints(gltf.scene);

      VRM.from(gltf).then(vrm => {
        //feedback when loaded
        haptic();
        
        if (profile.model) {
          group.remove(profile.model.scene);
          profile.model.dispose();
        }
        if(profile.id === 'friend' && !$friendModel){
          return
        }
         vrm.isUser = (profile.id === 'user') ? true : false;
  
         vrm.firstPerson.setup({
           firstPersonOnlyLayer: profile.id === 'user' ? 9 : 11, 
           thirdPersonOnlyLayer: profile.id === 'user' ? 10 : 12});
        
         //enable head layer for normal camera
         staticCamera.layers.disable(vrm.firstPerson.firstPersonOnlyLayer);
         staticCamera.layers.enable(vrm.firstPerson.thirdPersonOnlyLayer);
         toggleFirstPersonLayer(vrm)

         //disable head layer for firstPersonCamera
         if(profile.id === 'user'){
         pivotPoint.position.setFromMatrixPosition( vrm.firstPerson.firstPersonBone.matrixWorld )
         freeCamera.position.set( 0.0, 0, 1 )
         freeCamera.lookAt(pivotPoint.position)

         orbitControls.target.y = pivotPoint.position.y
         orbitControls.target.y += .025
         orbitControls.update();
                              
         vrm.pivotPoint = {x:pivotPoint.position.x,y:pivotPoint.position.y}
         vrm.scene.rotation.order = 'YXZ';
         }
   
        vrm.scene.position.x = profile.position.x
        group.add(vrm.scene);

        vrm.humanoid.getBoneNode(VRMSchema.HumanoidBoneName.Hips).rotation.y =
          Math.PI;

        // console.log(vrm);

        //add model to profile
        profile.model = vrm;
        
        //init model from T pose to current pose
        animateHead(vrm,profile.tracking.face)
        animateFace(vrm,profile.tracking.face)
        animateChest(vrm,profile.tracking.face,profile.tracking.pose)
        animateLegs(vrm,profile.tracking.face,'Right')
        animateLegs(vrm,profile.tracking.face,'Left')
        animateHips(vrm,profile.tracking.face)  
        animateArm(vrm,profile.tracking.pose,'Right')
        animateArm(vrm,profile.tracking.pose,'Left')
        animateFingers(vrm,profile.tracking.hand,'Right')
        animateFingers(vrm,profile.tracking.hand,'Left')
        
        //create thumbnail
        if(!isSafari){
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
                    };
                    reader.readAsDataURL(blob);
                  });
                } catch (err) {
                  console.error(err);
                }
              }
            }
          });
        }
      });
      
      if(!$firstLoad){
        setTimeout(()=>{
          firstLoad.set(true)
          firstLoad0_1.set(1)
           },1000)
      }
      
      isLoading.set(false)
      
    },

    progress =>
      // console.log(
      //   "Loading model...",
      //   100.0 * (progress.loaded / progress.total),
      //   "%"
      // ),
    loadingPerc.set(progress.loaded / progress.total),
    error => console.error(error)
  );
} 
  
  $:{
    if($p2pConnection && $cameraConfig.firstPerson && $cameraConfig.freeCamera){
      $profiles.user.position.x = 0
       $profiles.friend.position.x = 0
       $profiles.friend.position.z = -.5
    }
    else if($p2pConnection && $isHost){
      $profiles.user.position.x = .2  
      $profiles.friend.position.z = 0
      $profiles.friend.position.x = -.2  
    }else if ($p2pConnection && !$isHost) {
      $profiles.user.position.x = -.2  
      $profiles.friend.position.x = .2  
      $profiles.friend.position.z = 0
    }else{
      $profiles.user.position.x = 0 
      $profiles.friend.position.x = 0 
      $profiles.friend.position.z = 0
    }
  } 

// helpers
const gridHelper = new THREE.GridHelper(10, 10);
const axesHelper = new THREE.AxesHelper(5);
// scene.add(gridHelper, axesHelper );

</script>



