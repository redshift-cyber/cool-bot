const punishmentSchema = require('../../database/punishmentschem')
const DiscordJS = require('discord.js')
module.exports = {
    name: 'warn', //Whatever u put here will be what the command is called by (example, >hi)
    aliases:['w'],
    description: "warns a guild member", //this part is less important and is just for details
    async execute (client, message, args){ // This is like a message event and will pass in some variables

      const filterstuff = ['yes', 'no', 'n', 'y']
      const filter = m => m.author.id == message.author.id && filterstuff.some(filterstuff => filterstuff.toLowerCase())

      if(!message.member.permissions.has('MANAGE_MESSAGES')) return message.channel.send(`You do not have the permission to use \`warn\` `)
      const noreasonembed = new DiscordJS.MessageEmbed()
      .setTitle('Incorrect Usage!')
      .setDescription('>warn (target) (reason)')
      .setFooter(client.user.username, client.user.displayAvatarURL())
      .setTimestamp()
      .setColor('#2f3136')
        if(!args[0]) return message.channel.send(noreasonembed)

      const target = (message.mentions.members.first() || await message.guild.members.fetch(args[0]).catch(error => {
        return message.channel.send(':x: I was unable to find this member! Try again')
      }))


      if(target.permissions.has('MANAGE_MESSAGES')) return message.channel.send('You cannot warn another staff member!')



      const reason = args.slice(1).join(' ')
      if(!reason) return message.channel.send(noreasonembed)

    



      const confirmationembed = new DiscordJS.MessageEmbed()
      .setDescription(`Are you sure you want to warn ${target} (${target.id})?`)
      .setAuthor(target.user.username, target.user.displayAvatarURL())
      .setColor('GREEN')
      .setFooter('Reply with yes (y) / no (n)')
      .addFields({name: "Reason:", value: `${reason}`, inline:true })
      message.channel.send(confirmationembed).then(() => {
          message.channel.awaitMessages(filter, { max: 1, time: 30000})
              .then(async collected => {
                  if(collected.first().content == "yes" || collected.first().content == "y"){
                      await target.send(`You have been warned in ${message.guild} for ${reason}!`).catch(error => {
                          message.channel.send('Was unable to dm this member.')
                          })
                          await punishmentSchema.create({
                              targetid: `${target.id}`, 
                              action: 'warn',
                              reason: `${reason}`,
                              date: `${Date.now()}`,
                              moderatorid: `${message.author.id}`,
                              guildid: `${message.guild.id}`,}).catch(error => {
                                  console.log('Error adding item to the db.')
                              })
                      const completedEmbed = new DiscordJS.MessageEmbed()
                          .setTitle('Member muted')
                          .setColor('GREEN')
                          .setDescription(`${target} (${target.id}) was successfully warned for ${reason}`)
                      message.channel.send(completedEmbed)
                          }
                  if(collected.first().content == "no" || collected.first().content == "n"){
                      return message.channel.send('Successfuly cancelled the command!')
                  }
                  
              })
          })

    }}