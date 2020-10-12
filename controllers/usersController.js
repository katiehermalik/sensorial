
const express = require('express');
const router = express.Router();

// Database connection
const db = require('../models');

// Current Path = '/users'



// Get show
router.get('/:userId', (req, res) => {
  db.User.findById((req.params.userId),
    (err, foundUser) => {
      if (err) return console.log(err);
      const context = {
        user: foundUser,
      };
      res.render('users/show', context);
    });
});

module.exports = router;

