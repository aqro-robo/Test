const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();

// تنظیم ذخیره فایل
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = './uploads/faces';
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// API آپلود و تحلیل
router.post('/analyze', upload.single('faceImage'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No image uploaded' });

  const imageUrl = `/uploads/faces/${req.file.filename}`;

  // تحلیل فرضی: به‌جای مدل واقعی، خروجی ساختگی برای دمو
  const result = {
    age: '25-30',
    gender: 'Male',
    emotion: 'Neutral',
    attractiveness: 'High',
    modelUrl: `/models/generated/${req.file.filename.replace(/\..+$/, '')}.glb`
  };

  return res.json({
    analysis: result,
    imageUrl
  });
});

module.exports = router;
