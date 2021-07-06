const DiscordJS = require('discord.js')
module.exports = {
    name: 'bot-info', //Whatever u put here will be what the command is called by (example, >hi)
    description: "provides information for the bot", //this part is less important and is just for details
    async execute (client, message, args){ // This is like a message event and will pass in some variables
        const inviteembed = new DiscordJS.MessageEmbed()
        .setTitle('Important Information:')
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .setDescription(`> **Developers:** vunsh#3191, Iron Coder#2021 \n  > **Built on:** Discord.JS v12 \n  > **Bot Version:** 1.3 \n > **Server Count:** ${client.guilds.cache.size}`)
        .setColor('BLUE')
      message.channel.send(inviteembed)
}
}