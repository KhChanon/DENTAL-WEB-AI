const mongoose = require("mongoose");

const FollowUpChatSchema = new mongoose.Schema({
    userchat: {
        type: Boolean,
        required: true,
    },
    chattime: {
        type: Date,
        required: true,
    },
    chattext: {
        type: String,
        required: true,
    },
    record: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User.records'
    },
});

const FollowUpChat = mongoose.model("FollowUpChat", FollowUpChatSchema);

module.exports = FollowUpChat;