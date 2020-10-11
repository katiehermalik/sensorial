
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

// POST Create
router.post('/', (req, res) => {
  db.User.create(req.body, (err, newUser) => {
    if (err) return console.log(err);
    const context = {
      user: newUser,
    }
    res.render('activities/index', context);
  });
});

// GET Show
router.get('/', (req, res) => {
  console.log(req.body);
  db.User.find({username: req.body.username},
    (err, foundUser) => {
    if (err) return console.log(err);
    const context = {
      user: foundUser,
    }
    res.render('activities/index', context);
  });
});


module.exports = router;

