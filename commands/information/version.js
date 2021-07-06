const DiscordJS = require('discord.js')
module.exports = {
    name: 'version', //Whatever u put here will be what the command is called by (example, >hi)
    description: "provides the current version of the bot", //this part is less important and is just for details
    async execute (client, message, args){ // This is like a message event and will pass in some variables

const hungryEmbed = new DiscordJS.MessageEmbed()
  .setDescription("The bot's latest version is v1.3 and you are using it")
  .setColor('BLUE')
message.channel.send(hungryEmbed)
    }}
