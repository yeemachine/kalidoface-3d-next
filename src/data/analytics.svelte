<script context="module">
  import{writable,get} from 'svelte/store'
  const triggeredData = writable({
    char:[],
    bg:[],
    sticker:[],
    p2pConnection:false,
    uploadedVRM:false,
    firstPerson: false,
    freeCamera:false,
    infoExpanded:false,
    toggledHolistic:false,
    toggledFacemesh:false,
    toggledFacemeshHolistic:false
  })
  
</script>
<script>
  import {options} from '../tracking/Holistic'
  import {infoExpanded} from '../stores.js'
  import {userModel} from '../scene/character.svelte'
  import {cameraConfig} from '../scene/CameraControls.svelte'
  import {p2pConnection} from '../connections/Peer.svelte'
  import {bgURL} from '../scene/bg.svelte'

  if(!window.dataLayer){
    window.dataLayer = []
  }
  
  options.subscribe(e=>{
    if(e.face.running && !$triggeredData.toggledFacemesh){
      dataLayer.push({'event':'toggledFacemesh','conversionValue':true});
      $triggeredData.toggledFacemesh = true
    }
    if(e.holistic.running && !$triggeredData.toggledHolistic){
      dataLayer.push({'event':'toggledHolistic','conversionValue':true});
      $triggeredData.toggledHolistic = true
    }
    if(e.face.running && e.holistic.running && !$triggeredData.toggledFacemeshHolistic){
      dataLayer.push({'event':'toggledFacemeshHolistic','conversionValue':true});
      $triggeredData.toggledFacemeshHolistic = true
    }
  })
  
  infoExpanded.subscribe(e=>{
    if(e && !$triggeredData.infoExpanded){
      dataLayer.push({'event':'infoExpanded','conversionValue':true});
      $triggeredData.infoExpanded = true
    }
  })
  
  userModel.subscribe(e=>{
    if(e && e.type === "blob" && !$triggeredData.uploadedVRM){
      dataLayer.push({'event':'uploadedVRM','conversionValue':true});
      $triggeredData.uploadedVRM = true
      return
    }
    if(e && e.type === "url" && !$triggeredData.char.includes(e.name)){
      dataLayer.push({'event':'char','conversionValue':e.name});
      $triggeredData.char.push(e.name)
    }
    
  })
  
  bgURL.subscribe(e=>{
    if(e && e.type === 'img' && e.pano && !$triggeredData.bg.includes(e.url)){
      dataLayer.push({'event':'bg','conversionValue':e.url.includes('blob:') ? 'customBG' : e.url});
      $triggeredData.bg.push(e.url)
    }
    if(e && e.type === 'color' && !$triggeredData.bg.includes(e.url)){
      dataLayer.push({'event':'bg','conversionValue':e.url});
      $triggeredData.bg.push(e.url)
    }
    if(e && e.type === 'iro' && !$triggeredData.bg.includes('iro')){
      dataLayer.push({'event':'bg','conversionValue':'iro'});
      $triggeredData.bg.push('iro')
    }
  })
  
  cameraConfig.subscribe(e=>{
    if(e.freeCamera && !$triggeredData.freeCamera){
      dataLayer.push({'event':'freeCamera','conversionValue':true});
      $triggeredData.freeCamera = true
    }
    if(e.freeCamera && e.firstPerson && !$triggeredData.firstPerson){
      dataLayer.push({'event':'firstPerson','conversionValue':true});
      $triggeredData.firstPerson = true
    }
  })
  
  p2pConnection.subscribe(e=>{
    if(e && !$triggeredData.p2pConnection){
      dataLayer.push({'event':'p2pConnection','conversionValue':true});
      $triggeredData.p2pConnection = true
    }
  })
</script>