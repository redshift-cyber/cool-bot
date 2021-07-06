module.exports = {
    name: 'purge',
    aliases: ['p'],
    description: "clears a specified amount of messages",
    async execute(client, message, args){

        if(!message.member.permissions.has('MANAGE_MESSAGES')) return message.channel.send("You do not have the permission `MANAGE_MESSAGES`");

        if(!args[0]) return message.channel.send("Please enter a valid number to delete.");

        const number = parseInt(args[0], 10);

        if(isNaN(number)) return message.channel.send("Only numbers are allowed.");

        if(number > 99) return message.channel.send("The maximum amount of messages that can be deleted is 99.");

        await message.channel.bulkDelete(number + 1);
        
        const purgemsg = await message.channel.send(`**Successfully deleted ${number} messages**`);
       async function afterdelete() {
            await purgemsg.delete()
        }
        setTimeout(afterdelete, 2000)
    }

};

