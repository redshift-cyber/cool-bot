const punishmentSchema = require('../../database/punishmentschem')
const DiscordJS = require('discord.js')
module.exports = {
    name: 'warns',
    aliases: ['wrns'],
    description: "returns warns history of a user",
    async execute (client, message, args){
        const noreasonembed = new DiscordJS.MessageEmbed()
            .setTitle('Incorrect Usage!')
            .setDescription('>warns (target)')
            .setFooter(client.user.username, client.user.displayAvatarURL())
            .setTimestamp()
            .setColor('#2f3136')
        if(!args[0]) return message.channel.send(noreasonembed)
        const target = (message.mentions.members.first() || await message.guild.members.fetch(args[0]).catch(error => {
            return message.channel.send(':x: I was unable to find this member! Try again')
          }))


        const schemainfo = await punishmentSchema.find({targetid: `${target.id}`, guildid: `${message.guild.id}`, action: `warn`})
        
        if(!schemainfo) return message.channel.send('This member has no warnings!')

        const historyEmbed = new DiscordJS.MessageEmbed()
        historyEmbed.setTitle(`Warnings for ${target.user.tag} (${target.id})`)
        historyEmbed.setColor('GREEN')
        historyEmbed.setAuthor(target.user.username, target.user.displayAvatarURL())

        schemainfo.forEach(element => {
            if(!element.date) return
            historyEmbed.addFields({name: `${element.action}`, value: `Reason: *${element.reason}* (${element.date})`})
        })

        message.channel.send(historyEmbed)





    }


}