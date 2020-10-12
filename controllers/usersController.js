
const express = require('express');
const router = express.Router();

// Database connection
const db = require('../models');

// Current Path = '/users'


// GET Edit
router.get('/edit', (req, res) => {
  res.render('users/edit');
});

// PUT update
router.put('/:userId', (req, res) => {
  db.User.findByIdAndUpdate(
    req.params.userId,
    req.body,
    { new: true },
    (err, updatedUser) => {
      if (err) return console.log(err);
      res.redirect(`/users/edit`);
    }
  );
});


module.exports = router;

