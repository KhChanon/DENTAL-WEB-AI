const express = require('express');
const router = express.Router();

const { postFollowupRecord, 
        postFollowupLine } = require('../controller/followup.controller');

// POST a followup chat
// Endpoint: /api/followup/add
router.route('/add').post(postFollowupRecord);

// POST a followup line
// Endpoint: /api/followup/addline
router.route('/addline').post(postFollowupLine);

module.exports = router;