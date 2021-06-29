module.exports = {
    name: 'are-you-god', //Whatever u put here will be what the command is called by (example, >hi)
    description: "Am I god?", //this part is less important and is just for details
    async execute (client, message, args){ // This is like a message event and will pass in some variables
message.lineReply('Correct! I am god! I give you a 10 on 10 for that')
}
}