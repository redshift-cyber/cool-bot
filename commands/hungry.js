module.exports = {
    name: 'hungry', //Whatever u put here will be what the command is called by (example, >hi)
    description: "replies with a message", //this part is less important and is just for details
    async execute (client, message, args){ // This is like a message event and will pass in some variables
message.lineReply('I am not programmed to feed you sorry')
}
}
