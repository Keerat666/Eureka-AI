const mongoose = require('mongoose');

const TopicSchema = new mongoose.Schema({
  name: {
    type: String,
    description: "Name of the topic (e.g., Machine Learning, Creative Writing)",
    required: true,
  },
  description: {
    type: String,
    description: "Optional description of the topic",
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Topic', TopicSchema);
