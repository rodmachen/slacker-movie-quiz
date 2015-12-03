// Required modules
var express = require('express');
var app = express();
var mongodb = require('mongodb');
var mongoose = require('mongoose');
var db = mongoose.connection;
var bodyParser = require('body-parser');
var validator = require('express-validator');
var cors = require('cors');
var nodemailer = require('nodemailer');

// Set variables for production or development environment
// If running on Heroku
if (process.env.PORT) {
  app.set('port', (process.env.PORT));
  mongoose.connect(process.env.MONGOLAB_URI);
  senderEmail = process.env.SENDER_EMAIL;
  senderPassword = process.env.SENDER_PASSWORD;
// If running locally
} else {
  app.set('port', (5000));
  var local = require('./config.js');
  mongoose.connect(local.MONGOLAB_URI);
  senderEmail = local.SENDER_EMAIL;
  senderPassword = local.SENDER_PASSWORD;
}

// Set static serving and fire up server
app.use(express.static(__dirname + '/public'));
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

// Middleware
app.use(bodyParser.json());
app.use(validator([])); // this line must be immediately after express.bodyParser()!
app.use(bodyParser.urlencoded({ extended: false }));

// Handle cross-site scripting blockage
app.use(cors());
app.options('*', cors());

// Start the database
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(callback) {
  console.log('once opened');
});

// Define database schema
var quizSchema = mongoose.Schema({
  email: String,
  score: Number,
});

// Define database model
var Quizee = mongoose.model('Quizee', quizSchema);

// POST route with database entry and results emailed
app.post('/', function(req, res) {
  console.log('posted');
  Quizee.create(req.body);
  sendMail(req.body.email, req.body.score);
  res.sendStatus(200);
});

// Sends results by email using Nodemailer
function sendMail(address, score) {
  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: senderEmail,
      pass: senderPassword,
    },
  });

  var mailOptions = {
    from: senderEmail, // sender address
    to: address, // list of receivers
    subject: 'Your Results from The Slacker Quiz!', // Subject line
    text: 'You received a score of ' + score + '% on The Slacker Quiz!', // plaintext body
    html: '<b>You received a score of ' + score + '% on The Slacker Quiz!</b>', // html body
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      return console.log(error);
    }

    console.log('Message sent: ' + info.response);
  });
}
