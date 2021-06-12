const punishmentSchema = require('../database/punishmentschem')
const DiscordJS = require('discord.js')
module.exports = {
    name: 'unmute', //Whatever u put here will be what the command is called by (example, >hi)
    description: "replies with a message", //this part is less important and is just for details
    async execute (client, message, args){ // This is like a message event and will pass in some variables
      const filterstuff = ['yes', 'no', 'n', 'y']
      const filter = m => m.author.id == message.author.id && filterstuff.some(filterstuff => filterstuff.toLowerCase())

      if(!message.member.permissions.has('MANAGE_MESSAGES')) return message.channel.send(`You do not have the permission to use \`unmute\` `)

      const noreasonembed = new DiscordJS.MessageEmbed()
      .setTitle('Incorrect Usage!')
      .setDescription('>unmute (target) (reason)')
      .setFooter(client.user.username, client.user.displayAvatarURL())
      .setTimestamp()
      .setColor('#2f3136')
      if(!args) return message.channel.send(noreasonembed)
      const target = (message.mentions.members.first() || await message.guild.members.fetch(args[0]).catch(error => {
        return message.channel.send(':x: I was unable to find this member! Try again')
      }))


    


      const role = await message.member.guild.roles.cache.find(role=>role.name=="Muted") || await message.member.guild.roles.cache.find(role=>role.name=="muted")
      if(!role) return message.channel.send('Unable to find a role called Muted, please make one!')



      const confirmationembed = new DiscordJS.MessageEmbed()
      .setDescription(`Are you sure you want to unmute ${target} (${target.id})?`)
      .setAuthor(target.user.username, target.user.displayAvatarURL())
      .setColor('GREEN')
      .setFooter('Reply with yes (y) / no (n)')
      message.channel.send(confirmationembed).then(() => {
          message.channel.awaitMessages(filter, { max: 1, time: 30000})
              .then(async collected => {
                  if(collected.first().content == "yes" || collected.first().content == "y"){
                      await target.send(`You have been unmuted in ${message.guild}!`).catch(error => {
                          message.channel.send('Was unable to dm this member.')
                          })
                          await target.roles.remove(role).catch(error => {
                              return message.channel.send('There was an error trying to unmute this person! Make sure I have the right permissions.')
                          })
                          
                      const completedEmbed = new DiscordJS.MessageEmbed()
                          .setTitle('Member unmuted')
                          .setColor('GREEN')
                          .setDescription(`${target} (${target.id}) was successfully unmuted!`)
                      message.channel.send(completedEmbed)
                          }
                  if(collected.first().content == "no" || collected.first().content == "n"){
                      return message.channel.send('Successfuly cancelled the command!')
                  }
                  
              })
          })

    }}