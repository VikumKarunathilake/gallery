import Image from "next/image";

interface ImageCardProps {
  image: {
    id: number;
    prompt: string;
    image_url: string;
    width: number;
    height: number;
  };
  onClick: () => void;
  onDelete: () => void;
  isAdmin: boolean;
}

export default function ImageCard({
  image,
  onClick,
  onDelete,
  isAdmin,
}: ImageCardProps) {
  return (
    <div
      className="relative group cursor-pointer overflow-hidden rounded-xl bg-gray-100 shadow-md transition-shadow duration-300 hover:shadow-lg"
      onClick={onClick}
    >
      {/* Image Section */}
      <div className="relative">
        <Image
          src={image.image_url}
          alt={image.prompt}
          width={300}
          height={300}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Overlay Section */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <p className="text-white font-medium line-clamp-2 text-sm sm:text-base">
            {image.prompt}
          </p>
        </div>
      </div>

      {/* Delete Button for Admin */}
      {isAdmin && (
        <button
          className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering onClick when deleting
            onDelete();
          }}
          aria-label="Delete image"
        >
          ✕
        </button>
      )}
    </div>
  );
}
