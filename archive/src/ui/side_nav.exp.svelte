<script>
  import { fade, fly } from 'svelte/transition';
  import { cubicInOut } from "svelte/easing"; 
  import {DIM} from '../stores.js'
  import {userExps} from '../scene/character.svelte'
  import {profiles} from '../scene/profiles.svelte'
  let expOrder = {
    'normal':[],'surprised':[],'angry':[],'sad':[],'blushing':[],'misc':[]
  }
  
  const reorderExpressions = (exps) => {
    let newOrder = {
      'normal':[],'surprised':[],'angry':[],'sad':[],'blushing':[],'misc':[]
    }
    exps.list.forEach((e,i)=>{
      let expName = e.Name || e.name || i
      switch(true) {
        case (/normal/i).test(expName):
            newOrder.normal.push(expName);
          break;
        case (/surprised/i).test(expName):
            newOrder.surprised.push(expName);
          break;
        case (/angry/i).test(expName):
            newOrder.angry.push(expName);
          break;
        case (/sad/i).test(expName):
            newOrder.sad.push(expName);
          break;
        case (/blushing/i).test(expName):
            newOrder.blushing.push(expName);
          break;
        default:
          newOrder.misc.push(expName);
        }
    })
    return newOrder
  }
  
  const findRows = (val) => {
    if(val<=2){
      return 1
    }
    return Math.round(val / 2);
  }
  
  const shouldJustifyWidth = (val,width) => {
    return (findRows(val)*78+16+16) < width
  }
  
  const shouldJustifyHeight = (val,height) => {
    return (findRows(val)*2 *78+48+48) < height
  }
  
  const setEmotion = (name) => {
    if(!$profiles.user.live2d){
      return
    }
    if(!$profiles.user.live2d.internalModel.motionManager.expressionManager){
      return
    }
    $userExps.current = name
    $profiles.user.live2d.expression(name)
  }
    
  $: {
    if($userExps.list.length>0){
      expOrder = reorderExpressions($userExps)
    }
  }
</script>

<container class="{shouldJustifyWidth($userExps.list.length,$DIM.w) ? 'justifyWidth' : ''} {shouldJustifyHeight($userExps.list.length,$DIM.h) ? 'justifyHeight' : ''}">
  <div class="exp-list"
       style="--exp-list-num:{$userExps.list.length ? findRows($userExps.list.length) : ''}"
       in:fly="{{ x: $DIM.w > 600 ? 0 : 20, y: $DIM.w > 600 ? 20 : 0, easing: cubicInOut,duration: 400, delay:200 }}" 
     out:fade="{{duration:$DIM.w > 600 ? 200 : 0}}"
       >
    {#each expOrder.normal as exp}
      <button 
        class="exp no_highlights {$userExps.current === exp ? 'selected' : ''}"
        on:click={()=>{setEmotion(exp)}}
      > 
        <i class="kalicon notranslate icon-fill"></i>
        <i class="kalicon notranslate solid">emote</i> 
      </button>
    {/each}
    {#each expOrder.surprised as exp}
      <button class="exp no_highlights {$userExps.current === exp ? 'selected' : ''}" on:click={()=>{setEmotion(exp)}}
      > 
        <i class="kalicon notranslate icon-fill"></i>
        <i class="kalicon notranslate solid">lol</i> 
      </button>
    {/each}
    {#each expOrder.angry as exp}
      <button class="exp no_highlights {$userExps.current === exp ? 'selected' : ''}" on:click={()=>{setEmotion(exp)}}
      > 
        <i class="kalicon notranslate icon-fill"></i>
        <i class="kalicon notranslate solid">angry</i> 
      </button>
    {/each}
    {#each expOrder.sad as exp}
      <button class="exp no_highlights {$userExps.current === exp ? 'selected' : ''}" on:click={()=>{setEmotion(exp)}}
      > 
        <i class="kalicon notranslate icon-fill"></i>
        <i class="kalicon notranslate solid">cry</i> 
      </button>
    {/each}
    {#each expOrder.blushing as exp}
      <button class="exp no_highlights {$userExps.current === exp ? 'selected' : ''}" on:click={()=>{setEmotion(exp)}}
      > 
        <i class="kalicon notranslate icon-fill"></i>
        <i class="kalicon notranslate solid">blush</i> 
      </button>
    {/each}
    {#each expOrder.misc as exp,i}
      <button class="exp no_highlights {$userExps.current === exp ? 'selected' : ''}" on:click={()=>{setEmotion(exp)}}
      > 
        <i class="kalicon notranslate icon-fill" style=""></i>
        <i class="numeral">{i+1}</i> 
      </button>
    {/each}
  </div>
</container>

<style>
container{
    width:100%;
    height:100%;
    position:absolute;
    overflow-x:scroll;
    z-index:1;
    display:flex;
/*     align-items:center; */
  }
.exp-list{
    --exp-list-margin-w:16px;
    --exp-list-margin-h:48px;
    --exp-list-num:0;
    width:calc(100% - var(--exp-list-margin-w) * 2);
    padding:var(--exp-list-margin-h) var(--exp-list-margin-w) var(--exp-list-margin-h) var(--exp-list-margin-w);

    align-items: center;
    justify-content:center;
    flex-direction: row;
    flex-wrap:wrap;
    align-content:flex-start;
    display: flex;
  }
  .justifyHeight .exp-list{
    align-content:center;
    flex-direction:row;
  }
  .exp{
    --exp-width: 48px;
    width: var(--exp-width);
    height: var(--exp-width);
    border-radius: 50%;
    margin: 15px;
    background-position: center;
    background-size: cover;
    position: relative;
    display:flex;
    align-items:center;
    justify-content:center;
  }
  .kalicon,.numeral{
    pointer-events:none;
  }
  .icon-fill{
    color:#00000030;
      z-index:-1;
  }
  .selected .icon-fill{
    color:#ffffff;
  }
  .numeral{
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    margin-bottom: -.375em;
    font-family:-apple-system, BlinkMacSystemFont, "Segoe UI",
               Roboto, Oxygen-Sans, Ubuntu, Cantarell,
               "Helvetica Neue", sans-serif;
  }
  .solid,.numeral{
    color:white;
  }
  .selected .solid, .selected .numeral{
    color:var(--lightBlue)
  }
  
  
  @media only screen and (max-width: 600px) {
    .exp-list{
      --exp-list-margin-h: 15px;
      flex-direction:column;
      height:calc(100% - var(--exp-list-margin-h) * 2);
      width:calc(var(--exp-list-num) * 78px);
    }
  
    container{
      display:block;
    }
    container.justifyWidth{
      display:flex;
      justify-content:center;
    }
  }
  
      @media only screen and (hover: hover) and (pointer: fine) {
        .exp:hover .icon-fill{
        cursor:pointer;
        text-shadow: 0px 0px 0px #00000030;
  }
  }
</style>