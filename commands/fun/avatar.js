const DiscordJS = require('discord.js')
module.exports = {
    name: 'avatar',
    aliases: ['av', 'icon', 'pfp', 'photo'],
    description: "says hi back",
    async execute (client, message, args){

    if(args.length){
       const person = message.mentions.users.first() || await message.guild.members.fetch(args[0]).catch(error => { return message.channel.send('invalid user - try again')})

       const avatarEmbed = new DiscordJS.MessageEmbed()
            .setDescription(`${person.user.tag}'s avatar`)
            .setColor('BLUE')
            .setImage(`${person.user.displayAvatarURL({dynamic: true})}`)
      message.channel.send('... fetching').then(m => {
          m.edit(avatarEmbed)
      })
    }
    
    if(!args.length){
    const person = message.author

       const avatarEmbed = new DiscordJS.MessageEmbed()
            .setDescription(`${person.tag}'s avatar`)
            .setColor('BLUE')
            .setImage(`${person.displayAvatarURL({dynamic: true})}`)

      message.channel.send('... fetching').then(m => {
          m.edit(avatarEmbed)
      })

    }

      
    }


}
