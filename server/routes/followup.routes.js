const express = require('express');
const router = express.Router();

const { getFollowupChat } = require('../controller/followup.controller');

// GET a followup chat
// Endpoint: /api/followup/:id
router.route('/:id').get(getFollowupChat);

module.exports = router;