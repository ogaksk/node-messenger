var express = require('express'),
    request = require('request'),
    router = express.Router(),
    local = require('../config/local.js');

var fbtoken = local.fbAccessToken,
    validation_token = local.validationToken;

function sendTextMessage(sender, text) {
  var messageData = {
    text:text
  }
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token : fbtoken},
    method: 'POST',
    json: {
      recipient: {id:sender},
      message: messageData,
    }
  }, function(error, response, body) {
    if (error) {
      console.log('Error sending message: ', error);
    } else if (response.body.error) {
      console.log('Error: ', response.body.error);
    }
  });
}

router.get('/', function(req, res, next) {
  if (req.query['hub.verify_token'] === validation_token) {
    res.send("varidation");
  }
  res.send("error");
});

router.post('/', function(req, res, next) {
  var messaging_events = req.body.entry[0].messaging,
      replayMessages = [];
  for (i = 0; i < messaging_events.length; i++) {
    event = req.body.entry[0].messaging[i];
    sender = event.sender.id;
    if (event.message && event.message.text) {
      text = event.message.text;

      // アレコレしたいことをどうぞ
      sendTextMessage(sender, text.substring(0, 200));
    }
  }
  res.sendStatus(200);
});

module.exports = router;