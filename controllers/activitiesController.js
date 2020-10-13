const express = require('express');
const router = express.Router();

// Database connection
const db = require('../models');
const activities = require('./activitiesSeedData');
const prompts = require('./promptSeedData');
const user = require('./userSeedData')

// Current path '/activities'

// GET Index /
router.get('/', (req, res) => {
  db.Activity.find({}, (err, allActivities) => {
    if (err) return console.log(err);

    const context = {
      activities: allActivities,
      prompts: prompts,
      user: user,
    };

    res.render('activities/index', context)
  })
});
// async try & catch // promises (once this executes, run this other thing)

// GET Show /:id
router.get('/:id', (req, res) => {
  db.Activity.findById(req.params.activityId)
  .populate('prompt')
  .exec((err, activityById)=>{
    if (err) return console.log(err);

    res.render('activities/show', activityById);
  })
});

// GET New
router.get('/new', (req, res) => {
    res.render('activities/new');
});

// POST Create
router.post('/', (req, res) => {
  db.Activity.create(req.body, (err, newActivity) => {
    if (err) return console.log(err);

    res.redirect(`/activities/${newActivity.id}`);
  });
});

// GET Edit /:id/edit
router.get('/:activityId/edit', (req, res) => {
  db.Activity.findById(req.params.activityId, (err, foundActivity) => {
    if (err) {
      console.log(err);
    }
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
  const activityId = req.params.activityId
  db.Activity.findbyIdAndDelete(activityId, (err) => {
    if (err) return console.log(err);

    res.redirect('/activities')
  })
})

// Add activity array to DB
// db.Activity.collection.insertMany(activities, (err, actArr)=>{
//     if (err){
//         console.log(err);
//     }else{
//         console.log(actArr);
//     }
//     process.exit();
// });

// Add prompt array to DB
// db.Prompt.collection.insertMany(activities, (err, promptArr)=>{
//   if (err){
//       console.log(err);
//   }else{
//       console.log(promptArr);
//   }
//   process.exit();
// });

module.exports = router;
