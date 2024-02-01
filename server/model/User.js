const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    lineopenid: {
        type: String,
        required: true,
        unique: [true, "Line ID already registered"],
    },
    lineusername: {
        type: String,
        required: false,
    },
    lineprofilepicture: {
        type: String,
        required: false
    },
    linestatusmessage: {
        type: String,
        required: false
    },
    records: [{
        surgicalprocedure: {
            type: String,
            required: true
        },
        surgicaldate: {
            type: Date,
            required: true
        },
        surgicalstatus: {
            type: String,
            required: true
        },
        surgicalresult: {
            type: String,
            required: false
        }
    }],
});

const User = mongoose.model("User", UserSchema);

module.exports = User;