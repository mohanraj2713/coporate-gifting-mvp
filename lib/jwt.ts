import { SignJWT, jwtVerify } from 'jose';
import { NextRequest } from 'next/server';

const SECRET_KEY = new TextEncoder().encode(process.env.NEXTAUTH_SECRET);

export async function signToken(payload: any) {
  const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET);
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 30 * 24 * 60 * 60; // 30 days

  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt(iat)
    .setExpirationTime(exp)
    .sign(secret);
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return payload;
  } catch (error) {
    return null;
  }
}

export async function getSession(req: NextRequest) {
  const token = req.cookies.get('auth_token')?.value;
  
  if (!token) {
    return null;
  }

  const payload = await verifyToken(token);
  
  if (!payload) {
    return null;
  }

  return {
    user: {
      _id: payload.sub,
      email: payload.email,
      name: payload.name,
      role: payload.role,
    },
    expires: payload.exp,
  };
}
