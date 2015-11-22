require('dotenv').load();

var app = new require('alexa-app').app('wolfram');
var wolfram = require('wolfram').createClient(process.env.WOLFRAM_APPID);

app.pre = function(request,response,type) {
  if (request.sessionDetails.application.applicationId != process.env.ALEXA_APP_ID) {
    // Fail ungracefully
    response.fail("Invalid applicationId");
  }
};

app.error = function(exception, request, response) {
  response.say("Sorry, something bad happened");
};

app.intent('wolfram',
  {
    "slots": {"query": "AMAZON.LITERAL"}
    ,"utterances": [
      "{query}"
    ]
  },
  function(request, response) {
    var query = request.slot('query');
    wolfram.query(query, function(err, result) {
      if(err) throw err;
      console.log("Saw '%j' for query '%s'", result, query);
      response.say(result);

      // This is asynchronous, so explicitly send the response.
      response.send();
    });

    return false; // This method is handled asynchronously
});
