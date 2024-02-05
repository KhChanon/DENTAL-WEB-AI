const express = require('express');
const router = express.Router();

const { authUser } = require('../controller/user.controller');

// POST a new user if not exists
// Endpoint: /api/users/auth
router.route('/auth').post(authUser);

module.exports = router;
