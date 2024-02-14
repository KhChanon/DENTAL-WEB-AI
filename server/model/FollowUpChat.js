const mongoose = require("mongoose");

const FollowUpChatSchema = new mongoose.Schema({
    userchat: {
        type: Boolean,
        required: true,
    },
    chattime: {
        type: Date,
        default: Date.now
    },
    chattext: {
        type: String,
        required: true,
    },
    record: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user.records'
    },
});

const FollowUpChat = mongoose.model("FollowUpChat", FollowUpChatSchema);

module.exports = FollowUpChat;