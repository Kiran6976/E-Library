const express = require('express');
const router = express.Router();
const Content = require('../models/Content');
const auth = require('../middlewares/auth');
const upload = require('../utils/fileUploader');

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }
  next();
};

// ✅ Admin-only Upload Route — supports file + coverImage
router.post(
  '/upload',
  auth,
  isAdmin,
  upload.fields([
    { name: 'file', maxCount: 1 },
    { name: 'coverImage', maxCount: 1 }
  ]),
  async (req, res) => {
    try {
      const { title, author, description, type, publicationDate, keywords } = req.body;

      const content = await Content.create({
        title,
        author,
        description,
        type,
        fileUrl: req.files?.file?.[0]?.path || '',
        coverImageUrl: req.files?.coverImage?.[0]?.path || null,
        uploadedBy: req.user.id,
        metadata: {
          publicationDate,
          keywords: keywords ? keywords.split(',').map(k => k.trim()) : []
        }
      });

      res.status(201).json(content);
    } catch (err) {
      console.error('Upload Error:', err.message);
      res.status(500).json({ message: 'Server Error', error: err.message });
    }
  }
);

// Public: Get All Uploaded Content
router.get('/all', async (req, res) => {
  try {
    const content = await Content.find().populate('uploadedBy', 'name');
    res.json(content);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

module.exports = router;
