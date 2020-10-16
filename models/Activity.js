const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    prompt: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Prompt',
    },
    note: {
        type: String,
        max: 20,
    },
    experienceDesc: String,
    photo: String,
    user: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }]
}, {
    timestamps: true
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;
  