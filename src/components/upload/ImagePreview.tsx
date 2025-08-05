
import { X } from 'lucide-react';

interface ImagePreviewProps {
  preview: string;
  fileName: string;
  index: number;
  removeFile: (index: number) => void;
  isUploading: boolean;
}

export const ImagePreview = ({
  preview,
  fileName,
  index,
  removeFile,
  isUploading,
}: ImagePreviewProps) => {
  return (
    <div className="relative border border-matrix-gray/30 rounded-lg overflow-hidden group">
      <img
        src={preview}
        alt={`Preview ${index + 1}`}
        className="w-full h-48 object-cover"
      />
      <button
        onClick={() => removeFile(index)}
        className="absolute top-2 right-2 p-1 bg-black/70 rounded-full hover:bg-red-900/70 transition-colors"
        disabled={isUploading}
      >
        <X className="h-4 w-4 text-white" />
      </button>
      <div className="absolute bottom-0 left-0 right-0 bg-black/70 py-2 px-3 text-xs text-white truncate">
        {fileName}
      </div>
    </div>
  );
};
