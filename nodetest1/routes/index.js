var express = require('express');
var http = require("http");
var https = require("https");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.query.place);
  var options = {
	    host: 'developers.zomato.com',
	    //port: 443,
	    path: '/api/v2.1/locations?query='+req.query.place+'&count=10',
	    method: 'GET',
	    headers: {
	        'Content-Type': 'application/json',
	        'user-key': '8c2568664236474a7c61aacf1ae491ad'
	    }
	};
	var req = https.get(options, function(response) {
		  console.log('STATUS: ' + response.statusCode);
		  console.log('HEADERS: ' + JSON.stringify(response.headers));

		  // Buffer the body entirely for processing as a whole.
		  var bodyChunks = [];
		  response.on('data', function(chunk) {
		    // You can process streamed parts here...
		    bodyChunks.push(chunk);
		  }).on('end', function() {
		    var body = Buffer.concat(bodyChunks);
		    console.log('BODY: ' + body);
		    // ...and/or process the entire body here.
		    res.send(body);
		  })

		});

	    req.end();

	  
	
});

module.exports = router;
