const Followup = require('../model/FollowUpRecords');
const User = require('../model/User');
const axios = require('axios');

//post followup record
// Page: Follow-Up record page
const postFollowupRecord = async (req, res) => {
    try {
        const { recordID, bleedChoice, pain_level, taken_medication, pain_decreased, swelling_level, days, symptoms, can_eat, eat_soft_food, can_brush, followAgain} = req.body;

        const followup = await Followup.findOne({ "record" : recordID })

        const user = await User.findOne({ "records._id":  recordID })

        for (let i = 0; i < user.records.length; i++) {
            if (user.records[i]._id == recordID) {
                
                if(!followAgain){
                    user.records[i].surgicalstatus = "Done";
                }
                else{
                    user.records[i].surgicalstatus = "Follow Up";
                }
                break;
            }
        }

        user.save();

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

const postFollowupLine = async (req, res) => {
    try {
        const { userID } = req.body;

        const user = await User.findById(userID);

        const pendingRecords = user.records.filter(record => record.surgicalstatus === 'Pending');

        const contents = [];
        for (const record of pendingRecords) {
            let url = '';

            if (record.surgicalprocedure === 'ถอนฟัน') {
                url = 'https://tu.ac.th/uploads/news-tu/news/2566/oct/66-1349r.jpg';
            } else if (record.surgicalprocedure === 'ผ่าฟันคุด') {
                url = 'https://www.smiledelightclinic.com/wp-content/uploads/2023/08/wisdom-tooth-768x553.jpg';
            } else if (record.surgicalprocedure === 'ผ่าตัดเหงือก') {
                url = 'https://media.istockphoto.com/id/998246150/fi/vektori/s%C3%B6p%C3%B6-sarjakuvahammashahmo-jolla-on-purukumiongelma.jpg?s=612x612&w=0&k=20&c=zfJMQm8-ZB3Prw2eE4AijftQyRHXQbmm8_7_hW8SXG0=';
            } else if (record.surgicalprocedure === 'ผ่าตัดรากฟันเทียม') {
                url = 'https://www.si.mahidol.ac.th/sidoctor/sirirajonline2021/Article_images/1482_0.jpg';
            }

            contents.push({
                type: 'bubble',
                size: 'micro',
                hero: {
                    type: 'image',
                    url: url,
                    size: 'full',
                    aspectMode: 'cover',
                    aspectRatio: '320:213'
                },
                body: {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                        {
                            type: 'text',
                            text: record.surgicalprocedure,
                            weight: 'bold',
                            size: 'sm',
                            wrap: true
                        },
                        {
                            type: 'box',
                            layout: 'horizontal',
                            contents: [
                                {
                                    type: 'text',
                                    text: 'Date:',
                                    wrap: true,
                                    color: '#8c8c8c',
                                    size: 'xs',
                                    scaling: false,
                                    flex: 1
                                },
                                {
                                    type: 'text',
                                    text: record.surgicaldate.toLocaleDateString('en-US'),
                                    flex: 3,
                                    size: 'sm'
                                }
                            ],
                            flex: 1
                        },
                        {
                            type: 'button',
                            action: {
                                type: 'message',
                                label: 'Follow Up',
                                text: `Record ID: ${record._id}`
                            }
                        }
                    ],
                    spacing: 'sm',
                    paddingAll: '13px'
                }
            });
        }

        if (contents.length > 0) {
            try {
                await axios.post(
                    'https://api.line.me/v2/bot/message/push',
                    {
                        to: user.lineopenid,
                        messages: [
                            {
                                type: 'flex',
                                altText: 'Follow-up reminder',
                                contents: {
                                    type: 'carousel',
                                    contents: contents
                                }
                            }
                        ]
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: 'Bearer bnuW8Pa848Dfhp37AA0II+V8EYcHNGjc5IwlNhvoxLzUmMW1FoKA/xWjaLpRibuRCemzQSXWKLeMTS02UXXViLX/7Fpj1iZiqpPZyOpZowrLMpCgvT6s1Dt04b9eRR7MbZEKSiMHNJEIARLEfYTx4QdB04t89/1O/w1cDnyilFU='
                        }
                    }
                );
                console.log('Follow-up sent to user', user.lineopenid, user.lineusername);
                res.status(200).send('Follow-up sent successfully');
            } catch (error) {
                console.error('Error sending follow-up:', error);
                res.status(500).send('Error sending follow-up');
            }
        } else {
            res.status(400).send('No records found for follow-up');
        }
    }
    catch (err) {
        console.error('Error sending follow-up:', err);
        res.status(500).send('Error sending follow-up');
    }
}

module.exports = {
    postFollowupRecord,
    postFollowupLine
} 