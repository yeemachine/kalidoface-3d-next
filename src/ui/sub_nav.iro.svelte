<script>
  import iro from '@jaames/iro';
import { fade, fly,scale } from 'svelte/transition';
import { flip } from 'svelte/animate';
import { cubicInOut } from "svelte/easing"; 
import {onMount} from 'svelte'   
import {breakpoint,DIM} from '../stores.js'

export let savedIro;
export let bgURL;
  
let colorPicker = null
let inputField = null;

const createIro = () => {
      colorPicker = new iro.ColorPicker("#picker", {
     layout: [
        { component: iro.ui.Wheel},
        { component: iro.ui.Slider},
      ],
      display:'flex',
      width: 126,
      color: $savedIro,
      borderWidth: 0,
      borderColor: "var(--offblack)",
    });
    colorPicker.forceUpdate()
    colorPicker.on('color:change', function(color) {
      savedIro.set(color.hexString)
      bgURL.set({
          type:'iro',
          url:color.hexString})
    });
}

const handleHex = (e) => {
  let newValue = inputField.value.toLowerCase().replace(/[^A-Fa-f0-9]/g, "");
  inputField.value = newValue
  if(newValue.length === 6){
    colorPicker.color.hexString = '#'+newValue
    console.log(newValue)
  }

}
onMount(()=>{
  if(!colorPicker){
    createIro()
  }
})
  
$:{
  if(colorPicker && $breakpoint){
    colorPicker.state.layoutDirection = $breakpoint === 'desktop' ? 'vertical' : 'horizontal'
    colorPicker.forceUpdate()
  }
}
</script>

 <div id="picker" 
         
      >
<div class="hex"
    
     >
  
<span class="prefix">#</span>
      <input 
             bind:this={inputField}
             value={$savedIro.replace('#','')} 
               data-length={$savedIro.length} 
               maxlength='6' 
               spellcheck="false"
               on:input="{handleHex}"
             on:paste="{handleHex}"
               placeholder='000000'
               />
</div>

</div>




<style>
    #picker{
/*     width: calc(100% + 2 * var(--bg-list-margin-w)); */
/*     background:var(--bgThemeLight); */
/*     align-items: center; */
/*     justify-content: center; */
/*     margin-top: calc(2 * var(--bg-list-margin-w)); */
    height:100%;
    width:100%;
    width:calc(100% - calc(env(safe-area-inset-left, 0px) * .5));
    padding-left:calc(env(safe-area-inset-left, 0px) * .5);
    text-align:center;
    display:flex;
    align-items:flex-start;
    justify-content:center;
    margin:16px 0 16px 0;
          flex-direction: column-reverse;
  }
  :global(.IroColorPicker){
    width:100%;
/*     height:260px; */
    flex-direction:column;
     align-items:center;
    justify-content:center;
  }
  :global(.IroWheel),:global(.IroSlider){
    pointer-events:all;
    position:relative;
  }
  .hex{
       display: flex;
    font-size: 24px;
    width: calc(100% - 26px);
    padding: 46px 12px 46px 14px;
    background: #00000020;
    border-radius: 18px;
    margin: 16px 0 16px 0;
  }
  .prefix{
    font-weight: 600;
    color:#ffffff80;
    margin-right: 2px;
  }
  
    input:hover{
    --defaultColor:var(--lapizBlue);
  }
 input {
    --defaultColor: var(--lightBlue);
    --selectedColor: white;
    font-size: 24px;
/*     letter-spacing: 0.2ch; */
    display: block;
    font-weight: 500;
    overflow: visible;
    margin: 0;
    border: none;
    border-radius: 0;
    padding: 0;
    color: white;
    background: transparent;
   width:100px;

}
  
input:focus {
  outline: none;
  color: white;
}
  
  /* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}

::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: var(--defaultColor);
  opacity: 1; /* Firefox */
}

:-ms-input-placeholder { /* Internet Explorer 10-11 */
  color: var(--defaultColor);
}

::-ms-input-placeholder { /* Microsoft Edge */
  color: var(--defaultColor);
}
  
  

  
    @media only screen and (max-width: 600px) {
   
    #picker{
      width: 170px;
      right: 0;
      height: 100%;
      border-top-left-radius: 28px;
      border-top-right-radius: 28px;
      justify-content: space-evenly;
    align-items: center;
    min-width: calc(100vw - 32px);
    flex-direction: row-reverse;
    }
      .hex{
            width: calc(39% - 18px);
      }
      
    :global(.IroColorPicker){
      width:170px;
          flex-direction: row;
      height:100%;
    }

  }
</style>