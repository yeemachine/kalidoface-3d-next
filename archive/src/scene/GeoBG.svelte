<script context="module">
import * as THREE from 'three';
import { Water } from 'three/examples/jsm/objects/Water.js';
import { Sky } from 'three/examples/jsm/objects/Sky.js';

// now we create the function that will be called in each frame 
// to update the position of the vertices to simulate the waves
  
export var sea;
  
</script>
<script>  
  export let scene;

let Sea = function(){
	var geom = new THREE.CylinderGeometry(50,50,100,40,10);
	// geom.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI/2));

	// important: by merging vertices we ensure the continuity of the waves
	geom.merge(geom);
  // BufferGeometryUtils.mergeBufferGeometries(geom)


	// get the vertices
	var l = geom.attributes.position.array.length;
	// create an array to store new data associated to each vertex
	this.waves = [];

	for (var i=0; i<l; i++){
		// get each vertex
		var v = geom.attributes.position.array;
		// store some data associated to it
    this.waves.push({y:v[i],
										 x:v[i+1],
										 z:v[i+2],
										 // a random angle
										 ang:Math.random()*Math.PI*2,
										 // a random distance
										 amp:.2 + Math.random()*1,
										 // a random speed between 0.016 and 0.048 radians / frame
										 speed:0.016 + Math.random()*0.032
										});
	};
	var mat = new THREE.MeshPhongMaterial({
		color:0x68c3c0,
		transparent:true,
		opacity:.8,
		flatShading:true,
    shininess: 0
	});

	this.mesh = new THREE.Mesh(geom, mat);
	this.mesh.receiveShadow = true;
  this.mesh.castShadow = true;

}

Sea.prototype.moveWaves = function (){
	
	// get the vertices
	var verts = this.mesh.geometry.attributes.position.array;
  // console.log(verts)
	var l = verts.length;
  // console.log(this.waves)
	
	for (var i=0; i<l; i++){
		var v = verts[i];
		
		// get the data associated to it
		var vprops = this.waves[i];
		
		// update the position of the vertex
		// v.x = vprops.x + Math.cos(vprops.ang)*vprops.amp;
		// v.y = vprops.y + Math.sin(vprops.ang)*vprops.amp;
    let x = vprops.x + Math.cos(vprops.ang)*vprops.amp
    let y = vprops.y + Math.sin(vprops.ang)*vprops.amp
		verts[i] = x ? x : verts[i];
		verts[i+1] = y ? y : verts[i+1];

		// increment the angle for the next frame
		vprops.ang += vprops.speed;

	}

	// Tell the renderer that the geometry of the sea has changed.
	// In fact, in order to maintain the best level of performance, 
	// three.js caches the geometries and ignores any changes
	// unless we add this line
  this.mesh.geometry.attributes.position.needsUpdate = true

	sea.mesh.rotation.z += .005;
}
  
  
function createSea(){
	sea = new Sea();

	// push it a little bit at the bottom of the scene
	sea.mesh.position.y = -49.7;
  // sea.mesh.rotation.z = Math.PI*.5
  sea.mesh.rotation.x = Math.PI*.5

	// add the mesh of the sea to the scene
	scene.add(sea.mesh);
  console.log('sea')
  sea.moveWaves()
}
scene.fog = new THREE.Fog(0x368791, .1, 100);
createSea()
</script>