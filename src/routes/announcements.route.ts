import { Router } from 'express';
import {
  createAnnouncement,
  listAnnouncements,
  deleteAnnouncement,
} from '../controllers/announcement.controller';
import { upload } from '../utils/upload';
import requireAuth from '../middleware/auth.middleware';

const router = Router();

// Public listing
router.get('/', listAnnouncements);

// Protected create/delete
router.post('/', requireAuth, upload.single('image'), createAnnouncement);
router.delete('/:id', requireAuth, deleteAnnouncement);

export default router;
