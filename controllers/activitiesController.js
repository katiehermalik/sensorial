const express = require('express');
const router = express.Router();

// Database connection
const db = require('../models');
const activities = require('./activitiesSeedData')

// Current location /activities

// GET Index
router.get('/', (req, res) => {
  res.render('activities/index', {
    activities: activities,
  })
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
  }
  
})

// GET New

// POST Create

// GET Edit /:id/edit

// PATCH/PUT Update /:id

// DELETE destroy /:id

module.exports = router;
