import { Suspense } from 'react';
import GalleryPage from '@/components/GalleryPage';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { cookies } from 'next/headers';
import { getImages } from '@/lib/api';

interface HomeProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
    sort?: string;
  }>;
}

export default async function Home({ searchParams }: HomeProps) {
  // Await the searchParams
  const params = await searchParams;
  const { page = '1', search = '', sort = 'newest' } = params;

  const currentPage = parseInt(page, 10);

  // Await the result from getImages
  const { images, totalPages, currentPage: apiCurrentPage } = await getImages(currentPage, search, sort);

  // Await the cookies
  const cookieStore = await cookies();
  const isLoggedIn = await cookieStore.has('session');
  const isAdmin = (await cookieStore.get('role'))?.value === 'admin';

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isLoggedIn={isLoggedIn} isAdmin={isAdmin} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Image Gallery</h1>
        <Suspense fallback={<div>Loading...</div>}>
          <GalleryPage
            initialImages={images}
            totalPages={totalPages}
            currentPage={apiCurrentPage}
            initialSearch={search}
            initialSort={sort}
            isAdmin={isAdmin}
          />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
