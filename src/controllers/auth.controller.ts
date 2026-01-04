import { Request, Response } from 'express';
import * as AuthService from '@/services/auth.service';

export async function register(req: Request, res: Response) {
  try {
    const { username, email, password } = req.body;
    const result = await AuthService.registerUser(username, email, password);
    res
      .status(201)
      .json({
        user: {
          id: result.user._id,
          username: result.user.username,
          email: result.user.email,
          position: result.user.position,
        },
        token: result.token,
      });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { usernameOrEmail, password } = req.body;
    const result = await AuthService.loginUser(usernameOrEmail, password);
    res.json({
      user: {
        id: result.user._id,
        username: result.user.username,
        email: result.user.email,
        position: result.user.position,
      },
      token: result.token,
    });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}
