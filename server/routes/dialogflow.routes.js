const express = require('express');
const router = express.Router();

const { recommendation } = require('../controller/dialogflow.controller');

// POST a dialogflow response
// Endpoint: /api/dialogflow/
router.route('/').post(recommendation);

module.exports = router;