import Student from '../models/student.model';
import PendingApplication from '../models/pending-application.model';
import ApprovedDocument from '../models/approved-document.model';
import Schedule from '../models/schedule.model';
import RenderingHoursTable from '../models/rendering-hours-table.model';
import TimeLog from '../models/time-log.model';

export const studentService = {
  // Get required hours for a course
  async getRequiredHours(course: string): Promise<number | null> {
    try {
      const requirement = await RenderingHoursTable.findOne({ course });
      return requirement ? requirement.required_hours : null;
    } catch (error) {
      console.error('Error getting required hours:', error);
      return null;
    }
  },

  // Check if student has approved documents
  async hasApprovedDocuments(studentId: string): Promise<boolean> {
    try {
      const count = await ApprovedDocument.countDocuments({ student: studentId });
      return count > 0;
    } catch (error) {
      console.error('Error checking approved documents:', error);
      return false;
    }
  },

  // Check if student has schedule for today
  async hasScheduleForToday(studentId: string): Promise<boolean> {
    try {
      const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
      const count = await Schedule.countDocuments({
        student: studentId,
        day: today as any,
      });
      return count > 0;
    } catch (error) {
      console.error('Error checking schedule:', error);
      return false;
    }
  },

  // Calculate total work hours for student
  async calculateTotalWorkHours(studentId: string): Promise<number> {
    try {
      const timeLogs = await TimeLog.find({ student: studentId });

      let totalSeconds = 0;
      const inLogs = timeLogs
        .filter((log) => log.action === 'IN')
        .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
      const outLogs = timeLogs
        .filter((log) => log.action === 'OUT')
        .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
      const lunchOutLogs = timeLogs
        .filter((log) => log.action === 'LUNCH OUT')
        .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
      const lunchInLogs = timeLogs
        .filter((log) => log.action === 'LUNCH IN')
        .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

      // Morning work: IN to LUNCH OUT
      if (inLogs.length > 0 && lunchOutLogs.length > 0) {
        const firstIn = inLogs[0];
        const firstLunchOut = lunchOutLogs[0];
        if (firstLunchOut.timestamp > firstIn.timestamp) {
          totalSeconds += (firstLunchOut.timestamp.getTime() - firstIn.timestamp.getTime()) / 1000;
        }
      }

      // Afternoon work: LUNCH IN to OUT
      if (lunchInLogs.length > 0 && outLogs.length > 0) {
        const firstLunchIn = lunchInLogs[0];
        const firstOut = outLogs[0];
        if (firstOut.timestamp > firstLunchIn.timestamp) {
          totalSeconds += (firstOut.timestamp.getTime() - firstLunchIn.timestamp.getTime()) / 1000;
        }
      }

      return totalSeconds;
    } catch (error) {
      console.error('Error calculating work hours:', error);
      return 0;
    }
  },

  // Get student by ID
  async getStudentById(studentId: string) {
    return await Student.findById(studentId);
  },

  // Get pending applications
  async getPendingApplications() {
    return await PendingApplication.find().sort({ createdAt: -1 });
  },

  // Approve pending application
  async approveApplication(pendingId: string) {
    const pending = await PendingApplication.findById(pendingId);
    if (!pending) throw new Error('Pending application not found');

    // Create student
    const student = await Student.create({
      studentId: pending.pendingStudentId,
      firstname: pending.pendingFirstname,
      middlename: pending.pendingMiddlename,
      lastname: pending.pendingLastname,
      prefix: pending.pendingPrefix,
      email: pending.pendingEmail,
      address: pending.pendingAddress,
      number: pending.pendingNumber,
      course: pending.pendingCourse,
      year: pending.pendingYear,
      username: pending.pendingUsername,
      password: pending.pendingPassword,
      nameOfSupervisor: pending.nameOfSupervisor,
      hteAddress: pending.hteAddress,
      contactNumber: pending.contactNumber,
      department: pending.department,
    });

    // Remove pending application
    await PendingApplication.findByIdAndDelete(pendingId);

    return student;
  },

  // Reject pending application
  async rejectApplication(pendingId: string) {
    return await PendingApplication.findByIdAndDelete(pendingId);
  },
};
