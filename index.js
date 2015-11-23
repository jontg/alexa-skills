require('dotenv').load();

var alexa = require('alexa-app');
var app = new alexa.app('wolfram');
var wolfram = require('wolfram').createClient(process.env.WOLFRAM_APPID);

app.pre = function(request,response,type) {
  console.log("pre-filtering the request");
  if (request.sessionDetails.application.applicationId != process.env.ALEXA_APP_ID) {
    // Fail ungracefully
    response.fail("Invalid applicationId");
  }
  console.log("pre-filtered the request; moving on");
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
