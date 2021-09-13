import * as JSZip from 'jszip';

export const unzip = async (f) => {
    let finalJSON = await JSZip.loadAsync(f)
      .then(async function(zip) {
        
        let allFileNames = Object.keys(zip.files);
        let hasModelJSON = allFileNames.some(res => res.includes("model.json"));
        let hasModel3JSON = allFileNames.some(res => res.includes("model3.json"));
        let hasMoc = allFileNames.some(res => res.includes(".moc"));
        let hasMoc3 = allFileNames.some(res => res.includes(".moc3"));
        if (!hasModelJSON && !hasModel3JSON) {
          throw 'Missing model.json or model3.json file.';
        }else if(hasModelJSON && !hasMoc){
          throw "Missing .moc file";
        }else if(hasModel3JSON && !hasMoc3){
          throw "Missing .moc3 file";
        }

        const promises = [];
        zip.forEach(async function(relativePath, zipEntry) {
          //trim off file path and keep file name
          let fileName = relativePath.substring(
            relativePath.lastIndexOf("/") + 1
          );
          //checks for blank files/folders from compression
          if (!relativePath.includes("__MACOSX") && fileName.length > 0) {
            //prefixes for different base64 content types
            let prefix = fileName.includes(".json")
              ? "data:application/json;base64,"
              : fileName.includes(".png")
              ? "data:image/png;base64,"
              : fileName.includes(".mp3")
              ? "data:audio/mpeg;base64,"
              : fileName.includes(".wav")
              ? "data:audio/wav;base64,"
              : "data:application/octet-stream;base64,";
            
            let folderCount = (relativePath.match(/\//g) || []).length;
            let isIcon = folderCount > 1 ? false
              : !fileName.includes('texture') && (fileName.match( /\.png|\.jpg|\.jpeg|\.gif/g)||[]).length>0 ? true 
              : false

            promises.push(
              new Promise((resolve, reject) => {
                zipEntry.async("base64").then(data => {
                  // let url = (fileName.includes('.model.json') || fileName.includes('.model3.json')) ? JSON.parse(atob(data)) : prefix+data
                  let url = prefix + data;
                  if (
                    fileName.includes("model.json") ||
                    fileName.includes("model3.json")
                  ) {
                    url = JSON.parse(atob(data));
                    //add name if no name specified
                    url.name = url.name
                      ? url.name
                      : fileName.replace("model.json", "");
                    url.fromZip = f.name;
                  }
                  resolve({ name: fileName, data: url, icon:isIcon });
                });
              })
            );
          }
        });

        const masterJSON = await Promise.all(promises).then(function(data) {
          let json = null;
          let map = {};
          let iconData = null;
          data.forEach((e, i) => {
            if(e.icon){
              iconData = e.data
            }
            if (
              e.name.includes("model.json") ||
              e.name.includes("model3.json")
            ) {
              json = e.data;
            } else {
              map[e.name] = e.data;
            }
          });
          iterate(json, map);
          json.url='';
          json.date = Date.now();
          json.icon = iconData;
          return json;
        });
        return masterJSON;
      })
      .catch(err => {
        throw err
      });
    
    return finalJSON;
};

const iterate = (obj, map) => {
  Object.keys(obj).forEach(key => {
    // console.log('key: '+ key + ', value: '+obj[key]);
    Object.keys(map).forEach(k => {
      // console.log(obj[key],k)
      if (typeof obj[key] === "string") {
        //do not replace 'name':xxx.json paradigm with base64
        if (obj[key].includes(k) && key !== "Name" && key !== "name") {
          obj[key] = map[k];
        }
      }
    });

    if (typeof obj[key] === "object") {
      iterate(obj[key], map);
    }
  });
};
