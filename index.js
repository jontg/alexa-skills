require('dotenv').load();

var alexa = require('alexa-app');
var app = new alexa.app('wolfram');
var wolfram = require('wolfram').createClient(process.env.WOLFRAM_APPID);

app.pre = function(request,response,type) {
  if (request.sessionDetails.application.applicationId != process.env.ALEXA_APP_ID) {
    console.log("Saw an unauthorized request from '%j'", request);
    response.fail("Invalid applicationId"); // Fail ungracefully
  }
};

app.intent('wolfram',
  function(request, response) {
    console.log("Request: %j", request);
    console.log("Saw request '%s'", request.slot('query'));
    var query = request.slot('query');

    console.log("Returning with intent!");
    response.say("End of the road!");
    return true;
});

console.log("exported the handler 6");
exports.handler = app.handler;
