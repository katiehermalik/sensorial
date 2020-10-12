
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

