// require('dotenv').load();
var alexa = require('alexa-app');

var app = new alexa.app('wolfram');

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
