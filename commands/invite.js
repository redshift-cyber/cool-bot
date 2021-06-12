const DiscordJS = require('discord.js')
module.exports = {
    name: 'invite', //Whatever u put here will be what the command is called by (example, >hi)
    description: "replies with a message", //this part is less important and is just for details
    async execute (client, message, args){ // This is like a message event and will pass in some variables
        const inviteembed = new DiscordJS.MessageEmbed()
        .setTitle('Click here for the bot invite link!')
        .setColor('BLUE')
        .setURL('https://discord.com/api/oauth2/authorize?client_id=847677148499542016&permissions=8&scope=bot')
      message.channel.send(inviteembed)
}
}