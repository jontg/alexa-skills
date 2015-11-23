require('dotenv').load();

console.log("Loaded environment");
var app = new require('alexa-app').app('wolfram');
console.log("Loaded app");
var wolfram = require('wolfram').createClient(process.env.WOLFRAM_APPID);
console.log("Loaded wolfram");

app.pre = function(request,response,type) {
  console.log("pre-filtering the request");
  if (request.sessionDetails.application.applicationId != process.env.ALEXA_APP_ID) {
    // Fail ungracefully
    response.fail("Invalid applicationId");
  }
  console.log("pre-filtered the request; moving on");
};

app.error = function(exception, request, response) {
  console.log("app.error detected %s for %j (%j)", exception, request, response);
  response.say("Sorry, something bad happened: " + exception.message).send();
};

app.launch(function(request, response) {
  console.log("Launching app %j", request);
});

app.intent('wolfram',
  function(request, response) {
    console.log("Request: %j", request);
    console.log("Saw request '%s'", request.slot('query'));
    var query = request.slot('query');
    wolfram.query(query, function(err, wolfram_response) {
      console.log("Saw request response '%s' %j", err, wolfram_response);
      if(err) throw err;
      console.log("Saw '%j' for query '%s'", wolfram_response, query);
      var result = wolfram_response.
        filter(function(r) {return r.primary;}).
        map(function(r) {return r.value; }).
        reduce(function(output, r) {return output != null ? output : r;}, null);

      response.say(result).send();
    });

    console.log("Returning with intent!");
    response.say("End of the road!");
    return false; // This method is handled asynchronously
});

exports.handler = app.lambda();
