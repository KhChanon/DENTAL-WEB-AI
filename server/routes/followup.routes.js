const express = require('express');
const router = express.Router();

const { postFollowupRecord } = require('../controller/followup.controller');


// POST a followup chat
// Endpoint: /api/followup/add
router.route('/add').post(postFollowupRecord);

module.exports = router;