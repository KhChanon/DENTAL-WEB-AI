require('dotenv').config({ path: '../.env' })

const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");

const app = express();

try {
    mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected`);
} catch (err) {
    console.error(err);
    process.exit(1);
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/message', (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.use('/api/users', require('./routes/user.routes'));
app.use('/api/faq', require('./routes/faq.routes'));
app.use('/api/followup', require('./routes/followup.routes'));
app.use('/api/dialogflow', require('./routes/dialogflow.routes'));


app.listen(process.env.BACKEND_PORT, () => {
    console.log(`Server is running on port ${process.env.BACKEND_PORT}.`);
  });