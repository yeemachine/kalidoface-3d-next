

export const isZip = (string) => {
   let isZip = false
   // alert(file.type)
    switch (string) {
        case 'application/zip':
            isZip = true;
            break;
        case 'application/octet-stream':
            isZip = true;
            break;
        case 'application/x-zip':
            isZip = true;
            break;
        case 'application/x-zip-compressed':
            isZip = true;
            break;
        default:
            break;
    }
  return isZip
}
export const isImageVideo = (file) => {
   let type = null
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
        default:
            break;
    }
  return type
}
//**dataURL to blob**
export function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
}

export const createBlobURL = (e) =>{
     if(Array.isArray(e)){
      e.forEach(i=>{
        if(i.data){
          let blob = dataURLtoBlob(i.data)
          i.url = URL.createObjectURL(blob);
        }
      })
      return
    }  
    if(typeof e === 'object'){
      if(e.data){
        e.url = URL.createObjectURL(dataURLtoBlob(e.data));
      }
      return
    }  
}

//**blob to dataURL**
export function blobToDataURL(blob, callback) {
    var a = new FileReader();
    a.onload = function(e) {callback(e.target.result);}
    a.readAsDataURL(blob);
}


export const resetInput = (input)=>{
  try{
    input.value = '';
    if(input.value){
        input.type = "text";
        input.type = "file";
      }
  }catch(e){}
}

export const checkJSONEqual = (object1,object2) => {
  return JSON.stringify(object1)===JSON.stringify(object2)
}

export function clamp(value, min, max) {
  return Math.max(Math.min(value, max), min);
}

export const remap = (val,a,b) => {
 //returns a to b -> 0 to 1 
 return (clamp(val,a,b) - a)/(b-a)
}

export const threshold = (oldVal,newVal,amount)=>{
 return (Math.abs(newVal - oldVal)>amount ? newVal : oldVal)
}

export function randomString(length, chars) {
  var result = '';
  for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

export function getDistance(a, b) {
  const distX = a.x - b.x;
  const distY = a.y - b.y;
  return Math.sqrt(distX ** 2 + distY ** 2);
}

export const getCSSCustomProp = (propKey, element = document.documentElement, castAs = 'string') => {
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

export const haptic = () => {
  if ("vibrate" in navigator) {
      navigator.vibrate(15);
    }
}