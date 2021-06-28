module.exports = {
    name: 'hi',
    description: "says hi back",
    async execute (client, message, args){
       message.channel.send('Hello there 👋')



    }


}
