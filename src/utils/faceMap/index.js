import _Vector from "../vector.js";
export const Vector = _Vector;

import * as _headTracking from "./headTracking";
import * as _eyeTracking from "./eyeTracking";
import * as _mouthTracking from "./mouthTracking";
import * as _helpers from "./helpers"; 

export const headTracking = _headTracking;
export const eyeTracking = _eyeTracking;
export const mouthTracking = _mouthTracking;
export const helpers = _helpers;
export const stabilizeBlink = eyeTracking.stabilizeBlink

export default class FaceMap {
  constructor() {
    //store value defaults
    this.head = { x: 0, y: 0, z: 0 };
    this.mouth = { x: 0, y: 0 };
    this.eye = {
      l: 1,
      r: 1,
      indep: {
        l: 1,
        r: 1
      }
    };
    this.brow = 0;
    this.pupil = { x: 0, y: 0 };
  }

  static update(lm,{
      head = true,
      eye = true,
      pupil = true,
      mouth = true,
      brow = true,
      type = "facemesh"
    } = {}) {
    const getHead = head ? headTracking.updateHead(lm) : this.head;
    const getEye = eye ? eyeTracking.updateEyes(lm) : this.eye;
    const getPupils = pupil ? eyeTracking.updatePupils(lm) : this.pupil;
    const getMouth = mouth ? mouthTracking.updateMouth(lm, getHead.x,type) : this.mouth;
    const getBrow = brow ? eyeTracking.updateBrow(lm, getHead.x) : this.brow;

    return {
      head: getHead,
      eye: getEye.eye,
      brow: getBrow,
      pupil: getPupils,
      mouth: getMouth
    };
  };
}


  // Static Methods //
//   static updateHead(lm){
//     return headTracking.updateHead(lm)
//   };

//   static updateEyes(lm){
//     return eyeTracking.updateEyes(lm)
//   };

//   //blink stabilize utilty function
//   static stabilizeBlink(eye, headX, noWink=false, maxRot=12) {
//     return eyeTracking.stabilizeBlink(eye, headX, noWink, maxRot)
//   };

//   static updatePupils(lm) {
//     return eyeTracking.updatePupils(lm)
//   };

//   static updateBrow(lm, rotX) {
//     return eyeTracking.updateBrow(lm, rotX)
//   };

//   static updateMouth(lm, headX) {
//     return mouthTracking.mouthOpen(lm, headX);
//   };


// export default class FaceMap {
//   constructor() {
//     this.head = { x: 0, y: 0, z: 0 };
//     this.mouth = { x: 0, y: 0 };
//     this.eye = {
//       l: 1,
//       r: 1,
//       indep: {
//         l: 1,
//         r: 1
//       }
//     };
//     this.brow = 0;
//     this.pupil = { x: 0, y: 0 };
//   }
  
//   // Static Methods //
//   static updateHead(lm){
//     // head xyz [-90,90]
//     const plane = headTracking.createEulerPlane(lm);
//     return headTracking.headRotation(plane.vector);
//   };

//   static updateEyes(lm){
//     //return early if no iris tracking
//     if (lm.length <= 468) {
//       return {
//         eye: {
//           l: 1,
//           r: 1
//         },
//         brow: 0
//       };
//     }
//     //open [0,1]
//     const leftEyeLid = eyeTracking.getEyeOpen(lm, "left");
//     const rightEyeLid = eyeTracking.getEyeOpen(lm, "right");

//     //brow [0,1]
//     let brow = helpers.clamp(
//       (Vector.lerp(leftEyeLid.raw, rightEyeLid.raw, 0.5) - 1.3) / 0.1,
//       0,
//       1
//     );

//     return {
//       eye: {
//         l: leftEyeLid.norm,
//         r: rightEyeLid.norm
//       },
//       brow:brow
//     };
//   };

//   //blink stabilize utilty function
//   static stabilizeBlink(eye, headX, noWink=false, maxRot=12) {
//     return eyeTracking.stabilizeBlink(eye, headX, noWink, maxRot)
//     // eye.r = clamp(eye.r,0,1)
//     // eye.l = clamp(eye.l,0,1)
//     // const blinkDiff = Math.abs(eye.l - eye.r);
//     // const blinkThresh = noWink ? 1.1 : .8
//     // const isClosing = eye.l < 0.3 && eye.r < 0.3;
//     // const isOpen = eye.l > 0.6 && eye.r > 0.6;
//     // if(headX > maxRot){return {l:eye.r,r:eye.r}}
//     // if(headX < (-maxRot)){return {l:eye.l,r:eye.l}}
//     // return {
//     //   l:
//     //     blinkDiff >= blinkThresh && !isClosing && !isOpen
//     //       ? eye.l
//     //       : eye.r > eye.l
//     //       ? Vector.lerp(eye.r, eye.l, 0.95)
//     //       : Vector.lerp(eye.r, eye.l, 0.05),
//     //   r:
//     //     blinkDiff >= blinkThresh && !isClosing && !isOpen
//     //       ? eye.r
//     //       : eye.r > eye.l
//     //       ? Vector.lerp(eye.r, eye.l, 0.95)
//     //       : Vector.lerp(eye.r, eye.l, 0.05)
//     // };
//   };

//   static updatePupils(lm) {
//     //pupil x:[-1,1],y:[-1,1]
//     if (lm.length <= 468) {
//       return { x: 0, y: 0 };
//     } else {
//       //track pupils using left eye
//       const pupilL = eyeTracking.pupilPos(lm, "left");
//       const pupilR = eyeTracking.pupilPos(lm, "right");

//       return {
//         x: (pupilL.x + pupilR.x) * 0.5,
//         y: (pupilL.y, pupilR.y) * 0.5
//       };
//     }
//   };

//   static updateBrow(lm, rotX) {
//     //pupil x:[-1,1],y:[-1,1]
//     if (lm.length <= 468) {
//       return 0;
//     } else {
//       const leftBrow = eyeTracking.getBrowRaise(lm, "left");
//       const rightBrow = eyeTracking.getBrowRaise(lm, "right");
//       return (leftBrow + rightBrow) / 2;
//     }
//   };

//   static updateMouth(lm, headX) {
//     return mouthTracking.mouthOpen(lm, headX);
//   };

//   static update(lm) {
//     const head = FaceMap.updateHead(lm);
//     const eyes = FaceMap.updateEyes(lm);
//     const pupils = FaceMap.updatePupils(lm);
//     const mouth = FaceMap.updateMouth(lm, head.x);
//     const brow = FaceMap.updateBrow(lm, head.x);

//     return {
//       head: head,
//       eye: eyes.eye,
//       brow: brow,
//       pupil: pupils,
//       mouth: mouth
//     };
//   };
// }