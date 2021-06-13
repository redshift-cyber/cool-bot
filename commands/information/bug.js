const DiscordJS = require('discord.js')
module.exports = {
    name: 'bug', //Whatever u put here will be what the command is called by (example, >hi)
    description: "returns instructions for how to report a bot bug", //this part is less important and is just for details
    async execute (client, message, args){ // This is like a message event and will pass in some variables
        const inviteembed = new DiscordJS.MessageEmbed()
        .setDescription("Found a bug? report your issue at our webiste: cool.com/support/ or issue your bug at our githug repository: https://github.com/Cool-official-bot/cool/issues")
        .setColor('BLUE')
      message.channel.send(inviteembed)
}
}