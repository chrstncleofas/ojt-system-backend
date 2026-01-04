export const STUDENT_STATUS = {
  ACTIVE: 'Active',
  INACTIVE: 'Inactive',
  PENDING: 'Pending',
  REJECTED: 'Rejected',
  GRADUATED: 'Graduated',
  SUSPENDED: 'Suspended',
} as const;

export const ARCHIVED_STATUS = {
  NOT_ARCHIVED: 'NotArchive',
  ARCHIVED: 'Archive',
} as const;

export const ANNOUNCEMENT_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DRAFT: 'draft',
  EXPIRED: 'expired',
} as const;

export const TIMELOG_ACTION = {
  TIME_IN: 'IN',
  TIME_OUT: 'OUT',
  LUNCH_IN: 'LUNCH IN',
  LUNCH_OUT: 'LUNCH OUT',
} as const;

export const SUBMISSION_STATUS = {
  PENDING: 'Pending',
  APPROVED: 'Approved',
  REJECTED: 'Rejected',
  REVISION_NEEDED: 'Revision Needed',
} as const;

export const GRADE_STATUS = {
  NO_REMARKS: 'No Remarks',
  PASSED: 'Passed',
  FAILED: 'Failed',
  INCOMPLETE: 'Incomplete',
} as const;

export const COURSE_CHOICES = {
  BSIT: 'BS Information Technology',
  BSCS: 'BS Computer Science',
} as const;

export const DAYS_OF_WEEK = {
  MONDAY: 'Monday',
  TUESDAY: 'Tuesday',
  WEDNESDAY: 'Wednesday',
  THURSDAY: 'Thursday',
  FRIDAY: 'Friday',
  SATURDAY: 'Saturday',
  SUNDAY: 'Sunday',
} as const;

export const USER_POSITION = {
  COORDINATOR: 'Coordinator',
  ADMIN: 'Admin',
  SUPERVISOR: 'Supervisor',
} as const;
