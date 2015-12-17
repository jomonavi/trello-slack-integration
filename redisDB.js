//db connection
var redis = require('redis');

var client = redis.createClient();

client.on('connect', function() {
    console.log('connected to redis db');
});

client.on('error', function(err){
    console.log("error",  err);
});


module.exports = client;