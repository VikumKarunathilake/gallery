import LoginForm from '@/components/LoginForm';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { cookies } from 'next/headers';

export default async function LoginPage() {
  const cookieStore = await cookies();  // Await the cookie store
  const isLoggedIn = cookieStore.has('session');
  const isAdmin = cookieStore.get('role')?.value === 'admin';

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isLoggedIn={isLoggedIn} isAdmin={isAdmin} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Login</h1>
        <LoginForm />
      </main>
      <Footer />
    </div>
  );
}
