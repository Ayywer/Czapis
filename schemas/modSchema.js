const mongoose = require('mongoose')

let ModSchema = new mongoose.Schema({
    GuildID: String,
    UserID: String,
    Punishments: Array,
    Value: { type: Number, default: 0}
})

const MessageModel = module.exports = mongoose.model('Moderation', ModSchema)