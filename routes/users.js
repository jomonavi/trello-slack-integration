var express = require('express');
var router = express.Router();
var path = require('path');
var client = require('../redisDB');
var apiWrappers = require('../webhook-config.js');
var bot = apiWrappers.bot;



router.get('/', function(req, res, next) {
});

router.post('/', function(req, res, next) {
	var validUsers = bot.getUsers()._value.members;
	var inDB = validUsers.map(function(user){
		// return user.profile.email
		return user.name;
	}).indexOf(req.body.slackUsername);

	if(inDB > -1){
		client.set(req.body.trelloUsername, req.body.slackUsername, function(err, reply){
			if(err) throw err;
			res.status(200).send(reply);
		});
	} else {
		res.status(401).send('Not Authorized');
	}

});

router.put('/', function(req, res, next) {
});

router.delete('/', function(req, res, next) {
});

module.exports = router;