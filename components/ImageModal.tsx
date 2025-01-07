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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white p-4 rounded-lg max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
        <Image src={image.image_url} alt={image.prompt} className="w-full h-auto mb-4 rounded-lg" />
        <h2 className="text-xl font-bold mb-2">Image Details</h2>
        <p><strong>Prompt:</strong> {image.prompt}</p>
        <p><strong>Dimensions:</strong> {image.width}x{image.height}</p>
        <p><strong>Steps:</strong> {image.steps}</p>
        <p><strong>Number of Images:</strong> {image.n}</p>
        <p><strong>Created At:</strong> {new Date(image.created_at).toLocaleString()}</p>
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

