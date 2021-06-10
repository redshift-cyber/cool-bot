const DiscordJS = require('discord.js')
module.exports = {
    name: 'ban',
    description: "bans a user from the guild!",
    async execute (client, message, args){
        const noreasonembed = new DiscordJS.MessageEmbed()
            .setTitle('Please provide a reason for the ban!')
            .setDescription('>ban (target) (reason)')
            .setAuthor(message.author.username, message.author.displayAvatarURL())
            .setFooter(client.user.username, client.user.displayAvatarURL())
            .setTimestamp()
            .setColor('#2f3136')

        if(!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send('You do not have the permission to do this! Make sure you have the permission `BAN_MEMBERS`')
        if(!client.member.hasPermission('BAN_MEMBERS')) return message.channel.send('I do not have the permission `BAN_MEMBERS`')
        const pingedTarget = message.mentions.members.first()
        const reason = args.slice(1).join(' ')
        if(!reason) return message.channel.send(noreasonembed)
        if(!pingedTarget){
            const target = await message.guild.members.fetch(args[0])
            const confirmationembed = new DiscordJS.MessageEmbed()
                .setDescription(`Are you sure you want to ban ${target} (${target.id})?`)
                .setAuthor(target.user.username, target.user.displayAvatarURL())
                .setColor('GREEN')
                .setFooter('Reply with yes (y) / no (n)')
                .addFields({name: "Reason:", value: `${reason}`, inline:true }, {name: 'Duration:', value: 'Permanent', inline:true})
                message.channel.send(confirmationembed)
        }
        if(pingedTarget){
            
        }


    }


}
