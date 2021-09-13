<script>
export let hide = false;
export let fill = "#2E525F"
</script>

<svg 
  class:hide={hide}
  width="685" height="495" viewBox="0 0 685 495" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g filter="url(#filter0_c)">
    <circle cx="247.387" cy="247.387" r="247.387" fill={fill}/>
    <circle cx="572" cy="143" r="161" fill={fill}/>
  </g>
  <defs>
    <filter id="filter0_c" x="-107.297" y="-107.297" width="898.775" height="709.368" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
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
    --close1: translate3d(-277px, 87.33693px, 0);
    --scale:.85;
    --shrink1: translate3d(calc((1 - var(--scale)) * 247.387px), calc((1 - var(--scale)) * 247.387px), 0) scale(var(--scale));
    width:100%;
    height:100%;
    position:absolute;
    left:0;
    top:0;
    z-index:-1;
    overflow:visible;
  }
  svg.hide{
    pointer-events:none;
  }

  circle{
    -webkit-transition-duration: 360ms;
          transition-duration: 360ms;
  }

  
  .hide circle:nth-child(1){
     -webkit-transform: var(--shrink1);
    transform: var(--shrink1);
  }
  
  .hide circle:nth-child(2){
     -webkit-transform: var(--close1);
    transform: var(--close1);
  }


</style>
