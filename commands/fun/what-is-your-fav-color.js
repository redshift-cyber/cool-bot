
module.exports = {
    name: "what-is-your-fav-color",
    description: "Tells what is my fav color",
    async execute (client, message, args ){
        message.lineReply("My favourite color is blue and white")
    }

}