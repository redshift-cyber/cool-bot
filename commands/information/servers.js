const DiscordJS = require('discord.js')
module.exports = {
    name: 'servers', //Whatever u put here will be what the command is called by (example, >hi)
    description: "displays the servers the bots are in", //this part is less important and is just for details
    async execute (client, message, args){ // This is like a message event and will pass in some variables
        const guilds = await client.guilds.cache.array().map(g => g.name).join(" \n \n ")

        const serverEmbed = new DiscordJS.MessageEmbed()
            .setDescription(`**I am in ${client.guilds.cache.size} servers! Here they are: **\n \n ${guilds}`)
            .setColor('BLUE')
        message.channel.send(serverEmbed)

    }


}