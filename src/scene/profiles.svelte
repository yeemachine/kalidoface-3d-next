<script context="module">
import { writable } from 'svelte/store';
import {RestingDefault} from '../tracking/utils/RestingDefault.js'

export const profiles = writable({
  user: {
    id:'user',
    model:null,
    live2d:null,
    position:{x:0,y:window.innerWidth > 600 ? .7 : .55,z:0},
    currentExp:0,
    expressions:[],
    zoom:.5,
    destroying:false,
    detected:false,
    tracking:JSON.parse(JSON.stringify(RestingDefault)),
  },
  friend: {
    id:'friend',
    model:null,
    live2d:null,
    position:{x:1,y:window.innerWidth > 600 ? .7 : .55,z:0},
    currentExp:0,
    expressions:[],
    zoom:.5,
    destroying:false,
    detected:false,
    tracking:JSON.parse(JSON.stringify(RestingDefault))
  }
})

</script>