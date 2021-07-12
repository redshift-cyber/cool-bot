const punishmentSchema = require('../../database/punishmentschem')
const DiscordJS = require('discord.js')
module.exports = {
    name: 'unban', //Whatever u put here will be what the command is called by (example, >hi)
    aliases: ['ub'],
    description: "unbans a user", //this part is less important and is just for details
    async execute (client, message, args){ // This is like a message event and will pass in some variables

      const filterstuff = ['yes', 'no', 'n', 'y']
      const filter = m => m.author.id == message.author.id && filterstuff.some(filterstuff => filterstuff.toLowerCase())

      if(!message.member.permissions.has('BAN_MEMBERS')) return message.channel.send(`You do not have the permission to use \`unban\` `)
      const noreasonembed = new DiscordJS.MessageEmbed()
      .setTitle('Incorrect Usage!')
      .setDescription('>unban (target)')
      .setFooter(client.user.username, client.user.displayAvatarURL())
      .setTimestamp()
      .setColor('#2f3136')
        if(!args[0]) return message.channel.send(noreasonembed)

    if(isNaN(args[0])) return message.channel.send('You must put the id of the user ud like to unban!')

      const userID = args[0]

      await message.guild.fetchBans().then(bans=> {

      if(bans.size == 0) return 
      const bUser = bans.find(b => b.user.id == userID)
      if(!bUser) return message.channel.send('This user is not banned!')
      



      const confirmationembed = new DiscordJS.MessageEmbed()
      .setDescription(`Are you sure you want to unban ${bUser.user} (${bUser.user.id})?`)
      .setAuthor(bUser.user.username, bUser.user.displayAvatarURL())
      .setColor('GREEN')
      .setFooter('Reply with yes (y) / no (n)')
      message.channel.send(confirmationembed).then(() => {
          message.channel.awaitMessages(filter, { max: 1, time: 30000})
              .then(async collected => {
                  if(collected.first().content == "yes" || collected.first().content == "y"){
                          await message.guild.members.unban(bUser.user).catch(error => {
                              return message.channel.send('There was an error trying to unban this person! Make sure I have the right permissions.')
                          })
                      const completedEmbed = new DiscordJS.MessageEmbed()
                          .setTitle('Member unbanned')
                          .setColor('GREEN')
                          .setDescription(`${bUser.user} (${bUser.user.id}) was successfully unbanned!`)
                      message.channel.send(completedEmbed)
                          }
                  if(collected.first().content == "no" || collected.first().content == "n"){
                      return message.channel.send('Successfuly cancelled the command!')
                  }
                  
              })
          })
})
    }}