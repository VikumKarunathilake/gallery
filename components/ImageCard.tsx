import Image from 'next/image';

interface ImageCardProps {
  image: {
    id: number;
    prompt: string;
    image_url: string;
  };
  onClick: () => void;
  onDelete: () => void;
  isAdmin: boolean;
}

export default function ImageCard({ image, onClick, onDelete, isAdmin }: ImageCardProps) {
  return (
    <div className="relative group">
      <div
        className="aspect-square overflow-hidden rounded-lg cursor-pointer transition-transform duration-300 ease-in-out transform group-hover:scale-105"
        onClick={onClick}
      >
        <Image
          src={image.image_url}
          alt={image.prompt}
          width={300}
          height={300}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50">
        <p className="text-white text-center p-2">{image.prompt}</p>
      </div>
      {isAdmin && (
        <button
          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          Delete
        </button>
      )}
    </div>
  );
}

