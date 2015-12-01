var express = require('express');
var app = express();
var mongodb = require('mongodb');
var mongoose = require('mongoose');

if (process.env.PORT) { // if running on Heroku
  app.set('port', (process.env.PORT));
  mongoose.connect(process.env.MONGOLAB_URI);
} else { // running locally
  app.set('port', (5000));
  var local = require('./config.js');
  mongoose.connect(local.MONGOLAB_URI);
}

app.use(express.static(__dirname + '/public'));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

// app.get('/', function(request, response) {
//   // TODO add default get request
// });



