const express = require('express');
const router = express.Router();

// Database connection
const db = require('../models');

// Current path '/activities'

// GET Index
router.get('/', (req, res) => {
  res.render('activities/index');
});

module.exports = router;