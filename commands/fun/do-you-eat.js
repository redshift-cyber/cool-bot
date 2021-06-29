module.exports = {
    name: 'do-you-eat', //Whatever u put here will be what the command is called by (example, >hi)
    description: "Do I eat?", //this part is less important and is just for details
    async execute (client, message, args){ // This is like a message event and will pass in some variables
message.lineReply('Duh! Ofc I eat. I eat a big chunk of memory and cpu of the vps I am hosted on. I also feast on information')
}
}