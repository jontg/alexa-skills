require('dotenv').load();

var alexa = require('alexa-app');
var app = new alexa.app('wolfram');
var wolfram = require('wolfram').createClient(process.env.WOLFRAM_ALPHA_APP_ID);

app.pre = function(request,response,type) {
  if (request.sessionDetails.application.applicationId != process.env.ALEXA_APP_ID) {
    console.log("Saw an unauthorized request from '%j'", request);
    response.fail("Invalid applicationId"); // Fail ungracefully
  }
};

app.intent('wolfram',
  function(request, response) {
    console.log("Request: %j", request);
    var query = request.slot('question');
    response.say("I heard " + query + ".  ");
    wolfram.query(query, function(err, wolfram_response) {
      console.log("Saw request response '%s' %j", err, wolfram_response);
      if(err) throw err;

      var spoken_response = wolfram_response.filter(function(r) { return r.primary; }).
        reduce(function(agg, entry) { return agg !== null ? agg : entry; }, null).
        subpods.
        reduce(function(agg, entry) { return agg !== null ? agg : entry; }, null).
        value;

      response.say(spoken_response).send();
    });

    return false;
});

exports.handler = app.handler;
