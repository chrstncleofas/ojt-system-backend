import { Response } from 'express';
import SubmittedRequirement from '../models/submitted-requirement.model';
import TableRequirements from '../models/table-requirements.model';
import ApprovedDocument from '../models/approved-document.model';
import NotifForAdmin from '../models/notif-for-admin.model';
import { SUCCESS_CODES, ERROR_CODES } from '../constants';
import { AuthRequest } from '../middleware/auth.middleware';

export const submissionController = {
  // Submit a requirement
  async submitRequirement(req: AuthRequest, res: Response) {
    try {
      const studentId = req.user._id;
      const { nameOfDocs, submitted_file } = req.body;

      // Check if already submitted and not approved
      const existing = await SubmittedRequirement.findOne({
        student: studentId,
        nameOfDocs,
      });

      if (existing) {
        const isApproved = await ApprovedDocument.findOne({
          student: studentId,
          nameOfDocs,
        });

        if (!isApproved) {
          return res.status(400).json({
            code: ERROR_CODES.SUBMISSION.ALREADY_SUBMITTED,
            message: 'This requirement has already been submitted and is pending approval.',
          });
        }
      }

      // Create submission
      const submission = await SubmittedRequirement.create({
        student: studentId,
        nameOfDocs,
        submitted_file,
        submission_date: new Date(),
        due_date: new Date(), // Default to now, can be updated
      });

      // Create notification for admin
      await NotifForAdmin.create({
        student: studentId,
        nameOfStudent: `${req.user.firstname} ${req.user.lastname}`,
        message: `${req.user.firstname} ${req.user.lastname} submitted the document.`,
        document_name: nameOfDocs,
      });

      res.status(201).json({
        code: SUCCESS_CODES.GENERAL.SUCCESS,
        message: 'Requirement submitted successfully',
        data: submission,
      });
    } catch (error) {
      console.error('Submit requirement error:', error);
      res.status(500).json({
        code: ERROR_CODES.GENERAL.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      });
    }
  },

  // Get submitted requirements for student
  async getSubmittedRequirements(req: AuthRequest, res: Response) {
    try {
      const studentId = req.user._id;
      const submissions = await SubmittedRequirement.find({ student: studentId }).sort({
        submission_date: -1,
      });

      res.json({
        code: SUCCESS_CODES.GENERAL.SUCCESS,
        data: submissions,
      });
    } catch (_error) {
      res.status(500).json({
        code: ERROR_CODES.GENERAL.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      });
    }
  },

  // Get available requirements to submit
  async getAvailableRequirements(req: AuthRequest, res: Response) {
    try {
      const studentId = req.user._id;

      // Get all requirements
      const allRequirements = await TableRequirements.find();

      // Get submitted but not approved
      const submitted = await SubmittedRequirement.find({
        student: studentId,
      }).distinct('nameOfDocs');

      // Get approved
      const approved = await ApprovedDocument.find({
        student: studentId,
      }).distinct('nameOfDocs');

      // Filter available
      const available = allRequirements.filter(
        (req) => !submitted.includes(req.nameOfFile) && !approved.includes(req.nameOfFile)
      );

      res.json({
        code: SUCCESS_CODES.GENERAL.SUCCESS,
        data: available,
      });
    } catch (_error) {
      res.status(500).json({
        code: ERROR_CODES.GENERAL.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      });
    }
  },
};
