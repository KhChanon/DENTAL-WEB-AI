require('dotenv').config({ path: '../.env' })

const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");

const app = express();

try {
    mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected`);
} catch (err) {
    console.error(err);
    process.exit(1);
}

app.use(cors());
app.use(express.json());

app.get('/message', (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
  });