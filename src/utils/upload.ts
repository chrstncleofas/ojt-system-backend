import multer from 'multer';
import path from 'path';
import fs from 'fs';

const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

const storage = multer.diskStorage({
  destination: function (_, __, cb) {
    cb(null, uploadsDir);
  },
  filename: function (_, file, cb) {
    const name = `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`;
    cb(null, name);
  },
});

export const upload = multer({ storage });
