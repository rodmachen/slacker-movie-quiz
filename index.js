var express = require('express');
var app = express();
var mongodb = require('mongodb');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var validator = require('express-validator');
var cors = require('cors');
var nodemailer = require('nodemailer');

if (process.env.PORT) { // if running on Heroku
  app.set('port', (process.env.PORT));
  mongoose.connect(process.env.MONGOLAB_URI);
  senderEmail = process.env.SENDER_EMAIL;
  senderPassword = process.env.SENDER_PASSWORD;
} else { // running locally
  app.set('port', (5000));
  var local = require('./config.js');
  mongoose.connect(local.MONGOLAB_URI);
  senderEmail = local.SENDER_EMAIL;
  senderPassword = local.SENDER_PASSWORD;
}

app.use(express.static(__dirname + '/public'));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

app.use(bodyParser.json());
app.use(validator([])); // this line must be immediately after express.bodyParser()!
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());
app.options('*', cors());

app.post('/', function(req, res) {
  console.log('posted');
  sendMail(req.body.email, req.body.score);
});

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

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      return console.log(error);
    }

    console.log('Message sent: ' + info.response);
  });
}

// app.get('/', function(request, response) {
//   // TODO add default get request
// });
