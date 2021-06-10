require("dotenv").config()

const fs = require('fs')
const DiscordJS = require('discord.js')
require('discord-reply');
const client = new DiscordJS.Client()
const prefix = ">"


client.commands = new DiscordJS.Collection();
client.cooldowns = new DiscordJS.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}


client.on('ready',function(){
    function setStatus () {

    client.user.setPresence({
        status: 'online',
        activity: {
            name: "Winter",
            type: 'PLAYING',
        }
    });
    }
    setStatus();
    setInterval(() => setStatus(), 3600000);

    console.log('Cool Bot is online!')
})
client.on('message', async message => {

    
    if(message.mentions.has(client.user)){
        if (message.mentions.everyone) return;
        const mentionedembed = new DiscordJS.MessageEmbed()
            .setTitle('Hello!')
            .setColor('#038dff')
            .setDescription(`Hi, my name is cool bot! Nice to meet you.`)
            message.lineReply(mentionedembed)
            }

            if (!message.content.startsWith(prefix) || message.author.bot) return;

            const args = message.content.slice(prefix.length).trim().split(/ +/);
            const command = args.shift().toLowerCase();
            const { cooldowns } = client;

            if (!cooldowns.has(command.name)) {
                cooldowns.set(command.name, new DiscordJS.Collection());
            }
            
            const now = Date.now();
            const timestamps = cooldowns.get(command.name);
            const cooldownAmount = (command.cooldown || 2) * 1000;
            if (timestamps.has(message.author.id)) {
                const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
            
                if (now < expirationTime) {
                    const timeLeft = (expirationTime - now) / 1000;
                    return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
                }
            }
            timestamps.set(message.author.id, now);
setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
            if (!client.commands.has(command)) return;
        
            try {
                client.commands.get(command).execute(message.client, message, args);
            } catch (error) {
                console.error(error);
                message.reply('there was an error trying to execute that command!');
            }

    
})








client.login(process.env.DISCORD_TOKEN)













