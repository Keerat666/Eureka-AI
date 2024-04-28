const mongoose = require('mongoose');

const CelebritySchema = new mongoose.Schema({
  name: {
    type: String,
    description: "Celebrity's name",
    required: true,
  },
  voiceStyle: {
    type: String,
    description: "Description of the celebrity's voice style (e.g., Motivational, Calm and Soothing, Humorous)",
  },
  imageUrl: {
    type: String,
    description: "URL for an image of the celebrity",
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Celebrity', CelebritySchema);
