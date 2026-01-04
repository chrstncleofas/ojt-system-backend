import User from '@/models/user.model';
import bcrypt from 'bcrypt';
import { sign } from '../utils/jwt';

export async function registerUser(username: string, email: string, password: string) {
  const existing = await User.findOne({ $or: [{ username }, { email }] });
  if (existing) throw new Error('User already exists');
  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ username, email, password: hashed });
  await user.save();
  const token = sign({
    id: user._id,
    username: user.username,
    email: user.email,
    position: user.position,
  });
  return { user, token };
}

export async function loginUser(usernameOrEmail: string, password: string) {
  const user = await User.findOne({
    $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
  });
  if (!user) throw new Error('Invalid credentials');
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) throw new Error('Invalid credentials');
  const token = sign({
    id: user._id,
    username: user.username,
    email: user.email,
    position: user.position,
  });
  return { user, token };
}
