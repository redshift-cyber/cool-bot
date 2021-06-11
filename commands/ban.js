const DiscordJS = require('discord.js')
const punishmentSchema = require('../database/punishmentschem')

module.exports = {
    name: 'ban',
    description: "bans a user from the guild!",
    async execute (client, message, args){
        const filterstuff = ['yes', 'no', 'n', 'y']
        const filter = m => m.author.id == message.author.id && filterstuff.some(filterstuff => filterstuff.toLowerCase())
            
        
        
        const noreasonembed = new DiscordJS.MessageEmbed()
            .setTitle('Incorrect Usage!')
            .setDescription('>ban (target) (reason)')
            .setFooter(client.user.username, client.user.displayAvatarURL())
            .setTimestamp()
            .setColor('#2f3136')

        if(!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send('You do not have the permission to do this! Make sure you have the permission `BAN_MEMBERS`')
        const pingedTarget = message.mentions.members.first()
        const reason = args.slice(1).join(' ')
        if(!reason) return message.channel.send(noreasonembed)
        if(!pingedTarget){
            const target = await message.guild.members.fetch(args[0]).catch(error => {
              return message.channel.send(':x: I was unable to find this member! Try again')
            })
            if(target.hasPermission('ADMINISTRATOR')) return message.channel.send('I cannot ban an administrator of the server!')
    
            const confirmationembed = new DiscordJS.MessageEmbed()
                .setDescription(`Are you sure you want to ban ${target} (${target.id})?`)
                .setAuthor(target.user.username, target.user.displayAvatarURL())
                .setColor('GREEN')
                .setFooter('Reply with yes (y) / no (n)')
                .addFields({name: "Reason:", value: `${reason}`, inline:true }, {name: 'Duration:', value: 'Permanent', inline:true})
                message.channel.send(confirmationembed).then(() => {
                    message.channel.awaitMessages(filter, { max: 1, time: 30000})
                        .then(async collected => {
                            if(collected.first().content == "yes" || collected.first().content == "y"){
                                target.send(`You have been banned from ${message.guild} for ${reason}!`).catch(error => {
                                    message.channel.send('Was unable to dm this member.')
                                    })
                                    await message.guild.members.ban(target).catch(error => {
                                        return message.channel.send('There was an error trying to ban this person! Make sure I have the right permissions.')
                                    })
                                    await punishmentSchema.create({
                                        targetid: `${target.id}`, 
                                        action: 'Ban',
                                        reason: `${reason}`,
                                        moderatorid: `${message.author.id}`,
                                        guildid: `${message.guild.id}`,}).catch(error => {
                                            console.log('Error adding item to the db.')
                                        })
                                const completedEmbed = new DiscordJS.MessageEmbed()
                                    .setTitle('Member banned')
                                    .setDescription(`${target} (${target.id}) was successfully banned for ${reason}`)
                                message.channel.send(completedEmbed)
                            if(collected.first().content == "no" || collected.first().content == "n"){
                                return message.channel.send('Successfuly cancelled the command!')
                            }
                            }
                        })
                    })
        }
        if(pingedTarget){
            if(pingedTarget.hasPermission('ADMINISTRATOR')) return message.channel.send('I cannot ban an administrator of this server!')
            const confirmationembed = new DiscordJS.MessageEmbed()
                .setDescription(`Are you sure you want to ban ${pingedTarget} (${pingedTarget.id})?`)
                .setAuthor(pingedTarget.user.username, pingedTarget.user.displayAvatarURL())
                .setColor('GREEN')
                .setFooter('Reply with yes (y) / no (n)')
                .addFields({name: "Reason:", value: `${reason}`, inline:true }, {name: 'Duration:', value: 'Permanent', inline:true})
                 await message.channel.send(confirmationembed).then(() => {
                    message.channel.awaitMessages(filter, { max: 1, time: 30000})
                        .then(async collected => {
                            if(collected.first().content == "yes" || collected.first().content == "y"){
                                pingedTarget.user.send(`You have been banned from ${message.guild} for ${reason}!`).catch(error => {
                                message.channel.send('Was unable to dm this member.')
                                })
                                await message.guild.members.ban(pingedTarget).catch(error => {
                                    message.channel.send('There was an error trying to ban this person! Make sure I have the right permissions.')
                                })
                                const completedEmbed = new DiscordJS.MessageEmbed()
                                    .setTitle('Member banned')
                                    .setDescription(`${pingedTarget} (${pingedTarget.id}) was successfully banned for ${reason}`)
                                message.channel.send(completedEmbed)
                            if(collected.first().content == "no" || collected.first().content == "n"){
                                return message.channel.send('Successfuly cancelled the command!')
                            }
                            }
                        })
                    })
        }


    }


}
