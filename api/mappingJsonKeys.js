const loadJsonFile = require('load-json-file');
const path = require('path');
const fs = require('fs');
const appConfig = require('../configuration');
const createUniqueDataStructure = require('./createUniqueDataStructure');

const mappingJsonKeys = () => {
  const outputFileName = appConfig.output.filename;
  const outputFilePath = appConfig.output.location;
  const completeOutputFilePath = `../${outputFilePath}${outputFileName}`;
  const completeModifiedOutputFilePath = `${outputFilePath}${outputFileName}`;
  console.log("Output.json file found");
  console.log("Key modifications started");
  loadJsonFile(path.resolve(__dirname,completeOutputFilePath)).then(json => {
    try {
      let modifiedJsonArray = '';
      json.map( (eachJsonElm,index) => {
        let individualJsonElm = '';
        // eslint-disable-next-line 
        for(let mapElm in appConfig.mapKeys){
          if(mapElm === "lwobsReason"){
            individualJsonElm = individualJsonElm.concat(` "${mapElm}" : "${index.toString().substr(-1,1)}" ,`);
          }else{
          individualJsonElm = individualJsonElm.concat(` "${mapElm}" : "${eachJsonElm[appConfig.mapKeys[mapElm]]}" ,`);
          }
        }
        modifiedJsonArray = modifiedJsonArray.concat(`{ ${individualJsonElm.slice(0,-1)} },`);
        return null;
      }); 
      const modifiedFinalJson = JSON.parse(`[ ${modifiedJsonArray.slice(0,-1)} ]`);
      console.log("Key modification successfuly done");
      fs.writeFileSync(completeModifiedOutputFilePath, JSON.stringify(modifiedFinalJson)/* , (err)=> {
      if (err) throw err;
      console.log('complete');
      } */);
    }catch(e){
      console.log(e);
    } 
    createUniqueDataStructure();
    return null;
  }).catch((e) => {
    console.log(e);
  });
 }
module.exports = mappingJsonKeys;
