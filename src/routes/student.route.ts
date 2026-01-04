import { Router } from 'express';
import requireAuth from '../middleware/auth.middleware';
import { studentController } from '../controllers/student.controller';

const router = Router();

// Student registration (public)
router.post('/register', studentController.register);

// Protect student routes
router.use(requireAuth);

// Get student profile
router.get('/profile', studentController.getProfile);

// Update student profile
router.put('/profile', studentController.updateProfile);

// List students (admin/coordinator only)
router.get('/', async (req, res) => {
  // TODO: Add role check
  const students = await require('../models/student.model').default.find().limit(100);
  res.json(students);
});

export default router;
