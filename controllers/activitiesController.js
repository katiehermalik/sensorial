const express = require('express');
const router = express.Router();

// Database connection
const db = require('../models');
const activities = require('./activitiesSeedData');
const prompts = require('./promptSeedData');
const user = require('./userSeedData');

// Current path '/activities'

// GET Index /
router.get('/', (req, res) => {
  db.Activity.find({}, (err, allActivities) => {
    if (err) return console.log(err);

    const context = {
      allActivities: allActivities,
      activities: activities,
      prompts: prompts,
      user: user,
    };

    res.render('activities/index', context)
  })
});

// GET New
router.get('/new', (req, res) => {
  const context = {
    activities: activities,
    prompts: prompts,
    user: user,
  };
  res.render('activities/new', context);
});

// GET Show /:id
router.get('/:activityId', (req, res) => {
  db.Activity.findById(req.params.activityId)
  .populate('prompt')
  .exec((err, activityById)=>{
    if (err) return console.log(err);

    const context = {
      activities: activityById,
      prompts: prompts,
      user: user,
    };

    res.render('activities/show', context);
  })
});

// POST Create
router.post('/', (req, res) => {
  foundUser = res.locals.user;
  db.Activity.create(req.body, (err, newActivity) => {
    if (err) return console.log(err);
    foundUser.activities.push(newActivity._id);
    foundUser.save((err, savedUser) => {
      if (err) return console.log(err);
      res.redirect(`/activities/${newActivity.id}`);
    });
  });
});

// GET Edit /:id/edit
router.get('/:activityId/edit', (req, res) => {
  db.Activity.findById(req.params.activityId, (err, foundActivity) => {
    if (err) console.log(err);

      const context = {
      activities: foundActivity,
      prompts: prompts,
      user: user,
    }
    res.render('activities/edit', context)
  });
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
      console.log(deletedActivity)
    })
});

module.exports = router;
