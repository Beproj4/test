import { NextResponse } from 'next/server';

import User from '@/models/User';
import connectDb from '@/lib/mongodb';

export async function GET() {
  await connectDb();

  const user = new User({
    email: 'test@example.com',
    password: 'password123',
    role: 'admin',
  });

  await user.save();

  return NextResponse.json({ message: 'User created', user });
}
