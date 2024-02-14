const express = require('express');
const router = express.Router();

const { authUser,getUser,addFollowup } = require('../controller/user.controller');

// POST a new user if not exists
// Endpoint: /api/users/auth
router.route('/auth').post(authUser);

// GET a user by id
// Endpoint: /api/users/:id
router.route('/user/:id').get(getUser);

// post a new followup
// Endpoint: /api/users/addfollowup
router.route('/addfollowup').post(addFollowup);

module.exports = router;
