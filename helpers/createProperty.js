require('dotenv').config();
const END_POINT = `https://api.hubapi.com/properties/v2/products/properties/?hapikey=${process.env.API_KEY}`
var data= require('../data/proberties').data
var req=require('./request')
 data.forEach(prop=>{
   req.sendProductToHubspot(prop,END_POINT,'POST');
 })
 

 