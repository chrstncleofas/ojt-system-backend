import jwt, { SignOptions } from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'change_me';

export function sign(payload: object, expiresIn: string | number = '1h') {
  const options: SignOptions = { expiresIn: expiresIn as any };
  return jwt.sign(payload, SECRET as string, options);
}

export function verify(token: string) {
  try {
    return jwt.verify(token, SECRET);
  } catch (_err) {
    return null;
  }
}
