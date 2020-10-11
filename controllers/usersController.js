
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
// router.post('/', (req, res) => {
//   db.User.create(req.body, (err, newUser) => {
//     console.log(newUser);
//     if (err) return console.log(err);
//     res.end();
//   });
// });

// GET Show (Activity index page)
router.get('/', (req, res) => {
  console.log(req.query);
  db.User.findOneAndUpdate({username: req.query.username}, {isLoggedin: true}, 
    {new: true}, (err, foundUser) => {
    if (err) return console.log(err);
    const context = {
      user: foundUser,
    }
    res.render('activities/index', context);
  });
});


module.exports = router;

