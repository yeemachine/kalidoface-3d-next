<svelte:options accessors={true}/>

<script>
  import {onMount} from 'svelte'
  import { tweened } from 'svelte/motion';
  import { cubicInOut,linear } from 'svelte/easing';

  export let transition = false; //locked until animation finishes
  let svgDom
  let paths = []
  let allPoints = [[],[],[]]
  let pointsDelay = [] 

  let numPaths = 0
  let numPoints = 5
  let duration = 1200 //total animation in ms
  let delayPerPath = 0.125; //percentage of timeline
  let delayPointsMax = 0.5; //percentage of path timeline

  export let isOpen = false;
  let curveStyle = "curve";
  let wipe = false;
  let isHorizontal = false;
  let flip = false;
  
  const timeline = tweened(0, {
    duration: 1000,
    easing: linear
  });  
  
  export const animate = ({
      axis="x",
      _duration=1200,
      _delayPointsMax = 0.15,
      _delayPerPath = 0.125,
      action=null,
      _wipe=false,
      _flip=false,
      _curve="curve",
      pattern=[],
      _numPoints=5
    } = {}) => {

    //do not fire when transitioning
    if(!transition){
      //optional param overrides
      isHorizontal = axis==="x" ? true : false;
      duration = _duration;
      numPoints = _numPoints;
      curveStyle = _curve;
      delayPointsMax = _delayPointsMax;
      delayPointsMax = _delayPerPath;
      isOpen = action === 'open' ? false 
        : action === 'close' ? true
        : isOpen;
      wipe = _wipe;
      flip = _flip;
      
      svgDom.setAttribute("data-axis", axis);
      svgDom.setAttribute("data-flip", _flip);

      //optional delay pattern array for less randomized waves
      if(pattern.length >= numPoints){
        pointsDelay = pattern
      }else{
        createRandomness() 
      }

      //start transition, lock function
      transition=true

      //reset timeline
      timeline.set(0,{duration:0})
      //trigger timeline animation
      timeline.set(1,{duration:duration})
    }
  } 
  
const createRandomness = () => {
  for (let i = 0; i < numPoints; i++) {
    pointsDelay[i] = Math.random() * delayPointsMax;
  }  
}

//split single timeline into multi layered complex timeline
const calcTimeline = (t) => {
  let allPoints = [[],[],[]]
  let pathRange = 1 - (delayPerPath) * (numPaths-1)
  //map path val from 0 to 1
   for (let i = 0; i < numPaths; i++) {
    let pathDelay = delayPerPath * (isOpen ? i : (numPaths - i - 1))
    let pathVal = (t - pathDelay)/pathRange
    pathVal = Math.min(Math.max(pathVal,0),1)
    //map point val from 0 to 1 based on mapped path val
    for (let j=0; j<numPoints;j++){
      let pointVal = (pathVal - pointsDelay[j])/(1-delayPointsMax)
      pointVal = Math.min(Math.max(pointVal,0),1)
      allPoints[numPaths-i-1][j] = cubicInOut(pointVal) * 100
    }
  }
  return allPoints
}

//draw svg
const render = (paths=[],allPoints=[]) => {
      for (var i = 0; i < numPaths; i++) {
        var path = paths[i];
        var points = allPoints[i];

        var d = "";
        //first vector point
        switch (curveStyle) {
          case "curve":
              d += isHorizontal ?
                (isOpen ? `M 100 0 H ${points[0]} C`:`M 0 0 H ${points[0]} C`) : 
                (isOpen ? `M 0 0 V ${points[0]} C` : `M 0 ${points[0]} C`);
              break
          case "step":
            d += isHorizontal ?
                (isOpen ? `M 100 0 H ${points[0]} L`:`M 0 0 H ${points[0]} L`) : 
                (isOpen ? `M 0 0 V ${points[0]} L` : `M 0 ${points[0]} L`);
              break
          case "zigzag":
              d += isHorizontal ?
                (isOpen ? `M 100 0 H ${points[0]} L`:`M 0 0 H ${points[0]} L`) : 
                (isOpen ? `M 0 0 V ${points[0]} L` : `M 0 ${points[0]} L`);
              break
          default:
              d += isHorizontal ?
                (isOpen ? `M 100 0 H ${points[0]} C`:`M 0 0 H ${points[0]} C`) : 
                (isOpen ? `M 0 0 V ${points[0]} C` : `M 0 ${points[0]} C`);
              break
        }

        //staggered path points
        for (var j = 0; j < numPoints - 1; j++) {
          var p = (j + 1) / (numPoints - 1) * 100;
          var cp = p - (1 / (numPoints - 1) * 100) / 2;
          switch (curveStyle) {
            case "curve":
              d += isHorizontal ? (` ${points[j]} ${cp} ${points[j+1]} ${cp}  ${points[j+1]} ${p}`) : 
              (` ${cp} ${points[j]} ${cp} ${points[j+1]} ${p} ${points[j+1]}`);
              break;
            case "step":
               d += isHorizontal ? (` ${points[j]} ${cp} ${points[j+1]} ${cp}  ${points[j+1]} ${p}`) : 
              (` ${cp} ${points[j]} ${cp} ${points[j+1]} ${p} ${points[j+1]}`);
              break;
            case "zigzag":
              d += isHorizontal ? (` ${points[j]} ${cp} ${points[j+1]} ${p}`) : 
              (` ${cp} ${points[j]} ${p} ${points[j+1]}`);
              break;
            default:
              d += isHorizontal ? (` ${points[j]} ${cp} ${points[j+1]} ${cp}  ${points[j+1]} ${p}`) : 
              (` ${cp} ${points[j]} ${cp} ${points[j+1]} ${p} ${points[j+1]}`);
              break
          }    
       
        }

        //last vector point
        d += isHorizontal ? (isOpen ? ` V 100 H 100` :` V 100 H 0`) :
          (isOpen ? ` V 100 H 0` : ` V 0 H 0`);
        path.setAttribute("d", d)
      } 
  
}

//handle changes to timeline
timeline.subscribe(t => {
  let newPoints = calcTimeline(t)
  if(paths.length>0){
  render(paths,newPoints)
  }
  if(t===1){
    isOpen = !isOpen;
    if(wipe){
      wipe=false;
      timeline.set(0,{duration:0})
      timeline.set(1,{duration:duration})
    }else{
      transition = false
    }
  }
})

//initialize paths and numpaths
const init = ()=> {
  paths = svgDom.querySelectorAll(".shape-overlays__path");  
  numPaths = paths.length
  createRandomness() 
  if(paths.length>0){
    let newPoints = calcTimeline($timeline)
    render(paths,newPoints)
  }
}
  
onMount(()=>{
  init()
})
  
</script>

<svg 
     bind:this={svgDom}
     class="shape-overlays" 
     viewBox="0 0 100 100" 
     data-axis="{isHorizontal ? 'x' : 'y'}"
     data-flip="{flip ? true : false}"
     preserveAspectRatio="none">
    <slot>
    </slot>
</svg>

<style>
  .shape-overlays {
  width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
  cursor: pointer;
  transform-origin:center;
  }
  :global(.shape-overlays[data-flip=true][data-axis='y']){
    transform:scale(1,-1)
  }
  :global(.shape-overlays[data-flip=true][data-axis='x']){
    transform:scale(-1,1)
  }
</style>