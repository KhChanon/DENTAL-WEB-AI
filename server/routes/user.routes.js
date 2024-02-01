const express = require('express');
const router = express.Router();

const { registerUser } = require('../controller/user.controller');

// POST a new user
// Endpoint: /api/users/register
router.route('/register').post(registerUser);

module.exports = router;
