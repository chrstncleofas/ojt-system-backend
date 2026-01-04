import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { SUCCESS_CODES, ErrorCodes } from '../constants';
import { AuthRequest } from '../middleware/auth.middleware';
import PendingApplication from '../models/pending-application.model';
import { IPendingApplication } from '../interfaces/pending-application.interface';

export const studentController = {
  // Student registration - creates pending application
  async register(req: Request, res: Response) {
    try {
      // Log incoming registration (mask password) to aid debugging
      const loggedBody = {
        ...req.body,
        pendingPassword: req.body?.pendingPassword ? '***' : undefined,
      };
      console.info('Registration request body:', loggedBody);

      const {
        pendingStudentId,
        pendingFirstname,
        pendingMiddlename,
        pendingLastname,
        pendingPrefix,
        pendingEmail,
        pendingAddress,
        pendingNumber,
        pendingCourse,
        pendingYear,
        pendingUsername,
        pendingPassword,
        nameOfSupervisor,
        hteAddress,
        contactNumber,
        department,
      }: IPendingApplication = req.body;

      // Basic required-field validation with helpful 400 message
      const missing: string[] = [];
      if (!pendingStudentId) missing.push('pendingStudentId');
      if (!pendingFirstname) missing.push('pendingFirstname');
      if (!pendingLastname) missing.push('pendingLastname');
      if (!pendingEmail) missing.push('pendingEmail');
      if (!pendingAddress) missing.push('pendingAddress');
      if (!pendingNumber) missing.push('pendingNumber');
      if (!pendingCourse) missing.push('pendingCourse');
      if (!pendingUsername) missing.push('pendingUsername');
      if (!pendingPassword) missing.push('pendingPassword');

      if (missing.length > 0) {
        return res.status(400).json({
          code: ErrorCodes.GENERAL.BAD_REQUEST,
          message: 'Missing required fields',
          missing,
        });
      }

      // Check for existing email or username
      const existingEmail = await PendingApplication.findOne({ pendingEmail });
      if (existingEmail) {
        return res.status(400).json({
          code: ErrorCodes.GENERAL.EMAIL_ALREADY_EXISTS,
          message: 'Email already exists',
        });
      }

      const existingUsername = await PendingApplication.findOne({ pendingUsername });
      if (existingUsername) {
        return res.status(400).json({
          code: ErrorCodes.GENERAL.USERNAME_ALREADY_EXISTS,
          message: 'Username already exists',
        });
      }

      const existingStudentId = await PendingApplication.findOne({ pendingStudentId });
      if (existingStudentId) {
        return res.status(400).json({
          code: ErrorCodes.GENERAL.STUDENT_ID_ALREADY_EXISTS,
          message: 'Student ID already exists',
        });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(pendingPassword, 10);

      // Create pending application
      const pendingApplication = await PendingApplication.create({
        pendingStudentId,
        pendingFirstname,
        pendingMiddlename,
        pendingLastname,
        pendingPrefix,
        pendingEmail,
        pendingAddress,
        pendingNumber,
        pendingCourse,
        pendingYear,
        pendingUsername,
        pendingPassword: hashedPassword,
        nameOfSupervisor,
        hteAddress,
        contactNumber,
        department,
      });

      res.status(201).json({
        code: SUCCESS_CODES.AUTH.REGISTRATION_PENDING,
        message: 'Registration submitted successfully. Please wait for admin approval.',
        data: pendingApplication,
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({
        code: ErrorCodes.GENERAL.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      });
    }
  },

  // Get student profile
  async getProfile(req: AuthRequest, res: Response) {
    try {
      const student = req.user; // From auth middleware
      res.json({
        code: SUCCESS_CODES.GENERAL.SUCCESS,
        data: student,
      });
    } catch (_error) {
      res.status(500).json({
        code: ErrorCodes.GENERAL.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      });
    }
  },

  // Update student profile
  async updateProfile(req: AuthRequest, res: Response) {
    try {
      const studentId = req.user._id;
      const updates = req.body;

      // Remove sensitive fields
      delete updates.password;
      delete updates.username;
      delete updates.email;

      const updatedStudent = await PendingApplication.findByIdAndUpdate(studentId, updates, {
        new: true,
      });

      if (!updatedStudent) {
        return res.status(404).json({
          code: ErrorCodes.STUDENT.NOT_FOUND,
          message: 'Student not found',
        });
      }

      res.json({
        code: SUCCESS_CODES.GENERAL.SUCCESS,
        message: 'Profile updated successfully',
        data: updatedStudent,
      });
    } catch (_error) {
      res.status(500).json({
        code: ErrorCodes.GENERAL.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      });
    }
  },
};
