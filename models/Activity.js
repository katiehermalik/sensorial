const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    promptInfo: 
    {   type: mongoose.Schema.Types.ObjectId,
        ref: './Prompt',
    },
    note: {
        type: String,
        max: 20,
    },
    experienceDesc: {
        type: String,
        max: 600,
    },
    photo: String,
}, {timestamp: true}); 

const Activity = mongoose.model('activities', activitySchema);

module.exports = Activity; 
   