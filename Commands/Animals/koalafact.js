const Discord = require('discord.js');
const fetch = require('node-fetch');
const config = require('../../config.json');

module.exports = {
    name: "koalafact",
    category: "Animals",
    aliases: ["kf"],
    description: "Sends a random koala fact !!",
    example: `${config.Prefix}koalafact`,

    run: async (client, message, args) => {

    const res = await fetch('https://some-random-api.ml/facts/koala');
    const fact = (await res.json()).fact;

    const embed = new Discord.MessageEmbed()
    .setTitle(`🐨 Koala Fact 🐨`)
    .setDescription(`\`\`\`${fact}\`\`\``)
    .setFooter(`Requested ${message.member.displayName}`,  message.author.displayAvatarURL({ dynamic: true }))
    .setTimestamp()
    .setColor(message.guild.me.displayHexColor);
    message.channel.send(embed);
  }
}