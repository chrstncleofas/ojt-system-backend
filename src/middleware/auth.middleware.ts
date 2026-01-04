import { verify } from '@/utils/jwt';
import { Request, Response, NextFunction } from 'express';

export interface AuthRequest extends Request {
  user?: any;
}

export function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader =
    (req.headers.authorization as string) || (req.headers['x-access-token'] as string);
  if (!authHeader) return res.status(401).json({ message: 'Authentication token missing' });

  const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;
  const payload = verify(token);
  if (!payload) return res.status(401).json({ message: 'Invalid or expired token' });

  req.user = payload;
  next();
}

export default requireAuth;
