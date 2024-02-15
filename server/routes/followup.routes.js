const express = require('express');
const router = express.Router();

const { getFollowupChat,
        postFollowupChat } = require('../controller/followup.controller');

// GET a followup chat
// Endpoint: /api/followup/:id
router.route('/:id').get(getFollowupChat);

// POST a followup chat
// Endpoint: /api/followup/add
router.route('/add').post(postFollowupChat);

module.exports = router;