const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

// Database connection
const db = require('../models');

//Current Path = '/auth'


// POST Signup
router.post('/signup', (req, res) => {
  db.User.findOne({email: req.body.email}, (err, user) => {
    if (err) return console.log(err);
    if (user) {
      console.log('User Account Already Exists');
      const context = {
        message: 'User Account Already Exists - Please Choose a Different Email.'
      };
      return res.render('landing', context)
    }
    bcrypt.genSalt(10, (err, salt) =>{
      if (err) return console.log(err);
      bcrypt.hash(req.body.password, salt, (err, hashedPassword) => {
        if (err) return console.log(err);
        const newUser = {
          username: req.body.username,
          email: req.body.email,
          password: hashedPassword,
          isLoggedin: true,
        }
        db.User.create(newUser, (err, createdUser) => {
          if (err) return console.log(err);
          req.session.currentUser = createdUser._id;
          res.redirect('/currentprompt')
        });
      });
    });
  });
});


// POST Login 
router.post('/login', (req, res) => {
  db.User.findOneAndUpdate({email: req.body.email}, {isLoggedin: true}, 
    {new: true}, (err, user) => {
    if (err) return console.log(err);
    if (!user) {
      console.log('Login Route: No User Found');
      const context = {
        message: 'Sorry, No User Found with that Email Address.'
      };
      return res.render('landing', context)
    }
    // If user, compare passwords
    bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
      if (err) return console.log('Error comparing passwords')
      if (!isMatch) {
        console.log('Email Address and Password do not Match.')
        const context = {
          message: 'Email Address and Password Do Not Match.'
        };
        return res.render('landing', context)
      }
      if (isMatch) {
        // create a new session using express sessions
        req.session.currentUser = user._id;
        res.redirect('/currentprompt')
      }
    });
  });
});


// DELETE Logout 
router.delete('/logout', (req, res) => {
  db.User.findOneAndUpdate({isLoggedin: true}, {isLoggedin: false}, 
    {new: true}, (err) => {
    if (err) return console.log(err);
  });
  if (req.session.currentUser) {
    req.session.destroy((err) => {
      if (err) return console.log(err);
      res.redirect('/');
    });
  };
});


module.exports = router;

