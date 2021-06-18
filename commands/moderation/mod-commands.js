const DiscordJS = require('discord.js')
module.exports = {
    name: 'mod-commands', //Whatever u put here will be what the command is called by (example, >hi)
    description: "provides the current mod commands", //this part is less important and is just for details
    async execute (client, message, args){ // This is like a message event and will pass in some variables
        const inviteembed = new DiscordJS.MessageEmbed()
        .setDescription("Here are some of the commands that you can use for moderation: >kick, >ban and >mute. Remember new commands are added in every new version 😉",
        ">kick",
        ">ban",
        ">mute")
        .setColor('BLUE')
      message.channel.send(inviteembed)
}
}