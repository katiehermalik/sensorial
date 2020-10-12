const express = require('express');
const router = express.Router();

// Database connection
const db = require('../models');
const activities = require('./activitiesSeedData');
const prompts = require('./promptSeedData')

// Current path '/activities'

// GET Index
router.get('/', (req, res) => {
  res.render('activities/index', {
    activities: activities,
  });
});

// GET Show /:id
router.get('/:id', (req, res)=>{
  const activityId = req.params.id;
  const activity = activities[activityId]
  if (activity){
    res.render('activities/show', {
      activities: activities,
    })
  }else{
    res.redirect('/activities', {
      activities: {message: 'activity does not exist.'},
    })
  };
  
});

// GET New
router.get('/new', (req, res)=>{
  db.activities.find({}, (err, allActivities)=>{
    if (err) return console.log(err);

    const context = {allActivities};

    res.render('activities/new', context);
  });
});

// POST Create
router.post('/', (req, res)=>{
  db.Activity.create(req.body, (err, newActivity)=>{
    if (err) return console.log(err);
    
    activities.push(newActivity._id);

    res.redirect(`/activities/${newActivity._id}`);
  });
});

// GET Edit /:id/edit
router.get('/:activityId/edit', (req, res)=>{
  db.Activity.findById(req.params.activityId, (err, foundActivity)=>{
    if (err){
      console.log(err);
    }
    res.render('activities/edit')
  });
});

// PATCH/PUT Update /:id
router.put('/:articleId', (req, res)=>{
  db.Activity.findByIdAndUpdate(
    req.params.activityId,
    req.body,
    {new: true},
    (err, updatedActivity) => {
      if (err) return console.log(err);

      res.redirect(`/activities/${updatedActivity._id}`);
    }
  );
});

// DELETE destroy /:id
router.delete('/:activityId', (req, res) => {
  const activityId = req.params.activityId
  db.Activity.findbyIdAndDelete(activityId, (err)=>{
    if (err) return console.log(err);

    res.redirect('/activities')
  })
})

module.exports = router;
