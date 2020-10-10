
const express = require('express');
const router = express.Router();

// Database connection
const db = require('../models');

// Current Path = '/users'

// Seed data (minus image for now)
// const userSeedData = require('./userSeedData');
// db.User.insertMany(userSeedData, (err, data) => {
//   console.log('added user data');
//   process.exit();
// });

module.exports = router;

