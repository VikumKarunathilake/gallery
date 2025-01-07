import { Suspense } from 'react';
import Gallery from '@/components/Gallery';
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

  const cookieStore = cookies();
  const isLoggedIn = cookieStore.has('session');
  const isAdmin = cookieStore.get('role')?.value === 'admin';

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isLoggedIn={isLoggedIn} isAdmin={isAdmin} onLogout={() => {}} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Image Gallery</h1>
        <div className="mb-4 flex justify-between items-center">
          <form className="flex items-center">
            <input
              type="text"
              name="search"
              placeholder="Search by prompt"
              className="px-3 py-2 border rounded-l"
              defaultValue={search}
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-r">
              Search
            </button>
          </form>
          <select
            name="sort"
            onChange={(e) => {
              const url = new URL(window.location.href);
              url.searchParams.set('sort', e.target.value);
              window.location.href = url.toString();
            }}
            defaultValue={sort}
            className="px-3 py-2 border rounded"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="prompt_asc">Prompt A-Z</option>
            <option value="prompt_desc">Prompt Z-A</option>
          </select>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <Gallery images={images} onDelete={() => {}} isAdmin={isAdmin} />
        </Suspense>
        <div className="mt-8 flex justify-center">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <a
              key={pageNum}
              href={`/?page=${pageNum}&search=${search}&sort=${sort}`}
              className={`mx-1 px-3 py-2 rounded ${
                pageNum === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            >
              {pageNum}
            </a>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

