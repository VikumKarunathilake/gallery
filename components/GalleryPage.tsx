'use client';

import { useState, useEffect } from 'react';
import Gallery from './Gallery';
import { useRouter } from 'next/navigation';
import SearchSort from '@/components/SearchSort';

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
  initialSearch: string;
  initialSort: string;
  isAdmin: boolean;
}

export default function GalleryPage({
  initialImages,
  totalPages,
  currentPage,
  initialSearch,
  initialSort,
  isAdmin,
}: GalleryPageProps) {
  const [images, setImages] = useState(initialImages);
  const [search, setSearch] = useState(initialSearch);
  const [sort, setSort] = useState(initialSort);
  const [page, setPage] = useState(currentPage);
  const router = useRouter();

  useEffect(() => {
    const fetchImages = async () => {
      const res = await fetch(`/api/images?page=${page}&search=${search}&sort=${sort}`);
      const data = await res.json();
      setImages(data.images);
    };

    fetchImages();
  }, [page, search, sort]);

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

  const handleSearchChange = (newSearch: string) => {
    setSearch(newSearch);
    setPage(1);
    router.push(`/?page=1&search=${newSearch}&sort=${sort}`);
  };

  const handleSortChange = (newSort: string) => {
    setSort(newSort);
    router.push(`/?page=${page}&search=${search}&sort=${newSort}`);
  };

  return (
    <>
      <SearchSort
        search={search}
        sort={sort}
        onSearchChange={handleSearchChange}
        onSortChange={handleSortChange}
      />
      <Gallery images={images} onDelete={handleDelete} isAdmin={isAdmin} />
      <div className="mt-8 flex justify-center">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => {
              setPage(pageNum);
              router.push(`/?page=${pageNum}&search=${search}&sort=${sort}`);
            }}
            className={`mx-1 px-3 py-2 rounded ${
              pageNum === page ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            {pageNum}
          </button>
        ))}
      </div>
    </>
  );
}

