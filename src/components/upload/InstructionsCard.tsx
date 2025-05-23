
import { Check } from 'lucide-react';
import { 
  Card, CardContent, CardHeader, CardTitle 
} from '@/components/ui/card';

interface InstructionsCardProps {
  planType: string;
  maxUploads: number;
}

export const InstructionsCard = ({ planType, maxUploads }: InstructionsCardProps) => {
  return (
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
              <p className="text-sm font-medium">Your {planType} plan includes:</p>
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
  );
};
