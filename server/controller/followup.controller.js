const Followup = require('../model/FollowUpChat');

//get followup chat
// Page: Follow-Up chat page
const getFollowupChat = async (req, res) => {
    try {
        const followupid = req.params.id;

        const chat = await Followup.findOne({ record : followupid })
        console.log(chat);
        
        if (!chat) {
            return res.status(201).json({sucecess:false,message:"Followup not found"});
        }

        res.status(201).json({sucecess:true,message:"Found followup chat",chat});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    getFollowupChat
} 
