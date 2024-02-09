const express = require('express');
const router = express.Router();

const { authUser,getUser } = require('../controller/user.controller');

// POST a new user if not exists
// Endpoint: /api/users/auth
router.route('/auth').post(authUser);

// GET a user by id
// Endpoint: /api/users/:id
router.route('/:id').get(getUser);

module.exports = router;
