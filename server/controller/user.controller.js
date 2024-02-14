const User = require("../model/User");

// auth users
// Page: Home Page, FAQ Page, Follow-Up Page
const authUser = async (req, res) => {
    try {
        const { lineopenid,lineusername,lineprofilepicture,lineemail } = req.body;

        const user = await User.findOne({ lineopenid });
        if (!user) {

            //make it so that the field can be empty
            const newUser = await User.create({
                lineopenid: lineopenid,
                lineusername: lineusername,
                lineprofilepicture: lineprofilepicture,
                lineemail: lineemail
            })

            return res.status(201).json({sucecess:true,message:"Register success","user":newUser});
        }

        if(user && (user.lineusername !== lineusername || user.lineprofilepicture !== lineprofilepicture || user.lineemail !== lineemail)){
            user.lineusername = lineusername;
            user.lineprofilepicture = lineprofilepicture;
            user.lineemail = lineemail;
            user.save();

            return res.status(201).json({sucecess:true,message:"Update success","user":user});
        }

        res.status(201).json({sucecess:true,message:"Found user",user});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// get user
// Page: Home Page, FAQ Page, Follow-Up Page
const getUser = async (req, res) => {
    try {
        const id = req.params.id;

        const user = await User.findById(id);
        
        if (!user) {
            return res.status(201).json({sucecess:false,message:"User not found"});
        }

        res.status(201).json({sucecess:true,message:"Found user",user});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


// add record
// Page: add case page
const addRecord = async (req, res) => {
    try {
        const { surgicalprocedure, surgicalstatus, userID } = req.body;

        const user = await User.findById(userID);

        const record = {
            surgicalprocedure: surgicalprocedure,
            surgicalstatus: surgicalstatus
        }

        user.records.push(record);
        record.recordID = user.records[user.records.length-1]._id;

        user.save();

        res.status(201).json({sucecess:true,message:"Record added",record});

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// get all record
// Page: Follow-Up Page
const getAllRecord = async (req, res) => {
    try {
        const { id } = req.params;
        
        const user = await User.findById(id);

        const records = user.records;

        res.status(201).json({sucecess:true,message:"Record Found",records});

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    authUser,
    getUser,
    addRecord,
    getAllRecord,
}