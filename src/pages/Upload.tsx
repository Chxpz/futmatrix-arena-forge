
import { UploadCard } from '@/components/upload/UploadCard';
import { InstructionsCard } from '@/components/upload/InstructionsCard';
import { useUploadImages } from '@/hooks/use-upload-images';

// This would come from user authentication context
const PLAN_TYPE = 'basic'; // or 'advanced'

const Upload = () => {
  const maxUploads = PLAN_TYPE === 'basic' ? 1 : 5;
  
  const {
    files,
    previews,
    isUploading,
    uploadProgress,
    handleFileSelect,
    removeFile,
    handleSubmit
  } = useUploadImages({ maxUploads, planType: PLAN_TYPE });
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Upload Match Images</h1>
        <p className="text-sm text-gray-400 mt-1">Submit your match statistics for analysis</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <UploadCard
          planType={PLAN_TYPE}
          maxUploads={maxUploads}
          files={files}
          previews={previews}
          isUploading={isUploading}
          uploadProgress={uploadProgress}
          handleFileSelect={handleFileSelect}
          removeFile={removeFile}
          handleSubmit={handleSubmit}
        />
        
        <InstructionsCard planType={PLAN_TYPE} maxUploads={maxUploads} />
      </div>
    </div>
  );
};

export default Upload;
