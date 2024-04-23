const User = require("../model/User");
const Followup = require("../model/FollowUpRecords");
const axios = require('axios');
require('dotenv')

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

        await Followup.create({
            record: record.recordID
        });

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

// line auth
const lineAuth = async (req, res) => {
    try{
        const { code, redirect_url } = req.body;
        const response = await axios.post('https://api.line.me/oauth2/v2.1/token', {
            grant_type: 'authorization_code',
            code : code,
            redirect_uri: redirect_url,
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET
        }, {
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
        console.log(response.data);
        
        res.status(201).json({sucecess:true,message:"Line Auth success",data:response.data});
    }
    catch(err){
        console.log(err);
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    authUser,
    getUser,
    addRecord,
    getAllRecord,
    lineAuth,
}