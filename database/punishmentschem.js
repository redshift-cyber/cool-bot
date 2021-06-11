const mclient = require('mongodb').mclient
const mongoose = require('mongoose');
const { Schema } = mongoose;

const punishmentSchema = new Schema({
  targetid: String, 
  action: String,
  reason: String,
  moderatorid: String,
  guildid: String,
});



module.exports = mongoose.model('punishmentSchema', punishmentSchema)