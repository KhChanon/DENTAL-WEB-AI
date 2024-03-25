from flask import Flask, request, jsonify
import joblib
from sklearn.feature_extraction.text import CountVectorizer
import dotenv

app = Flask(__name__)

model = joblib.load("./RandomForestClassifier.joblib")
vectoriser = joblib.load("./count_vec.pkl")

@app.route("/")
def home():
    return "Model Server is running on port 5000."

@app.route("/predict", methods=["POST"])
def predict():
    input_text = request.form["question"]
    
    data = vectoriser.transform([input_text])
    prediction = model.predict(data)
    
    return {'prediction': int(prediction[0])}

if __name__ == "__main__":
    context = ('../certificates/localhost.pem', '../certificates/localhost-key.pem')
    app.run(host=dotenv.get_key("../.env","REACT_APP_DNS_NAME"), port=dotenv.get_key("../.env","MODEL_PORT"),debug = True,ssl_context=context)