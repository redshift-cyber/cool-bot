module.exports = {
    name: 'blah-blah', //Whatever u put here will be what the command is called by (example, >hi)
    description: "say blah-blah to me", //this part is less important and is just for details
    async execute (client, message, args){ // This is like a message event and will pass in some variables
message.lineReply('I have no idea what that means. At least it rhymes')
}
}