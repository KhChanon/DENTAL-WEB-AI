const User = require("../model/User");

// // auth users
// // Page: Home Page, FAQ Page, Follow-Up Page
const authUser = async (req, res) => {
    try {
        const { lineopenid,lineusername,lineprofilepicture,linestatusmessage,lineemail } = req.body;

        const user = await User.findOne({ lineopenid });
        if (!user) {
            const newUser = User.create({
                lineopenid,
                lineusername,
                lineprofilepicture,
                linestatusmessage,
                lineemail
            });

            return res.status(201).json({sucecess:true,message:"Register success"});
        }

        res.status(201).json({sucecess:true,message:"Found user",user});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    authUser,
}