const path = require('path');
const nodeXj = require("xls-to-json");
const appConfig = require('../configuration');
const mappingJsonKeys = require('./mappingJsonKeys');


const parseExcel = () => {
const inputFileName = appConfig.excell.filename;
const excellSheetname = appConfig.excell.sheetname;
const inputFilePath = appConfig.excell.location;
const outputFileName = appConfig.output.filename;
const outputFilePath = appConfig.output.location;

const completeInputFilePath = `../${inputFilePath}/${inputFileName}`;
const completeOutputFilePath = `../${outputFilePath}/${outputFileName}`;

try{ 
  console.log("Excel to Json conversion started"); 
  nodeXj({
      input: path.resolve(__dirname,completeInputFilePath), 
      output: path.resolve(__dirname,completeOutputFilePath), 
      sheet: excellSheetname,
    },(parseErr)=>{
      if(parseErr) {
        console.log('Error');
      } else {
        console.log('Json created successfuly');
        mappingJsonKeys();
        
      }
    });
  }catch(e){
    console.log(e);
  }
}
module.exports = parseExcel;
