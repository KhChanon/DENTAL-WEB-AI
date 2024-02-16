const Followup = require('../model/FollowUpChat');

//get followup chat
// Page: Follow-Up chat page
const getFollowupChat = async (req, res) => {
    try {
        const followupid = req.params.id;

        const chat = await Followup.findOne({ record : followupid })
        
        if (!chat) {
            return res.status(201).json({sucecess:false,message:"Followup not found"});
        }

        res.status(201).json({sucecess:true,message:"Found followup chat",chat});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

//post followup chat
// Page: Follow-Up chat page
const postFollowupChat = async (req, res) => {
    try {
        const { followupid, chat } = req.body;

        const followup = await Followup.findOne({ record : followupid })

        followup.chat.push(chat);

        followup.save();

        res.status(201).json({sucecess:true,message:"Chat added",chat});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    getFollowupChat,
    postFollowupChat,
} 
