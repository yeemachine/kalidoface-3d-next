<script context="module">
import { writable,get } from 'svelte/store';
import localForage from 'localforage';
import {firstLoad,DIM,getLocalStorage,subLocalStorage,urlBase} from '../stores.js'
import {createBlobURL} from '../utils/helpers.js'
  
export let randomColors = ['#73a9ff','#ff9785','#ff6385','#ffd75e','#97ff94','#d791ff','#5ce9ff']

export let modelList = writable([
  {'id':0,'name':'hiyori','type':'url',date:1,'url':'https://cdn.glitch.com/29e07830-2317-4b15-a044-135e73c7f840%2FAliciaSolid.vrm?v=1615143017744','icon':'https://cdn.glitch.com/29e07830-2317-4b15-a044-135e73c7f840%2Fdownload%20(1).png?v=1615916420033',color:null},
   {'id':0,'name':'hiyori','type':'url',date:2,'url':'https://cdn.glitch.com/29e07830-2317-4b15-a044-135e73c7f840%2Fghost.vrm?v=1616176394323',color:null}
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
export const profiles = writable({
  user: {
    id:'user',
    model:null,
    live2d:null,
    coords:{x:.5,y:window.innerWidth > 600 ? .7 : .55},
    currentExp:0,
    expressions:[],
    zoom:.5,
    destroying:false,
    detected:false,
    tracking:{
      face:{
        head:{x:0,y:0,z:0},
        mouth:{x:0,y:0},
        eye:{l:1,r:1},
        brow:0,
        pupil:{x:0,y:0}
      },
      pose:{
        RightUpperArm:{x:0,y:0,z:.4},
        LeftUpperArm:{x:0,y:0,z:.4},
        RightLowerArm:{x:0,y:0,z:.4},
        LeftLowerArm:{x:0,y:0,z:.4},
        LeftUpperLeg:{x:0,y:0,z:0},
        RightUpperLeg:{x:0,y:0,z:0},
        RightLowerLeg:{x:0,y:0,z:0},
        LeftLowerLeg:{x:0,y:0,z:0},
        LeftHand:{x:0,y:0,z:0},
        RightHand:{x:0,y:0,z:0},
        Spine:{x:0,y:0,z:0},
        Hips:{
          position:{x:0,y:0,z:0},
          rotation:{x:0,y:0,z:0}
        }
      },
      hand:{
        
        ///Right
        RightRingProximal:{x:0,y:0,z:0},
        RightRingIntermediate:{x:0,y:0,z:0},
        RightRingDistal:{x:0,y:0,z:0},
        
        RightIndexProximal:{x:0,y:0,z:0},
        RightIndexIntermediate:{x:0,y:0,z:0},
        RightIndexDistal:{x:0,y:0,z:0},
        
        RightMiddleProximal:{x:0,y:0,z:0},
        RightMiddleIntermediate:{x:0,y:0,z:0},
        RightMiddleDistal:{x:0,y:0,z:0},
        
        RightThumbProximal:{x:0,y:0,z:0},
        RightThumbIntermediate:{x:0,y:0,z:0},
        RightThumbDistal:{x:0,y:0,z:0},
        
        RightLittleProximal:{x:0,y:0,z:0},
        RightLittleIntermediate:{x:0,y:0,z:0},
        RightLittleDistal:{x:0,y:0,z:0},
        
        ///Left
        LeftRingProximal:{x:0,y:0,z:0},
        LeftRingIntermediate:{x:0,y:0,z:0},
        LeftRingDistal:{x:0,y:0,z:0},
        
        LeftIndexProximal:{x:0,y:0,z:0},
        LeftIndexIntermediate:{x:0,y:0,z:0},
        LeftIndexDistal:{x:0,y:0,z:0},
        
        LeftMiddleProximal:{x:0,y:0,z:0},
        LeftMiddleIntermediate:{x:0,y:0,z:0},
        LeftMiddleDistal:{x:0,y:0,z:0},
        
        LeftThumbProximal:{x:0,y:0,z:0},
        LeftThumbIntermediate:{x:0,y:0,z:0},
        LeftThumbDistal:{x:0,y:0,z:0},
        
        LeftLittleProximal:{x:0,y:0,z:0},
        LeftLittleIntermediate:{x:0,y:0,z:0},
        LeftLittleDistal:{x:0,y:0,z:0}
      }
    }
  },
  friend: {
    id:'friend',
    live2d:null,
    coords:{x:.5,y:window.innerWidth > 600 ? .7 : .55},
    currentExp:0,
    expressions:[],
    zoom:.5,
    destroying:false,
    detected:false,
    tracking:{
      head:{x:0,y:0,z:0},
      mouth:{x:0,y:0},
      eye:{l:1,r:1},
      brow:0,
      pupil:{x:0,y:0}
    }
  }
})
export const userExps = writable({
  current:null,
  list:[]
});

export const hoverOver = writable(null);
</script>

<script>
    import {onMount} from 'svelte'
    import * as THREE from 'three';
    import { VRM,VRMSchema,VRMUtils } from '@pixiv/three-vrm';
    import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
    import { clamp,remap } from "../utils/helpers.js";
    import Vector from '../utils/vector.js';
    import faceMap from '../utils/faceMap/faceMap.js'
    import {animateHead,animateFace,animateArm,animateFingers} from './charRigger.svelte';
    export let scene
    export let renderer
    export let camera  
    export let onWindowResize
    export let composer
    export let bgTexture
  
  onMount(async()=>{
    userModel.subscribe(e=>{
      if(e){
        console.log(e)
        load($profiles.user,e.url)
      }
    })
  })
  
  // gltf and vrm
			const loader = new GLTFLoader();
			loader.crossOrigin = 'anonymous';
  
  function load( profile , url ) {

				loader.crossOrigin = 'anonymous';
				loader.load(

					url,

					( gltf ) => {

						VRMUtils.removeUnnecessaryJoints( gltf.scene );

						VRM.from( gltf ).then( ( vrm ) => {
							if ( profile.model ) {
								scene.remove( profile.model.scene );
								profile.model.dispose();
							}

              // currentVrm = vrm;
							scene.add( vrm.scene );

							vrm.humanoid.getBoneNode( VRMSchema.HumanoidBoneName.Hips ).rotation.y = Math.PI;
       
							console.log( vrm );
              console.log(vrm.lookAt)

							profile.model = vrm;
              //create thumbnail
              $modelList.forEach((e,i)=>{
                if(e.url === url){

                  if(!e.icon && typeof OffscreenCanvas !== "undefined"){
                    try {
                      VRMUtils.extractThumbnailBlob( renderer, vrm, 256 ).then( ( blob ) => {

                        var reader = new FileReader();
                          reader.onload = function(e) {
                            let objectURL = e.target.result
                            $modelList[i].icon = objectURL
                            $modelList[i].color = null
                            console.log($modelList)
                          };  
                        reader.readAsDataURL(blob);

                      } );
                    }
                    catch(err) {
                      console.error(err);
                    }
                  }
                }
              })
              
              

						} );

					},

					( progress ) => console.log( 'Loading model...', 100.0 * ( progress.loaded / progress.total ), '%' ),

					( error ) => console.error( error )

				);

			}
  
  
  
  


			// helpers
			const gridHelper = new THREE.GridHelper( 10, 10 );
			const axesHelper = new THREE.AxesHelper( 5 );
			// scene.add(gridHelper, axesHelper );

			// animate
			const clock = new THREE.Clock();

			function animate() {

				requestAnimationFrame( animate );

				const deltaTime = clock.getDelta();
        // console.log($profiles.user)
        
       if(bgTexture && bgTexture.image){
        const canvasAspect = window.innerWidth / window.innerHeight;
        const imageAspect = bgTexture.image.width / bgTexture.image.height;
        const aspect = imageAspect / canvasAspect;
        bgTexture.offset.x = aspect > 1 ? (1 - 1 / aspect) / 2 : 0;
        bgTexture.repeat.x = aspect > 1 ? 1 / aspect : 1;

        bgTexture.offset.y = aspect > 1 ? 0 : (1 - aspect) / 2;
        bgTexture.repeat.y = aspect > 1 ? 1 : aspect;
       }
        
        let currentVrm = $profiles.user.model

				if ( currentVrm ) {
          
					// tweak bones
					let s = Math.sin( Math.PI * clock.elapsedTime ); // -1 _ 1 idle oscillation
          
					currentVrm.humanoid.getBoneNode( VRMSchema.HumanoidBoneName.Neck ).rotation.y = clamp(($profiles.user.tracking.head.x/50),-.6,.6); //turn LR
          currentVrm.humanoid.getBoneNode( VRMSchema.HumanoidBoneName.Neck ).rotation.x = clamp(($profiles.user.tracking.head.y/90),-.3,.3); //lean forward/back
          currentVrm.humanoid.getBoneNode( VRMSchema.HumanoidBoneName.Neck ).rotation.z = clamp(($profiles.user.tracking.head.z/90),-.3,.3); //lean side to side
          
//           currentVrm.humanoid.getBoneNode( VRMSchema.HumanoidBoneName.UpperChest ).rotation.y = clamp(($profiles.user.tracking.head.x/50*.2),-.3,.3);
//           currentVrm.humanoid.getBoneNode( VRMSchema.HumanoidBoneName.UpperChest ).rotation.x = clamp(($profiles.user.tracking.head.y/90*.2),-.3,.3);
//           currentVrm.humanoid.getBoneNode( VRMSchema.HumanoidBoneName.UpperChest ).rotation.z = clamp(($profiles.user.tracking.head.z/90*.8),-.3,.3);
          
          currentVrm.humanoid.getBoneNode( VRMSchema.HumanoidBoneName.Chest ).rotation.y = clamp(($profiles.user.tracking.head.x/50*.2),-.3,.3);
          currentVrm.humanoid.getBoneNode( VRMSchema.HumanoidBoneName.Chest ).rotation.x = clamp(($profiles.user.tracking.head.y/50*.2),-.5,.5);
          currentVrm.humanoid.getBoneNode( VRMSchema.HumanoidBoneName.Chest ).rotation.z = clamp(($profiles.user.tracking.head.z/90*.2),-.3,.3);

          currentVrm.humanoid.getBoneNode( VRMSchema.HumanoidBoneName.Spine ).rotation.y = clamp(($profiles.user.tracking.head.x/50*.2),-.3,.3);
          currentVrm.humanoid.getBoneNode( VRMSchema.HumanoidBoneName.Spine ).rotation.x = clamp(($profiles.user.tracking.head.y/50*.2),-.5,.5);
          currentVrm.humanoid.getBoneNode( VRMSchema.HumanoidBoneName.Spine ).rotation.z = clamp(($profiles.user.tracking.head.z/90*.2),-.3,.3);
  
          

          // tweak blend shapes
          let headTurn = 1-((clamp(Math.abs($profiles.user.tracking.head.x)-12,0,6))/6) //compensate for wrong geometry
          let mouthX = clamp($profiles.user.tracking.mouth.x-.5,0,.5)/.5*headTurn
          let mouthY = $profiles.user.tracking.mouth.y
          // let limiterUpper = (clamp(mouthY,.7,1) - .7)/.3
          let limiterUpper = remap(mouthY,.7,1)

          // let limiterLower = clamp(mouthY,0,.3)/.3
          let limiterLower = remap(mouthY,0,.3)

          let ratioI = mouthX
          let ratioA = mouthY * (1-ratioI)
          let ratioU = mouthY*clamp(ratioI,.7,1)*.3*.2

          //Eyes
          let stabilizedEye = $profiles.user.tracking.eye
          //Joy based on mouth X + eye closed ratio
          let joy = clamp(mouthX,0,1)*1.2
          joy *= stabilizedEye.l !== stabilizedEye.r ? 0 : (1-remap(stabilizedEye.l,.3,.6))
          
          //handle Wink
          if(stabilizedEye.l !== stabilizedEye.r){
            stabilizedEye.l = clamp(1-stabilizedEye.l,0,1)
            stabilizedEye.r = clamp(1-stabilizedEye.r,0,1)
            joy = 0
            currentVrm.blendShapeProxy.setValue( VRMSchema.BlendShapePresetName.Blink, 0 )
            currentVrm.blendShapeProxy.setValue( VRMSchema.BlendShapePresetName.BlinkL, stabilizedEye.l )
					  currentVrm.blendShapeProxy.setValue( VRMSchema.BlendShapePresetName.BlinkR, stabilizedEye.r )
          }else{
            let singleBlink = clamp((1-stabilizedEye.l)-joy,0,1)
            currentVrm.blendShapeProxy.setValue( VRMSchema.BlendShapePresetName.Blink, singleBlink)
            currentVrm.blendShapeProxy.setValue( VRMSchema.BlendShapePresetName.BlinkL, 0)
					  currentVrm.blendShapeProxy.setValue( VRMSchema.BlendShapePresetName.BlinkR, 0)
          }

          //Mouth Shape
          currentVrm.blendShapeProxy.setValue( VRMSchema.BlendShapePresetName.Joy, joy)

          currentVrm.blendShapeProxy.setValue( VRMSchema.BlendShapePresetName.I, ratioI );
          currentVrm.blendShapeProxy.setValue( VRMSchema.BlendShapePresetName.A, ratioA );
          currentVrm.blendShapeProxy.setValue( VRMSchema.BlendShapePresetName.U, ratioU );
          
          //PUPILS
          currentVrm.lookAt.applyer.lookAt(new THREE.Euler( 2 * $profiles.user.tracking.pupil.y, 2 * $profiles.user.tracking.pupil.x, 0, 'XYZ' ))
          
          
             for (let i=0; i<2; i++){
            let side = i===0 ? 'Right' : 'Left'
            let invert = i===0 ? 1 : -1 //needs inversion based on left/right side
                      
               currentVrm.humanoid.getBoneNode( VRMSchema.HumanoidBoneName[side+'UpperArm'] ).rotation.z = 
              clamp($profiles.user.tracking.pose[side+'UpperArm'].z * -2.3, -1.3,1.3) * invert ;
            currentVrm.humanoid.getBoneNode( VRMSchema.HumanoidBoneName[side+'UpperArm'] ).rotation.y =
              clamp($profiles.user.tracking.pose[side+'UpperArm'].y * 2.3, 0, 1.3) * invert;
             currentVrm.humanoid.getBoneNode( VRMSchema.HumanoidBoneName[side+'UpperArm'] ).rotation.x =
              clamp($profiles.user.tracking.pose[side+'UpperArm'].x * .5, -1.3, 1.3) * invert;
  
            
            currentVrm.humanoid.getBoneNode( VRMSchema.HumanoidBoneName[side+'LowerArm'] ).rotation.z = $profiles.user.tracking.pose[side+'LowerArm'].z * -2.3 * invert ;
            currentVrm.humanoid.getBoneNode( VRMSchema.HumanoidBoneName[side+'LowerArm'] ).rotation.y =$profiles.user.tracking.pose[side+'LowerArm'].y * 2.3 * invert; 
            currentVrm.humanoid.getBoneNode( VRMSchema.HumanoidBoneName[side+'LowerArm'] ).rotation.x =$profiles.user.tracking.pose[side+'LowerArm'].x * 2.3; 
            

            currentVrm.humanoid.getBoneNode( VRMSchema.HumanoidBoneName[side+'Hand'] ).rotation.z = $profiles.user.tracking.pose[side+'Hand'].z * -2.3 * invert ;
            currentVrm.humanoid.getBoneNode( VRMSchema.HumanoidBoneName[side+'Hand'] ).rotation.x = $profiles.user.tracking.pose[side+'Hand'].x * -2.3 * invert ;
            

            let digits = ['Ring','Index','Little','Thumb','Middle']
            let segments = ['Proximal','Intermediate','Distal']
            digits.forEach(e=>{
              segments.forEach(j=>{
                let isThumb = e==='Thumb' ? -1 : 1;
                if(e==='Thumb'){
                  let dampener = j === 'Proximal' ? .5 
                    : j === 'Intermediate' ? .5 
                    : 1
                  currentVrm.humanoid.getBoneNode( VRMSchema.HumanoidBoneName[side+e+j] ).rotation.z = clamp($profiles.user.tracking.hand[side+e+j].z * -Math.PI*dampener  * invert,-2.3,2.3);
            currentVrm.humanoid.getBoneNode( VRMSchema.HumanoidBoneName[side+e+j] ).rotation.x = clamp($profiles.user.tracking.hand[side+e+j].z * -Math.PI*dampener,-2.3,2.3);
            currentVrm.humanoid.getBoneNode( VRMSchema.HumanoidBoneName[side+e+j] ).rotation.y = clamp($profiles.user.tracking.hand[side+e+j].z * -Math.PI*dampener  * invert,-2.3,2.3);
                  
                }else{
                  currentVrm.humanoid.getBoneNode( VRMSchema.HumanoidBoneName[side+e+j] ).rotation.z = clamp($profiles.user.tracking.hand[side+e+j].z * -Math.PI * invert,side==="Right" ? -2.3 : 0,side==="Right" ? 0 : 2.3);
            currentVrm.humanoid.getBoneNode( VRMSchema.HumanoidBoneName[side+e+j] ).rotation.z = clamp($profiles.user.tracking.hand[side+e+j].z * -Math.PI * invert,side==="Right" ? -2.3 : 0,side==="Right" ? 0 : 2.3); 
            currentVrm.humanoid.getBoneNode( VRMSchema.HumanoidBoneName[side+e+j] ).rotation.z = clamp($profiles.user.tracking.hand[side+e+j].z * -Math.PI*invert,side==="Right" ? -2.3 : 0,side==="Right" ? 0 : 2.3);
                }
           
              })
            })
            
          currentVrm.humanoid.getBoneNode( VRMSchema.HumanoidBoneName[side+'UpperLeg'] ).rotation.x = clamp(($profiles.user.tracking.head.y/90),-1,0)*-.1*5;   
          currentVrm.humanoid.getBoneNode( VRMSchema.HumanoidBoneName[side+'LowerLeg'] ).rotation.x = clamp(($profiles.user.tracking.head.y/90),-1,0)*.2*5; 
          currentVrm.humanoid.getBoneNode( VRMSchema.HumanoidBoneName[side+'Foot'] ).rotation.x = clamp(($profiles.user.tracking.head.y/90),-1,0)*-.1*5; 
            
          }
          
          currentVrm.humanoid.getBoneNode( VRMSchema.HumanoidBoneName.Hips ).position.y = currentVrm.humanoid.restPose.hips.position[1] - clamp(($profiles.user.tracking.head.y/90),-1,0)*-.007*5;   
          
          
          
          
          
					// update vrm
					currentVrm.update( deltaTime );

				}

				renderer.render( scene, camera );
        	composer.render();

			}

			animate();
  
//           currentVrm.humanoid.getBoneNode( VRMSchema.HumanoidBoneName.UpperChest ).rotation.y = clamp(($profiles.user.tracking.pose.Spine.x/50*.2),-.3,.3);
//           currentVrm.humanoid.getBoneNode( VRMSchema.HumanoidBoneName.UpperChest ).rotation.x = clamp(($profiles.user.tracking.pose.Spine.y/90*.2),-.3,.3);
//           currentVrm.humanoid.getBoneNode( VRMSchema.HumanoidBoneName.UpperChest ).rotation.z = clamp(($profiles.user.tracking.pose.Spine.z/90*.8),-.3,.3);
          
//           currentVrm.humanoid.getBoneNode( VRMSchema.HumanoidBoneName.Chest ).rotation.y = clamp(($profiles.user.tracking.pose.Spine.x/50*.2),-.3,.3);
//           currentVrm.humanoid.getBoneNode( VRMSchema.HumanoidBoneName.Chest ).rotation.x = clamp(($profiles.user.tracking.pose.Spine.y/50*.2),-.5,.5);
//           currentVrm.humanoid.getBoneNode( VRMSchema.HumanoidBoneName.Chest ).rotation.z = clamp(($profiles.user.tracking.pose.Spine.z/90*.2),-.3,.3);

//           currentVrm.humanoid.getBoneNode( VRMSchema.HumanoidBoneName.Spine ).rotation.y = clamp(($profiles.user.tracking.pose.Spine.x/50*.5),-.3,.3);
//           currentVrm.humanoid.getBoneNode( VRMSchema.HumanoidBoneName.Spine ).rotation.x = clamp(($profiles.user.tracking.pose.Spine.y/50*.5),-.5,.5);
//           currentVrm.humanoid.getBoneNode( VRMSchema.HumanoidBoneName.Spine ).rotation.z = clamp(($profiles.user.tracking.pose.Spine.z/90*.5),-.3,.3);
          
          //update position for walking
          // currentVrm.humanoid.getBoneNode( VRMSchema.HumanoidBoneName.Hips ).position.x = clamp(($profiles.user.tracking.pose.Hips.position.x * -1.2),-3,3); 
          // currentVrm.humanoid.getBoneNode( VRMSchema.HumanoidBoneName.Hips ).position.z = clamp(($profiles.user.tracking.pose.Hips.position.z * -1.2),-3,3); 
          
          // currentVrm.humanoid.getBoneNode( VRMSchema.HumanoidBoneName.Hips ).rotation.y = clamp(($profiles.user.tracking.pose.Hips.rotation.x* -2.3),-.3,.3); 
          // currentVrm.humanoid.getBoneNode( VRMSchema.HumanoidBoneName.Hips ).rotation.x = clamp(($profiles.user.tracking.pose.Hips.rotation.z* -2.3),-.3,.3); 
          // currentVrm.humanoid.getBoneNode( VRMSchema.HumanoidBoneName.Hips ).rotation.z = clamp(($profiles.user.tracking.pose.Hips.rotation.y* -2.3),-.3,.3); 
</script>



