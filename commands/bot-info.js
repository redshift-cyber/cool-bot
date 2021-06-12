const DiscordJS = require('discord.js')
module.exports = {
    name: 'bot-info', //Whatever u put here will be what the command is called by (example, >hi)
    description: "replies with a message", //this part is less important and is just for details
    async execute (client, message, args){ // This is like a message event and will pass in some variables
        const inviteembed = new DiscordJS.MessageEmbed()
        .setDescription("Here is some info on the bot: server-count: 4 ; Developer: iron Coder#2021 and vunsh#3191; bot-website: xyz.com;")
        .setColor('BLUE')
      message.channel.send(inviteembed)
}
}