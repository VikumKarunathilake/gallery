import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = await cookies();  // Await the cookie store
  cookieStore.delete('session');
  cookieStore.delete('role');
}
