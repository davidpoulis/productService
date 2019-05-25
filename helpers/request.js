
var request = require('request-promise')


exports.sendProductToHubspot= async (data,url,method) =>{
  var options = {
    method: method,
    uri: url,
    body: data ,
    json: true // Automatically stringifies the body to JSON
};
 console.log("options",options)
await request(options)
    .then(function (parsedBody) {
      console.log("portalId: ",parsedBody.portalId," \n objectId: ",parsedBody.objectId);
    })
    .catch(function (err) {
       console.log('we have error: ',err)
    });
}
 