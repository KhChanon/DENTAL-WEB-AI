const User = require("../model/User");

// // register users
// // Page: Home Page, FAQ Page, Follow-Up Page

const registerUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email });
        if (user) {
            return res.json({ success: false, message: "Email already exists" });
        } else if (!password || password.length < 6) {
            return res.json({ success: false, message: "Password must be at least 6 characters" });
        }

        const newUser = await User.create({
            email: email,
            password: password,
        });

        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    registerUser,
}