const { token, prefix } = require('./config.json');
const aoi = require('aoi.js');
const bot = new aoi.Bot({
token: token',
prefix: prefix, 
fetchInvites: true,
mobile: false
});
bot.onMessage();
