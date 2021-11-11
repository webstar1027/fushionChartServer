const loadJsonFile = require('load-json-file');
const path = require('path');
const fs = require('fs');
const appConfig = require('../configuration');

const createUniqueDataStructure = () => {
  const filteredKeyElemnts = [];
  const finalData = [];
  const outputFileName = appConfig.output.filename;
  const outputFilePath = appConfig.output.location;
  const completeOutputFilePath = `../${outputFilePath}${outputFileName}`;
  const completeModifiedOutputFilePath = `${outputFilePath}${outputFileName}`;
  console.log("Output.json file found");
  console.log("Unique Data Structure Creation started");
  loadJsonFile(path.resolve(__dirname,completeOutputFilePath)).then(json => {
    try {
      json.forEach(element => {
        if (!filteredKeyElemnts.includes(`${element.mrnNumber}-${element.episodeStartDatetime.split(" ")[0]}`)) {
          filteredKeyElemnts.push(`${element.mrnNumber}-${element.episodeStartDatetime.split(" ")[0]}`);
          finalData.push(element);
          // console.log(element);
        }
      });
      // console.log(finalData);
      console.log(finalData.length);
      console.log("Unique Data Structure Creation Done");
      fs.writeFileSync(completeModifiedOutputFilePath, JSON.stringify(finalData) /* , (err)=> {
        if (err) throw err;
        console.log('complete');
      } */);
    }catch(e){
      console.log(e);
    } 
    return null;
  }).catch((e) => {
    console.log(e);
  });
 }
module.exports = createUniqueDataStructure;
