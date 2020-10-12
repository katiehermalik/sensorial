
const express = require('express');
const router = express.Router();

// Database connection
const db = require('../models');

// Current Path = '/users'

// POST Show (Activity index page)
router.post('/', (req, res) => {
  console.log(req.body);
  db.User.findOneAndUpdate({username: req.body.username}, {isLoggedin: true}, 
    {new: true}, (err, foundUser) => {
    if (err) return console.log(err);
    const context = {
      user: foundUser,
    }
    res.render('activities/index', context);
  });
});


module.exports = router;

