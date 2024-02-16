const express = require('express');
const router = express.Router();

const { authUser,
        getUser,
        addRecord, 
        getAllRecord } = require('../controller/user.controller');

// POST a new user if not exists
// Endpoint: /api/users/auth
router.route('/auth').post(authUser);

// GET a user by id
// Endpoint: /api/users/:id
router.route('/user/:id').get(getUser);

// post a new record
// Endpoint: /api/users/addrecord
router.route('/addrecord').post(addRecord);

// get all record
// Endpoint: /api/users/records
router.route('/:id/records').get(getAllRecord);

module.exports = router;
