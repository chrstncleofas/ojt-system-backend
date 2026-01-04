export const AUTH_ERROR_MESSAGES = {
  TOKEN_MISSING: 'Authentication token is missing',
  JWT_EXPIRED: 'Your session has expired. Please login again',
  INVALID_SIGNATURE: 'Invalid authentication signature',
  INVALID_TOKEN: 'Invalid authentication token',
  UNAUTHORIZED: 'Unauthorized access',
  ACCOUNT_BLOCKED: 'Your account has been blocked. Please contact administrator',
  ACCOUNT_DELETED: 'Your account has been deleted. Please contact administrator',
  ACCOUNT_INACTIVE: 'Your account is inactive. Please contact administrator',
  USER_NOT_FOUND: 'User not found',
  USER_NOT_AUTHENTICATED: 'User is not authenticated',
  INVALID_CREDENTIALS: 'Invalid email or password',
} as const;

export const USER_ERROR_MESSAGES = {
  NOT_FOUND: 'User not found',
  BLOCKED: 'User account is blocked',
  DELETED: 'User account is deleted',
  INACTIVE: 'User account is inactive',
  EMAIL_EXISTS: 'Email already exists',
  USERNAME_EXISTS: 'Username already exists',
  INVALID_ROLE: 'Invalid user role',
  CREATION_FAILED: 'Failed to create user',
  UPDATE_FAILED: 'Failed to update user',
  DELETE_FAILED: 'Failed to delete user',
  CANNOT_DELETE_SELF: 'You cannot delete your own account',
  CANNOT_UPDATE_SELF_ROLE: 'You cannot change your own role',
  PASSWORD_CHANGE_FAILED: 'Failed to change password',
  PASSWORD_INCORRECT: 'Current password is incorrect',
} as const;

export const STUDENT_ERROR_MESSAGES = {
  NOT_FOUND: 'Student not found',
  STUDENT_ID_EXISTS: 'Student ID already exists',
  EMAIL_EXISTS: 'Email already exists',
  USERNAME_EXISTS: 'Username already exists',
  CREATION_FAILED: 'Failed to create student',
  UPDATE_FAILED: 'Failed to update student',
  DELETE_FAILED: 'Failed to delete student',
  FETCH_FAILED: 'Failed to fetch students',
  UNKNOWN_ERROR: 'An unknown error occurred',
  ARCHIVED: 'Student is archived',
  PENDING_APPLICATION: 'Student application is pending',
  REJECTED_APPLICATION: 'Student application has been rejected',
} as const;

export const ANNOUNCEMENT_ERROR_MESSAGES = {
  NOT_FOUND: 'Announcement not found',
  CREATION_FAILED: 'Failed to create announcement',
  UPDATE_FAILED: 'Failed to update announcement',
  DELETE_FAILED: 'Failed to delete announcement',
  FETCH_FAILED: 'Failed to fetch announcements',
  UNKNOWN_ERROR: 'An unknown error occurred',
  INVALID_DATES: 'End date must be after start date',
} as const;

export const TIMELOG_ERROR_MESSAGES = {
  NOT_FOUND: 'Time log not found',
  CREATION_FAILED: 'Failed to create time log',
  UPDATE_FAILED: 'Failed to update time log',
  DELETE_FAILED: 'Failed to delete time log',
  FETCH_FAILED: 'Failed to fetch time logs',
  UNKNOWN_ERROR: 'An unknown error occurred',
  ALREADY_CLOCKED_IN: 'You are already clocked in',
  NOT_CLOCKED_IN: 'You must clock in first',
  INVALID_ACTION: 'Invalid time log action',
  STUDENT_REQUIRED: 'Student is required for time log',
} as const;

export const SUBMISSION_ERROR_MESSAGES = {
  NOT_FOUND: 'Submission not found',
  CREATION_FAILED: 'Failed to create submission',
  UPDATE_FAILED: 'Failed to update submission',
  DELETE_FAILED: 'Failed to delete submission',
  FETCH_FAILED: 'Failed to fetch submissions',
  UNKNOWN_ERROR: 'An unknown error occurred',
  FILE_REQUIRED: 'File is required for submission',
  FILE_TOO_LARGE: 'File size exceeds maximum limit',
  INVALID_FILE_TYPE: 'Invalid file type',
  ALREADY_SUBMITTED: 'Requirement already submitted',
  PAST_DUE_DATE: 'Submission deadline has passed',
} as const;

export const REQUIREMENT_ERROR_MESSAGES = {
  NOT_FOUND: 'Requirement not found',
  CREATION_FAILED: 'Failed to create requirement',
  UPDATE_FAILED: 'Failed to update requirement',
  DELETE_FAILED: 'Failed to delete requirement',
  FETCH_FAILED: 'Failed to fetch requirements',
  UNKNOWN_ERROR: 'An unknown error occurred',
} as const;

export const GRADE_ERROR_MESSAGES = {
  NOT_FOUND: 'Grade not found',
  CREATION_FAILED: 'Failed to create grade',
  UPDATE_FAILED: 'Failed to update grade',
  DELETE_FAILED: 'Failed to delete grade',
  FETCH_FAILED: 'Failed to fetch grades',
  UNKNOWN_ERROR: 'An unknown error occurred',
  INVALID_SCORE: 'Invalid grade score',
  STUDENT_REQUIRED: 'Student is required for grade',
} as const;

export const NOTIFICATION_ERROR_MESSAGES = {
  NOT_FOUND: 'Notification not found',
  CREATION_FAILED: 'Failed to create notification',
  UPDATE_FAILED: 'Failed to update notification',
  DELETE_FAILED: 'Failed to delete notification',
  FETCH_FAILED: 'Failed to fetch notifications',
  MARK_READ_FAILED: 'Failed to mark notification as read',
  UNKNOWN_ERROR: 'An unknown error occurred',
} as const;

export const SCHEDULE_ERROR_MESSAGES = {
  NOT_FOUND: 'Schedule not found',
  CREATION_FAILED: 'Failed to create schedule',
  UPDATE_FAILED: 'Failed to update schedule',
  DELETE_FAILED: 'Failed to delete schedule',
  FETCH_FAILED: 'Failed to fetch schedules',
  CONFLICT: 'Schedule conflict detected',
  INVALID_TIME: 'Invalid time range',
  UNKNOWN_ERROR: 'An unknown error occurred',
} as const;

export const CONTENT_ERROR_MESSAGES = {
  NOT_FOUND: 'Content not found',
  CREATION_FAILED: 'Failed to create content',
  UPDATE_FAILED: 'Failed to update content',
  DELETE_FAILED: 'Failed to delete content',
  FETCH_FAILED: 'Failed to fetch content',
  UNKNOWN_ERROR: 'An unknown error occurred',
} as const;

export const GENERAL_ERROR_MESSAGES = {
  UNKNOWN_ERROR: 'An unknown error occurred',
  VALIDATION_ERROR: 'Validation error',
  BAD_REQUEST: 'Bad request',
  DATABASE_ERROR: 'Database error',
  FILE_UPLOAD_FAILED: 'File upload failed',
  MISSING_REQUIRED_FIELDS: 'Missing required fields',
} as const;
