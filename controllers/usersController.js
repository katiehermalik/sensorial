const express = require('express');
const router = express.Router();

// Database connection
const db = require('../models');

// Current Path = '/users'


// Get show
router.get('/:userId', (req, res) => {
  const context = {
    user: res.locals.user,
  };
  res.render('users/show', context);
});

// GET edit
router.get('/:userId/edit', (req, res) => {
  const context = {
    user: res.locals.user,
  };
  res.render('users/edit', context);
});

// PUT update
router.put('/:userId', (req, res) => {
  db.User.findByIdAndUpdate(req.params.userId, req.body, {
      new: true
    },
    (err, updatedUser) => {
      if (err) return console.log(err);
      res.redirect(`/users/${updatedUser._id}`);
    });
});

// DELETE user and all their activities
router.delete('/:userId', (req, res) => {
  db.User.findByIdAndDelete(req.params.userId, (err, deletedUser) => {
    if (err) return console.log(err);
    db.Activity.deleteMany({
      _id: {
        $in: deletedUser.activities
      }
    }, (err) => {
      if (err) return console.log(err);
      res.redirect('/');
    })
  });
});

module.exports = router;
