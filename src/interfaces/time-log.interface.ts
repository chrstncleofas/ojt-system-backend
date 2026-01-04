export type TimeLogAction = 'IN' | 'OUT' | 'LUNCH IN' | 'LUNCH OUT';

export interface ITimeLog {
  student: string;
  action: TimeLogAction;
  timestamp: Date;
  image?: string;
}
