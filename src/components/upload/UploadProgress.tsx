
import { Progress } from '@/components/ui/progress';

interface UploadProgressProps {
  uploadProgress: number;
}

export const UploadProgress = ({ uploadProgress }: UploadProgressProps) => {
  return (
    <div className="mt-4 space-y-3">
      <div className="flex justify-between text-xs mb-1">
        <span>Uploading and processing...</span>
        <span>{Math.round(uploadProgress)}%</span>
      </div>
      <Progress value={uploadProgress} className="h-2 bg-matrix-gray/30" />
      <p className="text-xs text-gray-400 text-center">
        Please wait while we analyze your match statistics (3-5 seconds)
      </p>
    </div>
  );
};
