const express = require('express');
const router = express.Router();

const { PostRecommendation } = require('../controller/dialogflow.controller');

// POST a dialogflow response
// Endpoint: /api/dialogflow/
router.route('/').post(PostRecommendation);

module.exports = router;