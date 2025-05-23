
import { useState } from 'react';
import { 
  Card, CardContent, CardDescription, CardHeader, CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { UploadCloud, Image, X, Check } from 'lucide-react';

// This would come from user authentication context
const PLAN_TYPE = 'basic'; // or 'advanced'

const Upload = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  
  const maxUploads = PLAN_TYPE === 'basic' ? 1 : 5;
  
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const selectedFiles = Array.from(e.target.files);
    
    // Check if adding these files would exceed the limit
    if (files.length + selectedFiles.length > maxUploads) {
      toast({
        title: "Upload limit reached",
        description: `Your ${PLAN_TYPE} plan allows up to ${maxUploads} ${maxUploads === 1 ? 'image' : 'images'} at a time`,
        variant: "destructive",
      });
      return;
    }
    
    // Add files to state
    setFiles(prev => [...prev, ...selectedFiles]);
    
    // Create previews
    const newPreviews = selectedFiles.map(file => URL.createObjectURL(file));
    setPreviews(prev => [...prev, ...newPreviews]);
  };
  
  const removeFile = (index: number) => {
    // Release object URL to prevent memory leaks
    URL.revokeObjectURL(previews[index]);
    
    setFiles(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };
  
  const handleSubmit = async () => {
    if (files.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select at least one match image to upload",
        variant: "destructive",
      });
      return;
    }
    
    setIsUploading(true);
    
    try {
      // Simulate API call - replace with your backend logic
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Upload successful",
        description: `${files.length} ${files.length === 1 ? 'image has' : 'images have'} been uploaded successfully`,
      });
      
      // Clear form after successful upload
      setFiles([]);
      setPreviews([]);
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Upload failed",
        description: "There was an error uploading your images. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Upload Match Images</h1>
        <p className="text-sm text-gray-400 mt-1">Submit your match statistics for analysis</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Upload area */}
        <Card className="md:col-span-2 bg-matrix-dark border-matrix-gray/30">
          <CardHeader>
            <CardTitle>Match Images</CardTitle>
            <CardDescription>
              Upload screenshots of your match statistics for AI analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-6">
              {/* Upload area */}
              <div className="border-2 border-dashed border-matrix-gray/30 rounded-lg p-6 flex flex-col items-center justify-center">
                <UploadCloud className="h-12 w-12 text-gray-400 mb-4" />
                
                <p className="text-sm text-gray-400 text-center mb-2">
                  Drag & drop match images here, or click to select files
                </p>
                
                <p className="text-xs text-gray-500 mb-4 text-center">
                  Supports: PNG, JPG, JPEG (max {maxUploads === 1 ? 'file' : `${maxUploads} files`} for your {PLAN_TYPE} plan)
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
                    disabled={files.length >= maxUploads || isUploading}
                  />
                </label>
              </div>
              
              {/* Preview area */}
              {previews.length > 0 && (
                <div>
                  <h3 className="font-medium mb-3">Selected Images</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {previews.map((preview, index) => (
                      <div
                        key={index}
                        className="relative border border-matrix-gray/30 rounded-lg overflow-hidden group"
                      >
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
                          {files[index].name}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Button
                    onClick={handleSubmit}
                    className="w-full mt-4 bg-neon-green text-black hover:bg-neon-green/90"
                    disabled={files.length === 0 || isUploading}
                  >
                    {isUploading ? (
                      <>
                        <div className="animate-spin mr-2 h-4 w-4 border-2 border-b-transparent border-white rounded-full"></div>
                        Uploading...
                      </>
                    ) : (
                      <>
                        <UploadCloud className="h-4 w-4 mr-2" />
                        Submit Images
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        {/* Instructions card */}
        <Card className="bg-matrix-dark border-matrix-gray/30">
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-neon-green/20 flex items-center justify-center mr-3">
                  <span className="text-neon-green text-sm">1</span>
                </div>
                <p className="text-sm">Take screenshots of your match statistics screens after completing a game in EAFC25</p>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-neon-green/20 flex items-center justify-center mr-3">
                  <span className="text-neon-green text-sm">2</span>
                </div>
                <p className="text-sm">Upload the images here (upload limit based on your subscription plan)</p>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-neon-green/20 flex items-center justify-center mr-3">
                  <span className="text-neon-green text-sm">3</span>
                </div>
                <p className="text-sm">Our AI analyzes your performance metrics and adds them to your profile</p>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-neon-green/20 flex items-center justify-center mr-3">
                  <span className="text-neon-green text-sm">4</span>
                </div>
                <p className="text-sm">Access personalized tips from your AI Coach based on your stats</p>
              </div>
            </div>
            
            <div className="p-3 bg-neon-green/5 border border-neon-green/20 rounded-md mt-6">
              <div className="flex items-center">
                <div className="mr-3">
                  <Check className="h-5 w-5 text-neon-green" />
                </div>
                <div>
                  <p className="text-sm font-medium">Your {PLAN_TYPE} plan includes:</p>
                  <p className="text-xs text-gray-400">
                    {maxUploads === 1 
                      ? 'Upload one image at a time' 
                      : `Upload up to ${maxUploads} images at once`}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Upload;
