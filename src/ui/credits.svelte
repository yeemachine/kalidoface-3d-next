<script>
  import {onMount} from 'svelte'
  import { fly,fade,scale } from 'svelte/transition';
  import { cubicInOut } from "svelte/easing"; 
  import Card from '../components/Card.svelte';
  import CardSwipe from '../components/CardSwipe.svelte';
  import {infoExpanded,largeWipe,setLang} from '../stores.js'
  import {cardText,cardEndText} from '../text/translations.js';
  import {presetModels} from '../scene/character.svelte'
  
  const handleInfo = e => {
  // e.preventDefault()
  if(!$largeWipe.transition){
    infoExpanded.set(!$infoExpanded)
  }
}
</script>

<container>
  <a 
     in:scale="{{ delay:500, duration: 600, easing: cubicInOut, baseScale: 0.9 }}"
     out:fade="{{duration: 200}}"
     href='https://ko-fi.com/B0B75DIY1' target='_blank' style="position:absolute;left:16px;bottom:16px"><img height='36' style='border:0px;height:36px;width:auto' src='https://cdn.glitch.com/239c5934-4d83-4c5c-bef6-44dcdb04c8fb%2Fkofi.png?v=1626708861780' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>
  
  <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
 <symbol id="svg-icon-twitter" title="Twitter" viewBox="0 0 512 512">
  <path d="M419.6 168.6c-11.7 5.2-24.2 8.7-37.4 10.2 13.4-8.1 23.8-20.8 28.6-36 -12.6 7.5-26.5 12.9-41.3 15.8 -11.9-12.6-28.8-20.6-47.5-20.6 -42 0-72.9 39.2-63.4 79.9 -54.1-2.7-102.1-28.6-134.2-68 -17 29.2-8.8 67.5 20.1 86.9 -10.7-0.3-20.7-3.3-29.5-8.1 -0.7 30.2 20.9 58.4 52.2 64.6 -9.2 2.5-19.2 3.1-29.4 1.1 8.3 25.9 32.3 44.7 60.8 45.2 -27.4 21.4-61.8 31-96.4 27 28.8 18.5 63 29.2 99.8 29.2 120.8 0 189.1-102.1 185-193.6C399.9 193.1 410.9 181.7 419.6 168.6z"
  />
</symbol>
 <symbol id="svg-icon-github" title="GitHub" viewBox="0 0 512 512">
    <path d="M256 70.7c-102.6 0-185.9 83.2-185.9 185.9 0 82.1 53.3 151.8 127.1 176.4 9.3 1.7 12.3-4 12.3-8.9V389.4c-51.7 11.3-62.5-21.9-62.5-21.9 -8.4-21.5-20.6-27.2-20.6-27.2 -16.9-11.5 1.3-11.3 1.3-11.3 18.7 1.3 28.5 19.2 28.5 19.2 16.6 28.4 43.5 20.2 54.1 15.4 1.7-12 6.5-20.2 11.8-24.9 -41.3-4.7-84.7-20.6-84.7-91.9 0-20.3 7.3-36.9 19.2-49.9 -1.9-4.7-8.3-23.6 1.8-49.2 0 0 15.6-5 51.1 19.1 14.8-4.1 30.7-6.2 46.5-6.3 15.8 0.1 31.7 2.1 46.6 6.3 35.5-24 51.1-19.1 51.1-19.1 10.1 25.6 3.8 44.5 1.8 49.2 11.9 13 19.1 29.6 19.1 49.9 0 71.4-43.5 87.1-84.9 91.7 6.7 5.8 12.8 17.1 12.8 34.4 0 24.9 0 44.9 0 51 0 4.9 3 10.7 12.4 8.9 73.8-24.6 127-94.3 127-176.4C441.9 153.9 358.6 70.7 256 70.7z"/>
    </symbol>
    <symbol id="svg-icon-instagram" title="Instagram" viewBox="0 0 512 512">
  <path d="M256 109.3c47.8 0 53.4 0.2 72.3 1 17.4 0.8 26.9 3.7 33.2 6.2 8.4 3.2 14.3 7.1 20.6 13.4 6.3 6.3 10.1 12.2 13.4 20.6 2.5 6.3 5.4 15.8 6.2 33.2 0.9 18.9 1 24.5 1 72.3s-0.2 53.4-1 72.3c-0.8 17.4-3.7 26.9-6.2 33.2 -3.2 8.4-7.1 14.3-13.4 20.6 -6.3 6.3-12.2 10.1-20.6 13.4 -6.3 2.5-15.8 5.4-33.2 6.2 -18.9 0.9-24.5 1-72.3 1s-53.4-0.2-72.3-1c-17.4-0.8-26.9-3.7-33.2-6.2 -8.4-3.2-14.3-7.1-20.6-13.4 -6.3-6.3-10.1-12.2-13.4-20.6 -2.5-6.3-5.4-15.8-6.2-33.2 -0.9-18.9-1-24.5-1-72.3s0.2-53.4 1-72.3c0.8-17.4 3.7-26.9 6.2-33.2 3.2-8.4 7.1-14.3 13.4-20.6 6.3-6.3 12.2-10.1 20.6-13.4 6.3-2.5 15.8-5.4 33.2-6.2C202.6 109.5 208.2 109.3 256 109.3M256 77.1c-48.6 0-54.7 0.2-73.8 1.1 -19 0.9-32.1 3.9-43.4 8.3 -11.8 4.6-21.7 10.7-31.7 20.6 -9.9 9.9-16.1 19.9-20.6 31.7 -4.4 11.4-7.4 24.4-8.3 43.4 -0.9 19.1-1.1 25.2-1.1 73.8 0 48.6 0.2 54.7 1.1 73.8 0.9 19 3.9 32.1 8.3 43.4 4.6 11.8 10.7 21.7 20.6 31.7 9.9 9.9 19.9 16.1 31.7 20.6 11.4 4.4 24.4 7.4 43.4 8.3 19.1 0.9 25.2 1.1 73.8 1.1s54.7-0.2 73.8-1.1c19-0.9 32.1-3.9 43.4-8.3 11.8-4.6 21.7-10.7 31.7-20.6 9.9-9.9 16.1-19.9 20.6-31.7 4.4-11.4 7.4-24.4 8.3-43.4 0.9-19.1 1.1-25.2 1.1-73.8s-0.2-54.7-1.1-73.8c-0.9-19-3.9-32.1-8.3-43.4 -4.6-11.8-10.7-21.7-20.6-31.7 -9.9-9.9-19.9-16.1-31.7-20.6 -11.4-4.4-24.4-7.4-43.4-8.3C310.7 77.3 304.6 77.1 256 77.1L256 77.1z"
  />
  <path d="M256 164.1c-50.7 0-91.9 41.1-91.9 91.9s41.1 91.9 91.9 91.9 91.9-41.1 91.9-91.9S306.7 164.1 256 164.1zM256 315.6c-32.9 0-59.6-26.7-59.6-59.6s26.7-59.6 59.6-59.6 59.6 26.7 59.6 59.6S288.9 315.6 256 315.6z" />
  <circle cx="351.5" cy="160.5" r="21.5" />
</symbol>
  </svg>
  
  <div in:fly="{{ y: 20, easing: cubicInOut,duration: 400, delay:200 }}" 
     out:fly="{{y: 20,easing: cubicInOut,duration: 400}}">
    
  <CardSwipe>
    <Card styles="{'align-items:flex-end;--theme-color:var(--theme0);--text-color:var(--text0);'}" isCurrent={true}>
       <h2 class="notranslate" in:fade="{{easing: cubicInOut,duration: 400, delay:400 }}">
        kalidoface
      </h2>
        <h3 
         in:fade="{{easing: cubicInOut,duration: 400, delay:500 }}">
        {@html cardText[0][$setLang]}
      </h3>
            <svg 
                 in:fade="{{easing: cubicInOut,duration: 400, delay:600 }}"
                 class='appIcon' width="360" height="360" viewBox="0 0 360 360" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="360" height="360" fill="white" rx="185"/>
      <path d="M271.948 68.424C244.096 52.7124 211.801 46.7834 180.499 50.6249C199.465 52.9571 218.012 58.8861 234.92 68.424C268.203 87.9348 289.627 129.635 289.627 178.604C289.627 227.955 268.586 269.655 234.92 289.165C217.773 298.819 199.377 304.834 180.633 307.215C211.772 311.157 243.57 305.143 271.948 289.165C305.614 269.655 326.655 227.955 326.655 178.604C326.655 129.635 305.232 87.9348 271.948 68.424Z" fill="#82CEF6"/>
      <path d="M70.3352 178.986C70.3352 129.635 91.7591 87.9348 125.808 68.424C142.86 58.8861 161.496 52.9571 180.498 50.6249C149.255 46.7834 116.869 52.7124 88.7788 68.424C54.7303 87.9348 33.3066 129.635 33.3066 178.986C33.3066 227.955 54.7303 270.419 88.7788 289.165C117.634 305.143 149.611 311.157 180.633 307.215C161.818 304.834 143.243 298.819 125.808 289.165C91.7591 270.419 70.3352 227.955 70.3352 178.986Z" fill="#4450F3"/>
      <path d="M289.626 178.604C289.626 129.635 268.203 87.935 234.919 68.4241C218.011 58.8862 199.465 52.9572 180.498 50.625C161.496 52.9572 142.86 58.8862 125.807 68.4241C91.7588 87.935 70.335 129.635 70.335 178.986C70.335 227.955 91.7588 270.42 125.807 289.165C143.242 298.82 161.817 304.834 180.633 307.215C199.377 304.834 217.772 298.82 234.919 289.165C268.585 269.655 289.626 227.955 289.626 178.604Z" fill="#1A9EF3"/>
      <path d="M289.626 178.604C289.626 129.635 268.203 87.935 234.919 68.4241C218.011 58.8862 199.465 52.9572 180.498 50.625C161.496 52.9572 142.86 58.8862 125.807 68.4241C91.7588 87.935 70.335 129.635 70.335 178.986C70.335 227.955 91.7588 270.42 125.807 289.165C143.242 298.82 161.817 304.834 180.633 307.215C199.377 304.834 217.772 298.82 234.919 289.165C268.585 269.655 289.626 227.955 289.626 178.604Z" fill="#1A9EF3"/>
      <path class="rect" d="M202.885 190.052C198.563 187.061 189.588 185.399 179.948 185.399C170.308 185.399 161.333 187.061 157.012 190.052C152.358 193.044 156.014 211.992 158.341 216.978C162.995 225.621 171.305 230.275 179.948 230.275C188.591 230.275 196.901 225.621 201.555 216.978C203.882 211.992 207.539 193.044 202.885 190.052ZM234.797 174.761C224.492 174.761 216.181 180.412 216.181 187.393C216.181 194.374 224.492 200.025 234.797 200.025C244.769 200.025 253.079 194.374 253.079 187.393C253.079 180.412 244.769 174.761 234.797 174.761ZM125.1 174.761C115.127 174.761 106.817 180.412 106.817 187.393C106.817 194.374 115.127 200.025 125.1 200.025C135.405 200.025 143.715 194.374 143.715 187.393C143.715 180.412 135.405 174.761 125.1 174.761ZM230.475 159.803C240.78 166.451 239.783 153.487 230.475 145.176C224.159 139.858 216.181 139.858 210.198 145.176C200.558 153.487 199.561 166.451 210.198 159.803C216.181 155.481 224.159 155.481 230.475 159.803ZM149.698 145.176C143.715 139.858 135.737 139.858 129.421 145.176C120.113 153.487 119.116 166.451 129.421 159.803C135.737 155.481 143.715 155.481 149.698 159.803C160.336 166.451 159.338 153.487 149.698 145.176Z" fill="white"/>
      </svg>
   
    
    </Card>
    <Card styles="{'var(--theme1);--text-color:var(--text2)'}" >
      <img src="https://raw.githubusercontent.com/yeemachine/kalidoface-live2d-models/main/gif/intro.gif"/>
      <p class="instr">{@html cardText[1][$setLang]}</p>
    </Card> 
    <Card styles="{'--theme-color:var(--theme1);--text-color:var(--text2);'}">
      <img src="https://raw.githubusercontent.com/yeemachine/kalidoface-live2d-models/main/gif/charupload.gif"/>
      <p class="instr">{@html cardText[2][$setLang]}</p>
    </Card>
    <Card styles="{'--theme-color:var(--theme1);--text-color:var(--text2);'}">
      <img src="https://raw.githubusercontent.com/yeemachine/kalidoface-live2d-models/main/gif/friends.gif"/>
      <p class="instr">{@html cardText[3][$setLang]}</p>
    </Card>
    <Card styles="{'--theme-color:var(--theme1);--text-color:var(--text2);'}">
      <img src="https://raw.githubusercontent.com/yeemachine/kalidoface-live2d-models/main/gif/backgrounds.gif"/>
      <p class="instr">{@html cardText[4][$setLang]}</p>
    </Card>
      <Card styles="{'--theme-color:var(--theme4);--text-color:var(--text2);'}">
        <h2 class="notranslate" style="color:var(--accent1)">kalidoface</h2>
                <section>

      <h4 style="color:var(--accent1);">{cardText[5].header[$setLang]}</h4>

                  <p>{@html cardText[5].p[$setLang]}</p>
                  </section>

      <div class="soc">
     <a href="https://github.com/yeemachine"><span class="icon github"><svg><use xlink:href="#svg-icon-github" /></svg></span></a>
         <a href="https://instagram.com/yeemachine"><span class="icon github"><svg><use xlink:href="#svg-icon-instagram" /></svg></span></a>
         <a href="https://twitter.com/yeemachine"><span class="icon github"><svg><use xlink:href="#svg-icon-twitter" /></svg></span></a>
        
      </div>
    </Card>
     <Card styles="{'--theme-color:var(--theme4);--text-color:var(--text2);'}">
      <h2 class="notranslate" style="color:var(--accent1)">kalidoface</h2>
       <div>
          <h4 style="color:var(--accent1);">{cardText[6].header[$setLang]}</h4>
         <p>{cardText[6].p[$setLang]}</p>
         <ul>
           <li><p><a href='https://twitter.com/hootalex'>hootalex</a></p><p>{cardText[6].list[$setLang][0]}</p></li>
           <li><p><a href='https://pixiv.github.io/three-vrm/docs/'>Pixiv</a></p><p>{cardText[6].list[$setLang][1]}</p></li>
           <li><p><a href='https://glitch.com'>Glitch</a></p><p>{cardText[6].list[$setLang][2]}</p></li>
           <li><p><a href='https://google.github.io/mediapipe/'>Google MediaPipe</a></p><p>{cardText[6].list[$setLang][3]}</p></li>
           <li><p><a href='https://hub.vroid.com/'>Tensorflow.js</a></p><p>{cardText[6].list[$setLang][4]}</p></li>
         </ul>      
       </div>
       <div></div>
   
    </Card>
    <Card styles="{'--theme-color:var(--theme4);--text-color:var(--text2);'}">
      <h2 class="notranslate" style="color:var(--accent1)">kalidoface</h2>
       <div>
          <h4 style="color:var(--accent1);">{cardText[7].header[$setLang]}</h4>
         <p>{cardText[7].p[$setLang]}</p>
         <ul>
           {#each presetModels as model}
           <li class="modelCredit">
             <p style="display:flex;align-items: center;">
             <img src={model.icon}/>
             <a href={model.source}>{model.name}</a>
             </p>
             <p>
               {model.author}
             </p>
             </li>
           {/each}
         </ul>      
       </div>
       <div></div>
   
    </Card>
    <Card styles="{'--theme-color:var(--theme4);--text-color:var(--text2);'}">
      <h2 class="notranslate" style="color:var(--accent1)">kalidoface</h2>
       <div>
          <h3 style="color:var(--accent1);">{cardText[8].header[$setLang]}</h3>
<!--          <p>{cardText[8].p[$setLang]}</p>-->
       </div>
       <div></div>
   
    </Card>
    <button class="launch" on:click={handleInfo}>
        {cardEndText.close[$setLang]}
        <i  
         class="kalicon notranslate focus">jellyfill</i>
        <i 
          class="kalicon notranslate shadow">jellyfill</i>
    </button>
  </CardSwipe>
   
    
      </div>

   
</container>

<style>


  .launch{
    border-radius: 50%;
    font-size: 22px;
    margin-top:60px;
    width: 200px;
    color: white;
    height: 200px;
    pointer-events: all;
    display:flex;
    align-items:center;
    justify-content:center;
    font-weight: 600;
    position:relative;
  }
  :global(.launch .kalicon){
    font-size: clamp(200px,calc(var(--maxWidth)*.9),1000px);
    margin-top: -.0525em;
    z-index: -1;
    pointer-events:none;
    font-variation-settings: "wght" 175;
    font-family: "Jelly";
    position: absolute;
    color: #363647;
    transform: scale(1);
    transition: .7s cubic-bezier(0.31, 0.06, 0.18, 0.99);
/*     text-shadow: 0px 0px 8px #00000020; */
    pointer-events: none;
    animation: jiggle 4s infinite;
    animation-timing-function: cubic-bezier(0.18, 0.41, 0.79, 0.65);
    animation-delay:-2s;
    animation-play-state: paused;
    line-height:.88;
  }
  :global(.launch .kalicon.shadow){
    animation-delay:-1s;
    color: #31303e;
    z-index: -2;
    font-size:calc(var(--maxWidth)*1.1);
  }
  :global(.done .launch .kalicon){
    animation-play-state: running;
    font-size:220px;
    color:var(--peach);
  }
  :global(.done .launch .kalicon.shadow){
    font-size: 300px;
    color: var(--lapizBlue);
  }
  :global(.done .launch:hover .kalicon.focus){
    transform:scale(1.2)
  }
  img{
    width: 100%;
    height: 50%;
    object-fit: contain;
    flex-grow: 1;
    pointer-events:none;
  }
  .soc{
    display:flex;
    justify-content:flex-end;
    width:100%;
  }
  .soc svg{
    display:block;
  }
  .icon{
    color: var(--lightBlue);
    fill: var(--lightBlue);
    width:48px;
    height:48px;
    margin-left:16px;
    position:relative;
    display: block;
  }
  .icon:hover{
    color: var(--lapizBlue);
    fill: var(--lapizBlue);
  }
  .icon svg{
    width:100%;
    height:100%;
  }
  container{
    --theme0:var(--lightBlue);
    --theme1:#ffffff;
    --theme2:#f2daea;
    --theme3:#f2eeda;
    --theme4:#e8f5fd;
    --text0:#ffffff;
    --text1:var(--offblack);
    --text2:var(--darkgrey);
    --accent2:var(--lapizBlue);
    --accent1:var(--lightBlue);
    width:100%;
    height:100%;
    position:absolute;
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;
    color:white;
    overflow:hidden;
  }
  .appIcon{
    width:40%;
    height:auto;
    max-width:calc(var(--card-h) * .2);
    position:relative;
  }
  h2,h3,h4,h5,p,ul,li,div,section,img{
    pointer-events:none;
  }
  ul{
    padding-left: 0;
    margin-bottom:0;
  }
  li{
    list-style:none;
    font-size:clamp(12px, calc(1.4vh + .25vw), 24px);
    margin-top:8px;
     display:flex;
    justify-content:space-between;
    align-items:center;
  }
  ul .modelCredit img{
    width:32px;height:32px;border-radius:50%;margin-right:16px;object-fit:unset;flex-grow: unset;
  }
  h2{
    font-family: 'Jelly';
    font-size: 28px;
    font-weight: normal;
    pointer-events:none;
    margin:0;
    color:white;
    width:100%;
  }
  h3{
    font-size: clamp(50px, calc(4vh + 4vw), 90px);
    pointer-events:none;
    margin:0;
    font-weight: 400;
    line-height: .9;
    letter-spacing: -.7px;
    width:100%;
  }
  h4{
    font-size: clamp(18px, calc(2vh + 2vw), 36px);
    font-weight: 500;
    margin-bottom: 16px;
    margin-top: 0;
    letter-spacing: -.6px;
  }
  h5{
    letter-spacing: 0px;
    font-size: 24px;
    font-weight: 500;
    color:var(--accent1);
    margin:0;
  }
  p{
    margin:0;
    font-size:clamp(12px, calc(1.4vh + .25vw), 24px);
    line-height: 1.6;
  }
/*   p.instr{
    font-size:clamp(18px, calc(2vh + 1vw), 24px);
  } */
  @media screen and (max-height: 600px){
    p{
    font-size:clamp(14px, calc(1vh + .5vw), 18px);
    }
    .icon{
      width:32px;
      height:32px;
    }
  }
  @media screen and (max-height: 360px){
    .appIcon{
      display:none;
    }
    img{
      display:none;
    }
  }
 @media screen and (max-width: 600px){
    .icon{
      width:32px;
      height:32px;
    }
     ul .modelCredit img{
      display:none;
    }
  }

  .num{
    font-variant-numeric: tabular-nums;
    letter-spacing:0px;
    font-size: 16px;
    font-weight: 700;
    color:var(--accent1);
    margin-bottom: -16px;
    z-index: 1;
/*     opacity:.5; */
/*     position:absolute; */
  }
  :global(a){
    color:var(--lightBlue);
/*     pointer-events:all; */
  }
  :global(a:hover){
    text-decoration:underline;
    color:var(--lapizBlue);
  }

  .credit{
    max-width:800px;
    width:80vw;
    display:flex;
    justify-content:space-between;
    align-items:center;
    position:relative;
    font-size:16px;
  }
  .credit::after {
      content: '';
      position:absolute;
      display: block;
      width: 0;
      height: 1px;
      bottom:0;
      background: #ffffff60;
      animation: drawAcross 0.4s 1;
      animation-timing-function: cubic-bezier(0.26, 0.3, 0.66, 0.65);
      animation-fill-mode:forwards;
  }

  .links{
    display:inline-block;
  }

  
  
</style>