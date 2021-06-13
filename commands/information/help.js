const DiscordJS = require('discord.js')
module.exports = {
    name: 'help', //Whatever u put here will be what the command is called by (example, >hi)
    description: "pulls up a list of commands", //this part is less important and is just for details
    async execute (client, message, args){ // This is like a message event and will pass in some variables

    const { commands } = message.client;
    const prefix = ">"

    const commandnames = commands.map(command => command.name).join('\n>')
    const commanddesc = commands.map(command => command.description).join(' \n ')
    const helpEmbed = new DiscordJS.MessageEmbed()
        .setTitle('Commands!')
        .setColor('BLUE')
        .setFooter('Use >help (command name) for info on a specific command!')
        .addFields(
            {
                name: 'Command Name:', 
                value: `${prefix}${commandnames}`,
                inline: true
            }, 
            {
                name: 'Description:', 
                value: `${commanddesc}`,
                inline: true
            }
        )
if(!args.length) return message.channel.send(helpEmbed)

const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.reply('that\'s not a valid command!');
		}
        const spHelp = new DiscordJS.MessageEmbed()

		spHelp.setTitle(`Name: ${command.name}`);

		if (command.aliases) await spHelp.addField({name:`**Aliases:**`, value: `${command.aliases.join(', ')}`});
		if (command.description) await spHelp.addField({name:`**Description:**`, value: `${command.description}`});
		if (command.usage) await spHelp.addField({name: `**Usage:**`, value: `${prefix}${command.name} ${command.usage}`});

        message.channel.send(spHelp)

    
        }
    }