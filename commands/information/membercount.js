const DiscordJS = require('discord.js')
module.exports = {
    name: 'membercount', //Whatever u put here will be what the command is called by (example, >hi)
    description: "provides server info", //this part is less important and is just for details
    async execute (client, message, args){ // This is like a message event and will pass in some variables

message.channel.send(`Total Members: ${message.guild.memberCount}`)

    }}
