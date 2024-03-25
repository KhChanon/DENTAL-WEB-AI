from flask import Flask, request, jsonify, abort
import joblib
from sklearn.feature_extraction.text import CountVectorizer
import dotenv
from linebot import LineBotApi, WebhookHandler
from linebot.exceptions import InvalidSignatureError
from linebot.models import MessageEvent, TextMessage, TextSendMessage

app = Flask(__name__)

line_bot_api = LineBotApi('bnuW8Pa848Dfhp37AA0II+V8EYcHNGjc5IwlNhvoxLzUmMW1FoKA/xWjaLpRibuRCemzQSXWKLeMTS02UXXViLX/7Fpj1iZiqpPZyOpZowrLMpCgvT6s1Dt04b9eRR7MbZEKSiMHNJEIARLEfYTx4QdB04t89/1O/w1cDnyilFU=')
handler = WebhookHandler('f515c508206a04f59d7ac7c1088d4484')

model = joblib.load("./RandomForestClassifier.joblib")
vectoriser = joblib.load("./count_vec.pkl")

label = {0: "General Health", 1: "Medication Related", 2: "Post-Procedure Care", 3: "Procedure Related", 4: "Risk-Related", 5: "Symptom Related", 6: "Technical"}

@app.route("/")
def home():
    return "Model Server is running on port 5000."

@app.route("/line", methods=["POST"])
def line():
    # Get X-Line-Signature header value
    signature = request.headers['X-Line-Signature']

    # Get request body as text
    body = request.get_data(as_text=True)
    app.logger.info("Request body: " + body)

    # Handle webhook body
    try:
        handler.handle(body, signature)
    except InvalidSignatureError:
        abort(400)

    return 'OK'

@handler.add(MessageEvent, message=TextMessage)
def handle_message(event):
    """ Here's all the messages will be handled and processed by the program """

    data = vectoriser.transform([event.message.text])
    prediction = model.predict(data)

    line_bot_api.reply_message(
        event.reply_token,
        TextSendMessage(text=label[prediction[0]]))

@app.route("/predict", methods=["POST"])
def predict():
    input_text = request.form["question"]

    data = vectoriser.transform([input_text])
    prediction = model.predict(data)

    return {'prediction': label[prediction[0]]}

if __name__ == "__main__":
    context = ('../certificates/localhost.pem', '../certificates/localhost-key.pem')
    app.run(host=dotenv.get_key("../.env","REACT_APP_DNS_NAME"), port=dotenv.get_key("../.env","MODEL_PORT"),debug = True,ssl_context=context)