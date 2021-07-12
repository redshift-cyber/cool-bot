module.exports = {
    name: 'ping',
    description: "returns ping of user",
    async execute (client, message, args){

        message.channel.send("Pinging...").then(m =>{
            const ping = m.createdTimestamp - message.createdTimestamp;

            m.edit(`**:ping_pong: Pong! Your Ping Is: ${ping}ms**`);

        })


    }


}
