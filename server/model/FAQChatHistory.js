const mongoose = require('mongoose');

const FAQChatHistorySchema = new mongoose.Schema({
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
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
});

const FAQChatHistory = mongoose.model("FAQChatHistory", FAQChatHistorySchema);

module.exports = FAQChatHistory;