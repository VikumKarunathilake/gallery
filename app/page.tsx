import { Suspense } from 'react';
import GalleryPage from '@/components/GalleryPage';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { cookies } from 'next/headers';
import pool from '@/lib/db';

async function getImages(page: number, search: string, sort: string) {
  const limit = 12;
  const offset = (page - 1) * limit;

  let orderBy = 'created_at DESC';
  if (sort === 'oldest') orderBy = 'created_at ASC';
  else if (sort === 'prompt_asc') orderBy = 'prompt ASC';
  else if (sort === 'prompt_desc') orderBy = 'prompt DESC';

  const query = `
    SELECT * FROM generated_images
    WHERE prompt ILIKE $1
    ORDER BY ${orderBy}
    LIMIT $2 OFFSET $3
  `;

  const countQuery = `
    SELECT COUNT(*) FROM generated_images
    WHERE prompt ILIKE $1
  `;

  const [images, countResult] = await Promise.all([
    pool.query(query, [`%${search}%`, limit, offset]),
    pool.query(countQuery, [`%${search}%`]),
  ]);

  const totalImages = parseInt(countResult.rows[0].count);
  const totalPages = Math.ceil(totalImages / limit);

  return {
    images: images.rows,
    totalPages,
    currentPage: page,
  };
}

export default async function Home({
  searchParams,
}: {
  searchParams: { page?: string; search?: string; sort?: string };
}) {
  const page = parseInt(searchParams.page || '1');
  const search = searchParams.search || '';
  const sort = searchParams.sort || 'newest';

  const { images, totalPages, currentPage } = await getImages(page, search, sort);

  const cookieStore = await cookies(); // Await the cookies here
  const isLoggedIn = cookieStore.has('session');
  const isAdmin = cookieStore.get('role')?.value === 'admin';

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isLoggedIn={isLoggedIn} isAdmin={isAdmin} onLogout={() => {}} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Image Gallery</h1>
        <Suspense fallback={<div>Loading...</div>}>
          <GalleryPage
            initialImages={images}
            totalPages={totalPages}
            currentPage={currentPage}
            search={search}
            sort={sort}
            isAdmin={isAdmin}
          />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

