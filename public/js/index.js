$(document).ready(function(){
    console.log("ready");
    $('#submit-usernames').on('click', function(){
        var usernames = {
            trelloUsername: $('#trello-input').val(),
            slackUsername: $('#slack-input').val()          
        };

        $.post('/users', usernames, function(data, textStatus, XHR){
            $('.container').empty().append('<div class="alert alert-success">\
            <strong>Success!</strong> Your Trello & Slack usernames were saved.\
            </div>');

        });
    });
});