const mongoose = require('mongoose');

const ChapterSchema = new mongoose.Schema({
  topicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Topic',
    description: "Reference to the topic this chapter belongs to",
    required: true,
  },
  chapterNumber: {
    type: Number,
    description: "Sequence number of the chapter within the topic",
    required: true,
  },
  title: {
    type: String,
    description: "Title of the chapter",
    required: true,
  },
  content: {
    type: String,
    description: "Content of the chapter (the text to be read)",
    required: true,
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Chapter', ChapterSchema);
