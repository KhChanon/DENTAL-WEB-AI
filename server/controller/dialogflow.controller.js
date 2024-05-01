const Followup = require('../model/FollowUpRecords');
const User = require('../model/User');
const { WebhookClient, Payload } = require('dialogflow-fulfillment');

//post recommendation
//line dialogflow
const PostRecommendation = async (req, res) => {
    
    const agent = new WebhookClient({ request: req, response: res });
    console.log('Dialogflow Request headers: ' + JSON.stringify(req.headers));
    console.log('Dialogflow Request body: ' + JSON.stringify(req.body));

    function welcome(agent) {
        agent.add(`Welcome to my agent!`);
    }

    function fallback(agent) {
        agent.add(`I didn't understand`);
        agent.add(`I'm sorry, can you try again?`);
    }


    async function handleRecommendation(agent) {
        let followAgain = false;
        let recommendations = new Set();
        let record_id = agent.parameters.record_id;
        let bleedChoice = parseInt(agent.parameters.bleed_choice);
        let painLevel = parseInt(agent.parameters.pain_level);
        let swellingLevel = parseInt(agent.parameters.swelling_level);
        let canEat = agent.parameters.can_eat;
        let canBrush = agent.parameters.can_brush;
        let takenMedication = agent.parameters.taken_medication;
        let painDecreased = agent.parameters.pain_decreased;
        let days = parseInt(agent.parameters.days);
        let symptoms = agent.parameters.symptoms;
        let eatSoftFood = agent.parameters.eat_soft_food;
    
        if (bleedChoice === 2) {
            recommendations.add("คุณยังมีเลือกซึมจากแผลอยู่บ้างเป็นเลือกปนน้ำลาย ควรกัดผ้าก๊อซต่ออีก30นาที และไม่บ้วนน้ำลายบ่อย");
        } else if (bleedChoice === 3) {
            recommendations.add("คุณยังมีเลือดซึมจากแผลเป็นสีแดงสดและ/หรือมีลิ่มเลือกปนอยู่ด้วย ควรกัดผ้าก๊อซ และพบแพทย์ผู้ดูแล");
        }
    
        if (painLevel > 7) {
            if (takenMedication === 'ใช่') {
                if (painDecreased === 'ไม่') {
                    recommendations.add("คุณได้ทานยาแก้ปวดแล้วแต่อาการปวดไม่ดีขึ้น ควรไปพบแพทย์ผู้ดูแลเพื่อประเมิณอาการ และจะมีการติตามอาการอีกรอบใน24ชั่วโมง");
                    followAgain = true;
                } else {
                    recommendations.add("คุณได้ทานยาแก้ปวดแล้วและอาการปวดดีขึ้น จะมีการติตามอาการอีกรอบใน24ชั่วโมง");
                    followAgain = true;
                }
            } else {
                recommendations.add("อาการปวดมากกว่าระดับ7 แนะนำให้ทานยาแก้ปวดเพื่อระงับความปวดเบื้องต้น และจะมีการติตามอาการอีกรอบใน24ชั่วโมง");
                followAgain = true;
            }
        }
    
        if (swellingLevel >= 1 && swellingLevel < 2) {
            recommendations.add("ใบหน้าบริเวณแผลของคุณไม่มีอาการบวมหรือบวมเล็กน้อย ควรประคบเย็นที่ใบหน้าบริเวณแผลลดอาการบวม");
        } else if (swellingLevel > 2) {
            if (days <= 3) {
                recommendations.add("ใบหน้าของคุณยังมีอาการบวมแบบเห็นได้ชัด แต่ยังอยู่ในช่วง3วันหลังผ่าตัด ควรประคบเย็นบริเวณที่บวมเพื่อลดอาการปวดบวม และจะมีการติตามอาการอีกรอบใน24ชั่วโมง");
                followAgain = true;
            } else {
                if (symptoms === 'ใช่') {
                    recommendations.add("หลังผ่าตัด3วันแล้ว ยังมีอาการบวมแบบเห็นได้ชัดและไม่น้อยลงหรือมีอาการปวดร่วมด้วย ควรไปพบแพทย์ผู้ดูแลเพื่อประเมิณอาการ และจะมีการติตามอาการอีกรอบใน24ชั่วโมง");
                    followAgain = true;
                } else {
                    recommendations.add("หลังผ่าตัด3วันแล้ว ยังมีอาการบวมแบบเห็นได้ชัดและแค่อาการบวมน้อยลงและไม่มีอาการปวดร่วมด้วย ควรประคบอุ่นบริเวณที่บวมเพื่อลดอาการปวดบวม และจะมีการติตามอาการอีกรอบใน24ชั่วโมง");
                    followAgain = true;
                }
            }
        }
    
        if (canEat === 'ไม่') {
            if (eatSoftFood === 'ใช่') {
                recommendations.add("ควรไปพบแพทย์ผู้ดูแลเพื่อประเมิณอาการของแผล");
            } else {
                recommendations.add("ควรทานอาหารอ่อน และอาหหารที่ไม่มีรสชาติจัด และจะมีการติตามอาการอีกรอบใน24ชั่วโมง");
                followAgain = true;
            }
        }
    
        if (canBrush === 'ไม่') {
            recommendations.add("ควรหลีกเลี่ยงการแปรงฟันบริเวณจุดที่ทำการผ่าตัด");
        } else {
            recommendations.add("คุณสามารถแปรงฟันได้ตามปกติ");
        }
    
        let uniqueRecommendations = Array.from(recommendations);
    
        agent.add("Recommendations:");
        uniqueRecommendations.forEach((recommendation) => {
            agent.add(recommendation);
        });
    
        if (!followAgain) {
            try {
                await User.updateOne({ "records._id": record_id }, { $set: { "records.$.surgicalstatus": "Done" } });
                console.log('Data updated successfully:');
            } catch (error) {
                console.error('Error updating data in MongoDB:', error);
            }
        } else {
            try {
                await User.updateOne({ "records._id": record_id }, { $set: { "records.$.surgicalstatus": "Follow Up" } });
                console.log('Data updated successfully:');
            } catch (error) {
                console.error('Error updating data in MongoDB:', error);
            }
        }

        let record_score = {
            "bleedChoice": bleedChoice,
            "painLevel": painLevel,
            "takenMedication": takenMedication,
            "painDecreased": painDecreased,
            "swellingLevel": swellingLevel,
            "days": days,
            "symptoms": symptoms,
            "canEat": canEat,
            "eatSoftFood": eatSoftFood,
            "canBrush": canBrush
        };

        try {
            await Followup.updateOne({ "record": record_id }, { $push: { "followup": record_score } });
            console.log('Data inserted successfully:');
        } catch (error) {
            console.error('Error updating data in MongoDB:', error);
        }
    }

    async function handleCheckStatus(agent) {
        let record_id = agent.parameters.record_id;
        let recommendations = new Set();
        
        user = await User.findOne({ "records._id": record_id })

        if (!user) {
            agent.add("ไม่พบข้อมูลผู้ใช้งาน");
            return;
        }

        record = user.records.find(record => record._id == record_id);

        if (record.surgicalstatus === "Done") {
            agent.add("คุณทำฟอร์มนี้ไปแล้ว");

            agent.context.delete("oralbot-followup");
        }
        else if (record.surgicalstatus === "Follow Up") {
            agent.add("เดี่ยวจะมีการติดตามอีกครั้งพรุ่งนี้");

            followup = await Followup.findOne({ "record": record_id });

            record_score = followup.followup[followup.followup.length - 1];

            if (record_score.bleedChoice === 2) {
                recommendations.add("คุณยังมีเลือกซึมจากแผลอยู่บ้างเป็นเลือกปนน้ำลาย ควรกัดผ้าก๊อซต่ออีก30นาที และไม่บ้วนน้ำลายบ่อย");
            } else if (record_score.bleedChoice === 3) {
                recommendations.add("คุณยังมีเลือดซึมจากแผลเป็นสีแดงสดและ/หรือมีลิ่มเลือกปนอยู่ด้วย ควรกัดผ้าก๊อซ และพบแพทย์ผู้ดูแล");
            }
        
            if (record_score.painLevel > 7) {
                if (record_score.takenMedication === 'ใช่') {
                    if (record_score.painDecreased === 'ไม่') {
                        recommendations.add("คุณได้ทานยาแก้ปวดแล้วแต่อาการปวดไม่ดีขึ้น ควรไปพบแพทย์ผู้ดูแลเพื่อประเมิณอาการ และจะมีการติตามอาการอีกรอบใน24ชั่วโมง");
                        followAgain = true;
                    } else {
                        recommendations.add("คุณได้ทานยาแก้ปวดแล้วและอาการปวดดีขึ้น จะมีการติตามอาการอีกรอบใน24ชั่วโมง");
                        followAgain = true;
                    }
                } else {
                    recommendations.add("อาการปวดมากกว่าระดับ7 แนะนำให้ทานยาแก้ปวดเพื่อระงับความปวดเบื้องต้น และจะมีการติตามอาการอีกรอบใน24ชั่วโมง");
                    followAgain = true;
                }
            }
        
            if (record_score.swellingLevel >= 1 && record_score.swellingLevel < 2) {
                recommendations.add("ใบหน้าบริเวณแผลของคุณไม่มีอาการบวมหรือบวมเล็กน้อย ควรประคบเย็นที่ใบหน้าบริเวณแผลลดอาการบวม");
            } else if (record_score.swellingLevel > 2) {
                if (record_score.days <= 3) {
                    recommendations.add("ใบหน้าของคุณยังมีอาการบวมแบบเห็นได้ชัด แต่ยังอยู่ในช่วง3วันหลังผ่าตัด ควรประคบเย็นบริเวณที่บวมเพื่อลดอาการปวดบวม และจะมีการติตามอาการอีกรอบใน24ชั่วโมง");
                    followAgain = true;
                } else {
                    if (record_score.symptoms === 'ใช่') {
                        recommendations.add("หลังผ่าตัด3วันแล้ว ยังมีอาการบวมแบบเห็นได้ชัดและไม่น้อยลงหรือมีอาการปวดร่วมด้วย ควรไปพบแพทย์ผู้ดูแลเพื่อประเมิณอาการ และจะมีการติตามอาการอีกรอบใน24ชั่วโมง");
                        followAgain = true;
                    } else {
                        recommendations.add("หลังผ่าตัด3วันแล้ว ยังมีอาการบวมแบบเห็นได้ชัดและแค่อาการบวมน้อยลงและไม่มีอาการปวดร่วมด้วย ควรประคบอุ่นบริเวณที่บวมเพื่อลดอาการปวดบวม และจะมีการติตามอาการอีกรอบใน24ชั่วโมง");
                        followAgain = true;
                    }
                }
            }
        
            if (record_score.canEat === 'ไม่') {
                if (record_score.eatSoftFood === 'ใช่') {
                    recommendations.add("ควรไปพบแพทย์ผู้ดูแลเพื่อประเมิณอาการของแผล");
                } else {
                    recommendations.add("ควรทานอาหารอ่อน และอาหหารที่ไม่มีรสชาติจัด และจะมีการติตามอาการอีกรอบใน24ชั่วโมง");
                    followAgain = true;
                }
            }
        
            if (record_score.canBrush === 'ไม่') {
                recommendations.add("ควรหลีกเลี่ยงการแปรงฟันบริเวณจุดที่ทำการผ่าตัด");
            } else {
                recommendations.add("คุณสามารถแปรงฟันได้ตามปกติ");
            }
        
            let uniqueRecommendations = Array.from(recommendations);
        
            agent.add("Recommendations:");
            uniqueRecommendations.forEach((recommendation) => {
                agent.add(recommendation);
            });

            agent.context.delete("oralbot-followup");
        }
        else {
            const payload = {
                "line": {
                  "quickReply": {
                    "items": [
                      {
                        "action": {
                          "text": "1",
                          "label": "1",
                          "type": "message"
                        },
                        "type": "action"
                      },
                      {
                        "type": "action",
                        "action": {
                          "type": "message",
                          "text": "2",
                          "label": "2"
                        }
                      },
                      {
                        "action": {
                          "type": "message",
                          "text": "3",
                          "label": "3"
                        },
                        "type": "action"
                      }
                    ]
                  },
                  "type": "text",
                  "text": "แผลคุณมีเลือดไหลซึมอยู่ที่ระดับไหน \n\t1. ไม่มีเลือกซึมจากแผล \n\t2. ยังมีเลือดซึมจากแผล เป็นเลือดปนน้ำลาย \n\t3. ยังมีเลือดซึมจากแผล เป็นเลือดสีแดงสด และ/หรือมีลิ่มเลือดปนออกมาด้วย"
                }
              }
            agent.add(new Payload(agent.LINE, payload, { sendAsMessage: true, rawPayload: true }));
        }
    }

    let intentMap = new Map();
    intentMap.set('Default Welcome Intent', welcome);
    intentMap.set('Default Fallback Intent', fallback);

    intentMap.set('OralBot', handleCheckStatus);

    // Map each intent to its corresponding recommendation function
    intentMap.set('OralBot-B-P(7-10)-M(no)-S(5-10)-DA( 0-3)-DI(no)-SF-OH', handleRecommendation);
    intentMap.set('OralBot-B-P(7-10)-M(no)-S(5-10)-DA( 0-3)-DI(yes)-OH', handleRecommendation);
    intentMap.set('OralBot-B-P(7-10)-M(no)-S(5-10)-DA(3 +)-SYM-DI(no)-SF-OH', handleRecommendation);
    intentMap.set('OralBot-B-P(7-10)-M(no)-S(5-10)-DA(3 +)-SYM-DI(yes)-OH', handleRecommendation);
    intentMap.set('OralBot-B-P(7-10)-M(no)-S(0-4)-DI(no)-SF-OH', handleRecommendation);
    intentMap.set('OralBot-B-P(7-10)-M(no)-S(0-4)-DI(yes)-OH', handleRecommendation);
    intentMap.set('OralBot-B-P(7-10)-M(yes)-BE-S(0-4)-DI(yes)-OH', handleRecommendation);
    intentMap.set('OralBot-B-P(7-10)-M(yes)-BE-S(0-4)-DI(no)-SF-OH', handleRecommendation);
    intentMap.set('OralBot-B-P(7-10)-M(yes)-BE-S(5-10)-DA(3+)-SYM-DI(yes)-OH', handleRecommendation);
    intentMap.set('OralBot-B-P(7-10)-M(yes)-BE-S(5-10)-DA(3+)-SYM-DI(no)-SF-OH', handleRecommendation);
    intentMap.set('OralBot-B-P(7-10)-M(yes)-BE-S(5-10)-DA(0-3)-DI(no)-SF-OH', handleRecommendation);
    intentMap.set('OralBot-B-P(7-10)-M(yes)-BE-S(5-10)-DA(0-3)-DI(yes)-OH', handleRecommendation);
    intentMap.set('OralBot-B-P(0-6)-S(5-10)-DA(3+)-SYM-DI(yes)-OH', handleRecommendation);
    intentMap.set('OralBot-B-P(0-6)-S(5-10)-DA(3+)-SYM-DI(no)-SF-OH', handleRecommendation);
    intentMap.set('OralBot-B-P(0-6)-S(5-10)-DA(0-3)-DI(no)-SF-OH', handleRecommendation);
    intentMap.set('OralBot-B-P(0-6)-S(5-10)-DA(0-3)-DI(yes)-OH', handleRecommendation);
    intentMap.set('OralBot-B-P(0-6)-S(0-4)-DI(yes)-OH', handleRecommendation);
    intentMap.set('OralBot-B-P(0-6)-S(0-4)-DI(no)-SF-OH', handleRecommendation);

    agent.handleRequest(intentMap);
}

module.exports = {
    PostRecommendation,
}