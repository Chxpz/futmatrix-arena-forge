
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

interface UseUploadImagesProps {
  maxUploads: number;
  planType: string;
}

export const useUploadImages = ({ maxUploads, planType }: UseUploadImagesProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const selectedFiles = Array.from(e.target.files);
    
    // Check if adding these files would exceed the limit
    if (files.length + selectedFiles.length > maxUploads) {
      toast({
        title: "Upload limit reached",
        description: `Your ${planType} plan allows up to ${maxUploads} ${maxUploads === 1 ? 'image' : 'images'} at a time`,
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
    setUploadProgress(0);
    
    try {
      const apiUrl = import.meta.env.VITE_MATCH_UPLOAD_API_URL || '/api/matches/upload';
      
      // Create FormData to send files
      const formData = new FormData();
      files.forEach((file, index) => {
        formData.append(`match_image_${index}`, file);
      });
      
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          const newProgress = prev + Math.random() * 15;
          return newProgress >= 90 ? 90 : newProgress;
        });
      }, 500);
      
      // Send to backend
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formData,
      });
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      if (!response.ok) {
        throw new Error(`Upload failed with status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Success feedback
      toast({
        title: "Upload successful",
        description: "Metrix has registered your metrics",
      });
      
      // Clear form after successful upload
      setTimeout(() => {
        setFiles([]);
        setPreviews([]);
        setUploadProgress(0);
      }, 1500);
      
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Upload failed",
        description: "There was an error uploading your images. Please try again.",
        variant: "destructive",
      });
    } finally {
      setTimeout(() => {
        setIsUploading(false);
      }, 1000);
    }
  };

  return {
    files,
    previews,
    isUploading,
    uploadProgress,
    handleFileSelect,
    removeFile,
    handleSubmit
  };
};
