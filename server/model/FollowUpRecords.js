const mongoose = require("mongoose");

const FollowUpRecordsSchema = new mongoose.Schema({
    followup: [{
        bleedChoice: {
            type: Number,
            required: true
        },
        painLevel: {
            type: Number,
            required: true
        },
        takenMedication: {
            type: String,
            required: false
        },
        painDecreased: {
            type: String,
            required: false
        },
        swellingLevel: {
            type: Number,
            required: true
        },
        days: {
            type: Number,
            required: false
        },
        symptoms: {
            type: String,
            required: false
        },
        canEat: {
            type: String,
            required: true
        },
        eatSoftFood: {
            type: String,
            required: false
        },
        canBrush: {
            type: String,
            required: true
        },
        recordDate: {
            type: Date,
            default: Date.now
        }
    }],
    record: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user.records'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
});

const FollowUpRecords = mongoose.model("FollowUpRecord", FollowUpRecordsSchema);

module.exports = FollowUpRecords;