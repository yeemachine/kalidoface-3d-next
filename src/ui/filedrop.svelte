<script context="module">
  import { writable } from 'svelte/store';
  export let dropzone = writable(false);
</script>
<script>
export let selected;
import {handleLive2DFiles,checkingModel,handleVrmFile} from './sub_nav.char.svelte'
import {handleBGImage} from './sub_nav.bg.svelte'
import {handleStickerImage} from './sub_nav.sticker.svelte'
import {userModel,loadingPerc,isLoading} from '../scene/character.svelte'
import {profiles} from '../scene/profiles.svelte'
import { fly } from 'svelte/transition';
import { cubicInOut } from "svelte/easing"; 
import {isZip} from '../utils/helpers.js';
  
const preventDefaults = (e) => {
  e.preventDefault()
  e.stopPropagation()
}
  
const handleDragEnter = (e) => {
  preventDefaults(e)
  e.dataTransfer.dropEffect = "copy";
  dropzone.set(true)
}

const handleDragLeave = (e) => {
  preventDefaults(e)
  dropzone.set(false)
}

const handleDragDrop = (e) => {
  preventDefaults(e)
  dropzone.set(false)
  let files = e.dataTransfer.files
  if(!files[0]){
    return
  }
  console.log(files)
  if(files[0].name.includes('.vrm') && !$profiles.user.destroying){
    handleVrmFile(files)
    return
  }
  if(selected === 'bg'){
    handleBGImage(files)
    return
  }
  if(selected !== 'bg'){
    handleStickerImage(files)
    return
  }
}

let animating = false;

</script>

<svelte:window  
      on:dragenter={handleDragEnter} 
      on:dragleave={handleDragLeave}  
      on:drop={handleDragDrop} 
      on:dragover={handleDragEnter}/>

