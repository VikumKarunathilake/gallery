import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const { username, password } = await request.json();

  const cookieStore = await cookies();

  if (username === 'admin' && password === 'password') {
    cookieStore.set('session', 'authenticated', { httpOnly: true });
    cookieStore.set('role', 'admin', { httpOnly: true });
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ success: false }, { status: 401 });
  }
}
