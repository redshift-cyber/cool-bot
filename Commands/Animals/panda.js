const Discord = require('discord.js');
const fetch = require('node-fetch');
const config = require('../../config.json');

module.exports = {
    name: "panda",
    category: "Animals",
    description: "Sends a random panda image !!",
    example: `${config.Prefix}panda`,

    run: async (client, message, args) => {

    const res = await fetch('https://some-random-api.ml/img/panda');
    const img = (await res.json()).link;

    const embed = new Discord.MessageEmbed()
    .setTitle(`🐼 Panda !!! 🐼`)
    .setImage(img)
    .setFooter(`Requested ${message.member.displayName}`,  message.author.displayAvatarURL({ dynamic: true }))
    .setTimestamp()
    .setColor(message.guild.me.displayHexColor);
    message.channel.send(embed);
  }
}