
import { 
  Card, CardContent, CardDescription, CardHeader, CardTitle 
} from '@/components/ui/card';
import { UploadArea } from './UploadArea';
import { PreviewArea } from './PreviewArea';

interface UploadCardProps {
  planType: string;
  maxUploads: number;
  files: File[];
  previews: string[];
  isUploading: boolean;
  uploadProgress: number;
  handleFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeFile: (index: number) => void;
  handleSubmit: () => void;
}

export const UploadCard = ({
  planType,
  maxUploads,
  files,
  previews,
  isUploading,
  uploadProgress,
  handleFileSelect,
  removeFile,
  handleSubmit,
}: UploadCardProps) => {
  return (
    <Card className="md:col-span-2 bg-matrix-dark border-matrix-gray/30">
      <CardHeader>
        <CardTitle>Match Images</CardTitle>
        <CardDescription>
          Upload screenshots of your match statistics for AI analysis
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-6">
          <UploadArea
            maxUploads={maxUploads}
            planType={planType}
            handleFileSelect={handleFileSelect}
            isUploading={isUploading}
            filesLength={files.length}
          />
          
          {previews.length > 0 && (
            <PreviewArea
              previews={previews}
              files={files}
              isUploading={isUploading}
              uploadProgress={uploadProgress}
              removeFile={removeFile}
              handleSubmit={handleSubmit}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};
