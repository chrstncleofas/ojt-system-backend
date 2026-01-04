import TimeLog from '@/models/time-log.model';

export async function createTimeLog(data: any) {
  const tl = new TimeLog(data);
  return tl.save();
}

export async function listTimeLogs(limit = 200) {
  return TimeLog.find().sort({ timestamp: -1 }).limit(limit).populate('student');
}
