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
    wolfram.query(query, function(err, wolfram_response) {
      if(err) throw err;
      console.log("Saw '%j' for query '%s'", wolfram_response, query);
      var result = wolfram_response.
        filter(r -> r.primary).
        map(r -> r.value).
        reduce((output, r) -> output != null ? output : r, null);


      response.say(result).send();
    });

    return false; // This method is handled asynchronously
});
