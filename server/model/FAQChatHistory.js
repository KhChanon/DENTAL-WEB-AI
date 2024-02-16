const mongoose = require('mongoose');

const FAQChatHistorySchema = new mongoose.Schema({
    chattext: {
        type: String,
        required: true,
    },
    chattime: {
        type: Date,
        default: Date.now
    },
    chatreply: {
        type:String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: false
    },
});

const FAQChatHistory = mongoose.model("FAQChatHistory", FAQChatHistorySchema);

module.exports = FAQChatHistory;