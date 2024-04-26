const Followup = require('../model/FollowUpRecords');
const User = require('../model/User');

//post recommendation
//line dialogflow
const recommendation = async (req, res) => {
    const agent = new WebhookClient({ request: request, response: response });
    console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
    console.log('Dialogflow Request body: ' + JSON.stringify(request.body));

    function welcome(agent) {
        agent.add(`Welcome to my agent!`);
    }

    function fallback(agent) {
        agent.add(`I didn't understand`);
        agent.add(`I'm sorry, can you try again?`);
    }


    async function recommendation(agent) {
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
    
        let saveDB = true;
    
        try {
            const document = await User.findOne({ "records._id": ObjectId(record_id) });
            if (document) {
                for (let i = 0; i < document.records.length; i++) {
                    if (document.records[i].surgicalstatus == "Follow Up") {
                        recommendations.add("This Follow Up cased is been finished today. Please check the recommendations.");
                        saveDB = false;
                    } else if (document.records[i].surgicalstatus == "Done") {
                        recommendations.add("This Follow Up cased has been finished.");
                        saveDB = false;
                    } else {
                        recommendations.add("The Follow Up cased has been recorded. Please check the recommendations.");
                    }
                }
            }
        } catch (error) {
            console.error('Error finding document in MongoDB:', error);
        }
    
        let uniqueRecommendations = Array.from(recommendations);
    
        agent.add("Recommendations:");
        uniqueRecommendations.forEach((recommendation) => {
            agent.add(recommendation);
        });
    
        if (saveDB) {
            if (!followAgain) {
                try {
                    await User.updateOne({ "records._id": ObjectId(record_id) }, { $set: { "records.$.surgicalstatus": "Done" } });
                    console.log('Data updated successfully:');
                } catch (error) {
                    console.error('Error updating data in MongoDB:', error);
                }
            } else {
                try {
                    await User.updateOne({ "records._id": ObjectId(record_id) }, { $set: { "records.$.surgicalstatus": "Follow Up" } });
                    console.log('Data updated successfully:');
                } catch (error) {
                    console.error('Error updating data in MongoDB:', error);
                }
            }
    
            if (collection) {
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
                    await Followup.updateOne({ "record": ObjectId(record_id) }, { $push: { "followup": record_score } });
                    console.log('Data inserted successfully:');
                } catch (error) {
                    console.error('Error updating data in MongoDB:', error);
                }
    
            } else {
                console.error('MongoDB collection is not initialized');
            }
        }
    }
    

    let intentMap = new Map();
    intentMap.set('Default Welcome Intent', welcome);
    intentMap.set('Default Fallback Intent', fallback);

    // Map each intent to its corresponding recommendation function
    intentMap.set('OralBot-B-P(7-10)-M(no)-S(5-10)-DA( 0-3)-DI(no)-SF-OH', recommendation);
    intentMap.set('OralBot-B-P(7-10)-M(no)-S(5-10)-DA( 0-3)-DI(yes)-OH', recommendation);
    intentMap.set('OralBot-B-P(7-10)-M(no)-S(5-10)-DA(3 +)-SYM-DI(no)-SF-OH', recommendation);
    intentMap.set('OralBot-B-P(7-10)-M(no)-S(5-10)-DA(3 +)-SYM-DI(yes)-OH', recommendation);
    intentMap.set('OralBot-B-P(7-10)-M(no)-S(0-4)-DI(no)-SF-OH', recommendation);
    intentMap.set('OralBot-B-P(7-10)-M(no)-S(0-4)-DI(yes)-OH', recommendation);
    intentMap.set('OralBot-B-P(7-10)-M(yes)-BE-S(0-4)-DI(yes)-OH', recommendation);
    intentMap.set('OralBot-B-P(7-10)-M(yes)-BE-S(0-4)-DI(no)-SF-OH', recommendation);
    intentMap.set('OralBot-B-P(7-10)-M(yes)-BE-S(5-10)-DA(3+)-SYM-DI(yes)-OH', recommendation);
    intentMap.set('OralBot-B-P(7-10)-M(yes)-BE-S(5-10)-DA(3+)-SYM-DI(no)-SF-OH', recommendation);
    intentMap.set('OralBot-B-P(7-10)-M(yes)-BE-S(5-10)-DA(0-3)-DI(no)-SF-OH', recommendation);
    intentMap.set('OralBot-B-P(7-10)-M(yes)-BE-S(5-10)-DA(0-3)-DI(yes)-OH', recommendation);
    intentMap.set('OralBot-B-P(0-6)-S(5-10)-DA(3+)-SYM-DI(yes)-OH', recommendation);
    intentMap.set('OralBot-B-P(0-6)-S(5-10)-DA(3+)-SYM-DI(no)-SF-OH', recommendation);
    intentMap.set('OralBot-B-P(0-6)-S(5-10)-DA(0-3)-DI(no)-SF-OH', recommendation);
    intentMap.set('OralBot-B-P(0-6)-S(5-10)-DA(0-3)-DI(yes)-OH', recommendation);
    intentMap.set('OralBot-B-P(0-6)-S(0-4)-DI(yes)-OH', recommendation);
    intentMap.set('OralBot-B-P(0-6)-S(0-4)-DI(no)-SF-OH', recommendation);

    agent.handleRequest(intentMap);
}

module.exports = {
    recommendation,
}