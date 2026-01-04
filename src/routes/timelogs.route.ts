import { Router } from 'express';
import { timelogController } from '../controllers/timelog.controller';
import { upload } from '../utils/upload';
import requireAuth from '../middleware/auth.middleware';

const router = Router();

// All timelog routes require authentication
router.use(requireAuth);

router.post('/clock', upload.single('image'), timelogController.clockInOut);
router.get('/', timelogController.getTimeLogs);
router.get('/today', timelogController.getTodayLogs);

export default router;
