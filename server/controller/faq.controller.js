const FAQ = require("../model/FAQChatHistory");
const User = require("../model/User");

// add faq
// Page: FAQ Page
const addFAQ = async (req, res) => {
    try {
        const { question, answer, userID } = req.body;

        if(userID === undefined || userID === null || userID === ""){
            const faq = await FAQ.create({
                chattext: question,
                chatreply: answer,
            })
            return res.status(201).json({sucecess:true,message:"FAQ added",faq});
        }

        const faq = await FAQ.create({
            chattext: question,
            chatreply: answer,
            user: userID
        })

        res.status(201).json({sucecess:true,message:"FAQ added",faq});

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    addFAQ
}