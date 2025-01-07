import LoginForm from '@/components/LoginForm';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isLoggedIn={false} isAdmin={false} onLogout={() => {}} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Login</h1>
        <LoginForm />
      </main>
      <Footer />
    </div>
  );
}

