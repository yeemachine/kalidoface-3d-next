<script context="module">
import { VRM, VRMSchema, VRMUtils } from "@pixiv/three-vrm";
import { writable,get } from 'svelte/store';
import localForage from 'localforage';
import {firstLoad,firstLoad0_1,DIM,getLocalStorage,subLocalStorage,urlBase,isSafari} from '../stores.js'
import {createBlobURL,randomString} from '../utils/helpers.js'
import {animateHead,animateChest,animateFace,animateArm,animateFingers,animateLegs,animateHips} from './charRigger.svelte';
import {profiles} from './profiles.svelte'
import {cameraOn} from '../tracking/webcam.svelte'
import {cameraConfig,staticCamera,freeCamera,pivotPoint,orbitControls} from './CameraControls.svelte'
import {p2pConnection,isHost} from '../connections/Peer.svelte'
import {RestingDefault} from '../tracking/utils/RestingDefault.js'
import {SpringManager} from '../tracking/smooth.svelte';
  
export let randomColors = ['#73a9ff','#ff9785','#ff6385','#ffd75e','#97ff94','#d791ff','#5ce9ff']

export const newRandomColor = () =>{
  let newColor = randomColors[Math.floor(Math.random() * randomColors.length)];
  let currentColors = []
  get(modelList).forEach(e=>{
    if(e.color){currentColors.push(e.color)}
  })
  
  if(currentColors.length<randomColors.length){
    do {
      newColor = randomColors[Math.floor(Math.random() * randomColors.length)]
    }
    while (currentColors.includes(newColor))//random color;
  }else{
    do {
      newColor = randomColors[Math.floor(Math.random() * randomColors.length)]
    }
    while (get(modelList)[0].color === newColor)//non repeating color;
  }
 
  return newColor;
} 
    
const loadModelFromStorage = (e) => {
  // createBlobURL(e)
  getLocalStorage(userModel,'userModel',presetModels[0])   
  subLocalStorage(userModel,'userModel')
}
export let modelList = writable([])
export let presetModels = [
    {
        id: 4,
        name: 'VAL',
        type: 'url',
        url: 'https://cdn.glitch.com/29e07830-2317-4b15-a044-135e73c7f840%2FVAL1.2_VRoidVRM.vrm?v=1630342336981',
        icon: 'https://cdn.glitch.com/29e07830-2317-4b15-a044-135e73c7f840%2FFrame%2083.png?v=1630342818436',
        source:'https://booth.pm/en/items/3093190',
        author:'とりんご',
        color: null,
    },
    {
        id: 0,
        name: 'Sample A',
        type: 'url',
        url: 'https://cdn.glitch.com/29e07830-2317-4b15-a044-135e73c7f840%2FAvatarSample_A.vrm?v=1625714147154',
        icon: 'https://cdn.glitch.com/29e07830-2317-4b15-a044-135e73c7f840%2FFrame%2063.png?v=1625722759780',
        source:'https://hub.vroid.com/en/characters/2843975675147313744/models/5644550979324015604',
        author:'Vroid Project',
        color: null,
    },
    {
        id: 3,
        name: 'Ashtra',
        type: 'url',
        url: 'https://cdn.glitch.com/29e07830-2317-4b15-a044-135e73c7f840%2FAshtra.vrm?v=1630342336981',
        icon: 'https://cdn.glitch.com/29e07830-2317-4b15-a044-135e73c7f840%2FFrame%2081.png?v=1630342819144',
        source:'https://hub.vroid.com/en/characters/6617701103638326208/models/8892157442595230149',
        author:'아기쥐작업소',
        color: null,
    },
    {
        id: 2,
        name: 'Mono Cat',
        type: 'url',
        url: 'https://cdn.glitch.com/29e07830-2317-4b15-a044-135e73c7f840%2Fmono_cat_cluster.vrm?v=1625558605665',
        icon: 'https://cdn.glitch.com/29e07830-2317-4b15-a044-135e73c7f840%2Fimage%2050.png?v=1625710955316',
        source:'https://hub.vroid.com/en/characters/6063135800223582444/models/1998385702537276695',
        author:'凪',
        color: null,
    },
    {
        id: 1,
        name: 'Alicia Solid',
        type: 'url',
        url: 'https://cdn.glitch.com/29e07830-2317-4b15-a044-135e73c7f840%2FAliciaSolid.vrm?v=1615143017744',
        icon: 'https://cdn.glitch.com/29e07830-2317-4b15-a044-135e73c7f840%2Fdownload%20(1).png?v=1615916420033',
        source:'https://3d.nicovideo.jp/alicia/',
        author:'黒星紅白 & 雨刻',
        color: null,
    },
    {
        id: 5,
        name: 'Sample B',
        type: 'url',
        url: 'https://cdn.glitch.com/29e07830-2317-4b15-a044-135e73c7f840%2FAvatarSample_B.vrm?v=1625714147292',
        icon: 'https://cdn.glitch.com/29e07830-2317-4b15-a044-135e73c7f840%2FFrame%2065.png?v=1625722760568',
        source:'https://hub.vroid.com/en/characters/7939147878897061040/models/2292219474373673889',
        author:'Vroid Project',
        color: null,
    },
    {
        id: 6,
        name: 'Sample C',
        type: 'url',
        url: 'https://cdn.glitch.com/29e07830-2317-4b15-a044-135e73c7f840%2FAvatarSample_C.vrm?v=1625714149347',
        icon: 'https://cdn.glitch.com/29e07830-2317-4b15-a044-135e73c7f840%2FFrame%2064.png?v=1625722759085',
        source:'https://hub.vroid.com/en/characters/1248981995540129234/models/8640547963669442173',
        author:'Vroid Project',
        color: null,
    },
    {
        id: 7,
        name: '緑子ちゃん',
        type: 'url',
        url:
            'https://cdn.glitch.com/29e07830-2317-4b15-a044-135e73c7f840%2F%E7%B7%91%E5%AD%90%E3%81%A1%E3%82%83%E3%82%93%E3%83%AC%E3%83%95%E3%82%9A%E3%83%AA%E3%82%AB2.vrm?v=1625709656291',
        icon: 'https://cdn.glitch.com/29e07830-2317-4b15-a044-135e73c7f840%2Fimage%2051.png?v=1625709571451',
        source:'https://hub.vroid.com/en/characters/3846600528849029990/models/7104226743214656101',
        author:'チェリ藻',
        color: null,
    },
];

getLocalStorage(modelList,'modelList',get(modelList),loadModelFromStorage)
subLocalStorage(modelList,'modelList')

export const userModel = writable(null)
export const isLoading = writable(false);
export const loadingPerc = writable(0);
export const findDataURLFromList = (e) => {
    let url = presetModels[0].url //fallback for no data
      if(e.type==="blob" && get(modelList).length>0){
        get(modelList).forEach(j=>{
          if(e.url === j.url && j.data){
            url = j.data
          }
        })
      }
      if(e.type==="url"){
        url = e.url
      }
      return url
}
  
export const friendModel = writable(null)
export const userExps = writable({
  current:null,
  list:[]
});
  
export const setVRMPose = (currentVRM,tracking,reset=false,type="user") => {
  if(reset){
    tracking = JSON.parse(JSON.stringify(RestingDefault))  
    SpringManager[type].head.set(RestingDefault.Face.head)  
    SpringManager[type].face.set(RestingDefault.Face)
    SpringManager[type].pose.set(RestingDefault.Pose);
    SpringManager[type].hands.Right.set(RestingDefault.RightHand);
    SpringManager[type].hands.Left.set(RestingDefault.LeftHand);
  }
  animateHead(currentVRM,tracking.Face,tracking.Pose)
  animateFace(currentVRM,tracking.Face)
  animateHips(currentVRM,tracking.Pose,tracking.Face) 
  animateChest(currentVRM,tracking.Face,tracking.Pose)
  animateLegs(currentVRM,tracking.Pose,tracking.Face,'Right')
  animateLegs(currentVRM,tracking.Pose,tracking.Face,'Left')
  animateArm(currentVRM,tracking.Pose,'Right')
  animateArm(currentVRM,tracking.Pose,'Left')
  animateFingers(currentVRM,tracking.RightHand,tracking.Pose,'Right')
  animateFingers(currentVRM,tracking.LeftHand,tracking.Pose,'Left')
}
  
export const updateVRM = (type,deltaTime,clock) => {
  let profile = get(profiles)[type]
  let currentVRM = profile.model
  if(!currentVRM){
    return
  }
  // let s = Math.sin( Math.PI * clock.elapsedTime ); // -1 _ 1 idle oscillation
  let flipHorizontal = (get(cameraConfig).freeCamera && get(cameraConfig).firstPerson && type==="user")

  if((get(cameraConfig).freeCamera) || profile.detected){
    animateHead(currentVRM,profile.tracking.Face,profile.tracking.Pose,flipHorizontal)
  }
  animateFace(currentVRM,profile.tracking.Face)
  animateHips(currentVRM,profile.tracking.Pose,profile.tracking.Face,flipHorizontal) 

  if(currentVRM.scene.position.x !== profile.position.x){
    currentVRM.scene.position.x = profile.position.x
  }
  if(currentVRM.scene.position.z !== profile.position.z){
    currentVRM.scene.position.z = profile.position.z
  }
 if(profile.detected){ 
    //fake chest based on head rotation
    animateChest(currentVRM,profile.tracking.Face,profile.tracking.Pose,flipHorizontal)

    //fake legs based on head rotation
    animateLegs(currentVRM,profile.tracking.Pose,profile.tracking.Face,'Right',flipHorizontal)
    animateLegs(currentVRM,profile.tracking.Pose,profile.tracking.Face,'Left',flipHorizontal)

    //only calculate when pose tracking is enabled
    if(profile.tracking.Pose.enable){
      animateArm(currentVRM,profile.tracking.Pose,'Right',flipHorizontal)
      animateArm(currentVRM,profile.tracking.Pose,'Left',flipHorizontal)
      animateFingers(currentVRM,profile.tracking.RightHand,profile.tracking.Pose,'Right',flipHorizontal)
      animateFingers(currentVRM,profile.tracking.LeftHand,profile.tracking.Pose,'Left',flipHorizontal)
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
      load($profiles.user, findDataURLFromList(e), e);
    }
  });

  friendModel.subscribe(e => {
    if (e) {
      let url = e.type === "url" ? e.url : e.data
      load($profiles.friend, url, e);
    }else if($profiles.friend.model){
      group.remove($profiles.friend.model.scene);
      $profiles.friend.model.dispose();
    }
  });
});

// gltf and vrm
const loader = new GLTFLoader();
loader.crossOrigin = "anonymous";
  

function load(profile, url, modelObj) {
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
          profile.model = null
        }
        if(profile.id === 'friend' && !$friendModel){
          return
        }
         vrm.isUser = (profile.id === 'user') ? true : false;
         vrm.name = modelObj.name || vrm.meta.title

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
         staticCamera.position.y = pivotPoint.position.y + .1
                              
         vrm.pivotPoint = {x:pivotPoint.position.x,y:pivotPoint.position.y}
         vrm.scene.rotation.order = 'YXZ';
         }
   
        vrm.scene.position.x = profile.position.x
        group.add(vrm.scene);

        vrm.humanoid.getBoneNode(VRMSchema.HumanoidBoneName.Hips).rotation.y =
          Math.PI;
        vrm.humanoid.getBoneNode(VRMSchema.HumanoidBoneName.Hips).rotation.order = 'YXZ';
        
        //Set up shadows
        vrm.scene.traverse( function( child ) { 
            if ( child.isMesh ) {
                child.castShadow = true;
            }
        } );
        
        //Extract meshes for toggle
        let extractedParts = []
        let extractedFromBody = []
        vrm.scene.children.forEach(e=>{
          //list of phrases to exclude from part names
          const exclude = ['blendshape', 'root','face','hair','morph','armature','secondary','erase','mesh'];
          if (!exclude.some(substring=>e.name.toLowerCase().includes(substring))) {
            //If Body group, check for clothing
            if(e.name.toLowerCase().includes('body')){
              if(e.type === "Group"){
                let excludeBody = ['erase']
                e.children.forEach((f,i)=>{
                  //typically first 3-4 meshes are body parts. exclude from list
                  if (i>3 && !excludeBody.some(substring=>f.name.toLowerCase().includes(substring))) {
                    extractedFromBody.push(f)
                  }
                })
                return
              }
         
            }else{
              extractedParts.push(e)
            }
          }
        })
        vrm.extractedParts = [...extractedParts,...extractedFromBody]
        //add model to profile
        profile.model = vrm;
        profiles.set($profiles)

        
        //init model from T pose to current pose
        setVRMPose(vrm,profile.tracking,profile.id)
        
        if(profile.id === 'user' && modelObj.uploaded){ 
          //check if character exists
          let inList = false
          let needsThumbnail = null
          $modelList.forEach((e, i) => {
            //check if url exists in modellist
            if(e.url === modelObj.url){
              inList = true
              //if no icon, flag obj
              if(!e.icon){
                needsThumbnail = e
              }
            }
          })
          //create thumbnail
          if ((needsThumbnail || !inList) && typeof OffscreenCanvas !== "undefined") {
            try {
                  VRMUtils.extractThumbnailBlob(renderer, vrm, 256).then(blob => {
                    var reader = new FileReader();
                    reader.onload = function(e) {
                      if(!inList){
                        modelList.set([{
                          name:vrm.name,
                          type:modelObj.type,
                          url:modelObj.url,
                          data:modelObj.type === 'blob' ? url : null,
                          uploaded:modelObj.uploaded,
                          icon:e.target.result,
                          color:null
                        },...$modelList])
                          return
                      }
                      needsThumbnail.icon = e.target.result;
                      needsThumbnail.color = null;
                      modelList.set($modelList)
                    };
                    reader.readAsDataURL(blob);
                  });
            } catch (err) {
           
            }
          }else if(!inList){
             modelList.set([{
              name:vrm.name,
              type:'url',
              url:url,
              date:modelObj.date,
              icon:null,
              color:newRandomColor()
            },...$modelList])
          }
        }
                           
      });
      
      if(!$firstLoad){
        setTimeout(()=>{
          firstLoad.set(true)
          firstLoad0_1.set(1)
           },1000)
      }
      
      
    },

    progress =>
      // console.log(
      //   "Loading model...",
      //   100.0 * (progress.loaded / progress.total),
      //   "%"
      // ),
    loadingPerc.set(progress.loaded / progress.total),
    error => {
      console.error(error)
      if(!$firstLoad){
        setTimeout(()=>{
          firstLoad.set(true)
          firstLoad0_1.set(1)
           },1000)
      }
    }
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



