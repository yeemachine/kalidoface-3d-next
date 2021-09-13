<script context="module">
import { writable,get } from 'svelte/store';
import {urlBase,getLocalStorage,subLocalStorage} from '../stores.js'
import {createBlobURL} from '../utils/helpers.js'

export const stickerList = writable([])
export const presetStickers = [
    //accessories
    {url:urlBase+'Stickers/accessories/sunglass_normal.png',default:.5},
    {url:urlBase+'Stickers/accessories/birthday_party_sunglass.png',default:.5},
    {url:urlBase+'Stickers/accessories/medical_mask_front_view.png',default:.5},
    //furniture
    {url:urlBase+'Stickers/furniture/table_syoumen_wood.png',default:.5},
    //food
    {url:urlBase+'Stickers/food/potatochips_fukuro_red.png',default:.5},
    {url:urlBase+'Stickers/food/sweets_marzipan_cake.png',default:.5},
    {url:urlBase+'Stickers/food/sweets_purin_cup.png',default:.5},
    {url:urlBase+'Stickers/food/snackgashi.png',default:.5},
    //music
    {url:urlBase+'Stickers/drink/cafe_coffee_cup.png',default:.5},
    {url:urlBase+'Stickers/drink/drink_cocktail09.png',default:.5},
    {url:urlBase+'Stickers/drink/drink_cocktail10.png',default:.5},
    {url:urlBase+'Stickers/drink/drink_sangria.png',default:.5},
    {url:urlBase+'Stickers/drink/wine_bottle_bourgogne.png',default:.5},
    //music
    {url:urlBase+'Stickers/music/music_mic_stand.png',default:.5},
    {url:urlBase+'Stickers/music/pen_light2_3_lime.png',default:.5},
    {url:urlBase+'Stickers/music/music_guitar_doubleneck.png',default:.5},
    {url:urlBase+'Stickers/music/gassyou_fumendai.png',default:.5},
    {url:urlBase+'Stickers/music/music_mixer_dj.png',default:.5},
    {url:urlBase+'Stickers/music/animal_penguin_music_band.png',default:.5}
]
getLocalStorage(stickerList,'stickerList',[],createBlobURL)
subLocalStorage(stickerList,'stickerList')

export const stickerLayers=writable([])
</script>
<script>
import {onMount} from 'svelte'
import { fade,scale } from 'svelte/transition'
import { cubicInOut } from "svelte/easing"; 
import interact from "interactjs";
import {DIM} from '../stores.js';
  
  function dragMoveListener (event) {
    var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  }
  
  const bringToTop = (el) => {
    let newLayers = []
    $stickerLayers.forEach(e=>{
      if(e.id === el.getAttribute('data-id')){
        e.zIndex = $stickerLayers.length + 1
      }else if(e.zIndex > el.getAttribute('data-z')){
        e.zIndex = e.zIndex - 1
      }
      newLayers.push(e)
    })
    stickerLayers.set(newLayers)
  }
  
  onMount(async()=>{
    // interact('.resize-drag').unset()
    interact(".resize-drag")
  .gesturable({
    listeners: {
      start(event) {
        let a =
          (parseFloat(event.target.getAttribute("data-a")) || 0) - event.angle;
        let s = parseFloat(event.target.getAttribute("data-s")) || 1;
        event.target.setAttribute("data-a", a);
        event.target.setAttribute("data-s", s);
        // angleScale.angle -= event.angle
      },
      move(event) {
        let a =
          parseFloat(event.target.getAttribute("data-a")) + event.angle;
        a = a > 360 ? a % 360 
          : a < -360 ? a % 360
          : a
        let s =
          parseFloat(event.target.getAttribute("data-s")) * event.scale;
        
        var currentAngle = a;
        currentAngle = Math.abs(a) < 3 ? 0 
          : Math.abs(90 - a) < 3 ? 90
          : Math.abs(-270 - a) < 3 ? 90
          : Math.abs(180 - Math.abs(a)) < 3 ? 180
          : Math.abs(270 - a) < 3 ? 270
          : Math.abs(-90 - a) < 3 ? 270
          : Math.abs(360 - Math.abs(a)) < 3 ? 0
          : a

        var currentScale = s;

        let scaleElement = event.target.firstChild;
        scaleElement.style.webkitTransform = scaleElement.style.transform =
          "rotate(" + currentAngle + "deg)" + "scale(" + currentScale + ")";
        // uses the dragMoveListener from the draggable demo above
        dragMoveListener(event);
      },
      end(event) {
        let a =
          (parseFloat(event.target.getAttribute("data-a")) || 0) + event.angle;
        a = a > 360 ? a % 360 
          : a < -360 ? a % 360
          : a
        let s =
          (parseFloat(event.target.getAttribute("data-s")) || 1) * event.scale;
        event.target.setAttribute("data-a", a);
        event.target.setAttribute("data-s", s);
      }
    }
  })
  .draggable({
    onmove: dragMoveListener,
      cursorChecker () {
      // don't set a cursor for drag actions
      return null
      }
  })
  .on('down', function (event) {
    bringToTop(event.currentTarget)
  })

if (window.matchMedia("(hover: hover) and (pointer:fine)").matches) {
  interact(".resize-drag")
    .resizable({
      // resize from all edges and corners
      edges: { left: true, right: true, bottom: true, top: true },

      modifiers: [
        interact.modifiers.aspectRatio({
          ratio: "preserve"
        }),
        interact.modifiers.restrictSize({
          min: { width: 50},
          // max: { width: 500, height: 500 },
        })
      ],
      inertia: true
    })
    .on("resizemove", function(event) {
      if (window.matchMedia("(hover: hover) and (pointer:fine)").matches) {
        var target = event.target,
          x = parseFloat(target.getAttribute("data-x")) || 0,
          y = parseFloat(target.getAttribute("data-y")) || 0;

        // update the element's style
        if(event.rect.width>50){
          target.firstChild.style.width = event.rect.width + "px";
          target.firstChild.style.height = event.rect.height + "px";

          // translate when resizing from top or left edges
          x += event.deltaRect.left;
          y += event.deltaRect.top;

          target.style.webkitTransform = target.style.transform =
            "translate(" + x + "px," + y + "px)";

          target.setAttribute("data-x", x);
          target.setAttribute("data-y", y);
        }
        target.style.maxWidth = 'none';
        target.style.maxHeight = 'none';
      }
    });
}

  })
</script>

{#each $stickerLayers as sticker (sticker.id)}
 <div class="resize-drag"  
       in:scale="{{ duration: 300, easing: cubicInOut }}"
          out:scale="{{ duration: 300, easing: cubicInOut}}"
      style="max-width:{Math.min($DIM.w * .5,300)}px;z-index:{sticker.zIndex}" data-id={sticker.id} data-z={sticker.zIndex}>
  {#if sticker.type==="video"}
    <video class="content" 
           src="{sticker.url}" 
           alt={'uploaded sticker'+sticker.id} autoplay muted playsinline loop
           on:contextmenu="{(e)=>{e.preventDefault(); return false;}}"/>
  {:else}
    <img class="content"
       src="{sticker.url}"
        alt={'preset sticker'+sticker.id} 
       on:contextmenu="{(e)=>{e.preventDefault(); return false;}}"/>
  {/if}
  
</div>

{/each}


<style>
.resize-drag {
  width: max-content;
  height: max-content;
  box-sizing: border-box;
  position: absolute;
  touch-action:none;
/*   top:10px; */
  left:200px;
  min-width:50px;
/*       -webkit-touch-callout: none;
-webkit-user-select: none; */
/*   background:lightgrey; */
/*   width: 100px;
  height: 100px; */

  pointer-events:none;
}
 .resize-drag:hover{
    cursor:grab
  }
  .resize-drag:active{
    cursor:grabbing
  }

.content {
  width: 100%;
  min-width:50px;
  height: auto;
  object-fit: contain;
  touch-action:none;
  pointer-events:all;
    -webkit-touch-callout: none;
-webkit-user-select: none;
/*   pointer-events:none; */
}
  
@media only screen and (hover: hover) and (pointer: fine) {
.resize-drag:hover .content{
    -webkit-box-shadow: 0px 0px 0px 1px #eeeeff90; 
    box-shadow: 0px 0px 0px 1px #eeeeff90;
  }
  .resize-drag:focus .content,.resize-drag:active .content{
    -webkit-box-shadow: 0px 0px 0px 1px #eeeeff00; 
    box-shadow: 0px 0px 0px 1px #eeeeff00;
  }
  
  
}
  
  @media only screen and (max-width: 600px) {
    .resize-drag {
      left:unset;
      top:unset;
      bottom:220px;
    }
  }
  
</style>