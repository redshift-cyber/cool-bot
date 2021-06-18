const punishmentSchema = require('../../database/punishmentschem')
const DiscordJS = require('discord.js')
module.exports = {
    name: 'kick', //Whatever u put here will be what the command is called by (example, >hi)
    aliases: ['k'],
    description: "kicks a member from a guild", //this part is less important and is just for details
    async execute (client, message, args){ // This is like a message event and will pass in some variables

      const filterstuff = ['yes', 'no', 'n', 'y']
      const filter = m => m.author.id == message.author.id && filterstuff.some(filterstuff => filterstuff.toLowerCase())

      if(!message.member.permissions.has('KICK_MEMBERS')) return message.channel.send(`You do not have the permission to use \`kick\` `)
      const noreasonembed = new DiscordJS.MessageEmbed()
      .setTitle('Incorrect Usage!')
      .setDescription('>kick (target) (reason)')
      .setFooter(client.user.username, client.user.displayAvatarURL())
      .setTimestamp()
      .setColor('#2f3136')
        if(!args[0]) return message.channel.send(noreasonembed)

      const target = (message.mentions.members.first() || await message.guild.members.fetch(args[0]).catch(error => {
        return message.channel.send(':x: I was unable to find this member! Try again')
      }))


      if(target.permissions.has('MANAGE_MESSAGES')) return message.channel.send('I cannot kick another staff member!')



      const reason = args.slice(1).join(' ')
      if(!reason) return message.channel.send(noreasonembed)



      const confirmationembed = new DiscordJS.MessageEmbed()
      .setDescription(`Are you sure you want to kick ${target} (${target.id})?`)
      .setAuthor(target.user.username, target.user.displayAvatarURL())
      .setColor('GREEN')
      .setFooter('Reply with yes (y) / no (n)')
      .addFields({name: "Reason:", value: `${reason}`, inline:true }, {name: 'Duration:', value: 'Permanent', inline:true})
      message.channel.send(confirmationembed).then(() => {
          message.channel.awaitMessages(filter, { max: 1, time: 30000})
              .then(async collected => {
                  if(collected.first().content == "yes" || collected.first().content == "y"){
                      await target.send(`You have been kicked from ${message.guild} for ${reason}!`).catch(error => {
                          message.channel.send('Was unable to dm this member.')
                          })
                          await target.kick()(error => {
                              return message.channel.send('There was an error trying to kick this person! Make sure I have the right permissions.')
                          })
                          await punishmentSchema.create({
                              targetid: `${target.id}`, 
                              action: 'Kick',
                              reason: `${reason}`,
                              moderatorid: `${message.author.id}`,
                              date: `${Date.now()}`,
                              guildid: `${message.guild.id}`,}).catch(error => {
                                  console.log('Error adding item to the db.')
                              })
                      const completedEmbed = new DiscordJS.MessageEmbed()
                          .setTitle('Member muted')
                          .setColor('GREEN')
                          .setDescription(`${target} (${target.id}) was successfully muted for ${reason}`)
                      message.channel.send(completedEmbed)
                          }
                  if(collected.first().content == "no" || collected.first().content == "n"){
                      return message.channel.send('Successfuly cancelled the command!')
                  }
                  
              })
          })

    }}