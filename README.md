# Trello Slack Integration

A service that sends a direct message to your Slack channel when your model is updated on Trello. This service works by creating a webhook
for any board that you specify in the webhook-config.js file, along with a valid endpoint that the webhook can post to, upon any change to the board.

In the routes repo, the actual routes for your server that's listening for the webhooks are set up. In the index.js file, when a post request 
is made to the root folder from the webhook, we parse the payload to find out what kind of update happened on the board and the users that should
be direct messaged on Slack. In the users.js file, we set up a route that listens for post requests to associate a Trello username to a Slack
username, and then save the two as a key-value pair to a redis database. 


