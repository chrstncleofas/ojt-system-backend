import { Response } from 'express';
import TimeLog from '../models/time-log.model';
import { studentService } from '../services/student.service';
import { TimeLogAction } from '../interfaces/time-log.interface';
import { SUCCESS_CODES, ERROR_CODES } from '../constants';
import { AuthRequest } from '../middleware/auth.middleware';

export const timelogController = {
  // Clock in/out
  async clockInOut(req: AuthRequest, res: Response) {
    try {
      const studentId = req.user._id;
      const { action, image }: { action: TimeLogAction; image?: string } = req.body;

      // Validate action
      const validActions: TimeLogAction[] = ['IN', 'OUT', 'LUNCH IN', 'LUNCH OUT'];
      if (!validActions.includes(action)) {
        return res.status(400).json({
          code: ERROR_CODES.GENERAL.INVALID_ACTION,
          message: 'Invalid action',
        });
      }

      // Check prerequisites
      const hasApprovedDocs = await studentService.hasApprovedDocuments(studentId);
      const hasSchedule = await studentService.hasScheduleForToday(studentId);

      if (!hasApprovedDocs || !hasSchedule) {
        return res.status(403).json({
          code: ERROR_CODES.GENERAL.PRECONDITIONS_NOT_MET,
          message: 'Please wait for admin approval of documents and schedule setup.',
        });
      }

      // Check time difference (simplified - in production use client timestamp validation)
      // For now, just create the log

      const timeLog = await TimeLog.create({
        student: studentId,
        action,
        image,
        timestamp: new Date(),
      });

      res.json({
        code: SUCCESS_CODES.GENERAL.SUCCESS,
        message: `Clock ${action.toLowerCase()} recorded successfully`,
        data: timeLog,
      });
    } catch (error) {
      console.error('Clock in/out error:', error);
      res.status(500).json({
        code: ERROR_CODES.GENERAL.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      });
    }
  },

  // Get time logs for student
  async getTimeLogs(req: AuthRequest, res: Response) {
    try {
      const studentId = req.user._id;
      const { from, to } = req.query;

      let filter: any = { student: studentId };

      if (from && to) {
        filter.timestamp = {
          $gte: new Date(from as string),
          $lte: new Date(to as string),
        };
      }

      const timeLogs = await TimeLog.find(filter).sort({ timestamp: -1 });

      // Calculate total hours
      const totalSeconds = await studentService.calculateTotalWorkHours(studentId);
      const requiredHours = (await studentService.getRequiredHours(req.user.course)) || 0;
      const remainingSeconds = Math.max(0, requiredHours * 3600 - totalSeconds);

      res.json({
        code: SUCCESS_CODES.GENERAL.SUCCESS,
        data: {
          logs: timeLogs,
          totalHours: Math.floor(totalSeconds / 3600),
          totalMinutes: Math.floor((totalSeconds % 3600) / 60),
          requiredHours,
          remainingHours: Math.floor(remainingSeconds / 3600),
          remainingMinutes: Math.floor((remainingSeconds % 3600) / 60),
        },
      });
    } catch (_error) {
      res.status(500).json({
        code: ERROR_CODES.GENERAL.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      });
    }
  },

  // Get today's time logs
  async getTodayLogs(req: AuthRequest, res: Response) {
    try {
      const studentId = req.user._id;
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const timeLogs = await TimeLog.find({
        student: studentId,
        timestamp: { $gte: today, $lt: tomorrow },
      }).sort({ timestamp: 1 });

      res.json({
        code: SUCCESS_CODES.GENERAL.SUCCESS,
        data: timeLogs,
      });
    } catch (_error) {
      res.status(500).json({
        code: ERROR_CODES.GENERAL.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      });
    }
  },
};
