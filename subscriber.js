require('dotenv').config();
var request = require('./helpers/request')
const {PubSub} = require('@google-cloud/pubsub');
var trans=require('./helpers/transformObject').transform
const END_POINT = `https://api.hubapi.com/crm-objects/v1/objects/products?hapikey=${process.env.API_KEY}`
const METHOD = 'POST'
const pubsub = new PubSub();


const subscriptionName = 'ordersEarly';
const subscription = pubsub.subscription(subscriptionName);

const messageHandler = message => {
  console.log(`Received message ${message.id}:`);
  console.log(`Data: ${message.data}`);
  console.log(`tAttributes: ${message.attributes}`);
  //transform data from buffer to json
  msgString=JSON.parse(message.data.toString('utf8')) 
  sendData=[]
  transObj = trans(msgString)
  
  for(var key in transObj){
    if (transObj.hasOwnProperty(key)) {
      sendData.push({name:key,value:transObj[key]})
   }
  }
  request.sendProductToHubspot(sendData,END_POINT,METHOD )

  // Ack the messae
  message.ack();
};

// Listen for new messages until timeout is hit
subscription.on(`message`, messageHandler);
