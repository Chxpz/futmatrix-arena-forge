import supabase from '@/lib/supabase';
import { aiAgentService } from '@/services/api';

export interface UploadResult {
  imageUrl: string;
  uploadId: string;
}

export interface MatchAnalysisResult {
  matchData: any;
  processedMetrics: any;
  uploadId: string;
}

export const uploadService = {
  async uploadMatchImage(file: File, userId: string): Promise<UploadResult> {
    // Upload to Supabase storage
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}/${Date.now()}.${fileExt}`;
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('match-images')
      .upload(fileName, file);
      
    if (uploadError) throw uploadError;
    
    // Get public URL
    const { data: urlData } = supabase.storage
      .from('match-images')
      .getPublicUrl(fileName);
      
    // Record upload in database
    const { data: recordData, error: recordError } = await supabase
      .from('replay_uploads')
      .insert({
        user_id: userId,
        content_type: 'image',
        uploaded_at: new Date().toISOString()
      })
      .select()
      .single();
      
    if (recordError) throw recordError;
    
    return {
      imageUrl: urlData.publicUrl,
      uploadId: recordData.id
    };
  },

  async processMatchImage(uploadResult: UploadResult, userId: string): Promise<MatchAnalysisResult> {
    try {
      // Call AI agent for image processing
      const analysisResult = await fetch('/api/process-match-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageUrl: uploadResult.imageUrl,
          userId,
          uploadId: uploadResult.uploadId
        })
      });
      
      if (!analysisResult.ok) {
        throw new Error('Image processing failed');
      }
      
      const { matchData, processedMetrics } = await analysisResult.json();
      
      return {
        matchData,
        processedMetrics,
        uploadId: uploadResult.uploadId
      };
    } catch (error) {
      console.error('Match image processing error:', error);
      throw error;
    }
  },

  async saveMatchData(analysisResult: MatchAnalysisResult, userId: string): Promise<string> {
    // Save match data to database
    const { data: matchData, error: matchError } = await supabase
      .from('matches')
      .insert({
        user_id: userId,
        ...analysisResult.matchData,
        source_image_url: analysisResult.uploadId
      })
      .select()
      .single();
      
    if (matchError) throw matchError;
    
    // Save processed metrics
    if (analysisResult.processedMetrics) {
      const { error: metricsError } = await supabase
        .from('processed_metrics')
        .insert({
          match_id: matchData.id,
          user_id: userId,
          ...analysisResult.processedMetrics
        });
        
      if (metricsError) throw metricsError;
    }
    
    return matchData.id;
  }
};