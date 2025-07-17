const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  title: String,
  author: String,
  description: String,
  type: { type: String, enum: ['ebook', 'audio', 'video'] },
  fileUrl: String, // File path for the uploaded content (book/audio/video)
  coverImageUrl: String, // ✅ New field for storing the cover image path
  metadata: {
    keywords: [String],
    publicationDate: Date
  },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Content', contentSchema);
