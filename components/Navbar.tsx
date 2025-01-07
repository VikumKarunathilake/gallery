import Link from 'next/link';

interface NavbarProps {
  isLoggedIn: boolean;
  isAdmin: boolean;
  onLogout: () => void;
}

export default function Navbar({ isLoggedIn, isAdmin, onLogout }: NavbarProps) {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Image Gallery
        </Link>
        <div>
          {isLoggedIn ? (
            <>
              {isAdmin && <span className="mr-4">Admin</span>}
              <button onClick={onLogout} className="bg-red-500 text-white px-4 py-2 rounded">
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" className="bg-blue-500 text-white px-4 py-2 rounded">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

