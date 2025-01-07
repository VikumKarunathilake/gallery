'use client';

import ImageCard from './ImageCard';
import { useState } from 'react';
import ImageModal from './ImageModal';

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

interface GalleryProps {
  images: Image[];
  onDelete: (id: number) => void;
  isAdmin: boolean;
}

export default function Gallery({ images, onDelete, isAdmin }: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {images.map((image) => (
        <ImageCard
          key={image.id}
          image={image}
          onClick={() => setSelectedImage(image)}
          onDelete={() => onDelete(image.id)}
          isAdmin={isAdmin}
        />
      ))}
      {selectedImage && (
        <ImageModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
}

