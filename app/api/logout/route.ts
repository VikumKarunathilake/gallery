import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  const cookieStore = await cookies();  // Await the cookie store
  cookieStore.delete('session');
  cookieStore.delete('role');
  return NextResponse.redirect(new URL('/', request.url));
}
