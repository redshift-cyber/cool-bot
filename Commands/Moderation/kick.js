const Discord = require('discord.js');
const emoji = require('../../Utils/emoji.json');
const config = require('../../config.json');

module.exports = {
    name: 'kick',
    category: 'Moderation',
    description: 'Kicks the mentioned user or the user which you provided ID from the server lol',
    example: `${config.Prefix}kick @Dinav Being Rude`,

    run: async (client, message, args) => {
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        const Perms = ["KICK_MEMBERS" || "ADMINSTRATOR"]
        const doggo = message.guild.members.cache.get(client.user.id);

        if(!message.member.hasPermission(Perms)) 
        return message.reply(`❌ You do not have the permission to do that lol try asking your owner or admin to give you the permission **\`KICK_MEMBERS\`** or **\`ADMINISTRATOR\`**`)
        .then(msg => {
            msg.delete({ timeout: 20000 })
        });

        if(!doggo.hasPermission(Perms))
        return message.reply(`❌  I do not have permission to kick users pls enable permission **\`KICK_MEMBERS\`** for me`)

        if (!user)
        return message.reply(`❌ Please specify someone you want to kick, **\`${config.Prefix}kick <user mention / user ID> [reason]\`**`)
        
        if(user === client.user.id)
        return message.reply(`❌  Wait what ??!! I can't kick myslef !!!`)

        if(user.id === message.author.id) 
        return message.reply(`❌ You cannot kick yourself idiot`)
        

        if (user.roles.highest.position > message.member.roles.highest.position)
        return message.reply(`❌ You cannot kick someone with an equal or higher role to you !!! **or** if you are owner pls be yourself in a higher position`)
        

        if (!user.bannable)
        return message.reply(`❌ Provided user is not kickable cuz he / she has higher role than me or equal as my position :(`);


        const reason = args.slice(1).join(" ");
        message.guild.members.cache.get(user.id).kick({reason: reason});
 
        const embed = new Discord.MessageEmbed()
        .setColor("#00aaaa")
        .setTitle('Kick !!')
        .setDescription(`✅ <@${user.id}> (**\`${user.user.tag}\`**) has been kicked from **${message.guild.name}**`)
        .addField('Reason', `**\`${reason != "" ? reason : "-"}\`**`, true)
        .addField('Kicked By', `<@${message.member.id}> (**\`${message.member.user.tag}\`**)`, true)
        .setTimestamp()
        await message.channel.send(embed);
    }
}
