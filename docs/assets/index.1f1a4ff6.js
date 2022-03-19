import { t as tweened, l as localForage, c as cubicInOut, w as writable, S as SvelteComponent, i as init, s as safe_not_equal, a as SphereGeometry, T as TextureLoader, M as MeshBasicMaterial, b as Mesh, g as get_store_value, d as component_subscribe, P as PlaneGeometry, W as Water, R as RepeatWrapping, V as Vector3, e as ShadowMaterial, n as noop, f as space, h as create_component, j as insert, m as mount_component, k as transition_in, o as transition_out, p as detach, q as destroy_component, C as Color, r as element, u as attr, v as toggle_class, x as listen, y as run_all, z as binding_callbacks, A as set_style, B as null_to_empty, D as append, E as onMount, F as interact, G as RestingDefault$1, H as empty, I as text, J as set_data, K as add_render_callback, L as create_in_transition, N as fly, O as create_out_transition, Q as group_outros, U as check_outros, X as drawing_utils, Y as holistic, Z as FaceSolver, _ as Vector$1, $ as HandSolver, a0 as PoseSolver, a1 as Peer, a2 as set_store_value, a3 as setBackend, a4 as at, a5 as it, a6 as face_mesh, a7 as ai, a8 as poseDetection, a9 as oe, aa as spring, ab as GLTFLoader, ac as we, ad as xe, ae as u, af as GridHelper, ag as AxesHelper, ah as Object3D, ai as PointLight, aj as BoxGeometry, ak as LoadingManager, al as SMAAImageLoader, am as SMAAEffect, an as SMAAPreset, ao as EdgeDetectionMode, ap as PredicationMode, aq as GodRaysEffect, ar as KernelSize, as as PixelationEffect, at as OutlineEffect, au as BlendFunction, av as RenderPass, aw as EffectPass, ax as Clock, ay as Euler, az as Quaternion, aA as EventDispatcher, aB as MathUtils, aC as PerspectiveCamera, aD as OrbitControls, aE as PointerLockControls, aF as scale, aG as update_keyed_each, aH as outro_and_destroy_block, aI as src_url_equal, aJ as WebGLRenderer, aK as Scene, aL as DirectionalLight, aM as AmbientLight, aN as Group, aO as EffectComposer, aP as fade, aQ as flush, aR as create_slot, aS as svg_element, aT as update_slot_base, aU as get_all_dirty_from_scope, aV as get_slot_changes, aW as identity, aX as subscribe, aY as iro$1, aZ as destroy_each, a_ as fix_position, a$ as create_animation, b0 as flip, b1 as fix_and_destroy_block, b2 as set_input_value, b3 as select_value, b4 as select_option, b5 as to_number, b6 as destroy_block, b7 as bind, b8 as add_flush_callback, b9 as add_resize_listener } from './vendor.e7881b25.js';

const p = function polyfill() {
    const relList = document.createElement('link').relList;
    if (relList && relList.supports && relList.supports('modulepreload')) {
        return;
    }
    for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
        processPreload(link);
    }
    new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            if (mutation.type !== 'childList') {
                continue;
            }
            for (const node of mutation.addedNodes) {
                if (node.tagName === 'LINK' && node.rel === 'modulepreload')
                    processPreload(node);
            }
        }
    }).observe(document, { childList: true, subtree: true });
    function getFetchOpts(script) {
        const fetchOpts = {};
        if (script.integrity)
            fetchOpts.integrity = script.integrity;
        if (script.referrerpolicy)
            fetchOpts.referrerPolicy = script.referrerpolicy;
        if (script.crossorigin === 'use-credentials')
            fetchOpts.credentials = 'include';
        else if (script.crossorigin === 'anonymous')
            fetchOpts.credentials = 'omit';
        else
            fetchOpts.credentials = 'same-origin';
        return fetchOpts;
    }
    function processPreload(link) {
        if (link.ep)
            // ep marker = processed
            return;
        link.ep = true;
        // prepopulate the load record
        const fetchOpts = getFetchOpts(link);
        fetch(link.href, fetchOpts);
    }
};true&&p();

const isImageVideo = (file) => {
   let type = null;
   // alert(file.type)
    switch (file.type) {
        case 'video/mp4':
            type = "video";
            break;
        case 'video/quicktime':
            type = "video";
            break;
        case 'video/webm':
            type = "video";
            break;
        case 'image/jpeg':
            type = "img";
            break;
        case 'image/png':
            type = "img";
            break;
        case 'image/tif':
            type = "img";
            break;
        case 'image/apng':
            type = "img";
            break;
        case 'image/gif':
            type = "img";
            break;
        case 'image/svg+xml':
            type = "img";
            break;
        case 'image/webp':
            type = "img";
            break;
        case 'image/avif':
            type = "img";
            break;
    }
  return type
};
//**dataURL to blob**
function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
}

const createBlobURL = (e) =>{
     if(Array.isArray(e)){
      e.forEach(i=>{
        if(i.data){
          let blob = dataURLtoBlob(i.data);
          i.url = URL.createObjectURL(blob);
        }
      });
      return
    }  
    if(typeof e === 'object'){
      if(e.data){
        e.url = URL.createObjectURL(dataURLtoBlob(e.data));
      }
      return
    }  
};

function clamp(value, min, max) {
  return Math.max(Math.min(value, max), min);
}

const remap = (val,a,b) => {
 //returns a to b -> 0 to 1 
 return (clamp(val,a,b) - a)/(b-a)
};

const threshold = (oldVal,newVal,amount)=>{
 return (Math.abs(newVal - oldVal)>amount ? newVal : oldVal)
};

function randomString(length, chars) {
  var result = '';
  for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

const getCSSCustomProp = (propKey, element = document.documentElement, castAs = 'string') => {
  let response = getComputedStyle(element).getPropertyValue(propKey);
  // Tidy up the string if there's something to work with
  if (response.length) {
    response = response.replace(/\'|"/g, '').trim();
  }
  // Convert the response into a whatever type we wanted
  switch (castAs) {
    case 'number':
    case 'int':
      return parseInt(response, 10);
    case 'float':
      return parseFloat(response, 10);
    case 'boolean':
    case 'bool':
      return response === 'true' || response === '1';
  }
  // Return the string response by default
  return response;
};

const haptic = () => {
  if ("vibrate" in navigator) {
      navigator.vibrate(15);
    }
};

const version = '0.0.11';
console.log('%c%s',
				'color: #ffffff; background: #009df7;padding:4px 8px 4px 8px;border-radius:24px',
				'Kalidoface 3D '+version);
navigator.languages ? navigator.languages[0] : 'en';
const setLang = writable('en');
const breakpoint = writable(window.innerWidth > 600 ? 'desktop' : 'mobile');
const isTouch = matchMedia('(hover: none), (pointer: coarse)').matches;

const isSafari =
    navigator.vendor &&
    navigator.vendor.indexOf('Apple') > -1 &&
    navigator.userAgent &&
    navigator.userAgent.indexOf('CriOS') == -1 &&
    navigator.userAgent.indexOf('FxiOS') == -1;

// export const isSafari = false;
const testSupportOfCanvasCapureStream = () => {
    return 'function' === typeof HTMLCanvasElement.prototype.captureStream;
};
const hasPIP = document.pictureInPictureEnabled && !isSafari && testSupportOfCanvasCapureStream;

const DIM = writable({ w: 0, h: 0, s: 1, cw: 0, ch: 0 });
const urlBase = 'https://yeemachine.github.io/k2021/';

const inactive = writable(false);
const firstLoad = writable(false);
const firstLoad0_1 = tweened(0, {
    duration: 2000,
    easing: cubicInOut,
});

const largeWipe = writable(null);
const quickNavExpanded = writable(false);
const subNavExpanded = writable(null);
const infoExpanded = writable(false);

const getLocalStorage = async (store, key, fallback, callback) => {
    // console.log(key);
    localForage
        .getItem(key + version)
        .then(function(value) {
            let newValue = value !== null ? value : fallback;

            if (callback) {
                callback(newValue);
            }
            store.set(newValue);
        })
        .catch(function(err) {
            // store.set(fallback)
            console.error(err);
        });
};

const subLocalStorage = (
    store,
    key,
    exception = e => {
        return false;
    },
) => {
    store.subscribe(value => {
        if (exception(value)) {
            // console.log('break')
            return;
        }

        localForage.setItem(key + version, value);
    });
};

class Vector {
  constructor(a, b, c) {
    
    if (!!a && a.constructor === Array) {
      this.x = a[0] || 0;
      this.y = a[1] || 0;
      this.z = a[2] || 0;
      return
    }
    
    if (!!a && a.constructor === Object){
      this.x = a.x || 0;
      this.y = a.y || 0;
      this.z = a.z || 0;
      return
    }
  
    this.x = a || 0;
    this.y = b || 0;
    this.z = c || 0;
    
  }

  // Methods //
  negative() {
    return new Vector(-this.x, -this.y, -this.z);
  }
  add(v) {
    if (v instanceof Vector)
      return new Vector(this.x + v.x, this.y + v.y, this.z + v.z);
    else return new Vector(this.x + v, this.y + v, this.z + v);
  }
  subtract(v) {
    if (v instanceof Vector)
      return new Vector(this.x - v.x, this.y - v.y, this.z - v.z);
    else return new Vector(this.x - v, this.y - v, this.z - v);
  }
  multiply(v) {
    if (v instanceof Vector)
      return new Vector(this.x * v.x, this.y * v.y, this.z * v.z);
    else return new Vector(this.x * v, this.y * v, this.z * v);
  }
  divide(v) {
    if (v instanceof Vector)
      return new Vector(this.x / v.x, this.y / v.y, this.z / v.z);
    else return new Vector(this.x / v, this.y / v, this.z / v);
  }
  equals(v) {
    return this.x == v.x && this.y == v.y && this.z == v.z;
  }
  dot(v) {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  }
  cross(v) {
    return new Vector(
      this.y * v.z - this.z * v.y,
      this.z * v.x - this.x * v.z,
      this.x * v.y - this.y * v.x
    );
  }
  length() {
    return Math.sqrt(this.dot(this));
  }
  distance(v, d = 3) {
    //2D distance
    if (d === 2)
      return Math.sqrt(Math.pow(this.x - v.x, 2) + Math.pow(this.y - v.y, 2));
    //3D distance
    else
      return Math.sqrt(
        Math.pow(this.x - v.x, 2) +
          Math.pow(this.y - v.y, 2) +
          Math.pow(this.z - v.z, 2)
      );
  }
  lerp(v, fraction) {
    return v
      .subtract(this)
      .multiply(fraction)
      .add(this);
  }
  unit() {
    return this.divide(this.length());
  }
  min() {
    return Math.min(Math.min(this.x, this.y), this.z);
  }
  max() {
    return Math.max(Math.max(this.x, this.y), this.z);
  }
  toAngles() {
    return {
      theta: Math.atan2(this.z, this.x),
      phi: Math.asin(this.y / this.length())
    };
  }
  angleTo(a) {
    return Math.acos(this.dot(a) / (this.length() * a.length()));
  }
  toArray(n) {
    return [this.x, this.y, this.z].slice(0, n || 3);
  }
  clone() {
    return new Vector(this.x, this.y, this.z);
  }
  init(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
  }

  // static methods //
  static negative(a, b) {
    b.x = -a.x;
    b.y = -a.y;
    b.z = -a.z;
    return b;
  }
  static add(a, b, c) {
    if (b instanceof Vector) {
      c.x = a.x + b.x;
      c.y = a.y + b.y;
      c.z = a.z + b.z;
    } else {
      c.x = a.x + b;
      c.y = a.y + b;
      c.z = a.z + b;
    }
    return c;
  }
  static subtract(a, b, c) {
    if (b instanceof Vector) {
      c.x = a.x - b.x;
      c.y = a.y - b.y;
      c.z = a.z - b.z;
    } else {
      c.x = a.x - b;
      c.y = a.y - b;
      c.z = a.z - b;
    }
    return c;
  }
  static multiply(a, b, c) {
    if (b instanceof Vector) {
      c.x = a.x * b.x;
      c.y = a.y * b.y;
      c.z = a.z * b.z;
    } else {
      c.x = a.x * b;
      c.y = a.y * b;
      c.z = a.z * b;
    }
    return c;
  }
  static divide(a, b, c) {
    if (b instanceof Vector) {
      c.x = a.x / b.x;
      c.y = a.y / b.y;
      c.z = a.z / b.z;
    } else {
      c.x = a.x / b;
      c.y = a.y / b;
      c.z = a.z / b;
    }
    return c;
  }
  static cross(a, b, c) {
    c.x = a.y * b.z - a.z * b.y;
    c.y = a.z * b.x - a.x * b.z;
    c.z = a.x * b.y - a.y * b.x;
    return c;
  }
  static unit(a, b) {
    let length = a.length();
    b.x = a.x / length;
    b.y = a.y / length;
    b.z = a.z / length;
    return b;
  }
  static fromAngles(theta, phi) {
    return new Vector(
      Math.cos(theta) * Math.cos(phi),
      Math.sin(phi),
      Math.sin(theta) * Math.cos(phi)
    );
  }
  static randomDirection() {
    return Vector.fromAngles(
      Math.random() * Math.PI * 2,
      Math.asin(Math.random() * 2 - 1)
    );
  }
  static min(a, b) {
    return new Vector(
      Math.min(a.x, b.x),
      Math.min(a.y, b.y),
      Math.min(a.z, b.z)
    );
  }
  static max(a, b) {
    return new Vector(
      Math.max(a.x, b.x),
      Math.max(a.y, b.y),
      Math.max(a.z, b.z)
    );
  }
  static lerp(a, b, fraction) {
    if (b instanceof Vector) {
      return b
        .subtract(a)
        .multiply(fraction)
        .add(a);
    } else {
      return (b - a) * fraction + a;
    }
  }
  static fromArray(a) {
    if (!!a && a.constructor === Array) {
      return new Vector(a[0], a[1], a[2]);
    }
    return new Vector(a.x, a.y, a.z);
  }
  static angleBetween(a, b) {
    return a.angleTo(b);
  }
  static angleBetweenVertices(a,b,c){
    a.subtract(b);
    c.subtract(b);
    
  }
  static distance(a, b, d) {
    if (d === 2)
      return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
    else
      return Math.sqrt(
        Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2) + Math.pow(a.z - b.z, 2)
      );
  }
  static toDegrees(a) {
    return a * (180 / Math.PI);
  }
  static normalizeAngle (radians) {
    let TWO_PI = Math.PI*2;
    let angle = radians % TWO_PI;
    angle = angle > Math.PI ? angle - TWO_PI : angle < -Math.PI ? TWO_PI + angle : angle;
    //returns normalized values to -1,1
    return angle/Math.PI;
  }
  static normalizeRadians (radians){
    if (radians >= Math.PI/2){
        radians -= (2 * Math.PI);
    }
    if (radians <= - Math.PI/2){
        radians += (2 * Math.PI);
        radians = Math.PI - radians;
    }
    //returns normalized values to -1,1
    return radians/Math.PI
  }
  static find2DAngle(cx, cy, ex, ey) {
    var dy = ey - cy;
    var dx = ex - cx;
    var theta = Math.atan2(dy, dx);
    return theta;
  }
  //find 3D rotation of 2 points
  static findRotation(a, b, normalize=true) {
    if(normalize){
      return new Vector(
        Vector.normalizeRadians(Vector.find2DAngle(a.z, a.x, b.z, b.x)),
        Vector.normalizeRadians(Vector.find2DAngle(a.z, a.y, b.z, b.y)),
        Vector.normalizeRadians(Vector.find2DAngle(a.x, a.y, b.x, b.y))
      );
    }else {
      return new Vector(
       Vector.find2DAngle(a.z, a.x, b.z, b.x),
        Vector.find2DAngle(a.z, a.y, b.z, b.y),
        Vector.find2DAngle(a.x, a.y, b.x, b.y)
      );
    }
      
  }
  //find roll pitch yaw of plane formed by 3 points
  static rollPitchYaw(a, b, c) {
    if(!c){
      return new Vector(
        Vector.normalizeAngle(Vector.find2DAngle(a.z, a.y, b.z, b.y)),
        Vector.normalizeAngle(Vector.find2DAngle(a.z, a.x, b.z, b.x)),
        Vector.normalizeAngle(Vector.find2DAngle(a.x, a.y, b.x, b.y))
      );
    }
    let qb = b.subtract(a);
    let qc = c.subtract(a);
    let n = qb.cross(qc);

    let unitZ = n.unit();
    let unitX = qb.unit();
    let unitY = unitZ.cross(unitX);

    let beta = Math.asin(unitZ.x) || 0;
    let alpha = Math.atan2(-unitZ.y, unitZ.z) || 0;
    let gamma = Math.atan2(-unitY.x, unitX.x) || 0;

    return new Vector(
      Vector.normalizeAngle(alpha), 
      Vector.normalizeAngle(beta),
      Vector.normalizeAngle(gamma));
  }
  //find 2D angle between 3 points in space
  static angleBetween3DCoords(a, b, c) {
    if(a instanceof Vector === false){
      a = new Vector(a);
      b = new Vector(b);
      c = new Vector(c);
    }
    // Calculate vector between points 1 and 2
    const v1 = a.subtract(b);

    // Calculate vector between points 2 and 3
    
    const v2 = c.subtract(b);

    // The dot product of vectors v1 & v2 is a function of the cosine of the
    // angle between them (it's scaled by the product of their magnitudes).

    const v1norm = v1.unit();
    const v2norm = v2.unit();

    // Calculate the dot products of vectors v1 and v2
    const dotProducts = v1norm.dot(v2norm);

    // Extract the angle from the dot products
    const angle = Math.acos(dotProducts);
  
    // return single angle Normalized to 1
    return Vector.normalizeRadians(angle)
  };

}

/* src/scene/PanoBG.svelte generated by Svelte v3.46.4 */

function instance$E($$self, $$props, $$invalidate) {
	let { scene } = $$props;
	let { texture = null } = $$props;
	const geometry = new SphereGeometry(80, 640, 640);

	// invert the geometry on the x-axis so that all of the faces point inward
	geometry.scale(-1, 1, 1);

	new TextureLoader();
	const material = new MeshBasicMaterial();
	material.fog = false;
	const panoBG = new Mesh(geometry, material);
	panoBG.rotation.y = -Math.PI * 1.00;
	scene.add(panoBG);

	$$self.$$set = $$props => {
		if ('scene' in $$props) $$invalidate(0, scene = $$props.scene);
		if ('texture' in $$props) $$invalidate(1, texture = $$props.texture);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*texture, panoBG*/ 6) {
			{
				if (texture) {
					$$invalidate(2, panoBG.visible = true, panoBG);

					if (panoBG.material.map) {
						panoBG.material.map.dispose();
					}

					$$invalidate(2, panoBG.material.map = texture, panoBG);
					$$invalidate(2, panoBG.material.needsUpdate = true, panoBG);
				} else {
					$$invalidate(2, panoBG.visible = false, panoBG);
				}
			}
		}
	};

	return [scene, texture, panoBG];
}

class PanoBG extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$E, null, safe_not_equal, { scene: 0, texture: 1 });
	}
}

/* src/scene/SeaBG.svelte generated by Svelte v3.46.4 */
const animateWater = writable(false);
getLocalStorage(animateWater, 'animateWater', get_store_value(animateWater));
subLocalStorage(animateWater, 'animateWater');
var sea;

let updateSea = () => {
	if (!sea || !get_store_value(animateWater)) return;
	sea.material.uniforms['time'].value += .5 / 60.0;
};

function instance$D($$self, $$props, $$invalidate) {
	let $lightRotX;
	let $lightRotY;
	component_subscribe($$self, lightRotX, $$value => $$invalidate(4, $lightRotX = $$value));
	component_subscribe($$self, lightRotY, $$value => $$invalidate(5, $lightRotY = $$value));
	let { scene } = $$props;
	let { light } = $$props;
	let { hide = false } = $$props;
	const baseGeometry = new PlaneGeometry(100, 100);
	const loader = new TextureLoader();
	loader.crossOrigin = "anonymous";

	sea = new Water(baseGeometry,
	{
			textureWidth: 512,
			textureHeight: 512,
			waterNormals: loader.load('https://cdn.glitch.com/29e07830-2317-4b15-a044-135e73c7f840%2F95d0cfb2406ee5a65491bbaba429713684b5b089.jpeg?v=1622566026664', function (texture) {
				texture.wrapS = texture.wrapT = RepeatWrapping;
			}),
			sunDirection: new Vector3(),
			sunColor: 0xffffff,
			waterColor: 0x001e0f,
			distortionScale: 3.7,
			fog: scene.fog !== undefined
		});

	sea.rotation.x = -Math.PI / 2;
	sea.position.y = .01;
	const waterUniforms = sea.material.uniforms;
	waterUniforms.distortionScale.value = 1.2;
	waterUniforms.size.value = 10;
	waterUniforms.time.value = 40.5;
	waterUniforms.waterColor.value.r = 66 / 255;
	waterUniforms.waterColor.value.g = 135 / 255;
	waterUniforms.waterColor.value.b = 245 / 255;
	scene.add(sea);

	$$self.$$set = $$props => {
		if ('scene' in $$props) $$invalidate(0, scene = $$props.scene);
		if ('light' in $$props) $$invalidate(1, light = $$props.light);
		if ('hide' in $$props) $$invalidate(2, hide = $$props.hide);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*hide*/ 4) {
			sea.visible = !hide;
		}

		if ($$self.$$.dirty & /*$lightRotY, $lightRotX, light, waterUniforms*/ 58) {
			{
				if ($lightRotY || $lightRotX) {
					const worldPos = new Vector3();
					light.getWorldPosition(worldPos);
					worldPos.y -= 1;
					waterUniforms.sunDirection.value.copy(worldPos);
				}
			}
		}
	};

	return [scene, light, hide, waterUniforms, $lightRotX, $lightRotY];
}

class SeaBG extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$D, null, safe_not_equal, { scene: 0, light: 1, hide: 2 });
	}
}

/* src/scene/Shadows.svelte generated by Svelte v3.46.4 */
const shadowStrength = writable(.3);
const shadowBlur = writable(.2);
getLocalStorage(shadowStrength, 'shadowStrength', get_store_value(shadowStrength));
subLocalStorage(shadowStrength, 'shadowStrength');
getLocalStorage(shadowBlur, 'shadowBlur', get_store_value(shadowBlur));
subLocalStorage(shadowBlur, 'shadowBlur');

function instance$C($$self, $$props, $$invalidate) {
	let $shadowBlur,
		$$unsubscribe_shadowBlur = noop;

	let $shadowStrength,
		$$unsubscribe_shadowStrength = noop;

	component_subscribe($$self, shadowBlur, $$value => $$invalidate(3, $shadowBlur = $$value));
	component_subscribe($$self, shadowStrength, $$value => $$invalidate(4, $shadowStrength = $$value));
	$$self.$$.on_destroy.push(() => $$unsubscribe_shadowBlur());
	$$self.$$.on_destroy.push(() => $$unsubscribe_shadowStrength());
	let { scene } = $$props;
	let { light } = $$props;
	let { hide = false } = $$props;
	const baseGeometry = new PlaneGeometry(100, 100);
	const floorMaterial = new ShadowMaterial({ opacity: 0.2 });
	const floor = new Mesh(baseGeometry, floorMaterial);
	floor.rotation.x = -Math.PI / 2;
	floor.position.y = .01;
	floor.receiveShadow = true;
	scene.add(floor);

	$$self.$$set = $$props => {
		if ('scene' in $$props) $$invalidate(1, scene = $$props.scene);
		if ('light' in $$props) $$invalidate(0, light = $$props.light);
		if ('hide' in $$props) $$invalidate(2, hide = $$props.hide);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*$shadowStrength*/ 16) {
			floorMaterial.opacity = $shadowStrength;
		}

		if ($$self.$$.dirty & /*$shadowStrength*/ 16) {
			floor.visible = $shadowStrength > 0;
		}

		if ($$self.$$.dirty & /*$shadowBlur*/ 8) {
			$$invalidate(0, light.shadow.radius = $shadowBlur * 10, light);
		}
	};

	return [light, scene, hide, $shadowBlur, $shadowStrength];
}

class Shadows extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$C, null, safe_not_equal, { scene: 1, light: 0, hide: 2 });
	}
}

/* src/scene/bg.svelte generated by Svelte v3.46.4 */

function create_fragment$v(ctx) {
	let t0;
	let panobg;
	let t1;
	let seabg;
	let t2;
	let shadows;
	let current;

	panobg = new PanoBG({
			props: {
				scene: /*scene*/ ctx[0],
				texture: (/*$bgURL*/ ctx[3] && /*$bgURL*/ ctx[3].pano) === true
				? /*$bgTexture*/ ctx[2]
				: null
			}
		});

	seabg = new SeaBG({
			props: {
				scene: /*scene*/ ctx[0],
				light: /*light*/ ctx[1],
				hide: /*$bgURL*/ ctx[3] && !/*$bgURL*/ ctx[3].sea
			}
		});

	shadows = new Shadows({
			props: {
				scene: /*scene*/ ctx[0],
				light: /*light*/ ctx[1],
				hide: /*$bgURL*/ ctx[3] && !/*$bgURL*/ ctx[3].sea
			}
		});

	return {
		c() {
			t0 = space();
			create_component(panobg.$$.fragment);
			t1 = space();
			create_component(seabg.$$.fragment);
			t2 = space();
			create_component(shadows.$$.fragment);
		},
		m(target, anchor) {
			insert(target, t0, anchor);
			mount_component(panobg, target, anchor);
			insert(target, t1, anchor);
			mount_component(seabg, target, anchor);
			insert(target, t2, anchor);
			mount_component(shadows, target, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			const panobg_changes = {};
			if (dirty & /*scene*/ 1) panobg_changes.scene = /*scene*/ ctx[0];

			if (dirty & /*$bgURL, $bgTexture*/ 12) panobg_changes.texture = (/*$bgURL*/ ctx[3] && /*$bgURL*/ ctx[3].pano) === true
			? /*$bgTexture*/ ctx[2]
			: null;

			panobg.$set(panobg_changes);
			const seabg_changes = {};
			if (dirty & /*scene*/ 1) seabg_changes.scene = /*scene*/ ctx[0];
			if (dirty & /*light*/ 2) seabg_changes.light = /*light*/ ctx[1];
			if (dirty & /*$bgURL*/ 8) seabg_changes.hide = /*$bgURL*/ ctx[3] && !/*$bgURL*/ ctx[3].sea;
			seabg.$set(seabg_changes);
			const shadows_changes = {};
			if (dirty & /*scene*/ 1) shadows_changes.scene = /*scene*/ ctx[0];
			if (dirty & /*light*/ 2) shadows_changes.light = /*light*/ ctx[1];
			if (dirty & /*$bgURL*/ 8) shadows_changes.hide = /*$bgURL*/ ctx[3] && !/*$bgURL*/ ctx[3].sea;
			shadows.$set(shadows_changes);
		},
		i(local) {
			if (current) return;
			transition_in(panobg.$$.fragment, local);
			transition_in(seabg.$$.fragment, local);
			transition_in(shadows.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(panobg.$$.fragment, local);
			transition_out(seabg.$$.fragment, local);
			transition_out(shadows.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(t0);
			destroy_component(panobg, detaching);
			if (detaching) detach(t1);
			destroy_component(seabg, detaching);
			if (detaching) detach(t2);
			destroy_component(shadows, detaching);
		}
	};
}

const bgURL = writable(null);
let bgTexture = writable(null);
let bgList = writable([]);

let presetBGs = [
	{
		type: 'img',
		name: 'Morning Haze',
		url: "https://yeemachine.github.io/k2021/img/bg/morning_bg.jpg",
		thumbnail: "https://yeemachine.github.io/k2021/img/bg/morning_bg.jpg",
		pano: false,
		sea: false,
		light: '#ffffff'
	},
	{
		type: 'img',
		name: 'After Glow',
		url: "https://yeemachine.github.io/k2021/img/bg/midday_bg.jpg",
		thumbnail: "https://yeemachine.github.io/k2021/img/bg/midday_bg.jpg",
		pano: false,
		sea: false,
		light: '#ffffff'
	},
	{
		type: 'img',
		name: 'City Lights',
		url: "https://yeemachine.github.io/k2021/img/bg/night_bg.jpg",
		thumbnail: "https://yeemachine.github.io/k2021/img/bg/night_bg.jpg",
		pano: false,
		sea: false,
		light: '#ffffff'
	},
	{
		type: 'color',
		name: 'Transparent',
		url: '#00fc0100'
	},
	{
		type: 'color',
		name: 'White',
		url: '#ffffff'
	},
	{
		type: 'color',
		name: 'Chroma Green',
		url: '#00fc01'
	},
	{
		type: 'color',
		name: 'Chroma Blue',
		url: '#0033cc'
	},
	{
		type: 'color',
		name: 'Chroma Pink',
		url: '#ff00ff'
	}
];

let preset3DBGs = [
	{
		type: 'img',
		name: 'Starry Sea',
		url: "https://yeemachine.github.io/k2021/img/pano/starrynight.jpg",
		thumbnail: "https://yeemachine.github.io/k2021/img/pano/starrynight_icon.jpg",
		pano: true,
		sea: true,
		light: "#D2F4FF"
	},
	{
		type: 'img',
		name: 'Perseverance',
		url: "https://yeemachine.github.io/k2021/img/pano/mars.jpg",
		thumbnail: "https://yeemachine.github.io/k2021/img/pano/mars_icon.jpg",
		pano: true,
		sea: true,
		light: '#FFE8D2'
	},
	{
		type: 'img',
		name: 'Monument Valley',
		url: "https://yeemachine.github.io/k2021/img/pano/monumentvalley.jpg",
		thumbnail: "https://yeemachine.github.io/k2021/img/pano/monumentvalley_icon.jpg",
		pano: true,
		sea: true,
		light: "#ffffff"
	},
	{
		type: 'img',
		name: 'Cosy Loft',
		url: "https://yeemachine.github.io/k2021/img/pano/loft.jpg",
		thumbnail: "https://yeemachine.github.io/k2021/img/pano/loft_icon.jpg",
		pano: true,
		sea: false,
		light: '#FCDFA9'
	},
	{
		type: 'img',
		name: 'Factory',
		url: "https://yeemachine.github.io/k2021/img/pano/factory.jpg",
		thumbnail: "https://yeemachine.github.io/k2021/img/pano/factory_icon.jpg",
		pano: true,
		sea: false,
		light: '#FCDFA9'
	}
];

getLocalStorage(bgList, 'bgList', [], createBlobURL);
subLocalStorage(bgList, 'bgList');
getLocalStorage(bgURL, 'bgURL', preset3DBGs[0], createBlobURL);
subLocalStorage(bgURL, 'bgURL');

const updateBG = (width, height) => {
	let texture = get_store_value(bgTexture);

	if (texture && texture.image && !texture.isPano) {
		// const canvasAspect = window.innerWidth / window.innerHeight;
		const canvasAspect = width / height;

		const imageAspect = texture.image.width / texture.image.height;
		const aspect = imageAspect / canvasAspect;
		texture.offset.x = aspect > 1 ? (1 - 1 / aspect) / 2 : 0;
		texture.repeat.x = aspect > 1 ? 1 / aspect : 1;
		texture.offset.y = aspect > 1 ? 0 : (1 - aspect) / 2;
		texture.repeat.y = aspect > 1 ? 1 : aspect;
	}
};

function instance$B($$self, $$props, $$invalidate) {
	let $DIM;
	let $lightColor;

	let $bgTexture,
		$$unsubscribe_bgTexture = noop;

	let $bgURL,
		$$unsubscribe_bgURL = noop;

	component_subscribe($$self, DIM, $$value => $$invalidate(6, $DIM = $$value));
	component_subscribe($$self, lightColor, $$value => $$invalidate(7, $lightColor = $$value));
	component_subscribe($$self, bgTexture, $$value => $$invalidate(2, $bgTexture = $$value));
	component_subscribe($$self, bgURL, $$value => $$invalidate(3, $bgURL = $$value));
	$$self.$$.on_destroy.push(() => $$unsubscribe_bgTexture());
	$$self.$$.on_destroy.push(() => $$unsubscribe_bgURL());
	let { scene } = $$props;
	let { light } = $$props;
	let { glowLight } = $$props;
	let { renderer } = $$props;
	const loader = new TextureLoader();

	bgURL.subscribe(async val => {
		if (val) {
			switch (val.type) {
				case 'img':
					loader.load(val.url, res => {
						res.isPano = val.pano;
						bgTexture.set(res);
						$$invalidate(0, scene.background = $bgTexture, scene);
						updateBG($DIM.w, $DIM.h);
					});
					if (val.light) {
						lightColor.set(val.light);
					} else {
						$$invalidate(1, light.color = new Color($lightColor), light);
					}
					break;
				case 'color':
					if (val.url.length > 7) {
						$$invalidate(0, scene.background = null, scene);
					} else {
						$$invalidate(0, scene.background = new Color(val.url), scene);
					}
					$$invalidate(1, light.color = new Color($lightColor), light);
					break;
				case 'iro':
					$$invalidate(0, scene.background = new Color(val.url), scene);
					$$invalidate(1, light.color = new Color($lightColor), light);
					break;
			}
		}
	});

	$$self.$$set = $$props => {
		if ('scene' in $$props) $$invalidate(0, scene = $$props.scene);
		if ('light' in $$props) $$invalidate(1, light = $$props.light);
		if ('glowLight' in $$props) $$invalidate(4, glowLight = $$props.glowLight);
		if ('renderer' in $$props) $$invalidate(5, renderer = $$props.renderer);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*$DIM*/ 64) {
			{
				updateBG($DIM.w, $DIM.h);
			}
		}
	};

	return [scene, light, $bgTexture, $bgURL, glowLight, renderer, $DIM];
}

class Bg extends SvelteComponent {
	constructor(options) {
		super();

		init(this, options, instance$B, create_fragment$v, safe_not_equal, {
			scene: 0,
			light: 1,
			glowLight: 4,
			renderer: 5
		});
	}
}

const tagline = {
    en: 'Face and full-body tracking!',
    ru: 'стать <strong>виртуальным персонажем</strong>',
};

const tooltip = {
    cameraOn: {
        en: 'Stop Face Tracking',
        ru: 'Выключите веб-камеру',
    },
    cameraOff: {
        en: 'Start Face Tracking',
        ru: 'Включите веб-камеру',
    },
    char: {
        en: 'Characters',
        ru: 'Символы',
    },
    sticker: {
        en: 'Stickers',
        ru: 'Наклейки',
    },
    bg: {
        en: 'Backgrounds',
        ru: 'Фоны',
    },
    call: {
        en: 'Call a friend',
        ru: 'Позвонить другу',
    },
    exp: {
        en: 'Accessories',
        ru: 'Выражения',
    },
    pip: {
        en: 'Picture-in-Picture',
        ru: 'Выражения',
    },
    selfie: {
        en: 'Selfie Mode',
        ru: 'Выражения',
    },
    firstPerson: {
        en: 'First Person Mode',
        ru: 'Выражения',
    },
    flip: {
        en: 'Flip Camera',
        ru: 'Выражения',
    },
    settings: {
        en: 'Settings',
        ru: 'Выражения',
    },
    lights: {
        en: 'Effects',
        ru: 'Выражения',
    },
    hide: {
        en: 'Hide Controls',
        ru: 'Выражения',
    },
    show: {
        en: 'Show Controls',
        ru: 'Выражения',
    },
};

const ftueText = {
    sticker: {
        message: {
            en: 'Add <b>image/gif</b> stickers that you can resize and use as props for videos or streaming.',
        },
        confirm: {
            en: 'Sounds good',
        },
    },
    bg: {
        message: {
            en:
                'Add <b>photo</b> backgrounds, use the <b>color picker</b>, or select <b>transparent bg</b> for streaming software like OBS.',
        },
        confirm: {
            en: 'Sounds good',
        },
    },
    call: {
        message: {
            en:
                'Share your <b>6 digit code</b> with a friend to start a private <b>voice call</b> using virtual avatars!',
        },
        confirm: {
            en: "Let's go",
        },
    },
    char: {
        message: {
            en:
                'Drag and drop <b>.vrm</b> files to load your own character models. Uploads are saved locally for future visits!',
        },
        confirm: {
            en: 'Start now',
        },
    },
};

const subnav_live2d_text = {
    upload: {
        en: 'Upload .vrm file',
    },
    feed: {
        on: {
            en: 'Show Camera Feed',
        },
        off: {
            en: 'Hide Camera Feed',
        },
    },
};

const subnav_bg_text = {
    upload: {
        en: 'Upload Image BG',
    },
    upload3D: {
        en: 'Upload Panorama Img',
    },
};

const subnav_sticker_text = {
    upload: {
        en: 'Upload .jpg, .png, .gif, .mp4',
    },
};

const subnav_call_text = {
    label: {
        default: {
            en: 'Enter 6 digit Chat ID',
        },
        disconnected: {
            en: 'Disconnected from server',
        },
        connected: {
            en: 'Call with',
        },
    },
    connecting: {
        en: 'Connecting...',
    },
    disconnected: {
        en: 'Tap to reconnect',
    },
    id: {
        share: {
            en: 'Or share your Chat ID:',
        },
        copied: {
            en: 'Copied to clipboard',
        },
    },
};

const cardText = [
    {
        en: 'Start Vtubing!',
    },
    {
        en:
            "<b>Animate your character with your webcam!</b><br><br>As a sequal to <a href='https://kalidoface.com' target='_blank'><b>Kalidoface</b></a>, Kalidoface 3D brings support for 3D Vtuber avatars, more dynamic camera angles, and even full-body tracking options. Add the app to your homescreen to use it in standalone full screen or even add it to OBS as a browser object directly.",
    },
    {
        en:
            "Kalidoface 3D works with <b>VRM rigged 3D models</b>. Just drag and drop your own .vrm files to add your Vtuber character.<br><br>Models are saved locally so you won't need to reupload them next visit!",
    },
    {
        en:
            "Share your 6 digit code with a friend and have <b>one-on-one calls</b> using expressive avatars when you're not in the mood for regular video. Perfect for livestream collabs or just chatting.",
    },
    {
        en:
            'Upload image backgrounds, or use the included <b>chroma key colors</b> for keying in special software such as OBS. You can also upload resizeable <b>gif stickers</b> to use as props for your videos/streams. Uploaded images are also saved locally for the next time you visit!',
    },
    {
        header: {
            en: 'Have fun!',
        },
        p: {
            en:
                "Hope you enjoy using Kalidoface! This app was developed to provide a super simple way to become a <b>Vtuber</b>. All you need is a webcam and a web browser and you too can embody a virtual character! Whether it be for live streaming or short meme videos, Kalidoface offers real-time face tracking without needing to install anything. Kalidoface is powered by <a href='https://github.com/yeemachine/kalidokit' target='_blank'><b>KalidoKit</b></a>, an open source face, pose, and hand rigger with the intention to make motion capture easy to use on the web.<br><br>Feel free to reach out to me <a href='https://twitter.com/yeemachine' target='_blank'><b>@yeemachine</b></a>.",
        },
    },
    {
        header: {
            en: 'Special thanks',
        },
        p: {
            en: "This project wouldn't have been possible without the support of these amazing people!",
        },
        list: {
            en: [
                'Logo, Icons, Illustrations',
                'three/vrm',
                'Dev Platform',
                'Holistic',
                'Facemesh',
            ],
        },
    },
    {
        header: {
            en: 'Model Credits',
        },
        p: {
            en: 'Demo models provided or purchased from these talented artists!',
        },
    },
    {
        header: {
            en: 'Discord server coming soon...',
        },
        p: {
            en: 'A dedicated server coming soon...',
        },
    },
];

const cardEndText = {
    close: {
        en: "Let's go!",
    },
    refresh: {
        en: 'Refresh cards',
    },
};

var pip_svelte_svelte_type_style_lang = '';

/* src/scene/pip.svelte generated by Svelte v3.46.4 */

function create_fragment$u(ctx) {
	let video;
	let mounted;
	let dispose;

	return {
		c() {
			video = element("video");
			attr(video, "id", "pip");
			video.muted = true;
			video.playsInline = true;
			attr(video, "class", "svelte-1rxu17a");
			toggle_class(video, "enabled", /*$pipEnabled*/ ctx[1]);
		},
		m(target, anchor) {
			insert(target, video, anchor);
			/*video_binding*/ ctx[3](video);

			if (!mounted) {
				dispose = [
					listen(video, "enterpictureinpicture", enterpictureinpicture_handler),
					listen(video, "leavepictureinpicture", /*leavepictureinpicture_handler*/ ctx[4])
				];

				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (dirty & /*$pipEnabled*/ 2) {
				toggle_class(video, "enabled", /*$pipEnabled*/ ctx[1]);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(video);
			/*video_binding*/ ctx[3](null);
			mounted = false;
			run_all(dispose);
		}
	};
}

const pipEnabled = writable(false);

const togglePIP = async e => {
	pipEnabled.set(true);
};

const enterpictureinpicture_handler = () => {
	
};

function instance$A($$self, $$props, $$invalidate) {
	let $pipEnabled,
		$$unsubscribe_pipEnabled = noop;

	component_subscribe($$self, pipEnabled, $$value => $$invalidate(1, $pipEnabled = $$value));
	$$self.$$.on_destroy.push(() => $$unsubscribe_pipEnabled());
	let { canvas } = $$props;
	let Stream, pip;

	const getStream = async () => {
		if (!Stream || Stream.active === false) {
			try {
				Stream = canvas.captureStream();
				handleStream(Stream, pip);
			} catch(error) {
				pipEnabled.set(false);
				console(error);
			}
		}
	};

	let checkStream;

	const handleStream = (stream, videoObj) => {
		// console.log(stream)
		videoObj.srcObject = stream;

		checkStream = setInterval(
			() => {
				if (videoObj.readyState >= 3) {
					videoObj.play();
					activatePIP(videoObj);

					//stop checking every half second
					clearInterval(checkStream);
				}
			},
			500
		);
	};

	const stopStream = () => {
		if (Stream) {
			Stream.getTracks().forEach(track => track.stop());
		}

		pipEnabled.set(false);
		clearInterval(checkStream);
	};

	const activatePIP = async pip => {
		try {
			// let pip = document.querySelector('#pip')
			if (pip !== document.pictureInPictureElement) {
				pip.play();
				await pip.requestPictureInPicture();
			} else {
				await pip.exitPictureInPicture();
			}
		} catch(error) {
			console.log(`> Argh! ${error}`);
		} finally {
			
		}
	};

	pipEnabled.subscribe(val => {
		if (val) {
			getStream();
		} else {
			stopStream();
		}
	});

	function video_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			pip = $$value;
			$$invalidate(0, pip);
		});
	}

	const leavepictureinpicture_handler = () => {
		pipEnabled.set(false);
	};

	$$self.$$set = $$props => {
		if ('canvas' in $$props) $$invalidate(2, canvas = $$props.canvas);
	};

	return [pip, $pipEnabled, canvas, video_binding, leavepictureinpicture_handler];
}

class Pip extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$A, create_fragment$u, safe_not_equal, { canvas: 2 });
	}
}

var webcam_svelte_svelte_type_style_lang = '';

/* src/tracking/webcam.svelte generated by Svelte v3.46.4 */

function create_fragment$t(ctx) {
	let container;
	let div;
	let video;
	let t0;
	let canvas;
	let t1;
	let button;
	let div_class_value;
	let mounted;
	let dispose;

	return {
		c() {
			container = element("container");
			div = element("div");
			video = element("video");
			t0 = space();
			canvas = element("canvas");
			t1 = space();
			button = element("button");
			button.innerHTML = `<i class="kalicon notranslate solid small">close</i>`;
			attr(video, "id", "user-cam");
			video.autoplay = true;
			video.muted = true;
			video.playsInline = true;
			attr(video, "class", "svelte-rw7740");
			toggle_class(video, "hide", /*$hideFace*/ ctx[4]);
			attr(canvas, "class", "output_canvas svelte-rw7740");
			attr(canvas, "width", "1280px");
			attr(canvas, "height", "720px");
			attr(button, "class", "svelte-rw7740");
			attr(div, "id", "drag-cam");
			set_style(div, "--margin", videoPosition.m);

			attr(div, "class", div_class_value = "" + (null_to_empty(/*$hideCamera*/ ctx[2] || !/*$cameraOn*/ ctx[1] || !/*$videoReady*/ ctx[0] || /*$pipEnabled*/ ctx[3]
			? 'hide'
			: '') + " svelte-rw7740"));

			attr(container, "class", "svelte-rw7740");
		},
		m(target, anchor) {
			insert(target, container, anchor);
			append(container, div);
			append(div, video);
			/*video_binding*/ ctx[6](video);
			append(div, t0);
			append(div, canvas);
			/*canvas_binding*/ ctx[7](canvas);
			append(div, t1);
			append(div, button);

			if (!mounted) {
				dispose = [
					listen(button, "click", /*click_handler*/ ctx[8]),
					listen(div, "mouseenter", /*mouseenter_handler*/ ctx[9]),
					listen(div, "mouseleave", /*mouseleave_handler*/ ctx[10])
				];

				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (dirty & /*$hideFace*/ 16) {
				toggle_class(video, "hide", /*$hideFace*/ ctx[4]);
			}

			if (dirty & /*videoPosition*/ 0) {
				set_style(div, "--margin", videoPosition.m);
			}

			if (dirty & /*$hideCamera, $cameraOn, $videoReady, $pipEnabled*/ 15 && div_class_value !== (div_class_value = "" + (null_to_empty(/*$hideCamera*/ ctx[2] || !/*$cameraOn*/ ctx[1] || !/*$videoReady*/ ctx[0] || /*$pipEnabled*/ ctx[3]
			? 'hide'
			: '') + " svelte-rw7740"))) {
				attr(div, "class", div_class_value);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(container);
			/*video_binding*/ ctx[6](null);
			/*canvas_binding*/ ctx[7](null);
			mounted = false;
			run_all(dispose);
		}
	};
}

const cameraOn = writable(false);
const videoReady = writable(false);
let videoEl = null;
let canvasEl = null;
let canvasCtx = null;
const hideCamera = writable(true);
const hideFace = writable(true);
getLocalStorage(hideCamera, 'hideCamera', false);
subLocalStorage(hideCamera, 'hideCamera');
getLocalStorage(hideFace, 'hideFace', true);
subLocalStorage(hideFace, 'hideFace');

const videoPosition = {
	x: 0,
	y: 0,
	sx: 0,
	sy: 0,
	m: 8,
	hover: false,
	active: false
};

const capturedDevices = writable({
	videoinput: [],
	audioinput: [],
	audiooutput: [],
	currentVideoIndex: 0,
	currentAudioIndex: 0
});

let videoDeviceId = writable(null);

function handleError(error) {
	console.log('navigator.MediaDevices.getUserMedia error: ', error.message, error.name);
}

function instance$z($$self, $$props, $$invalidate) {
	let $DIM;

	let $videoReady,
		$$unsubscribe_videoReady = noop;

	let $cameraOn,
		$$unsubscribe_cameraOn = noop;

	let $capturedDevices,
		$$unsubscribe_capturedDevices = noop;

	let $videoDeviceId,
		$$unsubscribe_videoDeviceId = noop;

	let $hideCamera,
		$$unsubscribe_hideCamera = noop;

	let $pipEnabled;

	let $hideFace,
		$$unsubscribe_hideFace = noop;

	component_subscribe($$self, DIM, $$value => $$invalidate(5, $DIM = $$value));
	component_subscribe($$self, videoReady, $$value => $$invalidate(0, $videoReady = $$value));
	component_subscribe($$self, cameraOn, $$value => $$invalidate(1, $cameraOn = $$value));
	component_subscribe($$self, capturedDevices, $$value => $$invalidate(13, $capturedDevices = $$value));
	component_subscribe($$self, videoDeviceId, $$value => $$invalidate(14, $videoDeviceId = $$value));
	component_subscribe($$self, hideCamera, $$value => $$invalidate(2, $hideCamera = $$value));
	component_subscribe($$self, pipEnabled, $$value => $$invalidate(3, $pipEnabled = $$value));
	component_subscribe($$self, hideFace, $$value => $$invalidate(4, $hideFace = $$value));
	$$self.$$.on_destroy.push(() => $$unsubscribe_videoReady());
	$$self.$$.on_destroy.push(() => $$unsubscribe_cameraOn());
	$$self.$$.on_destroy.push(() => $$unsubscribe_capturedDevices());
	$$self.$$.on_destroy.push(() => $$unsubscribe_videoDeviceId());
	$$self.$$.on_destroy.push(() => $$unsubscribe_hideCamera());
	$$self.$$.on_destroy.push(() => $$unsubscribe_hideFace());

	function gotDevices(deviceInfos) {
		for (let i = 0; i !== deviceInfos.length; ++i) {
			const deviceInfo = deviceInfos[i];

			if (deviceInfo.kind === 'audioinput') {
				$capturedDevices.audioinput.push(deviceInfo);
			} else if (deviceInfo.kind === 'audiooutput') {
				$capturedDevices.audiooutput.push(deviceInfo);
			} else if (deviceInfo.kind === 'videoinput') {
				if (deviceInfo.deviceId !== '' && !$capturedDevices.videoinput.find(o => o.deviceId === deviceInfo.deviceId)) {
					$capturedDevices.videoinput.push(deviceInfo);
				}
			} else {
				if (deviceInfo.deviceId !== '' && !$capturedDevices.videoinput.find(o => o.deviceId === deviceInfo.deviceId)) {
					$capturedDevices.videoinput.push(deviceInfo);
				}

				console.log('Some other kind of source/device: ', deviceInfo);
			}
		}

		$capturedDevices.videoinput.forEach((e, i) => {
			//move any virtual cams to the end of array
			if (e.label.includes('Virtual') || e.label.includes('virtual')) {
				$capturedDevices.videoinput.push($capturedDevices.videoinput.splice(i, 1)[0]);
			}
		});

		capturedDevices.set($capturedDevices);

		if (!$videoDeviceId) {
			videoDeviceId.set($capturedDevices.videoinput[0].deviceId);
		}
	}

	navigator.mediaDevices.enumerateDevices().then(gotDevices).catch(handleError);
	let Stream;

	const getStream = () => {
		const constraints = {
			video: {
				deviceId: $videoDeviceId ? { exact: $videoDeviceId } : undefined,
				facingMode: "user",
				width: { min: 480, ideal: 640, max: 640 },
				height: { min: 480, ideal: 480, max: 480 }
			},
			audio: false
		};

		// Get access to the camera!
		if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
			if (!Stream || Stream.active === false) {
				navigator.mediaDevices.getUserMedia(constraints).then(stream => {
					Stream = stream;
					handleStream(stream);

					if ($capturedDevices.videoinput.length === 0) {
						return navigator.mediaDevices.enumerateDevices().then(gotDevices).catch(handleError);
					}
				}).catch(err => {
					alert('Please allow camera for facial tracking.');

					setTimeout(
						() => {
							cameraOn.set(false);
							videoReady.set(false);
						},
						1000
					);
				});
			} else {
				stopStream();
			}
		}
	};

	let checkStream;

	const handleStream = stream => {
		// console.log(stream)
		videoEl.srcObject = stream;

		checkStream = setInterval(
			() => {
				if (videoEl.readyState >= 3) {
					videoReady.set(true);
					videoEl.play();
					videoEl.width = videoEl.videoWidth;
					videoEl.height = videoEl.videoHeight;

					//stop checking every half second
					clearInterval(checkStream);
				}
			},
			500
		);
	};

	const stopStream = () => {
		if (Stream) {
			Stream.getTracks().forEach(track => track.stop());
		}

		videoReady.set(false);
		clearInterval(checkStream);
	};

	cameraOn.subscribe(val => {
		if (val) {
			getStream();
		} else {
			setTimeout(stopStream, 50);
		}
	});

	videoDeviceId.subscribe(val => {
		if ($cameraOn && $videoReady) {
			stopStream();
			getStream();
		}
	}); // console.log(val)

	onMount(() => {
		canvasCtx = canvasEl.getContext('2d');

		interact('#drag-cam').draggable({
			// inertia: {
			//   resistance: isTouch ? 300 : 10,
			// },
			inertia: isTouch ? false : true,
			modifiers: [
				interact.modifiers.restrictRect({
					restriction: 'parent',
					endOnly: true,
					elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
				})
			],
			listeners: {
				start(event) {
					
				},
				move(event) {
					//save position in px
					videoPosition.x += event.dx;

					videoPosition.y += event.dy;

					//save position in ratio
					videoPosition.sx = videoPosition.x / ($DIM.w - event.target.offsetWidth - videoPosition.m * 2);

					videoPosition.sy = videoPosition.y / ($DIM.h - event.target.offsetHeight - videoPosition.m * 2);

					//apply position transforms
					event.target.style.webkitTransform = event.target.style.transform = `translate(${videoPosition.x}px, ${videoPosition.y}px)`;
				}
			}
		}).on('down', function (event) {
			videoPosition.active = true;
		}).on('up', function (event) {
			videoPosition.active = false;
		});
	});

	function video_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			videoEl = $$value;
		});
	}

	function canvas_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			canvasEl = $$value;
		});
	}

	const click_handler = () => {
		hideCamera.set(true);
	};

	const mouseenter_handler = () => {
		videoPosition.hover = true;
	};

	const mouseleave_handler = () => {
		videoPosition.hover = false;
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*$videoReady, videoPosition, $DIM*/ 33) {
			{
				if ($videoReady) {
					videoPosition.x = videoPosition.sx * ($DIM.w - videoEl.offsetWidth - videoPosition.m * 2);
					videoPosition.y = videoPosition.sy * ($DIM.h - videoEl.offsetHeight - videoPosition.m * 2);
					document.querySelector('#drag-cam').style.webkitTransform = document.querySelector('#drag-cam').style.transform = `translate(${videoPosition.x}px, ${videoPosition.y}px)`;
				}
			}
		}
	};

	return [
		$videoReady,
		$cameraOn,
		$hideCamera,
		$pipEnabled,
		$hideFace,
		$DIM,
		video_binding,
		canvas_binding,
		click_handler,
		mouseenter_handler,
		mouseleave_handler
	];
}

class Webcam extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$z, create_fragment$t, safe_not_equal, {});
	}
}

/* src/scene/profiles.svelte generated by Svelte v3.46.4 */

const profiles = writable({
	user: {
		id: 'user',
		model: null,
		live2d: null,
		position: {
			x: 0,
			y: window.innerWidth > 600 ? .7 : .55,
			z: 0
		},
		currentExp: 0,
		expressions: [],
		zoom: .5,
		destroying: false,
		detected: false,
		tracking: JSON.parse(JSON.stringify(RestingDefault$1))
	},
	friend: {
		id: 'friend',
		model: null,
		live2d: null,
		position: {
			x: 1,
			y: window.innerWidth > 600 ? .7 : .55,
			z: 0
		},
		currentExp: 0,
		expressions: [],
		zoom: .5,
		destroying: false,
		detected: true,
		tracking: JSON.parse(JSON.stringify(RestingDefault$1))
	}
});

let counter;
let startTime;
  
function resetTimer() {
      callTime.set('0:00');
      clearInterval(counter);
      counter = null;
}
 function initCounter(){
    startTime = Date.now();

    counter = setInterval(function() {

    // Get today's date and time
    var now = Date.now();

    // Find the distance between now and the count down date
    var distance = now - startTime;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    let d = days===0 ? '' : days+':';
    let h = hours===0 && days===0 ? '' : 
      hours!==0 && days===0 ? hours+':'
      : ('0'+hours).slice(-2)+':';
    let m = minutes ===0 && hours ===0 ? '0:' 
      : minutes!==0 && hours===0 ? minutes+':' 
      : ('0'+minutes).slice(-2)+':';
    let s = ('0'+seconds).slice(-2);

    callTime.set(d+h+m+s);
  }, 1000);
}

var notif_svelte_svelte_type_style_lang = '';

/* src/ui/notif.svelte generated by Svelte v3.46.4 */

function create_if_block$e(ctx) {
	let div;
	let t_value = /*$notifText*/ ctx[0].text + "";
	let t;
	let div_class_value;
	let div_intro;
	let div_outro;
	let current;

	return {
		c() {
			div = element("div");
			t = text(t_value);
			attr(div, "class", div_class_value = "notification " + /*$notifText*/ ctx[0].type + " svelte-1g24hxh");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, t);
			current = true;
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;
			if ((!current || dirty & /*$notifText*/ 1) && t_value !== (t_value = /*$notifText*/ ctx[0].text + "")) set_data(t, t_value);

			if (!current || dirty & /*$notifText*/ 1 && div_class_value !== (div_class_value = "notification " + /*$notifText*/ ctx[0].type + " svelte-1g24hxh")) {
				attr(div, "class", div_class_value);
			}
		},
		i(local) {
			if (current) return;

			add_render_callback(() => {
				if (div_outro) div_outro.end(1);

				div_intro = create_in_transition(div, fly, {
					y: /*$DIM*/ ctx[1].w > 600 ? 20 : -20,
					easing: cubicInOut,
					duration: 400
				});

				div_intro.start();
			});

			current = true;
		},
		o(local) {
			if (div_intro) div_intro.invalidate();

			div_outro = create_out_transition(div, fly, {
				y: /*$DIM*/ ctx[1].w > 600 ? 20 : -20,
				easing: cubicInOut,
				duration: 400,
				delay: 200
			});

			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			if (detaching && div_outro) div_outro.end();
		}
	};
}

// (23:0) {#key $notifText}
function create_key_block(ctx) {
	let if_block_anchor;
	let current;
	let if_block = /*$notifText*/ ctx[0] && create_if_block$e(ctx);

	return {
		c() {
			if (if_block) if_block.c();
			if_block_anchor = empty();
		},
		m(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			insert(target, if_block_anchor, anchor);
			current = true;
		},
		p(ctx, dirty) {
			if (/*$notifText*/ ctx[0]) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*$notifText*/ 1) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block$e(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o(local) {
			transition_out(if_block);
			current = false;
		},
		d(detaching) {
			if (if_block) if_block.d(detaching);
			if (detaching) detach(if_block_anchor);
		}
	};
}

function create_fragment$s(ctx) {
	let previous_key = /*$notifText*/ ctx[0];
	let key_block_anchor;
	let current;
	let key_block = create_key_block(ctx);

	return {
		c() {
			key_block.c();
			key_block_anchor = empty();
		},
		m(target, anchor) {
			key_block.m(target, anchor);
			insert(target, key_block_anchor, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			if (dirty & /*$notifText*/ 1 && safe_not_equal(previous_key, previous_key = /*$notifText*/ ctx[0])) {
				group_outros();
				transition_out(key_block, 1, 1, noop);
				check_outros();
				key_block = create_key_block(ctx);
				key_block.c();
				transition_in(key_block);
				key_block.m(key_block_anchor.parentNode, key_block_anchor);
			} else {
				key_block.p(ctx, dirty);
			}
		},
		i(local) {
			if (current) return;
			transition_in(key_block);
			current = true;
		},
		o(local) {
			transition_out(key_block);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(key_block_anchor);
			key_block.d(detaching);
		}
	};
}

const notifText = writable(null);

function instance$y($$self, $$props, $$invalidate) {
	let $notifText,
		$$unsubscribe_notifText = noop;

	let $DIM;
	component_subscribe($$self, notifText, $$value => $$invalidate(0, $notifText = $$value));
	component_subscribe($$self, DIM, $$value => $$invalidate(1, $DIM = $$value));
	$$self.$$.on_destroy.push(() => $$unsubscribe_notifText());
	let time;

	const resetTimer = () => {
		clearTimeout(time);

		time = setTimeout(
			() => {
				notifText.set(null);
			},
			3000
		);
	};

	notifText.subscribe(val => {
		if (val) {
			resetTimer();
		}
	});

	return [$notifText, $DIM];
}

class Notif extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$y, create_fragment$s, safe_not_equal, {});
	}
}

/* src/tracking/sendTrackingToPeer.svelte generated by Svelte v3.46.4 */

const compressXYZ = (obj, key, val) => {
	obj[key + 'X'] = val.x;
	obj[key + 'Y'] = val.y;
	obj[key + 'Z'] = val.z;
};

const expandXYZ = (obj, key, val, side = null) => {
	if (side) {
		obj[side][key] = {
			x: val[side + key + 'X'],
			y: val[side + key + 'Y'],
			z: val[side + key + 'Z']
		};
	} else {
		obj[key] = {
			x: val[key + 'X'],
			y: val[key + 'Y'],
			z: val[key + 'Z']
		};
	}
};

let fps = 10;
let fpsInterval = 1000 / fps;
let then = window.performance.now();

const sendTrackingData = async () => {
	if (!get_store_value(p2pConnection)) {
		return;
	}

	let now = window.performance.now();
	let elapsed = now - then;

	if (elapsed < fpsInterval) {
		return;
	}

	then = now - elapsed % fpsInterval;
	let profile = get_store_value(profiles).user;

	let trackingData = {
		headX: profile.tracking.Face.head.x,
		headY: profile.tracking.Face.head.y,
		headZ: profile.tracking.Face.head.z,
		eyeL: profile.tracking.Face.eye.l,
		eyeR: profile.tracking.Face.eye.r,
		brow: profile.tracking.Face.brow,
		pupilX: profile.tracking.Face.pupil.x,
		pupilY: profile.tracking.Face.pupil.y,
		mouthX: profile.tracking.Face.mouth.x,
		mouthY: profile.tracking.Face.mouth.y,
		mouthA: profile.tracking.Face.mouth.shape.A,
		mouthE: profile.tracking.Face.mouth.shape.E,
		mouthI: profile.tracking.Face.mouth.shape.I,
		mouthO: profile.tracking.Face.mouth.shape.O,
		mouthU: profile.tracking.Face.mouth.shape.U,
		detected: profile.detected,
		type: 'face'
	};

	if (get_store_value(options).holistic.enable) {
		compressXYZ(trackingData, "RightUpperArm", profile.tracking.Pose.RightUpperArm);
		compressXYZ(trackingData, "RightLowerArm", profile.tracking.Pose.RightLowerArm);
		compressXYZ(trackingData, "RightHand", profile.tracking.Pose.RightHand);
		compressXYZ(trackingData, "LeftUpperArm", profile.tracking.Pose.LeftUpperArm);
		compressXYZ(trackingData, "LeftLowerArm", profile.tracking.Pose.LeftLowerArm);
		compressXYZ(trackingData, "LeftHand", profile.tracking.Pose.LeftHand);
		compressXYZ(trackingData, "Spine", profile.tracking.Pose.Spine);
		compressXYZ(trackingData, "HipsPosition", profile.tracking.Pose.Hips.position);
		compressXYZ(trackingData, "HipsRotation", profile.tracking.Pose.Hips.rotation);
		compressXYZ(trackingData, "RightUpperLeg", profile.tracking.Pose.RightUpperLeg);
		compressXYZ(trackingData, "RightLowerLeg", profile.tracking.Pose.RightLowerLeg);
		compressXYZ(trackingData, "LeftUpperLeg", profile.tracking.Pose.LeftUpperLeg);
		compressXYZ(trackingData, "LeftLowerLeg", profile.tracking.Pose.LeftLowerLeg);
		compressXYZ(trackingData, "RightWrist", profile.tracking.RightHand.RightWrist);
		compressXYZ(trackingData, "RightRingProximal", profile.tracking.RightHand.RightRingProximal);
		compressXYZ(trackingData, "RightRingIntermediate", profile.tracking.RightHand.RightRingIntermediate);
		compressXYZ(trackingData, "RightRingDistal", profile.tracking.RightHand.RightRingDistal);
		compressXYZ(trackingData, "RightIndexProximal", profile.tracking.RightHand.RightIndexProximal);
		compressXYZ(trackingData, "RightIndexIntermediate", profile.tracking.RightHand.RightIndexIntermediate);
		compressXYZ(trackingData, "RightIndexDistal", profile.tracking.RightHand.RightIndexDistal);
		compressXYZ(trackingData, "RightMiddleProximal", profile.tracking.RightHand.RightMiddleProximal);
		compressXYZ(trackingData, "RightMiddleIntermediate", profile.tracking.RightHand.RightMiddleIntermediate);
		compressXYZ(trackingData, "RightMiddleDistal", profile.tracking.RightHand.RightMiddleDistal);
		compressXYZ(trackingData, "RightThumbProximal", profile.tracking.RightHand.RightThumbProximal);
		compressXYZ(trackingData, "RightThumbIntermediate", profile.tracking.RightHand.RightThumbIntermediate);
		compressXYZ(trackingData, "RightThumbDistal", profile.tracking.RightHand.RightThumbDistal);
		compressXYZ(trackingData, "RightLittleProximal", profile.tracking.RightHand.RightLittleProximal);
		compressXYZ(trackingData, "RightLittleIntermediate", profile.tracking.RightHand.RightLittleIntermediate);
		compressXYZ(trackingData, "RightLittleDistal", profile.tracking.RightHand.RightLittleDistal);
		compressXYZ(trackingData, "LeftWrist", profile.tracking.LeftHand.LeftWrist);
		compressXYZ(trackingData, "LeftRingProximal", profile.tracking.LeftHand.LeftRingProximal);
		compressXYZ(trackingData, "LeftRingIntermediate", profile.tracking.LeftHand.LeftRingIntermediate);
		compressXYZ(trackingData, "LeftRingDistal", profile.tracking.LeftHand.LeftRingDistal);
		compressXYZ(trackingData, "LeftIndexProximal", profile.tracking.LeftHand.LeftIndexProximal);
		compressXYZ(trackingData, "LeftIndexIntermediate", profile.tracking.LeftHand.LeftIndexIntermediate);
		compressXYZ(trackingData, "LeftIndexDistal", profile.tracking.LeftHand.LeftIndexDistal);
		compressXYZ(trackingData, "LeftMiddleProximal", profile.tracking.LeftHand.LeftMiddleProximal);
		compressXYZ(trackingData, "LeftMiddleIntermediate", profile.tracking.LeftHand.LeftMiddleIntermediate);
		compressXYZ(trackingData, "LeftMiddleDistal", profile.tracking.LeftHand.LeftMiddleDistal);
		compressXYZ(trackingData, "LeftThumbProximal", profile.tracking.LeftHand.LeftThumbProximal);
		compressXYZ(trackingData, "LeftThumbIntermediate", profile.tracking.LeftHand.LeftThumbIntermediate);
		compressXYZ(trackingData, "LeftThumbDistal", profile.tracking.LeftHand.LeftThumbDistal);
		compressXYZ(trackingData, "LeftLittleProximal", profile.tracking.LeftHand.LeftLittleProximal);
		compressXYZ(trackingData, "LeftLittleIntermediate", profile.tracking.LeftHand.LeftLittleIntermediate);
		compressXYZ(trackingData, "LeftLittleDistal", profile.tracking.LeftHand.LeftLittleDistal);
		trackingData.type = "holistic";
	}

	get_store_value(p2pConnection).send(trackingData);
};

/* src/tracking/drawing.svelte generated by Svelte v3.46.4 */

function drawResults(results, type = "holistic", facelm = null) {
	canvasEl.width = videoEl.videoWidth;
	canvasEl.height = videoEl.videoHeight;
	canvasCtx.save();
	canvasCtx.clearRect(0, 0, canvasEl.width, canvasEl.height);

	// canvasCtx.drawImage(
	//   videoEl,
	//   0,
	//   0,
	//   canvasEl.width,
	//   canvasEl.height
	// );
	switch (type) {
		case 'holistic':
			drawing_utils.drawConnectors(canvasCtx, results.poseLandmarks, holistic.POSE_CONNECTIONS, { color: "#00cff7", lineWidth: 4 });
			drawing_utils.drawLandmarks(canvasCtx, results.poseLandmarks, { color: "#ff0364", lineWidth: 2 });
			drawing_utils.drawConnectors(canvasCtx, results.faceLandmarks, holistic.FACEMESH_TESSELATION, { color: "#C0C0C070", lineWidth: 1 });
			if (results.faceLandmarks && results.faceLandmarks.length === 478) {
				drawing_utils.drawLandmarks(canvasCtx, [results.faceLandmarks[468], results.faceLandmarks[468 + 5]], { color: "#ffe603", lineWidth: 2 });
			}
			drawing_utils.drawConnectors(canvasCtx, results.leftHandLandmarks, holistic.HAND_CONNECTIONS, { color: "#eb1064", lineWidth: 5 });
			drawing_utils.drawLandmarks(canvasCtx, results.leftHandLandmarks, { color: "#00cff7", lineWidth: 2 });
			drawing_utils.drawConnectors(canvasCtx, results.rightHandLandmarks, holistic.HAND_CONNECTIONS, { color: "#22c3e3", lineWidth: 5 });
			drawing_utils.drawLandmarks(canvasCtx, results.rightHandLandmarks, { color: "#ff0364", lineWidth: 2 });
			break;
		case 'pose':
			if (facelm && facelm.length === 478) {
				drawing_utils.drawConnectors(canvasCtx, facelm, holistic.FACEMESH_TESSELATION, { color: "#C0C0C070", lineWidth: 1 });
				drawing_utils.drawLandmarks(canvasCtx, [facelm[468], facelm[468 + 5]], { color: "#ffe603", lineWidth: 2 });
			}
			drawing_utils.drawConnectors(canvasCtx, results.keypoints, holistic.POSE_CONNECTIONS, { color: "#00cff7", lineWidth: 4 });
			drawing_utils.drawLandmarks(canvasCtx, results.keypoints, { color: "#ff0364", lineWidth: 2 });
			break;
		case 'facemeshMP':
			drawing_utils.drawConnectors(canvasCtx, results, holistic.FACEMESH_TESSELATION, { color: "#C0C0C070", lineWidth: 1 });
			drawing_utils.drawLandmarks(canvasCtx, [results[468], results[468 + 5]], { color: "#ffe603", lineWidth: 2 });
			break;
	}

	canvasCtx.restore();
}

/* src/tracking/onFacemeshResults.svelte generated by Svelte v3.46.4 */
const lerp = Vector$1.lerp;
let facelm = null;

async function onFacemeshResults(lm, runtime) {
	facelm = lm;
	let flipHorizontal = get_store_value(cameraConfig).firstPerson && get_store_value(cameraConfig).freeCamera;
	const oldFace = get_store_value(profiles).user.tracking.Face;

	if (lm.length === 0) {
		oldFace.detected = false;
		return;
	}

	get_store_value(profiles).user.tracking.running = true;

	if (!get_store_value(options).holistic.enable) {
		drawResults(facelm, "facemeshMP");
	}

	let face = FaceSolver.solve(lm, {
		runtime,
		smoothBlink: false,
		video: videoEl,
		blinkSettings: runtime === "mediapipe" ? [.3, .5] : []
	});

	oldFace.detected = true;
	oldFace.head.width = face.head.width / videoEl.videoWidth;
	oldFace.head.height = face.head.height / videoEl.videoHeight;
	oldFace.head.position.x = face.head.position.x / videoEl.videoWidth;
	oldFace.head.position.y = face.head.position.y / videoEl.videoHeight;
	oldFace.head.x = face.head.x;
	oldFace.head.y = face.head.y * (flipHorizontal ? -1 : 1);
	oldFace.head.z = face.head.z;

	//     const oldPos = get(SpringManager.user.head)
	//      SpringManager.user.head.set({
	//         x:face.head.x,
	//         y:face.head.y,
	//         z:face.head.z,
	//         width:threshold(oldPos.width,face.head.width/ videoEl.videoWidth,.01),
	//         height:threshold(oldPos.height,face.head.height/ videoEl.videoHeight,.01),
	//         position:{
	//           x:threshold(oldPos.position.x,face.head.position.x/ videoEl.videoWidth,.01),
	//           y:threshold(oldPos.position.y,face.head.position.y/ videoEl.videoHeight,.01),
	//           z:face.head.position.z
	//         }
	//      })
	SpringManager.user.face.set({
		eye: face.eye,
		mouth: face.mouth,
		head: face.head,
		brow: face.brow,
		pupil: {
			x: threshold(oldFace.pupil.x, face.pupil.x, .1),
			y: threshold(oldFace.pupil.y, face.pupil.y, .1)
		}
	});

	oldFace.mouth = {
		x: lerp(oldFace.mouth.x, face.mouth.x, 0.7),
		y: lerp(oldFace.mouth.y, face.mouth.y, 0.7),
		shape: {
			A: lerp(oldFace.mouth.shape.A, face.mouth.shape.A, 0.7),
			E: lerp(oldFace.mouth.shape.E, face.mouth.shape.E, 0.7),
			I: lerp(oldFace.mouth.shape.I, face.mouth.shape.I, 0.7),
			O: lerp(oldFace.mouth.shape.O, face.mouth.shape.O, 0.7),
			U: lerp(oldFace.mouth.shape.U, face.mouth.shape.U, 0.7)
		}
	};

	//don't update pupil if blinking
	if (face.eye.r > 0.5 && face.eye.l > 0.5) {
		oldFace.pupil.x = lerp(oldFace.pupil.x, face.pupil.x, 0.7);
		oldFace.pupil.y = lerp(oldFace.pupil.y, face.pupil.y, 0.7);
	}

	// // interpolate eye before detecting winks
	// savedEye.l = lerp(savedEye.l, face.eye.l, 0.5)
	// savedEye.r = lerp(savedEye.r, face.eye.r, 0.5)
	// oldFace.eye = Kalidokit.Face.stabilizeBlink(savedEye, face.head.y, {
	//     enableWink: get(options).face.enableWink,
	//     maxRot: 0.5,
	// });
	if (!get_store_value(options).face.running) {
		get_store_value(options).face.running = true;
		options.set(get_store_value(options));
	}

	sendTrackingData();
}

//A set of default pose values to serve as "default" values -->

const RestingDefault = {
    Face: {
        eye: {
            l: 1,
            r: 1,
        },
        mouth: {
            x: 0,
            y: 0,
            shape: {
                A: 0,
                E: 0,
                I: 0,
                O: 0,
                U: 0,
            },
        },
        head: {
            x: 0,
            y: 0,
            z: 0,
            width: 0.3,
            height: 0.6,
            position: {
                x: 0.5,
                y: 0.5,
                z: 0,
            },
        },
        brow: 0,
        pupil: {
            x: 0,
            y: 0,
        },
    },
    Pose: {
        RightUpperArm: {
            x: 0,
            y: 0,
            z: -1.25,
        },
        LeftUpperArm: {
            x: 0,
            y: 0,
            z: 1.25,
        }, //y: 0 > -.5 // z: -.5>.5
        RightLowerArm: {
            x: 0,
            y: 0,
            z: 0,
        },
        LeftLowerArm: {
            x: 0,
            y: 0,
            z: 0,
        }, //x: 0 > -4, z: 0 to -.9
        LeftUpperLeg: {
            x: 0,
            y: 0,
            z: 0,
        },
        RightUpperLeg: {
            x: 0,
            y: 0,
            z: 0,
        },
        RightLowerLeg: {
            x: 0,
            y: 0,
            z: 0,
        },
        LeftLowerLeg: {
            x: 0,
            y: 0,
            z: 0,
        },
        LeftHand: {
            x: 0,
            y: 0,
            z: 0,
        },
        RightHand: {
            x: 0,
            y: 0,
            z: 0,
        },
        Spine: {
            x: 0,
            y: 0,
            z: 0,
        },
        Hips: {
            position: {
                x: 0,
                y: 0,
                z: 0,
            },
            rotation: {
                x: 0,
                y: 0,
                z: 0,
            },
        },
    },
    RightHand: {
        RightWrist: {
            x: -0.1315541586772754,
            y: -0.07882867526197412,
            z: -1.0417476769631682,
        },
        RightRingProximal: {
            x: 0,
            y: 0,
            z: -0.13224515812536932,
        },
        RightRingIntermediate: {
            x: 0,
            y: 0,
            z: -0.4068258603832122,
        },
        RightRingDistal: {
            x: 0,
            y: 0,
            z: -0.04950943047275125,
        },
        RightIndexProximal: {
            x: 0,
            y: 0,
            z: -0.24443519921597368,
        },
        RightIndexIntermediate: {
            x: 0,
            y: 0,
            z: -0.25695509972035424,
        },
        RightIndexDistal: {
            x: 0,
            y: 0,
            z: -0.06699515077992313,
        },
        RightMiddleProximal: {
            x: 0,
            y: 0,
            z: -0.09663436414575077,
        },
        RightMiddleIntermediate: {
            x: 0,
            y: 0,
            z: -0.44945038168605306,
        },
        RightMiddleDistal: {
            x: 0,
            y: 0,
            z: -0.06660398263230727,
        },
        RightThumbProximal: {
            x: -0.2349819227955754,
            y: -0.33498192279557526,
            z: -0.12613225518081256,
        },
        RightThumbIntermediate: {
            x: -0.2,
            y: -0.19959491036565571,
            z: -0.013996364546896928,
        },
        RightThumbDistal: {
            x: -0.2,
            y: 0.002005509674788991,
            z: 0.1510027548373945,
        },
        RightLittleProximal: {
            x: 0,
            y: 0,
            z: -0.09045147788376662,
        },
        RightLittleIntermediate: {
            x: 0,
            y: 0,
            z: -0.22559206415066682,
        },
        RightLittleDistal: {
            x: 0,
            y: 0,
            z: -0.10080630460393536,
        },
    },
    LeftHand: {
        LeftWrist: {
            x: -0.1315541586772754,
            y: -0.07882867526197412,
            z: -1.0417476769631682,
        },
        LeftRingProximal: {
            x: 0,
            y: 0,
            z: 0.13224515812536932,
        },
        LeftRingIntermediate: {
            x: 0,
            y: 0,
            z: 0.4068258603832122,
        },
        LeftRingDistal: {
            x: 0,
            y: 0,
            z: 0.04950943047275125,
        },
        LeftIndexProximal: {
            x: 0,
            y: 0,
            z: 0.24443519921597368,
        },
        LeftIndexIntermediate: {
            x: 0,
            y: 0,
            z: 0.25695509972035424,
        },
        LeftIndexDistal: {
            x: 0,
            y: 0,
            z: 0.06699515077992313,
        },
        LeftMiddleProximal: {
            x: 0,
            y: 0,
            z: 0.09663436414575077,
        },
        LeftMiddleIntermediate: {
            x: 0,
            y: 0,
            z: 0.44945038168605306,
        },
        LeftMiddleDistal: {
            x: 0,
            y: 0,
            z: 0.06660398263230727,
        },
        LeftThumbProximal: {
            x: -0.2349819227955754,
            y: 0.33498192279557526,
            z: 0.12613225518081256,
        },
        LeftThumbIntermediate: {
            x: -0.2,
            y: 0.2506506391005022,
            z: 0.05046474221464442,
        },
        LeftThumbDistal: {
            x: -0.2,
            y: 0.17880674636490754,
            z: -0.06059662681754624,
        },
        LeftLittleProximal: {
            x: 0,
            y: 0,
            z: 0.1748998529912705,
        },
        LeftLittleIntermediate: {
            x: 0,
            y: 0,
            z: 0.4065799037713114,
        },
        LeftLittleDistal: {
            x: 0,
            y: 0,
            z: 0.10080630460393536,
        },
    },
};

/* src/tracking/onHolisticResults.svelte generated by Svelte v3.46.4 */
const poseLandmarks = writable(null);

let newTrackingProfile = JSON.parse(JSON.stringify(RestingDefault));
let initialFrames = 0;

function onHolisticResults(results) {
	if (!get_store_value(options).holistic.running) {
		get_store_value(options).holistic.running = true;
		options.set(get_store_value(options));
	}

	drawResults(results, 'holistic');

	if (initialFrames < 20) {
		initialFrames += 1;
		return;
	}

	get_store_value(p2pConnection);
	const facelm = results.faceLandmarks || null;
	let poselm = results.poseLandmarks || null;
	let poselm3D = results.X || results.ea || null;

	const handlm = {
		Right: results.leftHandLandmarks || null,
		Left: results.rightHandLandmarks || null
	};

	if (facelm && !get_store_value(options).face.enable) {
		onFacemeshResults(facelm, 'mediapipe');
	}

	let sides = ['Right', 'Left'];

	sides.forEach(e => {
		if (handlm[e] !== null) {
			get_store_value(profiles).user.tracking[e + 'Hand'] = HandSolver.solve(handlm[e], e);
		}
	});

	if (poselm3D) {
		poseLandmarks.set(poselm3D);
		const oldPose = get_store_value(profiles).user.tracking.Pose;
		const newPose = PoseSolver.solve(poselm3D, poselm, { enableLegs: get_store_value(allowLegs) });
		oldPose.Hips.rotation = newPose.Hips.rotation;
		oldPose.Hips.position = newPose.Hips.worldPosition;
		oldPose.Spine = newPose.Spine;
		oldPose.RightUpperArm = newPose.RightUpperArm;
		oldPose.LeftUpperArm = newPose.LeftUpperArm;
		oldPose.RightLowerArm = newPose.RightLowerArm;
		oldPose.LeftLowerArm = newPose.LeftLowerArm;
		oldPose.RightUpperLeg = newPose.RightUpperLeg;
		oldPose.LeftUpperLeg = newPose.LeftUpperLeg;
		oldPose.RightLowerLeg = newPose.RightLowerLeg;
		oldPose.LeftLowerLeg = newPose.LeftLowerLeg;

		oldPose.RightHand = {
			z: newPose.RightHand.z,
			y: get_store_value(profiles).user.tracking.RightHand.RightWrist.y,
			x: get_store_value(profiles).user.tracking.RightHand.RightWrist.x
		};

		oldPose.LeftHand = {
			z: newPose.LeftHand.z,
			y: get_store_value(profiles).user.tracking.LeftHand.LeftWrist.y,
			x: get_store_value(profiles).user.tracking.LeftHand.LeftWrist.x
		};
	}
}

function onPoseResults(results) {
	if (!get_store_value(options).holistic.running) {
		get_store_value(options).holistic.running = true;
		options.set(get_store_value(options));
	}

	if (initialFrames < 20) {
		initialFrames += 1;
		return;
	}

	get_store_value(p2pConnection);
	let poselm = results.keypoints || null;

	if (poselm) {
		let imageSize = {
			width: videoEl.width,
			height: videoEl.height
		};

		//normalize and format 2D landmark values to be like Mediapipe's
		poselm.forEach((e, i) => {
			e.x /= imageSize.width;
			e.y /= imageSize.height;
			e.z = 0;
			e.visibility = e.score;
		});
	}

	drawResults(results, 'pose', facelm);
	let poselm3D = results.keypoints3D || null;

	if (poselm3D) {
		poselm3D.forEach((e, i) => {
			e.visibility = e.score;
		});

		const oldPose = get_store_value(profiles).user.tracking.Pose;
		const newPose = PoseSolver.solve(poselm3D, poselm, { enableLegs: get_store_value(allowLegs) });
		oldPose.Hips.rotation = newPose.Hips.rotation;
		oldPose.Hips.position = newPose.Hips.worldPosition;
		oldPose.Spine = newPose.Spine;
		oldPose.RightUpperArm = newPose.RightUpperArm;
		oldPose.LeftUpperArm = newPose.LeftUpperArm;
		oldPose.RightLowerArm = newPose.RightLowerArm;
		oldPose.LeftLowerArm = newPose.LeftLowerArm;
		oldPose.RightUpperLeg = newPose.RightUpperLeg;
		oldPose.LeftUpperLeg = newPose.LeftUpperLeg;
		oldPose.RightLowerLeg = newPose.RightLowerLeg;
		oldPose.LeftLowerLeg = newPose.LeftLowerLeg;

		oldPose.RightHand = {
			z: newPose.RightHand.z,
			y: get_store_value(profiles).user.tracking.RightHand.RightWrist.y,
			x: get_store_value(profiles).user.tracking.RightHand.RightWrist.x
		};

		oldPose.LeftHand = {
			z: newPose.LeftHand.z,
			y: get_store_value(profiles).user.tracking.LeftHand.LeftWrist.y,
			x: get_store_value(profiles).user.tracking.LeftHand.LeftWrist.x
		};

		// sendTrackingData()
		newTrackingProfile.Pose = PoseSolver.solve(poselm3D, poselm);
	}
}

var Peer_svelte_svelte_type_style_lang = '';

/* src/connections/Peer.svelte generated by Svelte v3.46.4 */

function create_fragment$r(ctx) {
	let audio;

	return {
		c() {
			audio = element("audio");
			attr(audio, "class", "remote-audio svelte-937zs6");
			audio.controls = true;
			audio.autoplay = true;
		},
		m(target, anchor) {
			insert(target, audio, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(audio);
		}
	};
}

const p2pConnection = writable(null);
const inputID = writable('');
const myID = writable(null);
const friendID = writable(null);
const PEER = writable(null);
const peerState = writable('default');
const callTime = writable('0:00');
const isHost = writable(false);
const remoteMode = writable(false);

function instance$x($$self, $$props, $$invalidate) {
	let $p2pConnection,
		$$unsubscribe_p2pConnection = noop;

	let $remoteMode,
		$$unsubscribe_remoteMode = noop;

	let $userModel;

	let $friendID,
		$$unsubscribe_friendID = noop;

	let $profiles;
	component_subscribe($$self, p2pConnection, $$value => $$invalidate(3, $p2pConnection = $$value));
	component_subscribe($$self, remoteMode, $$value => $$invalidate(4, $remoteMode = $$value));
	component_subscribe($$self, userModel, $$value => $$invalidate(5, $userModel = $$value));
	component_subscribe($$self, friendID, $$value => $$invalidate(6, $friendID = $$value));
	component_subscribe($$self, profiles, $$value => $$invalidate(7, $profiles = $$value));
	$$self.$$.on_destroy.push(() => $$unsubscribe_p2pConnection());
	$$self.$$.on_destroy.push(() => $$unsubscribe_remoteMode());
	$$self.$$.on_destroy.push(() => $$unsubscribe_friendID());

	peerState.subscribe(e => {
		if (e === 'connected') {
			if (!counter) {
				initCounter();
			}
		} else {
			resetTimer();
		}
	});

	let localStream, remoteStream;
	let rString = randomString(6, '0123456789');
	let currentConnection = null;
	myID.set(rString);

	let peer = new Peer(rString,
	{
			host: 'kalidoface-pair.glitch.me',
			config: {
				iceServers: [
					{ urls: "stun:stun.stunprotocol.org" },
					{
						urls: "turn:avaritia.akiroz.life",
						username: "kf",
						credential: "kf"
					}
				]
			}
		});

	PEER.set(peer);

	friendID.subscribe(val => {
		if (val) {
			connectToPeer(val);
		}
	});

	const connectToPeer = id => {
		console.log(`Connecting to ${id}...`);
		let outConn = peer.connect(id);
		handleConn(outConn);
		isHost.set(true);

		// return early if using remote mode
		if ($remoteMode) {
			return;
		}

		navigator.mediaDevices.getUserMedia({ video: false, audio: true }).then(stream => {
			localStream = stream;
			let call = peer.call(id, stream);
			call.on('stream', renderAudio);
		}).catch(err => {
			
		}); // logMessage('Failed to get local stream', err);
	};

	const handleDisconn = () => {
		stopStream();

		// console.log('disconnected')
		friendModel.set(null);

		friendID.set(null);
		p2pConnection.set(null);
		isHost.set(false);
		peerState.set('default');
	};

	const stopStream = () => {
		if (localStream) {
			localStream.getAudioTracks().forEach(track => track.stop());
		} // console.log(localStream.getAudioTracks())

		if (remoteStream) {
			remoteStream.getAudioTracks().forEach(track => track.stop());
		} // console.log(remoteStream.getAudioTracks())
	};

	const renderAudio = stream => {
		document.querySelector('audio').srcObject = stream;
		document.querySelector('audio').play();
	};

	const handleConn = (conn, id) => {
		currentConnection = conn;
		p2pConnection.set(currentConnection);

		// peerID.set(conn.peer)
		peerState.set($remoteMode ? 'connected' : 'connecting');

		conn.on('data', data => {
			// console.log(data)
			if (data.type === 'modelObj') {
				friendModel.set(JSON.parse(atob(data.res)));
				peerState.set('connected');
			}

			let profile = $profiles[$remoteMode ? 'user' : 'friend'];
			let springProfile = SpringManager[$remoteMode ? 'user' : 'friend'];

			if (data.type === 'face' || data.type === "holistic") {
				profile.detected = data.detected;
				profile.tracking.Face.head.x = data.headX;
				profile.tracking.Face.head.y = data.headY;
				profile.tracking.Face.head.z = data.headZ;

				profile.tracking.Face.mouth = {
					x: data.mouthX,
					y: data.mouthY,
					shape: {
						A: data.mouthA,
						E: data.mouthE,
						I: data.mouthI,
						O: data.mouthO,
						U: data.mouthU
					}
				};

				profile.tracking.Face.pupil = { x: data.pupilX, y: data.pupilY };

				// springProfile.head.set({
				//     x:data.headX,
				//     y:data.headY,
				//     z:data.headZ,
				//     width: 0.3,
				//     height: 0.6,
				//     position: {
				//         x: 0.5,
				//         y: 0.5,
				//         z: 0,
				//     }
				// })
				springProfile.face.set({
					eye: { l: data.eyeL, r: data.eyeR },
					mouth: {
						x: data.mouthX,
						y: data.mouthY,
						shape: {
							A: data.mouthA,
							E: data.mouthE,
							I: data.mouthI,
							O: data.mouthO,
							U: data.mouthU
						}
					},
					head: {
						x: data.headX,
						y: data.headY,
						z: data.headZ,
						width: 0.3,
						height: 0.6,
						position: { x: 0.5, y: 0.5, z: 0 }
					},
					brow: data.brow,
					pupil: { x: data.pupilX, y: data.pupilY }
				});

				profile.tracking.Pose.enable = true;
			}

			if (data.type === "holistic") {
				let incomingPose = {};
				expandXYZ(incomingPose, "RightUpperArm", data);
				expandXYZ(incomingPose, "LeftUpperArm", data);
				expandXYZ(incomingPose, "RightLowerArm", data);
				expandXYZ(incomingPose, "LeftLowerArm", data);
				expandXYZ(incomingPose, "RightUpperLeg", data);
				expandXYZ(incomingPose, "LeftUpperLeg", data);
				expandXYZ(incomingPose, "RightLowerLeg", data);
				expandXYZ(incomingPose, "LeftLowerLeg", data);
				expandXYZ(incomingPose, "LeftHand", data);
				expandXYZ(incomingPose, "RightHand", data);
				expandXYZ(incomingPose, "Spine", data);

				incomingPose.Hips = {
					position: {
						x: data.HipsPositionX,
						y: data.HipsPositionY,
						z: data.HipsPositionZ
					},
					rotation: {
						x: data.HipsRotationX,
						y: data.HipsRotationY,
						z: data.HipsRotationZ
					}
				};

				profile.tracking.Pose = incomingPose;
				let incomingHands = { Left: {}, Right: {} };

				Object.keys(incomingHands).forEach(e => {
					expandXYZ(incomingHands[e], e + "Wrist", data);
					expandXYZ(incomingHands[e], e + "RingProximal", data);
					expandXYZ(incomingHands[e], e + "RingIntermediate", data);
					expandXYZ(incomingHands[e], e + "RingDistal", data);
					expandXYZ(incomingHands[e], e + "IndexProximal", data);
					expandXYZ(incomingHands[e], e + "IndexIntermediate", data);
					expandXYZ(incomingHands[e], e + "IndexDistal", data);
					expandXYZ(incomingHands[e], e + "MiddleProximal", data);
					expandXYZ(incomingHands[e], e + "MiddleIntermediate", data);
					expandXYZ(incomingHands[e], e + "MiddleDistal", data);
					expandXYZ(incomingHands[e], e + "ThumbProximal", data);
					expandXYZ(incomingHands[e], e + "ThumbIntermediate", data);
					expandXYZ(incomingHands[e], e + "ThumbDistal", data);
					expandXYZ(incomingHands[e], e + "LittleProximal", data);
					expandXYZ(incomingHands[e], e + "LittleIntermediate", data);
					expandXYZ(incomingHands[e], e + "LittleDistal", data);
					profile.tracking[e + 'Hand'] = incomingHands[e];
				});
			}
		});

		conn.on('open', () => {
			conn.send('hello!');

			if ($friendID) {
				conn.send({
					res: $friendID,
					type: 'id',
					remoteMode: $remoteMode
				});
			}

			if (typeof $userModel === 'object' && !$remoteMode) {
				let newModel = $userModel;
				newModel.data = findDataURLFromList(newModel);
				let base64 = btoa(JSON.stringify(newModel));
				conn.send({ res: base64, type: 'modelObj' });
			}
		});

		conn.on('close', () => {
			// console.log('peer-disconnected')
			handleDisconn();
		});
	};

	peer.on('open', id => {
		console.log('My Chat ID is: ' + id);
		peerState.set('default');
	});

	peer.on('error', error => {
		if (error.message.includes('Could not connect to peer')) {
			notifText.set({
				type: 'error',
				'text': 'Could not connect to Chat ID'
			});

			handleDisconn();
		}

		console.error(error);
	});

	peer.on('disconnected', val => {
		handleDisconn();
		peerState.set('server-disconnect');
	});

	peer.on('close', val => {
		
	}); // console.log('Connection Destroyed')

	// Handle incoming data connection
	peer.on('connection', conn => {
		// console.log('incoming peer connection!');  
		handleConn(conn);

		isHost.set(false);
		console.log('being connect to');
		inputID.set(conn.peer);
	});

	peer.on('call', call => {
		if ($remoteMode) {
			return;
		}

		navigator.mediaDevices.getUserMedia({ video: false, audio: true }).then(stream => {
			remoteStream = stream;
			call.answer(stream); // Answer the call with an A/V stream.
			call.on('stream', renderAudio);
		}).catch(err => {
			console.error('Failed to get local stream', err);
		});
	});

	userModel.subscribe(e => {
		if ($p2pConnection && !$remoteMode) {
			if (typeof e === 'object') {
				let newModel = e;
				newModel.data = findDataURLFromList(e);
				let base64 = btoa(JSON.stringify(newModel));
				$p2pConnection.send({ res: base64, type: 'modelObj' });
			}
		}
	});

	return [];
}

class Peer_1 extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$x, create_fragment$r, safe_not_equal, {});
	}
}

/* src/tracking/Holistic.svelte generated by Svelte v3.46.4 */

const options = writable({
	//Face Options
	face: {
		running: false,
		enable: window.innerWidth > 600 ? false : true,
		enableWink: true,
		model: {
			maxContinuousChecks: 5,
			detectionConfidence: .9,
			maxFaces: 1,
			iouThreshold: .3,
			scoreThreshold: .85
		},
		predict: {
			input: null,
			returnTensors: false,
			flipHorizontal: false,
			predictIrises: true
		}
	},
	// Pose Options
	holistic: {
		running: false,
		enable: window.innerWidth > 600 ? true : false,
		model: {
			modelComplexity: 1,
			smoothLandmarks: true,
			minDetectionConfidence: 0.7,
			minTrackingConfidence: 0.7,
			refineFaceLandmarks: true
		},
		predict: { flipHorizontal: true }
	}
});

getLocalStorage(options, 'options', get_store_value(options));
subLocalStorage(options, 'options');

function instance$w($$self, $$props, $$invalidate) {
	let $options,
		$$unsubscribe_options = noop;

	let $profiles;
	let $infoExpanded;
	let $cameraOn;
	let $videoReady;
	component_subscribe($$self, options, $$value => $$invalidate(3, $options = $$value));
	component_subscribe($$self, profiles, $$value => $$invalidate(8, $profiles = $$value));
	component_subscribe($$self, infoExpanded, $$value => $$invalidate(4, $infoExpanded = $$value));
	component_subscribe($$self, cameraOn, $$value => $$invalidate(5, $cameraOn = $$value));
	component_subscribe($$self, videoReady, $$value => $$invalidate(6, $videoReady = $$value));
	$$self.$$.on_destroy.push(() => $$unsubscribe_options());
	let holistic$1, facemesh, poseModel, poseDetector;

	//INIT FACEMESH
	async function initFacemesh() {
		if (isSafari === "disabled") {
			await setBackend('webgl');
			$$invalidate(1, facemesh = await at(it.mediapipeFacemesh, $options.face.model));
		} else {
			$$invalidate(1, facemesh = new face_mesh.FaceMesh({
					locateFile: file => {
						return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@0.4.1633559619/${file}`;
					}
				}));

			facemesh.setOptions({
				maxNumFaces: 1,
				refineLandmarks: true,
				minDetectionConfidence: 0.5,
				minTrackingConfidence: 0.5
			});

			facemesh.onResults(results => {
				if (results.multiFaceLandmarks.length > 0) {
					onFacemeshResults(results.multiFaceLandmarks[0], "mediapipe");
				}
			});
		}
	}

	initFacemesh();

	// INIT 3D POSE
	async function initPose() {
		await setBackend('webgl');
		poseModel = oe.BlazePose;

		const detectorConfig = {
			runtime: 'tfjs', // or 'mediapipe'
			modelType: 'lite',
			enableSmoothing: true
		};

		$$invalidate(2, poseDetector = await ai(poseModel, detectorConfig));
		console.log(poseDetection, poseModel, poseDetector);
	}

	//INIT HOLISTIC
	async function initHolistic() {
		$$invalidate(0, holistic$1 = new holistic.Holistic({
				locateFile: file => {
					return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic@0.5.1635989137/${file}`;
				}
			}));

		// holistic = new Holistic()
		holistic$1.setOptions($options.holistic.model);

		holistic$1.onResults(onHolisticResults); //holistic has callback function
	}

	if (isSafari) {
		//load pose model if on safari since mediapipe backend doesn't support WebGL
		initPose();
	} else {
		//load holistic model if not safari
		initHolistic();
	}

	//PREDICTIONS LOOP
	async function predict() {
		if (!$videoReady || !$cameraOn || $infoExpanded) {
			set_store_value(profiles, $profiles.user.detected = false, $profiles);
			set_store_value(options, $options.face.running = false, $options);
			set_store_value(options, $options.holistic.running = false, $options);
			return;
		} else {
			//face tracking only
			if ($options.face.enable) {
				if (isSafari === 'disabled') {
					const predictions = await facemesh.estimateFaces({
						input: videoEl,
						returnTensors: $options.face.predict.returnTensors,
						flipHorizontal: $options.face.predict.flipHorizontal,
						predictIrises: $options.face.predict.predictIrises
					});

					if (predictions.length > 0) {
						onFacemeshResults(predictions[0].scaledMesh, 'tfjs');
					}
				} else {
					await facemesh.send({ image: videoEl });
				}
			}

			//face and body tracking only
			if ($options.holistic.enable) {
				if (isSafari) {
					await facemesh.send({ image: videoEl });
					const poses = await poseDetector.estimatePoses(videoEl, { flipHorizontal: true });

					if (poses.length > 0) {
						onPoseResults(poses[0]);
					}
				} else {
					await holistic$1.send({ image: videoEl });
				}
			}

			set_store_value(profiles, $profiles.user.detected = true, $profiles);
			requestAnimationFrame(predict);
		}
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*$videoReady, $cameraOn, holistic, poseDetector, facemesh, $infoExpanded*/ 119) {
			{
				if ($videoReady && $cameraOn && (holistic$1 || poseDetector) && facemesh && !$infoExpanded) {
					predict();
				}
			}
		}

		if ($$self.$$.dirty & /*$options*/ 8) {
			{
				set_store_value(profiles, $profiles.user.tracking.Face.enable = $options.face.enable, $profiles);
				set_store_value(profiles, $profiles.user.tracking.Pose.enable = $options.holistic.enable, $profiles);
			}
		}
	};

	return [
		holistic$1,
		facemesh,
		poseDetector,
		$options,
		$infoExpanded,
		$cameraOn,
		$videoReady
	];
}

class Holistic_1 extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$w, null, safe_not_equal, {});
	}
}

/* src/tracking/smooth.svelte generated by Svelte v3.46.4 */

let SpringManager = {
	user: {
		head: null,
		face: null,
		pose: null,
		hands: {}
	},
	friend: {
		head: null,
		face: null,
		pose: null,
		hands: {}
	}
};

const userGroups = ['user', 'friend'];

userGroups.forEach(e => {
	//Initialize Springs
	//  SpringManager[e].head = spring(JSON.parse(JSON.stringify(Kalidokit.Utils.RestingDefault.Face.head)), {
	//   stiffness: 0.1,
	//   damping: 0.85,
	//   precision:.0001
	// })
	SpringManager[e].face = spring(JSON.parse(JSON.stringify(RestingDefault$1.Face)), {
		// stiffness: 0.25,
		// damping: 0.85,
		stiffness: 0.15,
		damping: 0.7,
		precision: .0001
	});

	// SpringManager[e].pose = spring(JSON.parse(JSON.stringify(Kalidokit.Utils)).Pose, {
	//   stiffness: 0.16,
	//   damping: 0.8,
	//   precision:.0001
	// });
	// SpringManager[e].hands.Right = spring(JSON.parse(JSON.stringify(Kalidokit.Utils)).RightHand, {
	//   stiffness: 0.16,
	//   damping: 0.8,
	//   precision:.0001
	// });
	// SpringManager[e].hands.Left = spring(JSON.parse(JSON.stringify(Kalidokit.Utils)).LeftHand, {
	//   stiffness: 0.16,
	//   damping: 0.8,
	//   precision:.0001
	// });
	//Subscribe to Spring updates
	// SpringManager[e].head.subscribe(val=>{
	//    if(val && profiles){
	//     get(profiles)[e].tracking.Face.head = val
	//    }
	// })
	SpringManager[e].face.subscribe(val => {
		if (val && profiles) {
			const face = get_store_value(profiles)[e].tracking.Face;

			if (val.head.x >= -.4 && val.head.x <= .4 && val.head.y >= -.6 && val.head.y <= .6) {
				// face.brow = val.brow
				// face.pupil = val.pupil  
				face.eye = FaceSolver.stabilizeBlink(val.eye, val.head.y, {
					enableWink: get_store_value(options).face.enableWink,
					maxRot: 0.5
				});
			} // face.head = val.head
			// face.mouth = val.mouth
		}
	});
}); //    SpringManager[e].pose.subscribe(val=>{

/* src/scene/character.svelte generated by Svelte v3.46.4 */
let randomColors = ['#73a9ff', '#ff9785', '#ff6385', '#ffd75e', '#97ff94', '#d791ff', '#5ce9ff'];

const newRandomColor = () => {
	let newColor = randomColors[Math.floor(Math.random() * randomColors.length)];
	let currentColors = [];

	get_store_value(modelList).forEach(e => {
		if (e.color) {
			currentColors.push(e.color);
		}
	});

	if (currentColors.length < randomColors.length) {
		do {
			newColor = randomColors[Math.floor(Math.random() * randomColors.length)];
		} while (currentColors.includes(newColor)); //random color;
	} else {
		do {
			newColor = randomColors[Math.floor(Math.random() * randomColors.length)];
		} while (get_store_value(modelList)[0].color === newColor); //non repeating color;
	}

	return newColor;
};

const loadModelFromStorage = e => {
	// createBlobURL(e)
	getLocalStorage(userModel, 'userModel', {
		type: presetModels[0].type,
		name: presetModels[0].name,
		uploaded: presetModels[0].uploaded,
		url: presetModels[0].url
	});

	subLocalStorage(userModel, 'userModel');
};

let modelList = writable([]);

let presetModels = [
	{
		id: 3,
		name: 'Ashtra',
		type: 'url',
		url: urlBase + 'vrm/Ashtra.vrm',
		icon: urlBase + 'vrm/Ashtra.png',
		source: 'https://hub.vroid.com/en/characters/6617701103638326208/models/8892157442595230149',
		author: '아기쥐작업소',
		color: null
	},
	{
		id: 2,
		name: 'Mono Cat',
		type: 'url',
		url: urlBase + 'vrm/MonoCat.vrm',
		icon: urlBase + 'vrm/MonoCat.png',
		source: 'https://hub.vroid.com/en/characters/6063135800223582444/models/1998385702537276695',
		author: '凪',
		color: null
	},
	{
		id: 4,
		name: 'VAL',
		type: 'url',
		url: urlBase + 'vrm/VAL.vrm',
		icon: urlBase + 'vrm/VAL.png',
		source: 'https://booth.pm/en/items/3093190',
		author: 'とりんご',
		color: null
	},
	{
		id: 0,
		name: 'Sample A',
		type: 'url',
		url: urlBase + 'vrm/SampleA.vrm',
		icon: urlBase + 'vrm/SampleA.png',
		source: 'https://hub.vroid.com/en/characters/2843975675147313744/models/5644550979324015604',
		author: 'Vroid Project',
		color: null
	},
	{
		id: 1,
		name: 'Alicia Solid',
		type: 'url',
		url: urlBase + 'vrm/AliciaSolid.vrm',
		icon: urlBase + 'vrm/AliciaSolid.png',
		source: 'https://3d.nicovideo.jp/alicia/',
		author: '黒星紅白 & 雨刻',
		color: null
	},
	{
		id: 5,
		name: 'Sample B',
		type: 'url',
		url: urlBase + 'vrm/SampleB.vrm',
		icon: urlBase + 'vrm/SampleB.png',
		source: 'https://hub.vroid.com/en/characters/7939147878897061040/models/2292219474373673889',
		author: 'Vroid Project',
		color: null
	},
	{
		id: 6,
		name: 'Sample C',
		type: 'url',
		url: urlBase + 'vrm/SampleC.vrm',
		icon: urlBase + 'vrm/SampleC.png',
		source: 'https://hub.vroid.com/en/characters/1248981995540129234/models/8640547963669442173',
		author: 'Vroid Project',
		color: null
	},
	{
		id: 7,
		name: '緑子ちゃん',
		type: 'url',
		url: urlBase + 'vrm/Midori.vrm',
		icon: urlBase + 'vrm/Midori.png',
		source: 'https://hub.vroid.com/en/characters/3846600528849029990/models/7104226743214656101',
		author: 'チェリ藻',
		color: null
	},
	{
		id: 8,
		name: '9',
		type: 'url',
		url: urlBase + 'vrm/9.vrm',
		icon: urlBase + 'vrm/9.png',
		source: 'https://hub.vroid.com/en/characters/7768535476794077163/models/8558814239275634162',
		author: '井村',
		color: null
	}
];

getLocalStorage(modelList, 'modelList', get_store_value(modelList), loadModelFromStorage);
subLocalStorage(modelList, 'modelList');
const userModel = writable(null);
const loadingPerc = writable(0);

const findDataURLFromList = e => {
	let url = presetModels[0].url; //fallback for no data

	if (e.type === "blob" && get_store_value(modelList).length > 0) {
		get_store_value(modelList).forEach(j => {
			if (e.url === j.url && j.data) {
				url = j.data;
			}
		});
	}

	if (e.type === "url") {
		url = e.url;
	}

	return url;
};

const friendModel = writable(null);

const setVRMPose = (currentVRM, tracking, type = "user", jump = false, reset = false) => {
	if (reset) {
		tracking = JSON.parse(JSON.stringify(RestingDefault$1));
	}

	animateHead(currentVRM, tracking.Face, tracking.Pose, false, jump);
	animateFace(currentVRM, tracking.Face, jump);
	animateHips(currentVRM, tracking.Pose, tracking.Face, false, jump);
	animateChest(currentVRM, tracking.Face, tracking.Pose, false, jump);
	animateLegs(currentVRM, tracking.Pose, tracking.Face, 'Right', false, jump);
	animateLegs(currentVRM, tracking.Pose, tracking.Face, 'Left', false, jump);
	animateArm(currentVRM, tracking.Pose, 'Right', false, jump);
	animateArm(currentVRM, tracking.Pose, 'Left', false, jump);
	animateFingers(currentVRM, tracking.RightHand, tracking.Pose, 'Right', false, jump);
	animateFingers(currentVRM, tracking.LeftHand, tracking.Pose, 'Left', false, jump);
};

const updateVRM = (type, deltaTime = .01) => {
	let profile = get_store_value(profiles)[type];
	let currentVRM = profile.model;

	if (!currentVRM) {
		return;
	}

	// let s = Math.sin( Math.PI * clock.elapsedTime ); // -1 _ 1 idle oscillation
	let flipHorizontal = get_store_value(cameraConfig).freeCamera && get_store_value(cameraConfig).firstPerson && type === "user";

	if (get_store_value(cameraConfig).freeCamera || profile.detected) {
		animateHips(currentVRM, profile.tracking.Pose, profile.tracking.Face, flipHorizontal);
		animateHead(currentVRM, profile.tracking.Face, profile.tracking.Pose, flipHorizontal);
		animateFace(currentVRM, profile.tracking.Face);
	}

	if (currentVRM.scene.position.x !== profile.position.x) {
		currentVRM.scene.position.x = profile.position.x;
	}

	if (currentVRM.scene.position.z !== profile.position.z) {
		currentVRM.scene.position.z = profile.position.z;
	}

	if (profile.detected) {
		animateChest(currentVRM, profile.tracking.Face, profile.tracking.Pose, flipHorizontal);
		animateLegs(currentVRM, profile.tracking.Pose, profile.tracking.Face, 'Right', flipHorizontal);
		animateLegs(currentVRM, profile.tracking.Pose, profile.tracking.Face, 'Left', flipHorizontal);

		//only calculate when pose tracking is enabled
		if (profile.tracking.Pose.enable) {
			animateArm(currentVRM, profile.tracking.Pose, 'Right', flipHorizontal);
			animateArm(currentVRM, profile.tracking.Pose, 'Left', flipHorizontal);
			animateFingers(currentVRM, profile.tracking.RightHand, profile.tracking.Pose, 'Right', flipHorizontal);
			animateFingers(currentVRM, profile.tracking.LeftHand, profile.tracking.Pose, 'Left', flipHorizontal);
		}
	}

	currentVRM.update(deltaTime);
};

const toggleFirstPersonLayer = currentVrm => {
	if (!currentVrm) {
		return;
	}

	if (get_store_value(cameraConfig).firstPerson && currentVrm.isUser) {
		freeCamera.layers.enable(currentVrm.firstPerson.firstPersonOnlyLayer);
		freeCamera.layers.disable(currentVrm.firstPerson.thirdPersonOnlyLayer);
	} else {
		freeCamera.layers.disable(currentVrm.firstPerson.firstPersonOnlyLayer);
		freeCamera.layers.enable(currentVrm.firstPerson.thirdPersonOnlyLayer);
	}
};

function instance$v($$self, $$props, $$invalidate) {
	let $profiles;
	let $remoteMode;
	let $isHost;
	let $p2pConnection;
	let $cameraConfig;
	let $firstLoad;

	let $modelList,
		$$unsubscribe_modelList = noop;

	let $friendModel,
		$$unsubscribe_friendModel = noop;

	component_subscribe($$self, profiles, $$value => $$invalidate(8, $profiles = $$value));
	component_subscribe($$self, remoteMode, $$value => $$invalidate(3, $remoteMode = $$value));
	component_subscribe($$self, isHost, $$value => $$invalidate(4, $isHost = $$value));
	component_subscribe($$self, p2pConnection, $$value => $$invalidate(5, $p2pConnection = $$value));
	component_subscribe($$self, cameraConfig, $$value => $$invalidate(6, $cameraConfig = $$value));
	component_subscribe($$self, firstLoad, $$value => $$invalidate(9, $firstLoad = $$value));
	component_subscribe($$self, modelList, $$value => $$invalidate(10, $modelList = $$value));
	component_subscribe($$self, friendModel, $$value => $$invalidate(11, $friendModel = $$value));
	$$self.$$.on_destroy.push(() => $$unsubscribe_modelList());
	$$self.$$.on_destroy.push(() => $$unsubscribe_friendModel());
	let { scene } = $$props;
	let { group } = $$props;
	let { renderer } = $$props;

	onMount(async () => {
		userModel.subscribe(e => {
			if (e) {
				load($profiles.user, findDataURLFromList(e), e);
			}
		});

		friendModel.subscribe(e => {
			if (e) {
				let url = e.type === "url" ? e.url : e.data;
				load($profiles.friend, url, e);
			} else if ($profiles.friend.model) {
				group.remove($profiles.friend.model.scene);
				$profiles.friend.model.dispose();
			}
		});
	});

	// gltf and vrm
	const loader = new GLTFLoader();

	loader.crossOrigin = "anonymous";

	function load(profile, url, modelObj) {
		loader.crossOrigin = "anonymous";

		loader.load(
			url,
			gltf => {
				we.removeUnnecessaryJoints(gltf.scene);

				xe.from(gltf).then(vrm => {
					//feedback when loaded
					haptic();

					if (profile.model) {
						group.remove(profile.model.scene);
						profile.model.dispose();
						profile.model = null;
					}

					if (profile.id === 'friend' && !$friendModel) {
						return;
					}

					vrm.id = profile.id;
					vrm.isUser = profile.id === 'user' ? true : false;
					vrm.name = modelObj.name || vrm.meta.title;

					vrm.firstPerson.setup({
						firstPersonOnlyLayer: profile.id === 'user' ? 9 : 11,
						thirdPersonOnlyLayer: profile.id === 'user' ? 10 : 12
					});

					//enable head layer for normal camera
					staticCamera.layers.disable(vrm.firstPerson.firstPersonOnlyLayer);

					staticCamera.layers.enable(vrm.firstPerson.thirdPersonOnlyLayer);
					toggleFirstPersonLayer(vrm);

					//disable head layer for firstPersonCamera
					if (profile.id === 'user') {
						pivotPoint.position.setFromMatrixPosition(vrm.firstPerson.firstPersonBone.matrixWorld);
						freeCamera.position.set(0.0, 0, 1);
						freeCamera.lookAt(pivotPoint.position);
						orbitControls.target.y = pivotPoint.position.y;
						orbitControls.target.y += .025;
						orbitControls.update();
						staticCamera.position.y = pivotPoint.position.y + .1;

						vrm.pivotPoint = {
							x: pivotPoint.position.x,
							y: pivotPoint.position.y
						};

						vrm.scene.rotation.order = 'YXZ';
					}

					vrm.scene.position.x = profile.position.x;
					group.add(vrm.scene);
					vrm.humanoid.getBoneNode(u.HumanoidBoneName.Hips).rotation.y = Math.PI;
					vrm.humanoid.getBoneNode(u.HumanoidBoneName.Hips).rotation.order = 'YXZ';

					//Set up shadows
					vrm.selection = [];

					//Extract meshes for toggle
					let extractedParts = [];

					let extractedFromBody = [];

					vrm.scene.traverse(function (child) {
						if (child.isMesh) {
							child.castShadow = true;
							vrm.selection.push(child);
						}
					});

					vrm.scene.children.forEach(e => {
						//list of phrases to exclude from part names
						const exclude = [
							'blendshape',
							'root',
							'face',
							'hair',
							'morph',
							'armature',
							'secondary',
							'erase',
							'mesh'
						];

						if (!exclude.some(substring => e.name.toLowerCase().includes(substring))) {
							//If Body group, check for clothing
							if (e.name.toLowerCase().includes('body')) {
								if (e.type === "Group") {
									let excludeBody = ['erase'];

									e.children.forEach((f, i) => {
										//typically first 3-4 meshes are body parts. exclude from list
										if (i > 3 && !excludeBody.some(substring => f.name.toLowerCase().includes(substring))) {
											extractedFromBody.push(f);
										}
									});

									return;
								}
							} else {
								extractedParts.push(e);
							}
						}
					});

					vrm.extractedParts = [...extractedParts, ...extractedFromBody];

					//add model to profile
					profile.model = vrm;

					profiles.set($profiles);

					//init model from T pose to current pose
					setVRMPose(vrm, profile.tracking, profile.id, true);

					if (profile.id === 'user' && modelObj.uploaded) {
						//check if character exists
						let inList = false;

						let needsThumbnail = null;

						$modelList.forEach((e, i) => {
							//check if url exists in modellist
							if (e.url === modelObj.url) {
								inList = true;

								//if no icon, flag obj
								if (!e.icon) {
									needsThumbnail = e;
								}
							}
						});

						//create thumbnail
						if ((needsThumbnail || !inList) && typeof OffscreenCanvas !== "undefined") {
							try {
								we.extractThumbnailBlob(renderer, vrm, 256).then(blob => {
									var reader = new FileReader();

									reader.onload = function (e) {
										if (!inList) {
											modelList.set([
												{
													name: vrm.name,
													type: modelObj.type,
													url: modelObj.url,
													data: modelObj.type === 'blob' ? url : null,
													uploaded: modelObj.uploaded,
													icon: e.target.result,
													color: null
												},
												...$modelList
											]);

											return;
										}

										needsThumbnail.icon = e.target.result;
										needsThumbnail.color = null;
										modelList.set($modelList);
									};

									reader.readAsDataURL(blob);
								});
							} catch(err) {
								
							}
						} else if (!inList) {
							modelList.set([
								{
									name: vrm.name,
									type: 'url',
									url,
									date: modelObj.date,
									icon: null,
									color: newRandomColor()
								},
								...$modelList
							]);
						}
					}
				});

				if (!$firstLoad) {
					setTimeout(
						() => {
							firstLoad.set(true);
							firstLoad0_1.set(1);
						},
						1000
					);
				}
			},
			progress => // console.log(
			//   "Loading model...",
			//   100.0 * (progress.loaded / progress.total),
			//   "%"
			// ),
			loadingPerc.set(progress.loaded / progress.total),
			error => {
				console.error(error);

				if (!$firstLoad) {
					setTimeout(
						() => {
							firstLoad.set(true);
							firstLoad0_1.set(1);
						},
						1000
					);
				}
			}
		);
	}

	// helpers
	new GridHelper(10, 10);

	new AxesHelper(5);

	$$self.$$set = $$props => {
		if ('scene' in $$props) $$invalidate(0, scene = $$props.scene);
		if ('group' in $$props) $$invalidate(1, group = $$props.group);
		if ('renderer' in $$props) $$invalidate(2, renderer = $$props.renderer);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*$p2pConnection, $cameraConfig, $remoteMode, $isHost*/ 120) {
			{
				if ($p2pConnection && $cameraConfig.firstPerson && $cameraConfig.freeCamera && !$remoteMode) {
					set_store_value(profiles, $profiles.user.position.x = 0, $profiles);
					set_store_value(profiles, $profiles.friend.position.x = 0, $profiles);
					set_store_value(profiles, $profiles.friend.position.z = -.5, $profiles);
				} else if ($p2pConnection && $isHost && !$remoteMode) {
					set_store_value(profiles, $profiles.user.position.x = .2, $profiles);
					set_store_value(profiles, $profiles.friend.position.z = 0, $profiles);
					set_store_value(profiles, $profiles.friend.position.x = -.2, $profiles);
				} else if ($p2pConnection && !$isHost && !$remoteMode) {
					set_store_value(profiles, $profiles.user.position.x = -.2, $profiles);
					set_store_value(profiles, $profiles.friend.position.x = .2, $profiles);
					set_store_value(profiles, $profiles.friend.position.z = 0, $profiles);
				} else {
					set_store_value(profiles, $profiles.user.position.x = 0, $profiles);
					set_store_value(profiles, $profiles.friend.position.x = 0, $profiles);
					set_store_value(profiles, $profiles.friend.position.z = 0, $profiles);
				}
			}
		}
	};

	return [scene, group, renderer, $remoteMode, $isHost, $p2pConnection, $cameraConfig];
}

class Character extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$v, null, safe_not_equal, { scene: 0, group: 1, renderer: 2 });
	}
}

/* src/scene/shaders.svelte generated by Svelte v3.46.4 */
let sunPivot = new Object3D();
let sunlightPivot = new Object3D();
const enableSun = writable(false);
const pixelSize = writable(0);
const outlineSize = writable(0);
const outlineColor = writable("#ffffff");

const spinSun = clock => {
	if (!sunPivot) {
		return;
	}

	if (!get_store_value(profiles).user.model) {
		return;
	}

	let headPivot = get_store_value(profiles).user.model.pivotPoint;
	sunPivot.rotation.y -= .03;
	let osc = Math.sin(clock.getElapsedTime()) * .4;
	sunPivot.rotation.x = osc;

	if (headPivot.x !== sunPivot.position.x || headPivot.y !== sunPivot.position.y) {
		sunPivot.position.x = headPivot.x;
		sunPivot.position.y = headPivot.y;
		sunlightPivot.position.copy(sunPivot.position);
	}

	sunlightPivot.rotation.copy(sunPivot.rotation);
};

function instance$u($$self, $$props, $$invalidate) {
	let $profiles;

	let $outlineColor,
		$$unsubscribe_outlineColor = noop;

	let $outlineSize,
		$$unsubscribe_outlineSize = noop;

	let $pixelSize,
		$$unsubscribe_pixelSize = noop;

	let $enableSun,
		$$unsubscribe_enableSun = noop;

	let $lightColor;
	component_subscribe($$self, profiles, $$value => $$invalidate(9, $profiles = $$value));
	component_subscribe($$self, outlineColor, $$value => $$invalidate(10, $outlineColor = $$value));
	component_subscribe($$self, outlineSize, $$value => $$invalidate(11, $outlineSize = $$value));
	component_subscribe($$self, pixelSize, $$value => $$invalidate(12, $pixelSize = $$value));
	component_subscribe($$self, enableSun, $$value => $$invalidate(13, $enableSun = $$value));
	component_subscribe($$self, lightColor, $$value => $$invalidate(14, $lightColor = $$value));
	$$self.$$.on_destroy.push(() => $$unsubscribe_outlineColor());
	$$self.$$.on_destroy.push(() => $$unsubscribe_outlineSize());
	$$self.$$.on_destroy.push(() => $$unsubscribe_pixelSize());
	$$self.$$.on_destroy.push(() => $$unsubscribe_enableSun());
	let { scene } = $$props;
	let { camera } = $$props;
	let { renderer } = $$props;
	let { composer } = $$props;

	let effectPass = null,
		renderPass = null,
		godraysEffect = null,
		smaaPass = null,
		pixelationEffect = null,
		outlineEffect = null;

	const mainLight = new PointLight(0xffe3b1);
	mainLight.intensity = .8;
	mainLight.shadow.radius = 8;
	mainLight.position.set(0, 2, 3.25);
	mainLight.castShadow = true;
	mainLight.shadow.bias = 0.0000125;
	mainLight.shadow.mapSize.width = 2048;
	mainLight.shadow.mapSize.height = 2048;
	mainLight.shadow.camera.near = 0.5; // default
	mainLight.shadow.camera.far = 500; // default

	// Sun
	const sunMaterial = new MeshBasicMaterial({
			color: 0xffddaa,
			transparent: true,
			fog: false
		});

	new SphereGeometry(0.05, 32, 32);
	const cube = new BoxGeometry(.05, .05, .05);
	const sun = new Mesh(cube, sunMaterial);
	sun.position.copy(mainLight.position);
	sun.position.y -= 2;
	sun.position.z -= 3;
	sun.rotation.x = Math.PI / 2;
	sun.updateMatrix();
	sun.frustumCulled = false;
	sun.matrixAutoUpdate = false;

	// Using a group to check if matrix updates work correctly.
	sunPivot.position.set(0, 1.25, 0);

	// group.add(sun);
	sunPivot.add(sun, mainLight);

	sunlightPivot.add(mainLight);
	scene.add(sunlightPivot);

	function load() {
		const assets = new Map();
		const loadingManager = new LoadingManager();
		const smaaImageLoader = new SMAAImageLoader(loadingManager);

		return new Promise((resolve, reject) => {
				loadingManager.onLoad = () => resolve(assets);
				loadingManager.onError = reject;

				smaaImageLoader.load(([search, area]) => {
					assets.set("smaa-search", search);
					assets.set("smaa-area", area);
				});
			});
	}

	function initialize(assets) {
		const smaaEffect = new SMAAEffect(assets.get("smaa-search"), assets.get("smaa-area"), SMAAPreset.HIGH, EdgeDetectionMode.COLOR);
		smaaEffect.edgeDetectionMaterial.setEdgeDetectionThreshold(0.02);
		smaaEffect.edgeDetectionMaterial.setPredicationMode(PredicationMode.DEPTH);
		smaaEffect.edgeDetectionMaterial.setPredicationThreshold(0.002);
		smaaEffect.edgeDetectionMaterial.setPredicationScale(1.0);

		$$invalidate(6, godraysEffect = new GodRaysEffect(camera,
		sun,
		{
				height: 480,
				kernelSize: KernelSize.SMALL,
				density: 0.96,
				decay: 0.92,
				weight: 0.7,
				exposure: 0.54,
				samples: 60,
				clampMax: 1.0
			}));

		$$invalidate(7, pixelationEffect = new PixelationEffect($pixelSize * 35));

		$$invalidate(8, outlineEffect = new OutlineEffect(scene,
		camera,
		{
				blendFunction: BlendFunction.SCREEN,
				edgeStrength: 1,
				pulseSpeed: 0,
				visibleEdgeColor: 0xffffff,
				hiddenEdgeColor: 0xffffff,
				height: renderer.height,
				kernelSize: KernelSize.MEDIUM,
				blur: true,
				xRay: false
			}));

		// outlineEffect.selection.set($profiles.user.model.selection);
		$$invalidate(5, renderPass = new RenderPass(scene, camera));

		$$invalidate(4, effectPass = new EffectPass(camera, godraysEffect, pixelationEffect, outlineEffect));
		smaaPass = new EffectPass(camera, smaaEffect);
		$$invalidate(4, effectPass.needsDepthTexture = false, effectPass);
		$$invalidate(4, effectPass.renderToScreen = true, effectPass);
		composer.addPass(renderPass);
		composer.addPass(smaaPass);
		composer.addPass(effectPass);
	}

	load().then(initialize).catch(e => console.error(e));

	$$self.$$set = $$props => {
		if ('scene' in $$props) $$invalidate(0, scene = $$props.scene);
		if ('camera' in $$props) $$invalidate(1, camera = $$props.camera);
		if ('renderer' in $$props) $$invalidate(2, renderer = $$props.renderer);
		if ('composer' in $$props) $$invalidate(3, composer = $$props.composer);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*$enableSun*/ 8192) {
			mainLight.visible = $enableSun;
		}

		if ($$self.$$.dirty & /*$lightColor*/ 16384) {
			mainLight.color = new Color($lightColor);
		}

		if ($$self.$$.dirty & /*$enableSun*/ 8192) {
			sun.visible = $enableSun;
		}

		if ($$self.$$.dirty & /*renderPass, effectPass, godraysEffect, outlineEffect, camera*/ 370) {
			{
				if (renderPass && effectPass && godraysEffect && outlineEffect && camera) {
					$$invalidate(5, renderPass.camera = camera, renderPass);
					$$invalidate(4, effectPass.camera = camera, effectPass);
					$$invalidate(6, godraysEffect.camera = camera, godraysEffect);
					smaaPass.camera = camera;
					$$invalidate(8, outlineEffect.camera = camera, outlineEffect);
				}
			}
		}

		if ($$self.$$.dirty & /*pixelationEffect, $pixelSize*/ 4224) {
			{
				if (pixelationEffect) {
					pixelationEffect.setGranularity($pixelSize * 35);
				}
			}
		}

		if ($$self.$$.dirty & /*outlineEffect, $outlineSize, $profiles, $outlineColor*/ 3840) {
			{
				if (outlineEffect) {
					if ($outlineSize > 0 && $profiles.user.model) {
						let sizes = Object.keys(KernelSize);
						$$invalidate(8, outlineEffect.blurPass.kernelSize = KernelSize[sizes[Math.floor($outlineSize * (sizes.length - 1))]], outlineEffect);
						outlineEffect.uniforms.get("edgeStrength").value = $outlineSize * 264;
						outlineEffect.uniforms.get("visibleEdgeColor").value.set($outlineColor);
						outlineEffect.selection.set($profiles.user.model.selection);
					} else {
						outlineEffect.selection.clear();
					}
				}
			}
		}
	};

	return [
		scene,
		camera,
		renderer,
		composer,
		effectPass,
		renderPass,
		godraysEffect,
		pixelationEffect,
		outlineEffect,
		$profiles,
		$outlineColor,
		$outlineSize,
		$pixelSize,
		$enableSun,
		$lightColor
	];
}

class Shaders extends SvelteComponent {
	constructor(options) {
		super();

		init(this, options, instance$u, null, safe_not_equal, {
			scene: 0,
			camera: 1,
			renderer: 2,
			composer: 3
		});
	}
}

/* src/scene/AnimationFrame.svelte generated by Svelte v3.46.4 */
const clock = new Clock();
let delta = 0;

function instance$t($$self, $$props, $$invalidate) {
	let $bgURL;
	let $camera;
	let $enableSun;
	let $outlineSize;
	let $pixelSize;
	let $infoExpanded;
	component_subscribe($$self, bgURL, $$value => $$invalidate(3, $bgURL = $$value));
	component_subscribe($$self, camera, $$value => $$invalidate(4, $camera = $$value));
	component_subscribe($$self, enableSun, $$value => $$invalidate(5, $enableSun = $$value));
	component_subscribe($$self, outlineSize, $$value => $$invalidate(6, $outlineSize = $$value));
	component_subscribe($$self, pixelSize, $$value => $$invalidate(7, $pixelSize = $$value));
	component_subscribe($$self, infoExpanded, $$value => $$invalidate(8, $infoExpanded = $$value));
	let { scene } = $$props;
	let { renderer } = $$props;
	let { composer } = $$props;

	function animate() {
		requestAnimationFrame(animate);
		delta = clock.getDelta();

		// delta += clock.getDelta();
		// if (delta  < interval) {return}
		// delta = delta % interval;
		// updateBG()
		if ($infoExpanded) {
			return;
		}

		updateVRM('user', delta);
		updateVRM('friend', delta);
		handleView();

		if (composer && ($enableSun || $pixelSize > 0 || $outlineSize > 0)) {
			composer.render(delta);

			if ($enableSun) {
				spinSun(clock);
			}
		} else {
			renderer.render(scene, $camera);
		}

		if ($bgURL && $bgURL.sea) {
			updateSea();
		}
	}

	animate();

	$$self.$$set = $$props => {
		if ('scene' in $$props) $$invalidate(0, scene = $$props.scene);
		if ('renderer' in $$props) $$invalidate(1, renderer = $$props.renderer);
		if ('composer' in $$props) $$invalidate(2, composer = $$props.composer);
	};

	return [scene, renderer, composer];
}

class AnimationFrame extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$t, null, safe_not_equal, { scene: 0, renderer: 1, composer: 2 });
	}
}

/* src/scene/charRigger.svelte generated by Svelte v3.46.4 */
const allowLegs = writable(true);
const allowRoom = writable(true);
const allowSmile = writable(true);
getLocalStorage(allowLegs, 'allowLegs', get_store_value(allowLegs));
subLocalStorage(allowLegs, 'allowLegs');
getLocalStorage(allowRoom, 'allowRoom', get_store_value(allowRoom));
subLocalStorage(allowRoom, 'allowRoom');
getLocalStorage(allowRoom, 'allowSmile', get_store_value(allowRoom));
subLocalStorage(allowRoom, 'allowSmile');

const rigRotation = (part, rotation = { x: 0, y: 0, z: 0 }, amount = .3) => {
	//VRM part
	if (amount === 1) {
		part.rotation.x = rotation.x;
		part.rotation.y = rotation.y;
		part.rotation.z = rotation.z;
		return;
	}

	let q = new Quaternion().setFromEuler(new Euler(rotation.x, rotation.y, rotation.z));
	let qDelta = q.clone().invert().multiply(part.quaternion);
	let sumDelta = .6 + clamp(Math.abs((qDelta.x + qDelta.y + qDelta.z) * 40), 0, 1) * .4;
	part.quaternion.slerp(q, clamp(amount * sumDelta, 0, 1));
};

const animateHead = (currentVrm, face, pose, flipHorizontal = false, reset = false) => {
	if (!face || !pose) {
		return;
	}

	let invert = flipHorizontal ? -1 : 1;
	const Neck = currentVrm.humanoid.getBoneNode(u.HumanoidBoneName.Neck);

	//offset center tilt to face selfie camera
	let offsetX = get_store_value(cameraConfig).freeCamera && !get_store_value(cameraConfig).firstPerson
	? clamp(-pivotPoint.rotation.x, -.4, .4)
	: 0;

	//offset head rotation when body is turned to the side.
	let offsetY = get_store_value(options).holistic.enable
	? clamp(pose.Hips.rotation.y, -Math.PI, Math.PI)
	: 0;

	let dampener = 1;

	if (Neck) {
		rigRotation(
			Neck,
			{
				y: clamp(face.head.y * dampener - offsetY, -.8, .8) * invert,
				x: get_store_value(options).holistic.enable
				? clamp(face.head.x * dampener + offsetX, -.8, .8)
				: clamp(face.head.x * dampener + offsetX, -.8, .8),
				z: clamp(face.head.z * dampener * .8, -.3, .3) * invert
			},
			reset ? 1 : .04 + delta * 4
		);
	}
};

const animateChest = (currentVrm, face, pose, flipHorizontal = false, reset = false) => {
	if (!face || !pose) {
		return;
	}

	let invert = flipHorizontal ? -1 : 1;
	let upperChest = currentVrm.humanoid.getBoneNode(u.HumanoidBoneName.UpperChest);
	const Chest = currentVrm.humanoid.getBoneNode(u.HumanoidBoneName.Chest);
	const Spine = currentVrm.humanoid.getBoneNode(u.HumanoidBoneName.Spine);
	let dampener = .05;

	//Note: decreased rotation to help with selfee demo
	if (Chest) {
		rigRotation(
			Chest,
			{
				x: clamp(face.head.x * dampener, -.3, .3),
				z: get_store_value(options).holistic.enable
				? clamp(pose.Spine.z * dampener, -.7, .7) * invert
				: clamp(face.head.z * dampener, -.1, .1) * invert,
				y: get_store_value(options).holistic.enable
				? clamp(pose.Spine.y * dampener * 0.2, -.7, .7)
				: clamp(face.head.y * dampener * 2, -.3, .3)
			},
			reset ? 1 : .04 + delta * 2
		);
	}

	if (Spine) {
		rigRotation(
			Spine,
			{
				x: clamp(face.head.x * dampener, -.3, .3),
				z: get_store_value(options).holistic.enable
				? clamp(pose.Spine.z * dampener, -.7, .7) * invert
				: clamp(face.head.z * dampener, -.3, .3) * invert,
				y: get_store_value(options).holistic.enable
				? clamp(pose.Spine.y * dampener * 0.2, -.4, .4)
				: clamp(face.head.y * dampener * 2, -.1, .1)
			},
			reset ? 1 : .04 + delta * 2
		);
	}

	if (upperChest) {
		rigRotation(
			upperChest,
			{
				x: clamp(face.head.x * dampener, -.3, .3),
				z: get_store_value(options).holistic.enable
				? clamp(pose.Spine.z * dampener, -.7, .7) * invert
				: clamp(face.head.z * dampener, -.1, .1) * invert,
				y: get_store_value(options).holistic.enable
				? clamp(pose.Spine.y * dampener * 0.2, -.4, .4)
				: clamp(face.head.y * dampener * 2, -.3, .3)
			},
			reset ? 1 : .04 + delta * 2
		);
	}
};

const animateFace = (currentVrm, face, reset = false) => {
	if (!face) {
		return;
	}

	// Blendshapes and Preset Name Schema
	const Blendshape = currentVrm.blendShapeProxy;

	const PresetName = u.BlendShapePresetName;
	const mouthX = remap(face.mouth.x - .4, 0, .5);
	face.mouth.y;
	let eye = { l: face.eye.l, r: face.eye.r };
	let joy = 0;

	if (get_store_value(allowSmile)) {
		// Warning! Joy blendshape changes both Blink and Mouth behaviors
		//Calc Joy value based on mouth X + eye closed ratio
		joy = clamp(mouthX * 1, 0, 1);

		joy *= eye.l !== eye.r ? 0 : 1 - remap(eye.l, .2, .8);
	} // joy = Vector.lerp(joy, Blendshape.getValue(PresetName.Joy), .5)

	//handle Wink
	if (eye.l !== eye.r) {
		eye.l = clamp(1 - eye.l, 0, 1);
		eye.r = clamp(1 - eye.r, 0, 1);

		//Joy blendshape clashes with BlinkL and BlinkR blenshapes. Reset Joy
		joy = 0;

		Blendshape.setValue(PresetName.Blink, 0);
		Blendshape.setValue(PresetName.BlinkL, eye.l);
		Blendshape.setValue(PresetName.BlinkR, eye.r);
	} else {
		const stabilizedBlink = clamp(1 - eye.l, 0, 1);

		//Subtract joy values from Blink values to avoid clipping
		Blendshape.setValue(PresetName.Blink, stabilizedBlink - joy);

		Blendshape.setValue(PresetName.BlinkL, 0);
		Blendshape.setValue(PresetName.BlinkR, 0);
	}

	Blendshape.setValue(PresetName.I, face.mouth.shape.I - joy);
	Blendshape.setValue(PresetName.A, face.mouth.shape.A * .8 - joy);
	Blendshape.setValue(PresetName.E, face.mouth.shape.E * .8 - joy);
	Blendshape.setValue(PresetName.O, face.mouth.shape.O * .8 - joy);
	Blendshape.setValue(PresetName.U, face.mouth.shape.U * .8 - joy);

	// Blendshape.setValue( PresetName.I, Vector.lerp(face.mouth.shape.I - joy, Blendshape.getValue(PresetName.I), .5) );
	// Blendshape.setValue( PresetName.A, Vector.lerp(face.mouth.shape.A - joy, Blendshape.getValue(PresetName.A), .5) );
	// Blendshape.setValue( PresetName.E, Vector.lerp(face.mouth.shape.E - joy, Blendshape.getValue(PresetName.E), .5) );
	// Blendshape.setValue( PresetName.O, Vector.lerp(face.mouth.shape.O - joy, Blendshape.getValue(PresetName.O), .5) );
	// Blendshape.setValue( PresetName.U, Vector.lerp(face.mouth.shape.U - joy, Blendshape.getValue(PresetName.U), .5) );
	Blendshape.setValue(PresetName.Joy, joy);

	//PUPILS
	//lookat method accepts Three.euler objects
	let lookTarget;

	lookTarget = new Euler(face.pupil.y, face.pupil.x, 0, 'XYZ');
	currentVrm.lookAt.applyer.lookAt(lookTarget);
};

const animateArm = (currentVrm, pose, side = "Right", flipHorizontal = false, reset = false) => {
	if (!pose) {
		return;
	}

	let invertedSide = side === "Right" && flipHorizontal
	? 'Left'
	: side === "Left" && flipHorizontal ? 'Right' : side;

	let invert = flipHorizontal ? -1 : 1;
	const UpperArm = currentVrm.humanoid.getBoneNode(u.HumanoidBoneName[invertedSide + 'UpperArm']);
	const LowerArm = currentVrm.humanoid.getBoneNode(u.HumanoidBoneName[invertedSide + 'LowerArm']);
	const Hand = currentVrm.humanoid.getBoneNode(u.HumanoidBoneName[invertedSide + 'Hand']);

	rigRotation(
		UpperArm,
		{
			z: pose[side + 'UpperArm'].z * invert,
			y: pose[side + 'UpperArm'].y * invert,
			x: pose[side + 'UpperArm'].x
		},
		reset ? 1 : .04 + delta * 4
	);

	rigRotation(
		LowerArm,
		{
			z: pose[side + 'LowerArm'].z * invert,
			y: pose[side + 'LowerArm'].y * invert,
			x: pose[side + 'LowerArm'].x
		},
		reset ? 1 : .04 + delta * 4
	);

	rigRotation(
		Hand,
		{
			z: pose[side + 'Hand'].z * invert,
			y: pose[side + 'Hand'].y * invert,
			x: pose[side + 'Hand'].x
		},
		reset ? 1 : .04 + delta * 6
	);
};

const animateFingers = (currentVrm, hand, pose, side = "Right", flipHorizontal = false, reset = false) => {
	if (!hand || !pose) {
		return;
	}

	let invertedSide = side === "Right" && flipHorizontal
	? 'Left'
	: side === "Left" && flipHorizontal ? 'Right' : side;

	let invert = flipHorizontal ? -1 : 1;
	let digits = ['Ring', 'Index', 'Little', 'Thumb', 'Middle'];
	let segments = ['Proximal', 'Intermediate', 'Distal'];

	//Animate Fingers
	digits.forEach(e => {
		segments.forEach(j => {
			const trackedFinger = hand[side + e + j];
			const Finger = currentVrm.humanoid.getBoneNode(u.HumanoidBoneName[invertedSide + e + j]);

			if (!Finger) {
				return;
			}

			rigRotation(
				Finger,
				{
					z: trackedFinger.z * invert,
					y: e === "Thumb" ? trackedFinger.y * invert : 0,
					x: e === "Thumb" ? trackedFinger.x : 0
				},
				reset ? 1 : .04 + delta * 8
			);
		});
	});
};

//Dampening multipliers for when animating legs using only head input
const bendXMult = .85;

const posXMult = bendXMult / 6;

const animateLegs = (currentVrm, pose, face, side = "Right", flipHorizontal, reset = false) => {
	if (!face || !pose) {
		return;
	}

	let invert = side === 'Right' ? 1 : -1;
	const UpperLeg = currentVrm.humanoid.getBoneNode(u.HumanoidBoneName[side + 'UpperLeg']);
	const LowerLeg = currentVrm.humanoid.getBoneNode(u.HumanoidBoneName[side + 'LowerLeg']);
	const Foot = currentVrm.humanoid.getBoneNode(u.HumanoidBoneName[side + 'Foot']);
	currentVrm.humanoid.getBoneNode(u.HumanoidBoneName.Chest);
	const Hips = currentVrm.humanoid.getBoneNode(u.HumanoidBoneName.Hips);

	//Animate Legs if Pose Tracking is available and experimental Flag is checked
	if (get_store_value(options).holistic.enable && pose[side + 'UpperLeg'].z !== 0 && get_store_value(allowLegs)) {
		rigRotation(
			UpperLeg,
			{
				z: pose[side + 'UpperLeg'].z,
				x: pose[side + 'UpperLeg'].x,
				y: 0
			},
			reset ? 1 : .08 + delta * 8
		);

		rigRotation(LowerLeg, { z: 0, x: pose[side + 'LowerLeg'].x, y: 0 }, reset ? 1 : .08 + delta * 8);
		return;
	}

	let hipValueY = flipHorizontal ? face.head.y : face.head.y;

	rigRotation(
		UpperLeg,
		{
			z: .015 * invert + clamp(
				get_store_value(options).holistic.enable
				? Hips.rotation.z
				: face.head.z * .3,
				-2.3,
				2.3
			) * -.9,
			x: clamp(face.head.x, -1, 0) * -bendXMult,
			y: clamp(hipValueY * .3, -1.3, 1.3) * -bendXMult
		},
		reset ? 1 : .08 + delta * 4
	);

	rigRotation(
		LowerLeg,
		{
			z: 0,
			x: clamp(face.head.x, -1, 0) * bendXMult * 2,
			y: 0
		},
		reset ? 1 : .08 + delta * 4
	);

	rigRotation(
		Foot,
		{
			z: 0,
			x: clamp(face.head.x, -1, 0) * -bendXMult,
			y: 0
		},
		reset ? 1 : .08 + delta * 4
	);
};

const animateHips = (currentVrm, pose, face, flipHorizontal = false, reset = false) => {
	if (!face || !pose) {
		return;
	}

	let invert = flipHorizontal ? -1 : 1;
	const Hips = currentVrm.humanoid.getBoneNode(u.HumanoidBoneName.Hips);
	currentVrm.humanoid.getBoneNode(u.HumanoidBoneName.Spine);
	currentVrm.humanoid.getBoneNode(u.HumanoidBoneName.Chest);
	let dampener = .2;

	//rotate hip based on head turn to simulate more natural 
	let HipBendY = currentVrm.humanoid.restPose.hips.position[1] - clamp(face.head.x, -1, 0) * -posXMult;

	// if tracking legs, adjust hip y position depending on the lowest world position of the feet
	if (get_store_value(allowLegs) && (pose['RightUpperLeg'].z !== 0 || pose['LeftUpperLeg'].z !== 0)) {
		const rightFoot = currentVrm.humanoid.getBoneNode(u.HumanoidBoneName.RightFoot);
		const leftFoot = currentVrm.humanoid.getBoneNode(u.HumanoidBoneName.LeftFoot);
		var rightPos = new Vector3();
		var leftPos = new Vector3();
		rightFoot.getWorldPosition(rightPos);
		leftFoot.getWorldPosition(leftPos);
		HipBendY = Hips.position.y - Math.min(rightPos.y - .08, leftPos.y - .08);
	}

	let newHipsY = !reset
	? Vector.lerp(Hips.position.y, HipBendY, .5 + delta * 4)
	: HipBendY;

	let newHipsX = !reset
	? Vector.lerp(Hips.position.x, pose.Hips.position.x, .05 + pose.Hips.position.z * -delta * 4)
	: pose.Hips.position.x;

	let newHipsZ = !reset
	? Vector.lerp(Hips.position.z, pose.Hips.position.z, .02 + pose.Hips.position.z * -delta * 4)
	: pose.Hips.position.z;

	newHipsX = get_store_value(allowRoom) && !flipHorizontal
	? clamp(newHipsX, -3, 3)
	: 0;

	newHipsZ = get_store_value(allowRoom) && !flipHorizontal
	? clamp(newHipsZ, -10, 3)
	: 0;

	const newHipPosition = new Vector3(newHipsX, newHipsY, newHipsZ);
	Hips.position.lerp(newHipPosition, !reset ? .7 : 1);
	let HipEuler = {};

	HipEuler.z = get_store_value(options).holistic.enable && get_store_value(allowRoom) && get_store_value(allowLegs)
	? clamp(pose.Hips.rotation.z, -1.3, 1.3) * invert
	: clamp(face.head.z, -1.3, 1.3) * .3 * invert; //make hip rotation more sensitive 

	HipEuler.x = get_store_value(options).holistic.enable
	? clamp(pose.Hips.rotation.z, -1.3, 1.3) * -bendXMult * .1
	: clamp(face.head.x * dampener, -1.3, 1.3) * -bendXMult * .1;

	HipEuler.y = get_store_value(options).holistic.enable && !flipHorizontal && !reset
	? pose.Hips.rotation.y + Math.PI
	: Math.PI * (flipHorizontal ? 0 : 1) + clamp(face.head.y * dampener * 4, -1.3, 1.3) * .75;

	rigRotation(Hips, HipEuler, reset ? 1 : .04 + delta * 4);
};

const _zee = new Vector3( 0, 0, 1 );
const _euler = new Euler();
const _q0 = new Quaternion();
const _q1 = new Quaternion( - Math.sqrt( 0.5 ), 0, 0, Math.sqrt( 0.5 ) ); // - PI/2 around the x-axis

const _changeEvent = { type: 'change' };

class DeviceOrientationControls extends EventDispatcher {

	constructor( object ) {

		super();

		if ( window.isSecureContext === false ) {

			console.error( 'THREE.DeviceOrientationControls: DeviceOrientationEvent is only available in secure contexts (https)' );

		}

		const scope = this;

		const EPS = 0.000001;
		const lastQuaternion = new Quaternion();

		this.object = object;
		this.object.rotation.reorder( 'YXZ' );

		this.enabled = true;

		this.deviceOrientation = {};
		this.screenOrientation = 0;

		this.alphaOffset = 0; // radians

		const onDeviceOrientationChangeEvent = function ( event ) {

			scope.deviceOrientation = event;

		};

		const onScreenOrientationChangeEvent = function () {

			scope.screenOrientation = window.orientation || 0;

		};

		// The angles alpha, beta and gamma form a set of intrinsic Tait-Bryan angles of type Z-X'-Y''

		const setObjectQuaternion = function ( quaternion, alpha, beta, gamma, orient ) {

			_euler.set( beta, alpha, - gamma, 'YXZ' ); // 'ZXY' for the device, but 'YXZ' for us

			quaternion.setFromEuler( _euler ); // orient the device

			quaternion.multiply( _q1 ); // camera looks out the back of the device, not the top

			quaternion.multiply( _q0.setFromAxisAngle( _zee, - orient ) ); // adjust for screen orientation

		};

		this.connect = function () {

			onScreenOrientationChangeEvent(); // run once on load

			// iOS 13+

			if ( window.DeviceOrientationEvent !== undefined && typeof window.DeviceOrientationEvent.requestPermission === 'function' ) {

				window.DeviceOrientationEvent.requestPermission().then( function ( response ) {

					if ( response == 'granted' ) {

						window.addEventListener( 'orientationchange', onScreenOrientationChangeEvent );
						window.addEventListener( 'deviceorientation', onDeviceOrientationChangeEvent );

					}

				} ).catch( function ( error ) {

					console.error( 'THREE.DeviceOrientationControls: Unable to use DeviceOrientation API:', error );

				} );

			} else {

				window.addEventListener( 'orientationchange', onScreenOrientationChangeEvent );
				window.addEventListener( 'deviceorientation', onDeviceOrientationChangeEvent );

			}

			scope.enabled = true;

		};

		this.disconnect = function () {

			window.removeEventListener( 'orientationchange', onScreenOrientationChangeEvent );
			window.removeEventListener( 'deviceorientation', onDeviceOrientationChangeEvent );

			scope.enabled = false;

		};

		this.update = function () {

			if ( scope.enabled === false ) return;

			const device = scope.deviceOrientation;

			if ( device ) {

				const alpha = device.alpha ? MathUtils.degToRad( device.alpha ) + scope.alphaOffset : 0; // Z

				const beta = device.beta ? MathUtils.degToRad( device.beta ) : 0; // X'

				const gamma = device.gamma ? MathUtils.degToRad( device.gamma ) : 0; // Y''

				const orient = scope.screenOrientation ? MathUtils.degToRad( scope.screenOrientation ) : 0; // O

				setObjectQuaternion( scope.object.quaternion, alpha, beta, gamma, orient );

				if ( 8 * ( 1 - lastQuaternion.dot( scope.object.quaternion ) ) > EPS ) {

					lastQuaternion.copy( scope.object.quaternion );
					scope.dispatchEvent( _changeEvent );

				}

			}

		};

		this.dispose = function () {

			scope.disconnect();

		};

		this.connect();

	}

}

/* src/scene/CameraControls.svelte generated by Svelte v3.46.4 */
const cameraConfig = writable({ firstPerson: false, freeCamera: false });
const staticCamera = new PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 700);
staticCamera.position.set(0.0, 1.4, 1);
const freeCamera = new PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000);
const pivotPoint = new Object3D();
const pivotRotation = writable(0);
pivotPoint.position.set(0.0, 1.35, 0);
pivotPoint.add(freeCamera);
freeCamera.position.set(0.0, 0, 1);

// freeCamera.rotation.order = 'YXZ';
pivotPoint.rotation.order = 'YXZ';

let orbitControls;
let pointerLockControls = null;
let camera = writable(staticCamera);

const toggleView = () => {
	haptic();

	cameraConfig.set({
		freeCamera: !get_store_value(cameraConfig).freeCamera,
		firstPerson: get_store_value(cameraConfig).firstPerson
	});
};

const toggleFirstPerson = () => {
	cameraConfig.set({
		firstPerson: !get_store_value(cameraConfig).firstPerson,
		freeCamera: get_store_value(cameraConfig).freeCamera
	});
};

let gyroPresent = false;

window.addEventListener('devicemotion', function (event) {
	if (event.rotationRate.alpha || event.rotationRate.beta || event.rotationRate.gamma) gyroPresent = true;
});

const handleView = () => {
	handleOrientation(orientationControls, freeCamera, pivotPoint);
	handlePointerLock(pointerLockControls, freeCamera, pivotPoint);

	if (orbitControls && !get_store_value(cameraConfig).freeCamera) {
		orbitControls.update();
	}
};

let orientationControls;

const faceToCam = (obj, cam, type = 'user') => {
	//rotates character y axis to face a given camera or resets when not in freecam
	if (!obj || !cam) {
		return;
	}

	let firstPerson = get_store_value(cameraConfig).firstPerson;
	let freeCamera = get_store_value(cameraConfig).freeCamera;

	if (!freeCamera) {
		obj.scene.rotation.y = 0;
		animateHead(obj, get_store_value(profiles)[type].tracking.Face, get_store_value(profiles)[type].tracking.Pose);
		animateHips(obj, get_store_value(profiles)[type].tracking.Pose, get_store_value(profiles)[type].tracking.Face, false, false);
		return;
	}

	let cameraPostion = new Vector3();
	cam.getWorldPosition(cameraPostion);
	let lookatRotation = Math.atan2(cameraPostion.x - obj.scene.position.x, cameraPostion.z - obj.scene.position.z);

	if (firstPerson && obj.isUser) {
		obj.scene.rotation.y = lookatRotation + Math.PI;
	} else if (firstPerson && !obj.isUser) {
		obj.scene.rotation.y = 0;
	} else {
		obj.scene.rotation.y = lookatRotation;
	}
};

const panZoomCam = camera => {
	if (!get_store_value(cameraConfig).firstPerson) {
		let offsetZ = clamp(1.15 + (get_store_value(profiles).user.tracking.Face.head.width - 0.3) * -1.9, 0.2, 24.5);
		let offsetX = clamp((get_store_value(profiles).user.tracking.Face.head.position.x - 0.5) * 0.35, -1.5, 1.5);
		let offsetY = clamp((get_store_value(profiles).user.tracking.Face.head.position.y - 0.5) * 0.35, -1.5, 1.5);
		camera.position.lerp(new Vector3(offsetX, offsetY, offsetZ), .3);
	} else {
		camera.position.set(0, 0.03, -0.05);
	}
};

const handleOrientation = (controls, camera, pivot) => {
	if (!controls) {
		return;
	}

	const currentVrm = get_store_value(profiles).user.model;
	const currentFriendVrm = get_store_value(profiles).friend.model;
	faceToCam(currentVrm, camera, 'user');
	faceToCam(currentFriendVrm, camera, 'friend');

	if (!get_store_value(cameraConfig).freeCamera) {
		return;
	}

	controls.update();
	let newRotation = (Vector.normalizeAngle(pivot.rotation.y) + 1) / 2;

	if (newRotation !== get_store_value(pivotRotation)) {
		pivotRotation.set(newRotation);
	}

	//set bounds to up down rotation
	pivot.rotation.x = clamp(
		pivot.rotation.x * (get_store_value(cameraConfig).firstPerson ? 1 : -1),
		get_store_value(cameraConfig).firstPerson
		? -Math.PI * 0.25
		: -Math.PI,
		0.7
	);

	pivot.rotation.y *= get_store_value(cameraConfig).firstPerson ? 1 : -1;
	panZoomCam(camera);
};

const handlePointerLock = (controls, camera, pivot, delta) => {
	const currentVrm = get_store_value(profiles).user.model;
	const currentFriendVrm = get_store_value(profiles).friend.model;

	if (!controls) {
		return;
	}

	//Rotate character to freecam or reset
	faceToCam(currentVrm, camera, 'user');

	faceToCam(currentFriendVrm, camera, 'friend');

	if (controls.isLocked === false) {
		return;
	}

	let newRotation = (Vector.normalizeAngle(pivot.rotation.y) + 1) / 2;

	if (newRotation !== get_store_value(pivotRotation)) {
		pivotRotation.set(newRotation);
	}

	pivot.rotation.x = clamp(
		pivot.rotation.x,
		get_store_value(cameraConfig).firstPerson
		? -Math.PI * 0.25
		: -Math.PI,
		0.7
	);

	panZoomCam(camera);
};

function instance$s($$self, $$props, $$invalidate) {
	let $firstLoad0_1;

	let $cameraConfig,
		$$unsubscribe_cameraConfig = noop;

	let $profiles;
	component_subscribe($$self, firstLoad0_1, $$value => $$invalidate(2, $firstLoad0_1 = $$value));
	component_subscribe($$self, cameraConfig, $$value => $$invalidate(3, $cameraConfig = $$value));
	component_subscribe($$self, profiles, $$value => $$invalidate(4, $profiles = $$value));
	$$self.$$.on_destroy.push(() => $$unsubscribe_cameraConfig());
	let { scene } = $$props;
	let { renderer } = $$props;

	const askForGyro = () => {
		if (typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function') {
			// (optional) Do something before API request prompt.
			DeviceMotionEvent.requestPermission().then(response => {
				// (optional) Do something after API prompt dismissed.
				if (response == 'granted') {
					window.addEventListener('devicemotion', e => {
						// do something for 'e' here.
						if (e.rotationRate.alpha || e.rotationRate.beta || e.rotationRate.gamma) gyroPresent = true;

						initOrientationControls();
					});
				}
			}).catch(console.error);
		} // alert( "DeviceMotionEvent is not defined" );
	};

	const initOrientationControls = () => {
		if (orientationControls || !gyroPresent) {
			return;
		}

		orientationControls = new DeviceOrientationControls(pivotPoint);

		// orientationControls.addEventListener( 'change', function () {
		//   alert('orientation')
		//   handleOrientation(orientationControls,freeCamera,pivotPoint)
		// } );
		toggleFirstPersonLayer($profiles.user.model);
	};

	const initPointerLockControls = () => {
		if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
			return;
		}

		if (orientationControls || pointerLockControls) {
			//don't initialize pointerlockcontrols if already have orientation controls
			return;
		}

		pointerLockControls = new PointerLockControls(pivotPoint, renderer.domElement);

		pointerLockControls.addEventListener('lock', function () {
			toggleFirstPersonLayer($profiles.user.model);
		});

		pointerLockControls.addEventListener('unlock', function () {
			cameraConfig.set({
				firstPerson: $cameraConfig.firstPerson,
				freeCamera: false
			});
		});
	};

	// camera controls
	orbitControls = new OrbitControls(staticCamera, renderer.domElement);

	orbitControls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
	orbitControls.dampingFactor = 0.2;
	orbitControls.screenSpacePanning = true;
	orbitControls.maxPolarAngle = Math.PI * 0.62;
	orbitControls.maxDistance = 10;
	orbitControls.minDistance = 0.25;

	// orbitControls.target.set(0.0, 1.0, 0.0);
	orbitControls.update();

	scene.add(pivotPoint);

	$$self.$$set = $$props => {
		if ('scene' in $$props) $$invalidate(0, scene = $$props.scene);
		if ('renderer' in $$props) $$invalidate(1, renderer = $$props.renderer);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*$cameraConfig, $profiles*/ 24) {
			{
				if ($cameraConfig.freeCamera) {
					if (!gyroPresent) {
						askForGyro();
					}

					initOrientationControls();
					initPointerLockControls();

					if (pointerLockControls) {
						pointerLockControls.lock();
					}

					// if($cameraConfig.firstPerson && orientationControls){
					//   toggleFirstPersonLayer($profiles.user.model);
					// }
					if (orientationControls) {
						toggleFirstPersonLayer($profiles.user.model);
					}
				} else {
					if (pointerLockControls) {
						pointerLockControls.unlock();
					}

					toggleFirstPersonLayer($profiles.user.model);
				}
			}
		}

		if ($$self.$$.dirty & /*$firstLoad0_1*/ 4) {
			staticCamera.position.z = .75 + 3.5 * (1 - $firstLoad0_1);
		}

		if ($$self.$$.dirty & /*$cameraConfig, staticCamera*/ 8) {
			camera.set($cameraConfig.freeCamera ? freeCamera : staticCamera);
		}
	};

	return [scene, renderer, $firstLoad0_1, $cameraConfig, $profiles];
}

class CameraControls extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$s, null, safe_not_equal, { scene: 0, renderer: 1 });
	}
}

var stickers_svelte_svelte_type_style_lang = '';

/* src/scene/stickers.svelte generated by Svelte v3.46.4 */

function get_each_context$6(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[3] = list[i];
	return child_ctx;
}

// (195:2) {:else}
function create_else_block$8(ctx) {
	let img;
	let img_src_value;
	let img_alt_value;
	let mounted;
	let dispose;

	return {
		c() {
			img = element("img");
			attr(img, "class", "content svelte-1p6qz08");
			if (!src_url_equal(img.src, img_src_value = /*sticker*/ ctx[3].url)) attr(img, "src", img_src_value);
			attr(img, "alt", img_alt_value = 'preset sticker' + /*sticker*/ ctx[3].id);
		},
		m(target, anchor) {
			insert(target, img, anchor);

			if (!mounted) {
				dispose = listen(img, "contextmenu", contextmenu_handler_1);
				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty & /*$stickerLayers*/ 1 && !src_url_equal(img.src, img_src_value = /*sticker*/ ctx[3].url)) {
				attr(img, "src", img_src_value);
			}

			if (dirty & /*$stickerLayers*/ 1 && img_alt_value !== (img_alt_value = 'preset sticker' + /*sticker*/ ctx[3].id)) {
				attr(img, "alt", img_alt_value);
			}
		},
		d(detaching) {
			if (detaching) detach(img);
			mounted = false;
			dispose();
		}
	};
}

// (190:2) {#if sticker.type==="video"}
function create_if_block$d(ctx) {
	let video;
	let video_src_value;
	let video_alt_value;
	let mounted;
	let dispose;

	return {
		c() {
			video = element("video");
			attr(video, "class", "content svelte-1p6qz08");
			if (!src_url_equal(video.src, video_src_value = /*sticker*/ ctx[3].url)) attr(video, "src", video_src_value);
			attr(video, "alt", video_alt_value = 'uploaded sticker' + /*sticker*/ ctx[3].id);
			video.autoplay = true;
			video.muted = true;
			video.playsInline = true;
			video.loop = true;
		},
		m(target, anchor) {
			insert(target, video, anchor);

			if (!mounted) {
				dispose = listen(video, "contextmenu", contextmenu_handler);
				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty & /*$stickerLayers*/ 1 && !src_url_equal(video.src, video_src_value = /*sticker*/ ctx[3].url)) {
				attr(video, "src", video_src_value);
			}

			if (dirty & /*$stickerLayers*/ 1 && video_alt_value !== (video_alt_value = 'uploaded sticker' + /*sticker*/ ctx[3].id)) {
				attr(video, "alt", video_alt_value);
			}
		},
		d(detaching) {
			if (detaching) detach(video);
			mounted = false;
			dispose();
		}
	};
}

// (185:0) {#each $stickerLayers as sticker (sticker.id)}
function create_each_block$6(key_1, ctx) {
	let div;
	let t;
	let div_data_id_value;
	let div_data_z_value;
	let div_intro;
	let div_outro;
	let current;

	function select_block_type(ctx, dirty) {
		if (/*sticker*/ ctx[3].type === "video") return create_if_block$d;
		return create_else_block$8;
	}

	let current_block_type = select_block_type(ctx);
	let if_block = current_block_type(ctx);

	return {
		key: key_1,
		first: null,
		c() {
			div = element("div");
			if_block.c();
			t = space();
			attr(div, "class", "resize-drag svelte-1p6qz08");
			set_style(div, "max-width", Math.min(/*$DIM*/ ctx[1].w * .5, 300) + "px");
			set_style(div, "z-index", /*sticker*/ ctx[3].zIndex);
			attr(div, "data-id", div_data_id_value = /*sticker*/ ctx[3].id);
			attr(div, "data-z", div_data_z_value = /*sticker*/ ctx[3].zIndex);
			this.first = div;
		},
		m(target, anchor) {
			insert(target, div, anchor);
			if_block.m(div, null);
			append(div, t);
			current = true;
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;

			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
				if_block.p(ctx, dirty);
			} else {
				if_block.d(1);
				if_block = current_block_type(ctx);

				if (if_block) {
					if_block.c();
					if_block.m(div, t);
				}
			}

			if (!current || dirty & /*$DIM*/ 2) {
				set_style(div, "max-width", Math.min(/*$DIM*/ ctx[1].w * .5, 300) + "px");
			}

			if (!current || dirty & /*$stickerLayers*/ 1) {
				set_style(div, "z-index", /*sticker*/ ctx[3].zIndex);
			}

			if (!current || dirty & /*$stickerLayers*/ 1 && div_data_id_value !== (div_data_id_value = /*sticker*/ ctx[3].id)) {
				attr(div, "data-id", div_data_id_value);
			}

			if (!current || dirty & /*$stickerLayers*/ 1 && div_data_z_value !== (div_data_z_value = /*sticker*/ ctx[3].zIndex)) {
				attr(div, "data-z", div_data_z_value);
			}
		},
		i(local) {
			if (current) return;

			add_render_callback(() => {
				if (div_outro) div_outro.end(1);
				div_intro = create_in_transition(div, scale, { duration: 300, easing: cubicInOut });
				div_intro.start();
			});

			current = true;
		},
		o(local) {
			if (div_intro) div_intro.invalidate();
			div_outro = create_out_transition(div, scale, { duration: 300, easing: cubicInOut });
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			if_block.d();
			if (detaching && div_outro) div_outro.end();
		}
	};
}

function create_fragment$q(ctx) {
	let each_blocks = [];
	let each_1_lookup = new Map();
	let each_1_anchor;
	let current;
	let each_value = /*$stickerLayers*/ ctx[0];
	const get_key = ctx => /*sticker*/ ctx[3].id;

	for (let i = 0; i < each_value.length; i += 1) {
		let child_ctx = get_each_context$6(ctx, each_value, i);
		let key = get_key(child_ctx);
		each_1_lookup.set(key, each_blocks[i] = create_each_block$6(key, child_ctx));
	}

	return {
		c() {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each_1_anchor = empty();
		},
		m(target, anchor) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(target, anchor);
			}

			insert(target, each_1_anchor, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			if (dirty & /*Math, $DIM, $stickerLayers, cubicInOut*/ 3) {
				each_value = /*$stickerLayers*/ ctx[0];
				group_outros();
				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, each_1_anchor.parentNode, outro_and_destroy_block, create_each_block$6, each_1_anchor, get_each_context$6);
				check_outros();
			}
		},
		i(local) {
			if (current) return;

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o(local) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d(detaching) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].d(detaching);
			}

			if (detaching) detach(each_1_anchor);
		}
	};
}

const stickerList = writable([]);

const presetStickers = [
	//accessories
	{
		url: urlBase + 'img/sticker/accessories/sunglass_normal.png',
		default: .5
	},
	{
		url: urlBase + 'img/sticker/accessories/birthday_party_sunglass.png',
		default: .5
	},
	{
		url: urlBase + 'img/sticker/accessories/medical_mask_front_view.png',
		default: .5
	},
	//furniture
	{
		url: urlBase + 'img/sticker/furniture/table_syoumen_wood.png',
		default: .5
	},
	//food
	{
		url: urlBase + 'img/sticker/food/potatochips_fukuro_red.png',
		default: .5
	},
	{
		url: urlBase + 'img/sticker/food/sweets_marzipan_cake.png',
		default: .5
	},
	{
		url: urlBase + 'img/sticker/food/sweets_purin_cup.png',
		default: .5
	},
	{
		url: urlBase + 'img/sticker/food/snackgashi.png',
		default: .5
	},
	//music
	{
		url: urlBase + 'img/sticker/drink/cafe_coffee_cup.png',
		default: .5
	},
	{
		url: urlBase + 'img/sticker/drink/drink_cocktail09.png',
		default: .5
	},
	{
		url: urlBase + 'img/sticker/drink/drink_cocktail10.png',
		default: .5
	},
	{
		url: urlBase + 'img/sticker/drink/drink_sangria.png',
		default: .5
	},
	{
		url: urlBase + 'img/sticker/drink/wine_bottle_bourgogne.png',
		default: .5
	},
	//music
	{
		url: urlBase + 'img/sticker/music/music_mic_stand.png',
		default: .5
	},
	{
		url: urlBase + 'img/sticker/music/pen_light2_3_lime.png',
		default: .5
	},
	{
		url: urlBase + 'img/sticker/music/music_guitar_doubleneck.png',
		default: .5
	},
	{
		url: urlBase + 'img/sticker/music/gassyou_fumendai.png',
		default: .5
	},
	{
		url: urlBase + 'img/sticker/music/music_mixer_dj.png',
		default: .5
	},
	{
		url: urlBase + 'img/sticker/music/animal_penguin_music_band.png',
		default: .5
	}
];

getLocalStorage(stickerList, 'stickerList', [], createBlobURL);
subLocalStorage(stickerList, 'stickerList');
const stickerLayers = writable([]);

function dragMoveListener(event) {
	var target = event.target,
		// keep the dragged position in the data-x/data-y attributes
		x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
		y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

	// translate the element
	target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

	// update the posiion attributes
	target.setAttribute('data-x', x);

	target.setAttribute('data-y', y);
}

const contextmenu_handler = e => {
	e.preventDefault();
	return false;
};

const contextmenu_handler_1 = e => {
	e.preventDefault();
	return false;
};

function instance$r($$self, $$props, $$invalidate) {
	let $stickerLayers,
		$$unsubscribe_stickerLayers = noop;

	let $DIM;
	component_subscribe($$self, stickerLayers, $$value => $$invalidate(0, $stickerLayers = $$value));
	component_subscribe($$self, DIM, $$value => $$invalidate(1, $DIM = $$value));
	$$self.$$.on_destroy.push(() => $$unsubscribe_stickerLayers());

	const bringToTop = el => {
		let newLayers = [];

		$stickerLayers.forEach(e => {
			if (e.id === el.getAttribute('data-id')) {
				e.zIndex = $stickerLayers.length + 1;
			} else if (e.zIndex > el.getAttribute('data-z')) {
				e.zIndex = e.zIndex - 1;
			}

			newLayers.push(e);
		});

		stickerLayers.set(newLayers);
	};

	onMount(async () => {
		// interact('.resize-drag').unset()
		interact(".resize-drag").gesturable({
			listeners: {
				start(event) {
					let a = (parseFloat(event.target.getAttribute("data-a")) || 0) - event.angle; // angleScale.angle -= event.angle
					let s = parseFloat(event.target.getAttribute("data-s")) || 1;
					event.target.setAttribute("data-a", a);
					event.target.setAttribute("data-s", s);
				}, // angleScale.angle -= event.angle
				move(event) {
					let a = parseFloat(event.target.getAttribute("data-a")) + event.angle;
					a = a > 360 ? a % 360 : a < -360 ? a % 360 : a;
					let s = parseFloat(event.target.getAttribute("data-s")) * event.scale;
					var currentAngle = a;

					currentAngle = Math.abs(a) < 3
					? 0
					: Math.abs(90 - a) < 3
						? 90
						: Math.abs(-270 - a) < 3
							? 90
							: Math.abs(180 - Math.abs(a)) < 3
								? 180
								: Math.abs(270 - a) < 3
									? 270
									: Math.abs(-90 - a) < 3
										? 270
										: Math.abs(360 - Math.abs(a)) < 3 ? 0 : a;

					var currentScale = s;
					let scaleElement = event.target.firstChild;
					scaleElement.style.webkitTransform = scaleElement.style.transform = "rotate(" + currentAngle + "deg)" + "scale(" + currentScale + ")";

					// uses the dragMoveListener from the draggable demo above
					dragMoveListener(event);
				},
				end(event) {
					let a = (parseFloat(event.target.getAttribute("data-a")) || 0) + event.angle;
					a = a > 360 ? a % 360 : a < -360 ? a % 360 : a;
					let s = (parseFloat(event.target.getAttribute("data-s")) || 1) * event.scale;
					event.target.setAttribute("data-a", a);
					event.target.setAttribute("data-s", s);
				}
			}
		}).draggable({
			onmove: dragMoveListener,
			cursorChecker() {
				// don't set a cursor for drag actions
				return null;
			}
		}).on('down', function (event) {
			bringToTop(event.currentTarget);
		});

		if (window.matchMedia("(hover: hover) and (pointer:fine)").matches) {
			interact(".resize-drag").resizable({
				// resize from all edges and corners
				edges: {
					left: true,
					right: true,
					bottom: true,
					top: true
				},
				modifiers: [
					interact.modifiers.aspectRatio({ ratio: "preserve" }),
					interact.modifiers.restrictSize({ min: { width: 50 } })
				], // max: { width: 500, height: 500 },
				inertia: true
			}).on("resizemove", function (event) {
				if (window.matchMedia("(hover: hover) and (pointer:fine)").matches) {
					var target = event.target,
						x = parseFloat(target.getAttribute("data-x")) || 0,
						y = parseFloat(target.getAttribute("data-y")) || 0;

					// update the element's style
					if (event.rect.width > 50) {
						target.firstChild.style.width = event.rect.width + "px";
						target.firstChild.style.height = event.rect.height + "px";

						// translate when resizing from top or left edges
						x += event.deltaRect.left;

						y += event.deltaRect.top;
						target.style.webkitTransform = target.style.transform = "translate(" + x + "px," + y + "px)";
						target.setAttribute("data-x", x);
						target.setAttribute("data-y", y);
					}

					target.style.maxWidth = 'none';
					target.style.maxHeight = 'none';
				}
			});
		}
	});

	return [$stickerLayers, $DIM];
}

class Stickers extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$r, create_fragment$q, safe_not_equal, {});
	}
}

var canvas_svelte_svelte_type_style_lang = '';

/* src/scene/canvas.svelte generated by Svelte v3.46.4 */

function create_if_block_1$9(ctx) {
	let shaders;
	let current;

	shaders = new Shaders({
			props: {
				scene: /*scene*/ ctx[6],
				camera: /*$camera*/ ctx[5],
				renderer: /*renderer*/ ctx[0],
				composer: /*composer*/ ctx[1]
			}
		});

	return {
		c() {
			create_component(shaders.$$.fragment);
		},
		m(target, anchor) {
			mount_component(shaders, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const shaders_changes = {};
			if (dirty & /*$camera*/ 32) shaders_changes.camera = /*$camera*/ ctx[5];
			if (dirty & /*renderer*/ 1) shaders_changes.renderer = /*renderer*/ ctx[0];
			if (dirty & /*composer*/ 2) shaders_changes.composer = /*composer*/ ctx[1];
			shaders.$set(shaders_changes);
		},
		i(local) {
			if (current) return;
			transition_in(shaders.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(shaders.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(shaders, detaching);
		}
	};
}

// (147:0) {#if hasPIP}
function create_if_block$c(ctx) {
	let pip;
	let current;

	pip = new Pip({
			props: { canvas: /*renderer*/ ctx[0].domElement }
		});

	return {
		c() {
			create_component(pip.$$.fragment);
		},
		m(target, anchor) {
			mount_component(pip, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const pip_changes = {};
			if (dirty & /*renderer*/ 1) pip_changes.canvas = /*renderer*/ ctx[0].domElement;
			pip.$set(pip_changes);
		},
		i(local) {
			if (current) return;
			transition_in(pip.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(pip.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(pip, detaching);
		}
	};
}

function create_fragment$p(ctx) {
	let container1;
	let container0;
	let container0_class_value;
	let t0;
	let stickers;
	let t1;
	let t2;
	let character;
	let t3;
	let bg;
	let t4;
	let cameracontrols;
	let t5;
	let animationframe;
	let t6;
	let if_block1_anchor;
	let current;
	stickers = new Stickers({});
	let if_block0 = /*composer*/ ctx[1] && create_if_block_1$9(ctx);

	character = new Character({
			props: {
				scene: /*scene*/ ctx[6],
				group: /*group*/ ctx[7],
				renderer: /*renderer*/ ctx[0]
			}
		});

	bg = new Bg({
			props: {
				renderer: /*renderer*/ ctx[0],
				scene: /*scene*/ ctx[6],
				light: /*light*/ ctx[3]
			}
		});

	cameracontrols = new CameraControls({
			props: {
				scene: /*scene*/ ctx[6],
				renderer: /*renderer*/ ctx[0]
			}
		});

	animationframe = new AnimationFrame({
			props: {
				scene: /*scene*/ ctx[6],
				renderer: /*renderer*/ ctx[0],
				composer: /*composer*/ ctx[1]
			}
		});

	let if_block1 = hasPIP && create_if_block$c(ctx);

	return {
		c() {
			container1 = element("container");
			container0 = element("container");
			t0 = space();
			create_component(stickers.$$.fragment);
			t1 = space();
			if (if_block0) if_block0.c();
			t2 = space();
			create_component(character.$$.fragment);
			t3 = space();
			create_component(bg.$$.fragment);
			t4 = space();
			create_component(cameracontrols.$$.fragment);
			t5 = space();
			create_component(animationframe.$$.fragment);
			t6 = space();
			if (if_block1) if_block1.c();
			if_block1_anchor = empty();

			attr(container0, "class", container0_class_value = "canvasContainer " + (/*$subNavExpanded*/ ctx[4] === 'sticker'
			? 'disabled'
			: '') + " svelte-rjdl5h");

			attr(container1, "class", "scene svelte-rjdl5h");
		},
		m(target, anchor) {
			insert(target, container1, anchor);
			append(container1, container0);
			/*container0_binding*/ ctx[15](container0);
			append(container1, t0);
			mount_component(stickers, container1, null);
			insert(target, t1, anchor);
			if (if_block0) if_block0.m(target, anchor);
			insert(target, t2, anchor);
			mount_component(character, target, anchor);
			insert(target, t3, anchor);
			mount_component(bg, target, anchor);
			insert(target, t4, anchor);
			mount_component(cameracontrols, target, anchor);
			insert(target, t5, anchor);
			mount_component(animationframe, target, anchor);
			insert(target, t6, anchor);
			if (if_block1) if_block1.m(target, anchor);
			insert(target, if_block1_anchor, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			if (!current || dirty & /*$subNavExpanded*/ 16 && container0_class_value !== (container0_class_value = "canvasContainer " + (/*$subNavExpanded*/ ctx[4] === 'sticker'
			? 'disabled'
			: '') + " svelte-rjdl5h")) {
				attr(container0, "class", container0_class_value);
			}

			if (/*composer*/ ctx[1]) {
				if (if_block0) {
					if_block0.p(ctx, dirty);

					if (dirty & /*composer*/ 2) {
						transition_in(if_block0, 1);
					}
				} else {
					if_block0 = create_if_block_1$9(ctx);
					if_block0.c();
					transition_in(if_block0, 1);
					if_block0.m(t2.parentNode, t2);
				}
			} else if (if_block0) {
				group_outros();

				transition_out(if_block0, 1, 1, () => {
					if_block0 = null;
				});

				check_outros();
			}

			const character_changes = {};
			if (dirty & /*renderer*/ 1) character_changes.renderer = /*renderer*/ ctx[0];
			character.$set(character_changes);
			const bg_changes = {};
			if (dirty & /*renderer*/ 1) bg_changes.renderer = /*renderer*/ ctx[0];
			if (dirty & /*light*/ 8) bg_changes.light = /*light*/ ctx[3];
			bg.$set(bg_changes);
			const cameracontrols_changes = {};
			if (dirty & /*renderer*/ 1) cameracontrols_changes.renderer = /*renderer*/ ctx[0];
			cameracontrols.$set(cameracontrols_changes);
			const animationframe_changes = {};
			if (dirty & /*renderer*/ 1) animationframe_changes.renderer = /*renderer*/ ctx[0];
			if (dirty & /*composer*/ 2) animationframe_changes.composer = /*composer*/ ctx[1];
			animationframe.$set(animationframe_changes);
			if (hasPIP) if_block1.p(ctx, dirty);
		},
		i(local) {
			if (current) return;
			transition_in(stickers.$$.fragment, local);
			transition_in(if_block0);
			transition_in(character.$$.fragment, local);
			transition_in(bg.$$.fragment, local);
			transition_in(cameracontrols.$$.fragment, local);
			transition_in(animationframe.$$.fragment, local);
			transition_in(if_block1);
			current = true;
		},
		o(local) {
			transition_out(stickers.$$.fragment, local);
			transition_out(if_block0);
			transition_out(character.$$.fragment, local);
			transition_out(bg.$$.fragment, local);
			transition_out(cameracontrols.$$.fragment, local);
			transition_out(animationframe.$$.fragment, local);
			transition_out(if_block1);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(container1);
			/*container0_binding*/ ctx[15](null);
			destroy_component(stickers);
			if (detaching) detach(t1);
			if (if_block0) if_block0.d(detaching);
			if (detaching) detach(t2);
			destroy_component(character, detaching);
			if (detaching) detach(t3);
			destroy_component(bg, detaching);
			if (detaching) detach(t4);
			destroy_component(cameracontrols, detaching);
			if (detaching) detach(t5);
			destroy_component(animationframe, detaching);
			if (detaching) detach(t6);
			if (if_block1) if_block1.d(detaching);
			if (detaching) detach(if_block1_anchor);
		}
	};
}

const lightIntensity = writable(1);
const lightColor = writable('#ffffff');
const lightRotY = writable(.64);
const lightRotX = writable(0.75);
getLocalStorage(lightIntensity, 'lightIntensity', get_store_value(lightIntensity));
subLocalStorage(lightIntensity, 'lightIntensity');
getLocalStorage(lightColor, 'lightColor', get_store_value(lightColor));
subLocalStorage(lightColor, 'lightColor');
getLocalStorage(lightRotY, 'lightRotY', get_store_value(lightRotY));
subLocalStorage(lightRotY, 'lightRotY');
getLocalStorage(lightRotX, 'lightRotX', get_store_value(lightRotX));
subLocalStorage(lightRotX, 'lightRotX');

function instance$q($$self, $$props, $$invalidate) {
	let $lightRotX,
		$$unsubscribe_lightRotX = noop;

	let $lightRotY,
		$$unsubscribe_lightRotY = noop;

	let $enableSun;

	let $lightIntensity,
		$$unsubscribe_lightIntensity = noop;

	let $lightColor,
		$$unsubscribe_lightColor = noop;

	let $outlineSize;
	let $pixelSize;
	let $subNavExpanded;
	let $camera;
	component_subscribe($$self, lightRotX, $$value => $$invalidate(8, $lightRotX = $$value));
	component_subscribe($$self, lightRotY, $$value => $$invalidate(9, $lightRotY = $$value));
	component_subscribe($$self, enableSun, $$value => $$invalidate(10, $enableSun = $$value));
	component_subscribe($$self, lightIntensity, $$value => $$invalidate(11, $lightIntensity = $$value));
	component_subscribe($$self, lightColor, $$value => $$invalidate(12, $lightColor = $$value));
	component_subscribe($$self, outlineSize, $$value => $$invalidate(13, $outlineSize = $$value));
	component_subscribe($$self, pixelSize, $$value => $$invalidate(14, $pixelSize = $$value));
	component_subscribe($$self, subNavExpanded, $$value => $$invalidate(4, $subNavExpanded = $$value));
	component_subscribe($$self, camera, $$value => $$invalidate(5, $camera = $$value));
	$$self.$$.on_destroy.push(() => $$unsubscribe_lightRotX());
	$$self.$$.on_destroy.push(() => $$unsubscribe_lightRotY());
	$$self.$$.on_destroy.push(() => $$unsubscribe_lightIntensity());
	$$self.$$.on_destroy.push(() => $$unsubscribe_lightColor());
	let canvasContainer = undefined;

	const renderer = new WebGLRenderer({
			powerPreference: "high-performance",
			antialias: true,
			stencil: true,
			alpha: true,
			depth: true
		});

	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setPixelRatio(Math.max(2, window.devicePixelRatio));
	renderer.shadowMap.enabled = true;

	// renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	let composer = null;

	// scene
	const scene = new Scene();

	// scene.fog = new THREE.Fog( 0x98F3FD, 1, 100 );
	// light
	const lightPivot = new Object3D();

	lightPivot.position.set(0, 1, 0);
	scene.add(lightPivot);
	const light = new DirectionalLight(new Color($lightColor));
	lightPivot.add(light);
	light.position.set(0, 0, 1);
	light.castShadow = true;
	light.shadow.radius = 2;
	light.shadow.bias = 0.0000125;
	light.shadow.mapSize.width = 2048;
	light.shadow.mapSize.height = 2048;
	const ambientLight = new AmbientLight(0xdc8874, .5);
	scene.add(ambientLight);
	const group = new Group();
	scene.add(group);

	onMount(async () => {
		canvasContainer.appendChild(renderer.domElement);
	});

	DIM.subscribe(val => {
		if (val.w > 0 && renderer) {
			onWindowResize(val.w, val.h, val.s);
		}
	});

	function onWindowResize(width, height, scale) {
		renderer.getPixelRatio();
		let aspect = width / height;
		staticCamera.aspect = aspect;
		staticCamera.updateProjectionMatrix();
		freeCamera.aspect = aspect;
		freeCamera.updateProjectionMatrix();

		if (composer) {
			composer.setSize(width, height);
		} else {
			renderer.setSize(width, height);
		}
	} // renderer.setPixelRatio( scale ); // makes things blurry

	function container0_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			canvasContainer = $$value;
			$$invalidate(2, canvasContainer);
		});
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*$enableSun*/ 1024) {
			$$invalidate(0, renderer.antialias = !$enableSun, renderer);
		}

		if ($$self.$$.dirty & /*$enableSun*/ 1024) {
			$$invalidate(0, renderer.stencil = !$enableSun, renderer);
		}

		if ($$self.$$.dirty & /*$enableSun*/ 1024) {
			$$invalidate(0, renderer.depth = !$enableSun, renderer);
		}

		if ($$self.$$.dirty & /*$enableSun, $pixelSize, $outlineSize, composer, renderer*/ 25603) {
			$$invalidate(1, composer = ($enableSun || $pixelSize > 0 || $outlineSize > 0) && !composer
			? new EffectComposer(renderer)
			: composer);
		}

		if ($$self.$$.dirty & /*$lightColor*/ 4096) {
			$$invalidate(3, light.color = new Color($lightColor), light);
		}

		if ($$self.$$.dirty & /*$lightIntensity*/ 2048) {
			$$invalidate(3, light.intensity = $lightIntensity, light);
		}

		if ($$self.$$.dirty & /*$enableSun*/ 1024) {
			$$invalidate(3, light.visible = !$enableSun, light);
		}

		if ($$self.$$.dirty & /*$lightRotY*/ 512) {
			lightPivot.rotation.y = Math.PI * 2 * $lightRotY;
		}

		if ($$self.$$.dirty & /*$lightRotX*/ 256) {
			lightPivot.rotation.x = Math.PI * $lightRotX;
		}
	};

	return [
		renderer,
		composer,
		canvasContainer,
		light,
		$subNavExpanded,
		$camera,
		scene,
		group,
		$lightRotX,
		$lightRotY,
		$enableSun,
		$lightIntensity,
		$lightColor,
		$outlineSize,
		$pixelSize,
		container0_binding
	];
}

class Canvas extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$q, create_fragment$p, safe_not_equal, {});
	}
}

/* src/data/analytics.svelte generated by Svelte v3.46.4 */

const triggeredData = writable({
	char: [],
	bg: [],
	sticker: [],
	p2pConnection: false,
	uploadedVRM: false,
	firstPerson: false,
	freeCamera: false,
	infoExpanded: false,
	toggledHolistic: false,
	toggledFacemesh: false,
	toggledFacemeshHolistic: false
});

function instance$p($$self, $$props, $$invalidate) {
	let $triggeredData;
	component_subscribe($$self, triggeredData, $$value => $$invalidate(0, $triggeredData = $$value));

	if (!window.dataLayer) {
		window.dataLayer = [];
	}

	options.subscribe(e => {
		if (e.face.running && !$triggeredData.toggledFacemesh) {
			dataLayer.push({
				'event': 'toggledFacemesh',
				'conversionValue': true
			});

			set_store_value(triggeredData, $triggeredData.toggledFacemesh = true, $triggeredData);
		}

		if (e.holistic.running && !$triggeredData.toggledHolistic) {
			dataLayer.push({
				'event': 'toggledHolistic',
				'conversionValue': true
			});

			set_store_value(triggeredData, $triggeredData.toggledHolistic = true, $triggeredData);
		}

		if (e.face.running && e.holistic.running && !$triggeredData.toggledFacemeshHolistic) {
			dataLayer.push({
				'event': 'toggledFacemeshHolistic',
				'conversionValue': true
			});

			set_store_value(triggeredData, $triggeredData.toggledFacemeshHolistic = true, $triggeredData);
		}
	});

	infoExpanded.subscribe(e => {
		if (e && !$triggeredData.infoExpanded) {
			dataLayer.push({
				'event': 'infoExpanded',
				'conversionValue': true
			});

			set_store_value(triggeredData, $triggeredData.infoExpanded = true, $triggeredData);
		}
	});

	userModel.subscribe(e => {
		if (e && e.uploaded && !$triggeredData.uploadedVRM) {
			dataLayer.push({
				'event': 'uploadedVRM',
				'conversionValue': true
			});

			set_store_value(triggeredData, $triggeredData.uploadedVRM = true, $triggeredData);
			return;
		}

		if (e && e.type === "url" && !$triggeredData.char.includes(e.name)) {
			dataLayer.push({
				'event': 'char',
				'conversionValue': e.name
			});

			$triggeredData.char.push(e.name);
		}
	});

	bgURL.subscribe(e => {
		if (e && e.type === 'img' && e.pano && !$triggeredData.bg.includes(e.url)) {
			dataLayer.push({
				'event': 'bg',
				'conversionValue': e.uploaded ? 'customBG' : e.url
			});

			$triggeredData.bg.push(e.url);
		}

		if (e && e.type === 'color' && !$triggeredData.bg.includes(e.url)) {
			dataLayer.push({ 'event': 'bg', 'conversionValue': e.url });
			$triggeredData.bg.push(e.url);
		}

		if (e && e.type === 'iro' && !$triggeredData.bg.includes('iro')) {
			dataLayer.push({ 'event': 'bg', 'conversionValue': 'iro' });
			$triggeredData.bg.push('iro');
		}
	});

	cameraConfig.subscribe(e => {
		if (e.freeCamera && !$triggeredData.freeCamera) {
			dataLayer.push({
				'event': 'freeCamera',
				'conversionValue': true
			});

			set_store_value(triggeredData, $triggeredData.freeCamera = true, $triggeredData);
		}

		if (e.freeCamera && e.firstPerson && !$triggeredData.firstPerson) {
			dataLayer.push({
				'event': 'firstPerson',
				'conversionValue': true
			});

			set_store_value(triggeredData, $triggeredData.firstPerson = true, $triggeredData);
		}
	});

	p2pConnection.subscribe(e => {
		if (e && !$triggeredData.p2pConnection) {
			dataLayer.push({
				'event': 'p2pConnection',
				'conversionValue': true
			});

			set_store_value(triggeredData, $triggeredData.p2pConnection = true, $triggeredData);
		}
	});

	return [];
}

class Analytics extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$p, null, safe_not_equal, {});
	}
}

var ftue_svelte_svelte_type_style_lang = '';

/* src/ui/ftue.svelte generated by Svelte v3.46.4 */

function create_if_block$b(ctx) {
	let container;
	let video;
	let video_class_value;
	let video_src_value;
	let video_alt_value;
	let t0;
	let div;
	let p0;
	let raw_value = ftueText[/*selected*/ ctx[0]].message[/*$setLang*/ ctx[3]] + "";
	let t1;
	let p1;
	let t2_value = ftueText[/*selected*/ ctx[0]].confirm[/*$setLang*/ ctx[3]] + "";
	let t2;
	let container_intro;
	let container_outro;
	let current;
	let mounted;
	let dispose;

	return {
		c() {
			container = element("container");
			video = element("video");
			t0 = space();
			div = element("div");
			p0 = element("p");
			t1 = space();
			p1 = element("p");
			t2 = text(t2_value);
			attr(video, "class", video_class_value = "content " + /*selected*/ ctx[0] + " svelte-1kc6ls6");
			if (!src_url_equal(video.src, video_src_value = /*ftueList*/ ctx[4][/*selected*/ ctx[0]])) attr(video, "src", video_src_value);
			attr(video, "alt", video_alt_value = 'uploaded sticker');
			video.autoplay = true;
			video.muted = true;
			video.playsInline = true;
			video.loop = true;
			attr(p0, "class", "svelte-1kc6ls6");
			attr(p1, "class", "confirm svelte-1kc6ls6");
			attr(container, "style", /*style*/ ctx[1]);
			attr(container, "class", "svelte-1kc6ls6");
		},
		m(target, anchor) {
			insert(target, container, anchor);
			append(container, video);
			append(container, t0);
			append(container, div);
			append(div, p0);
			p0.innerHTML = raw_value;
			append(div, t1);
			append(div, p1);
			append(p1, t2);
			current = true;

			if (!mounted) {
				dispose = listen(p1, "click", /*click_handler*/ ctx[5]);
				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;

			if (!current || dirty & /*selected*/ 1 && video_class_value !== (video_class_value = "content " + /*selected*/ ctx[0] + " svelte-1kc6ls6")) {
				attr(video, "class", video_class_value);
			}

			if (!current || dirty & /*selected*/ 1 && !src_url_equal(video.src, video_src_value = /*ftueList*/ ctx[4][/*selected*/ ctx[0]])) {
				attr(video, "src", video_src_value);
			}

			if ((!current || dirty & /*selected, $setLang*/ 9) && raw_value !== (raw_value = ftueText[/*selected*/ ctx[0]].message[/*$setLang*/ ctx[3]] + "")) p0.innerHTML = raw_value;			if ((!current || dirty & /*selected, $setLang*/ 9) && t2_value !== (t2_value = ftueText[/*selected*/ ctx[0]].confirm[/*$setLang*/ ctx[3]] + "")) set_data(t2, t2_value);

			if (!current || dirty & /*style*/ 2) {
				attr(container, "style", /*style*/ ctx[1]);
			}
		},
		i(local) {
			if (current) return;

			add_render_callback(() => {
				if (container_outro) container_outro.end(1);

				container_intro = create_in_transition(container, scale, {
					delay: 1000,
					duration: 300,
					easing: cubicInOut,
					baseScale: 0.9
				});

				container_intro.start();
			});

			current = true;
		},
		o(local) {
			if (container_intro) container_intro.invalidate();
			container_outro = create_out_transition(container, fade, { duration: 200 });
			current = false;
		},
		d(detaching) {
			if (detaching) detach(container);
			if (detaching && container_outro) container_outro.end();
			mounted = false;
			dispose();
		}
	};
}

function create_fragment$o(ctx) {
	let if_block_anchor;
	let current;
	let if_block = /*selected*/ ctx[0] && /*$ftueState*/ ctx[2][/*selected*/ ctx[0]] && create_if_block$b(ctx);

	return {
		c() {
			if (if_block) if_block.c();
			if_block_anchor = empty();
		},
		m(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			insert(target, if_block_anchor, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			if (/*selected*/ ctx[0] && /*$ftueState*/ ctx[2][/*selected*/ ctx[0]]) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*selected, $ftueState*/ 5) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block$b(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o(local) {
			transition_out(if_block);
			current = false;
		},
		d(detaching) {
			if (if_block) if_block.d(detaching);
			if (detaching) detach(if_block_anchor);
		}
	};
}

const ftueState = writable({
	camera: true,
	char: true,
	call: true,
	bg: true,
	sticker: true
});

const updateFtue = val => {
	if (get_store_value(ftueState)[val]) {
		get_store_value(ftueState)[val] = false;
		ftueState.set(get_store_value(ftueState));
	}
};

getLocalStorage(ftueState, 'ftueState', {
	camera: true,
	char: true,
	call: true,
	bg: true,
	sticker: true
});

subLocalStorage(ftueState, 'ftueState');

function instance$o($$self, $$props, $$invalidate) {
	let $ftueState,
		$$unsubscribe_ftueState = noop;

	let $setLang;
	component_subscribe($$self, ftueState, $$value => $$invalidate(2, $ftueState = $$value));
	component_subscribe($$self, setLang, $$value => $$invalidate(3, $setLang = $$value));
	$$self.$$.on_destroy.push(() => $$unsubscribe_ftueState());
	let { selected } = $$props;
	let { style = '' } = $$props;

	let ftueList = {
		char: "https://cdn.glitch.com/29e07830-2317-4b15-a044-135e73c7f840%2Fcharupload1clippedcropped.mp4?v=1625730916425",
		bg: "https://cdn.glitch.com/29e07830-2317-4b15-a044-135e73c7f840%2Fbgupload1.mp4?v=1625732427215",
		sticker: "https://cdn.glitch.com/29e07830-2317-4b15-a044-135e73c7f840%2Fstickerdropcrop.mp4?v=1625760067751",
		call: "https://cdn.glitch.com/29e07830-2317-4b15-a044-135e73c7f840%2Fcall_small.mp4?v=1626041341731"
	};

	const click_handler = () => updateFtue(selected);

	$$self.$$set = $$props => {
		if ('selected' in $$props) $$invalidate(0, selected = $$props.selected);
		if ('style' in $$props) $$invalidate(1, style = $$props.style);
	};

	return [selected, style, $ftueState, $setLang, ftueList, click_handler];
}

class Ftue extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$o, create_fragment$o, safe_not_equal, { selected: 0, style: 1 });
	}
}

var SVGWipe_svelte_svelte_type_style_lang = '';

/* src/components/SVGWipe.svelte generated by Svelte v3.46.4 */

function create_fragment$n(ctx) {
	let svg;
	let svg_data_axis_value;
	let svg_data_flip_value;
	let current;
	const default_slot_template = /*#slots*/ ctx[8].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[7], null);

	return {
		c() {
			svg = svg_element("svg");
			if (default_slot) default_slot.c();
			attr(svg, "class", "shape-overlays svelte-19kx5c6");
			attr(svg, "viewBox", "0 0 100 100");
			attr(svg, "data-axis", svg_data_axis_value = /*isHorizontal*/ ctx[1] ? 'x' : 'y');
			attr(svg, "data-flip", svg_data_flip_value = /*flip*/ ctx[2] ? true : false);
			attr(svg, "preserveAspectRatio", "none");
		},
		m(target, anchor) {
			insert(target, svg, anchor);

			if (default_slot) {
				default_slot.m(svg, null);
			}

			/*svg_binding*/ ctx[9](svg);
			current = true;
		},
		p(ctx, [dirty]) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 128)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[7],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[7])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[7], dirty, null),
						null
					);
				}
			}

			if (!current || dirty & /*isHorizontal*/ 2 && svg_data_axis_value !== (svg_data_axis_value = /*isHorizontal*/ ctx[1] ? 'x' : 'y')) {
				attr(svg, "data-axis", svg_data_axis_value);
			}

			if (!current || dirty & /*flip*/ 4 && svg_data_flip_value !== (svg_data_flip_value = /*flip*/ ctx[2] ? true : false)) {
				attr(svg, "data-flip", svg_data_flip_value);
			}
		},
		i(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(svg);
			if (default_slot) default_slot.d(detaching);
			/*svg_binding*/ ctx[9](null);
		}
	};
}

let delayPerPath = 0.125; //percentage of timeline

function instance$n($$self, $$props, $$invalidate) {
	let $timeline;
	let { $$slots: slots = {}, $$scope } = $$props;
	let { transition = false } = $$props;
	let svgDom;
	let paths = [];
	let pointsDelay = [];
	let numPaths = 0;
	let numPoints = 5;
	let duration = 1200; //total animation in ms
	let delayPointsMax = 0.5; //percentage of path timeline
	let { isOpen = false } = $$props;
	let curveStyle = "curve";
	let wipe = false;
	let isHorizontal = false;
	let flip = false;
	const timeline = tweened(0, { duration: 1000, easing: identity });
	component_subscribe($$self, timeline, value => $$invalidate(18, $timeline = value));

	const animate = ({ axis = "x", _duration = 1200, _delayPointsMax = 0.15, _delayPerPath = 0.125, action = null, _wipe = false, _flip = false, _curve = "curve", pattern = [], _numPoints = 5 } = {}) => {
		//do not fire when transitioning
		if (!transition) {
			//optional param overrides
			$$invalidate(1, isHorizontal = axis === "x" ? true : false);

			duration = _duration;
			numPoints = _numPoints;
			curveStyle = _curve;
			delayPointsMax = _delayPointsMax;
			delayPointsMax = _delayPerPath;

			$$invalidate(5, isOpen = action === 'open'
			? false
			: action === 'close' ? true : isOpen);

			wipe = _wipe;
			$$invalidate(2, flip = _flip);
			svgDom.setAttribute("data-axis", axis);
			svgDom.setAttribute("data-flip", _flip);

			//optional delay pattern array for less randomized waves
			if (pattern.length >= numPoints) {
				pointsDelay = pattern;
			} else {
				createRandomness();
			}

			//start transition, lock function
			$$invalidate(4, transition = true);

			//reset timeline
			timeline.set(0, { duration: 0 });

			//trigger timeline animation
			timeline.set(1, { duration });
		}
	};

	const createRandomness = () => {
		for (let i = 0; i < numPoints; i++) {
			pointsDelay[i] = Math.random() * delayPointsMax;
		}
	};

	//split single timeline into multi layered complex timeline
	const calcTimeline = t => {
		let allPoints = [[], [], []];
		let pathRange = 1 - delayPerPath * (numPaths - 1);

		//map path val from 0 to 1
		for (let i = 0; i < numPaths; i++) {
			let pathDelay = delayPerPath * (isOpen ? i : numPaths - i - 1);
			let pathVal = (t - pathDelay) / pathRange;
			pathVal = Math.min(Math.max(pathVal, 0), 1);

			//map point val from 0 to 1 based on mapped path val
			for (let j = 0; j < numPoints; j++) {
				let pointVal = (pathVal - pointsDelay[j]) / (1 - delayPointsMax);
				pointVal = Math.min(Math.max(pointVal, 0), 1);
				allPoints[numPaths - i - 1][j] = cubicInOut(pointVal) * 100;
			}
		}

		return allPoints;
	};

	//draw svg
	const render = (paths = [], allPoints = []) => {
		for (var i = 0; i < numPaths; i++) {
			var path = paths[i];
			var points = allPoints[i];
			var d = "";

			//first vector point
			switch (curveStyle) {
				case "curve":
					d += isHorizontal
					? isOpen
						? `M 100 0 H ${points[0]} C`
						: `M 0 0 H ${points[0]} C`
					: isOpen ? `M 0 0 V ${points[0]} C` : `M 0 ${points[0]} C`;
					break;
				case "step":
					d += isHorizontal
					? isOpen
						? `M 100 0 H ${points[0]} L`
						: `M 0 0 H ${points[0]} L`
					: isOpen ? `M 0 0 V ${points[0]} L` : `M 0 ${points[0]} L`;
					break;
				case "zigzag":
					d += isHorizontal
					? isOpen
						? `M 100 0 H ${points[0]} L`
						: `M 0 0 H ${points[0]} L`
					: isOpen ? `M 0 0 V ${points[0]} L` : `M 0 ${points[0]} L`;
					break;
				default:
					d += isHorizontal
					? isOpen
						? `M 100 0 H ${points[0]} C`
						: `M 0 0 H ${points[0]} C`
					: isOpen ? `M 0 0 V ${points[0]} C` : `M 0 ${points[0]} C`;
					break;
			}

			//staggered path points
			for (var j = 0; j < numPoints - 1; j++) {
				var p = (j + 1) / (numPoints - 1) * 100;
				var cp = p - 1 / (numPoints - 1) * 100 / 2;

				switch (curveStyle) {
					case "curve":
						d += isHorizontal
						? ` ${points[j]} ${cp} ${points[j + 1]} ${cp}  ${points[j + 1]} ${p}`
						: ` ${cp} ${points[j]} ${cp} ${points[j + 1]} ${p} ${points[j + 1]}`;
						break;
					case "step":
						d += isHorizontal
						? ` ${points[j]} ${cp} ${points[j + 1]} ${cp}  ${points[j + 1]} ${p}`
						: ` ${cp} ${points[j]} ${cp} ${points[j + 1]} ${p} ${points[j + 1]}`;
						break;
					case "zigzag":
						d += isHorizontal
						? ` ${points[j]} ${cp} ${points[j + 1]} ${p}`
						: ` ${cp} ${points[j]} ${p} ${points[j + 1]}`;
						break;
					default:
						d += isHorizontal
						? ` ${points[j]} ${cp} ${points[j + 1]} ${cp}  ${points[j + 1]} ${p}`
						: ` ${cp} ${points[j]} ${cp} ${points[j + 1]} ${p} ${points[j + 1]}`;
						break;
				}
			}

			//last vector point
			d += isHorizontal
			? isOpen ? ` V 100 H 100` : ` V 100 H 0`
			: isOpen ? ` V 100 H 0` : ` V 0 H 0`;

			path.setAttribute("d", d);
		}
	};

	//handle changes to timeline
	timeline.subscribe(t => {
		let newPoints = calcTimeline(t);

		if (paths.length > 0) {
			render(paths, newPoints);
		}

		if (t === 1) {
			$$invalidate(5, isOpen = !isOpen);

			if (wipe) {
				wipe = false;
				timeline.set(0, { duration: 0 });
				timeline.set(1, { duration });
			} else {
				$$invalidate(4, transition = false);
			}
		}
	});

	//initialize paths and numpaths
	const init = () => {
		paths = svgDom.querySelectorAll(".shape-overlays__path");
		numPaths = paths.length;
		createRandomness();

		if (paths.length > 0) {
			let newPoints = calcTimeline($timeline);
			render(paths, newPoints);
		}
	};

	onMount(() => {
		init();
	});

	function svg_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			svgDom = $$value;
			$$invalidate(0, svgDom);
		});
	}

	$$self.$$set = $$props => {
		if ('transition' in $$props) $$invalidate(4, transition = $$props.transition);
		if ('isOpen' in $$props) $$invalidate(5, isOpen = $$props.isOpen);
		if ('$$scope' in $$props) $$invalidate(7, $$scope = $$props.$$scope);
	};

	return [
		svgDom,
		isHorizontal,
		flip,
		timeline,
		transition,
		isOpen,
		animate,
		$$scope,
		slots,
		svg_binding
	];
}

class SVGWipe extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$n, create_fragment$n, safe_not_equal, { transition: 4, isOpen: 5, animate: 6 });
	}

	get transition() {
		return this.$$.ctx[4];
	}

	set transition(transition) {
		this.$$set({ transition });
		flush();
	}

	get isOpen() {
		return this.$$.ctx[5];
	}

	set isOpen(isOpen) {
		this.$$set({ isOpen });
		flush();
	}

	get animate() {
		return this.$$.ctx[6];
	}
}

var sub_nav_iro_svelte_svelte_type_style_lang = '';

/* src/ui/sub_nav.iro.svelte generated by Svelte v3.46.4 */

function create_fragment$m(ctx) {
	let div1;
	let div0;
	let span;
	let t1;
	let input;
	let input_value_value;
	let input_data_length_value;
	let mounted;
	let dispose;

	return {
		c() {
			div1 = element("div");
			div0 = element("div");
			span = element("span");
			span.textContent = "#";
			t1 = space();
			input = element("input");
			attr(span, "class", "prefix svelte-1te2i8x");
			input.value = input_value_value = /*$savedIro*/ ctx[2].replace('#', '');
			attr(input, "data-length", input_data_length_value = /*$savedIro*/ ctx[2].length);
			attr(input, "maxlength", "6");
			attr(input, "spellcheck", "false");
			attr(input, "placeholder", "000000");
			attr(input, "class", "svelte-1te2i8x");
			attr(div0, "class", "hex svelte-1te2i8x");
			attr(div1, "id", "picker");
			attr(div1, "class", "svelte-1te2i8x");
		},
		m(target, anchor) {
			insert(target, div1, anchor);
			append(div1, div0);
			append(div0, span);
			append(div0, t1);
			append(div0, input);
			/*input_binding*/ ctx[7](input);

			if (!mounted) {
				dispose = [
					listen(input, "input", /*handleHex*/ ctx[3]),
					listen(input, "paste", /*handleHex*/ ctx[3])
				];

				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (dirty & /*$savedIro*/ 4 && input_value_value !== (input_value_value = /*$savedIro*/ ctx[2].replace('#', '')) && input.value !== input_value_value) {
				input.value = input_value_value;
			}

			if (dirty & /*$savedIro*/ 4 && input_data_length_value !== (input_data_length_value = /*$savedIro*/ ctx[2].length)) {
				attr(input, "data-length", input_data_length_value);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div1);
			/*input_binding*/ ctx[7](null);
			mounted = false;
			run_all(dispose);
		}
	};
}

function instance$m($$self, $$props, $$invalidate) {
	let $breakpoint;

	let $savedIro,
		$$unsubscribe_savedIro = noop,
		$$subscribe_savedIro = () => ($$unsubscribe_savedIro(), $$unsubscribe_savedIro = subscribe(savedIro, $$value => $$invalidate(2, $savedIro = $$value)), savedIro);

	component_subscribe($$self, breakpoint, $$value => $$invalidate(6, $breakpoint = $$value));
	$$self.$$.on_destroy.push(() => $$unsubscribe_savedIro());
	let { savedIro } = $$props;
	$$subscribe_savedIro();
	let { bgURL } = $$props;
	let colorPicker = null;
	let inputField = null;

	const createIro = () => {
		$$invalidate(5, colorPicker = new iro$1.ColorPicker("#picker",
		{
				layout: [
					{ component: iro$1.ui.Box },
					{
						component: iro$1.ui.Slider,
						options: { sliderType: 'hue' }
					}
				],
				display: 'flex',
				width: 126,
				color: $savedIro,
				borderWidth: 0,
				borderColor: "var(--offblack)"
			}));

		colorPicker.forceUpdate();

		colorPicker.on('color:change', function (color) {
			savedIro.set(color.hexString);
			bgURL.set({ type: 'iro', url: color.hexString });
		});
	};

	const handleHex = e => {
		let newValue = inputField.value.toLowerCase().replace(/[^A-Fa-f0-9]/g, "");
		$$invalidate(1, inputField.value = newValue, inputField);

		if (newValue.length === 6) {
			$$invalidate(5, colorPicker.color.hexString = '#' + newValue, colorPicker);
			console.log(newValue);
		}
	};

	onMount(() => {
		if (!colorPicker) {
			createIro();
		}
	});

	function input_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			inputField = $$value;
			$$invalidate(1, inputField);
		});
	}

	$$self.$$set = $$props => {
		if ('savedIro' in $$props) $$subscribe_savedIro($$invalidate(0, savedIro = $$props.savedIro));
		if ('bgURL' in $$props) $$invalidate(4, bgURL = $$props.bgURL);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*colorPicker, $breakpoint*/ 96) {
			{
				if (colorPicker && $breakpoint) {
					$$invalidate(5, colorPicker.state.layoutDirection = $breakpoint === 'desktop' ? 'vertical' : 'horizontal', colorPicker);
					colorPicker.forceUpdate();
				}
			}
		}
	};

	return [
		savedIro,
		inputField,
		$savedIro,
		handleHex,
		bgURL,
		colorPicker,
		$breakpoint,
		input_binding
	];
}

class Sub_nav_iro extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$m, create_fragment$m, safe_not_equal, { savedIro: 0, bgURL: 4 });
	}
}

var svgLink_svelte_svelte_type_style_lang = '';

/* src/ui/icons/svgLink.svelte generated by Svelte v3.46.4 */

function create_fragment$l(ctx) {
	let svg;
	let path;

	return {
		c() {
			svg = svg_element("svg");
			path = svg_element("path");
			attr(path, "d", "M19.1597 13.5394C19.1697 13.7094 19.1697 13.8894 19.1297 14.0594C19.1297 14.0694 19.1197 14.0794 19.1197 14.0794C19.0497 14.3794 18.8997 14.6594 18.6697 14.8994C17.9997 15.5694 16.9097 15.5694 16.2397 14.8994C15.5497 14.2094 14.5797 13.9494 13.6797 14.1194C13.4897 14.1594 13.3097 14.2094 13.1297 14.2794C12.7897 14.4194 12.4697 14.6294 12.1897 14.8994L9.50969 17.5894L6.25969 20.8394C5.14969 21.9494 5.14969 23.7694 6.25969 24.8794C7.33969 25.9594 9.21969 25.9594 10.2997 24.8794L12.7697 22.4094C13.8097 23.1194 14.9797 23.5994 16.2197 23.8094L12.7297 27.2994C11.4997 28.5294 9.88969 29.1394 8.27969 29.1394C6.66969 29.1394 5.05969 28.5294 3.82969 27.2994C1.37969 24.8494 1.37969 20.8494 3.82969 18.3994L9.75969 12.4694C10.9897 11.2394 12.5997 10.6294 14.2097 10.6294C15.8197 10.6294 17.4297 11.2394 18.6597 12.4694C18.7897 12.5994 18.8897 12.7494 18.9697 12.9094C18.9797 12.9294 18.9997 12.9594 19.0097 12.9794C19.0797 13.1394 19.1197 13.2994 19.1397 13.4594C19.1597 13.4894 19.1597 13.5194 19.1597 13.5394ZM28.1597 4.69937C26.9697 3.50937 25.3897 2.85938 23.7097 2.85938C22.0297 2.85938 20.4497 3.50937 19.2597 4.69937L15.7597 8.19938C16.9797 8.40938 18.1597 8.87938 19.2097 9.59938L21.6797 7.12938C22.7597 6.04938 24.6397 6.04938 25.7197 7.12938C26.2597 7.66938 26.5597 8.38937 26.5597 9.14937C26.5597 9.90937 26.2597 10.6294 25.7197 11.1694L24.6297 12.2594L19.7997 17.0994C18.7197 18.1794 16.8397 18.1794 15.7597 17.0994C15.0897 16.4294 13.9997 16.4294 13.3297 17.0994C12.6597 17.7694 12.6597 18.8594 13.3297 19.5294C14.5197 20.7194 16.0997 21.3694 17.7797 21.3694C19.4597 21.3694 21.0397 20.7194 22.2297 19.5294L27.0697 14.6894L28.1597 13.5994C29.3497 12.4094 29.9997 10.8294 29.9997 9.14937C29.9997 7.46938 29.3497 5.88937 28.1597 4.69937Z");
			attr(path, "fill", /*fill*/ ctx[0]);
			attr(svg, "style", /*style*/ ctx[1]);
			attr(svg, "width", "32");
			attr(svg, "height", "32");
			attr(svg, "viewBox", "0 0 32 32");
			attr(svg, "fill", "none");
			attr(svg, "xmlns", "http://www.w3.org/2000/svg");
			attr(svg, "class", "svelte-dglue3");
		},
		m(target, anchor) {
			insert(target, svg, anchor);
			append(svg, path);
		},
		p(ctx, [dirty]) {
			if (dirty & /*fill*/ 1) {
				attr(path, "fill", /*fill*/ ctx[0]);
			}

			if (dirty & /*style*/ 2) {
				attr(svg, "style", /*style*/ ctx[1]);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(svg);
		}
	};
}

function instance$l($$self, $$props, $$invalidate) {
	let { fill = "white" } = $$props;
	let { style = "" } = $$props;

	$$self.$$set = $$props => {
		if ('fill' in $$props) $$invalidate(0, fill = $$props.fill);
		if ('style' in $$props) $$invalidate(1, style = $$props.style);
	};

	return [fill, style];
}

class SvgLink extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$l, create_fragment$l, safe_not_equal, { fill: 0, style: 1 });
	}
}

var sub_nav_bg_svelte_svelte_type_style_lang = '';

/* src/ui/sub_nav.bg.svelte generated by Svelte v3.46.4 */

function get_each_context$5(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[16] = list[i];
	child_ctx[18] = i;
	return child_ctx;
}

function get_each_context_1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[19] = list[i];
	return child_ctx;
}

// (109:11) {#each ['2D','3D','Color'] as tab}
function create_each_block_1(ctx) {
	let p;
	let t;
	let mounted;
	let dispose;

	function click_handler() {
		return /*click_handler*/ ctx[11](/*tab*/ ctx[19]);
	}

	return {
		c() {
			p = element("p");
			t = text(/*tab*/ ctx[19]);
			attr(p, "class", "svelte-zpac5a");
			toggle_class(p, "selected", /*tab*/ ctx[19] === /*$BGState*/ ctx[5]);
		},
		m(target, anchor) {
			insert(target, p, anchor);
			append(p, t);

			if (!mounted) {
				dispose = listen(p, "click", click_handler);
				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;

			if (dirty & /*$BGState*/ 32) {
				toggle_class(p, "selected", /*tab*/ ctx[19] === /*$BGState*/ ctx[5]);
			}
		},
		d(detaching) {
			if (detaching) detach(p);
			mounted = false;
			dispose();
		}
	};
}

// (122:4) {:else}
function create_else_block$7(ctx) {
	let div;
	let label0;
	let i0;
	let t1;
	let input;
	let label0_data_text_value;
	let t2;
	let label1;
	let i1;
	let svglink;
	let t3;
	let each_blocks = [];
	let each_1_lookup = new Map();
	let each_1_anchor;
	let current;
	let mounted;
	let dispose;
	svglink = new SvgLink({});

	let each_value = [
		.../*filterArrByState*/ ctx[9](/*$bgList*/ ctx[1], /*$BGState*/ ctx[5]),
		.../*$BGState*/ ctx[5] === '3D' ? preset3DBGs : presetBGs
	];

	const get_key = ctx => /*bg*/ ctx[16];

	for (let i = 0; i < each_value.length; i += 1) {
		let child_ctx = get_each_context$5(ctx, each_value, i);
		let key = get_key(child_ctx);
		each_1_lookup.set(key, each_blocks[i] = create_each_block$5(key, child_ctx));
	}

	return {
		c() {
			div = element("div");
			label0 = element("label");
			i0 = element("i");
			i0.textContent = "file";
			t1 = space();
			input = element("input");
			t2 = space();
			label1 = element("label");
			i1 = element("i");
			create_component(svglink.$$.fragment);
			t3 = space();

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each_1_anchor = empty();
			attr(i0, "class", "kalicon notranslate solid variable svelte-zpac5a");
			attr(input, "type", "file");
			attr(input, "id", "uploadImage");
			attr(input, "name", "fileList");
			attr(input, "accept", ".jpg,.png,.mp4");
			attr(input, "class", "svelte-zpac5a");

			attr(label0, "data-text", label0_data_text_value = /*$BGState*/ ctx[5] === '3D'
			? subnav_bg_text.upload3D[/*$setLang*/ ctx[3]]
			: subnav_bg_text.upload[/*$setLang*/ ctx[3]]);

			attr(label0, "for", "uploadImage");
			attr(label0, "class", "svelte-zpac5a");
			attr(i1, "class", "svgIcon svelte-zpac5a");
			attr(label1, "data-text", "Load from URL");
			attr(label1, "class", "svelte-zpac5a");
			attr(div, "class", "upload svelte-zpac5a");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, label0);
			append(label0, i0);
			append(label0, t1);
			append(label0, input);
			append(div, t2);
			append(div, label1);
			append(label1, i1);
			mount_component(svglink, i1, null);
			insert(target, t3, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(target, anchor);
			}

			insert(target, each_1_anchor, anchor);
			current = true;

			if (!mounted) {
				dispose = [
					listen(input, "change", /*handleClickUpload*/ ctx[8]),
					listen(label1, "click", /*getBGFromPrompt*/ ctx[10])
				];

				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (!current || dirty & /*$BGState, $setLang*/ 40 && label0_data_text_value !== (label0_data_text_value = /*$BGState*/ ctx[5] === '3D'
			? subnav_bg_text.upload3D[/*$setLang*/ ctx[3]]
			: subnav_bg_text.upload[/*$setLang*/ ctx[3]])) {
				attr(label0, "data-text", label0_data_text_value);
			}

			if (dirty & /*$bgURL, filterArrByState, $bgList, $BGState, preset3DBGs, presetBGs, removeImage, handleSelect*/ 739) {
				each_value = [
					.../*filterArrByState*/ ctx[9](/*$bgList*/ ctx[1], /*$BGState*/ ctx[5]),
					.../*$BGState*/ ctx[5] === '3D' ? preset3DBGs : presetBGs
				];

				for (let i = 0; i < each_blocks.length; i += 1) each_blocks[i].r();
				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, each_1_anchor.parentNode, fix_and_destroy_block, create_each_block$5, each_1_anchor, get_each_context$5);
				for (let i = 0; i < each_blocks.length; i += 1) each_blocks[i].a();
			}
		},
		i(local) {
			if (current) return;
			transition_in(svglink.$$.fragment, local);

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o(local) {
			transition_out(svglink.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			destroy_component(svglink);
			if (detaching) detach(t3);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].d(detaching);
			}

			if (detaching) detach(each_1_anchor);
			mounted = false;
			run_all(dispose);
		}
	};
}

// (120:4) {#if $BGState === 'Color'}
function create_if_block$a(ctx) {
	let iropicker;
	let current;
	iropicker = new Sub_nav_iro({ props: { savedIro, bgURL } });

	return {
		c() {
			create_component(iropicker.$$.fragment);
		},
		m(target, anchor) {
			mount_component(iropicker, target, anchor);
			current = true;
		},
		p: noop,
		i(local) {
			if (current) return;
			transition_in(iropicker.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(iropicker.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(iropicker, detaching);
		}
	};
}

// (157:46) 
function create_if_block_4$3(ctx) {
	let div;
	let mounted;
	let dispose;

	function click_handler_3(...args) {
		return /*click_handler_3*/ ctx[14](/*bg*/ ctx[16], ...args);
	}

	return {
		c() {
			div = element("div");
			attr(div, "class", "content color svelte-zpac5a");
			set_style(div, "--bgUrl", /*bg*/ ctx[16].url);
			toggle_class(div, "transparent", /*bg*/ ctx[16].url.length > 7);
		},
		m(target, anchor) {
			insert(target, div, anchor);

			if (!mounted) {
				dispose = listen(div, "click", click_handler_3);
				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;

			if (dirty & /*$bgList, $BGState*/ 34) {
				set_style(div, "--bgUrl", /*bg*/ ctx[16].url);
			}

			if (dirty & /*filterArrByState, $bgList, $BGState, preset3DBGs, presetBGs*/ 546) {
				toggle_class(div, "transparent", /*bg*/ ctx[16].url.length > 7);
			}
		},
		d(detaching) {
			if (detaching) detach(div);
			mounted = false;
			dispose();
		}
	};
}

// (155:43) 
function create_if_block_3$4(ctx) {
	let img;
	let img_src_value;
	let img_alt_value;
	let mounted;
	let dispose;

	function click_handler_2(...args) {
		return /*click_handler_2*/ ctx[13](/*bg*/ ctx[16], ...args);
	}

	return {
		c() {
			img = element("img");
			attr(img, "class", "content svelte-zpac5a");

			if (!src_url_equal(img.src, img_src_value = /*bg*/ ctx[16].thumbnail
			? /*bg*/ ctx[16].thumbnail
			: /*bg*/ ctx[16].url)) attr(img, "src", img_src_value);

			attr(img, "alt", img_alt_value = 'bg' + /*i*/ ctx[18]);
		},
		m(target, anchor) {
			insert(target, img, anchor);

			if (!mounted) {
				dispose = listen(img, "click", click_handler_2);
				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;

			if (dirty & /*$bgList, $BGState*/ 34 && !src_url_equal(img.src, img_src_value = /*bg*/ ctx[16].thumbnail
			? /*bg*/ ctx[16].thumbnail
			: /*bg*/ ctx[16].url)) {
				attr(img, "src", img_src_value);
			}

			if (dirty & /*$bgList, $BGState*/ 34 && img_alt_value !== (img_alt_value = 'bg' + /*i*/ ctx[18])) {
				attr(img, "alt", img_alt_value);
			}
		},
		d(detaching) {
			if (detaching) detach(img);
			mounted = false;
			dispose();
		}
	};
}

// (153:16) {#if bg.type === 'video'}
function create_if_block_2$5(ctx) {
	let video;
	let video_src_value;
	let video_alt_value;
	let mounted;
	let dispose;

	function click_handler_1(...args) {
		return /*click_handler_1*/ ctx[12](/*bg*/ ctx[16], ...args);
	}

	return {
		c() {
			video = element("video");
			attr(video, "class", "content svelte-zpac5a");
			if (!src_url_equal(video.src, video_src_value = /*bg*/ ctx[16].url)) attr(video, "src", video_src_value);
			attr(video, "alt", video_alt_value = 'bg' + /*i*/ ctx[18]);
			video.autoplay = true;
			video.muted = true;
			video.playsInline = true;
			video.loop = true;
		},
		m(target, anchor) {
			insert(target, video, anchor);

			if (!mounted) {
				dispose = listen(video, "click", click_handler_1);
				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;

			if (dirty & /*$bgList, $BGState*/ 34 && !src_url_equal(video.src, video_src_value = /*bg*/ ctx[16].url)) {
				attr(video, "src", video_src_value);
			}

			if (dirty & /*$bgList, $BGState*/ 34 && video_alt_value !== (video_alt_value = 'bg' + /*i*/ ctx[18])) {
				attr(video, "alt", video_alt_value);
			}
		},
		d(detaching) {
			if (detaching) detach(video);
			mounted = false;
			dispose();
		}
	};
}

// (165:16) {#if bg.uploaded}
function create_if_block_1$8(ctx) {
	let button;
	let mounted;
	let dispose;

	function click_handler_4(...args) {
		return /*click_handler_4*/ ctx[15](/*i*/ ctx[18], ...args);
	}

	return {
		c() {
			button = element("button");

			button.innerHTML = `<i class="kalicon notranslate fill small svelte-zpac5a">jellyfill</i> 
                    <i class="kalicon notranslate solid small svelte-zpac5a">minus</i>`;

			attr(button, "class", "remove svelte-zpac5a");
		},
		m(target, anchor) {
			insert(target, button, anchor);

			if (!mounted) {
				dispose = listen(button, "click", click_handler_4);
				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;
		},
		d(detaching) {
			if (detaching) detach(button);
			mounted = false;
			dispose();
		}
	};
}

// (143:10) {#each [...filterArrByState($bgList,$BGState),...($BGState === '3D' ? preset3DBGs : presetBGs)] as bg, i (bg)}
function create_each_block$5(key_1, ctx) {
	let div1;
	let div0;
	let t0;
	let t1;
	let div1_class_value;
	let div1_name_value;
	let div1_intro;
	let rect;
	let stop_animation = noop;

	function select_block_type_1(ctx, dirty) {
		if (/*bg*/ ctx[16].type === 'video') return create_if_block_2$5;
		if (/*bg*/ ctx[16].type === 'img') return create_if_block_3$4;
		if (/*bg*/ ctx[16].type === 'color') return create_if_block_4$3;
	}

	let current_block_type = select_block_type_1(ctx);
	let if_block0 = current_block_type && current_block_type(ctx);
	let if_block1 = /*bg*/ ctx[16].uploaded && create_if_block_1$8(ctx);

	return {
		key: key_1,
		first: null,
		c() {
			div1 = element("div");
			div0 = element("div");
			if (if_block0) if_block0.c();
			t0 = space();
			if (if_block1) if_block1.c();
			t1 = space();
			attr(div0, "class", "contentContainer svelte-zpac5a");

			attr(div1, "class", div1_class_value = "bg " + (/*$bgURL*/ ctx[0].url === /*bg*/ ctx[16].url
			? 'selected'
			: '') + " svelte-zpac5a");

			set_style(div1, "--bg-color", /*bg*/ ctx[16].type === 'color'
			? /*bg*/ ctx[16].url
			: '');

			attr(div1, "name", div1_name_value = /*bg*/ ctx[16].name);
			this.first = div1;
		},
		m(target, anchor) {
			insert(target, div1, anchor);
			append(div1, div0);
			if (if_block0) if_block0.m(div0, null);
			append(div1, t0);
			if (if_block1) if_block1.m(div1, null);
			append(div1, t1);
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;

			if (current_block_type === (current_block_type = select_block_type_1(ctx)) && if_block0) {
				if_block0.p(ctx, dirty);
			} else {
				if (if_block0) if_block0.d(1);
				if_block0 = current_block_type && current_block_type(ctx);

				if (if_block0) {
					if_block0.c();
					if_block0.m(div0, null);
				}
			}

			if (/*bg*/ ctx[16].uploaded) {
				if (if_block1) {
					if_block1.p(ctx, dirty);
				} else {
					if_block1 = create_if_block_1$8(ctx);
					if_block1.c();
					if_block1.m(div1, t1);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}

			if (dirty & /*$bgURL, $bgList, $BGState*/ 35 && div1_class_value !== (div1_class_value = "bg " + (/*$bgURL*/ ctx[0].url === /*bg*/ ctx[16].url
			? 'selected'
			: '') + " svelte-zpac5a")) {
				attr(div1, "class", div1_class_value);
			}

			if (dirty & /*$bgList, $BGState*/ 34) {
				set_style(div1, "--bg-color", /*bg*/ ctx[16].type === 'color'
				? /*bg*/ ctx[16].url
				: '');
			}

			if (dirty & /*$bgList, $BGState*/ 34 && div1_name_value !== (div1_name_value = /*bg*/ ctx[16].name)) {
				attr(div1, "name", div1_name_value);
			}
		},
		r() {
			rect = div1.getBoundingClientRect();
		},
		f() {
			fix_position(div1);
			stop_animation();
		},
		a() {
			stop_animation();
			stop_animation = create_animation(div1, rect, flip, { duration: 300 });
		},
		i(local) {
			if (local) {
				if (!div1_intro) {
					add_render_callback(() => {
						div1_intro = create_in_transition(div1, scale, { duration: 250 });
						div1_intro.start();
					});
				}
			}
		},
		o: noop,
		d(detaching) {
			if (detaching) detach(div1);

			if (if_block0) {
				if_block0.d();
			}

			if (if_block1) if_block1.d();
		}
	};
}

function create_fragment$k(ctx) {
	let container;
	let section;
	let div0;
	let div0_intro;
	let div0_outro;
	let t;
	let div1;
	let current_block_type_index;
	let if_block;
	let div1_intro;
	let div1_outro;
	let container_data_text_value;
	let current;
	let each_value_1 = ['2D', '3D', 'Color'];
	let each_blocks = [];

	for (let i = 0; i < 3; i += 1) {
		each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
	}

	const if_block_creators = [create_if_block$a, create_else_block$7];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*$BGState*/ ctx[5] === 'Color') return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	return {
		c() {
			container = element("container");
			section = element("section");
			div0 = element("div");

			for (let i = 0; i < 3; i += 1) {
				each_blocks[i].c();
			}

			t = space();
			div1 = element("div");
			if_block.c();
			attr(div0, "class", "tabs svelte-zpac5a");
			attr(div1, "class", "bg-list svelte-zpac5a");
			attr(section, "class", "svelte-zpac5a");
			attr(container, "data-text", container_data_text_value = subnav_bg_text.upload[/*$setLang*/ ctx[3]]);
			attr(container, "class", "svelte-zpac5a");
			toggle_class(container, "drop_zone", /*$dropzone*/ ctx[2]);
		},
		m(target, anchor) {
			insert(target, container, anchor);
			append(container, section);
			append(section, div0);

			for (let i = 0; i < 3; i += 1) {
				each_blocks[i].m(div0, null);
			}

			append(section, t);
			append(section, div1);
			if_blocks[current_block_type_index].m(div1, null);
			current = true;
		},
		p(new_ctx, [dirty]) {
			ctx = new_ctx;

			if (dirty & /*$BGState, BGState*/ 32) {
				each_value_1 = ['2D', '3D', 'Color'];
				let i;

				for (i = 0; i < 3; i += 1) {
					const child_ctx = get_each_context_1(ctx, each_value_1, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block_1(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(div0, null);
					}
				}

				for (; i < 3; i += 1) {
					each_blocks[i].d(1);
				}
			}

			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				} else {
					if_block.p(ctx, dirty);
				}

				transition_in(if_block, 1);
				if_block.m(div1, null);
			}

			if (!current || dirty & /*$setLang*/ 8 && container_data_text_value !== (container_data_text_value = subnav_bg_text.upload[/*$setLang*/ ctx[3]])) {
				attr(container, "data-text", container_data_text_value);
			}

			if (dirty & /*$dropzone*/ 4) {
				toggle_class(container, "drop_zone", /*$dropzone*/ ctx[2]);
			}
		},
		i(local) {
			if (current) return;

			add_render_callback(() => {
				if (div0_outro) div0_outro.end(1);

				div0_intro = create_in_transition(div0, fly, {
					x: /*$DIM*/ ctx[4].w > 600 ? 0 : 0,
					y: /*$DIM*/ ctx[4].w > 600 ? 20 : 0,
					easing: cubicInOut,
					duration: 400,
					delay: 400
				});

				div0_intro.start();
			});

			transition_in(if_block);

			add_render_callback(() => {
				if (div1_outro) div1_outro.end(1);

				div1_intro = create_in_transition(div1, fly, {
					x: /*$DIM*/ ctx[4].w > 600 ? 0 : 20,
					y: /*$DIM*/ ctx[4].w > 600 ? 20 : 0,
					easing: cubicInOut,
					duration: 400,
					delay: 200
				});

				div1_intro.start();
			});

			current = true;
		},
		o(local) {
			if (div0_intro) div0_intro.invalidate();

			div0_outro = create_out_transition(div0, fade, {
				duration: /*$DIM*/ ctx[4].w > 600 ? 200 : 0
			});

			transition_out(if_block);
			if (div1_intro) div1_intro.invalidate();

			div1_outro = create_out_transition(div1, fade, {
				duration: /*$DIM*/ ctx[4].w > 600 ? 200 : 0
			});

			current = false;
		},
		d(detaching) {
			if (detaching) detach(container);
			destroy_each(each_blocks, detaching);
			if (detaching && div0_outro) div0_outro.end();
			if_blocks[current_block_type_index].d();
			if (detaching && div1_outro) div1_outro.end();
		}
	};
}

const savedIro = writable('#ffffff');
getLocalStorage(savedIro, 'savedIro', '#ffffff');
subLocalStorage(savedIro, 'savedIro');
const BGState = writable('2D');

const handleBGImage = files => {
	for (var i = 0; i < files.length; i++) {
		let file = files[i];
		let type = isImageVideo(file);

		if (!type) {
			console.log('File format not supported.');

			notifText.set({
				type: 'error',
				'text': 'Backgrounds can only be .jpg, .png, or .mp4'
			});

			return;
		}

		const blob = URL.createObjectURL(file);
		var reader = new FileReader();

		reader.onload = function (e) {
			let objectURL = e.target.result;

			bgURL.set({
				type,
				data: objectURL,
				name: file.name,
				pano: get_store_value(BGState) === '3D',
				url: blob
			});

			bgList.set([
				{
					type,
					data: objectURL,
					name: file.name,
					pano: get_store_value(BGState) === '3D',
					url: blob,
					uploaded: true
				},
				...get_store_value(bgList)
			]);
		};

		reader.readAsDataURL(file);
	}
};

function instance$k($$self, $$props, $$invalidate) {
	let $bgURL;
	let $bgList;
	let $dropzone;
	let $setLang;
	let $DIM;

	let $BGState,
		$$unsubscribe_BGState = noop;

	component_subscribe($$self, bgURL, $$value => $$invalidate(0, $bgURL = $$value));
	component_subscribe($$self, bgList, $$value => $$invalidate(1, $bgList = $$value));
	component_subscribe($$self, dropzone, $$value => $$invalidate(2, $dropzone = $$value));
	component_subscribe($$self, setLang, $$value => $$invalidate(3, $setLang = $$value));
	component_subscribe($$self, DIM, $$value => $$invalidate(4, $DIM = $$value));
	component_subscribe($$self, BGState, $$value => $$invalidate(5, $BGState = $$value));
	$$self.$$.on_destroy.push(() => $$unsubscribe_BGState());

	const removeImage = i => {
		let newArray = $bgList;
		newArray.splice(i, 1);

		if (i > -1) {
			set_store_value(bgList, $bgList = newArray, $bgList);
		}
	};

	const handleSelect = content => {
		if ($bgURL.url === content.url) {
			return;
		}

		bgURL.set({
			type: content.type,
			data: content.data,
			url: content.url,
			sea: content.sea,
			pano: content.pano,
			light: content.light
		});
	};

	const handleClickUpload = e => {
		handleBGImage(e.target.files);
	};

	const filterArrByState = (list, state) => {
		let filteredList = [];

		list.forEach(e => {
			if (e.pano && state === '3D' || !e.pano && state === '2D') {
				filteredList.push(e);
			}
		});

		return filteredList;
	};

	const getBGFromPrompt = () => {
		let url = prompt('Enter the URL to a .jpg or .png background (ﾉ◕ヮ◕)');

		if (!url) {
			return;
		}

		let newBg = {
			type: 'img',
			pano: get_store_value(BGState) === '3D',
			url,
			uploaded: Date.now()
		};

		bgURL.set(newBg);
		bgList.set([newBg, ...get_store_value(bgList)]);
	};

	const click_handler = tab => {
		BGState.set(tab);
	};

	const click_handler_1 = (bg, e) => {
		e.preventDefault;
		handleSelect(bg);
	};

	const click_handler_2 = (bg, e) => {
		e.preventDefault;
		handleSelect(bg);
	};

	const click_handler_3 = (bg, e) => {
		e.preventDefault;
		handleSelect(bg);
	};

	const click_handler_4 = (i, e) => {
		e.preventDefault;
		removeImage(i);
	};

	return [
		$bgURL,
		$bgList,
		$dropzone,
		$setLang,
		$DIM,
		$BGState,
		removeImage,
		handleSelect,
		handleClickUpload,
		filterArrByState,
		getBGFromPrompt,
		click_handler,
		click_handler_1,
		click_handler_2,
		click_handler_3,
		click_handler_4
	];
}

class Sub_nav_bg extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$k, create_fragment$k, safe_not_equal, {});
	}
}

var sub_nav_sticker_svelte_svelte_type_style_lang = '';

/* src/ui/sub_nav.sticker.svelte generated by Svelte v3.46.4 */

function get_each_context$4(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[14] = list[i];
	child_ctx[16] = i;
	return child_ctx;
}

// (150:6) {:else}
function create_else_block$6(ctx) {
	let img;
	let img_src_value;
	let img_alt_value;
	let mounted;
	let dispose;

	function click_handler_1() {
		return /*click_handler_1*/ ctx[11](/*sticker*/ ctx[14]);
	}

	return {
		c() {
			img = element("img");
			attr(img, "class", "content svelte-se6fsr");
			if (!src_url_equal(img.src, img_src_value = /*sticker*/ ctx[14].url)) attr(img, "src", img_src_value);
			attr(img, "alt", img_alt_value = 'uploaded sticker' + /*i*/ ctx[16]);
		},
		m(target, anchor) {
			insert(target, img, anchor);

			if (!mounted) {
				dispose = listen(img, "click", click_handler_1);
				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;

			if (dirty & /*$stickerList*/ 1 && !src_url_equal(img.src, img_src_value = /*sticker*/ ctx[14].url)) {
				attr(img, "src", img_src_value);
			}

			if (dirty & /*$stickerList*/ 1 && img_alt_value !== (img_alt_value = 'uploaded sticker' + /*i*/ ctx[16])) {
				attr(img, "alt", img_alt_value);
			}
		},
		d(detaching) {
			if (detaching) detach(img);
			mounted = false;
			dispose();
		}
	};
}

// (148:6) {#if sticker.type==="video"}
function create_if_block_1$7(ctx) {
	let video;
	let video_src_value;
	let video_alt_value;
	let mounted;
	let dispose;

	function click_handler() {
		return /*click_handler*/ ctx[10](/*sticker*/ ctx[14]);
	}

	return {
		c() {
			video = element("video");
			attr(video, "class", "content svelte-se6fsr");
			if (!src_url_equal(video.src, video_src_value = /*sticker*/ ctx[14].url)) attr(video, "src", video_src_value);
			attr(video, "alt", video_alt_value = 'uploaded sticker' + /*i*/ ctx[16]);
			video.autoplay = true;
			video.muted = true;
			video.playsInline = true;
			video.loop = true;
		},
		m(target, anchor) {
			insert(target, video, anchor);

			if (!mounted) {
				dispose = listen(video, "click", click_handler);
				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;

			if (dirty & /*$stickerList*/ 1 && !src_url_equal(video.src, video_src_value = /*sticker*/ ctx[14].url)) {
				attr(video, "src", video_src_value);
			}

			if (dirty & /*$stickerList*/ 1 && video_alt_value !== (video_alt_value = 'uploaded sticker' + /*i*/ ctx[16])) {
				attr(video, "alt", video_alt_value);
			}
		},
		d(detaching) {
			if (detaching) detach(video);
			mounted = false;
			dispose();
		}
	};
}

// (155:6) {#if sticker.uploaded}
function create_if_block$9(ctx) {
	let button;
	let mounted;
	let dispose;

	function click_handler_2() {
		return /*click_handler_2*/ ctx[12](/*sticker*/ ctx[14]);
	}

	return {
		c() {
			button = element("button");

			button.innerHTML = `<i class="kalicon notranslate fill small svelte-se6fsr">jellyfill</i> 
          <i class="kalicon notranslate solid small svelte-se6fsr">minus</i>`;

			attr(button, "class", "remove svelte-se6fsr");
		},
		m(target, anchor) {
			insert(target, button, anchor);

			if (!mounted) {
				dispose = listen(button, "click", click_handler_2);
				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;
		},
		d(detaching) {
			if (detaching) detach(button);
			mounted = false;
			dispose();
		}
	};
}

// (141:4) {#each [...$stickerList,...presetStickers] as sticker,i (sticker)}
function create_each_block$4(key_1, ctx) {
	let div1;
	let div0;
	let t0;
	let t1;
	let div1_class_value;
	let div1_intro;
	let rect;
	let stop_animation = noop;

	function select_block_type(ctx, dirty) {
		if (/*sticker*/ ctx[14].type === "video") return create_if_block_1$7;
		return create_else_block$6;
	}

	let current_block_type = select_block_type(ctx);
	let if_block0 = current_block_type(ctx);
	let if_block1 = /*sticker*/ ctx[14].uploaded && create_if_block$9(ctx);

	return {
		key: key_1,
		first: null,
		c() {
			div1 = element("div");
			div0 = element("div");
			if_block0.c();
			t0 = space();
			if (if_block1) if_block1.c();
			t1 = space();
			attr(div0, "class", "contentContainer svelte-se6fsr");

			attr(div1, "class", div1_class_value = "sticker " + (/*$stickerLayers*/ ctx[1].length > 0 && /*checkIndex*/ ctx[7](/*sticker*/ ctx[14].url, /*$stickerLayers*/ ctx[1], 'url') !== null
			? 'selected'
			: '') + " svelte-se6fsr");

			this.first = div1;
		},
		m(target, anchor) {
			insert(target, div1, anchor);
			append(div1, div0);
			if_block0.m(div0, null);
			append(div1, t0);
			if (if_block1) if_block1.m(div1, null);
			append(div1, t1);
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;

			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block0) {
				if_block0.p(ctx, dirty);
			} else {
				if_block0.d(1);
				if_block0 = current_block_type(ctx);

				if (if_block0) {
					if_block0.c();
					if_block0.m(div0, null);
				}
			}

			if (/*sticker*/ ctx[14].uploaded) {
				if (if_block1) {
					if_block1.p(ctx, dirty);
				} else {
					if_block1 = create_if_block$9(ctx);
					if_block1.c();
					if_block1.m(div1, t1);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}

			if (dirty & /*$stickerLayers, $stickerList*/ 3 && div1_class_value !== (div1_class_value = "sticker " + (/*$stickerLayers*/ ctx[1].length > 0 && /*checkIndex*/ ctx[7](/*sticker*/ ctx[14].url, /*$stickerLayers*/ ctx[1], 'url') !== null
			? 'selected'
			: '') + " svelte-se6fsr")) {
				attr(div1, "class", div1_class_value);
			}
		},
		r() {
			rect = div1.getBoundingClientRect();
		},
		f() {
			fix_position(div1);
			stop_animation();
		},
		a() {
			stop_animation();
			stop_animation = create_animation(div1, rect, flip, { duration: 300 });
		},
		i(local) {
			if (local) {
				if (!div1_intro) {
					add_render_callback(() => {
						div1_intro = create_in_transition(div1, scale, { duration: 250 });
						div1_intro.start();
					});
				}
			}
		},
		o: noop,
		d(detaching) {
			if (detaching) detach(div1);
			if_block0.d();
			if (if_block1) if_block1.d();
		}
	};
}

function create_fragment$j(ctx) {
	let container;
	let div1;
	let div0;
	let label0;
	let i0;
	let t1;
	let input;
	let label0_data_text_value;
	let t2;
	let label1;
	let i1;
	let svglink;
	let t3;
	let each_blocks = [];
	let each_1_lookup = new Map();
	let div1_intro;
	let div1_outro;
	let container_data_text_value;
	let current;
	let mounted;
	let dispose;
	svglink = new SvgLink({});
	let each_value = [.../*$stickerList*/ ctx[0], ...presetStickers];
	const get_key = ctx => /*sticker*/ ctx[14];

	for (let i = 0; i < each_value.length; i += 1) {
		let child_ctx = get_each_context$4(ctx, each_value, i);
		let key = get_key(child_ctx);
		each_1_lookup.set(key, each_blocks[i] = create_each_block$4(key, child_ctx));
	}

	return {
		c() {
			container = element("container");
			div1 = element("div");
			div0 = element("div");
			label0 = element("label");
			i0 = element("i");
			i0.textContent = "file";
			t1 = space();
			input = element("input");
			t2 = space();
			label1 = element("label");
			i1 = element("i");
			create_component(svglink.$$.fragment);
			t3 = space();

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			attr(i0, "class", "kalicon notranslate solid variable svelte-se6fsr");
			attr(input, "type", "file");
			attr(input, "id", "uploadImage");
			attr(input, "name", "fileList");
			attr(input, "accept", ".jpg,.png,.gif,.mp4");
			attr(input, "class", "svelte-se6fsr");
			attr(label0, "data-text", label0_data_text_value = subnav_sticker_text.upload[/*$setLang*/ ctx[3]]);
			attr(label0, "for", "uploadImage");
			attr(label0, "class", "svelte-se6fsr");
			attr(i1, "class", "svgIcon svelte-se6fsr");
			attr(label1, "data-text", "Load from URL");
			attr(label1, "class", "svelte-se6fsr");
			attr(div0, "class", "upload svelte-se6fsr");
			attr(div1, "class", "sticker-list svelte-se6fsr");
			attr(container, "data-text", container_data_text_value = subnav_sticker_text.upload[/*$setLang*/ ctx[3]]);
			attr(container, "class", "svelte-se6fsr");
			toggle_class(container, "drop_zone", /*$dropzone*/ ctx[2]);
		},
		m(target, anchor) {
			insert(target, container, anchor);
			append(container, div1);
			append(div1, div0);
			append(div0, label0);
			append(label0, i0);
			append(label0, t1);
			append(label0, input);
			append(div0, t2);
			append(div0, label1);
			append(label1, i1);
			mount_component(svglink, i1, null);
			append(div1, t3);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div1, null);
			}

			current = true;

			if (!mounted) {
				dispose = [
					listen(input, "change", /*handleClickUpload*/ ctx[5]),
					listen(label1, "click", /*getStickerFromPrompt*/ ctx[9])
				];

				mounted = true;
			}
		},
		p(new_ctx, [dirty]) {
			ctx = new_ctx;

			if (!current || dirty & /*$setLang*/ 8 && label0_data_text_value !== (label0_data_text_value = subnav_sticker_text.upload[/*$setLang*/ ctx[3]])) {
				attr(label0, "data-text", label0_data_text_value);
			}

			if (dirty & /*$stickerLayers, checkIndex, $stickerList, presetStickers, removeImage, handleClick*/ 451) {
				each_value = [.../*$stickerList*/ ctx[0], ...presetStickers];
				for (let i = 0; i < each_blocks.length; i += 1) each_blocks[i].r();
				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, div1, fix_and_destroy_block, create_each_block$4, null, get_each_context$4);
				for (let i = 0; i < each_blocks.length; i += 1) each_blocks[i].a();
			}

			if (!current || dirty & /*$setLang*/ 8 && container_data_text_value !== (container_data_text_value = subnav_sticker_text.upload[/*$setLang*/ ctx[3]])) {
				attr(container, "data-text", container_data_text_value);
			}

			if (dirty & /*$dropzone*/ 4) {
				toggle_class(container, "drop_zone", /*$dropzone*/ ctx[2]);
			}
		},
		i(local) {
			if (current) return;
			transition_in(svglink.$$.fragment, local);

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			add_render_callback(() => {
				if (div1_outro) div1_outro.end(1);

				div1_intro = create_in_transition(div1, fly, {
					x: /*$DIM*/ ctx[4].w > 600 ? 0 : 20,
					y: /*$DIM*/ ctx[4].w > 600 ? 20 : 0,
					easing: cubicInOut,
					duration: 400,
					delay: 200
				});

				div1_intro.start();
			});

			current = true;
		},
		o(local) {
			transition_out(svglink.$$.fragment, local);
			if (div1_intro) div1_intro.invalidate();

			div1_outro = create_out_transition(div1, fade, {
				duration: /*$DIM*/ ctx[4].w > 600 ? 200 : 0
			});

			current = false;
		},
		d(detaching) {
			if (detaching) detach(container);
			destroy_component(svglink);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].d();
			}

			if (detaching && div1_outro) div1_outro.end();
			mounted = false;
			run_all(dispose);
		}
	};
}

const handleStickerImage = files => {
	for (var i = 0; i < files.length; i++) {
		let type = isImageVideo(files[i]);

		if (!type) {
			notifText.set({
				type: 'error',
				'text': 'Stickers can only be .jpg, .png, .gif or .mp4'
			});

			return;
		}

		const objectURL = URL.createObjectURL(files[i]);
		let reader = new FileReader();

		reader.onload = function (e) {
			let data = e.target.result;

			let newSticker = {
				url: objectURL,
				data,
				default: .5,
				type,
				uploaded: true,
				zIndex: get_store_value(stickerLayers).length + 1
			};

			stickerList.set([newSticker, ...get_store_value(stickerList)]);
			addSticker(newSticker);
		};

		reader.readAsDataURL(files[i]);
	}
};

const addSticker = sticker => {
	stickerLayers.set([
		...get_store_value(stickerLayers),
		{
			id: randomString(6, '0123456789'),
			url: sticker.url,
			type: sticker.type
			? sticker.type
			: sticker.url.includes('.mp4') ? 'video' : 'img',
			default: sticker.default,
			zIndex: get_store_value(stickerLayers).length + 1
		}
	]);
};

function instance$j($$self, $$props, $$invalidate) {
	let $stickerList;
	let $stickerLayers;
	let $dropzone;
	let $setLang;
	let $DIM;
	component_subscribe($$self, stickerList, $$value => $$invalidate(0, $stickerList = $$value));
	component_subscribe($$self, stickerLayers, $$value => $$invalidate(1, $stickerLayers = $$value));
	component_subscribe($$self, dropzone, $$value => $$invalidate(2, $dropzone = $$value));
	component_subscribe($$self, setLang, $$value => $$invalidate(3, $setLang = $$value));
	component_subscribe($$self, DIM, $$value => $$invalidate(4, $DIM = $$value));

	const handleClickUpload = e => {
		handleStickerImage(e.target.files);
	};

	//remove from sticker list
	const removeImage = url => {
		let layerIndex = checkIndex(url, $stickerList, 'url');

		if (layerIndex !== null) {
			let newArray = $stickerList;
			newArray.splice(layerIndex, 1);

			if (layerIndex > -1) {
				set_store_value(stickerList, $stickerList = newArray, $stickerList);
			}
		}

		removeSticker(url);
		return layerIndex;
	};

	const checkIndex = (url, array, key) => {
		let index = null;

		array.forEach((e, i) => {
			if (e[key].includes(url)) {
				index = i;
				return;
			}
		});

		return index;
	};

	const removeSticker = url => {
		let layerIndex = checkIndex(url, $stickerLayers, 'url');

		if (layerIndex !== null) {
			let newArray = $stickerLayers;
			newArray.splice(layerIndex, 1);

			if (layerIndex > -1) {
				stickerLayers.set(newArray);
			}
		}

		return layerIndex;
	};

	const handleClick = sticker => {
		let layerIndex = removeSticker(sticker.url);
		if (layerIndex !== null) return;
		addSticker(sticker);
	};

	const getStickerFromPrompt = () => {
		let url = prompt('Enter the URL to a .jpg, .png, .gif or .mp4 sticker (ﾉ◕ヮ◕)');

		if (!url) {
			return;
		}

		let newSticker = {
			url,
			default: .5,
			type: url.includes('.mp4') ? 'video' : 'img',
			uploaded: Date.now(),
			zIndex: $stickerLayers.length + 1
		};

		stickerList.set([newSticker, ...$stickerList]);
		addSticker(newSticker);
	};

	const click_handler = sticker => {
		handleClick(sticker);
	};

	const click_handler_1 = sticker => {
		handleClick(sticker);
	};

	const click_handler_2 = sticker => {
		removeImage(sticker.url);
	};

	return [
		$stickerList,
		$stickerLayers,
		$dropzone,
		$setLang,
		$DIM,
		handleClickUpload,
		removeImage,
		checkIndex,
		handleClick,
		getStickerFromPrompt,
		click_handler,
		click_handler_1,
		click_handler_2
	];
}

class Sub_nav_sticker extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$j, create_fragment$j, safe_not_equal, {});
	}
}

/* src/ui/filedrop.svelte generated by Svelte v3.46.4 */

function create_fragment$i(ctx) {
	let mounted;
	let dispose;

	return {
		c: noop,
		m(target, anchor) {
			if (!mounted) {
				dispose = [
					listen(window, "dragenter", /*handleDragEnter*/ ctx[0]),
					listen(window, "dragleave", /*handleDragLeave*/ ctx[1]),
					listen(window, "drop", /*handleDragDrop*/ ctx[2]),
					listen(window, "dragover", /*handleDragEnter*/ ctx[0])
				];

				mounted = true;
			}
		},
		p: noop,
		i: noop,
		o: noop,
		d(detaching) {
			mounted = false;
			run_all(dispose);
		}
	};
}

let dropzone = writable(false);

function instance$i($$self, $$props, $$invalidate) {
	let $profiles;
	component_subscribe($$self, profiles, $$value => $$invalidate(4, $profiles = $$value));
	let { selected } = $$props;

	const preventDefaults = e => {
		e.preventDefault();
		e.stopPropagation();
	};

	const handleDragEnter = e => {
		preventDefaults(e);
		e.dataTransfer.dropEffect = "copy";
		dropzone.set(true);
	};

	const handleDragLeave = e => {
		preventDefaults(e);
		dropzone.set(false);
	};

	const handleDragDrop = e => {
		preventDefaults(e);
		dropzone.set(false);
		let files = e.dataTransfer.files;

		if (!files[0]) {
			return;
		}

		if (files[0].name.includes('.vrm') && !$profiles.user.destroying) {
			handleVrmFile(files);
			return;
		}

		if (selected === 'bg') {
			handleBGImage(files);
			return;
		}

		if (selected !== 'bg') {
			handleStickerImage(files);
			return;
		}
	};

	$$self.$$set = $$props => {
		if ('selected' in $$props) $$invalidate(3, selected = $$props.selected);
	};

	return [handleDragEnter, handleDragLeave, handleDragDrop, selected];
}

class Filedrop extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$i, create_fragment$i, safe_not_equal, { selected: 3 });
	}
}

var sub_nav_char_svelte_svelte_type_style_lang = '';

/* src/ui/sub_nav.char.svelte generated by Svelte v3.46.4 */

function get_each_context$3(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[16] = list[i];
	child_ctx[18] = i;
	return child_ctx;
}

// (164:8) {:else}
function create_else_block$5(ctx) {
	let div;
	let t_value = /*model*/ ctx[16].name.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "").charAt(0) + "";
	let t;
	let mounted;
	let dispose;

	function click_handler_2() {
		return /*click_handler_2*/ ctx[13](/*model*/ ctx[16]);
	}

	return {
		c() {
			div = element("div");
			t = text(t_value);
			attr(div, "class", "noicon svelte-hpprhw");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, t);

			if (!mounted) {
				dispose = listen(div, "click", click_handler_2);
				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;
			if (dirty & /*$modelList*/ 2 && t_value !== (t_value = /*model*/ ctx[16].name.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "").charAt(0) + "")) set_data(t, t_value);
		},
		d(detaching) {
			if (detaching) detach(div);
			mounted = false;
			dispose();
		}
	};
}

// (162:33) 
function create_if_block_2$4(ctx) {
	let img;
	let img_src_value;
	let img_alt_value;
	let mounted;
	let dispose;

	function click_handler_1() {
		return /*click_handler_1*/ ctx[12](/*model*/ ctx[16]);
	}

	return {
		c() {
			img = element("img");
			if (!src_url_equal(img.src, img_src_value = /*model*/ ctx[16].url.icon)) attr(img, "src", img_src_value);
			attr(img, "class", "noBorder svelte-hpprhw");
			attr(img, "alt", img_alt_value = /*model*/ ctx[16].name);
		},
		m(target, anchor) {
			insert(target, img, anchor);

			if (!mounted) {
				dispose = listen(img, "click", click_handler_1);
				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;

			if (dirty & /*$modelList*/ 2 && !src_url_equal(img.src, img_src_value = /*model*/ ctx[16].url.icon)) {
				attr(img, "src", img_src_value);
			}

			if (dirty & /*$modelList*/ 2 && img_alt_value !== (img_alt_value = /*model*/ ctx[16].name)) {
				attr(img, "alt", img_alt_value);
			}
		},
		d(detaching) {
			if (detaching) detach(img);
			mounted = false;
			dispose();
		}
	};
}

// (160:8) {#if model.icon}
function create_if_block_1$6(ctx) {
	let img;
	let img_src_value;
	let img_alt_value;
	let mounted;
	let dispose;

	function click_handler() {
		return /*click_handler*/ ctx[11](/*model*/ ctx[16]);
	}

	return {
		c() {
			img = element("img");
			if (!src_url_equal(img.src, img_src_value = /*model*/ ctx[16].icon)) attr(img, "src", img_src_value);
			attr(img, "alt", img_alt_value = /*model*/ ctx[16].name);
			attr(img, "class", "svelte-hpprhw");
		},
		m(target, anchor) {
			insert(target, img, anchor);

			if (!mounted) {
				dispose = listen(img, "click", click_handler);
				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;

			if (dirty & /*$modelList*/ 2 && !src_url_equal(img.src, img_src_value = /*model*/ ctx[16].icon)) {
				attr(img, "src", img_src_value);
			}

			if (dirty & /*$modelList*/ 2 && img_alt_value !== (img_alt_value = /*model*/ ctx[16].name)) {
				attr(img, "alt", img_alt_value);
			}
		},
		d(detaching) {
			if (detaching) detach(img);
			mounted = false;
			dispose();
		}
	};
}

// (167:7) {#if model.uploaded}
function create_if_block$8(ctx) {
	let button;
	let mounted;
	let dispose;

	function click_handler_3(...args) {
		return /*click_handler_3*/ ctx[14](/*i*/ ctx[18], ...args);
	}

	return {
		c() {
			button = element("button");

			button.innerHTML = `<i class="kalicon notranslate fill small svelte-hpprhw">jellyfill</i> 
              <i class="kalicon notranslate solid small svelte-hpprhw">minus</i>`;

			attr(button, "class", "remove svelte-hpprhw");
		},
		m(target, anchor) {
			insert(target, button, anchor);

			if (!mounted) {
				dispose = listen(button, "click", click_handler_3);
				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;
		},
		d(detaching) {
			if (detaching) detach(button);
			mounted = false;
			dispose();
		}
	};
}

// (149:2) {#each [...$modelList,...presetModels] as model, i (model)}
function create_each_block$3(key_1, ctx) {
	let div;
	let t0;
	let t1;
	let div_class_value;
	let div_name_value;
	let div_intro;
	let rect;
	let stop_animation = noop;

	function select_block_type(ctx, dirty) {
		if (/*model*/ ctx[16].icon) return create_if_block_1$6;
		if (/*model*/ ctx[16].url.icon) return create_if_block_2$4;
		return create_else_block$5;
	}

	let current_block_type = select_block_type(ctx);
	let if_block0 = current_block_type(ctx);
	let if_block1 = /*model*/ ctx[16].uploaded && create_if_block$8(ctx);

	return {
		key: key_1,
		first: null,
		c() {
			div = element("div");
			if_block0.c();
			t0 = space();
			if (if_block1) if_block1.c();
			t1 = space();

			attr(div, "class", div_class_value = "model " + (typeof /*$userModel*/ ctx[0] === 'string' && /*$userModel*/ ctx[0] === /*model*/ ctx[16].url
			? 'selected'
			: typeof /*$userModel*/ ctx[0] === 'object' && /*checkModel*/ ctx[8](/*model*/ ctx[16])
				? 'selected'
				: '') + " svelte-hpprhw");

			attr(div, "name", div_name_value = /*model*/ ctx[16].name);
			set_style(div, "--color", /*model*/ ctx[16].color ? /*model*/ ctx[16].color : '');
			this.first = div;
		},
		m(target, anchor) {
			insert(target, div, anchor);
			if_block0.m(div, null);
			append(div, t0);
			if (if_block1) if_block1.m(div, null);
			append(div, t1);
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;

			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block0) {
				if_block0.p(ctx, dirty);
			} else {
				if_block0.d(1);
				if_block0 = current_block_type(ctx);

				if (if_block0) {
					if_block0.c();
					if_block0.m(div, t0);
				}
			}

			if (/*model*/ ctx[16].uploaded) {
				if (if_block1) {
					if_block1.p(ctx, dirty);
				} else {
					if_block1 = create_if_block$8(ctx);
					if_block1.c();
					if_block1.m(div, t1);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}

			if (dirty & /*$userModel, $modelList*/ 3 && div_class_value !== (div_class_value = "model " + (typeof /*$userModel*/ ctx[0] === 'string' && /*$userModel*/ ctx[0] === /*model*/ ctx[16].url
			? 'selected'
			: typeof /*$userModel*/ ctx[0] === 'object' && /*checkModel*/ ctx[8](/*model*/ ctx[16])
				? 'selected'
				: '') + " svelte-hpprhw")) {
				attr(div, "class", div_class_value);
			}

			if (dirty & /*$modelList*/ 2 && div_name_value !== (div_name_value = /*model*/ ctx[16].name)) {
				attr(div, "name", div_name_value);
			}

			if (dirty & /*$modelList*/ 2) {
				set_style(div, "--color", /*model*/ ctx[16].color ? /*model*/ ctx[16].color : '');
			}
		},
		r() {
			rect = div.getBoundingClientRect();
		},
		f() {
			fix_position(div);
			stop_animation();
		},
		a() {
			stop_animation();
			stop_animation = create_animation(div, rect, flip, { duration: 300 });
		},
		i(local) {
			if (local) {
				if (!div_intro) {
					add_render_callback(() => {
						div_intro = create_in_transition(div, scale, { duration: 250 });
						div_intro.start();
					});
				}
			}
		},
		o: noop,
		d(detaching) {
			if (detaching) detach(div);
			if_block0.d();
			if (if_block1) if_block1.d();
		}
	};
}

function create_fragment$h(ctx) {
	let container;
	let div0;
	let div0_intro;
	let div0_outro;
	let t3;
	let section;
	let div2;
	let div1;
	let label0;
	let i0;
	let t5;
	let input_1;
	let label0_data_text_value;
	let t6;
	let label1;
	let i1;
	let svglink;
	let t7;
	let each_blocks = [];
	let each_1_lookup = new Map();
	let div2_intro;
	let div2_outro;
	let container_data_text_value;
	let current;
	let mounted;
	let dispose;
	svglink = new SvgLink({});
	let each_value = [.../*$modelList*/ ctx[1], ...presetModels];
	const get_key = ctx => /*model*/ ctx[16];

	for (let i = 0; i < each_value.length; i += 1) {
		let child_ctx = get_each_context$3(ctx, each_value, i);
		let key = get_key(child_ctx);
		each_1_lookup.set(key, each_blocks[i] = create_each_block$3(key, child_ctx));
	}

	return {
		c() {
			container = element("container");
			div0 = element("div");

			div0.innerHTML = `<p class="svelte-hpprhw"><a href="https://kalidoface.com" class="svelte-hpprhw">Live2D</a></p> 
      <p class="selected svelte-hpprhw"><a href="https://3d.kalidoface.com" class="svelte-hpprhw">3D VRM</a></p>`;

			t3 = space();
			section = element("section");
			div2 = element("div");
			div1 = element("div");
			label0 = element("label");
			i0 = element("i");
			i0.textContent = "file";
			t5 = space();
			input_1 = element("input");
			t6 = space();
			label1 = element("label");
			i1 = element("i");
			create_component(svglink.$$.fragment);
			t7 = space();

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			attr(div0, "class", "tabs svelte-hpprhw");
			attr(i0, "class", "kalicon notranslate solid variable svelte-hpprhw");
			attr(input_1, "type", "file");
			attr(input_1, "id", "uploadLive2D");
			attr(input_1, "name", "fileList");
			attr(input_1, "accept", ".vrm");
			attr(input_1, "class", "svelte-hpprhw");
			attr(label0, "data-text", label0_data_text_value = subnav_live2d_text.upload[/*$setLang*/ ctx[3]]);
			attr(label0, "for", "uploadLive2D");
			attr(label0, "class", "svelte-hpprhw");
			attr(i1, "class", "svgIcon svelte-hpprhw");
			attr(label1, "data-text", "Load from URL");
			attr(label1, "class", "svelte-hpprhw");
			attr(div1, "class", "upload svelte-hpprhw");
			attr(div2, "class", "model-list svelte-hpprhw");
			attr(section, "class", "svelte-hpprhw");
			attr(container, "data-text", container_data_text_value = subnav_live2d_text.upload[/*$setLang*/ ctx[3]]);
			attr(container, "class", "svelte-hpprhw");
			toggle_class(container, "drop_zone", /*$dropzone*/ ctx[2]);
		},
		m(target, anchor) {
			insert(target, container, anchor);
			append(container, div0);
			append(container, t3);
			append(container, section);
			append(section, div2);
			append(div2, div1);
			append(div1, label0);
			append(label0, i0);
			append(label0, t5);
			append(label0, input_1);
			/*input_1_binding*/ ctx[10](input_1);
			append(div1, t6);
			append(div1, label1);
			append(label1, i1);
			mount_component(svglink, i1, null);
			append(div2, t7);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div2, null);
			}

			current = true;

			if (!mounted) {
				dispose = [
					listen(input_1, "change", /*handleClickUpload*/ ctx[7]),
					listen(label1, "click", /*getVRMFromPrompt*/ ctx[9])
				];

				mounted = true;
			}
		},
		p(new_ctx, [dirty]) {
			ctx = new_ctx;

			if (!current || dirty & /*$setLang*/ 8 && label0_data_text_value !== (label0_data_text_value = subnav_live2d_text.upload[/*$setLang*/ ctx[3]])) {
				attr(label0, "data-text", label0_data_text_value);
			}

			if (dirty & /*$userModel, $modelList, presetModels, checkModel, removeModel, updateModel*/ 355) {
				each_value = [.../*$modelList*/ ctx[1], ...presetModels];
				for (let i = 0; i < each_blocks.length; i += 1) each_blocks[i].r();
				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, div2, fix_and_destroy_block, create_each_block$3, null, get_each_context$3);
				for (let i = 0; i < each_blocks.length; i += 1) each_blocks[i].a();
			}

			if (!current || dirty & /*$setLang*/ 8 && container_data_text_value !== (container_data_text_value = subnav_live2d_text.upload[/*$setLang*/ ctx[3]])) {
				attr(container, "data-text", container_data_text_value);
			}

			if (dirty & /*$dropzone*/ 4) {
				toggle_class(container, "drop_zone", /*$dropzone*/ ctx[2]);
			}
		},
		i(local) {
			if (current) return;

			add_render_callback(() => {
				if (div0_outro) div0_outro.end(1);

				div0_intro = create_in_transition(div0, fly, {
					x: /*$DIM*/ ctx[4].w > 600 ? 0 : 0,
					y: /*$DIM*/ ctx[4].w > 600 ? 20 : 0,
					easing: cubicInOut,
					duration: 400,
					delay: 400
				});

				div0_intro.start();
			});

			transition_in(svglink.$$.fragment, local);

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			add_render_callback(() => {
				if (div2_outro) div2_outro.end(1);

				div2_intro = create_in_transition(div2, fly, {
					x: /*$DIM*/ ctx[4].w > 600 ? 0 : 20,
					y: /*$DIM*/ ctx[4].w > 600 ? 20 : 0,
					easing: cubicInOut,
					duration: 400,
					delay: 200
				});

				div2_intro.start();
			});

			current = true;
		},
		o(local) {
			if (div0_intro) div0_intro.invalidate();

			div0_outro = create_out_transition(div0, fade, {
				duration: /*$DIM*/ ctx[4].w > 600 ? 200 : 0
			});

			transition_out(svglink.$$.fragment, local);
			if (div2_intro) div2_intro.invalidate();

			div2_outro = create_out_transition(div2, fade, {
				duration: /*$DIM*/ ctx[4].w > 600 ? 200 : 0
			});

			current = false;
		},
		d(detaching) {
			if (detaching) detach(container);
			if (detaching && div0_outro) div0_outro.end();
			/*input_1_binding*/ ctx[10](null);
			destroy_component(svglink);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].d();
			}

			if (detaching && div2_outro) div2_outro.end();
			mounted = false;
			run_all(dispose);
		}
	};
}

const handleVrmFile = async files => {
	if (!files) {
		return;
	}

	const file = files[0];

	if (!file) {
		return;
	}

	const blob = new Blob([file], { type: "application/octet-stream" });
	const url = URL.createObjectURL(blob);
	var reader = new FileReader();

	reader.onload = function (e) {
		let newDate = Date.now();
		let objectURL = e.target.result;

		modelList.set([
			{
				name: file.name,
				data: objectURL,
				type: 'blob',
				url,
				uploaded: newDate,
				icon: null,
				color: newRandomColor()
			},
			...get_store_value(modelList)
		]);

		userModel.set({
			type: 'blob',
			name: file.name,
			uploaded: newDate,
			url
		});
	};

	reader.readAsDataURL(file);
};

function instance$h($$self, $$props, $$invalidate) {
	let $userModel;
	let $modelList;
	let $profiles;
	let $dropzone;
	let $setLang;
	let $DIM;
	component_subscribe($$self, userModel, $$value => $$invalidate(0, $userModel = $$value));
	component_subscribe($$self, modelList, $$value => $$invalidate(1, $modelList = $$value));
	component_subscribe($$self, profiles, $$value => $$invalidate(15, $profiles = $$value));
	component_subscribe($$self, dropzone, $$value => $$invalidate(2, $dropzone = $$value));
	component_subscribe($$self, setLang, $$value => $$invalidate(3, $setLang = $$value));
	component_subscribe($$self, DIM, $$value => $$invalidate(4, $DIM = $$value));

	const updateModel = model => {
		// if (typeof $userModel==='string' && $userModel === file){return}
		if (checkModel(model)) {
			return;
		}

		if (!$profiles.user.destroying) {
			userModel.set({
				type: model.type,
				name: model.name,
				uploaded: model.uploaded,
				url: model.url
			});
		}
	};

	const removeModel = i => {
		let newArray = $modelList;
		newArray.splice(i, 1);

		if (i > -1) {
			set_store_value(modelList, $modelList = newArray, $modelList);
		}
	};

	const handleClickUpload = e => {
		handleVrmFile(e.target.files);
	};

	const checkModel = model => {
		if ($userModel.uploaded && model.uploaded) {
			return $userModel.uploaded === model.uploaded;
		} else if ($userModel.url && model.url) {
			return $userModel.url === model.url;
		}

		return false;
	};

	const getVRMFromPrompt = () => {
		let url = prompt('Enter the URL to your .vrm model ヾ(･ω･*)ﾉ');

		if (!url) {
			return;
		}

		userModel.set({
			type: 'url',
			uploaded: Date.now(),
			name: null,
			url
		});
	};

	function input_1_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
		});
	}

	const click_handler = model => {
		updateModel(model);
	};

	const click_handler_1 = model => {
		updateModel(model);
	};

	const click_handler_2 = model => {
		updateModel(model);
	};

	const click_handler_3 = (i, e) => {
		e.preventDefault;
		removeModel(i);
	};

	return [
		$userModel,
		$modelList,
		$dropzone,
		$setLang,
		$DIM,
		updateModel,
		removeModel,
		handleClickUpload,
		checkModel,
		getVRMFromPrompt,
		input_1_binding,
		click_handler,
		click_handler_1,
		click_handler_2,
		click_handler_3
	];
}

class Sub_nav_char extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$h, create_fragment$h, safe_not_equal, {});
	}
}

var sub_nav_call_svelte_svelte_type_style_lang = '';

/* src/ui/sub_nav.call.svelte generated by Svelte v3.46.4 */

function create_else_block_1$1(ctx) {
	let label;
	let t0_value = subnav_call_text.label.disconnected[/*$setLang*/ ctx[6]] + "";
	let t0;
	let t1;
	let button;
	let t2_value = subnav_call_text.disconnected[/*$setLang*/ ctx[6]] + "";
	let t2;
	let mounted;
	let dispose;

	return {
		c() {
			label = element("label");
			t0 = text(t0_value);
			t1 = space();
			button = element("button");
			t2 = text(t2_value);
			attr(label, "class", "svelte-1ax078w");
			attr(button, "class", "reconnect svelte-1ax078w");
		},
		m(target, anchor) {
			insert(target, label, anchor);
			append(label, t0);
			insert(target, t1, anchor);
			insert(target, button, anchor);
			append(button, t2);

			if (!mounted) {
				dispose = listen(button, "click", /*click_handler*/ ctx[13]);
				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty & /*$setLang*/ 64 && t0_value !== (t0_value = subnav_call_text.label.disconnected[/*$setLang*/ ctx[6]] + "")) set_data(t0, t0_value);
			if (dirty & /*$setLang*/ 64 && t2_value !== (t2_value = subnav_call_text.disconnected[/*$setLang*/ ctx[6]] + "")) set_data(t2, t2_value);
		},
		d(detaching) {
			if (detaching) detach(label);
			if (detaching) detach(t1);
			if (detaching) detach(button);
			mounted = false;
			dispose();
		}
	};
}

// (53:4) {#if $peerState !== 'server-disconnect'}
function create_if_block_1$5(ctx) {
	let t0;
	let div;
	let t1;
	let t2;
	let button;
	let i0;
	let t4;
	let i1;
	let t5;
	let i1_class_value;
	let t6;
	let button_class_value;
	let mounted;
	let dispose;
	let if_block0 = !/*$p2pConnection*/ ctx[3] && create_if_block_5$1(ctx);

	function select_block_type_1(ctx, dirty) {
		if (/*$peerState*/ ctx[4] === 'connecting') return create_if_block_3$3;
		if (/*$peerState*/ ctx[4] === 'connected') return create_if_block_4$2;
	}

	let current_block_type = select_block_type_1(ctx);
	let if_block1 = current_block_type && current_block_type(ctx);
	let if_block2 = /*$peerState*/ ctx[4] === 'connected' && create_if_block_2$3();

	return {
		c() {
			if (if_block0) if_block0.c();
			t0 = space();
			div = element("div");
			t1 = space();
			if (if_block1) if_block1.c();
			t2 = space();
			button = element("button");
			i0 = element("i");
			i0.textContent = "jellyfill";
			t4 = space();
			i1 = element("i");
			t5 = text("phone");
			t6 = space();
			if (if_block2) if_block2.c();
			attr(div, "class", "cover svelte-1ax078w");
			attr(i0, "class", "kalicon notranslate fill svelte-1ax078w");
			attr(i1, "class", i1_class_value = "kalicon notranslate solid variable " + (/*$p2pConnection*/ ctx[3] ? 'end' : '') + " svelte-1ax078w");

			attr(button, "class", button_class_value = "call-button no_highlights " + (/*$inputID*/ ctx[2].length === 6 && /*$inputID*/ ctx[2].match(/^[0-9]+$/)
			? ''
			: /*$p2pConnection*/ ctx[3] ? '' : 'disabled') + " svelte-1ax078w");
		},
		m(target, anchor) {
			if (if_block0) if_block0.m(target, anchor);
			insert(target, t0, anchor);
			insert(target, div, anchor);
			insert(target, t1, anchor);
			if (if_block1) if_block1.m(target, anchor);
			insert(target, t2, anchor);
			insert(target, button, anchor);
			append(button, i0);
			append(button, t4);
			append(button, i1);
			append(i1, t5);
			append(button, t6);
			if (if_block2) if_block2.m(button, null);

			if (!mounted) {
				dispose = listen(button, "click", /*handleCall*/ ctx[9]);
				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (!/*$p2pConnection*/ ctx[3]) {
				if (if_block0) {
					if_block0.p(ctx, dirty);
				} else {
					if_block0 = create_if_block_5$1(ctx);
					if_block0.c();
					if_block0.m(t0.parentNode, t0);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

			if (current_block_type === (current_block_type = select_block_type_1(ctx)) && if_block1) {
				if_block1.p(ctx, dirty);
			} else {
				if (if_block1) if_block1.d(1);
				if_block1 = current_block_type && current_block_type(ctx);

				if (if_block1) {
					if_block1.c();
					if_block1.m(t2.parentNode, t2);
				}
			}

			if (dirty & /*$p2pConnection*/ 8 && i1_class_value !== (i1_class_value = "kalicon notranslate solid variable " + (/*$p2pConnection*/ ctx[3] ? 'end' : '') + " svelte-1ax078w")) {
				attr(i1, "class", i1_class_value);
			}

			if (/*$peerState*/ ctx[4] === 'connected') {
				if (if_block2) ; else {
					if_block2 = create_if_block_2$3();
					if_block2.c();
					if_block2.m(button, null);
				}
			} else if (if_block2) {
				if_block2.d(1);
				if_block2 = null;
			}

			if (dirty & /*$inputID, $p2pConnection*/ 12 && button_class_value !== (button_class_value = "call-button no_highlights " + (/*$inputID*/ ctx[2].length === 6 && /*$inputID*/ ctx[2].match(/^[0-9]+$/)
			? ''
			: /*$p2pConnection*/ ctx[3] ? '' : 'disabled') + " svelte-1ax078w")) {
				attr(button, "class", button_class_value);
			}
		},
		d(detaching) {
			if (if_block0) if_block0.d(detaching);
			if (detaching) detach(t0);
			if (detaching) detach(div);
			if (detaching) detach(t1);

			if (if_block1) {
				if_block1.d(detaching);
			}

			if (detaching) detach(t2);
			if (detaching) detach(button);
			if (if_block2) if_block2.d();
			mounted = false;
			dispose();
		}
	};
}

// (54:8) {#if !$p2pConnection}
function create_if_block_5$1(ctx) {
	let label;
	let t0_value = subnav_call_text.label.default[/*$setLang*/ ctx[6]] + "";
	let t0;
	let t1;
	let input;
	let input_data_length_value;
	let mounted;
	let dispose;

	return {
		c() {
			label = element("label");
			t0 = text(t0_value);
			t1 = space();
			input = element("input");
			attr(label, "class", "svelte-1ax078w");
			attr(input, "data-length", input_data_length_value = /*$inputID*/ ctx[2].length);
			attr(input, "maxlength", "6");
			attr(input, "pattern", "^[0-9]*$");
			attr(input, "spellcheck", "false");
			attr(input, "onkeypress", "return /[0-9]/i.test(event.key)");
			attr(input, "type", "tel");
			attr(input, "placeholder", "000000");
			attr(input, "class", "svelte-1ax078w");
		},
		m(target, anchor) {
			insert(target, label, anchor);
			append(label, t0);
			insert(target, t1, anchor);
			insert(target, input, anchor);
			set_input_value(input, /*$inputID*/ ctx[2]);

			if (!mounted) {
				dispose = listen(input, "input", /*input_input_handler*/ ctx[12]);
				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty & /*$setLang*/ 64 && t0_value !== (t0_value = subnav_call_text.label.default[/*$setLang*/ ctx[6]] + "")) set_data(t0, t0_value);

			if (dirty & /*$inputID*/ 4 && input_data_length_value !== (input_data_length_value = /*$inputID*/ ctx[2].length)) {
				attr(input, "data-length", input_data_length_value);
			}

			if (dirty & /*$inputID*/ 4) {
				set_input_value(input, /*$inputID*/ ctx[2]);
			}
		},
		d(detaching) {
			if (detaching) detach(label);
			if (detaching) detach(t1);
			if (detaching) detach(input);
			mounted = false;
			dispose();
		}
	};
}

// (73:45) 
function create_if_block_4$2(ctx) {
	let label;
	let t0_value = subnav_call_text.label.connected[/*$setLang*/ ctx[6]] + "";
	let t0;
	let t1;
	let b;
	let t2;
	let t3_value = /*$p2pConnection*/ ctx[3].peer + "";
	let t3;
	let t4;
	let h4;
	let t5;

	return {
		c() {
			label = element("label");
			t0 = text(t0_value);
			t1 = space();
			b = element("b");
			t2 = text("#");
			t3 = text(t3_value);
			t4 = space();
			h4 = element("h4");
			t5 = text(/*$callTime*/ ctx[7]);
			attr(b, "class", "svelte-1ax078w");
			attr(label, "class", "friend svelte-1ax078w");
			attr(h4, "class", "timer svelte-1ax078w");
		},
		m(target, anchor) {
			insert(target, label, anchor);
			append(label, t0);
			append(label, t1);
			append(label, b);
			append(b, t2);
			append(b, t3);
			insert(target, t4, anchor);
			insert(target, h4, anchor);
			append(h4, t5);
		},
		p(ctx, dirty) {
			if (dirty & /*$setLang*/ 64 && t0_value !== (t0_value = subnav_call_text.label.connected[/*$setLang*/ ctx[6]] + "")) set_data(t0, t0_value);
			if (dirty & /*$p2pConnection*/ 8 && t3_value !== (t3_value = /*$p2pConnection*/ ctx[3].peer + "")) set_data(t3, t3_value);
			if (dirty & /*$callTime*/ 128) set_data(t5, /*$callTime*/ ctx[7]);
		},
		d(detaching) {
			if (detaching) detach(label);
			if (detaching) detach(t4);
			if (detaching) detach(h4);
		}
	};
}

// (71:8) {#if $peerState === 'connecting'}
function create_if_block_3$3(ctx) {
	let h4;
	let t_value = subnav_call_text.connecting[/*$setLang*/ ctx[6]] + "";
	let t;

	return {
		c() {
			h4 = element("h4");
			t = text(t_value);
			attr(h4, "class", "loading svelte-1ax078w");
		},
		m(target, anchor) {
			insert(target, h4, anchor);
			append(h4, t);
		},
		p(ctx, dirty) {
			if (dirty & /*$setLang*/ 64 && t_value !== (t_value = subnav_call_text.connecting[/*$setLang*/ ctx[6]] + "")) set_data(t, t_value);
		},
		d(detaching) {
			if (detaching) detach(h4);
		}
	};
}

// (85:10) {#if $peerState === 'connected'}
function create_if_block_2$3(ctx) {
	let div;

	return {
		c() {
			div = element("div");
			attr(div, "class", "pulse svelte-1ax078w");
		},
		m(target, anchor) {
			insert(target, div, anchor);
		},
		d(detaching) {
			if (detaching) detach(div);
		}
	};
}

// (106:4) {:else}
function create_else_block$4(ctx) {
	let t0_value = subnav_call_text.id.share[/*$setLang*/ ctx[6]] + "";
	let t0;
	let t1;
	let span;
	let t2;

	return {
		c() {
			t0 = text(t0_value);
			t1 = text(" #");
			span = element("span");
			t2 = text(/*$myID*/ ctx[1]);
			attr(span, "class", "svelte-1ax078w");
		},
		m(target, anchor) {
			insert(target, t0, anchor);
			insert(target, t1, anchor);
			insert(target, span, anchor);
			append(span, t2);
		},
		p(ctx, dirty) {
			if (dirty & /*$setLang*/ 64 && t0_value !== (t0_value = subnav_call_text.id.share[/*$setLang*/ ctx[6]] + "")) set_data(t0, t0_value);
			if (dirty & /*$myID*/ 2) set_data(t2, /*$myID*/ ctx[1]);
		},
		d(detaching) {
			if (detaching) detach(t0);
			if (detaching) detach(t1);
			if (detaching) detach(span);
		}
	};
}

// (104:4) {#if copied}
function create_if_block$7(ctx) {
	let t0_value = subnav_call_text.id.copied[/*$setLang*/ ctx[6]] + "";
	let t0;
	let t1;
	let t2_value = /*emoticons*/ ctx[11][Math.floor(Math.random() * /*emoticons*/ ctx[11].length)] + "";
	let t2;

	return {
		c() {
			t0 = text(t0_value);
			t1 = space();
			t2 = text(t2_value);
		},
		m(target, anchor) {
			insert(target, t0, anchor);
			insert(target, t1, anchor);
			insert(target, t2, anchor);
		},
		p(ctx, dirty) {
			if (dirty & /*$setLang*/ 64 && t0_value !== (t0_value = subnav_call_text.id.copied[/*$setLang*/ ctx[6]] + "")) set_data(t0, t0_value);
		},
		d(detaching) {
			if (detaching) detach(t0);
			if (detaching) detach(t1);
			if (detaching) detach(t2);
		}
	};
}

function create_fragment$g(ctx) {
	let container;
	let div;
	let div_class_value;
	let div_intro;
	let div_outro;
	let t;
	let button;
	let button_class_value;
	let button_intro;
	let button_outro;
	let current;
	let mounted;
	let dispose;

	function select_block_type(ctx, dirty) {
		if (/*$peerState*/ ctx[4] !== 'server-disconnect') return create_if_block_1$5;
		return create_else_block_1$1;
	}

	let current_block_type = select_block_type(ctx);
	let if_block0 = current_block_type(ctx);

	function select_block_type_2(ctx, dirty) {
		if (/*copied*/ ctx[0]) return create_if_block$7;
		return create_else_block$4;
	}

	let current_block_type_1 = select_block_type_2(ctx);
	let if_block1 = current_block_type_1(ctx);

	return {
		c() {
			container = element("container");
			div = element("div");
			if_block0.c();
			t = space();
			button = element("button");
			if_block1.c();
			attr(div, "class", div_class_value = "call " + /*$peerState*/ ctx[4] + " svelte-1ax078w");
			attr(button, "class", button_class_value = "your-id " + (/*copied*/ ctx[0] ? 'copied' : '') + " svelte-1ax078w");
			attr(container, "class", "svelte-1ax078w");
		},
		m(target, anchor) {
			insert(target, container, anchor);
			append(container, div);
			if_block0.m(div, null);
			append(container, t);
			append(container, button);
			if_block1.m(button, null);
			current = true;

			if (!mounted) {
				dispose = listen(button, "click", /*copyToClipboard*/ ctx[10]);
				mounted = true;
			}
		},
		p(new_ctx, [dirty]) {
			ctx = new_ctx;

			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block0) {
				if_block0.p(ctx, dirty);
			} else {
				if_block0.d(1);
				if_block0 = current_block_type(ctx);

				if (if_block0) {
					if_block0.c();
					if_block0.m(div, null);
				}
			}

			if (!current || dirty & /*$peerState*/ 16 && div_class_value !== (div_class_value = "call " + /*$peerState*/ ctx[4] + " svelte-1ax078w")) {
				attr(div, "class", div_class_value);
			}

			if (current_block_type_1 === (current_block_type_1 = select_block_type_2(ctx)) && if_block1) {
				if_block1.p(ctx, dirty);
			} else {
				if_block1.d(1);
				if_block1 = current_block_type_1(ctx);

				if (if_block1) {
					if_block1.c();
					if_block1.m(button, null);
				}
			}

			if (!current || dirty & /*copied*/ 1 && button_class_value !== (button_class_value = "your-id " + (/*copied*/ ctx[0] ? 'copied' : '') + " svelte-1ax078w")) {
				attr(button, "class", button_class_value);
			}
		},
		i(local) {
			if (current) return;

			add_render_callback(() => {
				if (div_outro) div_outro.end(1);

				div_intro = create_in_transition(div, fade, {
					easing: cubicInOut,
					duration: 300,
					delay: 400
				});

				div_intro.start();
			});

			add_render_callback(() => {
				if (button_outro) button_outro.end(1);

				button_intro = create_in_transition(button, fade, {
					easing: cubicInOut,
					duration: 300,
					delay: 500
				});

				button_intro.start();
			});

			current = true;
		},
		o(local) {
			if (div_intro) div_intro.invalidate();

			div_outro = create_out_transition(div, fade, {
				duration: /*$DIM*/ ctx[5].w > 600 ? 200 : 0
			});

			if (button_intro) button_intro.invalidate();

			button_outro = create_out_transition(button, fade, {
				duration: /*$DIM*/ ctx[5].w > 600 ? 200 : 0
			});

			current = false;
		},
		d(detaching) {
			if (detaching) detach(container);
			if_block0.d();
			if (detaching && div_outro) div_outro.end();
			if_block1.d();
			if (detaching && button_outro) button_outro.end();
			mounted = false;
			dispose();
		}
	};
}

function instance$g($$self, $$props, $$invalidate) {
	let $myID;
	let $inputID;
	let $p2pConnection;
	let $peerState;
	let $DIM;
	let $setLang;
	let $callTime;
	let $PEER;
	component_subscribe($$self, myID, $$value => $$invalidate(1, $myID = $$value));
	component_subscribe($$self, inputID, $$value => $$invalidate(2, $inputID = $$value));
	component_subscribe($$self, p2pConnection, $$value => $$invalidate(3, $p2pConnection = $$value));
	component_subscribe($$self, peerState, $$value => $$invalidate(4, $peerState = $$value));
	component_subscribe($$self, DIM, $$value => $$invalidate(5, $DIM = $$value));
	component_subscribe($$self, setLang, $$value => $$invalidate(6, $setLang = $$value));
	component_subscribe($$self, callTime, $$value => $$invalidate(7, $callTime = $$value));
	component_subscribe($$self, PEER, $$value => $$invalidate(8, $PEER = $$value));
	let copied = false;
	let timeout;

	const triggerNotif = () => {
		clearTimeout(timeout);
		$$invalidate(0, copied = true);

		timeout = setTimeout(
			() => {
				$$invalidate(0, copied = false);
			},
			1000
		);
	};

	const handleCall = () => {
		if ($p2pConnection) {
			$p2pConnection.close();
			return;
		}

		if ($inputID.length === 6 && $inputID.match(/^[0-9]+$/)) {
			friendID.set($inputID);
		}
	};

	const copyToClipboard = () => {
		const el = document.createElement('textarea');
		el.value = $myID;
		document.body.appendChild(el);
		el.select();
		document.execCommand('copy');
		document.body.removeChild(el);
		triggerNotif();
	};

	let emoticons = ['(◍•ᴗ•◍)', '(≧▽≦)', '(ﾉ◕ヮ◕)', '(ㆁωㆁ)'];

	function input_input_handler() {
		$inputID = this.value;
		inputID.set($inputID);
	}

	const click_handler = () => $PEER.reconnect();

	return [
		copied,
		$myID,
		$inputID,
		$p2pConnection,
		$peerState,
		$DIM,
		$setLang,
		$callTime,
		$PEER,
		handleCall,
		copyToClipboard,
		emoticons,
		input_input_handler,
		click_handler
	];
}

class Sub_nav_call extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$g, create_fragment$g, safe_not_equal, {});
	}
}

var toggle_svelte_svelte_type_style_lang = '';

/* src/ui/components/toggle.svelte generated by Svelte v3.46.4 */

function create_else_block$3(ctx) {
	let label;
	let input;
	let input_checked_value;
	let t0;
	let container;
	let div1;
	let container_class_value;
	let label_class_value;
	let mounted;
	let dispose;

	return {
		c() {
			label = element("label");
			input = element("input");
			t0 = space();
			container = element("container");
			div1 = element("div");
			div1.innerHTML = `<div class="toggleButton svelte-yzrsaq"><i class="kalicon notranslate fill small svelte-yzrsaq">jellyfill</i></div>`;
			attr(input, "type", "checkbox");
			attr(input, "aria-label", /*name*/ ctx[5]);
			input.checked = input_checked_value = /*$setting*/ ctx[7] ? true : false;
			attr(input, "class", "svelte-yzrsaq");
			attr(div1, "class", "track svelte-yzrsaq");
			attr(container, "class", container_class_value = "" + (null_to_empty(/*$setting*/ ctx[7] ? '' : /*classes*/ ctx[4]) + " svelte-yzrsaq"));
			attr(label, "name", /*name*/ ctx[5]);
			attr(label, "class", label_class_value = "" + ((/*$setting*/ ctx[7] ? 'toggled' : '') + " " + (/*hide*/ ctx[2] ? 'hide' : '') + " " + /*styles*/ ctx[3] + " svelte-yzrsaq"));
		},
		m(target, anchor) {
			insert(target, label, anchor);
			append(label, input);
			append(label, t0);
			append(label, container);
			append(container, div1);
			/*label_binding_1*/ ctx[11](label);

			if (!mounted) {
				dispose = listen(input, "change", /*handleClick*/ ctx[8]);
				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty & /*name*/ 32) {
				attr(input, "aria-label", /*name*/ ctx[5]);
			}

			if (dirty & /*$setting*/ 128 && input_checked_value !== (input_checked_value = /*$setting*/ ctx[7] ? true : false)) {
				input.checked = input_checked_value;
			}

			if (dirty & /*$setting, classes*/ 144 && container_class_value !== (container_class_value = "" + (null_to_empty(/*$setting*/ ctx[7] ? '' : /*classes*/ ctx[4]) + " svelte-yzrsaq"))) {
				attr(container, "class", container_class_value);
			}

			if (dirty & /*name*/ 32) {
				attr(label, "name", /*name*/ ctx[5]);
			}

			if (dirty & /*$setting, hide, styles*/ 140 && label_class_value !== (label_class_value = "" + ((/*$setting*/ ctx[7] ? 'toggled' : '') + " " + (/*hide*/ ctx[2] ? 'hide' : '') + " " + /*styles*/ ctx[3] + " svelte-yzrsaq"))) {
				attr(label, "class", label_class_value);
			}
		},
		d(detaching) {
			if (detaching) detach(label);
			/*label_binding_1*/ ctx[11](null);
			mounted = false;
			dispose();
		}
	};
}

// (25:0) {#if value !== null}
function create_if_block$6(ctx) {
	let label;
	let input;
	let input_checked_value;
	let t0;
	let container;
	let div1;
	let container_class_value;
	let label_class_value;
	let mounted;
	let dispose;

	return {
		c() {
			label = element("label");
			input = element("input");
			t0 = space();
			container = element("container");
			div1 = element("div");
			div1.innerHTML = `<div class="toggleButton svelte-yzrsaq"><i class="kalicon notranslate fill small svelte-yzrsaq">jellyfill</i></div>`;
			attr(input, "type", "checkbox");
			attr(input, "aria-label", /*name*/ ctx[5]);
			input.checked = input_checked_value = /*value*/ ctx[1] ? true : false;
			attr(input, "class", "svelte-yzrsaq");
			attr(div1, "class", "track svelte-yzrsaq");
			attr(container, "class", container_class_value = "" + (null_to_empty(/*value*/ ctx[1] ? '' : /*classes*/ ctx[4]) + " svelte-yzrsaq"));
			attr(label, "name", /*name*/ ctx[5]);
			attr(label, "class", label_class_value = "" + ((/*value*/ ctx[1] ? 'toggled' : '') + " " + (/*hide*/ ctx[2] ? 'hide' : '') + " " + /*styles*/ ctx[3] + " svelte-yzrsaq"));
		},
		m(target, anchor) {
			insert(target, label, anchor);
			append(label, input);
			append(label, t0);
			append(label, container);
			append(container, div1);
			/*label_binding*/ ctx[10](label);

			if (!mounted) {
				dispose = listen(input, "change", /*handleClick*/ ctx[8]);
				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty & /*name*/ 32) {
				attr(input, "aria-label", /*name*/ ctx[5]);
			}

			if (dirty & /*value*/ 2 && input_checked_value !== (input_checked_value = /*value*/ ctx[1] ? true : false)) {
				input.checked = input_checked_value;
			}

			if (dirty & /*value, classes*/ 18 && container_class_value !== (container_class_value = "" + (null_to_empty(/*value*/ ctx[1] ? '' : /*classes*/ ctx[4]) + " svelte-yzrsaq"))) {
				attr(container, "class", container_class_value);
			}

			if (dirty & /*name*/ 32) {
				attr(label, "name", /*name*/ ctx[5]);
			}

			if (dirty & /*value, hide, styles*/ 14 && label_class_value !== (label_class_value = "" + ((/*value*/ ctx[1] ? 'toggled' : '') + " " + (/*hide*/ ctx[2] ? 'hide' : '') + " " + /*styles*/ ctx[3] + " svelte-yzrsaq"))) {
				attr(label, "class", label_class_value);
			}
		},
		d(detaching) {
			if (detaching) detach(label);
			/*label_binding*/ ctx[10](null);
			mounted = false;
			dispose();
		}
	};
}

function create_fragment$f(ctx) {
	let if_block_anchor;

	function select_block_type(ctx, dirty) {
		if (/*value*/ ctx[1] !== null) return create_if_block$6;
		return create_else_block$3;
	}

	let current_block_type = select_block_type(ctx);
	let if_block = current_block_type(ctx);

	return {
		c() {
			if_block.c();
			if_block_anchor = empty();
		},
		m(target, anchor) {
			if_block.m(target, anchor);
			insert(target, if_block_anchor, anchor);
		},
		p(ctx, [dirty]) {
			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
				if_block.p(ctx, dirty);
			} else {
				if_block.d(1);
				if_block = current_block_type(ctx);

				if (if_block) {
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if_block.d(detaching);
			if (detaching) detach(if_block_anchor);
		}
	};
}

function instance$f($$self, $$props, $$invalidate) {
	let $setting,
		$$unsubscribe_setting = noop,
		$$subscribe_setting = () => ($$unsubscribe_setting(), $$unsubscribe_setting = subscribe(setting, $$value => $$invalidate(7, $setting = $$value)), setting);

	$$self.$$.on_destroy.push(() => $$unsubscribe_setting());
	let { setting } = $$props; //Pass in a store from prop
	$$subscribe_setting();
	let { value = null } = $$props; // or pass in nested value
	let { callback = null } = $$props;
	let { hide = false } = $$props;
	let { styles = '' } = $$props;
	let { classes = '' } = $$props;
	let { name = '' } = $$props;
	let toggleDom;

	const handleClick = () => {
		if (callback !== null) {
			callback();
			setting.set($setting);
		} else {
			setting.set(!$setting);
		}

		haptic();
	};

	function label_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			toggleDom = $$value;
			$$invalidate(6, toggleDom);
		});
	}

	function label_binding_1($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			toggleDom = $$value;
			$$invalidate(6, toggleDom);
		});
	}

	$$self.$$set = $$props => {
		if ('setting' in $$props) $$subscribe_setting($$invalidate(0, setting = $$props.setting));
		if ('value' in $$props) $$invalidate(1, value = $$props.value);
		if ('callback' in $$props) $$invalidate(9, callback = $$props.callback);
		if ('hide' in $$props) $$invalidate(2, hide = $$props.hide);
		if ('styles' in $$props) $$invalidate(3, styles = $$props.styles);
		if ('classes' in $$props) $$invalidate(4, classes = $$props.classes);
		if ('name' in $$props) $$invalidate(5, name = $$props.name);
	};

	return [
		setting,
		value,
		hide,
		styles,
		classes,
		name,
		toggleDom,
		$setting,
		handleClick,
		callback,
		label_binding,
		label_binding_1
	];
}

class Toggle extends SvelteComponent {
	constructor(options) {
		super();

		init(this, options, instance$f, create_fragment$f, safe_not_equal, {
			setting: 0,
			value: 1,
			callback: 9,
			hide: 2,
			styles: 3,
			classes: 4,
			name: 5
		});
	}
}

var sub_nav_settings_svelte_svelte_type_style_lang = '';

/* src/ui/sub_nav.settings.svelte generated by Svelte v3.46.4 */

function get_each_context$2(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[19] = list[i];
	return child_ctx;
}

// (84:8) {:else}
function create_else_block_2(ctx) {
	let p;

	return {
		c() {
			p = element("p");
			p.textContent = "For eyetracking, use both face and full body tracking.";
			attr(p, "class", "info svelte-1krauxh");
		},
		m(target, anchor) {
			insert(target, p, anchor);
		},
		d(detaching) {
			if (detaching) detach(p);
		}
	};
}

// (82:33) 
function create_if_block_3$2(ctx) {
	let p;

	return {
		c() {
			p = element("p");
			p.textContent = "Full body tracking recommended for desktop browsers.";
			attr(p, "class", "info svelte-1krauxh");
		},
		m(target, anchor) {
			insert(target, p, anchor);
		},
		d(detaching) {
			if (detaching) detach(p);
		}
	};
}

// (80:7) {#if isSafari}
function create_if_block_2$2(ctx) {
	let p;

	return {
		c() {
			p = element("p");
			p.textContent = "Full body finger tracking unavailble on Safari.";
			attr(p, "class", "info warning svelte-1krauxh");
		},
		m(target, anchor) {
			insert(target, p, anchor);
		},
		d(detaching) {
			if (detaching) detach(p);
		}
	};
}

// (156:6) {:else}
function create_else_block_1(ctx) {
	let p;

	return {
		c() {
			p = element("p");
			p.textContent = "Allow webcam access to see camera list.";
			attr(p, "class", "info svelte-1krauxh");
		},
		m(target, anchor) {
			insert(target, p, anchor);
		},
		p: noop,
		d(detaching) {
			if (detaching) detach(p);
		}
	};
}

// (143:9) {#if $capturedDevices.videoinput.length>0}
function create_if_block_1$4(ctx) {
	let select;
	let t;
	let div;
	let mounted;
	let dispose;
	let each_value = /*$capturedDevices*/ ctx[8].videoinput;
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
	}

	return {
		c() {
			select = element("select");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t = space();
			div = element("div");
			attr(select, "aria-label", "Change Video Source");
			attr(select, "name", "Video Source");
			attr(select, "class", "svelte-1krauxh");
			if (/*$videoDeviceId*/ ctx[9] === void 0) add_render_callback(() => /*select_change_handler*/ ctx[16].call(select));
			attr(div, "class", "select_arrow svelte-1krauxh");
		},
		m(target, anchor) {
			insert(target, select, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(select, null);
			}

			select_option(select, /*$videoDeviceId*/ ctx[9]);
			insert(target, t, anchor);
			insert(target, div, anchor);

			if (!mounted) {
				dispose = listen(select, "change", /*select_change_handler*/ ctx[16]);
				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty & /*$capturedDevices*/ 256) {
				each_value = /*$capturedDevices*/ ctx[8].videoinput;
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$2(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block$2(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(select, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}

			if (dirty & /*$videoDeviceId, $capturedDevices*/ 768) {
				select_option(select, /*$videoDeviceId*/ ctx[9]);
			}
		},
		d(detaching) {
			if (detaching) detach(select);
			destroy_each(each_blocks, detaching);
			if (detaching) detach(t);
			if (detaching) detach(div);
			mounted = false;
			dispose();
		}
	};
}

// (150:8) {#each $capturedDevices.videoinput as deviceInfo}
function create_each_block$2(ctx) {
	let option;
	let t_value = /*deviceInfo*/ ctx[19].label + "";
	let t;
	let option_value_value;

	return {
		c() {
			option = element("option");
			t = text(t_value);
			option.__value = option_value_value = /*deviceInfo*/ ctx[19].deviceId;
			option.value = option.__value;
			attr(option, "class", "svelte-1krauxh");
		},
		m(target, anchor) {
			insert(target, option, anchor);
			append(option, t);
		},
		p(ctx, dirty) {
			if (dirty & /*$capturedDevices*/ 256 && t_value !== (t_value = /*deviceInfo*/ ctx[19].label + "")) set_data(t, t_value);

			if (dirty & /*$capturedDevices*/ 256 && option_value_value !== (option_value_value = /*deviceInfo*/ ctx[19].deviceId)) {
				option.__value = option_value_value;
				option.value = option.__value;
			}
		},
		d(detaching) {
			if (detaching) detach(option);
		}
	};
}

// (172:4) {:else}
function create_else_block$2(ctx) {
	let t;

	return {
		c() {
			t = text("Reset Character Tracking");
		},
		m(target, anchor) {
			insert(target, t, anchor);
		},
		p: noop,
		d(detaching) {
			if (detaching) detach(t);
		}
	};
}

// (170:4) {#if reset}
function create_if_block$5(ctx) {
	let t0;
	let t1_value = /*emoticons*/ ctx[10][Math.floor(Math.random() * /*emoticons*/ ctx[10].length)] + "";
	let t1;

	return {
		c() {
			t0 = text("Tracking Reset ");
			t1 = text(t1_value);
		},
		m(target, anchor) {
			insert(target, t0, anchor);
			insert(target, t1, anchor);
		},
		p: noop,
		d(detaching) {
			if (detaching) detach(t0);
			if (detaching) detach(t1);
		}
	};
}

function create_fragment$e(ctx) {
	let container;
	let div8;
	let div7;
	let h40;
	let t1;
	let div2;
	let div0;
	let t4;
	let div1;
	let t7;
	let t8;
	let div3;
	let h41;
	let t10;
	let toggle0;
	let t11;
	let div4;
	let h42;
	let t13;
	let toggle1;
	let t14;
	let div5;
	let h43;
	let t16;
	let toggle2;
	let t17;
	let div6;
	let h44;
	let t19;
	let toggle3;
	let div8_intro;
	let t20;
	let div13;
	let div9;
	let h45;
	let t22;
	let toggle4;
	let t23;
	let div10;
	let h46;
	let t25;
	let toggle5;
	let t26;
	let div12;
	let h47;
	let t28;
	let div11;
	let div13_intro;
	let t29;
	let button;
	let button_class_value;
	let button_intro;
	let button_outro;
	let container_intro;
	let container_outro;
	let current;
	let mounted;
	let dispose;

	function select_block_type(ctx, dirty) {
		if (isSafari) return create_if_block_2$2;
		if (/*$DIM*/ ctx[2].w < 600) return create_if_block_3$2;
		return create_else_block_2;
	}

	let current_block_type = select_block_type(ctx);
	let if_block0 = current_block_type(ctx);

	toggle0 = new Toggle({
			props: {
				name: /*$options*/ ctx[1].face.enableWink
				? 'Disable Wink Detection'
				: 'Enable Wink Detection',
				setting: options,
				value: /*$options*/ ctx[1].face.enableWink,
				callback: /*func*/ ctx[15]
			}
		});

	toggle1 = new Toggle({
			props: {
				name: /*$allowSmile*/ ctx[3]
				? 'Disable Smile Detection'
				: 'Enable Smile Detection',
				setting: allowSmile
			}
		});

	toggle2 = new Toggle({
			props: {
				name: /*$allowRoom*/ ctx[4]
				? 'Disable Room Tracking'
				: 'Enable Room Tracking',
				setting: allowRoom
			}
		});

	toggle3 = new Toggle({
			props: {
				name: /*$allowLegs*/ ctx[5]
				? 'Disable Leg Tracking'
				: 'Enable Leg Tracking',
				setting: allowLegs
			}
		});

	toggle4 = new Toggle({
			props: {
				name: /*$hideCamera*/ ctx[6]
				? 'Hide Video Feed'
				: 'Show Video Feed',
				setting: hideCamera
			}
		});

	toggle5 = new Toggle({
			props: {
				name: /*$hideFace*/ ctx[7] ? 'Hide Face' : 'Show Face',
				setting: hideFace
			}
		});

	function select_block_type_1(ctx, dirty) {
		if (/*$capturedDevices*/ ctx[8].videoinput.length > 0) return create_if_block_1$4;
		return create_else_block_1;
	}

	let current_block_type_1 = select_block_type_1(ctx);
	let if_block1 = current_block_type_1(ctx);

	function select_block_type_2(ctx, dirty) {
		if (/*reset*/ ctx[0]) return create_if_block$5;
		return create_else_block$2;
	}

	let current_block_type_2 = select_block_type_2(ctx);
	let if_block2 = current_block_type_2(ctx);

	return {
		c() {
			container = element("container");
			div8 = element("div");
			div7 = element("div");
			h40 = element("h4");
			h40.textContent = "Body Tracking Options";
			t1 = space();
			div2 = element("div");
			div0 = element("div");

			div0.innerHTML = `<img src="https://yeemachine.github.io/k2021/gif/face_eye.gif" class="svelte-1krauxh"/> 
           <label class="svelte-1krauxh">Face/Eye</label>`;

			t4 = space();
			div1 = element("div");

			div1.innerHTML = `<img src="https://yeemachine.github.io/k2021/gif/fullbody.gif" class="svelte-1krauxh"/> 
           <label class="svelte-1krauxh">Full Body</label>`;

			t7 = space();
			if_block0.c();
			t8 = space();
			div3 = element("div");
			h41 = element("h4");
			h41.textContent = "Enable Wink";
			t10 = space();
			create_component(toggle0.$$.fragment);
			t11 = space();
			div4 = element("div");
			h42 = element("h4");
			h42.textContent = "Smile Detection [Beta]";
			t13 = space();
			create_component(toggle1.$$.fragment);
			t14 = space();
			div5 = element("div");
			h43 = element("h4");
			h43.textContent = "Room Tracking";
			t16 = space();
			create_component(toggle2.$$.fragment);
			t17 = space();
			div6 = element("div");
			h44 = element("h4");
			h44.textContent = "Leg Tracking [WIP]";
			t19 = space();
			create_component(toggle3.$$.fragment);
			t20 = space();
			div13 = element("div");
			div9 = element("div");
			h45 = element("h4");
			h45.textContent = "Hide Camera Panel";
			t22 = space();
			create_component(toggle4.$$.fragment);
			t23 = space();
			div10 = element("div");
			h46 = element("h4");
			h46.textContent = "Hide Webcam Video";
			t25 = space();
			create_component(toggle5.$$.fragment);
			t26 = space();
			div12 = element("div");
			h47 = element("h4");
			h47.textContent = "Change Camera";
			t28 = space();
			div11 = element("div");
			if_block1.c();
			t29 = space();
			button = element("button");
			if_block2.c();
			set_style(h40, "margin", "0");
			attr(h40, "class", "svelte-1krauxh");
			attr(div0, "class", "trackingOption svelte-1krauxh");
			toggle_class(div0, "selected", /*$options*/ ctx[1].face.enable);
			attr(div1, "class", "trackingOption svelte-1krauxh");
			toggle_class(div1, "selected", /*$options*/ ctx[1].holistic.enable);
			attr(div2, "class", "tracking svelte-1krauxh");
			set_style(h41, "margin", "0");
			attr(h41, "class", "svelte-1krauxh");
			attr(div3, "class", "list svelte-1krauxh");
			set_style(h42, "margin", "0");
			attr(h42, "class", "svelte-1krauxh");
			attr(div4, "class", "list svelte-1krauxh");
			set_style(h43, "margin", "0");
			attr(h43, "class", "svelte-1krauxh");
			attr(div5, "class", "list svelte-1krauxh");
			set_style(h44, "margin", "0");
			attr(h44, "class", "svelte-1krauxh");
			attr(div6, "class", "list svelte-1krauxh");
			attr(div7, "class", "select svelte-1krauxh");
			attr(div8, "class", "setting svelte-1krauxh");
			set_style(h45, "margin", "0");
			attr(h45, "class", "svelte-1krauxh");
			attr(div9, "class", "list svelte-1krauxh");
			set_style(h46, "margin", "0");
			attr(h46, "class", "svelte-1krauxh");
			attr(div10, "class", "list svelte-1krauxh");
			attr(h47, "class", "svelte-1krauxh");
			attr(div11, "class", "select svelte-1krauxh");
			attr(div12, "class", "list svelte-1krauxh");
			set_style(div12, "flex-direction", "column");
			attr(div13, "class", "setting svelte-1krauxh");
			attr(button, "class", button_class_value = "trigger " + (/*reset*/ ctx[0] ? 'reset' : '') + " svelte-1krauxh");
			attr(container, "class", "svelte-1krauxh");
		},
		m(target, anchor) {
			insert(target, container, anchor);
			append(container, div8);
			append(div8, div7);
			append(div7, h40);
			append(div7, t1);
			append(div7, div2);
			append(div2, div0);
			append(div2, t4);
			append(div2, div1);
			append(div7, t7);
			if_block0.m(div7, null);
			append(div7, t8);
			append(div7, div3);
			append(div3, h41);
			append(div3, t10);
			mount_component(toggle0, div3, null);
			append(div7, t11);
			append(div7, div4);
			append(div4, h42);
			append(div4, t13);
			mount_component(toggle1, div4, null);
			append(div7, t14);
			append(div7, div5);
			append(div5, h43);
			append(div5, t16);
			mount_component(toggle2, div5, null);
			append(div7, t17);
			append(div7, div6);
			append(div6, h44);
			append(div6, t19);
			mount_component(toggle3, div6, null);
			append(container, t20);
			append(container, div13);
			append(div13, div9);
			append(div9, h45);
			append(div9, t22);
			mount_component(toggle4, div9, null);
			append(div13, t23);
			append(div13, div10);
			append(div10, h46);
			append(div10, t25);
			mount_component(toggle5, div10, null);
			append(div13, t26);
			append(div13, div12);
			append(div12, h47);
			append(div12, t28);
			append(div12, div11);
			if_block1.m(div11, null);
			append(container, t29);
			append(container, button);
			if_block2.m(button, null);
			current = true;

			if (!mounted) {
				dispose = [
					listen(div0, "click", /*click_handler*/ ctx[13]),
					listen(div1, "click", /*click_handler_1*/ ctx[14]),
					listen(button, "click", /*triggerReset*/ ctx[11])
				];

				mounted = true;
			}
		},
		p(new_ctx, [dirty]) {
			ctx = new_ctx;

			if (dirty & /*$options*/ 2) {
				toggle_class(div0, "selected", /*$options*/ ctx[1].face.enable);
			}

			if (dirty & /*$options*/ 2) {
				toggle_class(div1, "selected", /*$options*/ ctx[1].holistic.enable);
			}

			if (current_block_type !== (current_block_type = select_block_type(ctx))) {
				if_block0.d(1);
				if_block0 = current_block_type(ctx);

				if (if_block0) {
					if_block0.c();
					if_block0.m(div7, t8);
				}
			}

			const toggle0_changes = {};

			if (dirty & /*$options*/ 2) toggle0_changes.name = /*$options*/ ctx[1].face.enableWink
			? 'Disable Wink Detection'
			: 'Enable Wink Detection';

			if (dirty & /*$options*/ 2) toggle0_changes.value = /*$options*/ ctx[1].face.enableWink;
			if (dirty & /*$options*/ 2) toggle0_changes.callback = /*func*/ ctx[15];
			toggle0.$set(toggle0_changes);
			const toggle1_changes = {};

			if (dirty & /*$allowSmile*/ 8) toggle1_changes.name = /*$allowSmile*/ ctx[3]
			? 'Disable Smile Detection'
			: 'Enable Smile Detection';

			toggle1.$set(toggle1_changes);
			const toggle2_changes = {};

			if (dirty & /*$allowRoom*/ 16) toggle2_changes.name = /*$allowRoom*/ ctx[4]
			? 'Disable Room Tracking'
			: 'Enable Room Tracking';

			toggle2.$set(toggle2_changes);
			const toggle3_changes = {};

			if (dirty & /*$allowLegs*/ 32) toggle3_changes.name = /*$allowLegs*/ ctx[5]
			? 'Disable Leg Tracking'
			: 'Enable Leg Tracking';

			toggle3.$set(toggle3_changes);
			const toggle4_changes = {};

			if (dirty & /*$hideCamera*/ 64) toggle4_changes.name = /*$hideCamera*/ ctx[6]
			? 'Hide Video Feed'
			: 'Show Video Feed';

			toggle4.$set(toggle4_changes);
			const toggle5_changes = {};
			if (dirty & /*$hideFace*/ 128) toggle5_changes.name = /*$hideFace*/ ctx[7] ? 'Hide Face' : 'Show Face';
			toggle5.$set(toggle5_changes);

			if (current_block_type_1 === (current_block_type_1 = select_block_type_1(ctx)) && if_block1) {
				if_block1.p(ctx, dirty);
			} else {
				if_block1.d(1);
				if_block1 = current_block_type_1(ctx);

				if (if_block1) {
					if_block1.c();
					if_block1.m(div11, null);
				}
			}

			if (current_block_type_2 === (current_block_type_2 = select_block_type_2(ctx)) && if_block2) {
				if_block2.p(ctx, dirty);
			} else {
				if_block2.d(1);
				if_block2 = current_block_type_2(ctx);

				if (if_block2) {
					if_block2.c();
					if_block2.m(button, null);
				}
			}

			if (!current || dirty & /*reset*/ 1 && button_class_value !== (button_class_value = "trigger " + (/*reset*/ ctx[0] ? 'reset' : '') + " svelte-1krauxh")) {
				attr(button, "class", button_class_value);
			}
		},
		i(local) {
			if (current) return;
			transition_in(toggle0.$$.fragment, local);
			transition_in(toggle1.$$.fragment, local);
			transition_in(toggle2.$$.fragment, local);
			transition_in(toggle3.$$.fragment, local);

			if (!div8_intro) {
				add_render_callback(() => {
					div8_intro = create_in_transition(div8, fade, {
						easing: cubicInOut,
						duration: 300,
						delay: 400
					});

					div8_intro.start();
				});
			}

			transition_in(toggle4.$$.fragment, local);
			transition_in(toggle5.$$.fragment, local);

			if (!div13_intro) {
				add_render_callback(() => {
					div13_intro = create_in_transition(div13, fade, {
						easing: cubicInOut,
						duration: 300,
						delay: 400
					});

					div13_intro.start();
				});
			}

			add_render_callback(() => {
				if (button_outro) button_outro.end(1);

				button_intro = create_in_transition(button, fade, {
					easing: cubicInOut,
					duration: 300,
					delay: 500
				});

				button_intro.start();
			});

			add_render_callback(() => {
				if (container_outro) container_outro.end(1);

				container_intro = create_in_transition(container, fade, {
					easing: cubicInOut,
					duration: 300,
					delay: 400
				});

				container_intro.start();
			});

			current = true;
		},
		o(local) {
			transition_out(toggle0.$$.fragment, local);
			transition_out(toggle1.$$.fragment, local);
			transition_out(toggle2.$$.fragment, local);
			transition_out(toggle3.$$.fragment, local);
			transition_out(toggle4.$$.fragment, local);
			transition_out(toggle5.$$.fragment, local);
			if (button_intro) button_intro.invalidate();

			button_outro = create_out_transition(button, fade, {
				duration: /*$DIM*/ ctx[2].w > 600 ? 200 : 0
			});

			if (container_intro) container_intro.invalidate();

			container_outro = create_out_transition(container, fade, {
				duration: /*$DIM*/ ctx[2].w > 600 ? 200 : 0
			});

			current = false;
		},
		d(detaching) {
			if (detaching) detach(container);
			if_block0.d();
			destroy_component(toggle0);
			destroy_component(toggle1);
			destroy_component(toggle2);
			destroy_component(toggle3);
			destroy_component(toggle4);
			destroy_component(toggle5);
			if_block1.d();
			if_block2.d();
			if (detaching && button_outro) button_outro.end();
			if (detaching && container_outro) container_outro.end();
			mounted = false;
			run_all(dispose);
		}
	};
}

function instance$e($$self, $$props, $$invalidate) {
	let $options;
	let $profiles;
	let $DIM;
	let $allowSmile;
	let $allowRoom;
	let $allowLegs;
	let $hideCamera;
	let $hideFace;
	let $capturedDevices;
	let $videoDeviceId;
	component_subscribe($$self, options, $$value => $$invalidate(1, $options = $$value));
	component_subscribe($$self, profiles, $$value => $$invalidate(18, $profiles = $$value));
	component_subscribe($$self, DIM, $$value => $$invalidate(2, $DIM = $$value));
	component_subscribe($$self, allowSmile, $$value => $$invalidate(3, $allowSmile = $$value));
	component_subscribe($$self, allowRoom, $$value => $$invalidate(4, $allowRoom = $$value));
	component_subscribe($$self, allowLegs, $$value => $$invalidate(5, $allowLegs = $$value));
	component_subscribe($$self, hideCamera, $$value => $$invalidate(6, $hideCamera = $$value));
	component_subscribe($$self, hideFace, $$value => $$invalidate(7, $hideFace = $$value));
	component_subscribe($$self, capturedDevices, $$value => $$invalidate(8, $capturedDevices = $$value));
	component_subscribe($$self, videoDeviceId, $$value => $$invalidate(9, $videoDeviceId = $$value));
	let reset = false;
	let timeout;
	let emoticons = ['(◍•ᴗ•◍)', '(≧▽≦)', '(ﾉ◕ヮ◕)', '(ㆁωㆁ)'];

	const triggerReset = () => {
		if (timeout) {
			clearTimeout(timeout);
		}

		$$invalidate(0, reset = true);
		setVRMPose($profiles.user.model, $profiles.user.tracking, 'user', true, true);

		timeout = setTimeout(
			() => {
				$$invalidate(0, reset = false);
			},
			1000
		);
	};

	const toggleTracking = (e, type) => {
		e.preventDefault;

		if ($options[type].enable) {
			return;
		}

		set_store_value(options, $options[type].enable = !$options[type].enable, $options);
		set_store_value(options, $options[type === "face" ? 'holistic' : 'face'].enable = !$options[type === "face" ? 'holistic' : 'face'].enable, $options);
		haptic();

		if (!$options.holistic.enable && !$options.face.enable) {
			set_store_value(options, $options.face.enable = true, $options);
			return;
		}
	};

	const click_handler = e => {
		toggleTracking(e, 'face');
	};

	const click_handler_1 = e => {
		toggleTracking(e, 'holistic');
	};

	const func = () => {
		set_store_value(options, $options.face.enableWink = !$options.face.enableWink, $options);
	};

	function select_change_handler() {
		$videoDeviceId = select_value(this);
		videoDeviceId.set($videoDeviceId);
	}

	return [
		reset,
		$options,
		$DIM,
		$allowSmile,
		$allowRoom,
		$allowLegs,
		$hideCamera,
		$hideFace,
		$capturedDevices,
		$videoDeviceId,
		emoticons,
		triggerReset,
		toggleTracking,
		click_handler,
		click_handler_1,
		func,
		select_change_handler
	];
}

class Sub_nav_settings extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$e, create_fragment$e, safe_not_equal, {});
	}
}

var sub_nav_lights_svelte_svelte_type_style_lang = '';

/* src/ui/sub_nav.lights.svelte generated by Svelte v3.46.4 */

function create_fragment$d(ctx) {
	let container;
	let div1;
	let h40;
	let t1;
	let div0;
	let div0_intro;
	let div0_outro;
	let t2;
	let hr0;
	let t3;
	let h41;
	let t5;
	let input0;
	let t6;
	let hr1;
	let t7;
	let h42;
	let t9;
	let input1;
	let div1_intro;
	let t10;
	let div2;
	let h43;
	let t12;
	let input2;
	let t13;
	let hr2;
	let t14;
	let h44;
	let t16;
	let input3;
	let div2_intro;
	let t17;
	let div4;
	let h45;
	let t19;
	let input4;
	let t20;
	let hr3;
	let t21;
	let h46;
	let t23;
	let div3;
	let div3_intro;
	let div3_outro;
	let div4_intro;
	let t24;
	let div5;
	let h47;
	let t26;
	let input5;
	let div5_intro;
	let t27;
	let div7;
	let div6;
	let h48;
	let t29;
	let toggle0;
	let div7_intro;
	let t30;
	let div9;
	let div8;
	let h49;
	let t32;
	let toggle1;
	let div9_intro;
	let container_intro;
	let container_outro;
	let current;
	let mounted;
	let dispose;

	toggle0 = new Toggle({
			props: {
				name: /*$animateWater*/ ctx[7]
				? 'Animation Off'
				: 'Animation On',
				setting: animateWater
			}
		});

	toggle1 = new Toggle({
			props: {
				name: /*$enableSun*/ ctx[8]
				? 'Disable Experiment'
				: 'Enable Experiment',
				setting: enableSun
			}
		});

	return {
		c() {
			container = element("container");
			div1 = element("div");
			h40 = element("h4");
			h40.textContent = "Light Color";
			t1 = space();
			div0 = element("div");
			t2 = space();
			hr0 = element("hr");
			t3 = space();
			h41 = element("h4");
			h41.textContent = "Light Position X";
			t5 = space();
			input0 = element("input");
			t6 = space();
			hr1 = element("hr");
			t7 = space();
			h42 = element("h4");
			h42.textContent = "Light Position Y";
			t9 = space();
			input1 = element("input");
			t10 = space();
			div2 = element("div");
			h43 = element("h4");
			h43.textContent = "Shadow Strength";
			t12 = space();
			input2 = element("input");
			t13 = space();
			hr2 = element("hr");
			t14 = space();
			h44 = element("h4");
			h44.textContent = "Shadow Blur";
			t16 = space();
			input3 = element("input");
			t17 = space();
			div4 = element("div");
			h45 = element("h4");
			h45.textContent = "Outline Size";
			t19 = space();
			input4 = element("input");
			t20 = space();
			hr3 = element("hr");
			t21 = space();
			h46 = element("h4");
			h46.textContent = "Outline Color";
			t23 = space();
			div3 = element("div");
			t24 = space();
			div5 = element("div");
			h47 = element("h4");
			h47.textContent = "Pixelate";
			t26 = space();
			input5 = element("input");
			t27 = space();
			div7 = element("div");
			div6 = element("div");
			h48 = element("h4");
			h48.textContent = "Water Animation";
			t29 = space();
			create_component(toggle0.$$.fragment);
			t30 = space();
			div9 = element("div");
			div8 = element("div");
			h49 = element("h4");
			h49.textContent = "Light Cube Experiment";
			t32 = space();
			create_component(toggle1.$$.fragment);
			set_style(h40, "margin", "0");
			attr(h40, "class", "svelte-2t25z9");
			attr(div0, "id", "temp");
			attr(div0, "class", "svelte-2t25z9");
			attr(hr0, "class", "svelte-2t25z9");
			attr(h41, "class", "svelte-2t25z9");
			attr(input0, "aria-label", "Light Position Y");
			attr(input0, "name", "lightRotY");
			attr(input0, "type", "range");
			attr(input0, "min", 0);
			attr(input0, "max", 1);
			attr(input0, "step", ".01");
			set_style(input0, "background-size", /*$lightRotY*/ ctx[1] * 100 + "% 100%");
			attr(input0, "class", "svelte-2t25z9");
			attr(hr1, "class", "svelte-2t25z9");
			attr(h42, "class", "svelte-2t25z9");
			attr(input1, "aria-label", "Light Position X");
			attr(input1, "name", "lightRotX");
			attr(input1, "type", "range");
			attr(input1, "min", 0);
			attr(input1, "max", 1);
			attr(input1, "step", ".01");
			set_style(input1, "background-size", /*$lightRotX*/ ctx[2] * 100 + "% 100%");
			attr(input1, "class", "svelte-2t25z9");
			attr(div1, "class", "setting svelte-2t25z9");
			attr(h43, "class", "svelte-2t25z9");
			attr(input2, "aria-label", "Shadow Strength");
			attr(input2, "name", "shadowStrength");
			attr(input2, "type", "range");
			attr(input2, "min", 0);
			attr(input2, "max", 1);
			attr(input2, "step", ".01");
			set_style(input2, "background-size", /*$shadowStrength*/ ctx[3] * 100 + "% 100%");
			attr(input2, "class", "svelte-2t25z9");
			attr(hr2, "class", "svelte-2t25z9");
			attr(h44, "class", "svelte-2t25z9");
			attr(input3, "aria-label", "Shadow Blur");
			attr(input3, "name", "shadowBlur");
			attr(input3, "type", "range");
			attr(input3, "min", 0);
			attr(input3, "max", 1);
			attr(input3, "step", ".01");
			set_style(input3, "background-size", /*$shadowBlur*/ ctx[4] * 100 + "% 100%");
			attr(input3, "class", "svelte-2t25z9");
			attr(div2, "class", "setting svelte-2t25z9");
			attr(h45, "class", "svelte-2t25z9");
			attr(input4, "aria-label", "Outline Size");
			attr(input4, "name", "outlineSize");
			attr(input4, "type", "range");
			attr(input4, "min", 0);
			attr(input4, "max", 1);
			attr(input4, "step", ".01");
			set_style(input4, "background-size", /*$outlineSize*/ ctx[5] * 100 + "% 100%");
			attr(input4, "class", "svelte-2t25z9");
			attr(hr3, "class", "svelte-2t25z9");
			set_style(h46, "margin", "0");
			attr(h46, "class", "svelte-2t25z9");
			attr(div3, "id", "outline");
			attr(div3, "class", "svelte-2t25z9");
			attr(div4, "class", "setting svelte-2t25z9");
			attr(h47, "class", "svelte-2t25z9");
			attr(input5, "aria-label", "Pixelate");
			attr(input5, "name", "pixelSize");
			attr(input5, "type", "range");
			attr(input5, "min", 0);
			attr(input5, "max", 1);
			attr(input5, "step", ".01");
			set_style(input5, "background-size", /*$pixelSize*/ ctx[6] * 100 + "% 100%");
			attr(input5, "class", "svelte-2t25z9");
			attr(div5, "class", "setting svelte-2t25z9");
			set_style(h48, "margin", "0");
			attr(h48, "class", "svelte-2t25z9");
			attr(div6, "class", "toggle svelte-2t25z9");
			attr(div7, "class", "setting svelte-2t25z9");
			set_style(h49, "margin", "0");
			attr(h49, "class", "svelte-2t25z9");
			attr(div8, "class", "toggle svelte-2t25z9");
			attr(div9, "class", "setting last svelte-2t25z9");
			attr(container, "class", "svelte-2t25z9");
		},
		m(target, anchor) {
			insert(target, container, anchor);
			append(container, div1);
			append(div1, h40);
			append(div1, t1);
			append(div1, div0);
			append(div1, t2);
			append(div1, hr0);
			append(div1, t3);
			append(div1, h41);
			append(div1, t5);
			append(div1, input0);
			set_input_value(input0, /*$lightRotY*/ ctx[1]);
			append(div1, t6);
			append(div1, hr1);
			append(div1, t7);
			append(div1, h42);
			append(div1, t9);
			append(div1, input1);
			set_input_value(input1, /*$lightRotX*/ ctx[2]);
			append(container, t10);
			append(container, div2);
			append(div2, h43);
			append(div2, t12);
			append(div2, input2);
			set_input_value(input2, /*$shadowStrength*/ ctx[3]);
			append(div2, t13);
			append(div2, hr2);
			append(div2, t14);
			append(div2, h44);
			append(div2, t16);
			append(div2, input3);
			set_input_value(input3, /*$shadowBlur*/ ctx[4]);
			append(container, t17);
			append(container, div4);
			append(div4, h45);
			append(div4, t19);
			append(div4, input4);
			set_input_value(input4, /*$outlineSize*/ ctx[5]);
			append(div4, t20);
			append(div4, hr3);
			append(div4, t21);
			append(div4, h46);
			append(div4, t23);
			append(div4, div3);
			append(container, t24);
			append(container, div5);
			append(div5, h47);
			append(div5, t26);
			append(div5, input5);
			set_input_value(input5, /*$pixelSize*/ ctx[6]);
			append(container, t27);
			append(container, div7);
			append(div7, div6);
			append(div6, h48);
			append(div6, t29);
			mount_component(toggle0, div6, null);
			append(container, t30);
			append(container, div9);
			append(div9, div8);
			append(div8, h49);
			append(div8, t32);
			mount_component(toggle1, div8, null);
			current = true;

			if (!mounted) {
				dispose = [
					listen(input0, "change", /*input0_change_input_handler*/ ctx[9]),
					listen(input0, "input", /*input0_change_input_handler*/ ctx[9]),
					listen(input1, "change", /*input1_change_input_handler*/ ctx[10]),
					listen(input1, "input", /*input1_change_input_handler*/ ctx[10]),
					listen(input2, "change", /*input2_change_input_handler*/ ctx[11]),
					listen(input2, "input", /*input2_change_input_handler*/ ctx[11]),
					listen(input3, "change", /*input3_change_input_handler*/ ctx[12]),
					listen(input3, "input", /*input3_change_input_handler*/ ctx[12]),
					listen(input4, "change", /*input4_change_input_handler*/ ctx[13]),
					listen(input4, "input", /*input4_change_input_handler*/ ctx[13]),
					listen(input5, "change", /*input5_change_input_handler*/ ctx[14]),
					listen(input5, "input", /*input5_change_input_handler*/ ctx[14])
				];

				mounted = true;
			}
		},
		p(new_ctx, [dirty]) {
			ctx = new_ctx;

			if (!current || dirty & /*$lightRotY*/ 2) {
				set_style(input0, "background-size", /*$lightRotY*/ ctx[1] * 100 + "% 100%");
			}

			if (dirty & /*$lightRotY*/ 2) {
				set_input_value(input0, /*$lightRotY*/ ctx[1]);
			}

			if (!current || dirty & /*$lightRotX*/ 4) {
				set_style(input1, "background-size", /*$lightRotX*/ ctx[2] * 100 + "% 100%");
			}

			if (dirty & /*$lightRotX*/ 4) {
				set_input_value(input1, /*$lightRotX*/ ctx[2]);
			}

			if (!current || dirty & /*$shadowStrength*/ 8) {
				set_style(input2, "background-size", /*$shadowStrength*/ ctx[3] * 100 + "% 100%");
			}

			if (dirty & /*$shadowStrength*/ 8) {
				set_input_value(input2, /*$shadowStrength*/ ctx[3]);
			}

			if (!current || dirty & /*$shadowBlur*/ 16) {
				set_style(input3, "background-size", /*$shadowBlur*/ ctx[4] * 100 + "% 100%");
			}

			if (dirty & /*$shadowBlur*/ 16) {
				set_input_value(input3, /*$shadowBlur*/ ctx[4]);
			}

			if (!current || dirty & /*$outlineSize*/ 32) {
				set_style(input4, "background-size", /*$outlineSize*/ ctx[5] * 100 + "% 100%");
			}

			if (dirty & /*$outlineSize*/ 32) {
				set_input_value(input4, /*$outlineSize*/ ctx[5]);
			}

			if (!current || dirty & /*$pixelSize*/ 64) {
				set_style(input5, "background-size", /*$pixelSize*/ ctx[6] * 100 + "% 100%");
			}

			if (dirty & /*$pixelSize*/ 64) {
				set_input_value(input5, /*$pixelSize*/ ctx[6]);
			}

			const toggle0_changes = {};

			if (dirty & /*$animateWater*/ 128) toggle0_changes.name = /*$animateWater*/ ctx[7]
			? 'Animation Off'
			: 'Animation On';

			toggle0.$set(toggle0_changes);
			const toggle1_changes = {};

			if (dirty & /*$enableSun*/ 256) toggle1_changes.name = /*$enableSun*/ ctx[8]
			? 'Disable Experiment'
			: 'Enable Experiment';

			toggle1.$set(toggle1_changes);
		},
		i(local) {
			if (current) return;

			add_render_callback(() => {
				if (div0_outro) div0_outro.end(1);

				div0_intro = create_in_transition(div0, fade, {
					easing: cubicInOut,
					duration: 300,
					delay: 400
				});

				div0_intro.start();
			});

			if (!div1_intro) {
				add_render_callback(() => {
					div1_intro = create_in_transition(div1, fade, {
						easing: cubicInOut,
						duration: 300,
						delay: 400
					});

					div1_intro.start();
				});
			}

			if (!div2_intro) {
				add_render_callback(() => {
					div2_intro = create_in_transition(div2, fade, {
						easing: cubicInOut,
						duration: 300,
						delay: 400
					});

					div2_intro.start();
				});
			}

			add_render_callback(() => {
				if (div3_outro) div3_outro.end(1);

				div3_intro = create_in_transition(div3, fade, {
					easing: cubicInOut,
					duration: 300,
					delay: 400
				});

				div3_intro.start();
			});

			if (!div4_intro) {
				add_render_callback(() => {
					div4_intro = create_in_transition(div4, fade, {
						easing: cubicInOut,
						duration: 300,
						delay: 400
					});

					div4_intro.start();
				});
			}

			if (!div5_intro) {
				add_render_callback(() => {
					div5_intro = create_in_transition(div5, fade, {
						easing: cubicInOut,
						duration: 300,
						delay: 400
					});

					div5_intro.start();
				});
			}

			transition_in(toggle0.$$.fragment, local);

			if (!div7_intro) {
				add_render_callback(() => {
					div7_intro = create_in_transition(div7, fade, {
						easing: cubicInOut,
						duration: 300,
						delay: 400
					});

					div7_intro.start();
				});
			}

			transition_in(toggle1.$$.fragment, local);

			if (!div9_intro) {
				add_render_callback(() => {
					div9_intro = create_in_transition(div9, fade, {
						easing: cubicInOut,
						duration: 300,
						delay: 400
					});

					div9_intro.start();
				});
			}

			add_render_callback(() => {
				if (container_outro) container_outro.end(1);

				container_intro = create_in_transition(container, fade, {
					easing: cubicInOut,
					duration: 300,
					delay: 400
				});

				container_intro.start();
			});

			current = true;
		},
		o(local) {
			if (div0_intro) div0_intro.invalidate();

			div0_outro = create_out_transition(div0, fade, {
				duration: /*$DIM*/ ctx[0].w > 600 ? 200 : 0
			});

			if (div3_intro) div3_intro.invalidate();

			div3_outro = create_out_transition(div3, fade, {
				duration: /*$DIM*/ ctx[0].w > 600 ? 200 : 0
			});

			transition_out(toggle0.$$.fragment, local);
			transition_out(toggle1.$$.fragment, local);
			if (container_intro) container_intro.invalidate();

			container_outro = create_out_transition(container, fade, {
				duration: /*$DIM*/ ctx[0].w > 600 ? 200 : 0
			});

			current = false;
		},
		d(detaching) {
			if (detaching) detach(container);
			if (detaching && div0_outro) div0_outro.end();
			if (detaching && div3_outro) div3_outro.end();
			destroy_component(toggle0);
			destroy_component(toggle1);
			if (detaching && container_outro) container_outro.end();
			mounted = false;
			run_all(dispose);
		}
	};
}

function instance$d($$self, $$props, $$invalidate) {
	let $outlineColor;
	let $lightColor;
	let $DIM;
	let $lightRotY;
	let $lightRotX;
	let $shadowStrength;
	let $shadowBlur;
	let $outlineSize;
	let $pixelSize;
	let $animateWater;
	let $enableSun;
	component_subscribe($$self, outlineColor, $$value => $$invalidate(17, $outlineColor = $$value));
	component_subscribe($$self, lightColor, $$value => $$invalidate(18, $lightColor = $$value));
	component_subscribe($$self, DIM, $$value => $$invalidate(0, $DIM = $$value));
	component_subscribe($$self, lightRotY, $$value => $$invalidate(1, $lightRotY = $$value));
	component_subscribe($$self, lightRotX, $$value => $$invalidate(2, $lightRotX = $$value));
	component_subscribe($$self, shadowStrength, $$value => $$invalidate(3, $shadowStrength = $$value));
	component_subscribe($$self, shadowBlur, $$value => $$invalidate(4, $shadowBlur = $$value));
	component_subscribe($$self, outlineSize, $$value => $$invalidate(5, $outlineSize = $$value));
	component_subscribe($$self, pixelSize, $$value => $$invalidate(6, $pixelSize = $$value));
	component_subscribe($$self, animateWater, $$value => $$invalidate(7, $animateWater = $$value));
	component_subscribe($$self, enableSun, $$value => $$invalidate(8, $enableSun = $$value));
	let tempPicker;
	let outlinePicker;

	onMount(() => {
		tempPicker = new iro$1.ColorPicker("#temp",
		{
				color: $lightColor,
				layout: [
					{ component: iro$1.ui.Box },
					{
						component: iro$1.ui.Slider,
						options: {
							// can also be 'saturation', 'value', 'red', 'green', 'blue', 'alpha' or 'kelvin'
							sliderType: 'hue',
							sliderSize: 40
						}
					}
				],
				layoutDirection: "horizontal",
				display: 'flex',
				width: 150,
				boxheight: 150,
				borderWidth: 0,
				borderColor: "var(--offblack)"
			});

		tempPicker.forceUpdate();

		tempPicker.on('color:change', function (color) {
			lightColor.set(color.hexString);
			lightIntensity.set(color.value / 100);
		});

		outlinePicker = new iro$1.ColorPicker("#outline",
		{
				color: $outlineColor,
				layout: [{ component: iro$1.ui.Wheel }],
				layoutDirection: "horizontal",
				display: 'flex',
				width: 150,
				boxheight: 150,
				borderWidth: 0,
				borderColor: "var(--offblack)"
			});

		outlinePicker.forceUpdate();

		outlinePicker.on('color:change', function (color) {
			outlineColor.set(color.hexString);
		});
	});

	function input0_change_input_handler() {
		$lightRotY = to_number(this.value);
		lightRotY.set($lightRotY);
	}

	function input1_change_input_handler() {
		$lightRotX = to_number(this.value);
		lightRotX.set($lightRotX);
	}

	function input2_change_input_handler() {
		$shadowStrength = to_number(this.value);
		shadowStrength.set($shadowStrength);
	}

	function input3_change_input_handler() {
		$shadowBlur = to_number(this.value);
		shadowBlur.set($shadowBlur);
	}

	function input4_change_input_handler() {
		$outlineSize = to_number(this.value);
		outlineSize.set($outlineSize);
	}

	function input5_change_input_handler() {
		$pixelSize = to_number(this.value);
		pixelSize.set($pixelSize);
	}

	return [
		$DIM,
		$lightRotY,
		$lightRotX,
		$shadowStrength,
		$shadowBlur,
		$outlineSize,
		$pixelSize,
		$animateWater,
		$enableSun,
		input0_change_input_handler,
		input1_change_input_handler,
		input2_change_input_handler,
		input3_change_input_handler,
		input4_change_input_handler,
		input5_change_input_handler
	];
}

class Sub_nav_lights extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$d, create_fragment$d, safe_not_equal, {});
	}
}

var sub_nav_extra_svelte_svelte_type_style_lang = '';

/* src/ui/sub_nav.extra.svelte generated by Svelte v3.46.4 */

function get_each_context$1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[4] = list[i];
	child_ctx[6] = i;
	return child_ctx;
}

// (33:6) {#each $profiles.user.model.extractedParts as part, i (part)}
function create_each_block$1(key_1, ctx) {
	let p;
	let t_value = /*part*/ ctx[4].name + "";
	let t;
	let mounted;
	let dispose;

	function click_handler() {
		return /*click_handler*/ ctx[3](/*part*/ ctx[4]);
	}

	return {
		key: key_1,
		first: null,
		c() {
			p = element("p");
			t = text(t_value);
			attr(p, "class", "part svelte-11z4t61");
			toggle_class(p, "visible", /*part*/ ctx[4].visible);
			this.first = p;
		},
		m(target, anchor) {
			insert(target, p, anchor);
			append(p, t);

			if (!mounted) {
				dispose = listen(p, "click", click_handler);
				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;
			if (dirty & /*$profiles*/ 1 && t_value !== (t_value = /*part*/ ctx[4].name + "")) set_data(t, t_value);

			if (dirty & /*$profiles*/ 1) {
				toggle_class(p, "visible", /*part*/ ctx[4].visible);
			}
		},
		d(detaching) {
			if (detaching) detach(p);
			mounted = false;
			dispose();
		}
	};
}

function create_fragment$c(ctx) {
	let container;
	let div0;
	let h2;
	let t0_value = /*$profiles*/ ctx[0].user.model.name + "";
	let t0;
	let t1;
	let p;
	let div0_intro;
	let div0_outro;
	let t4;
	let div1;
	let each_blocks = [];
	let each_1_lookup = new Map();
	let div1_intro;
	let div1_outro;
	let container_intro;
	let container_outro;
	let current;
	let each_value = /*$profiles*/ ctx[0].user.model.extractedParts;
	const get_key = ctx => /*part*/ ctx[4];

	for (let i = 0; i < each_value.length; i += 1) {
		let child_ctx = get_each_context$1(ctx, each_value, i);
		let key = get_key(child_ctx);
		each_1_lookup.set(key, each_blocks[i] = create_each_block$1(key, child_ctx));
	}

	return {
		c() {
			container = element("container");
			div0 = element("div");
			h2 = element("h2");
			t0 = text(t0_value);
			t1 = space();
			p = element("p");

			p.innerHTML = `Show/hide clothes, accessories, or body parts.
          <b>Label names come directly from the model file.</b>`;

			t4 = space();
			div1 = element("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			attr(h2, "class", "svelte-11z4t61");
			attr(p, "class", "info svelte-11z4t61");
			attr(div0, "class", "setting svelte-11z4t61");
			attr(div1, "class", "setting tabs svelte-11z4t61");
			attr(container, "class", "svelte-11z4t61");
		},
		m(target, anchor) {
			insert(target, container, anchor);
			append(container, div0);
			append(div0, h2);
			append(h2, t0);
			append(div0, t1);
			append(div0, p);
			append(container, t4);
			append(container, div1);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div1, null);
			}

			current = true;
		},
		p(new_ctx, [dirty]) {
			ctx = new_ctx;
			if ((!current || dirty & /*$profiles*/ 1) && t0_value !== (t0_value = /*$profiles*/ ctx[0].user.model.name + "")) set_data(t0, t0_value);

			if (dirty & /*$profiles, toggleVisibility*/ 5) {
				each_value = /*$profiles*/ ctx[0].user.model.extractedParts;
				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, div1, destroy_block, create_each_block$1, null, get_each_context$1);
			}
		},
		i(local) {
			if (current) return;

			add_render_callback(() => {
				if (div0_outro) div0_outro.end(1);

				div0_intro = create_in_transition(div0, fade, {
					easing: cubicInOut,
					duration: 300,
					delay: 400
				});

				div0_intro.start();
			});

			add_render_callback(() => {
				if (div1_outro) div1_outro.end(1);

				div1_intro = create_in_transition(div1, fade, {
					easing: cubicInOut,
					duration: 300,
					delay: 400
				});

				div1_intro.start();
			});

			add_render_callback(() => {
				if (container_outro) container_outro.end(1);

				container_intro = create_in_transition(container, fade, {
					easing: cubicInOut,
					duration: 300,
					delay: 400
				});

				container_intro.start();
			});

			current = true;
		},
		o(local) {
			if (div0_intro) div0_intro.invalidate();
			div0_outro = create_out_transition(div0, fade, { duration: 0 });
			if (div1_intro) div1_intro.invalidate();
			div1_outro = create_out_transition(div1, fade, { duration: 0 });
			if (container_intro) container_intro.invalidate();

			container_outro = create_out_transition(container, fade, {
				duration: /*$DIM*/ ctx[1].w > 600 ? 200 : 0
			});

			current = false;
		},
		d(detaching) {
			if (detaching) detach(container);
			if (detaching && div0_outro) div0_outro.end();

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].d();
			}

			if (detaching && div1_outro) div1_outro.end();
			if (detaching && container_outro) container_outro.end();
		}
	};
}

function instance$c($$self, $$props, $$invalidate) {
	let $profiles;
	let $DIM;
	component_subscribe($$self, profiles, $$value => $$invalidate(0, $profiles = $$value));
	component_subscribe($$self, DIM, $$value => $$invalidate(1, $DIM = $$value));

	const toggleVisibility = part => {
		part.visible = !part.visible;
		profiles.set($profiles);
	};

	const click_handler = part => {
		toggleVisibility(part);
	};

	return [$profiles, $DIM, toggleVisibility, click_handler];
}

class Sub_nav_extra extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$c, create_fragment$c, safe_not_equal, {});
	}
}

var sub_nav_svelte_svelte_type_style_lang = '';

/* src/ui/sub_nav.svelte generated by Svelte v3.46.4 */

function create_default_slot$2(ctx) {
	let style;
	let t1;
	let path;

	return {
		c() {
			style = element("style");
			style.textContent = "svg{\n        pointer-events:none;\n      }";
			t1 = space();
			path = svg_element("path");
			attr(path, "class", "shape-overlays__path");
			attr(path, "fill", /*theme*/ ctx[3]);
		},
		m(target, anchor) {
			insert(target, style, anchor);
			insert(target, t1, anchor);
			insert(target, path, anchor);
		},
		p(ctx, dirty) {
			if (dirty & /*theme*/ 8) {
				attr(path, "fill", /*theme*/ ctx[3]);
			}
		},
		d(detaching) {
			if (detaching) detach(style);
			if (detaching) detach(t1);
			if (detaching) detach(path);
		}
	};
}

// (237:4) {:else}
function create_else_block$1(ctx) {
	return {
		c: noop,
		m: noop,
		i: noop,
		o: noop,
		d: noop
	};
}

// (235:34) 
function create_if_block_6(ctx) {
	let extra;
	let current;
	extra = new Sub_nav_extra({});

	return {
		c() {
			create_component(extra.$$.fragment);
		},
		m(target, anchor) {
			mount_component(extra, target, anchor);
			current = true;
		},
		i(local) {
			if (current) return;
			transition_in(extra.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(extra.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(extra, detaching);
		}
	};
}

// (233:36) 
function create_if_block_5(ctx) {
	let lights;
	let current;
	lights = new Sub_nav_lights({});

	return {
		c() {
			create_component(lights.$$.fragment);
		},
		m(target, anchor) {
			mount_component(lights, target, anchor);
			current = true;
		},
		i(local) {
			if (current) return;
			transition_in(lights.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(lights.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(lights, detaching);
		}
	};
}

// (231:38) 
function create_if_block_4$1(ctx) {
	let settings;
	let current;
	settings = new Sub_nav_settings({});

	return {
		c() {
			create_component(settings.$$.fragment);
		},
		m(target, anchor) {
			mount_component(settings, target, anchor);
			current = true;
		},
		i(local) {
			if (current) return;
			transition_in(settings.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(settings.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(settings, detaching);
		}
	};
}

// (229:33) 
function create_if_block_3$1(ctx) {
	let call;
	let current;
	call = new Sub_nav_call({});

	return {
		c() {
			create_component(call.$$.fragment);
		},
		m(target, anchor) {
			mount_component(call, target, anchor);
			current = true;
		},
		i(local) {
			if (current) return;
			transition_in(call.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(call.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(call, detaching);
		}
	};
}

// (227:36) 
function create_if_block_2$1(ctx) {
	let stickerlist;
	let current;
	stickerlist = new Sub_nav_sticker({});

	return {
		c() {
			create_component(stickerlist.$$.fragment);
		},
		m(target, anchor) {
			mount_component(stickerlist, target, anchor);
			current = true;
		},
		i(local) {
			if (current) return;
			transition_in(stickerlist.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(stickerlist.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(stickerlist, detaching);
		}
	};
}

// (225:31) 
function create_if_block_1$3(ctx) {
	let bglist;
	let current;
	bglist = new Sub_nav_bg({});

	return {
		c() {
			create_component(bglist.$$.fragment);
		},
		m(target, anchor) {
			mount_component(bglist, target, anchor);
			current = true;
		},
		i(local) {
			if (current) return;
			transition_in(bglist.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(bglist.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(bglist, detaching);
		}
	};
}

// (223:3) {#if selected === 'char'}
function create_if_block$4(ctx) {
	let charlist;
	let current;
	charlist = new Sub_nav_char({});

	return {
		c() {
			create_component(charlist.$$.fragment);
		},
		m(target, anchor) {
			mount_component(charlist, target, anchor);
			current = true;
		},
		i(local) {
			if (current) return;
			transition_in(charlist.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(charlist.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(charlist, detaching);
		}
	};
}

function create_fragment$b(ctx) {
	let container;
	let button;
	let t3;
	let div0;
	let t4;
	let section;
	let svgwipe;
	let t5;
	let div1;
	let current_block_type_index;
	let if_block;
	let container_class_value;
	let t6;
	let ftue;
	let current;
	let mounted;
	let dispose;

	let svgwipe_props = {
		$$slots: { default: [create_default_slot$2] },
		$$scope: { ctx }
	};

	svgwipe = new SVGWipe({ props: svgwipe_props });
	/*svgwipe_binding*/ ctx[7](svgwipe);

	const if_block_creators = [
		create_if_block$4,
		create_if_block_1$3,
		create_if_block_2$1,
		create_if_block_3$1,
		create_if_block_4$1,
		create_if_block_5,
		create_if_block_6,
		create_else_block$1
	];

	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*selected*/ ctx[0] === 'char') return 0;
		if (/*selected*/ ctx[0] === 'bg') return 1;
		if (/*selected*/ ctx[0] === 'sticker') return 2;
		if (/*selected*/ ctx[0] === 'call') return 3;
		if (/*selected*/ ctx[0] === 'settings') return 4;
		if (/*selected*/ ctx[0] === 'lights') return 5;
		if (/*selected*/ ctx[0] === 'exp') return 6;
		return 7;
	}

	current_block_type_index = select_block_type(ctx);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	ftue = new Ftue({
			props: {
				selected: /*selected*/ ctx[0],
				style: /*customVars*/ ctx[4]
			}
		});

	return {
		c() {
			container = element("container");
			button = element("button");

			button.innerHTML = `<i class="kalicon notranslate fill small svelte-buekxu">jellyfill</i> 
    <i class="kalicon notranslate solid small">close</i>`;

			t3 = space();
			div0 = element("div");
			t4 = space();
			section = element("section");
			create_component(svgwipe.$$.fragment);
			t5 = space();
			div1 = element("div");
			if_block.c();
			t6 = space();
			create_component(ftue.$$.fragment);
			attr(button, "class", "subnav-close svelte-buekxu");
			attr(div0, "class", "nav-touch no_highlights svelte-buekxu");
			attr(section, "class", "svelte-buekxu");
			attr(div1, "class", "content svelte-buekxu");
			attr(container, "class", container_class_value = "subnav " + (!/*selected*/ ctx[0] ? 'hide' : '') + " " + (/*sideSelected*/ ctx[1] ? 'dim' : '') + " svelte-buekxu");
			attr(container, "style", /*customVars*/ ctx[4]);
			attr(container, "data-dragging", "false");
			attr(container, "data-status", "waitiing");
		},
		m(target, anchor) {
			insert(target, container, anchor);
			append(container, button);
			append(container, t3);
			append(container, div0);
			append(container, t4);
			append(container, section);
			mount_component(svgwipe, section, null);
			append(container, t5);
			append(container, div1);
			if_blocks[current_block_type_index].m(div1, null);
			/*container_binding*/ ctx[8](container);
			insert(target, t6, anchor);
			mount_component(ftue, target, anchor);
			current = true;

			if (!mounted) {
				dispose = listen(button, "click", /*close*/ ctx[5]);
				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			const svgwipe_changes = {};

			if (dirty & /*$$scope, theme*/ 262152) {
				svgwipe_changes.$$scope = { dirty, ctx };
			}

			svgwipe.$set(svgwipe_changes);
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index !== previous_block_index) {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				}

				transition_in(if_block, 1);
				if_block.m(div1, null);
			}

			if (!current || dirty & /*selected, sideSelected*/ 3 && container_class_value !== (container_class_value = "subnav " + (!/*selected*/ ctx[0] ? 'hide' : '') + " " + (/*sideSelected*/ ctx[1] ? 'dim' : '') + " svelte-buekxu")) {
				attr(container, "class", container_class_value);
			}

			if (!current || dirty & /*customVars*/ 16) {
				attr(container, "style", /*customVars*/ ctx[4]);
			}

			const ftue_changes = {};
			if (dirty & /*selected*/ 1) ftue_changes.selected = /*selected*/ ctx[0];
			if (dirty & /*customVars*/ 16) ftue_changes.style = /*customVars*/ ctx[4];
			ftue.$set(ftue_changes);
		},
		i(local) {
			if (current) return;
			transition_in(svgwipe.$$.fragment, local);
			transition_in(if_block);
			transition_in(ftue.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(svgwipe.$$.fragment, local);
			transition_out(if_block);
			transition_out(ftue.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(container);
			/*svgwipe_binding*/ ctx[7](null);
			destroy_component(svgwipe);
			if_blocks[current_block_type_index].d();
			/*container_binding*/ ctx[8](null);
			if (detaching) detach(t6);
			destroy_component(ftue, detaching);
			mounted = false;
			dispose();
		}
	};
}

let wipeComponent = null;
const interactThreshold$1 = 100;

function instance$b($$self, $$props, $$invalidate) {
	let $DIM;
	component_subscribe($$self, DIM, $$value => $$invalidate(12, $DIM = $$value));
	let { selected = null } = $$props;
	let { sideSelected = null } = $$props;
	let { forceClose = false } = $$props;
	let subnav;
	let theme = 'var(--iconbg)';
	let customVars = '';
	let maxY = 300;
	let x = 0, y = 0;

	const openClose = () => {
		if (wipeComponent.isOpen) {
			if (!selected || selected === "close") {
				close();
			}
		} else if (!wipeComponent.isOpen) {
			open();
		}
	};

	const close = () => {
		updateFtue(selected);
		let isMobile = $DIM.w < 600;

		wipeComponent.animate({
			action: 'close',
			axis: isMobile ? 'y' : 'x',
			_flip: isMobile ? false : true,
			_curve: "curve",
			_numPoints: 5,
			_duration: isMobile ? 0 : 600
		});

		$$invalidate(0, selected = null);
		$$invalidate(6, forceClose = false);
	};

	const open = () => {
		let isMobile = $DIM.w < 600;

		wipeComponent.animate({
			action: 'open',
			axis: isMobile ? 'y' : 'x',
			_curve: "cuve",
			_flip: isMobile ? true : false,
			_numPoints: 5,
			_duration: 600
		});

		$$invalidate(6, forceClose = false);
	};

	function dragMoveListener(event) {
		event.preventDefault();

		// keep the dragged position in the custom properties
		x = (getCSSCustomProp('--container-x', subnav, 'float') || 0) + event.dx;

		y = (getCSSCustomProp('--container-y', subnav, 'float') || 0) + event.dy;
		if (x > 0) x = 0;
		if (y < 0) y = 0;

		// update styles
		subnav.setAttribute('data-status', '');

		subnav.style.setProperty('--container-x', x + 'px');
		subnav.style.setProperty('--container-y', y + 'px');
	}

	function transitionListener(e) {
		if (e.propertyName === 'transform') {
			subnav.setAttribute('data-status', 'waiting');
			subnav.removeEventListener('transitionend', transitionListener);
			subnav.style.setProperty('--container-x', '0px');
			subnav.style.setProperty('--container-y', '0px');
			close();
		}
	}

	const closeMobile = () => {
		y = maxY;
		subnav.setAttribute('data-status', 'transition');

		// mark as done after CSS transition
		subnav.addEventListener('transitionend', transitionListener);

		subnav.style.setProperty('--container-y', y + 'px');
		$$invalidate(6, forceClose = false);
	};

	onMount(() => {
		interact('.subnav[data-dragging="false"] .nav-touch').on('tap', closeMobile);

		interact('.subnav[data-dragging="false"] .nav-touch').draggable({
			onstart: () => {
				// signify dragging
				subnav.setAttribute('data-dragging', true);
			},
			onmove: dragMoveListener,
			onend: event => {
				subnav.setAttribute('data-dragging', false);

				// calculate how far card moved
				let moved = Math.sqrt(Math.pow(event.pageX - event.x0, 2) + Math.pow(event.pageY - event.y0, 2) | 0);

				if (moved > interactThreshold$1) {
					y = maxY;
					subnav.setAttribute('data-status', 'transition');

					// mark as done after CSS transition
					subnav.addEventListener('transitionend', transitionListener);
				} else {
					// reset vars
					x = 0;

					y = 0;
				}

				// update x and y pos
				subnav.style.setProperty('--container-x', x + 'px');

				subnav.style.setProperty('--container-y', y + 'px');
			}
		});
	});

	function svgwipe_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			wipeComponent = $$value;
		});
	}

	function container_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			subnav = $$value;
			$$invalidate(2, subnav);
		});
	}

	$$self.$$set = $$props => {
		if ('selected' in $$props) $$invalidate(0, selected = $$props.selected);
		if ('sideSelected' in $$props) $$invalidate(1, sideSelected = $$props.sideSelected);
		if ('forceClose' in $$props) $$invalidate(6, forceClose = $$props.forceClose);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*selected*/ 1) {
			{
				subNavExpanded.set(selected);
			}
		}

		if ($$self.$$.dirty & /*selected*/ 1) {
			{
				if (selected && wipeComponent) {
					openClose();
				}
			}
		}

		if ($$self.$$.dirty & /*forceClose*/ 64) {
			{
				if (forceClose) {
					closeMobile();
				}
			}
		}

		if ($$self.$$.dirty & /*selected*/ 1) {
			{
				switch (selected) {
					case 'char':
						$$invalidate(3, theme = 'var(--darkgrey)');
						$$invalidate(4, customVars = "--container-w-d:180px;--container-h-m:260px;");
						maxY = 260;
						break;
					case 'call':
						$$invalidate(3, theme = 'var(--darkgrey)');
						$$invalidate(4, customVars = "--container-w-d:360px;--container-h-m:360px;");
						maxY = 360;
						break;
					case 'bg':
						$$invalidate(3, theme = 'var(--darkgrey)');
						$$invalidate(4, customVars = "--container-w-d:180px;--container-h-m:260px;");
						maxY = 260;
						break;
					case 'sticker':
						$$invalidate(3, theme = 'var(--darkgrey)');
						$$invalidate(4, customVars = "--container-w-d:180px;");
						maxY = 210;
						break;
					case 'settings':
						$$invalidate(3, theme = 'var(--darkgrey)');
						$$invalidate(4, customVars = "--container-w-d:360px;--container-h-m:360px;");
						maxY = 360;
						break;
					case 'lights':
						$$invalidate(3, theme = 'var(--darkgrey)');
						$$invalidate(4, customVars = "--container-w-d:320px;--container-h-m:360px;");
						maxY = 360;
						break;
					case 'exp':
						$$invalidate(4, customVars = "--container-w-d:270px;--container-h-m:300px;");
						$$invalidate(3, theme = 'var(--darkgrey)');
						maxY = 300;
						break;
				}
			}
		}
	};

	return [
		selected,
		sideSelected,
		subnav,
		theme,
		customVars,
		close,
		forceClose,
		svgwipe_binding,
		container_binding
	];
}

class Sub_nav extends SvelteComponent {
	constructor(options) {
		super();

		init(this, options, instance$b, create_fragment$b, safe_not_equal, {
			selected: 0,
			sideSelected: 1,
			forceClose: 6
		});
	}
}

var svgBlob_svelte_svelte_type_style_lang = '';

/* src/ui/svgBlob.svelte generated by Svelte v3.46.4 */

function create_fragment$a(ctx) {
	let svg;
	let g;
	let circle0;
	let circle1;
	let circle2;
	let circle3;
	let circle4;
	let circle5;
	let circle6;
	let circle7;
	let defs;
	let filter;
	let feGaussianBlur;
	let feColorMatrix;

	return {
		c() {
			svg = svg_element("svg");
			g = svg_element("g");
			circle0 = svg_element("circle");
			circle1 = svg_element("circle");
			circle2 = svg_element("circle");
			circle3 = svg_element("circle");
			circle4 = svg_element("circle");
			circle5 = svg_element("circle");
			circle6 = svg_element("circle");
			circle7 = svg_element("circle");
			defs = svg_element("defs");
			filter = svg_element("filter");
			feGaussianBlur = svg_element("feGaussianBlur");
			feColorMatrix = svg_element("feColorMatrix");
			attr(circle0, "id", "circle1");
			attr(circle0, "cx", "328");
			attr(circle0, "cy", "304");
			attr(circle0, "r", "174");
			attr(circle0, "fill", /*fill*/ ctx[1]);
			attr(circle0, "class", "svelte-ialess");
			attr(circle1, "id", "circle2");
			attr(circle1, "class", "main svelte-ialess");
			attr(circle1, "cx", "120.5");
			attr(circle1, "cy", "405.5");
			attr(circle1, "r", "90");
			attr(circle1, "fill", /*fill*/ ctx[1]);
			attr(circle2, "id", "circle2_3");
			attr(circle2, "class", "filler svelte-ialess");
			attr(circle2, "cx", "120.5");
			attr(circle2, "cy", "337.5");
			attr(circle2, "r", "76.5");
			attr(circle2, "fill", /*fill*/ ctx[1]);
			attr(circle3, "id", "circle3");
			attr(circle3, "class", "main svelte-ialess");
			attr(circle3, "cx", "88.5");
			attr(circle3, "cy", "234.5");
			attr(circle3, "r", "90");
			attr(circle3, "fill", /*fill*/ ctx[1]);
			attr(circle4, "id", "circle3_4");
			attr(circle4, "class", "filler svelte-ialess");
			attr(circle4, "cx", "175.52");
			attr(circle4, "cy", "180.5");
			attr(circle4, "r", "76.5");
			attr(circle4, "fill", /*fill*/ ctx[1]);
			attr(circle5, "id", "circle4");
			attr(circle5, "class", "main svelte-ialess");
			attr(circle5, "cx", "210.5");
			attr(circle5, "cy", "92.5");
			attr(circle5, "r", "90");
			attr(circle5, "fill", /*fill*/ ctx[1]);
			attr(circle6, "id", "circle4_5");
			attr(circle6, "class", "filler svelte-ialess");
			attr(circle6, "cx", "304.52");
			attr(circle6, "cy", "119.5");
			attr(circle6, "r", "76.5");
			attr(circle6, "fill", /*fill*/ ctx[1]);
			attr(circle7, "id", "circle5");
			attr(circle7, "class", "main svelte-ialess");
			attr(circle7, "cx", "398.5");
			attr(circle7, "cy", "88.5");
			attr(circle7, "r", "90");
			attr(circle7, "fill", /*fill*/ ctx[1]);
			attr(g, "filter", "url(#filter0_b)");
			attr(feGaussianBlur, "in", "SourceGraphic");
			attr(feGaussianBlur, "stdDeviation", "24.5");
			attr(feGaussianBlur, "result", "blur");
			attr(feColorMatrix, "id", "colorMatrixElement");
			attr(feColorMatrix, "in", "blur");
			attr(feColorMatrix, "mode", "matrix");
			attr(feColorMatrix, "values", "1 0 0 0 0 \n                                                                         0 1 0 0 0 \n                                                                         0 0 1 0 0 \n                                                                         0 0 0 25 -15");
			attr(feColorMatrix, "result", "matrix");
			attr(filter, "id", "filter0_b");
			attr(filter, "x", "-49");
			attr(filter, "y", "-49");
			attr(filter, "width", "600");
			attr(filter, "height", "592");
			attr(filter, "filterUnits", "userSpaceOnUse");
			attr(filter, "color-interpolation-filters", "sRGB");
			attr(svg, "width", "502");
			attr(svg, "height", "494");
			attr(svg, "viewBox", "0 0 502 494");
			attr(svg, "fill", "none");
			attr(svg, "xmlns", "http://www.w3.org/2000/svg");
			attr(svg, "class", "svelte-ialess");
			toggle_class(svg, "hide", /*hide*/ ctx[0]);
		},
		m(target, anchor) {
			insert(target, svg, anchor);
			append(svg, g);
			append(g, circle0);
			append(g, circle1);
			append(g, circle2);
			append(g, circle3);
			append(g, circle4);
			append(g, circle5);
			append(g, circle6);
			append(g, circle7);
			append(svg, defs);
			append(defs, filter);
			append(filter, feGaussianBlur);
			append(filter, feColorMatrix);
		},
		p(ctx, [dirty]) {
			if (dirty & /*fill*/ 2) {
				attr(circle0, "fill", /*fill*/ ctx[1]);
			}

			if (dirty & /*fill*/ 2) {
				attr(circle1, "fill", /*fill*/ ctx[1]);
			}

			if (dirty & /*fill*/ 2) {
				attr(circle2, "fill", /*fill*/ ctx[1]);
			}

			if (dirty & /*fill*/ 2) {
				attr(circle3, "fill", /*fill*/ ctx[1]);
			}

			if (dirty & /*fill*/ 2) {
				attr(circle4, "fill", /*fill*/ ctx[1]);
			}

			if (dirty & /*fill*/ 2) {
				attr(circle5, "fill", /*fill*/ ctx[1]);
			}

			if (dirty & /*fill*/ 2) {
				attr(circle6, "fill", /*fill*/ ctx[1]);
			}

			if (dirty & /*fill*/ 2) {
				attr(circle7, "fill", /*fill*/ ctx[1]);
			}

			if (dirty & /*hide*/ 1) {
				toggle_class(svg, "hide", /*hide*/ ctx[0]);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(svg);
		}
	};
}

function instance$a($$self, $$props, $$invalidate) {
	let { hide = false } = $$props;
	let { fill = "#2E525F" } = $$props;

	$$self.$$set = $$props => {
		if ('hide' in $$props) $$invalidate(0, hide = $$props.hide);
		if ('fill' in $$props) $$invalidate(1, fill = $$props.fill);
	};

	return [hide, fill];
}

class SvgBlob extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$a, create_fragment$a, safe_not_equal, { hide: 0, fill: 1 });
	}
}

var svgBlobSmall_svelte_svelte_type_style_lang = '';

/* src/ui/svgBlobSmall.svelte generated by Svelte v3.46.4 */

function create_fragment$9(ctx) {
	let svg;
	let g;
	let circle0;
	let circle1;
	let defs;
	let filter;
	let feGaussianBlur;
	let feColorMatrix;

	return {
		c() {
			svg = svg_element("svg");
			g = svg_element("g");
			circle0 = svg_element("circle");
			circle1 = svg_element("circle");
			defs = svg_element("defs");
			filter = svg_element("filter");
			feGaussianBlur = svg_element("feGaussianBlur");
			feColorMatrix = svg_element("feColorMatrix");
			attr(circle0, "cx", "247.387");
			attr(circle0, "cy", "247.387");
			attr(circle0, "r", "247.387");
			attr(circle0, "fill", /*fill*/ ctx[1]);
			attr(circle0, "class", "svelte-9a5upb");
			attr(circle1, "cx", "572");
			attr(circle1, "cy", "143");
			attr(circle1, "r", "161");
			attr(circle1, "fill", /*fill*/ ctx[1]);
			attr(circle1, "class", "svelte-9a5upb");
			attr(g, "filter", "url(#filter0_c)");
			attr(feGaussianBlur, "in", "SourceGraphic");
			attr(feGaussianBlur, "stdDeviation", "24.5");
			attr(feGaussianBlur, "result", "blur");
			attr(feColorMatrix, "id", "colorMatrixElement");
			attr(feColorMatrix, "in", "blur");
			attr(feColorMatrix, "mode", "matrix");
			attr(feColorMatrix, "values", "1 0 0 0 0 \n                                                                             0 1 0 0 0 \n                                                                             0 0 1 0 0 \n                                                                             0 0 0 25 -15");
			attr(feColorMatrix, "result", "matrix");
			attr(filter, "id", "filter0_c");
			attr(filter, "x", "-107.297");
			attr(filter, "y", "-107.297");
			attr(filter, "width", "898.775");
			attr(filter, "height", "709.368");
			attr(filter, "filterUnits", "userSpaceOnUse");
			attr(filter, "color-interpolation-filters", "sRGB");
			attr(svg, "width", "685");
			attr(svg, "height", "495");
			attr(svg, "viewBox", "0 0 685 495");
			attr(svg, "fill", "none");
			attr(svg, "xmlns", "http://www.w3.org/2000/svg");
			attr(svg, "class", "svelte-9a5upb");
			toggle_class(svg, "hide", /*hide*/ ctx[0]);
		},
		m(target, anchor) {
			insert(target, svg, anchor);
			append(svg, g);
			append(g, circle0);
			append(g, circle1);
			append(svg, defs);
			append(defs, filter);
			append(filter, feGaussianBlur);
			append(filter, feColorMatrix);
		},
		p(ctx, [dirty]) {
			if (dirty & /*fill*/ 2) {
				attr(circle0, "fill", /*fill*/ ctx[1]);
			}

			if (dirty & /*fill*/ 2) {
				attr(circle1, "fill", /*fill*/ ctx[1]);
			}

			if (dirty & /*hide*/ 1) {
				toggle_class(svg, "hide", /*hide*/ ctx[0]);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(svg);
		}
	};
}

function instance$9($$self, $$props, $$invalidate) {
	let { hide = false } = $$props;
	let { fill = "#2E525F" } = $$props;

	$$self.$$set = $$props => {
		if ('hide' in $$props) $$invalidate(0, hide = $$props.hide);
		if ('fill' in $$props) $$invalidate(1, fill = $$props.fill);
	};

	return [hide, fill];
}

class SvgBlobSmall extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$9, create_fragment$9, safe_not_equal, { hide: 0, fill: 1 });
	}
}

var svgOrientation_svelte_svelte_type_style_lang = '';

/* src/ui/svgOrientation.svelte generated by Svelte v3.46.4 */

function create_if_block_1$2(ctx) {
	let g;
	let path0;
	let path1;
	let g_intro;
	let g_outro;
	let current;

	return {
		c() {
			g = svg_element("g");
			path0 = svg_element("path");
			path1 = svg_element("path");
			attr(path0, "opacity", "0.5");
			attr(path0, "d", "M90.5209 75.8114H64.3093C62.0367 70.1726 43.7778 22.3603 43.7778 22.3603C53.7299 16.2263 65.4519 12.6875 78.0005 12.6875C90.6603 12.6875 102.479 16.2893 112.487 22.524C112.487 22.524 92.7552 70.5563 90.5209 75.8114Z");
			attr(path0, "fill", "url(#paint0_radial)");
			attr(path0, "class", "svelte-1qaakgn");
			attr(path1, "fill-rule", "evenodd");
			attr(path1, "clip-rule", "evenodd");
			attr(path1, "d", "M44.3982 23.9551C54.1487 17.8795 65.6622 14.3694 78.0006 14.3694C90.4429 14.3694 102.047 17.9389 111.849 24.1091L113.13 20.9374C102.915 14.6357 90.88 11 78.0006 11C65.2249 11 53.2799 14.5774 43.1182 20.7857L44.3982 23.9551Z");
			attr(path1, "fill", "#C8EDFF");
			attr(path1, "class", "svelte-1qaakgn");
		},
		m(target, anchor) {
			insert(target, g, anchor);
			append(g, path0);
			append(g, path1);
			current = true;
		},
		p(new_ctx, dirty) {
		},
		i(local) {
			if (current) return;

			add_render_callback(() => {
				if (g_outro) g_outro.end(1);
				g_intro = create_in_transition(g, fade, { easing: cubicInOut, duration: 400 });
				g_intro.start();
			});

			current = true;
		},
		o(local) {
			if (g_intro) g_intro.invalidate();
			g_outro = create_out_transition(g, fade, { duration: 200 });
			current = false;
		},
		d(detaching) {
			if (detaching) detach(g);
			if (detaching && g_outro) g_outro.end();
		}
	};
}

// (32:0) {:else}
function create_else_block(ctx) {
	let circle;
	let circle_intro;
	let circle_outro;
	let current;

	return {
		c() {
			circle = svg_element("circle");
			attr(circle, "cx", "78");
			attr(circle, "cy", "78");
			attr(circle, "r", "11");
			attr(circle, "fill", "white");
			attr(circle, "class", "svelte-1qaakgn");
		},
		m(target, anchor) {
			insert(target, circle, anchor);
			current = true;
		},
		p(new_ctx, dirty) {
		},
		i(local) {
			if (current) return;

			add_render_callback(() => {
				if (circle_outro) circle_outro.end(1);
				circle_intro = create_in_transition(circle, scale, { easing: cubicInOut, duration: 300 });
				circle_intro.start();
			});

			current = true;
		},
		o(local) {
			if (circle_intro) circle_intro.invalidate();
			circle_outro = create_out_transition(circle, fade, { duration: 200 });
			current = false;
		},
		d(detaching) {
			if (detaching) detach(circle);
			if (detaching && circle_outro) circle_outro.end();
		}
	};
}

// (27:0) {#if active}
function create_if_block$3(ctx) {
	let path;
	let path_intro;
	let path_outro;
	let current;

	return {
		c() {
			path = svg_element("path");
			attr(path, "d", "M85.3439 88.5557C85.8567 88.795 86.3866 88.7437 86.9335 88.4019C87.5488 88.06 88.0274 87.5815 88.3693 86.9661C88.7111 86.3508 88.7624 85.821 88.5231 85.3766C87.8394 83.9408 86.3353 81.9239 84.0108 79.3259C81.6862 76.7279 79.242 74.2837 76.6782 71.9934C74.1144 69.703 72.1146 68.2502 70.6788 67.6349C70.2003 67.4298 69.6362 67.481 68.9867 67.7887C68.4056 68.0964 67.9612 68.5408 67.6535 69.1219C67.3459 69.703 67.3117 70.25 67.551 70.7627C68.2005 72.1643 69.6875 74.1641 72.012 76.7621C74.3708 79.3259 76.8149 81.7701 79.3446 84.0947C81.9426 86.4192 83.9424 87.9062 85.3439 88.5557ZM80.8829 80.0951C85.0876 75.7537 87.6001 72.6258 88.4205 70.7115C88.6256 70.2329 88.5573 69.6859 88.2154 69.0706C87.942 68.4553 87.5147 67.9938 86.9335 67.6861C86.3524 67.3785 85.8054 67.3443 85.2927 67.5836C83.2416 68.5408 80.1479 71.0875 76.0116 75.2238L80.8829 80.0951ZM76.0116 75.2238C74.0289 77.1381 72.2342 79.0354 70.6276 80.9155C69.0893 82.7956 68.0466 84.2827 67.4997 85.3766C67.2604 85.8893 67.2946 86.4363 67.6023 87.0174C67.9783 87.5986 68.474 88.06 69.0893 88.4019C69.7046 88.7437 70.2345 88.795 70.6788 88.5557C71.7727 88.0088 73.2427 86.949 75.0886 85.3766C77.003 83.8041 78.9344 82.0436 80.8829 80.0951L76.0116 75.2238ZM81.7033 83.2742C81.9768 83.411 82.2332 83.3939 82.4725 83.2229C82.7801 83.052 83.0194 82.8127 83.1903 82.5051C83.3613 82.1974 83.3954 81.9239 83.2929 81.6847C82.9169 80.9668 82.1477 79.9583 80.9854 78.6593C79.8574 77.3945 78.6438 76.181 77.3448 75.0187C76.08 73.8906 75.0886 73.1727 74.3708 72.8651C74.1315 72.7625 73.8409 72.7796 73.4991 72.9164C73.2256 73.0531 73.0034 73.2753 72.8325 73.583C72.6957 73.8564 72.6957 74.1299 72.8325 74.4034C73.1743 75.0871 73.9264 76.0784 75.0886 77.3774C76.2509 78.6764 77.4644 79.89 78.7293 81.0181C80.0283 82.1803 81.0196 82.9324 81.7033 83.2742Z");
			attr(path, "fill", "white");
			attr(path, "class", "svelte-1qaakgn");
		},
		m(target, anchor) {
			insert(target, path, anchor);
			current = true;
		},
		p(new_ctx, dirty) {
		},
		i(local) {
			if (current) return;

			add_render_callback(() => {
				if (path_outro) path_outro.end(1);
				path_intro = create_in_transition(path, scale, { easing: cubicInOut, duration: 300 });
				path_intro.start();
			});

			current = true;
		},
		o(local) {
			if (path_intro) path_intro.invalidate();
			path_outro = create_out_transition(path, fade, { duration: 200 });
			current = false;
		},
		d(detaching) {
			if (detaching) detach(path);
			if (detaching && path_outro) path_outro.end();
		}
	};
}

function create_fragment$8(ctx) {
	let svg;
	let g;
	let path0;
	let path1;
	let current_block_type_index;
	let if_block1;
	let defs;
	let radialGradient;
	let stop0;
	let stop1;
	let current;
	let if_block0 = /*active*/ ctx[0] && create_if_block_1$2();
	const if_block_creators = [create_if_block$3, create_else_block];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*active*/ ctx[0]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx);
	if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	return {
		c() {
			svg = svg_element("svg");
			g = svg_element("g");
			if (if_block0) if_block0.c();
			path0 = svg_element("path");
			path1 = svg_element("path");
			if_block1.c();
			defs = svg_element("defs");
			radialGradient = svg_element("radialGradient");
			stop0 = svg_element("stop");
			stop1 = svg_element("stop");
			attr(path0, "opacity", "0.1");
			attr(path0, "fill-rule", "evenodd");
			attr(path0, "clip-rule", "evenodd");
			attr(path0, "d", "M78 14.3694C42.8578 14.3694 14.3694 42.8578 14.3694 78C14.3694 113.142 42.8578 141.631 78 141.631C113.142 141.631 141.631 113.142 141.631 78C141.631 42.8578 113.142 14.3694 78 14.3694ZM11 78C11 40.9969 40.9969 11 78 11C115.003 11 145 40.9969 145 78C145 115.003 115.003 145 78 145C40.9969 145 11 115.003 11 78Z");
			attr(path0, "fill", "white");
			attr(path0, "class", "svelte-1qaakgn");
			attr(g, "id", "compass");
			set_style(g, "--rotation", (1 - /*rotation*/ ctx[1]) * 360 + 'deg');
			attr(g, "class", "svelte-1qaakgn");
			attr(path1, "fill-rule", "evenodd");
			attr(path1, "clip-rule", "evenodd");
			attr(path1, "d", "M72.0839 8.17773C73.8745 2.36264 82.106 2.36263 83.8966 8.17772L95.7228 46.5845C97.1504 51.2207 92.8831 55.7577 88.0832 55.055C84.8789 54.5859 81.3358 54.2274 77.9903 54.2274C74.6448 54.2274 71.1016 54.5859 67.8973 55.055C63.0975 55.7577 58.8302 51.2207 60.2577 46.5845L72.0839 8.17773ZM110.412 60.2546L148.818 72.0808C154.633 73.8714 154.633 82.1029 148.818 83.8934L110.412 95.7197C105.775 97.1472 101.238 92.8799 101.941 88.0801C102.41 84.8757 102.769 81.3326 102.769 77.9871C102.769 74.6416 102.41 71.0985 101.941 67.8942C101.238 63.0943 105.775 58.827 110.412 60.2546ZM83.8966 147.819C82.106 153.634 73.8745 153.634 72.0839 147.819L60.2577 109.412C58.8302 104.776 63.0975 100.239 67.8973 100.941C71.1016 101.41 74.6448 101.769 77.9903 101.769C81.3358 101.769 84.8789 101.41 88.0832 100.941C92.8831 100.239 97.1504 104.776 95.7228 109.412L83.8966 147.819ZM7.18164 72.0808C1.36655 73.8714 1.36653 82.1029 7.18163 83.8934L45.5884 95.7197C50.2246 97.1472 54.7616 92.8799 54.0589 88.0801C53.5898 84.8757 53.2313 81.3326 53.2313 77.9871C53.2313 74.6416 53.5898 71.0985 54.0589 67.8942C54.7616 63.0943 50.2246 58.827 45.5884 60.2546L7.18164 72.0808Z");
			attr(path1, "fill", "white");
			attr(path1, "class", "svelte-1qaakgn");
			attr(stop0, "stop-color", "#CEEFFF");
			attr(stop1, "offset", "0.869792");
			attr(stop1, "stop-color", "#C4C4C4");
			attr(stop1, "stop-opacity", "0");
			attr(radialGradient, "id", "paint0_radial");
			attr(radialGradient, "cx", "0");
			attr(radialGradient, "cy", "0");
			attr(radialGradient, "r", "1");
			attr(radialGradient, "gradientUnits", "userSpaceOnUse");
			attr(radialGradient, "gradientTransform", "translate(77.6706 20.4308) rotate(90) scale(55.8865 400.929)");
			attr(svg, "width", "156");
			attr(svg, "height", "156");
			attr(svg, "viewBox", "0 0 156 156");
			attr(svg, "fill", "none");
			attr(svg, "xmlns", "http://www.w3.org/2000/svg");
			attr(svg, "class", "svelte-1qaakgn");
		},
		m(target, anchor) {
			insert(target, svg, anchor);
			append(svg, g);
			if (if_block0) if_block0.m(g, null);
			append(g, path0);
			append(svg, path1);
			if_blocks[current_block_type_index].m(svg, null);
			append(svg, defs);
			append(defs, radialGradient);
			append(radialGradient, stop0);
			append(radialGradient, stop1);
			current = true;
		},
		p(ctx, [dirty]) {
			if (/*active*/ ctx[0]) {
				if (if_block0) {
					if (dirty & /*active*/ 1) {
						transition_in(if_block0, 1);
					}
				} else {
					if_block0 = create_if_block_1$2();
					if_block0.c();
					transition_in(if_block0, 1);
					if_block0.m(g, path0);
				}
			} else if (if_block0) {
				group_outros();

				transition_out(if_block0, 1, 1, () => {
					if_block0 = null;
				});

				check_outros();
			}

			if (!current || dirty & /*rotation*/ 2) {
				set_style(g, "--rotation", (1 - /*rotation*/ ctx[1]) * 360 + 'deg');
			}

			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index !== previous_block_index) {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block1 = if_blocks[current_block_type_index];

				if (!if_block1) {
					if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block1.c();
				}

				transition_in(if_block1, 1);
				if_block1.m(svg, defs);
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block0);
			transition_in(if_block1);
			current = true;
		},
		o(local) {
			transition_out(if_block0);
			transition_out(if_block1);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(svg);
			if (if_block0) if_block0.d();
			if_blocks[current_block_type_index].d();
		}
	};
}

function instance$8($$self, $$props, $$invalidate) {
	let { active = false } = $$props;
	let { fill = "#2E525F" } = $$props;
	let { rotation = 0 } = $$props;

	$$self.$$set = $$props => {
		if ('active' in $$props) $$invalidate(0, active = $$props.active);
		if ('fill' in $$props) $$invalidate(2, fill = $$props.fill);
		if ('rotation' in $$props) $$invalidate(1, rotation = $$props.rotation);
	};

	return [active, rotation, fill];
}

class SvgOrientation extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$8, create_fragment$8, safe_not_equal, { active: 0, fill: 2, rotation: 1 });
	}
}

var svgSettings_svelte_svelte_type_style_lang = '';

var svgFlip_svelte_svelte_type_style_lang = '';

var svgEffects_svelte_svelte_type_style_lang = '';

/* src/ui/icons/svgEffects.svelte generated by Svelte v3.46.4 */

function create_fragment$7(ctx) {
	let svg;
	let path;

	return {
		c() {
			svg = svg_element("svg");
			path = svg_element("path");
			attr(path, "d", "M7.87469 6.13203L10.1664 7.41536L8.88302 5.1237L10.1664 2.83203L7.87469 4.11536L5.58302 2.83203L6.86635 5.1237L5.58302 7.41536L7.87469 6.13203ZM18.8747 15.1154L16.583 13.832L17.8664 16.1237L16.583 18.4154L18.8747 17.132L21.1664 18.4154L19.883 16.1237L21.1664 13.832L18.8747 15.1154ZM21.1664 2.83203L18.8747 4.11536L16.583 2.83203L17.8664 5.1237L16.583 7.41536L18.8747 6.13203L21.1664 7.41536L19.883 5.1237L21.1664 2.83203ZM14.1722 7.6812C13.8147 7.3237 13.2372 7.3237 12.8797 7.6812L2.18219 18.3787C1.82469 18.7362 1.82469 19.3137 2.18219 19.6712L4.32719 21.8162C4.68469 22.1737 5.26219 22.1737 5.61969 21.8162L16.308 11.1279C16.6655 10.7704 16.6655 10.1929 16.308 9.83537L14.1722 7.6812V7.6812ZM13.228 12.7137L11.2847 10.7704L13.5214 8.5337L15.4647 10.477L13.228 12.7137V12.7137Z");
			attr(path, "fill", /*fill*/ ctx[0]);
			attr(svg, "style", /*style*/ ctx[1]);
			attr(svg, "width", "24");
			attr(svg, "height", "24");
			attr(svg, "viewBox", "0 0 24 24");
			attr(svg, "fill", "none");
			attr(svg, "xmlns", "http://www.w3.org/2000/svg");
			attr(svg, "class", "svelte-dglue3");
		},
		m(target, anchor) {
			insert(target, svg, anchor);
			append(svg, path);
		},
		p(ctx, [dirty]) {
			if (dirty & /*fill*/ 1) {
				attr(path, "fill", /*fill*/ ctx[0]);
			}

			if (dirty & /*style*/ 2) {
				attr(svg, "style", /*style*/ ctx[1]);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(svg);
		}
	};
}

function instance$7($$self, $$props, $$invalidate) {
	let { fill = "white" } = $$props;
	let { style = "" } = $$props;

	$$self.$$set = $$props => {
		if ('fill' in $$props) $$invalidate(0, fill = $$props.fill);
		if ('style' in $$props) $$invalidate(1, style = $$props.style);
	};

	return [fill, style];
}

class SvgEffects extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$7, create_fragment$7, safe_not_equal, { fill: 0, style: 1 });
	}
}

var svgClothing_svelte_svelte_type_style_lang = '';

/* src/ui/icons/svgClothing.svelte generated by Svelte v3.46.4 */

function create_fragment$6(ctx) {
	let svg;
	let path;

	return {
		c() {
			svg = svg_element("svg");
			path = svg_element("path");
			attr(path, "d", "M5.83406 19.9011V10.806L5.17691 11.5169C5.13106 11.5689 5.07467 11.6106 5.01149 11.6391C4.94831 11.6676 4.87979 11.6824 4.81047 11.6824C4.74115 11.6824 4.67262 11.6676 4.60944 11.6391C4.54626 11.6106 4.48988 11.5689 4.44403 11.5169L2.0133 8.8468C1.96937 8.79947 1.93526 8.74391 1.91293 8.68331C1.89061 8.62272 1.88052 8.5583 1.88325 8.49379C1.88597 8.42927 1.90146 8.36594 1.92882 8.30744C1.95617 8.24895 1.99485 8.19646 2.04261 8.153L6.05637 4.4153L8.0889 4L8.74361 5.16773C9.06823 5.74639 9.54114 6.22815 10.1137 6.56345C10.6862 6.89874 11.3378 7.07548 12.0013 7.07548C12.6648 7.07548 13.3163 6.89874 13.8889 6.56345C14.4614 6.22815 14.9343 5.74639 15.2589 5.16773L15.9063 4L17.934 4.40797L21.9526 8.153C22.0018 8.19658 22.0418 8.24964 22.07 8.30902C22.0983 8.36839 22.1142 8.43286 22.117 8.49855C22.1197 8.56424 22.1092 8.62981 22.0859 8.69133C22.0627 8.75285 22.0274 8.80905 21.9819 8.85657L19.5561 11.5145C19.5102 11.5665 19.4538 11.6081 19.3907 11.6366C19.3275 11.6652 19.259 11.6799 19.1896 11.6799C19.1203 11.6799 19.0518 11.6652 18.9886 11.6366C18.9254 11.6081 18.869 11.5665 18.8232 11.5145L18.166 10.8036V19.9011C18.166 20.0307 18.1146 20.155 18.0229 20.2466C17.9313 20.3382 17.807 20.3897 17.6775 20.3897H6.33486C6.26968 20.3913 6.20483 20.3799 6.14414 20.3561C6.08344 20.3323 6.02813 20.2965 5.98146 20.251C5.93478 20.2055 5.8977 20.151 5.87239 20.091C5.84707 20.0309 5.83404 19.9663 5.83406 19.9011V19.9011Z");
			attr(path, "fill", /*fill*/ ctx[0]);
			attr(svg, "style", /*style*/ ctx[1]);
			attr(svg, "width", "24");
			attr(svg, "height", "24");
			attr(svg, "viewBox", "0 0 24 24");
			attr(svg, "fill", "none");
			attr(svg, "xmlns", "http://www.w3.org/2000/svg");
			attr(svg, "class", "svelte-dglue3");
		},
		m(target, anchor) {
			insert(target, svg, anchor);
			append(svg, path);
		},
		p(ctx, [dirty]) {
			if (dirty & /*fill*/ 1) {
				attr(path, "fill", /*fill*/ ctx[0]);
			}

			if (dirty & /*style*/ 2) {
				attr(svg, "style", /*style*/ ctx[1]);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(svg);
		}
	};
}

function instance$6($$self, $$props, $$invalidate) {
	let { fill = "white" } = $$props;
	let { style = "" } = $$props;

	$$self.$$set = $$props => {
		if ('fill' in $$props) $$invalidate(0, fill = $$props.fill);
		if ('style' in $$props) $$invalidate(1, style = $$props.style);
	};

	return [fill, style];
}

class SvgClothing extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$6, create_fragment$6, safe_not_equal, { fill: 0, style: 1 });
	}
}

var quick_nav_svelte_svelte_type_style_lang = '';

/* src/ui/quick_nav.svelte generated by Svelte v3.46.4 */

function create_if_block_4(ctx) {
	let div;

	return {
		c() {
			div = element("div");
			attr(div, "class", "pulse svelte-1ngro65");
		},
		m(target, anchor) {
			insert(target, div, anchor);
		},
		d(detaching) {
			if (detaching) detach(div);
		}
	};
}

// (154:2) {#if $quickNavExpanded && $profiles.user.model && $profiles.user.model.extractedParts.length>0}
function create_if_block_3(ctx) {
	let button;
	let i0;
	let t0;
	let i0_class_value;
	let t1;
	let i1;
	let svgclothing;
	let button_class_value;
	let button_data_text_value;
	let button_intro;
	let button_outro;
	let current;
	let mounted;
	let dispose;
	svgclothing = new SvgClothing({});

	return {
		c() {
			button = element("button");
			i0 = element("i");
			t0 = text("jellyfill3");
			t1 = space();
			i1 = element("i");
			create_component(svgclothing.$$.fragment);
			attr(i0, "class", i0_class_value = "kalicon notranslate fill medium " + (/*selected*/ ctx[2] === 'exp' ? 'forceAnimate' : '') + " svelte-1ngro65");
			attr(i1, "class", "kalicon notranslate solid medium svgIcon");
			attr(button, "class", button_class_value = "menu-item no_highlights exp " + (/*selected*/ ctx[2] === 'exp' ? 'selected' : '') + " svelte-1ngro65");
			attr(button, "data-text", button_data_text_value = tooltip.exp[/*$setLang*/ ctx[9]]);
		},
		m(target, anchor) {
			insert(target, button, anchor);
			append(button, i0);
			append(i0, t0);
			append(button, t1);
			append(button, i1);
			mount_component(svgclothing, i1, null);
			current = true;

			if (!mounted) {
				dispose = [
					listen(button, "click", /*click_handler_4*/ ctx[31]),
					listen(button, "touchend", /*touchend_handler_3*/ ctx[32])
				];

				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;

			if (!current || dirty[0] & /*selected*/ 4 && i0_class_value !== (i0_class_value = "kalicon notranslate fill medium " + (/*selected*/ ctx[2] === 'exp' ? 'forceAnimate' : '') + " svelte-1ngro65")) {
				attr(i0, "class", i0_class_value);
			}

			if (!current || dirty[0] & /*selected*/ 4 && button_class_value !== (button_class_value = "menu-item no_highlights exp " + (/*selected*/ ctx[2] === 'exp' ? 'selected' : '') + " svelte-1ngro65")) {
				attr(button, "class", button_class_value);
			}

			if (!current || dirty[0] & /*$setLang*/ 512 && button_data_text_value !== (button_data_text_value = tooltip.exp[/*$setLang*/ ctx[9]])) {
				attr(button, "data-text", button_data_text_value);
			}
		},
		i(local) {
			if (current) return;
			transition_in(svgclothing.$$.fragment, local);

			add_render_callback(() => {
				if (button_outro) button_outro.end(1);
				button_intro = create_in_transition(button, scale, { duration: 300, easing: cubicInOut });
				button_intro.start();
			});

			current = true;
		},
		o(local) {
			transition_out(svgclothing.$$.fragment, local);
			if (button_intro) button_intro.invalidate();
			button_outro = create_out_transition(button, scale, { duration: 300, easing: cubicInOut });
			current = false;
		},
		d(detaching) {
			if (detaching) detach(button);
			destroy_component(svgclothing);
			if (detaching && button_outro) button_outro.end();
			mounted = false;
			run_all(dispose);
		}
	};
}

// (172:0) {#if  (!$inactive || $infoExpanded )  && ((!selected && $DIM.w < 600) || $DIM.w > 600 )}
function create_if_block_1$1(ctx) {
	let button0;
	let i0;
	let t1;
	let i1;
	let t2;
	let i1_class_value;
	let button0_class_value;
	let button0_style_value;
	let button0_intro;
	let button0_outro;
	let t3;
	let section;
	let button1;
	let i2;
	let t4;
	let i2_class_value;
	let t5;
	let i3;
	let button1_data_text_value;
	let button1_intro;
	let button1_outro;
	let t7;
	let button2;
	let i4;
	let t8;
	let i4_class_value;
	let t9;
	let i5;
	let svgeffects;
	let button2_data_text_value;
	let button2_intro;
	let button2_outro;
	let t10;
	let button3;
	let i6;
	let t11;
	let i6_class_value;
	let t12;
	let i7;
	let t13_value = (/*$quickNavExpanded*/ ctx[1] ? 'show' : 'hide') + "";
	let t13;
	let button3_data_text_value;
	let button3_intro;
	let button3_outro;
	let t14;
	let current;
	let mounted;
	let dispose;
	svgeffects = new SvgEffects({});
	let if_block = !/*$pipEnabled*/ ctx[13] && hasPIP && create_if_block_2(ctx);

	return {
		c() {
			button0 = element("button");
			i0 = element("i");
			i0.textContent = "jellyfill3";
			t1 = space();
			i1 = element("i");
			t2 = text("info");
			t3 = space();
			section = element("section");
			button1 = element("button");
			i2 = element("i");
			t4 = text("jellyfill");
			t5 = space();
			i3 = element("i");
			i3.textContent = "settings";
			t7 = space();
			button2 = element("button");
			i4 = element("i");
			t8 = text("jellyfill");
			t9 = space();
			i5 = element("i");
			create_component(svgeffects.$$.fragment);
			t10 = space();
			button3 = element("button");
			i6 = element("i");
			t11 = text("jellyfill");
			t12 = space();
			i7 = element("i");
			t13 = text(t13_value);
			t14 = space();
			if (if_block) if_block.c();
			attr(i0, "class", "kalicon notranslate fill small svelte-1ngro65");
			attr(i1, "class", i1_class_value = "kalicon notranslate solid small variable " + (/*$infoExpanded*/ ctx[6] ? 'end' : '') + " svelte-1ngro65");
			attr(button0, "class", button0_class_value = "subButton infoToggle no_highlights " + (/*$infoExpanded*/ ctx[6] ? 'selected' : '') + " " + (/*$cameraOn*/ ctx[7] ? 'disabled' : '') + "" + " svelte-1ngro65");
			attr(button0, "style", button0_style_value = /*$infoExpanded*/ ctx[6] ? 'z-index:5' : '');
			attr(i2, "class", i2_class_value = "kalicon notranslate fill small " + (/*selected*/ ctx[2] === 'settings' ? 'forceAnimate' : '') + " svelte-1ngro65");
			attr(i3, "class", "kalicon notranslate solid small svelte-1ngro65");
			attr(button1, "class", "subButton no_highlights svelte-1ngro65");
			attr(button1, "data-text", button1_data_text_value = tooltip.settings[/*$setLang*/ ctx[9]]);
			toggle_class(button1, "selected", /*selected*/ ctx[2] === "settings");
			attr(i4, "class", i4_class_value = "kalicon notranslate fill small " + (/*selected*/ ctx[2] === 'lights' ? 'forceAnimate' : '') + " svelte-1ngro65");
			attr(i5, "class", "kalicon notranslate solid small svgIcon svelte-1ngro65");
			attr(button2, "class", "subButton no_highlights svelte-1ngro65");
			attr(button2, "data-text", button2_data_text_value = tooltip.lights[/*$setLang*/ ctx[9]]);
			toggle_class(button2, "selected", /*selected*/ ctx[2] === "lights");
			attr(i6, "class", i6_class_value = "kalicon notranslate fill small " + (/*selected*/ ctx[2] === 'exp' ? 'forceAnimate' : '') + " svelte-1ngro65");
			attr(i7, "class", "kalicon notranslate solid small svelte-1ngro65");
			attr(button3, "class", "subButton no_highlights svelte-1ngro65");

			attr(button3, "data-text", button3_data_text_value = /*$quickNavExpanded*/ ctx[1]
			? tooltip.hide[/*$setLang*/ ctx[9]]
			: tooltip.show[/*$setLang*/ ctx[9]]);

			attr(section, "class", "secondaryMenu svelte-1ngro65");
		},
		m(target, anchor) {
			insert(target, button0, anchor);
			append(button0, i0);
			append(button0, t1);
			append(button0, i1);
			append(i1, t2);
			insert(target, t3, anchor);
			insert(target, section, anchor);
			append(section, button1);
			append(button1, i2);
			append(i2, t4);
			append(button1, t5);
			append(button1, i3);
			append(section, t7);
			append(section, button2);
			append(button2, i4);
			append(i4, t8);
			append(button2, t9);
			append(button2, i5);
			mount_component(svgeffects, i5, null);
			append(section, t10);
			append(section, button3);
			append(button3, i6);
			append(i6, t11);
			append(button3, t12);
			append(button3, i7);
			append(i7, t13);
			append(section, t14);
			if (if_block) if_block.m(section, null);
			current = true;

			if (!mounted) {
				dispose = [
					listen(button0, "click", /*handleInfo*/ ctx[18]),
					listen(button1, "mouseover", /*mouseover_handler*/ ctx[35]),
					listen(button1, "mouseout", /*resetTimer*/ ctx[19]),
					listen(button1, "click", /*click_handler_5*/ ctx[36]),
					listen(button1, "touchend", /*touchend_handler_4*/ ctx[37]),
					listen(button2, "mouseover", /*mouseover_handler_1*/ ctx[38]),
					listen(button2, "mouseout", /*resetTimer*/ ctx[19]),
					listen(button2, "click", /*click_handler_6*/ ctx[39]),
					listen(button2, "touchend", /*touchend_handler_5*/ ctx[40]),
					listen(button3, "mouseover", /*mouseover_handler_2*/ ctx[41]),
					listen(button3, "mouseout", /*resetTimer*/ ctx[19]),
					listen(button3, "click", /*click_handler_7*/ ctx[42]),
					listen(button3, "touchend", /*touchend_handler_6*/ ctx[43])
				];

				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;

			if (!current || dirty[0] & /*$infoExpanded*/ 64 && i1_class_value !== (i1_class_value = "kalicon notranslate solid small variable " + (/*$infoExpanded*/ ctx[6] ? 'end' : '') + " svelte-1ngro65")) {
				attr(i1, "class", i1_class_value);
			}

			if (!current || dirty[0] & /*$infoExpanded, $cameraOn*/ 192 && button0_class_value !== (button0_class_value = "subButton infoToggle no_highlights " + (/*$infoExpanded*/ ctx[6] ? 'selected' : '') + " " + (/*$cameraOn*/ ctx[7] ? 'disabled' : '') + "" + " svelte-1ngro65")) {
				attr(button0, "class", button0_class_value);
			}

			if (!current || dirty[0] & /*$infoExpanded*/ 64 && button0_style_value !== (button0_style_value = /*$infoExpanded*/ ctx[6] ? 'z-index:5' : '')) {
				attr(button0, "style", button0_style_value);
			}

			if (!current || dirty[0] & /*selected*/ 4 && i2_class_value !== (i2_class_value = "kalicon notranslate fill small " + (/*selected*/ ctx[2] === 'settings' ? 'forceAnimate' : '') + " svelte-1ngro65")) {
				attr(i2, "class", i2_class_value);
			}

			if (!current || dirty[0] & /*$setLang*/ 512 && button1_data_text_value !== (button1_data_text_value = tooltip.settings[/*$setLang*/ ctx[9]])) {
				attr(button1, "data-text", button1_data_text_value);
			}

			if (dirty[0] & /*selected*/ 4) {
				toggle_class(button1, "selected", /*selected*/ ctx[2] === "settings");
			}

			if (!current || dirty[0] & /*selected*/ 4 && i4_class_value !== (i4_class_value = "kalicon notranslate fill small " + (/*selected*/ ctx[2] === 'lights' ? 'forceAnimate' : '') + " svelte-1ngro65")) {
				attr(i4, "class", i4_class_value);
			}

			if (!current || dirty[0] & /*$setLang*/ 512 && button2_data_text_value !== (button2_data_text_value = tooltip.lights[/*$setLang*/ ctx[9]])) {
				attr(button2, "data-text", button2_data_text_value);
			}

			if (dirty[0] & /*selected*/ 4) {
				toggle_class(button2, "selected", /*selected*/ ctx[2] === "lights");
			}

			if (!current || dirty[0] & /*selected*/ 4 && i6_class_value !== (i6_class_value = "kalicon notranslate fill small " + (/*selected*/ ctx[2] === 'exp' ? 'forceAnimate' : '') + " svelte-1ngro65")) {
				attr(i6, "class", i6_class_value);
			}

			if ((!current || dirty[0] & /*$quickNavExpanded*/ 2) && t13_value !== (t13_value = (/*$quickNavExpanded*/ ctx[1] ? 'show' : 'hide') + "")) set_data(t13, t13_value);

			if (!current || dirty[0] & /*$quickNavExpanded, $setLang*/ 514 && button3_data_text_value !== (button3_data_text_value = /*$quickNavExpanded*/ ctx[1]
			? tooltip.hide[/*$setLang*/ ctx[9]]
			: tooltip.show[/*$setLang*/ ctx[9]])) {
				attr(button3, "data-text", button3_data_text_value);
			}

			if (!/*$pipEnabled*/ ctx[13] && hasPIP) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty[0] & /*$pipEnabled*/ 8192) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block_2(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(section, null);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
			}
		},
		i(local) {
			if (current) return;

			add_render_callback(() => {
				if (button0_outro) button0_outro.end(1);
				button0_intro = create_in_transition(button0, scale, { duration: 300, easing: cubicInOut });
				button0_intro.start();
			});

			add_render_callback(() => {
				if (button1_outro) button1_outro.end(1);

				button1_intro = create_in_transition(button1, scale, {
					duration: 300,
					easing: cubicInOut,
					delay: 50
				});

				button1_intro.start();
			});

			transition_in(svgeffects.$$.fragment, local);

			add_render_callback(() => {
				if (button2_outro) button2_outro.end(1);

				button2_intro = create_in_transition(button2, scale, {
					duration: 300,
					easing: cubicInOut,
					delay: 50
				});

				button2_intro.start();
			});

			add_render_callback(() => {
				if (button3_outro) button3_outro.end(1);

				button3_intro = create_in_transition(button3, scale, {
					duration: 300,
					easing: cubicInOut,
					delay: 100
				});

				button3_intro.start();
			});

			transition_in(if_block);
			current = true;
		},
		o(local) {
			if (button0_intro) button0_intro.invalidate();

			button0_outro = create_out_transition(button0, scale, {
				duration: 300,
				easing: cubicInOut,
				delay: hasPIP ? 150 : 100
			});

			if (button1_intro) button1_intro.invalidate();

			button1_outro = create_out_transition(button1, scale, {
				duration: 300,
				easing: cubicInOut,
				delay: hasPIP ? 100 : 50
			});

			transition_out(svgeffects.$$.fragment, local);
			if (button2_intro) button2_intro.invalidate();

			button2_outro = create_out_transition(button2, scale, {
				duration: 300,
				easing: cubicInOut,
				delay: hasPIP ? 100 : 50
			});

			if (button3_intro) button3_intro.invalidate();

			button3_outro = create_out_transition(button3, scale, {
				duration: 300,
				easing: cubicInOut,
				delay: hasPIP ? 50 : 0
			});

			transition_out(if_block);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(button0);
			if (detaching && button0_outro) button0_outro.end();
			if (detaching) detach(t3);
			if (detaching) detach(section);
			if (detaching && button1_outro) button1_outro.end();
			destroy_component(svgeffects);
			if (detaching && button2_outro) button2_outro.end();
			if (detaching && button3_outro) button3_outro.end();
			if (if_block) if_block.d();
			mounted = false;
			run_all(dispose);
		}
	};
}

// (239:2) {#if !$pipEnabled && hasPIP}
function create_if_block_2(ctx) {
	let button;
	let i0;
	let t1;
	let i1;
	let button_data_text_value;
	let button_intro;
	let button_outro;
	let current;
	let mounted;
	let dispose;

	return {
		c() {
			button = element("button");
			i0 = element("i");
			i0.textContent = "jellyfill";
			t1 = space();
			i1 = element("i");
			i1.textContent = "pip";
			attr(i0, "class", "kalicon notranslate fill small svelte-1ngro65");
			attr(i1, "class", "kalicon notranslate solid small svelte-1ngro65");
			attr(button, "class", "subButton pip svelte-1ngro65");
			attr(button, "data-text", button_data_text_value = tooltip.pip[/*$setLang*/ ctx[9]]);
		},
		m(target, anchor) {
			insert(target, button, anchor);
			append(button, i0);
			append(button, t1);
			append(button, i1);
			current = true;

			if (!mounted) {
				dispose = listen(button, "click", togglePIP);
				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;

			if (!current || dirty[0] & /*$setLang*/ 512 && button_data_text_value !== (button_data_text_value = tooltip.pip[/*$setLang*/ ctx[9]])) {
				attr(button, "data-text", button_data_text_value);
			}
		},
		i(local) {
			if (current) return;

			add_render_callback(() => {
				if (button_outro) button_outro.end(1);

				button_intro = create_in_transition(button, scale, {
					duration: 300,
					easing: cubicInOut,
					delay: 150
				});

				button_intro.start();
			});

			current = true;
		},
		o(local) {
			if (button_intro) button_intro.invalidate();
			button_outro = create_out_transition(button, scale, { duration: 300, easing: cubicInOut });
			current = false;
		},
		d(detaching) {
			if (detaching) detach(button);
			if (detaching && button_outro) button_outro.end();
			mounted = false;
			dispose();
		}
	};
}

// (289:0) {#if $inactive}
function create_if_block$2(ctx) {
	let div;
	let mounted;
	let dispose;

	return {
		c() {
			div = element("div");
			attr(div, "class", "scrim svelte-1ngro65");
		},
		m(target, anchor) {
			insert(target, div, anchor);

			if (!mounted) {
				dispose = [
					listen(div, "mousemove", /*unhide*/ ctx[20]),
					listen(div, "mouseout", /*resetTimer*/ ctx[19]),
					listen(div, "click", /*unhide*/ ctx[20]),
					listen(div, "touchstart", /*unhide*/ ctx[20])
				];

				mounted = true;
			}
		},
		p: noop,
		d(detaching) {
			if (detaching) detach(div);
			mounted = false;
			run_all(dispose);
		}
	};
}

function create_fragment$5(ctx) {
	let nav;
	let input;
	let t0;
	let button0;
	let i0;
	let t2;
	let i1;
	let t3;
	let i1_class_value;
	let button0_class_value;
	let button0_data_text_value;
	let t4;
	let button1;
	let i2;
	let t5;
	let i2_class_value;
	let t6;
	let i3;
	let button1_class_value;
	let button1_data_text_value;
	let t8;
	let button2;
	let i4;
	let t9;
	let i4_class_value;
	let t10;
	let i5;
	let button2_class_value;
	let button2_data_text_value;
	let t12;
	let button3;
	let i6;
	let t13;
	let i6_class_value;
	let t14;
	let i7;
	let button3_class_value;
	let button3_data_text_value;
	let t16;
	let button4;
	let i8;
	let t17;
	let i8_class_value;
	let t18;
	let i9;
	let t20;
	let button4_class_value;
	let button4_data_text_value;
	let t21;
	let t22;
	let svgblob;
	let nav_class_value;
	let t23;
	let subnav;
	let updating_selected;
	let updating_forceClose;
	let t24;
	let t25;
	let section;
	let button5;
	let svgorientation;
	let button5_class_value;
	let button5_data_text_value;
	let t26;
	let button6;
	let i10;
	let t28;
	let i11;
	let button6_data_text_value;
	let t30;
	let svgblobsmall;
	let t31;
	let t32;
	let filedrop;
	let current;
	let mounted;
	let dispose;
	let if_block0 = /*$peerState*/ ctx[10] === 'connected' && create_if_block_4();
	let if_block1 = /*$quickNavExpanded*/ ctx[1] && /*$profiles*/ ctx[12].user.model && /*$profiles*/ ctx[12].user.model.extractedParts.length > 0 && create_if_block_3(ctx);

	svgblob = new SvgBlob({
			props: { hide: !/*$quickNavExpanded*/ ctx[1] }
		});

	function subnav_selected_binding(value) {
		/*subnav_selected_binding*/ ctx[33](value);
	}

	function subnav_forceClose_binding(value) {
		/*subnav_forceClose_binding*/ ctx[34](value);
	}

	let subnav_props = {};

	if (/*selected*/ ctx[2] !== void 0) {
		subnav_props.selected = /*selected*/ ctx[2];
	}

	if (/*forceClose*/ ctx[3] !== void 0) {
		subnav_props.forceClose = /*forceClose*/ ctx[3];
	}

	subnav = new Sub_nav({ props: subnav_props });
	binding_callbacks.push(() => bind(subnav, 'selected', subnav_selected_binding));
	binding_callbacks.push(() => bind(subnav, 'forceClose', subnav_forceClose_binding));
	let if_block2 = (!/*$inactive*/ ctx[5] || /*$infoExpanded*/ ctx[6]) && (!/*selected*/ ctx[2] && /*$DIM*/ ctx[8].w < 600 || /*$DIM*/ ctx[8].w > 600) && create_if_block_1$1(ctx);

	svgorientation = new SvgOrientation({
			props: {
				active: /*$cameraConfig*/ ctx[14].freeCamera,
				rotation: /*$pivotRotation*/ ctx[15]
			}
		});

	svgblobsmall = new SvgBlobSmall({
			props: {
				hide: !/*$quickNavExpanded*/ ctx[1] || !/*hoverCameraControls*/ ctx[4] && !/*$cameraConfig*/ ctx[14].freeCamera
			}
		});

	let if_block3 = /*$inactive*/ ctx[5] && create_if_block$2(ctx);
	filedrop = new Filedrop({ props: { selected: /*selected*/ ctx[2] } });

	return {
		c() {
			nav = element("nav");
			input = element("input");
			t0 = space();
			button0 = element("button");
			i0 = element("i");
			i0.textContent = "jellyfill3";
			t2 = space();
			i1 = element("i");
			t3 = text("video");
			t4 = space();
			button1 = element("button");
			i2 = element("i");
			t5 = text("jellyfill");
			t6 = space();
			i3 = element("i");
			i3.textContent = "charalt";
			t8 = space();
			button2 = element("button");
			i4 = element("i");
			t9 = text("jellyfill");
			t10 = space();
			i5 = element("i");
			i5.textContent = "sticker";
			t12 = space();
			button3 = element("button");
			i6 = element("i");
			t13 = text("jellyfill2");
			t14 = space();
			i7 = element("i");
			i7.textContent = "backgroundalttwo";
			t16 = space();
			button4 = element("button");
			i8 = element("i");
			t17 = text("jellyfill3");
			t18 = space();
			i9 = element("i");
			i9.textContent = "phone";
			t20 = space();
			if (if_block0) if_block0.c();
			t21 = space();
			if (if_block1) if_block1.c();
			t22 = space();
			create_component(svgblob.$$.fragment);
			t23 = space();
			create_component(subnav.$$.fragment);
			t24 = space();
			if (if_block2) if_block2.c();
			t25 = space();
			section = element("section");
			button5 = element("button");
			create_component(svgorientation.$$.fragment);
			t26 = space();
			button6 = element("button");
			i10 = element("i");
			i10.textContent = "jellyfill3";
			t28 = space();
			i11 = element("i");
			i11.textContent = "flip";
			t30 = space();
			create_component(svgblobsmall.$$.fragment);
			t31 = space();
			if (if_block3) if_block3.c();
			t32 = space();
			create_component(filedrop.$$.fragment);
			attr(input, "type", "checkbox");
			attr(input, "href", "#");
			attr(input, "class", "menu-open svelte-1ngro65");
			attr(input, "name", "menu-open");
			attr(input, "id", "menu-open");
			attr(i0, "class", "kalicon notranslate fill svelte-1ngro65");
			attr(i1, "class", i1_class_value = "kalicon notranslate solid variable " + (/*$cameraOn*/ ctx[7] ? 'end' : '') + " svelte-1ngro65");
			attr(button0, "class", button0_class_value = "menu-item video no_highlights " + (/*$cameraOn*/ ctx[7] ? 'selected' : '') + " svelte-1ngro65");

			attr(button0, "data-text", button0_data_text_value = /*$cameraOn*/ ctx[7]
			? tooltip.cameraOn[/*$setLang*/ ctx[9]]
			: tooltip.cameraOff[/*$setLang*/ ctx[9]]);

			attr(i2, "class", i2_class_value = "kalicon notranslate fill medium " + (/*selected*/ ctx[2] === 'char' ? 'forceAnimate' : '') + " svelte-1ngro65");
			attr(i3, "class", "kalicon solid medium notranslate");
			attr(button1, "class", button1_class_value = "menu-item no_highlights char " + (/*selected*/ ctx[2] === 'char' ? 'selected' : '') + " svelte-1ngro65");
			attr(button1, "data-text", button1_data_text_value = tooltip.char[/*$setLang*/ ctx[9]]);
			attr(i4, "class", i4_class_value = "kalicon notranslate fill medium " + (/*selected*/ ctx[2] === 'sticker' ? 'forceAnimate' : '') + " svelte-1ngro65");
			attr(i5, "class", "kalicon notranslate solid medium");
			attr(button2, "class", button2_class_value = "menu-item no_highlights sticker " + (/*selected*/ ctx[2] === 'sticker' ? 'selected' : '') + " svelte-1ngro65");
			attr(button2, "data-text", button2_data_text_value = tooltip.sticker[/*$setLang*/ ctx[9]]);
			attr(i6, "class", i6_class_value = "kalicon notranslate fill medium " + (/*selected*/ ctx[2] === 'bg' ? 'forceAnimate' : '') + " svelte-1ngro65");
			attr(i7, "class", "kalicon notranslate solid medium");
			attr(button3, "class", button3_class_value = "menu-item no_highlights bg " + (/*selected*/ ctx[2] === 'bg' ? 'selected' : '') + " svelte-1ngro65");
			attr(button3, "data-text", button3_data_text_value = tooltip.bg[/*$setLang*/ ctx[9]]);
			attr(i8, "class", i8_class_value = "kalicon notranslate fill medium " + (/*selected*/ ctx[2] === 'call' ? 'forceAnimate' : '') + " svelte-1ngro65");
			attr(i9, "class", "kalicon notranslate solid medium svelte-1ngro65");
			attr(button4, "class", button4_class_value = "menu-item no_highlights " + /*$peerState*/ ctx[10] + " call " + (/*selected*/ ctx[2] === 'call' ? 'selected' : '') + " svelte-1ngro65");

			attr(button4, "data-text", button4_data_text_value = /*$peerState*/ ctx[10] === 'connected'
			? /*$callTime*/ ctx[11]
			: tooltip.call[/*$setLang*/ ctx[9]]);

			attr(nav, "class", nav_class_value = "menu no_highlights " + (!/*$quickNavExpanded*/ ctx[1] ? 'hide' : '') + " svelte-1ngro65");
			attr(button5, "class", button5_class_value = "menu-item no_highlights " + (/*$cameraConfig*/ ctx[14].freeCamera ? 'selected' : '') + " svelte-1ngro65");

			attr(button5, "data-text", button5_data_text_value = /*$cameraConfig*/ ctx[14].firstPerson
			? tooltip.firstPerson[/*$setLang*/ ctx[9]]
			: tooltip.selfie[/*$setLang*/ ctx[9]]);

			toggle_class(button5, "hide", !/*$quickNavExpanded*/ ctx[1] || !/*hoverCameraControls*/ ctx[4] && !/*$cameraConfig*/ ctx[14].freeCamera);
			attr(i10, "class", "kalicon notranslate fill medium svelte-1ngro65");
			attr(i11, "class", "kalicon notranslate solid medium");
			attr(button6, "class", "menu-item no_highlights svelte-1ngro65");
			attr(button6, "data-text", button6_data_text_value = tooltip.flip[/*$setLang*/ ctx[9]]);
			toggle_class(button6, "hide", !/*$quickNavExpanded*/ ctx[1] || !/*hoverCameraControls*/ ctx[4] && !/*$cameraConfig*/ ctx[14].freeCamera);
			attr(section, "class", "cameraMenu svelte-1ngro65");
			toggle_class(section, "hide", !/*$quickNavExpanded*/ ctx[1]);
		},
		m(target, anchor) {
			insert(target, nav, anchor);
			append(nav, input);
			input.checked = /*$quickNavExpanded*/ ctx[1];
			append(nav, t0);
			append(nav, button0);
			append(button0, i0);
			append(button0, t2);
			append(button0, i1);
			append(i1, t3);
			append(nav, t4);
			append(nav, button1);
			append(button1, i2);
			append(i2, t5);
			append(button1, t6);
			append(button1, i3);
			append(nav, t8);
			append(nav, button2);
			append(button2, i4);
			append(i4, t9);
			append(button2, t10);
			append(button2, i5);
			append(nav, t12);
			append(nav, button3);
			append(button3, i6);
			append(i6, t13);
			append(button3, t14);
			append(button3, i7);
			append(nav, t16);
			append(nav, button4);
			append(button4, i8);
			append(i8, t17);
			append(button4, t18);
			append(button4, i9);
			append(button4, t20);
			if (if_block0) if_block0.m(button4, null);
			append(nav, t21);
			if (if_block1) if_block1.m(nav, null);
			append(nav, t22);
			mount_component(svgblob, nav, null);
			insert(target, t23, anchor);
			mount_component(subnav, target, anchor);
			insert(target, t24, anchor);
			if (if_block2) if_block2.m(target, anchor);
			insert(target, t25, anchor);
			insert(target, section, anchor);
			append(section, button5);
			mount_component(svgorientation, button5, null);
			append(section, t26);
			append(section, button6);
			append(button6, i10);
			append(button6, t28);
			append(button6, i11);
			append(section, t30);
			mount_component(svgblobsmall, section, null);
			insert(target, t31, anchor);
			if (if_block3) if_block3.m(target, anchor);
			insert(target, t32, anchor);
			mount_component(filedrop, target, anchor);
			current = true;

			if (!mounted) {
				dispose = [
					listen(input, "change", /*input_change_handler*/ ctx[22]),
					listen(button0, "click", /*handleCamera*/ ctx[17]),
					listen(button1, "click", /*click_handler*/ ctx[23]),
					listen(button1, "touch", /*touch_handler*/ ctx[24]),
					listen(button2, "click", /*click_handler_1*/ ctx[25]),
					listen(button2, "touchend", /*touchend_handler*/ ctx[26]),
					listen(button3, "click", /*click_handler_2*/ ctx[27]),
					listen(button3, "touchend", /*touchend_handler_1*/ ctx[28]),
					listen(button4, "click", /*click_handler_3*/ ctx[29]),
					listen(button4, "touchend", /*touchend_handler_2*/ ctx[30]),
					listen(button5, "mouseover", /*mouseover_handler_3*/ ctx[44]),
					listen(button5, "click", toggleView),
					listen(button6, "click", toggleFirstPerson),
					listen(section, "mouseleave", /*mouseleave_handler*/ ctx[45])
				];

				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty[0] & /*$quickNavExpanded*/ 2) {
				input.checked = /*$quickNavExpanded*/ ctx[1];
			}

			if (!current || dirty[0] & /*$cameraOn*/ 128 && i1_class_value !== (i1_class_value = "kalicon notranslate solid variable " + (/*$cameraOn*/ ctx[7] ? 'end' : '') + " svelte-1ngro65")) {
				attr(i1, "class", i1_class_value);
			}

			if (!current || dirty[0] & /*$cameraOn*/ 128 && button0_class_value !== (button0_class_value = "menu-item video no_highlights " + (/*$cameraOn*/ ctx[7] ? 'selected' : '') + " svelte-1ngro65")) {
				attr(button0, "class", button0_class_value);
			}

			if (!current || dirty[0] & /*$cameraOn, $setLang*/ 640 && button0_data_text_value !== (button0_data_text_value = /*$cameraOn*/ ctx[7]
			? tooltip.cameraOn[/*$setLang*/ ctx[9]]
			: tooltip.cameraOff[/*$setLang*/ ctx[9]])) {
				attr(button0, "data-text", button0_data_text_value);
			}

			if (!current || dirty[0] & /*selected*/ 4 && i2_class_value !== (i2_class_value = "kalicon notranslate fill medium " + (/*selected*/ ctx[2] === 'char' ? 'forceAnimate' : '') + " svelte-1ngro65")) {
				attr(i2, "class", i2_class_value);
			}

			if (!current || dirty[0] & /*selected*/ 4 && button1_class_value !== (button1_class_value = "menu-item no_highlights char " + (/*selected*/ ctx[2] === 'char' ? 'selected' : '') + " svelte-1ngro65")) {
				attr(button1, "class", button1_class_value);
			}

			if (!current || dirty[0] & /*$setLang*/ 512 && button1_data_text_value !== (button1_data_text_value = tooltip.char[/*$setLang*/ ctx[9]])) {
				attr(button1, "data-text", button1_data_text_value);
			}

			if (!current || dirty[0] & /*selected*/ 4 && i4_class_value !== (i4_class_value = "kalicon notranslate fill medium " + (/*selected*/ ctx[2] === 'sticker' ? 'forceAnimate' : '') + " svelte-1ngro65")) {
				attr(i4, "class", i4_class_value);
			}

			if (!current || dirty[0] & /*selected*/ 4 && button2_class_value !== (button2_class_value = "menu-item no_highlights sticker " + (/*selected*/ ctx[2] === 'sticker' ? 'selected' : '') + " svelte-1ngro65")) {
				attr(button2, "class", button2_class_value);
			}

			if (!current || dirty[0] & /*$setLang*/ 512 && button2_data_text_value !== (button2_data_text_value = tooltip.sticker[/*$setLang*/ ctx[9]])) {
				attr(button2, "data-text", button2_data_text_value);
			}

			if (!current || dirty[0] & /*selected*/ 4 && i6_class_value !== (i6_class_value = "kalicon notranslate fill medium " + (/*selected*/ ctx[2] === 'bg' ? 'forceAnimate' : '') + " svelte-1ngro65")) {
				attr(i6, "class", i6_class_value);
			}

			if (!current || dirty[0] & /*selected*/ 4 && button3_class_value !== (button3_class_value = "menu-item no_highlights bg " + (/*selected*/ ctx[2] === 'bg' ? 'selected' : '') + " svelte-1ngro65")) {
				attr(button3, "class", button3_class_value);
			}

			if (!current || dirty[0] & /*$setLang*/ 512 && button3_data_text_value !== (button3_data_text_value = tooltip.bg[/*$setLang*/ ctx[9]])) {
				attr(button3, "data-text", button3_data_text_value);
			}

			if (!current || dirty[0] & /*selected*/ 4 && i8_class_value !== (i8_class_value = "kalicon notranslate fill medium " + (/*selected*/ ctx[2] === 'call' ? 'forceAnimate' : '') + " svelte-1ngro65")) {
				attr(i8, "class", i8_class_value);
			}

			if (/*$peerState*/ ctx[10] === 'connected') {
				if (if_block0) ; else {
					if_block0 = create_if_block_4();
					if_block0.c();
					if_block0.m(button4, null);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

			if (!current || dirty[0] & /*$peerState, selected*/ 1028 && button4_class_value !== (button4_class_value = "menu-item no_highlights " + /*$peerState*/ ctx[10] + " call " + (/*selected*/ ctx[2] === 'call' ? 'selected' : '') + " svelte-1ngro65")) {
				attr(button4, "class", button4_class_value);
			}

			if (!current || dirty[0] & /*$peerState, $callTime, $setLang*/ 3584 && button4_data_text_value !== (button4_data_text_value = /*$peerState*/ ctx[10] === 'connected'
			? /*$callTime*/ ctx[11]
			: tooltip.call[/*$setLang*/ ctx[9]])) {
				attr(button4, "data-text", button4_data_text_value);
			}

			if (/*$quickNavExpanded*/ ctx[1] && /*$profiles*/ ctx[12].user.model && /*$profiles*/ ctx[12].user.model.extractedParts.length > 0) {
				if (if_block1) {
					if_block1.p(ctx, dirty);

					if (dirty[0] & /*$quickNavExpanded, $profiles*/ 4098) {
						transition_in(if_block1, 1);
					}
				} else {
					if_block1 = create_if_block_3(ctx);
					if_block1.c();
					transition_in(if_block1, 1);
					if_block1.m(nav, t22);
				}
			} else if (if_block1) {
				group_outros();

				transition_out(if_block1, 1, 1, () => {
					if_block1 = null;
				});

				check_outros();
			}

			const svgblob_changes = {};
			if (dirty[0] & /*$quickNavExpanded*/ 2) svgblob_changes.hide = !/*$quickNavExpanded*/ ctx[1];
			svgblob.$set(svgblob_changes);

			if (!current || dirty[0] & /*$quickNavExpanded*/ 2 && nav_class_value !== (nav_class_value = "menu no_highlights " + (!/*$quickNavExpanded*/ ctx[1] ? 'hide' : '') + " svelte-1ngro65")) {
				attr(nav, "class", nav_class_value);
			}

			const subnav_changes = {};

			if (!updating_selected && dirty[0] & /*selected*/ 4) {
				updating_selected = true;
				subnav_changes.selected = /*selected*/ ctx[2];
				add_flush_callback(() => updating_selected = false);
			}

			if (!updating_forceClose && dirty[0] & /*forceClose*/ 8) {
				updating_forceClose = true;
				subnav_changes.forceClose = /*forceClose*/ ctx[3];
				add_flush_callback(() => updating_forceClose = false);
			}

			subnav.$set(subnav_changes);

			if ((!/*$inactive*/ ctx[5] || /*$infoExpanded*/ ctx[6]) && (!/*selected*/ ctx[2] && /*$DIM*/ ctx[8].w < 600 || /*$DIM*/ ctx[8].w > 600)) {
				if (if_block2) {
					if_block2.p(ctx, dirty);

					if (dirty[0] & /*$inactive, $infoExpanded, selected, $DIM*/ 356) {
						transition_in(if_block2, 1);
					}
				} else {
					if_block2 = create_if_block_1$1(ctx);
					if_block2.c();
					transition_in(if_block2, 1);
					if_block2.m(t25.parentNode, t25);
				}
			} else if (if_block2) {
				group_outros();

				transition_out(if_block2, 1, 1, () => {
					if_block2 = null;
				});

				check_outros();
			}

			const svgorientation_changes = {};
			if (dirty[0] & /*$cameraConfig*/ 16384) svgorientation_changes.active = /*$cameraConfig*/ ctx[14].freeCamera;
			if (dirty[0] & /*$pivotRotation*/ 32768) svgorientation_changes.rotation = /*$pivotRotation*/ ctx[15];
			svgorientation.$set(svgorientation_changes);

			if (!current || dirty[0] & /*$cameraConfig*/ 16384 && button5_class_value !== (button5_class_value = "menu-item no_highlights " + (/*$cameraConfig*/ ctx[14].freeCamera ? 'selected' : '') + " svelte-1ngro65")) {
				attr(button5, "class", button5_class_value);
			}

			if (!current || dirty[0] & /*$cameraConfig, $setLang*/ 16896 && button5_data_text_value !== (button5_data_text_value = /*$cameraConfig*/ ctx[14].firstPerson
			? tooltip.firstPerson[/*$setLang*/ ctx[9]]
			: tooltip.selfie[/*$setLang*/ ctx[9]])) {
				attr(button5, "data-text", button5_data_text_value);
			}

			if (dirty[0] & /*$cameraConfig, $quickNavExpanded, hoverCameraControls, $cameraConfig*/ 16402) {
				toggle_class(button5, "hide", !/*$quickNavExpanded*/ ctx[1] || !/*hoverCameraControls*/ ctx[4] && !/*$cameraConfig*/ ctx[14].freeCamera);
			}

			if (!current || dirty[0] & /*$setLang*/ 512 && button6_data_text_value !== (button6_data_text_value = tooltip.flip[/*$setLang*/ ctx[9]])) {
				attr(button6, "data-text", button6_data_text_value);
			}

			if (dirty[0] & /*$quickNavExpanded, hoverCameraControls, $cameraConfig*/ 16402) {
				toggle_class(button6, "hide", !/*$quickNavExpanded*/ ctx[1] || !/*hoverCameraControls*/ ctx[4] && !/*$cameraConfig*/ ctx[14].freeCamera);
			}

			const svgblobsmall_changes = {};
			if (dirty[0] & /*$quickNavExpanded, hoverCameraControls, $cameraConfig*/ 16402) svgblobsmall_changes.hide = !/*$quickNavExpanded*/ ctx[1] || !/*hoverCameraControls*/ ctx[4] && !/*$cameraConfig*/ ctx[14].freeCamera;
			svgblobsmall.$set(svgblobsmall_changes);

			if (dirty[0] & /*$quickNavExpanded*/ 2) {
				toggle_class(section, "hide", !/*$quickNavExpanded*/ ctx[1]);
			}

			if (/*$inactive*/ ctx[5]) {
				if (if_block3) {
					if_block3.p(ctx, dirty);
				} else {
					if_block3 = create_if_block$2(ctx);
					if_block3.c();
					if_block3.m(t32.parentNode, t32);
				}
			} else if (if_block3) {
				if_block3.d(1);
				if_block3 = null;
			}

			const filedrop_changes = {};
			if (dirty[0] & /*selected*/ 4) filedrop_changes.selected = /*selected*/ ctx[2];
			filedrop.$set(filedrop_changes);
		},
		i(local) {
			if (current) return;
			transition_in(if_block1);
			transition_in(svgblob.$$.fragment, local);
			transition_in(subnav.$$.fragment, local);
			transition_in(if_block2);
			transition_in(svgorientation.$$.fragment, local);
			transition_in(svgblobsmall.$$.fragment, local);
			transition_in(filedrop.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(if_block1);
			transition_out(svgblob.$$.fragment, local);
			transition_out(subnav.$$.fragment, local);
			transition_out(if_block2);
			transition_out(svgorientation.$$.fragment, local);
			transition_out(svgblobsmall.$$.fragment, local);
			transition_out(filedrop.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(nav);
			if (if_block0) if_block0.d();
			if (if_block1) if_block1.d();
			destroy_component(svgblob);
			if (detaching) detach(t23);
			destroy_component(subnav, detaching);
			if (detaching) detach(t24);
			if (if_block2) if_block2.d(detaching);
			if (detaching) detach(t25);
			if (detaching) detach(section);
			destroy_component(svgorientation);
			destroy_component(svgblobsmall);
			if (detaching) detach(t31);
			if (if_block3) if_block3.d(detaching);
			if (detaching) detach(t32);
			destroy_component(filedrop, detaching);
			mounted = false;
			run_all(dispose);
		}
	};
}

function instance$5($$self, $$props, $$invalidate) {
	let $quickNavExpanded;
	let $firstLoad;
	let $inactive;
	let $infoExpanded;
	let $largeWipe;
	let $cameraOn;
	let $DIM;
	let $setLang;
	let $peerState;
	let $callTime;
	let $profiles;
	let $pipEnabled;
	let $cameraConfig;
	let $pivotRotation;
	component_subscribe($$self, quickNavExpanded, $$value => $$invalidate(1, $quickNavExpanded = $$value));
	component_subscribe($$self, firstLoad, $$value => $$invalidate(21, $firstLoad = $$value));
	component_subscribe($$self, inactive, $$value => $$invalidate(5, $inactive = $$value));
	component_subscribe($$self, infoExpanded, $$value => $$invalidate(6, $infoExpanded = $$value));
	component_subscribe($$self, largeWipe, $$value => $$invalidate(46, $largeWipe = $$value));
	component_subscribe($$self, cameraOn, $$value => $$invalidate(7, $cameraOn = $$value));
	component_subscribe($$self, DIM, $$value => $$invalidate(8, $DIM = $$value));
	component_subscribe($$self, setLang, $$value => $$invalidate(9, $setLang = $$value));
	component_subscribe($$self, peerState, $$value => $$invalidate(10, $peerState = $$value));
	component_subscribe($$self, callTime, $$value => $$invalidate(11, $callTime = $$value));
	component_subscribe($$self, profiles, $$value => $$invalidate(12, $profiles = $$value));
	component_subscribe($$self, pipEnabled, $$value => $$invalidate(13, $pipEnabled = $$value));
	component_subscribe($$self, cameraConfig, $$value => $$invalidate(14, $cameraConfig = $$value));
	component_subscribe($$self, pivotRotation, $$value => $$invalidate(15, $pivotRotation = $$value));
	let selected;
	let forceClose = false;
	let hoverCameraControls = false;
	let time;

	const handleClick = (e, state) => {
		e.preventDefault();

		if (selected === state) {
			let isMobile = $DIM.w < 600;

			if (isMobile) {
				$$invalidate(3, forceClose = true);
				return;
			}

			// selected = null;
			updateFtue(selected);

			wipeComponent.animate({
				action: 'close',
				axis: isMobile ? 'y' : 'x',
				_flip: isMobile ? false : true,
				_curve: "curve",
				_numPoints: 5,
				_duration: isMobile ? 0 : 600
			});

			$$invalidate(2, selected = null);
		} else {
			$$invalidate(2, selected = state);
		}
	};

	const handleCamera = () => {
		updateFtue('camera');
		cameraOn.set(!$cameraOn);
		haptic();
	};

	const handleInfo = e => {
		// e.preventDefault()
		if (!$largeWipe.transition) {
			infoExpanded.set(!$infoExpanded);
		}
	};

	const resetTimer = () => {
		clearTimeout(time);

		$$invalidate(0, time = setTimeout(
			() => {
				if (!$quickNavExpanded) {
					inactive.set(true);
				}
			},
			2000
		));
	};

	const handleInactivity = () => {
		if (!$inactive && !$quickNavExpanded) {
			resetTimer();
		}
	};

	const unhide = e => {
		e.preventDefault();
		inactive.set(false);
		resetTimer();
	};

	firstLoad.subscribe(e => {
		if (e) {
			setTimeout(
				() => {
					quickNavExpanded.set(true);
				},
				800
			);
		}
	});

	function input_change_handler() {
		$quickNavExpanded = this.checked;
		quickNavExpanded.set($quickNavExpanded);
	}

	const click_handler = e => {
		handleClick(e, 'char');
	};

	const touch_handler = e => {
		handleClick(e, 'char');
	};

	const click_handler_1 = e => {
		handleClick(e, 'sticker');
	};

	const touchend_handler = e => {
		handleClick(e, 'sticker');
	};

	const click_handler_2 = e => {
		handleClick(e, 'bg');
	};

	const touchend_handler_1 = e => {
		handleClick(e, 'bg');
	};

	const click_handler_3 = e => {
		handleClick(e, 'call');
	};

	const touchend_handler_2 = e => {
		handleClick(e, 'call');
	};

	const click_handler_4 = e => {
		handleClick(e, 'exp');
	};

	const touchend_handler_3 = e => {
		handleClick(e, 'exp');
	};

	function subnav_selected_binding(value) {
		selected = value;
		$$invalidate(2, selected);
	}

	function subnav_forceClose_binding(value) {
		forceClose = value;
		$$invalidate(3, forceClose);
	}

	const mouseover_handler = () => {
		clearTimeout(time);
	};

	const click_handler_5 = e => {
		handleClick(e, 'settings');
	};

	const touchend_handler_4 = e => {
		handleClick(e, 'settings');
	};

	const mouseover_handler_1 = () => {
		clearTimeout(time);
	};

	const click_handler_6 = e => {
		handleClick(e, 'lights');
	};

	const touchend_handler_5 = e => {
		handleClick(e, 'lights');
	};

	const mouseover_handler_2 = () => {
		clearTimeout(time);
	};

	const click_handler_7 = e => {
		e.preventDefault();
		quickNavExpanded.set(!$quickNavExpanded);
	};

	const touchend_handler_6 = e => {
		e.preventDefault();
		quickNavExpanded.set(!$quickNavExpanded);
	};

	const mouseover_handler_3 = () => {
		if (isTouch) {
			return;
		}

		$$invalidate(4, hoverCameraControls = true);
	};

	const mouseleave_handler = () => {
		if (isTouch) {
			return;
		}

		$$invalidate(4, hoverCameraControls = false);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty[0] & /*$firstLoad, $quickNavExpanded, time*/ 2097155) {
			{
				if ($firstLoad && !$quickNavExpanded) {
					handleInactivity();
				} else {
					clearTimeout(time);
				}
			}
		}
	};

	return [
		time,
		$quickNavExpanded,
		selected,
		forceClose,
		hoverCameraControls,
		$inactive,
		$infoExpanded,
		$cameraOn,
		$DIM,
		$setLang,
		$peerState,
		$callTime,
		$profiles,
		$pipEnabled,
		$cameraConfig,
		$pivotRotation,
		handleClick,
		handleCamera,
		handleInfo,
		resetTimer,
		unhide,
		$firstLoad,
		input_change_handler,
		click_handler,
		touch_handler,
		click_handler_1,
		touchend_handler,
		click_handler_2,
		touchend_handler_1,
		click_handler_3,
		touchend_handler_2,
		click_handler_4,
		touchend_handler_3,
		subnav_selected_binding,
		subnav_forceClose_binding,
		mouseover_handler,
		click_handler_5,
		touchend_handler_4,
		mouseover_handler_1,
		click_handler_6,
		touchend_handler_5,
		mouseover_handler_2,
		click_handler_7,
		touchend_handler_6,
		mouseover_handler_3,
		mouseleave_handler
	];
}

class Quick_nav extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$5, create_fragment$5, safe_not_equal, {}, null, [-1, -1]);
	}
}

var Card_svelte_svelte_type_style_lang = '';

/* src/components/Card.svelte generated by Svelte v3.46.4 */

function fallback_block(ctx) {
	let t;

	return {
		c() {
			t = text(/*cardContent*/ ctx[1]);
		},
		m(target, anchor) {
			insert(target, t, anchor);
		},
		p(ctx, dirty) {
			if (dirty & /*cardContent*/ 2) set_data(t, /*cardContent*/ ctx[1]);
		},
		d(detaching) {
			if (detaching) detach(t);
		}
	};
}

function create_fragment$4(ctx) {
	let p;
	let p_data_status_value;
	let current;
	const default_slot_template = /*#slots*/ ctx[5].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[4], null);
	const default_slot_or_fallback = default_slot || fallback_block(ctx);

	return {
		c() {
			p = element("p");
			if (default_slot_or_fallback) default_slot_or_fallback.c();
			attr(p, "class", "card svelte-yms4qk");
			attr(p, "data-dragging", "false");
			attr(p, "data-status", p_data_status_value = /*isCurrent*/ ctx[0] === true ? 'current' : 'waiting');
			attr(p, "style", /*styles*/ ctx[2]);
		},
		m(target, anchor) {
			insert(target, p, anchor);

			if (default_slot_or_fallback) {
				default_slot_or_fallback.m(p, null);
			}

			current = true;
		},
		p(ctx, [dirty]) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 16)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[4],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[4])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[4], dirty, null),
						null
					);
				}
			} else {
				if (default_slot_or_fallback && default_slot_or_fallback.p && (!current || dirty & /*cardContent*/ 2)) {
					default_slot_or_fallback.p(ctx, !current ? -1 : dirty);
				}
			}

			if (!current || dirty & /*isCurrent*/ 1 && p_data_status_value !== (p_data_status_value = /*isCurrent*/ ctx[0] === true ? 'current' : 'waiting')) {
				attr(p, "data-status", p_data_status_value);
			}

			if (!current || dirty & /*styles*/ 4) {
				attr(p, "style", /*styles*/ ctx[2]);
			}
		},
		i(local) {
			if (current) return;
			transition_in(default_slot_or_fallback, local);
			current = true;
		},
		o(local) {
			transition_out(default_slot_or_fallback, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(p);
			if (default_slot_or_fallback) default_slot_or_fallback.d(detaching);
		}
	};
}

function instance$4($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	let { isCurrent = false } = $$props;
	let { cardContent = '' } = $$props;
	let { dataParity = 1 } = $$props;
	let { styles = '' } = $$props;

	$$self.$$set = $$props => {
		if ('isCurrent' in $$props) $$invalidate(0, isCurrent = $$props.isCurrent);
		if ('cardContent' in $$props) $$invalidate(1, cardContent = $$props.cardContent);
		if ('dataParity' in $$props) $$invalidate(3, dataParity = $$props.dataParity);
		if ('styles' in $$props) $$invalidate(2, styles = $$props.styles);
		if ('$$scope' in $$props) $$invalidate(4, $$scope = $$props.$$scope);
	};

	return [isCurrent, cardContent, styles, dataParity, $$scope, slots];
}

class Card extends SvelteComponent {
	constructor(options) {
		super();

		init(this, options, instance$4, create_fragment$4, safe_not_equal, {
			isCurrent: 0,
			cardContent: 1,
			dataParity: 3,
			styles: 2
		});
	}
}

var CardSwipe_svelte_svelte_type_style_lang = '';

/* src/components/CardSwipe.svelte generated by Svelte v3.46.4 */

function create_if_block$1(ctx) {
	let div;

	let t_value = (/*cards*/ ctx[2]
	? /*cards*/ ctx[2].length - /*currentCard*/ ctx[1] - 1
	: '0') + "";

	let t;
	let div_intro;
	let div_outro;
	let current;

	return {
		c() {
			div = element("div");
			t = text(t_value);
			attr(div, "class", "counter svelte-beijvx");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, t);
			current = true;
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;

			if ((!current || dirty & /*cards, currentCard*/ 6) && t_value !== (t_value = (/*cards*/ ctx[2]
			? /*cards*/ ctx[2].length - /*currentCard*/ ctx[1] - 1
			: '0') + "")) set_data(t, t_value);
		},
		i(local) {
			if (current) return;

			add_render_callback(() => {
				if (div_outro) div_outro.end(1);

				div_intro = create_in_transition(div, scale, {
					delay: 400,
					duration: 300,
					easing: cubicInOut
				});

				div_intro.start();
			});

			current = true;
		},
		o(local) {
			if (div_intro) div_intro.invalidate();
			div_outro = create_out_transition(div, scale, { duration: 300, easing: cubicInOut });
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			if (detaching && div_outro) div_outro.end();
		}
	};
}

function create_fragment$3(ctx) {
	let main;
	let container_1;
	let t0;
	let button;
	let span;
	let t2;
	let t3_value = cardEndText.refresh[/*$setLang*/ ctx[4]] + "";
	let t3;
	let t4;
	let main_class_value;
	let current;
	let mounted;
	let dispose;
	const default_slot_template = /*#slots*/ ctx[7].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[6], null);
	let if_block = /*cards*/ ctx[2] && /*cards*/ ctx[2].length - /*currentCard*/ ctx[1] - 1 > 0 && create_if_block$1(ctx);

	return {
		c() {
			main = element("main");
			container_1 = element("container");
			if (default_slot) default_slot.c();
			t0 = space();
			button = element("button");
			span = element("span");
			span.textContent = "refresh";
			t2 = space();
			t3 = text(t3_value);
			t4 = space();
			if (if_block) if_block.c();
			attr(span, "class", "kalicon notranslate svelte-beijvx");
			attr(button, "class", "no_highlights svelte-beijvx");

			attr(main, "class", main_class_value = "container " + (/*cards*/ ctx[2] && /*currentCard*/ ctx[1] === /*cards*/ ctx[2].length
			? 'done'
			: '') + " svelte-beijvx");

			set_style(main, "--maxWidth", Math.max(/*$DIM*/ ctx[3].w, /*$DIM*/ ctx[3].h) + "px");

			set_style(main, "--progress", /*cards*/ ctx[2]
			? /*currentCard*/ ctx[1] / /*cards*/ ctx[2].length
			: 0);
		},
		m(target, anchor) {
			insert(target, main, anchor);
			append(main, container_1);

			if (default_slot) {
				default_slot.m(container_1, null);
			}

			append(container_1, t0);
			append(container_1, button);
			append(button, span);
			append(button, t2);
			append(button, t3);
			append(container_1, t4);
			if (if_block) if_block.m(container_1, null);
			/*main_binding*/ ctx[8](main);
			current = true;

			if (!mounted) {
				dispose = [
					listen(button, "click", /*resetStack*/ ctx[5]),
					listen(button, "touchend", /*resetStack*/ ctx[5], { passive: true })
				];

				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 64)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[6],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[6])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[6], dirty, null),
						null
					);
				}
			}

			if ((!current || dirty & /*$setLang*/ 16) && t3_value !== (t3_value = cardEndText.refresh[/*$setLang*/ ctx[4]] + "")) set_data(t3, t3_value);

			if (/*cards*/ ctx[2] && /*cards*/ ctx[2].length - /*currentCard*/ ctx[1] - 1 > 0) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*cards, currentCard*/ 6) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block$1(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(container_1, null);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
			}

			if (!current || dirty & /*cards, currentCard*/ 6 && main_class_value !== (main_class_value = "container " + (/*cards*/ ctx[2] && /*currentCard*/ ctx[1] === /*cards*/ ctx[2].length
			? 'done'
			: '') + " svelte-beijvx")) {
				attr(main, "class", main_class_value);
			}

			if (!current || dirty & /*$DIM*/ 8) {
				set_style(main, "--maxWidth", Math.max(/*$DIM*/ ctx[3].w, /*$DIM*/ ctx[3].h) + "px");
			}

			if (!current || dirty & /*cards, currentCard*/ 6) {
				set_style(main, "--progress", /*cards*/ ctx[2]
				? /*currentCard*/ ctx[1] / /*cards*/ ctx[2].length
				: 0);
			}
		},
		i(local) {
			if (current) return;
			transition_in(default_slot, local);
			transition_in(if_block);
			current = true;
		},
		o(local) {
			transition_out(default_slot, local);
			transition_out(if_block);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(main);
			if (default_slot) default_slot.d(detaching);
			if (if_block) if_block.d();
			/*main_binding*/ ctx[8](null);
			mounted = false;
			run_all(dispose);
		}
	};
}

const interactThreshold = 100;
const interactMaxRotation = 15;

function transitionListener(event) {
	event.target.style.setProperty('--card-r', '');
	event.target.style.setProperty('--card-x', '');
	event.target.style.setProperty('--card-y', '');
	event.target.setAttribute('data-status', 'waiting');
	event.target.removeEventListener('transitionend', transitionListener);
}

function instance$3($$self, $$props, $$invalidate) {
	let $DIM;
	let $setLang;
	component_subscribe($$self, DIM, $$value => $$invalidate(3, $DIM = $$value));
	component_subscribe($$self, setLang, $$value => $$invalidate(4, $setLang = $$value));
	let { $$slots: slots = {}, $$scope } = $$props;
	let container;
	let currentCard = 0;
	let cards;
	let rotation = 0;
	let x = 0;
	let y = 0;

	const resetStack = () => {
		cards[0].setAttribute('data-loop', 'peak');
		cards[0].setAttribute('data-status', 'current');
		$$invalidate(1, currentCard = 0);
	};

	function dragMoveListener(event) {
		// console.log(x,y)
		var target = event.target;

		// keep the dragged position in the custom properties
		x = (getCSSCustomProp('--card-x', target, 'float') || 0) + event.dx;

		y = (getCSSCustomProp('--card-y', target, 'float') || 0) + event.dy;

		// add rotation based on card position
		rotation = interactMaxRotation * (x / interactThreshold);

		if (rotation > interactMaxRotation) rotation = interactMaxRotation; else if (rotation < -interactMaxRotation) rotation = -interactMaxRotation;

		// update styles
		target.style.setProperty('--card-x', x + 'px');

		target.style.setProperty('--card-y', y + 'px');
		target.style.setProperty('--card-r', rotation + 'deg');
	}

	onMount(() => {
		$$invalidate(2, cards = document.querySelectorAll('.card'));

		// get viewport width
		interact('.card[data-status="current"]').unset();

		// interact.js
		interact('.card[data-status="current"]').styleCursor(false).draggable({
			onstart: () => {
				// signify dragging
				event.target.setAttribute('data-dragging', true);
			},
			// call this function on every dragmove event
			onmove: dragMoveListener,
			// call this function on every dragend event
			onend: event => {
				const vw = document.documentElement.clientWidth;

				// create an off canvas x coordinate
				const offX = vw < 500 ? 500 : vw;

				$$invalidate(2, cards = event.target.parentNode.querySelectorAll('.card'));
				const index = [...cards].indexOf(event.target);

				// signify dragging stopped
				event.target.setAttribute('data-dragging', false);

				// calculate how far card moved
				let moved = Math.sqrt(Math.pow(event.pageX - event.x0, 2) + Math.pow(event.pageY - event.y0, 2) | 0);

				if (moved > interactThreshold) {
					// remove card
					event.target.setAttribute('data-status', "transition");

					if (x > 0) {
						x = offX;
					} else {
						x = offX * -1;
					}

					// mark as done after CSS transition
					event.target.addEventListener('transitionend', transitionListener);

					// activate next card
					if (index < cards.length - 1) {
						cards[index + 1].setAttribute('data-status', 'current');
						$$invalidate(1, currentCard = index + 1);
					} else {
						$$invalidate(1, currentCard = index + 1);
					} // cards[0].setAttribute('data-status', 'current');
					// currentCard=0

					if (index === cards.length - 1) {
						cards[0].setAttribute('data-loop', 'load');
					} else {
						cards[0].setAttribute('data-loop', '');
					}
				} else {
					// reset vars
					x = 0;

					y = 0;
					rotation = 0;

					// update rotation
					event.target.style.setProperty('--card-r', rotation + 'deg');
				}

				// update x and y pos
				event.target.style.setProperty('--card-x', x + 'px');

				event.target.style.setProperty('--card-y', y + 'px');
			}
		});
	});

	function main_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			container = $$value;
			$$invalidate(0, container);
		});
	}

	$$self.$$set = $$props => {
		if ('$$scope' in $$props) $$invalidate(6, $$scope = $$props.$$scope);
	};

	return [
		container,
		currentCard,
		cards,
		$DIM,
		$setLang,
		resetStack,
		$$scope,
		slots,
		main_binding
	];
}

class CardSwipe extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});
	}
}

var credits_svelte_svelte_type_style_lang = '';

/* src/ui/credits.svelte generated by Svelte v3.46.4 */

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[4] = list[i];
	return child_ctx;
}

// (45:4) <Card styles="{'align-items:flex-end;--theme-color:var(--theme0);--text-color:var(--text0);'}" isCurrent={true}>
function create_default_slot_8(ctx) {
	let h2;
	let h2_intro;
	let t1;
	let h3;
	let raw_value = cardText[0][/*$setLang*/ ctx[0]] + "";
	let h3_intro;
	let t2;
	let svg;
	let rect;
	let path0;
	let path1;
	let path2;
	let path3;
	let path4;
	let svg_intro;

	return {
		c() {
			h2 = element("h2");
			h2.textContent = "kalidoface";
			t1 = space();
			h3 = element("h3");
			t2 = space();
			svg = svg_element("svg");
			rect = svg_element("rect");
			path0 = svg_element("path");
			path1 = svg_element("path");
			path2 = svg_element("path");
			path3 = svg_element("path");
			path4 = svg_element("path");
			attr(h2, "class", "notranslate svelte-1mx7g4j");
			attr(h3, "class", "svelte-1mx7g4j");
			attr(rect, "width", "360");
			attr(rect, "height", "360");
			attr(rect, "fill", "white");
			attr(rect, "rx", "185");
			attr(path0, "d", "M271.948 68.424C244.096 52.7124 211.801 46.7834 180.499 50.6249C199.465 52.9571 218.012 58.8861 234.92 68.424C268.203 87.9348 289.627 129.635 289.627 178.604C289.627 227.955 268.586 269.655 234.92 289.165C217.773 298.819 199.377 304.834 180.633 307.215C211.772 311.157 243.57 305.143 271.948 289.165C305.614 269.655 326.655 227.955 326.655 178.604C326.655 129.635 305.232 87.9348 271.948 68.424Z");
			attr(path0, "fill", "#82CEF6");
			attr(path1, "d", "M70.3352 178.986C70.3352 129.635 91.7591 87.9348 125.808 68.424C142.86 58.8861 161.496 52.9571 180.498 50.6249C149.255 46.7834 116.869 52.7124 88.7788 68.424C54.7303 87.9348 33.3066 129.635 33.3066 178.986C33.3066 227.955 54.7303 270.419 88.7788 289.165C117.634 305.143 149.611 311.157 180.633 307.215C161.818 304.834 143.243 298.819 125.808 289.165C91.7591 270.419 70.3352 227.955 70.3352 178.986Z");
			attr(path1, "fill", "#4450F3");
			attr(path2, "d", "M289.626 178.604C289.626 129.635 268.203 87.935 234.919 68.4241C218.011 58.8862 199.465 52.9572 180.498 50.625C161.496 52.9572 142.86 58.8862 125.807 68.4241C91.7588 87.935 70.335 129.635 70.335 178.986C70.335 227.955 91.7588 270.42 125.807 289.165C143.242 298.82 161.817 304.834 180.633 307.215C199.377 304.834 217.772 298.82 234.919 289.165C268.585 269.655 289.626 227.955 289.626 178.604Z");
			attr(path2, "fill", "#1A9EF3");
			attr(path3, "d", "M289.626 178.604C289.626 129.635 268.203 87.935 234.919 68.4241C218.011 58.8862 199.465 52.9572 180.498 50.625C161.496 52.9572 142.86 58.8862 125.807 68.4241C91.7588 87.935 70.335 129.635 70.335 178.986C70.335 227.955 91.7588 270.42 125.807 289.165C143.242 298.82 161.817 304.834 180.633 307.215C199.377 304.834 217.772 298.82 234.919 289.165C268.585 269.655 289.626 227.955 289.626 178.604Z");
			attr(path3, "fill", "#1A9EF3");
			attr(path4, "class", "rect");
			attr(path4, "d", "M202.885 190.052C198.563 187.061 189.588 185.399 179.948 185.399C170.308 185.399 161.333 187.061 157.012 190.052C152.358 193.044 156.014 211.992 158.341 216.978C162.995 225.621 171.305 230.275 179.948 230.275C188.591 230.275 196.901 225.621 201.555 216.978C203.882 211.992 207.539 193.044 202.885 190.052ZM234.797 174.761C224.492 174.761 216.181 180.412 216.181 187.393C216.181 194.374 224.492 200.025 234.797 200.025C244.769 200.025 253.079 194.374 253.079 187.393C253.079 180.412 244.769 174.761 234.797 174.761ZM125.1 174.761C115.127 174.761 106.817 180.412 106.817 187.393C106.817 194.374 115.127 200.025 125.1 200.025C135.405 200.025 143.715 194.374 143.715 187.393C143.715 180.412 135.405 174.761 125.1 174.761ZM230.475 159.803C240.78 166.451 239.783 153.487 230.475 145.176C224.159 139.858 216.181 139.858 210.198 145.176C200.558 153.487 199.561 166.451 210.198 159.803C216.181 155.481 224.159 155.481 230.475 159.803ZM149.698 145.176C143.715 139.858 135.737 139.858 129.421 145.176C120.113 153.487 119.116 166.451 129.421 159.803C135.737 155.481 143.715 155.481 149.698 159.803C160.336 166.451 159.338 153.487 149.698 145.176Z");
			attr(path4, "fill", "white");
			attr(svg, "class", "appIcon svelte-1mx7g4j");
			attr(svg, "width", "360");
			attr(svg, "height", "360");
			attr(svg, "viewBox", "0 0 360 360");
			attr(svg, "fill", "none");
			attr(svg, "xmlns", "http://www.w3.org/2000/svg");
		},
		m(target, anchor) {
			insert(target, h2, anchor);
			insert(target, t1, anchor);
			insert(target, h3, anchor);
			h3.innerHTML = raw_value;
			insert(target, t2, anchor);
			insert(target, svg, anchor);
			append(svg, rect);
			append(svg, path0);
			append(svg, path1);
			append(svg, path2);
			append(svg, path3);
			append(svg, path4);
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;
			if (dirty & /*$setLang*/ 1 && raw_value !== (raw_value = cardText[0][/*$setLang*/ ctx[0]] + "")) h3.innerHTML = raw_value;		},
		i(local) {
			if (!h2_intro) {
				add_render_callback(() => {
					h2_intro = create_in_transition(h2, fade, {
						easing: cubicInOut,
						duration: 400,
						delay: 400
					});

					h2_intro.start();
				});
			}

			if (!h3_intro) {
				add_render_callback(() => {
					h3_intro = create_in_transition(h3, fade, {
						easing: cubicInOut,
						duration: 400,
						delay: 500
					});

					h3_intro.start();
				});
			}

			if (!svg_intro) {
				add_render_callback(() => {
					svg_intro = create_in_transition(svg, fade, {
						easing: cubicInOut,
						duration: 400,
						delay: 600
					});

					svg_intro.start();
				});
			}
		},
		o: noop,
		d(detaching) {
			if (detaching) detach(h2);
			if (detaching) detach(t1);
			if (detaching) detach(h3);
			if (detaching) detach(t2);
			if (detaching) detach(svg);
		}
	};
}

// (66:4) <Card styles="{'var(--theme1);--text-color:var(--text2)'}" >
function create_default_slot_7(ctx) {
	let img;
	let img_src_value;
	let t;
	let p;
	let raw_value = cardText[1][/*$setLang*/ ctx[0]] + "";

	return {
		c() {
			img = element("img");
			t = space();
			p = element("p");
			if (!src_url_equal(img.src, img_src_value = urlBase + "gif/intro.gif")) attr(img, "src", img_src_value);
			attr(img, "class", "svelte-1mx7g4j");
			attr(p, "class", "instr svelte-1mx7g4j");
		},
		m(target, anchor) {
			insert(target, img, anchor);
			insert(target, t, anchor);
			insert(target, p, anchor);
			p.innerHTML = raw_value;
		},
		p(ctx, dirty) {
			if (dirty & /*$setLang*/ 1 && raw_value !== (raw_value = cardText[1][/*$setLang*/ ctx[0]] + "")) p.innerHTML = raw_value;		},
		d(detaching) {
			if (detaching) detach(img);
			if (detaching) detach(t);
			if (detaching) detach(p);
		}
	};
}

// (70:4) <Card styles="{'--theme-color:var(--theme1);--text-color:var(--text2);'}">
function create_default_slot_6(ctx) {
	let img;
	let img_src_value;
	let t;
	let p;
	let raw_value = cardText[2][/*$setLang*/ ctx[0]] + "";

	return {
		c() {
			img = element("img");
			t = space();
			p = element("p");
			if (!src_url_equal(img.src, img_src_value = urlBase + "gif/charupload.gif")) attr(img, "src", img_src_value);
			attr(img, "class", "svelte-1mx7g4j");
			attr(p, "class", "instr svelte-1mx7g4j");
		},
		m(target, anchor) {
			insert(target, img, anchor);
			insert(target, t, anchor);
			insert(target, p, anchor);
			p.innerHTML = raw_value;
		},
		p(ctx, dirty) {
			if (dirty & /*$setLang*/ 1 && raw_value !== (raw_value = cardText[2][/*$setLang*/ ctx[0]] + "")) p.innerHTML = raw_value;		},
		d(detaching) {
			if (detaching) detach(img);
			if (detaching) detach(t);
			if (detaching) detach(p);
		}
	};
}

// (74:4) <Card styles="{'--theme-color:var(--theme1);--text-color:var(--text2);'}">
function create_default_slot_5(ctx) {
	let img;
	let img_src_value;
	let t;
	let p;
	let raw_value = cardText[3][/*$setLang*/ ctx[0]] + "";

	return {
		c() {
			img = element("img");
			t = space();
			p = element("p");
			if (!src_url_equal(img.src, img_src_value = urlBase + "gif/friends.gif")) attr(img, "src", img_src_value);
			attr(img, "class", "svelte-1mx7g4j");
			attr(p, "class", "instr svelte-1mx7g4j");
		},
		m(target, anchor) {
			insert(target, img, anchor);
			insert(target, t, anchor);
			insert(target, p, anchor);
			p.innerHTML = raw_value;
		},
		p(ctx, dirty) {
			if (dirty & /*$setLang*/ 1 && raw_value !== (raw_value = cardText[3][/*$setLang*/ ctx[0]] + "")) p.innerHTML = raw_value;		},
		d(detaching) {
			if (detaching) detach(img);
			if (detaching) detach(t);
			if (detaching) detach(p);
		}
	};
}

// (78:4) <Card styles="{'--theme-color:var(--theme1);--text-color:var(--text2);'}">
function create_default_slot_4(ctx) {
	let img;
	let img_src_value;
	let t;
	let p;
	let raw_value = cardText[4][/*$setLang*/ ctx[0]] + "";

	return {
		c() {
			img = element("img");
			t = space();
			p = element("p");
			if (!src_url_equal(img.src, img_src_value = urlBase + "gif/backgrounds.gif")) attr(img, "src", img_src_value);
			attr(img, "class", "svelte-1mx7g4j");
			attr(p, "class", "instr svelte-1mx7g4j");
		},
		m(target, anchor) {
			insert(target, img, anchor);
			insert(target, t, anchor);
			insert(target, p, anchor);
			p.innerHTML = raw_value;
		},
		p(ctx, dirty) {
			if (dirty & /*$setLang*/ 1 && raw_value !== (raw_value = cardText[4][/*$setLang*/ ctx[0]] + "")) p.innerHTML = raw_value;		},
		d(detaching) {
			if (detaching) detach(img);
			if (detaching) detach(t);
			if (detaching) detach(p);
		}
	};
}

// (82:6) <Card styles="{'--theme-color:var(--theme4);--text-color:var(--text2);'}">
function create_default_slot_3(ctx) {
	let h2;
	let t1;
	let section;
	let h4;
	let t2_value = cardText[5].header[/*$setLang*/ ctx[0]] + "";
	let t2;
	let t3;
	let p;
	let raw_value = cardText[5].p[/*$setLang*/ ctx[0]] + "";
	let t4;
	let div;

	return {
		c() {
			h2 = element("h2");
			h2.textContent = "kalidoface";
			t1 = space();
			section = element("section");
			h4 = element("h4");
			t2 = text(t2_value);
			t3 = space();
			p = element("p");
			t4 = space();
			div = element("div");

			div.innerHTML = `<a href="https://github.com/yeemachine/kalidokit"><span class="icon github svelte-1mx7g4j"><svg class="svelte-1mx7g4j"><use xlink:href="#svg-icon-github"></use></svg></span></a> 
         <a href="https://instagram.com/yeemachine"><span class="icon github svelte-1mx7g4j"><svg class="svelte-1mx7g4j"><use xlink:href="#svg-icon-instagram"></use></svg></span></a> 
         <a href="https://twitter.com/yeemachine"><span class="icon github svelte-1mx7g4j"><svg class="svelte-1mx7g4j"><use xlink:href="#svg-icon-twitter"></use></svg></span></a>`;

			attr(h2, "class", "notranslate svelte-1mx7g4j");
			set_style(h2, "color", "var(--accent1)");
			set_style(h4, "color", "var(--accent1)");
			attr(h4, "class", "svelte-1mx7g4j");
			attr(p, "class", "svelte-1mx7g4j");
			attr(section, "class", "svelte-1mx7g4j");
			attr(div, "class", "soc svelte-1mx7g4j");
		},
		m(target, anchor) {
			insert(target, h2, anchor);
			insert(target, t1, anchor);
			insert(target, section, anchor);
			append(section, h4);
			append(h4, t2);
			append(section, t3);
			append(section, p);
			p.innerHTML = raw_value;
			insert(target, t4, anchor);
			insert(target, div, anchor);
		},
		p(ctx, dirty) {
			if (dirty & /*$setLang*/ 1 && t2_value !== (t2_value = cardText[5].header[/*$setLang*/ ctx[0]] + "")) set_data(t2, t2_value);
			if (dirty & /*$setLang*/ 1 && raw_value !== (raw_value = cardText[5].p[/*$setLang*/ ctx[0]] + "")) p.innerHTML = raw_value;		},
		d(detaching) {
			if (detaching) detach(h2);
			if (detaching) detach(t1);
			if (detaching) detach(section);
			if (detaching) detach(t4);
			if (detaching) detach(div);
		}
	};
}

// (98:5) <Card styles="{'--theme-color:var(--theme4);--text-color:var(--text2);'}">
function create_default_slot_2(ctx) {
	let h2;
	let t1;
	let div0;
	let h4;
	let t2_value = cardText[6].header[/*$setLang*/ ctx[0]] + "";
	let t2;
	let t3;
	let p0;
	let t4_value = cardText[6].p[/*$setLang*/ ctx[0]] + "";
	let t4;
	let t5;
	let ul;
	let li0;
	let p1;
	let p2;
	let t7_value = cardText[6].list[/*$setLang*/ ctx[0]][0] + "";
	let t7;
	let t8;
	let li1;
	let p3;
	let p4;
	let t10_value = cardText[6].list[/*$setLang*/ ctx[0]][1] + "";
	let t10;
	let t11;
	let li2;
	let p5;
	let p6;
	let t13_value = cardText[6].list[/*$setLang*/ ctx[0]][2] + "";
	let t13;
	let t14;
	let li3;
	let p7;
	let p8;
	let t16_value = cardText[6].list[/*$setLang*/ ctx[0]][3] + "";
	let t16;
	let t17;
	let li4;
	let p9;
	let p10;
	let t19_value = cardText[6].list[/*$setLang*/ ctx[0]][4] + "";
	let t19;
	let t20;
	let div1;

	return {
		c() {
			h2 = element("h2");
			h2.textContent = "kalidoface";
			t1 = space();
			div0 = element("div");
			h4 = element("h4");
			t2 = text(t2_value);
			t3 = space();
			p0 = element("p");
			t4 = text(t4_value);
			t5 = space();
			ul = element("ul");
			li0 = element("li");
			p1 = element("p");
			p1.innerHTML = `<a href="https://twitter.com/hootalex">hootalex</a>`;
			p2 = element("p");
			t7 = text(t7_value);
			t8 = space();
			li1 = element("li");
			p3 = element("p");
			p3.innerHTML = `<a href="https://pixiv.github.io/three-vrm/docs/">Pixiv</a>`;
			p4 = element("p");
			t10 = text(t10_value);
			t11 = space();
			li2 = element("li");
			p5 = element("p");
			p5.innerHTML = `<a href="https://glitch.com">Glitch</a>`;
			p6 = element("p");
			t13 = text(t13_value);
			t14 = space();
			li3 = element("li");
			p7 = element("p");
			p7.innerHTML = `<a href="https://google.github.io/mediapipe/">Google MediaPipe</a>`;
			p8 = element("p");
			t16 = text(t16_value);
			t17 = space();
			li4 = element("li");
			p9 = element("p");
			p9.innerHTML = `<a href="https://hub.vroid.com/">Tensorflow.js</a>`;
			p10 = element("p");
			t19 = text(t19_value);
			t20 = space();
			div1 = element("div");
			attr(h2, "class", "notranslate svelte-1mx7g4j");
			set_style(h2, "color", "var(--accent1)");
			set_style(h4, "color", "var(--accent1)");
			attr(h4, "class", "svelte-1mx7g4j");
			attr(p0, "class", "svelte-1mx7g4j");
			attr(p1, "class", "svelte-1mx7g4j");
			attr(p2, "class", "svelte-1mx7g4j");
			attr(li0, "class", "svelte-1mx7g4j");
			attr(p3, "class", "svelte-1mx7g4j");
			attr(p4, "class", "svelte-1mx7g4j");
			attr(li1, "class", "svelte-1mx7g4j");
			attr(p5, "class", "svelte-1mx7g4j");
			attr(p6, "class", "svelte-1mx7g4j");
			attr(li2, "class", "svelte-1mx7g4j");
			attr(p7, "class", "svelte-1mx7g4j");
			attr(p8, "class", "svelte-1mx7g4j");
			attr(li3, "class", "svelte-1mx7g4j");
			attr(p9, "class", "svelte-1mx7g4j");
			attr(p10, "class", "svelte-1mx7g4j");
			attr(li4, "class", "svelte-1mx7g4j");
			attr(ul, "class", "svelte-1mx7g4j");
			attr(div0, "class", "svelte-1mx7g4j");
			attr(div1, "class", "svelte-1mx7g4j");
		},
		m(target, anchor) {
			insert(target, h2, anchor);
			insert(target, t1, anchor);
			insert(target, div0, anchor);
			append(div0, h4);
			append(h4, t2);
			append(div0, t3);
			append(div0, p0);
			append(p0, t4);
			append(div0, t5);
			append(div0, ul);
			append(ul, li0);
			append(li0, p1);
			append(li0, p2);
			append(p2, t7);
			append(ul, t8);
			append(ul, li1);
			append(li1, p3);
			append(li1, p4);
			append(p4, t10);
			append(ul, t11);
			append(ul, li2);
			append(li2, p5);
			append(li2, p6);
			append(p6, t13);
			append(ul, t14);
			append(ul, li3);
			append(li3, p7);
			append(li3, p8);
			append(p8, t16);
			append(ul, t17);
			append(ul, li4);
			append(li4, p9);
			append(li4, p10);
			append(p10, t19);
			insert(target, t20, anchor);
			insert(target, div1, anchor);
		},
		p(ctx, dirty) {
			if (dirty & /*$setLang*/ 1 && t2_value !== (t2_value = cardText[6].header[/*$setLang*/ ctx[0]] + "")) set_data(t2, t2_value);
			if (dirty & /*$setLang*/ 1 && t4_value !== (t4_value = cardText[6].p[/*$setLang*/ ctx[0]] + "")) set_data(t4, t4_value);
			if (dirty & /*$setLang*/ 1 && t7_value !== (t7_value = cardText[6].list[/*$setLang*/ ctx[0]][0] + "")) set_data(t7, t7_value);
			if (dirty & /*$setLang*/ 1 && t10_value !== (t10_value = cardText[6].list[/*$setLang*/ ctx[0]][1] + "")) set_data(t10, t10_value);
			if (dirty & /*$setLang*/ 1 && t13_value !== (t13_value = cardText[6].list[/*$setLang*/ ctx[0]][2] + "")) set_data(t13, t13_value);
			if (dirty & /*$setLang*/ 1 && t16_value !== (t16_value = cardText[6].list[/*$setLang*/ ctx[0]][3] + "")) set_data(t16, t16_value);
			if (dirty & /*$setLang*/ 1 && t19_value !== (t19_value = cardText[6].list[/*$setLang*/ ctx[0]][4] + "")) set_data(t19, t19_value);
		},
		d(detaching) {
			if (detaching) detach(h2);
			if (detaching) detach(t1);
			if (detaching) detach(div0);
			if (detaching) detach(t20);
			if (detaching) detach(div1);
		}
	};
}

// (120:11) {#each presetModels as model}
function create_each_block(ctx) {
	let li;
	let p0;
	let img;
	let img_src_value;
	let t0;
	let a;
	let t1_value = /*model*/ ctx[4].name + "";
	let t1;
	let a_href_value;
	let t2;
	let p1;
	let t3_value = /*model*/ ctx[4].author + "";
	let t3;
	let t4;

	return {
		c() {
			li = element("li");
			p0 = element("p");
			img = element("img");
			t0 = space();
			a = element("a");
			t1 = text(t1_value);
			t2 = space();
			p1 = element("p");
			t3 = text(t3_value);
			t4 = space();
			if (!src_url_equal(img.src, img_src_value = /*model*/ ctx[4].icon)) attr(img, "src", img_src_value);
			attr(img, "class", "svelte-1mx7g4j");
			attr(a, "href", a_href_value = /*model*/ ctx[4].source);
			set_style(p0, "display", "flex");
			set_style(p0, "align-items", "center");
			attr(p0, "class", "svelte-1mx7g4j");
			attr(p1, "class", "svelte-1mx7g4j");
			attr(li, "class", "modelCredit svelte-1mx7g4j");
		},
		m(target, anchor) {
			insert(target, li, anchor);
			append(li, p0);
			append(p0, img);
			append(p0, t0);
			append(p0, a);
			append(a, t1);
			append(li, t2);
			append(li, p1);
			append(p1, t3);
			append(li, t4);
		},
		p: noop,
		d(detaching) {
			if (detaching) detach(li);
		}
	};
}

// (114:4) <Card styles="{'--theme-color:var(--theme4);--text-color:var(--text2);'}">
function create_default_slot_1(ctx) {
	let h2;
	let t1;
	let div0;
	let h4;
	let t2_value = cardText[7].header[/*$setLang*/ ctx[0]] + "";
	let t2;
	let t3;
	let p;
	let t4_value = cardText[7].p[/*$setLang*/ ctx[0]] + "";
	let t4;
	let t5;
	let ul;
	let t6;
	let div1;
	let each_value = presetModels;
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	return {
		c() {
			h2 = element("h2");
			h2.textContent = "kalidoface";
			t1 = space();
			div0 = element("div");
			h4 = element("h4");
			t2 = text(t2_value);
			t3 = space();
			p = element("p");
			t4 = text(t4_value);
			t5 = space();
			ul = element("ul");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t6 = space();
			div1 = element("div");
			attr(h2, "class", "notranslate svelte-1mx7g4j");
			set_style(h2, "color", "var(--accent1)");
			set_style(h4, "color", "var(--accent1)");
			attr(h4, "class", "svelte-1mx7g4j");
			attr(p, "class", "svelte-1mx7g4j");
			attr(ul, "class", "svelte-1mx7g4j");
			attr(div0, "class", "svelte-1mx7g4j");
			attr(div1, "class", "svelte-1mx7g4j");
		},
		m(target, anchor) {
			insert(target, h2, anchor);
			insert(target, t1, anchor);
			insert(target, div0, anchor);
			append(div0, h4);
			append(h4, t2);
			append(div0, t3);
			append(div0, p);
			append(p, t4);
			append(div0, t5);
			append(div0, ul);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(ul, null);
			}

			insert(target, t6, anchor);
			insert(target, div1, anchor);
		},
		p(ctx, dirty) {
			if (dirty & /*$setLang*/ 1 && t2_value !== (t2_value = cardText[7].header[/*$setLang*/ ctx[0]] + "")) set_data(t2, t2_value);
			if (dirty & /*$setLang*/ 1 && t4_value !== (t4_value = cardText[7].p[/*$setLang*/ ctx[0]] + "")) set_data(t4, t4_value);

			if (dirty & /*presetModels*/ 0) {
				each_value = presetModels;
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(ul, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}
		},
		d(detaching) {
			if (detaching) detach(h2);
			if (detaching) detach(t1);
			if (detaching) detach(div0);
			destroy_each(each_blocks, detaching);
			if (detaching) detach(t6);
			if (detaching) detach(div1);
		}
	};
}

// (44:2) <CardSwipe>
function create_default_slot$1(ctx) {
	let card0;
	let t0;
	let card1;
	let t1;
	let card2;
	let t2;
	let card3;
	let t3;
	let card4;
	let t4;
	let card5;
	let t5;
	let card6;
	let t6;
	let card7;
	let t7;
	let button;
	let t8_value = cardEndText.close[/*$setLang*/ ctx[0]] + "";
	let t8;
	let t9;
	let i0;
	let t11;
	let i1;
	let current;
	let mounted;
	let dispose;

	card0 = new Card({
			props: {
				styles: 'align-items:flex-end;--theme-color:var(--theme0);--text-color:var(--text0);',
				isCurrent: true,
				$$slots: { default: [create_default_slot_8] },
				$$scope: { ctx }
			}
		});

	card1 = new Card({
			props: {
				styles: 'var(--theme1);--text-color:var(--text2)',
				$$slots: { default: [create_default_slot_7] },
				$$scope: { ctx }
			}
		});

	card2 = new Card({
			props: {
				styles: '--theme-color:var(--theme1);--text-color:var(--text2);',
				$$slots: { default: [create_default_slot_6] },
				$$scope: { ctx }
			}
		});

	card3 = new Card({
			props: {
				styles: '--theme-color:var(--theme1);--text-color:var(--text2);',
				$$slots: { default: [create_default_slot_5] },
				$$scope: { ctx }
			}
		});

	card4 = new Card({
			props: {
				styles: '--theme-color:var(--theme1);--text-color:var(--text2);',
				$$slots: { default: [create_default_slot_4] },
				$$scope: { ctx }
			}
		});

	card5 = new Card({
			props: {
				styles: '--theme-color:var(--theme4);--text-color:var(--text2);',
				$$slots: { default: [create_default_slot_3] },
				$$scope: { ctx }
			}
		});

	card6 = new Card({
			props: {
				styles: '--theme-color:var(--theme4);--text-color:var(--text2);',
				$$slots: { default: [create_default_slot_2] },
				$$scope: { ctx }
			}
		});

	card7 = new Card({
			props: {
				styles: '--theme-color:var(--theme4);--text-color:var(--text2);',
				$$slots: { default: [create_default_slot_1] },
				$$scope: { ctx }
			}
		});

	return {
		c() {
			create_component(card0.$$.fragment);
			t0 = space();
			create_component(card1.$$.fragment);
			t1 = space();
			create_component(card2.$$.fragment);
			t2 = space();
			create_component(card3.$$.fragment);
			t3 = space();
			create_component(card4.$$.fragment);
			t4 = space();
			create_component(card5.$$.fragment);
			t5 = space();
			create_component(card6.$$.fragment);
			t6 = space();
			create_component(card7.$$.fragment);
			t7 = space();
			button = element("button");
			t8 = text(t8_value);
			t9 = space();
			i0 = element("i");
			i0.textContent = "jellyfill";
			t11 = space();
			i1 = element("i");
			i1.textContent = "jellyfill";
			attr(i0, "class", "kalicon notranslate focus");
			attr(i1, "class", "kalicon notranslate shadow");
			attr(button, "class", "launch svelte-1mx7g4j");
		},
		m(target, anchor) {
			mount_component(card0, target, anchor);
			insert(target, t0, anchor);
			mount_component(card1, target, anchor);
			insert(target, t1, anchor);
			mount_component(card2, target, anchor);
			insert(target, t2, anchor);
			mount_component(card3, target, anchor);
			insert(target, t3, anchor);
			mount_component(card4, target, anchor);
			insert(target, t4, anchor);
			mount_component(card5, target, anchor);
			insert(target, t5, anchor);
			mount_component(card6, target, anchor);
			insert(target, t6, anchor);
			mount_component(card7, target, anchor);
			insert(target, t7, anchor);
			insert(target, button, anchor);
			append(button, t8);
			append(button, t9);
			append(button, i0);
			append(button, t11);
			append(button, i1);
			current = true;

			if (!mounted) {
				dispose = listen(button, "click", /*handleInfo*/ ctx[1]);
				mounted = true;
			}
		},
		p(ctx, dirty) {
			const card0_changes = {};

			if (dirty & /*$$scope, $setLang*/ 129) {
				card0_changes.$$scope = { dirty, ctx };
			}

			card0.$set(card0_changes);
			const card1_changes = {};

			if (dirty & /*$$scope, $setLang*/ 129) {
				card1_changes.$$scope = { dirty, ctx };
			}

			card1.$set(card1_changes);
			const card2_changes = {};

			if (dirty & /*$$scope, $setLang*/ 129) {
				card2_changes.$$scope = { dirty, ctx };
			}

			card2.$set(card2_changes);
			const card3_changes = {};

			if (dirty & /*$$scope, $setLang*/ 129) {
				card3_changes.$$scope = { dirty, ctx };
			}

			card3.$set(card3_changes);
			const card4_changes = {};

			if (dirty & /*$$scope, $setLang*/ 129) {
				card4_changes.$$scope = { dirty, ctx };
			}

			card4.$set(card4_changes);
			const card5_changes = {};

			if (dirty & /*$$scope, $setLang*/ 129) {
				card5_changes.$$scope = { dirty, ctx };
			}

			card5.$set(card5_changes);
			const card6_changes = {};

			if (dirty & /*$$scope, $setLang*/ 129) {
				card6_changes.$$scope = { dirty, ctx };
			}

			card6.$set(card6_changes);
			const card7_changes = {};

			if (dirty & /*$$scope, $setLang*/ 129) {
				card7_changes.$$scope = { dirty, ctx };
			}

			card7.$set(card7_changes);
			if ((!current || dirty & /*$setLang*/ 1) && t8_value !== (t8_value = cardEndText.close[/*$setLang*/ ctx[0]] + "")) set_data(t8, t8_value);
		},
		i(local) {
			if (current) return;
			transition_in(card0.$$.fragment, local);
			transition_in(card1.$$.fragment, local);
			transition_in(card2.$$.fragment, local);
			transition_in(card3.$$.fragment, local);
			transition_in(card4.$$.fragment, local);
			transition_in(card5.$$.fragment, local);
			transition_in(card6.$$.fragment, local);
			transition_in(card7.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(card0.$$.fragment, local);
			transition_out(card1.$$.fragment, local);
			transition_out(card2.$$.fragment, local);
			transition_out(card3.$$.fragment, local);
			transition_out(card4.$$.fragment, local);
			transition_out(card5.$$.fragment, local);
			transition_out(card6.$$.fragment, local);
			transition_out(card7.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(card0, detaching);
			if (detaching) detach(t0);
			destroy_component(card1, detaching);
			if (detaching) detach(t1);
			destroy_component(card2, detaching);
			if (detaching) detach(t2);
			destroy_component(card3, detaching);
			if (detaching) detach(t3);
			destroy_component(card4, detaching);
			if (detaching) detach(t4);
			destroy_component(card5, detaching);
			if (detaching) detach(t5);
			destroy_component(card6, detaching);
			if (detaching) detach(t6);
			destroy_component(card7, detaching);
			if (detaching) detach(t7);
			if (detaching) detach(button);
			mounted = false;
			dispose();
		}
	};
}

function create_fragment$2(ctx) {
	let container;
	let a;
	let a_intro;
	let a_outro;
	let t0;
	let svg;
	let symbol0;
	let path0;
	let symbol1;
	let path1;
	let symbol2;
	let path2;
	let path3;
	let circle;
	let t1;
	let div;
	let cardswipe;
	let div_intro;
	let div_outro;
	let current;

	cardswipe = new CardSwipe({
			props: {
				$$slots: { default: [create_default_slot$1] },
				$$scope: { ctx }
			}
		});

	return {
		c() {
			container = element("container");
			a = element("a");
			a.innerHTML = `<img height="36" style="border:0px;height:36px;width:auto" src="https://cdn.glitch.com/239c5934-4d83-4c5c-bef6-44dcdb04c8fb%2Fkofi.png?v=1626708861780" border="0" alt="Buy Me a Coffee at ko-fi.com" class="svelte-1mx7g4j"/>`;
			t0 = space();
			svg = svg_element("svg");
			symbol0 = svg_element("symbol");
			path0 = svg_element("path");
			symbol1 = svg_element("symbol");
			path1 = svg_element("path");
			symbol2 = svg_element("symbol");
			path2 = svg_element("path");
			path3 = svg_element("path");
			circle = svg_element("circle");
			t1 = space();
			div = element("div");
			create_component(cardswipe.$$.fragment);
			attr(a, "href", "https://ko-fi.com/B0B75DIY1");
			attr(a, "target", "_blank");
			set_style(a, "position", "absolute");
			set_style(a, "left", "16px");
			set_style(a, "bottom", "16px");
			attr(path0, "d", "M419.6 168.6c-11.7 5.2-24.2 8.7-37.4 10.2 13.4-8.1 23.8-20.8 28.6-36 -12.6 7.5-26.5 12.9-41.3 15.8 -11.9-12.6-28.8-20.6-47.5-20.6 -42 0-72.9 39.2-63.4 79.9 -54.1-2.7-102.1-28.6-134.2-68 -17 29.2-8.8 67.5 20.1 86.9 -10.7-0.3-20.7-3.3-29.5-8.1 -0.7 30.2 20.9 58.4 52.2 64.6 -9.2 2.5-19.2 3.1-29.4 1.1 8.3 25.9 32.3 44.7 60.8 45.2 -27.4 21.4-61.8 31-96.4 27 28.8 18.5 63 29.2 99.8 29.2 120.8 0 189.1-102.1 185-193.6C399.9 193.1 410.9 181.7 419.6 168.6z");
			attr(symbol0, "id", "svg-icon-twitter");
			attr(symbol0, "title", "Twitter");
			attr(symbol0, "viewBox", "0 0 512 512");
			attr(path1, "d", "M256 70.7c-102.6 0-185.9 83.2-185.9 185.9 0 82.1 53.3 151.8 127.1 176.4 9.3 1.7 12.3-4 12.3-8.9V389.4c-51.7 11.3-62.5-21.9-62.5-21.9 -8.4-21.5-20.6-27.2-20.6-27.2 -16.9-11.5 1.3-11.3 1.3-11.3 18.7 1.3 28.5 19.2 28.5 19.2 16.6 28.4 43.5 20.2 54.1 15.4 1.7-12 6.5-20.2 11.8-24.9 -41.3-4.7-84.7-20.6-84.7-91.9 0-20.3 7.3-36.9 19.2-49.9 -1.9-4.7-8.3-23.6 1.8-49.2 0 0 15.6-5 51.1 19.1 14.8-4.1 30.7-6.2 46.5-6.3 15.8 0.1 31.7 2.1 46.6 6.3 35.5-24 51.1-19.1 51.1-19.1 10.1 25.6 3.8 44.5 1.8 49.2 11.9 13 19.1 29.6 19.1 49.9 0 71.4-43.5 87.1-84.9 91.7 6.7 5.8 12.8 17.1 12.8 34.4 0 24.9 0 44.9 0 51 0 4.9 3 10.7 12.4 8.9 73.8-24.6 127-94.3 127-176.4C441.9 153.9 358.6 70.7 256 70.7z");
			attr(symbol1, "id", "svg-icon-github");
			attr(symbol1, "title", "GitHub");
			attr(symbol1, "viewBox", "0 0 512 512");
			attr(path2, "d", "M256 109.3c47.8 0 53.4 0.2 72.3 1 17.4 0.8 26.9 3.7 33.2 6.2 8.4 3.2 14.3 7.1 20.6 13.4 6.3 6.3 10.1 12.2 13.4 20.6 2.5 6.3 5.4 15.8 6.2 33.2 0.9 18.9 1 24.5 1 72.3s-0.2 53.4-1 72.3c-0.8 17.4-3.7 26.9-6.2 33.2 -3.2 8.4-7.1 14.3-13.4 20.6 -6.3 6.3-12.2 10.1-20.6 13.4 -6.3 2.5-15.8 5.4-33.2 6.2 -18.9 0.9-24.5 1-72.3 1s-53.4-0.2-72.3-1c-17.4-0.8-26.9-3.7-33.2-6.2 -8.4-3.2-14.3-7.1-20.6-13.4 -6.3-6.3-10.1-12.2-13.4-20.6 -2.5-6.3-5.4-15.8-6.2-33.2 -0.9-18.9-1-24.5-1-72.3s0.2-53.4 1-72.3c0.8-17.4 3.7-26.9 6.2-33.2 3.2-8.4 7.1-14.3 13.4-20.6 6.3-6.3 12.2-10.1 20.6-13.4 6.3-2.5 15.8-5.4 33.2-6.2C202.6 109.5 208.2 109.3 256 109.3M256 77.1c-48.6 0-54.7 0.2-73.8 1.1 -19 0.9-32.1 3.9-43.4 8.3 -11.8 4.6-21.7 10.7-31.7 20.6 -9.9 9.9-16.1 19.9-20.6 31.7 -4.4 11.4-7.4 24.4-8.3 43.4 -0.9 19.1-1.1 25.2-1.1 73.8 0 48.6 0.2 54.7 1.1 73.8 0.9 19 3.9 32.1 8.3 43.4 4.6 11.8 10.7 21.7 20.6 31.7 9.9 9.9 19.9 16.1 31.7 20.6 11.4 4.4 24.4 7.4 43.4 8.3 19.1 0.9 25.2 1.1 73.8 1.1s54.7-0.2 73.8-1.1c19-0.9 32.1-3.9 43.4-8.3 11.8-4.6 21.7-10.7 31.7-20.6 9.9-9.9 16.1-19.9 20.6-31.7 4.4-11.4 7.4-24.4 8.3-43.4 0.9-19.1 1.1-25.2 1.1-73.8s-0.2-54.7-1.1-73.8c-0.9-19-3.9-32.1-8.3-43.4 -4.6-11.8-10.7-21.7-20.6-31.7 -9.9-9.9-19.9-16.1-31.7-20.6 -11.4-4.4-24.4-7.4-43.4-8.3C310.7 77.3 304.6 77.1 256 77.1L256 77.1z");
			attr(path3, "d", "M256 164.1c-50.7 0-91.9 41.1-91.9 91.9s41.1 91.9 91.9 91.9 91.9-41.1 91.9-91.9S306.7 164.1 256 164.1zM256 315.6c-32.9 0-59.6-26.7-59.6-59.6s26.7-59.6 59.6-59.6 59.6 26.7 59.6 59.6S288.9 315.6 256 315.6z");
			attr(circle, "cx", "351.5");
			attr(circle, "cy", "160.5");
			attr(circle, "r", "21.5");
			attr(symbol2, "id", "svg-icon-instagram");
			attr(symbol2, "title", "Instagram");
			attr(symbol2, "viewBox", "0 0 512 512");
			attr(svg, "xmlns", "http://www.w3.org/2000/svg");
			set_style(svg, "display", "none");
			attr(div, "class", "svelte-1mx7g4j");
			attr(container, "class", "svelte-1mx7g4j");
		},
		m(target, anchor) {
			insert(target, container, anchor);
			append(container, a);
			append(container, t0);
			append(container, svg);
			append(svg, symbol0);
			append(symbol0, path0);
			append(svg, symbol1);
			append(symbol1, path1);
			append(svg, symbol2);
			append(symbol2, path2);
			append(symbol2, path3);
			append(symbol2, circle);
			append(container, t1);
			append(container, div);
			mount_component(cardswipe, div, null);
			current = true;
		},
		p(new_ctx, [dirty]) {
			ctx = new_ctx;
			const cardswipe_changes = {};

			if (dirty & /*$$scope, $setLang*/ 129) {
				cardswipe_changes.$$scope = { dirty, ctx };
			}

			cardswipe.$set(cardswipe_changes);
		},
		i(local) {
			if (current) return;

			add_render_callback(() => {
				if (a_outro) a_outro.end(1);

				a_intro = create_in_transition(a, scale, {
					delay: 500,
					duration: 600,
					easing: cubicInOut,
					baseScale: 0.9
				});

				a_intro.start();
			});

			transition_in(cardswipe.$$.fragment, local);

			add_render_callback(() => {
				if (div_outro) div_outro.end(1);

				div_intro = create_in_transition(div, fly, {
					y: 20,
					easing: cubicInOut,
					duration: 400,
					delay: 200
				});

				div_intro.start();
			});

			current = true;
		},
		o(local) {
			if (a_intro) a_intro.invalidate();
			a_outro = create_out_transition(a, fade, { duration: 200 });
			transition_out(cardswipe.$$.fragment, local);
			if (div_intro) div_intro.invalidate();
			div_outro = create_out_transition(div, fly, { y: 20, easing: cubicInOut, duration: 400 });
			current = false;
		},
		d(detaching) {
			if (detaching) detach(container);
			if (detaching && a_outro) a_outro.end();
			destroy_component(cardswipe);
			if (detaching && div_outro) div_outro.end();
		}
	};
}

function instance$2($$self, $$props, $$invalidate) {
	let $infoExpanded;
	let $largeWipe;
	let $setLang;
	component_subscribe($$self, infoExpanded, $$value => $$invalidate(2, $infoExpanded = $$value));
	component_subscribe($$self, largeWipe, $$value => $$invalidate(3, $largeWipe = $$value));
	component_subscribe($$self, setLang, $$value => $$invalidate(0, $setLang = $$value));

	const handleInfo = e => {
		// e.preventDefault()
		if (!$largeWipe.transition) {
			infoExpanded.set(!$infoExpanded);
		}
	};

	return [$setLang, handleInfo];
}

class Credits extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});
	}
}

var cover_svelte_svelte_type_style_lang = '';

/* src/ui/cover.svelte generated by Svelte v3.46.4 */

function create_default_slot(ctx) {
	let style;
	let t1;
	let defs;
	let linearGradient0;
	let stop0;
	let stop1;
	let linearGradient1;
	let stop2;
	let stop3;
	let linearGradient2;
	let stop4;
	let stop5;
	let t2;
	let path0;
	let path0_fill_value;
	let t3;
	let path1;
	let path1_fill_value;
	let t4;
	let path2;
	let path2_fill_value;

	return {
		c() {
			style = element("style");
			style.textContent = "svg{\n             position:absolute;\n           }";
			t1 = space();
			defs = svg_element("defs");
			linearGradient0 = svg_element("linearGradient");
			stop0 = svg_element("stop");
			stop1 = svg_element("stop");
			linearGradient1 = svg_element("linearGradient");
			stop2 = svg_element("stop");
			stop3 = svg_element("stop");
			linearGradient2 = svg_element("linearGradient");
			stop4 = svg_element("stop");
			stop5 = svg_element("stop");
			t2 = space();
			path0 = svg_element("path");
			t3 = space();
			path1 = svg_element("path");
			t4 = space();
			path2 = svg_element("path");
			attr(stop0, "offset", "0%");
			attr(stop0, "stop-color", "#5800C9");
			attr(stop1, "offset", "100%");
			attr(stop1, "stop-color", "#ff0ea1");
			attr(linearGradient0, "id", "gradient1");
			attr(linearGradient0, "x1", "0%");
			attr(linearGradient0, "y1", "0%");
			attr(linearGradient0, "x2", "0%");
			attr(linearGradient0, "y2", "100%");
			attr(stop2, "offset", "0%");
			attr(stop2, "stop-color", "#ffd392");
			attr(stop3, "offset", "100%");
			attr(stop3, "stop-color", "#ff3898");
			attr(linearGradient1, "id", "gradient2");
			attr(linearGradient1, "x1", "0%");
			attr(linearGradient1, "y1", "0%");
			attr(linearGradient1, "x2", "0%");
			attr(linearGradient1, "y2", "100%");
			attr(stop4, "offset", "0%");
			attr(stop4, "stop-color", "#38DBFF");
			attr(stop5, "offset", "100%");
			attr(stop5, "stop-color", "#5800C9");
			attr(linearGradient2, "id", "gradient3");
			attr(linearGradient2, "x1", "0%");
			attr(linearGradient2, "y1", "0%");
			attr(linearGradient2, "x2", "0%");
			attr(linearGradient2, "y2", "100%");
			attr(path0, "class", "shape-overlays__path");
			attr(path0, "fill", path0_fill_value = /*pageTheme*/ ctx[0][1]);
			attr(path1, "class", "shape-overlays__path");
			attr(path1, "fill", path1_fill_value = /*pageTheme*/ ctx[0][2]);
			attr(path2, "class", "shape-overlays__path");
			attr(path2, "fill", path2_fill_value = /*pageTheme*/ ctx[0][0]);
		},
		m(target, anchor) {
			insert(target, style, anchor);
			insert(target, t1, anchor);
			insert(target, defs, anchor);
			append(defs, linearGradient0);
			append(linearGradient0, stop0);
			append(linearGradient0, stop1);
			append(defs, linearGradient1);
			append(linearGradient1, stop2);
			append(linearGradient1, stop3);
			append(defs, linearGradient2);
			append(linearGradient2, stop4);
			append(linearGradient2, stop5);
			insert(target, t2, anchor);
			insert(target, path0, anchor);
			insert(target, t3, anchor);
			insert(target, path1, anchor);
			insert(target, t4, anchor);
			insert(target, path2, anchor);
		},
		p(ctx, dirty) {
			if (dirty & /*pageTheme*/ 1 && path0_fill_value !== (path0_fill_value = /*pageTheme*/ ctx[0][1])) {
				attr(path0, "fill", path0_fill_value);
			}

			if (dirty & /*pageTheme*/ 1 && path1_fill_value !== (path1_fill_value = /*pageTheme*/ ctx[0][2])) {
				attr(path1, "fill", path1_fill_value);
			}

			if (dirty & /*pageTheme*/ 1 && path2_fill_value !== (path2_fill_value = /*pageTheme*/ ctx[0][0])) {
				attr(path2, "fill", path2_fill_value);
			}
		},
		d(detaching) {
			if (detaching) detach(style);
			if (detaching) detach(t1);
			if (detaching) detach(defs);
			if (detaching) detach(t2);
			if (detaching) detach(path0);
			if (detaching) detach(t3);
			if (detaching) detach(path1);
			if (detaching) detach(t4);
			if (detaching) detach(path2);
		}
	};
}

// (77:4) {#if !$firstLoad}
function create_if_block_1(ctx) {
	let p;
	let raw_value = tagline[/*$setLang*/ ctx[4]] + "";
	let p_outro;
	let current;

	return {
		c() {
			p = element("p");
			attr(p, "id", "tagline");
			attr(p, "class", "svelte-1bjk5br");
		},
		m(target, anchor) {
			insert(target, p, anchor);
			p.innerHTML = raw_value;
			current = true;
		},
		p(ctx, dirty) {
			if ((!current || dirty & /*$setLang*/ 16) && raw_value !== (raw_value = tagline[/*$setLang*/ ctx[4]] + "")) p.innerHTML = raw_value;		},
		i(local) {
			if (current) return;
			if (p_outro) p_outro.end(1);
			current = true;
		},
		o(local) {
			p_outro = create_out_transition(p, fade, { duration: 200, delay: 600 });
			current = false;
		},
		d(detaching) {
			if (detaching) detach(p);
			if (detaching && p_outro) p_outro.end();
		}
	};
}

// (85:4) {#if $infoExpanded}
function create_if_block(ctx) {
	let credits;
	let current;
	credits = new Credits({});

	return {
		c() {
			create_component(credits.$$.fragment);
		},
		m(target, anchor) {
			mount_component(credits, target, anchor);
			current = true;
		},
		i(local) {
			if (current) return;
			transition_in(credits.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(credits.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(credits, detaching);
		}
	};
}

function create_fragment$1(ctx) {
	let container;
	let svgwipe;
	let t0;
	let t1;
	let container_class_value;
	let current;

	let svgwipe_props = {
		isOpen: true,
		$$slots: { default: [create_default_slot] },
		$$scope: { ctx }
	};

	svgwipe = new SVGWipe({ props: svgwipe_props });
	/*svgwipe_binding*/ ctx[5](svgwipe);
	let if_block0 = !/*$firstLoad*/ ctx[2] && create_if_block_1(ctx);
	let if_block1 = /*$infoExpanded*/ ctx[3] && create_if_block();

	return {
		c() {
			container = element("container");
			create_component(svgwipe.$$.fragment);
			t0 = space();
			if (if_block0) if_block0.c();
			t1 = space();
			if (if_block1) if_block1.c();
			attr(container, "class", container_class_value = "" + ((/*$firstLoad*/ ctx[2] ? 'loaded' : '') + " " + (/*$infoExpanded*/ ctx[3] ? 'info' : '') + " svelte-1bjk5br"));
		},
		m(target, anchor) {
			insert(target, container, anchor);
			mount_component(svgwipe, container, null);
			append(container, t0);
			if (if_block0) if_block0.m(container, null);
			append(container, t1);
			if (if_block1) if_block1.m(container, null);
			current = true;
		},
		p(ctx, [dirty]) {
			const svgwipe_changes = {};

			if (dirty & /*$$scope, pageTheme*/ 129) {
				svgwipe_changes.$$scope = { dirty, ctx };
			}

			svgwipe.$set(svgwipe_changes);

			if (!/*$firstLoad*/ ctx[2]) {
				if (if_block0) {
					if_block0.p(ctx, dirty);

					if (dirty & /*$firstLoad*/ 4) {
						transition_in(if_block0, 1);
					}
				} else {
					if_block0 = create_if_block_1(ctx);
					if_block0.c();
					transition_in(if_block0, 1);
					if_block0.m(container, t1);
				}
			} else if (if_block0) {
				group_outros();

				transition_out(if_block0, 1, 1, () => {
					if_block0 = null;
				});

				check_outros();
			}

			if (/*$infoExpanded*/ ctx[3]) {
				if (if_block1) {
					if (dirty & /*$infoExpanded*/ 8) {
						transition_in(if_block1, 1);
					}
				} else {
					if_block1 = create_if_block();
					if_block1.c();
					transition_in(if_block1, 1);
					if_block1.m(container, null);
				}
			} else if (if_block1) {
				group_outros();

				transition_out(if_block1, 1, 1, () => {
					if_block1 = null;
				});

				check_outros();
			}

			if (!current || dirty & /*$firstLoad, $infoExpanded*/ 12 && container_class_value !== (container_class_value = "" + ((/*$firstLoad*/ ctx[2] ? 'loaded' : '') + " " + (/*$infoExpanded*/ ctx[3] ? 'info' : '') + " svelte-1bjk5br"))) {
				attr(container, "class", container_class_value);
			}
		},
		i(local) {
			if (current) return;
			transition_in(svgwipe.$$.fragment, local);
			transition_in(if_block0);
			transition_in(if_block1);
			current = true;
		},
		o(local) {
			transition_out(svgwipe.$$.fragment, local);
			transition_out(if_block0);
			transition_out(if_block1);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(container);
			/*svgwipe_binding*/ ctx[5](null);
			destroy_component(svgwipe);
			if (if_block0) if_block0.d();
			if (if_block1) if_block1.d();
		}
	};
}

function instance$1($$self, $$props, $$invalidate) {
	let $largeWipe;
	let $DIM;
	let $firstLoad;
	let $infoExpanded;
	let $setLang;
	component_subscribe($$self, largeWipe, $$value => $$invalidate(1, $largeWipe = $$value));
	component_subscribe($$self, DIM, $$value => $$invalidate(6, $DIM = $$value));
	component_subscribe($$self, firstLoad, $$value => $$invalidate(2, $firstLoad = $$value));
	component_subscribe($$self, infoExpanded, $$value => $$invalidate(3, $infoExpanded = $$value));
	component_subscribe($$self, setLang, $$value => $$invalidate(4, $setLang = $$value));
	let pageTheme = ['var(--offblack)', "url(#gradient2)", "url(#gradient3)"];

	infoExpanded.subscribe(e => {
		if ($firstLoad) {
			if (e) {
				$$invalidate(0, pageTheme = ['#2b2a35', '#2b2a35', 'none']);

				$largeWipe.animate({
					action: 'open',
					axis: 'y',
					_curve: 'wave',
					_flip: false,
					_numPoints: 6,
					_duration: 800
				});
			} else {
				$$invalidate(0, pageTheme = ['#2b2a35', 'none', 'none']);

				$largeWipe.animate({
					// action:'close',
					axis: 'y',
					_curve: 'wave',
					_flip: false,
					_numPoints: 6,
					_duration: 800
				});
			}
		}
	});

	firstLoad.subscribe(e => {
		if (e) {
			let isMobile = $DIM.w < 600;

			$largeWipe.animate({
				axis: isMobile ? 'x' : 'x',
				_flip: isMobile ? false : false,
				_curve: 'wave',
				_numPoints: 6,
				_duration: 1000
			});
		}
	});

	function svgwipe_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			$largeWipe = $$value;
			largeWipe.set($largeWipe);
		});
	}

	return [pageTheme, $largeWipe, $firstLoad, $infoExpanded, $setLang, svgwipe_binding];
}

class Cover extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});
	}
}

var App_svelte_svelte_type_style_lang = '';

/* src/App.svelte generated by Svelte v3.46.4 */

function create_fragment(ctx) {
	let cover;
	let t0;
	let notif;
	let t1;
	let quicknav;
	let t2;
	let main;
	let canvas;
	let t3;
	let facelandmarks;
	let t4;
	let webcam;
	let t5;
	let peer;
	let t6;
	let analytics;
	let main_resize_listener;
	let current;
	let mounted;
	let dispose;
	cover = new Cover({});
	notif = new Notif({});
	quicknav = new Quick_nav({});
	canvas = new Canvas({});
	facelandmarks = new Holistic_1({});
	webcam = new Webcam({});
	peer = new Peer_1({});
	analytics = new Analytics({});

	return {
		c() {
			create_component(cover.$$.fragment);
			t0 = space();
			create_component(notif.$$.fragment);
			t1 = space();
			create_component(quicknav.$$.fragment);
			t2 = space();
			main = element("main");
			create_component(canvas.$$.fragment);
			t3 = space();
			create_component(facelandmarks.$$.fragment);
			t4 = space();
			create_component(webcam.$$.fragment);
			t5 = space();
			create_component(peer.$$.fragment);
			t6 = space();
			create_component(analytics.$$.fragment);
			attr(main, "class", "no_highlights svelte-ua78pf");
			add_render_callback(() => /*main_elementresize_handler*/ ctx[5].call(main));
		},
		m(target, anchor) {
			mount_component(cover, target, anchor);
			insert(target, t0, anchor);
			mount_component(notif, target, anchor);
			insert(target, t1, anchor);
			mount_component(quicknav, target, anchor);
			insert(target, t2, anchor);
			insert(target, main, anchor);
			mount_component(canvas, main, null);
			append(main, t3);
			mount_component(facelandmarks, main, null);
			append(main, t4);
			mount_component(webcam, main, null);
			append(main, t5);
			mount_component(peer, main, null);
			append(main, t6);
			mount_component(analytics, main, null);
			/*main_binding*/ ctx[4](main);
			main_resize_listener = add_resize_listener(main, /*main_elementresize_handler*/ ctx[5].bind(main));
			current = true;

			if (!mounted) {
				dispose = [
					listen(window, "orientationchange", /*updateDim*/ ctx[3]),
					listen(window, "resize", /*updateDim*/ ctx[3])
				];

				mounted = true;
			}
		},
		p: noop,
		i(local) {
			if (current) return;
			transition_in(cover.$$.fragment, local);
			transition_in(notif.$$.fragment, local);
			transition_in(quicknav.$$.fragment, local);
			transition_in(canvas.$$.fragment, local);
			transition_in(facelandmarks.$$.fragment, local);
			transition_in(webcam.$$.fragment, local);
			transition_in(peer.$$.fragment, local);
			transition_in(analytics.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(cover.$$.fragment, local);
			transition_out(notif.$$.fragment, local);
			transition_out(quicknav.$$.fragment, local);
			transition_out(canvas.$$.fragment, local);
			transition_out(facelandmarks.$$.fragment, local);
			transition_out(webcam.$$.fragment, local);
			transition_out(peer.$$.fragment, local);
			transition_out(analytics.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(cover, detaching);
			if (detaching) detach(t0);
			destroy_component(notif, detaching);
			if (detaching) detach(t1);
			destroy_component(quicknav, detaching);
			if (detaching) detach(t2);
			if (detaching) detach(main);
			destroy_component(canvas);
			destroy_component(facelandmarks);
			destroy_component(webcam);
			destroy_component(peer);
			destroy_component(analytics);
			/*main_binding*/ ctx[4](null);
			main_resize_listener();
			mounted = false;
			run_all(dispose);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let appContainer, appWidth = 0, appHeight = 0;

	const updateDim = e => {
		$$invalidate(0, appWidth = appContainer.clientWidth);
		$$invalidate(1, appHeight = appContainer.clientHeight);
	};

	const updateScale = () => {
		//max resolution of 1280
		let maxWidth = 1080;

		let scale = Math.min(maxWidth / appWidth, 1);

		DIM.set({
			w: appWidth,
			h: appHeight,
			s: scale,
			cw: appWidth * scale,
			ch: appHeight * scale
		});

		breakpoint.set(appWidth > 600 ? 'desktop' : 'mobile');
	};

	firstLoad.subscribe(e => {
		if (e) {
			const logo = document.querySelector('h1');
			logo.classList.add('fade');

			logo.addEventListener('transitionend', () => {
				logo.classList.add('pause');
			});
		}
	});

	onMount(() => {
		updateDim();
		updateScale();
	});

	function main_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			appContainer = $$value;
			$$invalidate(2, appContainer);
		});
	}

	function main_elementresize_handler() {
		appWidth = this.clientWidth;
		appHeight = this.clientHeight;
		$$invalidate(0, appWidth);
		$$invalidate(1, appHeight);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*appWidth, appHeight*/ 3) {
			{
				if (appWidth && appHeight) {
					updateScale();
				}
			}
		}
	};

	return [
		appWidth,
		appHeight,
		appContainer,
		updateDim,
		main_binding,
		main_elementresize_handler
	];
}

class App extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, {});
	}
}

// import '@pwabuilder/pwaupdate'

const app = new App({
  target: document.body
});

window.app = app;

const initSW = () => {
  if ('serviceWorker' in navigator) {
    // Register service worker
    navigator.serviceWorker.register('./sw.js')
      .then((reg) => {
      }).catch((e) => {
        console.log(e);
    });
  }
};
initSW();

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/#hot-module-replacement
// if (false) {
//   false.accept();
//   false.dispose(() => {
//     app.$destroy();
//   });
// }
