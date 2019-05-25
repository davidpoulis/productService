// Imports the Google Cloud client library
require('dotenv').config();
const {PubSub} = require('@google-cloud/pubsub');
let testData= require('../data/test_publish').data;


// Your Google Cloud Platform project ID
const projectId = 'earlbreakfast1';

// Instantiates a client
const pubsubClient = new PubSub({
  projectId: projectId,
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
});

// The name for the new topic
const topicName = 'orderBreakfast';


  var data =  testData;
  const payload = JSON.stringify(data)
  const dataBuffer = Buffer.from(payload);
  
  pubsubClient
    .topic(topicName)
    .publish(dataBuffer)
    .then(messageId => {
      console.log(`Message ${messageId} published.`);
    })
    .catch(err => {
      console.error('ERROR:', err);
    });