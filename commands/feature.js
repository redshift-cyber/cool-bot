const DiscordJS = require('discord.js')
module.exports = {
    name: 'feature-request', //Whatever u put here will be what the command is called by (example, >hi)
    description: "replies with a message", //this part is less important and is just for details
    async execute (client, message, args){ // This is like a message event and will pass in some variables
        const inviteembed = new DiscordJS.MessageEmbed()
        .setDescription("Want to request a feature create an issue at our github repo: https://github.com/Cool-official-bot/cool/issues and add in the title feature request")
        .setColor('BLUE')
      message.channel.send(inviteembed)
}
}