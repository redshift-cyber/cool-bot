const DiscordJS = require('discord.js')
module.exports = {
    name: 'mute', //Whatever u put here will be what the command is called by (example, >hi)
    description: "replies with a message", //this part is less important and is just for details
    async execute (client, message, args){ // This is like a message event and will pass in some variables

const muteEmbed = new DiscordJS.MessageEmbed()
  .setDescription("Unfortunetly I have some bad news. The bot's latest version that is v1.3 which you can check with >version does not support mute commands yet. Our team of developers are working day and night on adding new stuff to the bot. Our next version which is in BETA will have mute command support")
  .setColor('BLUE')
message.channel.send(muteEmbed)
    }}