const express = require('express');
const router = express.Router();
const prompts = require('./promptSeedData');
const user = require('./userSeedData');

// Database connection
const db = require('../models');

// Current path '/activities'

// GET Index /
router.get('/', (req, res) => {
  if (req.session.currentUser) {
    const context = {
      user: res.locals.user,
    }
    res.render('activities/index', context)
  } else {
    res.redirect('/')
  }
});


// GET New
router.get('/new', (req, res) => {
  if (req.session.currentUser) {
    const context = {
      user: res.locals.user,
      error: null,
    };
    res.render('activities/new', context);
  } else {
    res.redirect('/')
  }
});

// GET Show /:id
router.get('/:activityId', (req, res) => {
  if (req.session.currentUser) {
    db.Activity.findById(req.params.activityId)
    .exec((err, activityById)=>{
      if (err) return console.log(err);
      const context = {
        activities: activityById,
        user: res.locals.user,
      };
      res.render('activities/show', context);
    });
  } else {
    res.redirect('/')
  }
});

// POST Create
router.post('/', (req, res) => {
  foundUser = res.locals.user;
  if (!req.body.title) {
    const context = {
      error: '* Title is required',
    };
    res.render('activities/new', context);
  } else {
    db.Activity.create(req.body, (err, newActivity) => {
      if (err) return console.log(err);
      foundUser.activities.push(newActivity._id);
      foundUser.save((err, savedUser) => {
        if (err) return console.log(err);
        res.redirect(`/activities/${newActivity.id}`);
      });
    });
  }
});

// GET Edit /:id/edit
router.get('/:activityId/edit', (req, res) => {
  if (req.session.currentUser) {
    db.Activity.findById(req.params.activityId, (err, foundActivity) => {
      if (err) console.log(err);
        const context = {
        activities: foundActivity,
        user: res.locals.user,
      }
      res.render('activities/edit', context)
    });
  } else {
    res.redirect('/')
  }
});

// PATCH/PUT Update /:id
router.put('/:activityId', (req, res) => {
  db.Activity.findByIdAndUpdate(
    req.params.activityId,
    req.body, {
      new: true
    },
    (err, updatedActivity) => {
      if (err) return console.log(err);

      res.redirect(`/activities/${updatedActivity.id}`);
    }
  );
});

// DELETE destroy /:id
router.delete('/:activityId', (req, res) => {
  const activityId = req.params.activityId;
  db.Activity.findByIdAndDelete(activityId, (err, deletedActivity) => {
    if (err) return console.log(err);
    const foundUser = res.locals.user;
      foundUser.activities.remove(activityId)
      foundUser.save((err, deletedActivtiy)=>{
        if (err) return console.log(err);
        res.redirect('/activities')
        return console.log(deletedActivity)
      })
  })
});

module.exports = router;
