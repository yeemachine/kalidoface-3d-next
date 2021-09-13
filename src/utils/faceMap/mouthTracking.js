import Vector from '../vector.js'
import { clamp,remap } from "../helpers.js";

export const mouthShape = (lm, rotX, type = 'facemesh') => {
    // eye keypoints
    const eyeInnerCornerL = new Vector(lm[133])
    const eyeInnerCornerR = new Vector(lm[362])
    const eyeOuterCornerL = new Vector(lm[130])
    const eyeOuterCornerR = new Vector(lm[263])
    // const eyeInnerCornerL = new Vector(lm[type === 'facemesh' ? 245 : 133]);
    // const eyeInnerCornerR = new Vector(lm[type === 'facemesh' ? 463 : 362]);
    // const eyeOuterCornerL = new Vector(lm[type === 'facemesh' ? 226 : 130]);
    // const eyeOuterCornerR = new Vector(lm[type === 'facemesh' ? 446 : 263]);
    // const eyeInnerCornerL = new Vector(lm[245])
    // const eyeInnerCornerR = new Vector(lm[463])
    // const eyeOuterCornerL = new Vector(lm[226])
    // const eyeOuterCornerR = new Vector(lm[446])

    // eye keypoint distances
    const eyeInnerDistance = eyeInnerCornerL.distance(eyeInnerCornerR);
    const eyeOuterDistance = eyeOuterCornerL.distance(eyeOuterCornerR);

    // mouth keypoints
    const upperInnerLip = new Vector(lm[13]);
    const lowerInnerLip = new Vector(lm[14]);
    // const mouthCornerLeft = new Vector(lm[type === 'facemesh' ? 62 : 61]);
    // const mouthCornerRight = new Vector(lm[type === 'facemesh' ? 29 : 291]);
    const mouthCornerLeft = new Vector(lm [61])
    const mouthCornerRight = new Vector(lm[291])

    // mouth keypoint distances
    const mouthOpen = upperInnerLip.distance(lowerInnerLip);
    const mouthWidth = mouthCornerLeft.distance(mouthCornerRight);

    // mouth open and mouth shape ratios
    let ratioXY = mouthWidth / mouthOpen;
    let ratioY = mouthOpen / eyeInnerDistance;
    let ratioX = mouthWidth / eyeOuterDistance;

    // normalize and scale mouth open
    ratioY += 0.1;
    ratioY = ratioY - 0.25 > 0 ? ratioY - 0.25 : 0;
    ratioY *= 5;
    ratioY = remap(ratioY, 0.35, .8);

    // normalize and scale mouth shape
    ratioX = remap(ratioX, 0.45, 0.9);
    ratioX = (ratioX - .3) * 2  

    // ratioXY = clamp(ratioXY,0,2.4);
  
    const mouthX = remap(ratioX - 0.4, 0, 0.5);
      //convert to [-1,1] for Live2D


    const mouthY = ratioY;
  

    // let ratioI = remap(mouthX, 0, 0.45) * remap(mouthY - 0.5, 0, 0.2);
    // let ratioA = mouthY * 0.1 + mouthY * 0.9 * (1 - mouthX);
    const fixFacemesh = type === "facemesh" ? 1.3 : 0;

    let ratioI = remap(ratioXY,1.3+fixFacemesh*.8,2.6+fixFacemesh) * remap(mouthY, 0.7, 1);
    let ratioA = mouthY*.2 + mouthY * (1 - ratioI)*.8;
    let ratioU = mouthY * remap((1 - ratioI), 0, .3) * 0.1;
    let ratioE = remap(ratioU, 0.2, 1) * (1 - ratioI) * 0.3;
    let ratioO = (1 - ratioI) * remap(mouthY, 0.5, 1) * 0.2;

    return {
        x: ratioX,
        y: ratioY,
        shape: {
            A: ratioA,
            E: ratioE,
            I: ratioI,
            O: ratioO,
            U: ratioU,
        },
    };
};
// export const mouthShape = (lm,rotX,type)=> {
//     // eye keypoints
//     // const eyeInnerCornerL = new Vector(lm[133])
//     // const eyeInnerCornerR = new Vector(lm[362])
//     // const eyeOuterCornerL = new Vector(lm[130])
//     // const eyeOuterCornerR = new Vector(lm[263])
//      const eyeInnerCornerL = new Vector(lm[type === "facemesh" ? 245 : 133])
//     const eyeInnerCornerR = new Vector(lm[type === "facemesh" ? 463 : 362])
//     const eyeOuterCornerL = new Vector(lm[type === "facemesh" ? 226 : 130])
//     const eyeOuterCornerR = new Vector(lm[type === "facemesh" ? 446 : 263])
//     // const eyeInnerCornerL = new Vector(lm[245])
//     // const eyeInnerCornerR = new Vector(lm[463])
//     // const eyeOuterCornerL = new Vector(lm[226])
//     // const eyeOuterCornerR = new Vector(lm[446])

//     // eye keypoint distances
//     const eyeInnerDistance = eyeInnerCornerL.distance(eyeInnerCornerR)
//     const eyeOuterDistance = eyeOuterCornerL.distance(eyeOuterCornerR)

//     // mouth keypoints
//     const upperInnerLip = new Vector(lm[13])
//     const lowerInnerLip = new Vector(lm[14])
//     const mouthCornerLeft = new Vector(lm[type === "facemesh" ? 62 : 61])
//     const mouthCornerRight = new Vector(lm[type === "facemesh" ? 29 : 291])
//     // const mouthCornerLeft = new Vector(lm [61])
//     // const mouthCornerRight = new Vector(lm[291])
    
    

//     // mouth keypoint distances
//     const mouthOpen = upperInnerLip.distance(lowerInnerLip)
//     const mouthWidth = mouthCornerLeft.distance(mouthCornerRight)
    
//     // mouth open and mouth shape ratios
//     let ratioY = mouthOpen/eyeInnerDistance
//     let ratioX = mouthWidth/eyeOuterDistance
      
//     // normalize and scale mouth open
//     ratioY += .1
//     ratioY = (ratioY-.25 > 0) ? ratioY-.25 : 0 
//     ratioY *= 4
//     ratioY = clamp(ratioY,0,1)

//     // normalize and scale mouth shape
  
//     ratioX = remap(ratioX,type === "facemesh" ? .5 : .4,.8)
  
 
  
  
//     const mouthX = remap(ratioX-.4,0,.5)
//     const mouthY = ratioY
    
//     // let ratioI = remap(mouthX,0,0.65)*remap(mouthY-.1,0,0.1)
//     // let ratioA = mouthY * (1-mouthX) * .5
//     // let ratioU = mouthY*remap(mouthX,.7,1)*.12
//     // let ratioE = remap(ratioU,.5,1)*(mouthX)*.1
//     // let ratioO = (1-mouthX) * remap(mouthY,.7,1) * .35
    
    
//     let ratioI = remap(mouthX,0,0.45)*remap(mouthY-.5,0,0.1)
//     let ratioA = mouthY * .1 + mouthY * .9 * (1-mouthX)
//     let ratioU = mouthY*remap(mouthX,.7,1)*.02
//     let ratioE = remap(ratioU,.2,1)*(mouthX)*0.1
//     let ratioO = (1-mouthX) * remap(mouthY,.7,1) * .35

//     return {
//       x:ratioX,
//       y:ratioY,
//       shape:{
//         A:ratioA,
//         E:ratioE,
//         I:ratioI,
//         O:ratioO,
//         U:ratioU
//       }
//     }
// }

export const updateMouth = (lm, headX,type) => {
    return mouthShape(lm, headX, type);
};