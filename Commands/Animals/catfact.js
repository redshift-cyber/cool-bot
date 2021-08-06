const Discord = require('discord.js');
const fetch = require('node-fetch');
const config = require('../../config.json');

module.exports = {
    name: "catfact",
    category: "Animals",
    aliases: ["cf"],
    description: "Sends a random cat fact !!",
    example: `${config.Prefix}catfact`,

    run: async (client, message, args) => {

    const res = await fetch('https://some-random-api.ml/facts/cat');
    const fact = (await res.json()).fact;

    const embed = new Discord.MessageEmbed()
    .setTitle(`🐱 Cat Fact 🐱`)
    .setDescription(`\`\`\`${fact}\`\`\``)
    .setFooter(`Requested ${message.member.displayName}`,  message.author.displayAvatarURL({ dynamic: true }))
    .setTimestamp()
    .setColor(message.guild.me.displayHexColor);
    message.channel.send(embed);
  }
}