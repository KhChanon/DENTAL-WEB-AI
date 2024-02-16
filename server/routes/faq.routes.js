const express = require('express');
const router = express.Router();

const { addFAQ } = require('../controller/faq.controller');

// POST a new FAQ
// Endpoint: /api/faq/add
router.route('/add').post(addFAQ);

module.exports = router;