import { Router } from 'express';
import { submissionController } from '../controllers/submission.controller';
import { upload } from '../utils/upload';
import requireAuth from '../middleware/auth.middleware';

const router = Router();

// All submission routes require authentication
router.use(requireAuth);

router.post('/', upload.single('submitted_file'), submissionController.submitRequirement);
router.get('/', submissionController.getSubmittedRequirements);
router.get('/available', submissionController.getAvailableRequirements);

export default router;
