<script context="module">
export let fxaaPass = null
</script>
<script>
import * as THREE from "three";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { GlitchPass } from "three/examples/jsm/postprocessing/GlitchPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { LuminosityShader } from "three/examples/jsm/shaders/LuminosityShader.js";
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader.js";

import { BloomPass } from "three/examples/jsm/postprocessing/BloomPass.js";
import { FilmPass } from "three/examples/jsm/postprocessing/FilmPass.js";
import { DotScreenPass } from "three/examples/jsm/postprocessing/DotScreenPass.js";
import {
  MaskPass,
  ClearMaskPass
} from "three/examples/jsm/postprocessing/MaskPass.js";
import { TexturePass } from "three/examples/jsm/postprocessing/TexturePass.js";

import { BleachBypassShader } from "three/examples/jsm/shaders/BleachBypassShader.js";
import { ColorifyShader } from "three/examples/jsm/shaders/ColorifyShader.js";
import { HorizontalBlurShader } from "three/examples/jsm/shaders/HorizontalBlurShader.js";
import { VerticalBlurShader } from "three/examples/jsm/shaders/VerticalBlurShader.js";
import { SepiaShader } from "three/examples/jsm/shaders/SepiaShader.js";
import { VignetteShader } from "three/examples/jsm/shaders/VignetteShader.js";
import { GammaCorrectionShader } from "three/examples/jsm/shaders/GammaCorrectionShader.js";
import {camera} from './CameraControls.svelte'

export let scene;
export let composer;

const renderPass = new RenderPass(scene, $camera);
$:renderPass.camera = $camera
composer.addPass(renderPass);
console.log(renderPass)

// const glitchPass = new GlitchPass();
// composer.addPass( glitchPass );
const bloomPass = new BloomPass(
  1, // strength
  25, // kernel size
  4, // sigma ?
  256 // blur render target resolution
);
// composer.addPass( bloomPass );

const gammaCorrection = new ShaderPass(GammaCorrectionShader);
// composer.addPass( gammaCorrection );

const filmPass = new FilmPass(
  0.25, // noise intensity
  0.0125, // scanline intensity
  348, // scanline count
  false // grayscale
);

// composer.addPass( filmPass );

const shaderVignette = VignetteShader;
const effectVignette = new ShaderPass(shaderVignette);
effectVignette.uniforms["offset"].value = 0.95;
effectVignette.uniforms["darkness"].value = 1.6;

// composer.addPass( effectVignette );

fxaaPass = new ShaderPass(FXAAShader);
// composer.addPass(fxaaPass);

//   const luminosityPass = new ShaderPass( LuminosityShader );
// composer.addPass( luminosityPass );


</script>
