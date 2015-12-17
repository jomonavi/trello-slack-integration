var express = require('express');
var router = express.Router();
var path = require('path');
var request = require('request');
var token = require('../webhook-config.js');
var client = require('../redisDB');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../public/html/index.html'));
});

router.post('/', function(req, res, next){

    var tBoard = req.body.model.name;
    var card = req.body.action.data.card;
    var url = "https://trello.com/c/" + req.body.action.data.card.shortLink;
    var trelloName, slackName;
    var memberCreator = req.body.action.memberCreator.username;

    if(req.body.action.type === "commentCard"){
        var recipientArr = req.body.action.data.text.split(" ").filter(function(text){
            return text.indexOf("@") > -1;
        });

        if(recipientArr.length > 0){
            recipientArr.forEach(function(recepient){
                client.get(recepient, function(err, reply){
                    if(err) throw err;
                    slackName = reply;
                    var form = {
                        token: token,
                        channel: slackName,
                        text: "You were @mentioned by " + memberCreator + 
                        " on the " + card.name + " card on the " + tBoard + " board " + url
                    }

                    request.post({url: 'https://slack.com/api/chat.postMessage', form: form}, function(err, httpResponse, body){
                        console.log(httpResponse);
                    });
                });
            }); 
        }
    }

    if(req.body.action.type === "addMemberToCard"){
        trelloName = req.body.action.member.username;
        client.get(trelloName, function(err, reply){
            if(err) throw err;
            slackName = reply;

            var form = {
                token: token,
                channel: slackName,
                text: "You were added to the " + card.name + " card on the " 
                + tBoard + " board by " + memberCreator + " " + url
            }

            request.post({url: 'https://slack.com/api/chat.postMessage', form: form}, function(err, httpResponse, body){
                console.log(httpResponse);
            });
        });
    }
    console.log("we stepped through the request cycle");
    
});

router.put('/', function(req, res, next){

});

router.delete('/', function(req, res, next){

});

module.exports = router;