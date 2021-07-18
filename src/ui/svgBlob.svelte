<script>
export let hide = false;
export let fill = "#2E525F"
</script>

<svg 
     class:hide={hide}
     width="502" height="494" viewBox="0 0 502 494" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_b)">
<!-- <path fill-rule="evenodd" clip-rule="evenodd" d="M478.113 215.956C463.211 190.602 468.19 150.484 479.821 123.473C484.441 112.745 487 100.921 487 88.5C487 39.6228 447.377 0 398.5 0C371.611 0 347.522 11.9921 331.291 30.9198C324.683 38.6258 314.671 43 304.52 43V43V43C293.03 43 281.55 38.4981 273.478 30.3222C257.432 14.0713 235.142 4 210.5 4C161.623 4 122 43.6228 122 92.5C122 97.147 122.358 101.71 123.048 106.164C124.503 115.55 121.752 125.264 115.81 132.673V132.673C109.255 140.845 98.9759 146 88.5 146V146C39.6228 146 0 185.623 0 234.5C0 259.891 10.6927 282.784 27.8209 298.923C38.1836 308.687 44 323.262 44 337.5V337.5C44 338.119 44.0073 338.735 44.0219 339.351C44.291 350.685 42.4734 362.185 38.2712 372.715C34.2251 382.854 32 393.917 32 405.5C32 454.377 71.6228 494 120.5 494C136.951 494 152.354 489.511 165.551 481.692C191.963 466.041 234.844 454.177 263.344 465.591C283.333 473.596 305.152 478 328 478C424.098 478 502 400.098 502 304C502 271.875 493.294 241.784 478.113 215.956Z" fill={fill}/> -->
  
<!-- scale this -->
<circle id="circle1" cx="328" cy="304" r="174" fill={fill}/> 
<!-- translate this   -->
<circle id="circle2" class="main" cx="120.5" cy="405.5" r="90" fill={fill}/>
<circle id="circle2_3" class="filler" cx="120.5" cy="337.5" r="76.5" fill={fill}/>
<circle id="circle3" class="main" cx="88.5" cy="234.5" r="90" fill={fill}/>
<circle id="circle3_4" class="filler" cx="175.52" cy="180.5" r="76.5" fill={fill}/>
<circle id="circle4" class="main" cx="210.5" cy="92.5" r="90" fill={fill}/>
<circle id="circle4_5" class="filler" cx="304.52" cy="119.5" r="76.5" fill={fill}/>
<circle id="circle5" class="main" cx="398.5" cy="88.5" r="90" fill={fill}/>

</g>
<defs>
<filter id="filter0_b" x="-49" y="-49" width="600" height="592" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<!--   <feFlood flood-opacity="0" result="BackgroundImageFix"/>
  <feGaussianBlur in="BackgroundImage" stdDeviation="24.5"/>
  <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur"/>
  <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur" result="shape"/> -->
  <feGaussianBlur in="SourceGraphic" stdDeviation="24.5" result="blur" />
  <feColorMatrix id="colorMatrixElement" in="blur" mode="matrix" values="1 0 0 0 0 
                                                                         0 1 0 0 0 
                                                                         0 0 1 0 0 
                                                                         0 0 0 25 -15" result="matrix"></feColorMatrix>
</filter>
</defs>
</svg>

<style>
  svg{
    --close8: translate3d(-61px, 216.33693px, 0);
    --close7: translate3d(32px, 186.33693px, 0);
    --close6: translate3d(127px, 211.33693px, 0);
    --close5: translate3d(162px, 125.33693px, 0);
    --close4: translate3d(248px, 69.33693px, 0);
    --close3: translate3d(216px, -32.66307px, 0);
    --close2: translate3d(216px, -100.66307px, 0);
    --scale:.75;
    --close1: translate3d(calc((1 - var(--scale)) * 328px), calc((1 - var(--scale)) * 304px), 0) scale(var(--scale));
/*     --close1: scale(var(--scale)); */
    width:100%;
    height:100%;
    position:absolute;
    left:0;
    top:0;
/*     opacity:0.2; */
/*     backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px); */
    z-index:-1
  }

  circle{
    -webkit-transition-duration: 280ms;
          transition-duration: 280ms;
  }


  .hide circle:nth-child(1){
        -webkit-transform: var(--close1);
          transform: translate(65.4, calc((1 - .8) * 304));
  }
  .hide circle:nth-child(2){
        -webkit-transform: var(--close2);
          transform: var(--close2);
  }
  .hide circle:nth-child(3){
    -webkit-transform: var(--close3);
          transform: var(--close3);
  }
  .hide circle:nth-child(4){
        -webkit-transform: var(--close4);
          transform: var(--close4);
  }
  .hide circle:nth-child(5){
    -webkit-transform: var(--close5);
          transform: var(--close5);
  }
    .hide circle:nth-child(6){
        -webkit-transform: var(--close6);
          transform: var(--close6);
  }
  .hide circle:nth-child(7){
    -webkit-transform: var(--close7);
          transform: var(--close7);
  }
  .hide circle:nth-child(8){
        -webkit-transform: var(--close8);
          transform: var(--close8);
  }
  
  circle:nth-child(8) {
  -webkit-transition-duration: 280ms;
          transition-duration: 280ms;
  }
  circle:nth-child(7) {
  -webkit-transition-duration: 320ms;
          transition-duration: 320ms;
  }
  circle:nth-child(6) {
    -webkit-transition-duration: 360ms;
            transition-duration: 360ms;
  }
  circle:nth-child(5) {
    -webkit-transition-duration: 400ms;
            transition-duration: 400ms;
  }
  circle:nth-child(4) {
    -webkit-transition-duration: 440ms;
            transition-duration: 440ms;
  }
  circle:nth-child(3) {
    -webkit-transition-duration: 480ms;
            transition-duration: 480ms;
  }
  circle:nth-child(2) {
    -webkit-transition-duration: 520ms;
            transition-duration: 520ms;
  }
</style>
