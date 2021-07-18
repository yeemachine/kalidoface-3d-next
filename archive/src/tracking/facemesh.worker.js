importScripts("https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@3.4.0/dist/tf.min.js");
importScripts("https://cdn.jsdelivr.net/npm/@tensorflow-models/face-landmarks-detection")

let facemesh;

let options={
      maxContinuousChecks:5,
      detectionConfidence:.9,
      maxFaces:1,
      iouThreshold:.3,
      scoreThreshold:.85
}

async function initFacemesh() {
  await tf.setBackend('webgl');
  facemesh = await faceLandmarksDetection.load(
    faceLandmarksDetection.SupportedPackages.mediapipeFacemesh,
    options);
  console.log(facemesh)
}
initFacemesh()

console.log(tf,faceLandmarksDetection)

postMessage("ready");

self.onmessage = async ( { data } ) => {
  console.log('received:'+data)
  if(facemesh){
    const predictions = await facemesh.estimateFaces({
      input: data,
      returnTensors:false,
      flipHorizontal:false,
      predictIrises:true
    });
    postMessage(predictions)
    console.log(predictions)
  }
}