
import { Button } from '@/components/ui/button';
import { Loader2, UploadCloud } from 'lucide-react';
import { ImagePreview } from './ImagePreview';
import { UploadProgress } from './UploadProgress';

interface PreviewAreaProps {
  previews: string[];
  files: File[];
  isUploading: boolean;
  uploadProgress: number;
  removeFile: (index: number) => void;
  handleSubmit: () => void;
}

export const PreviewArea = ({
  previews,
  files,
  isUploading,
  uploadProgress,
  removeFile,
  handleSubmit,
}: PreviewAreaProps) => {
  return (
    <div>
      <h3 className="font-medium mb-3">Selected Images</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {previews.map((preview, index) => (
          <ImagePreview
            key={index}
            preview={preview}
            fileName={files[index].name}
            index={index}
            removeFile={removeFile}
            isUploading={isUploading}
          />
        ))}
      </div>
      
      {isUploading && <UploadProgress uploadProgress={uploadProgress} />}
      
      <Button
        onClick={handleSubmit}
        className="w-full mt-4 bg-neon-green text-black hover:bg-neon-green/90"
        disabled={files.length === 0 || isUploading}
      >
        {isUploading ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <UploadCloud className="h-4 w-4 mr-2" />
            Submit Images
          </>
        )}
      </Button>
    </div>
  );
};
