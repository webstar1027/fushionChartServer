require('dotenv').config();

const express =  require('express');
const filterJson = require('./api/filterJson');
const app = express();
const selectedPort = process.env.PORT;
const cors = require('cors');

app.use(cors());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
 });

app.get('/getFilteredData', async (req,res,next) => {
    const filters= req.query;
    try {
        const filteredData = await filterJson(filters);
        return res.status(200).json(filteredData); 
    }catch(e){
        console.log(e);
    } 
});

app.listen(selectedPort,(err)=>{
    if(err){
        console.log(`Error server not running ${err}`);
    }else{
        console.log(`Server runnning at port ${selectedPort}`);
    }
});
