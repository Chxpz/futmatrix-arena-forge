
import { Button } from '@/components/ui/button';
import { Image, UploadCloud } from 'lucide-react';

interface UploadAreaProps {
  maxUploads: number;
  planType: string;
  handleFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isUploading: boolean;
  filesLength: number;
}

export const UploadArea = ({
  maxUploads,
  planType,
  handleFileSelect,
  isUploading,
  filesLength,
}: UploadAreaProps) => {
  return (
    <div className="border-2 border-dashed border-matrix-gray/30 rounded-lg p-6 flex flex-col items-center justify-center">
      <UploadCloud className="h-12 w-12 text-gray-400 mb-4" />
      
      <p className="text-sm text-gray-400 text-center mb-2">
        Drag & drop match images here, or click to select files
      </p>
      
      <p className="text-xs text-gray-500 mb-4 text-center">
        Supports: PNG, JPG, JPEG (max {maxUploads === 1 ? 'file' : `${maxUploads} files`} for your {planType} plan)
      </p>
      
      <label htmlFor="file-upload" className="cursor-pointer">
        <Button
          variant="outline"
          className="border-neon-green/30 text-neon-green hover:bg-neon-green/10"
        >
          <Image className="h-4 w-4 mr-2" /> 
          Select Images
        </Button>
        <input
          id="file-upload"
          type="file"
          multiple={maxUploads > 1}
          accept="image/png, image/jpeg, image/jpg"
          className="hidden"
          onChange={handleFileSelect}
          disabled={filesLength >= maxUploads || isUploading}
        />
      </label>
    </div>
  );
};
