import authRoutes from './auth.route';
import studentRoutes from './student.route';
import announcementRoutes from './announcements.route';
import timelogRoutes from './timelogs.route';
import submissionRoutes from './submissions.route';

const routes = [
  { path: '/api/auth', router: authRoutes },
  { path: '/api/students', router: studentRoutes },
  { path: '/api/announcements', router: announcementRoutes },
  { path: '/api/timelogs', router: timelogRoutes },
  { path: '/api/submissions', router: submissionRoutes },
];

export default routes;
