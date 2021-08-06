const Discord = require('discord.js');
const express = require('express');
const client = new Discord.Client({ disableMentions: "all" });var fs = require('fs');
const http = require('http');
http
    .createServer(function(req, res) {
        res.write('Bot is running.');
        res.end();
    })
    .listen(5050);

require('dotenv').config();



client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.snipes = new Discord.Collection();

["command", "event"].forEach(handler => {
  require(`./Handlers/${handler}`)(client);
});

client.login(process.env.TOKEN);
