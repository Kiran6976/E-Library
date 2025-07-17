const multer = require('multer');
const path = require('path');

// Storage configuration
const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});

// File filter to accept content + image files only
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    'application/pdf',      // ebooks
    'audio/mpeg',           // audio files
    'video/mp4',            // videos
    'application/epub+zip', // epub
    'image/jpeg',           // images
    'image/jpg',
    'image/png'
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Unsupported file type'), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
