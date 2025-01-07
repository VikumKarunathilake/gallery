import Link from 'next/link';
import { Images, LogOut } from 'lucide-react';

interface NavbarProps {
  isLoggedIn: boolean;
  isAdmin: boolean;
}

export default function Navbar({ isLoggedIn, isAdmin }: NavbarProps) {
  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">

          <Link href="/" className="flex items-center space-x-3">
            <Images className="h-8 w-8 text-indigo-600" />
            <h1 className="text-2xl font-semibold text-gray-900">Gallery</h1>
          </Link>

          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <>
                {isAdmin && (
                  <span className="text-red-600">
                    Admin
                  </span>
                )}
                <Link
                  href="/api/logout"
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </Link>
              </>
            ) : (
              <Link
                href="/login"
                className="text-indigo-600 hover:text-indigo-900 font-medium"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
