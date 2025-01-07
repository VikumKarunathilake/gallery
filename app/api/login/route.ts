import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const { username, password } = await request.json();

  // In a real application, you would validate the credentials against a database
  if (username === 'admin' && password === 'password') {
    cookies().set('session', 'authenticated', { httpOnly: true });
    cookies().set('role', 'admin', { httpOnly: true });
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ success: false }, { status: 401 });
  }
}

