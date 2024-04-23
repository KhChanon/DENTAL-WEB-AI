const Followup = require('../model/FollowUpRecords');
const User = require('../model/User');

//post followup record
// Page: Follow-Up record page
const postFollowupRecord = async (req, res) => {
    try {
        const { recordID, bleedChoice, pain_level, taken_medication, pain_decreased, swelling_level, days, symptoms, can_eat, eat_soft_food, can_brush, followAgain} = req.body;

        const followup = await Followup.findOne({ "record" : recordID })

        if(!followAgain){
            const user = await User.findOne({ "records._id":  recordID })

            for (let i = 0; i < user.records.length; i++) {
                if (user.records[i]._id == recordID) {
                    user.records[i].surgicalstatus = "Done";
                    break;
                }
            }

            user.save();
        }

        let record = {
            bleedChoice: bleedChoice,
            painLevel: pain_level,
            takenMedication: taken_medication,
            painDecreased: pain_decreased,
            swellingLevel: swelling_level,
            days: days,
            symptoms: symptoms,
            canEat: can_eat,
            eatSoftFood: eat_soft_food,
            canBrush: can_brush
        }

        console.log(record);

        followup.followup.push(record);

        followup.save();

        res.status(201).json({sucecess:true,message:"Chat added",record});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    postFollowupRecord,
} 
