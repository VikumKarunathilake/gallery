import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const { username, password } = await request.json();

  // In a real application, you would validate the credentials against a database
  if (username === 'admin' && password === 'password') {
    const cookieStore = await cookies();  // Await the cookie store
    cookieStore.set('session', 'authenticated', { httpOnly: true });
    cookieStore.set('role', 'admin', { httpOnly: true });
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ success: false }, { status: 401 });
  }
}
