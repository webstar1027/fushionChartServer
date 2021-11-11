const loadJsonFile = require('load-json-file');
const path = require('path');
const appConfig = require('../configuration');

const parseJson = async (filters) => {
    const receiveStartDate = filters.startDate.split(" ")[0];
    const receiveEndDate = filters.endDate.split(" ")[0];
    
    const outputFileName = appConfig.output.filename;
    const outputFilePath = appConfig.output.location;
    const completeOutputFilePath = `../${outputFilePath}/${outputFileName}`;
    let filterdJson;

    const json = await loadJsonFile(path.resolve(__dirname,completeOutputFilePath));

    filterdJson = json.filter(each => {
        const start = new Date(receiveStartDate);
        const end = new Date(receiveEndDate);
        const elementDate = new Date(each.episodeStartDatetime.split(" ")[0]);
        if ((elementDate >= start) && (elementDate <= end)) return true;
    });
    return filterdJson;      
};

module.exports = parseJson;
