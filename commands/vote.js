const DiscordJS = require('discord.js')
module.exports = {
    name: 'vote', //Whatever u put here will be what the command is called by (example, >hi)
    description: "replies with a message", //this part is less important and is just for details
    async execute (client, message, args){ // This is like a message event and will pass in some variables
      message.channel.send("here is the link to vote us on top.gg : url name")
}
}