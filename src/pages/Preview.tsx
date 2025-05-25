
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Preview = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    try {
      // Simulate Google auth - in reality this would integrate with your auth provider
      console.log("Google sign up clicked for preview");
      
      // Simulate successful signup
      setTimeout(() => {
        // Store preview access
        localStorage.setItem('previewAccess', 'true');
        localStorage.setItem('coachInteractions', '0');
        localStorage.setItem('rivalizerInteractions', '0');
        
        // Navigate to choice interstitial instead of direct dashboard
        navigate('/preview-choice');
      }, 1000);
    } catch (error) {
      console.error("Error signing up:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-matrix-darker p-4">
      <div className="relative w-full max-w-md">
        <div className="absolute -top-40 -left-20 w-72 h-72 bg-neon-green/10 rounded-full filter blur-3xl"></div>
        <div className="absolute -bottom-40 -right-20 w-72 h-72 bg-neon-green/5 rounded-full filter blur-3xl"></div>
        
        <Card className="border border-matrix-gray/30 bg-matrix-dark/80 backdrop-blur-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4">
              <img 
                src="/lovable-uploads/43b4aae5-404e-48b7-9d0b-f05717d5161a.png" 
                alt="Futmatrix" 
                className="h-16 w-auto" 
              />
            </div>
            <CardTitle className="text-2xl font-bold">Get Preview Access</CardTitle>
            <CardDescription>
              Experience the future of competitive gaming with our AI agents
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center space-y-3 mb-6">
              <div className="inline-block py-2 px-4 rounded-full bg-neon-green/20 border border-neon-green/40 text-sm text-neon-green">
                ⚡ Limited Preview Access
              </div>
              <div className="text-sm text-gray-300">
                • Try our AI Coach for personalized training
                • Experience the Rivalizer for competitive matching
                • 5 interactions with each AI agent
              </div>
            </div>

            {/* Enhanced Token Information Box */}
            <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-lg p-4 border border-orange-500/20 mb-6">
              <div className="text-sm text-gray-300 leading-relaxed">
                <div className="flex items-start gap-2">
                  <span className="text-orange-400 text-lg">🚀</span>
                  <div>
                    <span className="text-orange-400 font-medium">Competitive Edge:</span> 
                    <span className="text-gray-300"> Serious players enhance their game with tokens available on </span>
                    <button 
                      onClick={() => window.open('https://virtuals.io/tokens/FUTM', '_blank')}
                      className="text-orange-400 hover:text-orange-300 underline font-medium"
                    >
                      Virtuals Protocol
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Newsletter and Development Transparency Info */}
            <div className="bg-matrix-gray/10 rounded-lg p-4 border border-matrix-gray/20 mb-6">
              <div className="text-xs text-gray-400 leading-relaxed">
                <div className="flex items-start gap-2 mb-2">
                  <span className="text-neon-green text-sm">📧</span>
                  <div>
                    <span className="text-gray-300 font-medium">Newsletter Subscription:</span> By signing up, you'll receive our development newsletter with transparent updates on project milestones.
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-neon-green text-sm">🚧</span>
                  <div>
                    <span className="text-gray-300 font-medium">Early Access:</span> This project is in development. We're testing our concept and will keep you informed of our progress.
                  </div>
                </div>
              </div>
            </div>
            
            <Button 
              className="w-full bg-white text-black hover:bg-gray-200 flex items-center justify-center gap-2"
              onClick={handleGoogleSignUp}
              disabled={isLoading}
            >
              <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                  <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                  <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                  <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                  <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
                </g>
              </svg>
              {isLoading ? 'Getting Preview...' : 'Continue with Google'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Preview;
