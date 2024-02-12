const mongoose = require('mongoose');

const FAQChatHistorySchema = new mongoose.Schema({
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
    chatreply: {
        type:String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
});

const FAQChatHistory = mongoose.model("FAQChatHistory", FAQChatHistorySchema);

module.exports = FAQChatHistory;