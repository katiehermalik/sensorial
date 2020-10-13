const mongoose = require('mongoose');

const promptSchema = new mongoose.Schema ({
    name: String,
    materials: String,
    instructions: String,
    experienceGoals: String,
    vocabulary: String,
    activities: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Activity'
      }]
});

const Prompt = (mongoose.model('Prompt', promptSchema));

module.exports = Prompt; 
  