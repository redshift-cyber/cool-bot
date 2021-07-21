const Discord = require('discord.js')



module.exports = {
    name: 'uptime',
    description: 'States the bots uptime!',
    async execute (client, message, args){
        let totalSeconds = (client.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);

    const uptimee = new Discord.MessageEmbed()
        .setTitle('Cool Bot\'s current uptime!')
        .setColor('BLUE')
        .setDescription(`**${days}** days \n **${hours}** hours \n **${minutes}** minutes \n **${seconds}** seconds`)
	

        message.channel.send(uptimee)
}

}
