const punishmentSchema = require('../../database/punishmentschem')
const DiscordJS = require('discord.js')
module.exports = {
    name: 'history',
    aliases: ['h'],
    description: "returns moderation history of a user",
    async execute (client, message, args){
        const noreasonembed = new DiscordJS.MessageEmbed()
            .setTitle('Incorrect Usage!')
            .setDescription('>history (target)')
            .setFooter(client.user.username, client.user.displayAvatarURL())
            .setTimestamp()
            .setColor('#2f3136')
        if(!args[0]) return message.channel.send(noreasonembed)
        const target = (message.mentions.members.first() || await message.guild.members.fetch(args[0]).catch(error => {
            return message.channel.send(':x: I was unable to find this member! Try again')
          }))


        const schemainfo = await punishmentSchema.find({targetid: `${target.id}`, guildid: `${message.guild.id}`})
        
        if(!schemainfo) return message.channel.send('This member has no history!')

        const historyEmbed = new DiscordJS.MessageEmbed()
        historyEmbed.setTitle(`History for ${target.user.tag} (${target.id})`)
        historyEmbed.setColor('GREEN')
        historyEmbed.setAuthor(target.user.username, target.user.displayAvatarURL())

        schemainfo.forEach(element => {
            if(!element.date) return
            historyEmbed.addFields({name: `${element.action}`, value: `Reason: *${element.reason}* (${element.date})`})
        })

        message.channel.send(historyEmbed)





    }


}