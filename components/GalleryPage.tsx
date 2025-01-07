'use client';

import { useState } from 'react';
import Gallery from './Gallery';
import { useRouter } from 'next/navigation';

interface Image {
  id: number;
  prompt: string;
  width: number;
  height: number;
  steps: number;
  n: number;
  image_url: string;
  created_at: string;
}

interface GalleryPageProps {
  initialImages: Image[];
  totalPages: number;
  currentPage: number;
  search: string;
  sort: string;
  isAdmin: boolean;
}

export default function GalleryPage({
  initialImages,
  totalPages,
  currentPage,
  search,
  sort,
  isAdmin,
}: GalleryPageProps) {
  const [images, setImages] = useState(initialImages);
  const router = useRouter();

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/images?id=${id}`, { method: 'DELETE' });
      if (response.ok) {
        setImages(images.filter(image => image.id !== id));
      } else {
        console.error('Failed to delete image');
      }
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSort = e.target.value;
    router.push(`/?page=${currentPage}&search=${search}&sort=${newSort}`);
  };

  return (
    <>
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
          onChange={handleSortChange}
          defaultValue={sort}
          className="px-3 py-2 border rounded"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="prompt_asc">Prompt A-Z</option>
          <option value="prompt_desc">Prompt Z-A</option>
        </select>
      </div>
      <Gallery images={images} onDelete={handleDelete} isAdmin={isAdmin} />
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
    </>
  );
}

