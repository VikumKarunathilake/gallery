import Image from "next/image";

interface ImageModalProps {
  image: {
    prompt: string;
    width: number;
    height: number;
    steps: number;
    n: number;
    image_url: string;
    created_at: string;
  };
  onClose: () => void;
}

export default function ImageModal({ image, onClose }: ImageModalProps) {
  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-lg flex items-center justify-center z-50"
      onClick={onClose}
      role="dialog"
      aria-labelledby="image-modal-title"
    >
      <div
        className="bg-white p-6 rounded-xl max-w-3xl w-full shadow-2xl relative transition-transform transform scale-100 sm:scale-95"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 text-gray-800 p-3 rounded-full focus:outline-none shadow-md transition"
          aria-label="Close modal"
        >
          ✕
        </button>

        <div className="flex justify-center mb-4">
          <Image
            src={image.image_url}
            alt={image.prompt}
            className="rounded-lg object-contain border border-gray-200 shadow-md"
            width={image.width}
            height={image.height}
            loading="lazy"
            onError={(e) => (e.currentTarget.src = "/fallback-image.png")}
            style={{
              maxWidth: "100%",
              maxHeight: "65vh",
            }}
          />
        </div>

        <h2 id="image-modal-title" className="text-xl font-semibold text-gray-800 mb-4 text-center">
          Image Details
        </h2>

        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-700">
          <div className="col-span-2">
            <strong className="text-gray-800">Prompt:</strong>
            <div className="mt-1 max-h-20 overflow-y-auto p-2 bg-gray-100 border border-gray-200 rounded-md text-sm text-gray-700">
              {image.prompt}
            </div>
          </div>
          <p>
            <strong>Dimensions:</strong> {image.width} × {image.height}
          </p>
          <p>
            <strong>Steps:</strong> {image.steps}
          </p>
          <p>
            <strong>Images:</strong> {image.n}
          </p>
          <p>
            <strong>Created:</strong> {new Date(image.created_at).toLocaleString()}
          </p>
        </div>

        {/* Footer Section */}
        <div className="mt-6 flex justify-center">
        </div>
      </div>
    </div>
  );
}
