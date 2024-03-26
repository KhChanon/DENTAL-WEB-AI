from flask import Flask, request, abort
from flask_cors import CORS
import joblib
import dotenv
import re
import requests

app = Flask(__name__)
cors = CORS(app)

channel_access_token = 'bnuW8Pa848Dfhp37AA0II+V8EYcHNGjc5IwlNhvoxLzUmMW1FoKA/xWjaLpRibuRCemzQSXWKLeMTS02UXXViLX/7Fpj1iZiqpPZyOpZowrLMpCgvT6s1Dt04b9eRR7MbZEKSiMHNJEIARLEfYTx4QdB04t89/1O/w1cDnyilFU='

model = joblib.load("./RandomForestClassifier.joblib")
vectoriser = joblib.load("./count_vec.pkl")

Olabel = {-1: 'NC', 0: 'ถอนฟัน', 1: 'ผ่าฟันคุด', 2: 'ผ่าตัดเหงือก', 3: 'ผ่าตัดรากฟันเทียม'}
Qlabel = {0: "General Health", 1: "Medication Related", 2: "Post-Procedure Care", 3: "Procedure Related", 4: "Risk-Related", 5: "Symptom Related", 6: "Technical"}


def keyword_Search3(question):
    returnClass = []
    question = question.lower()
    question = question.replace('?', '')
    question = question.replace(' ', '')
    
    class_0_regex = r'(?!.*(.).*\1)[ถอนฟัน]{6}|ถ.นฟัน|ถอ.ฟัน|ถอน.น|อนฟัน|ถนฟัน|ถอฟัน|ถอนฟั|ถ.อนฟัน|ถอ.นฟัน|ถอน.ฟัน|ถอนฟั.น|ถน|ถ.อน|ถอ.น|ถอน'
    class_1_regex = r'(?!.*(.).*\1)[ฟันคุด]{6}|.นคุด|ฟั.คุด|ฟันคุ.|ฟั.นคุด|ฟัน.คุด|ฟันคุ.ด|ฟัคุด|ฟันคด|ฟนคุด|นคุด|ฟันคุ'
    class_2_regex = r'[เหงือก]{6}|.หงือก|เ.งือก|เห.อก|เหงื.ก|เหงือ.|เ.หงือก|เห.งือก|เหงื.อก|เหงือ.ก|เงือก|เหงอก|เหือก|เหงืก|หงือก|[ปริทันต์]{8}|.ริทันต์|ป.ทันต์|ปริ.นต์|ปริทั.ต์|ปริทัน.|ป.ริทันต์|ปริ.ทันต์|ปริทั.นต์|ปริทัน.ต์|ปรทันต์|ปิทันต์|ปริทนต์|ปริทันต|ปริทัน|ริทันต์'
    class_3_regex = r'(?!การ|รัก|กัน)(?!.*(.).*\1)[รากฟัน]{6}|รกาฟัน|ราฟกัน|ร.กฟัน|รา.ฟัน|ราก.น|รากฟั.|ร.ากฟัน|รา.กฟัน|ราก.ฟัน|รากฟั.น|รกฟัน|ราฟัน|รากน|รากฟั|[รากเทียม]{8}|.ากเทียม|ร.กเทียม|รา.เทียม|ราก.ทียม|รากเ.ยม|รากเที.ม|รากเทีย.|ร.ากเทียม|รา.กเทียม|ราก.เทียม|รากเ.ทียม|รากเที.ยม|รากเทีย.ม|ากเทียม|รกเทียม|รากทียม|รากเยม|รากเทีม|ากฟันเทียม'
    
    if re.search(class_1_regex, question):
        returnClass.append(1)
    
    if re.search(class_0_regex, question) and not re.search(class_1_regex, question):
        returnClass.append(0)
    
    if re.search(class_2_regex, question):
        returnClass.append(2)
    
    if re.search(class_3_regex, question):
        returnClass.append(3)
        
    if len(returnClass) != 1:
        returnClass = [-1]
        
    return returnClass[0]

@app.route("/")
def home():
    return "Model Server is running on port 5000."

@app.route("/line", methods=["POST"])
def line():
    # Get request body as text
    body = request.get_data(as_text=True)
    body_json = request.get_json()
    app.logger.info(body_json)
    
    try:
        handle_message(body_json)
    except:
        abort(400)

    return 'OK'

def handle_message(body_json):
    """ Here's all the messages will be handled and processed by the program """
    operation = keyword_Search3(body_json['events'][0]['message']['text'])
    
    if operation == -1:
        requests.post('https://api.line.me/v2/bot/message/push', 
                  headers={'Content-Type': 'application/json', 'Authorization' : f'Bearer {channel_access_token}'},
                    json = { "to":  body_json['events'][0]['source']['userId'],
                            "messages": [{"type": "text", "text": "Sorry, Please specify the operation(ถอนฟัน, ผ่าฟันคุด, ผ่าตัดเหงือก, ผ่าตัดรากฟันเทียม) in the question."}] 
                })
        return

    data = vectoriser.transform([body_json['events'][0]['message']['text']])
    prediction = model.predict(data)
    text = str(f"Operation: {Olabel[operation]}\nQuestion Type: {Qlabel[prediction[0]]}")
    
    requests.post('https://api.line.me/v2/bot/message/push', 
                  headers={'Content-Type': 'application/json', 'Authorization' : f'Bearer {channel_access_token}'},
                    json = { "to":  body_json['events'][0]['source']['userId'],
                            "messages": [{"type": "text", "text": text}]
                })
    return

@app.route("/predict", methods=["POST"])
def predict():
    
    data = request.json
    input_text = data['question']
    
    operation = keyword_Search3(input_text)
    
    if operation == -1:
        return  {'answer': "Sorry, Please specify the operation(ถอนฟัน, ผ่าฟันคุด, ผ่าตัดเหงือก, ผ่าตัดรากฟันเทียม) in the question."}

    data = vectoriser.transform([input_text])
    prediction = model.predict(data)

    return {'Operation': Olabel[operation], 'Question Type': Qlabel[prediction[0]],  'answer':f'Operation: {Olabel[operation]}\nQuestion Type: {Qlabel[prediction[0]]}'}

if __name__ == "__main__":
    context = ('../certificates/localhost.pem', '../certificates/localhost-key.pem')
    app.run(host=dotenv.get_key("../.env","REACT_APP_DNS_NAME"), port=dotenv.get_key("../.env","MODEL_PORT"),debug = True,ssl_context=context)