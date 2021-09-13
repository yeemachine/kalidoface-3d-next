<script>
	export let isCurrent = false;
	export let cardContent = '';
  export let dataParity = 1;
  export let styles = '';
</script>

<p class="card" data-dragging="false" data-status="{isCurrent === true ? 'current' : 'waiting'}" style={styles}>
	<slot>
    {cardContent}
  </slot>
</p>

<style>
:global(.card) {
    --card-x: 0;
    --card-y: 0;
    --card-r: 0;
    --card-w:420px;
    --card-w:clamp(0px,85vw,480px);
    --card-h:clamp(0px,85vh,calc(var(--card-w)*1.5));
    --card-scale:1;
    --theme-color:#ffffff;
    --text-color:#000000;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #e0bcd3;
    background-color:var(--theme-color);
    color: var(--text-color);
    width: var(--card-w) ;
    height: var(--card-h);
    border-radius: clamp(8px,5vw,32px);
    transform: translate(var(--card-x), var(--card-y)) rotate(var(--card-r)) scale(var(--card-scale));
    top: 50%;
    left: 50%;
    position: absolute;
    margin-top: calc(var(--card-h) * -.5);
    margin-left: calc(var(--card-w) * -.5);
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    font-size: 24px;
    padding: clamp(32px,5vw,48px);
    box-sizing: border-box;
    line-height: 1.3;
    touch-action: none;
    pointer-events:none;
    opacity:0;
}
  
  :global(.card[data-status="current"]){
    -webkit-box-shadow: -4px 3px 30px 0px rgba(100,100,100,0.3);
    box-shadow: -4px 3px 30px 0px rgba(100,100,100,0.3)
  }
  :global(.card:hover){
    cursor:grab
  }
  :global(.card:active){
    cursor:grabbing
  }
:global(.card[data-status="current"]+.card) {
    z-index: 2;
    --card-r: -4.5deg;
    opacity:1;
     -webkit-box-shadow: -4px 3px 30px 0px rgba(100,100,100,0.3);
    box-shadow: -4px 3px 30px 0px rgba(100,100,100,0.3)
}
/* :global(.card[data-status="current"]+.card+.card) {
    --card-r: -2.5deg;
} */
:global(.card[data-status="current"][data-dragging="true"]+.card) {
    --card-r: 0deg;
}
:global(.card[data-status="current"]+.card+.card) {
    z-index: 1;
    transition-delay: 0.5s;
    opacity:1
}
:global(.card[data-dragging="false"]) {
    transition: transform 0.5s;
}
.card[data-status="current"] {
    z-index: 3;
    opacity:1;
    pointer-events:all;
}
  
:global(.card[data-status="current"] a) {
    pointer-events:all;
}
:global(.card[data-status="transition"]) {
    z-index: 4;
    opacity:1;
}

:global(.card:first-child[data-loop="load"]){
/*     opacity:1; */
--card-scale:.5;
}
:global(.card:first-child[data-loop="peak"]){
--card-scale:1;
  transition:opacity .2s, transform .4s cubic-bezier(.17,.63,.32,1.22);
}
:global(.card:first-child[data-loop="peak"][data-dragging="true"]){
  transition:0s;
}
:global(.card:first-child[data-loop="peak"]+.card){
  transition:opacity .4s .4s, transform .5s .4s;
}
:global(.card:first-child[data-loop="peak"]+.card+.card){
  transition:opacity .4s .4s, transform .5s .4s;
}
/* .card[data-parity="1"] {
    background-color: #fff;
    color: #000;
}
.card[data-parity="0"] {
    background-color: #e0bcd3;
    color: #000;
} */
.card * {
    pointer-events: none;
}
.card_title {
    font-size: 64px;
    align-self: center;
    margin-top: auto;
    margin-bottom: auto;
}
.card_subtitle {
    align-self: center;
    font-size: 18px;
    position: absolute;
    bottom: 30px;
}
@media only screen and (max-width: 600px) {
  :global(.card){
/*     --card-w:320px; */
  }
}  

</style>