var Trello = require('node-trello');
var slackToken = "<Your_Token>";

var t = new Trello("<Your_Key>", "<Your_Trello_Token>");

t.get('1/tokens/<Your_Trello_Token/webhooks', function(err, webhooks){
    if(err) throw err;
    webhooks.forEach(function(webhook){
        t.del('1/webhooks/' + webhook.id, function(err, data){
            if(err) throw err;
            console.log("delete successful", data);
        });
    });
});


t.get('1/members/me/boards', function(err, boards){
    if(err) throw err;
    boards.forEach(function(board){
            t.post('1/webhooks', {
                description: board.name,
                callbackURL: "<Your_URL>",
                idModel: board.id
            }, function(err, data){
                if(err) throw err;
                console.log("DATA EVERYWHERE", data);
            }); 
    });
});




module.exports = slackToken;



