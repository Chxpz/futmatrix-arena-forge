
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Trophy, Zap, Crown, Target, TrendingUp, Users, Coins } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const PreviewChoice = () => {
  const navigate = useNavigate();
  const [showTokenModal, setShowTokenModal] = useState(false);

  useEffect(() => {
    // Show token modal when page renders
    setShowTokenModal(true);
  }, []);

  const handleStartPreview = () => {
    navigate('/preview-dashboard');
  };

  const handleUnlockFullPower = () => {
    // Open Virtuals Protocol in new tab and then redirect to dashboard
    window.open('https://virtuals.io/tokens/FUTM', '_blank');
    // Optional: redirect to dashboard after a delay
    setTimeout(() => {
      navigate('/preview-dashboard');
    }, 2000);
  };

  const handleGetTokens = () => {
    setShowTokenModal(false);
    handleUnlockFullPower();
  };

  const handleContinuePreview = () => {
    setShowTokenModal(false);
  };

  return (
    <div className="min-h-screen bg-matrix-darker flex items-center justify-center p-4">
      {/* Token Modal */}
      <Dialog open={showTokenModal} onOpenChange={setShowTokenModal}>
        <DialogContent className="bg-matrix-dark border-orange-500/30 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl text-orange-400 flex items-center gap-2">
              <Coins className="w-6 h-6" />
              Unlock Your Competitive Edge
            </DialogTitle>
            <DialogDescription className="text-gray-300 mt-4 space-y-4">
              <div className="text-center">
                <div className="inline-block p-3 rounded-full bg-gradient-to-br from-orange-500/20 to-red-500/20 mb-4">
                  <TrendingUp className="w-8 h-8 text-orange-400" />
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white font-medium">Join Elite Players</p>
                    <p className="text-sm text-gray-400">Serious competitors use tokens for unlimited AI access and advanced features</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Trophy className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white font-medium">Self-Betting Matches</p>
                    <p className="text-sm text-gray-400">Stake tokens on your own performance and earn from victories</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white font-medium">Unlimited AI Training</p>
                    <p className="text-sm text-gray-400">No restrictions on AI Coach and Rivalizer interactions</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-lg p-3 border border-orange-500/20 mt-4">
                <p className="text-orange-300 text-sm text-center font-medium">
                  🚀 Get tokens on Virtuals Protocol and dominate the competition
                </p>
              </div>
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col gap-3 mt-6">
            <Button 
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold"
              onClick={handleGetTokens}
            >
              Get Tokens Now
            </Button>
            <Button 
              variant="outline" 
              className="w-full border-matrix-gray/30 text-gray-300 hover:bg-matrix-gray/10"
              onClick={handleContinuePreview}
            >
              Continue with Preview
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <img 
            src="/lovable-uploads/43b4aae5-404e-48b7-9d0b-f05717d5161a.png" 
            alt="Futmatrix" 
            className="h-16 w-auto mx-auto mb-6" 
          />
          <h1 className="text-4xl font-bold text-white mb-4">
            Ready to <span className="text-neon-green">Dominate</span>?
          </h1>
          <p className="text-xl text-gray-300 mb-2">Choose your path to victory</p>
          <div className="inline-block py-2 px-4 rounded-full bg-neon-green/20 border border-neon-green/40 text-sm text-neon-green">
            ✨ Welcome to the future of competitive gaming
          </div>
        </div>

        {/* Two Path Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          
          {/* Preview Mode Card */}
          <Card className="bg-matrix-dark border-matrix-gray/30 hover:border-teal-500/50 transition-all group">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-teal-600/20 flex items-center justify-center">
                <Target className="w-8 h-8 text-teal-400" />
              </div>
              <CardTitle className="text-2xl text-teal-400">Start Preview</CardTitle>
              <CardDescription className="text-gray-300">
                Test our AI agents with limited access
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-300">
                  <span className="text-teal-400 mr-2">•</span>
                  <span>5 interactions with AI Coach</span>
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="text-teal-400 mr-2">•</span>
                  <span>5 interactions with Rivalizer</span>
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="text-teal-400 mr-2">•</span>
                  <span>Basic performance insights</span>
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="text-teal-400 mr-2">•</span>
                  <span>Preview of platform features</span>
                </div>
              </div>
              
              <div className="pt-4">
                <div className="text-center text-sm text-gray-400 mb-4">
                  Perfect for testing the waters
                </div>
                <Button 
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white"
                  onClick={handleStartPreview}
                >
                  Start Preview Experience
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Full Power Card */}
          <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/30 hover:border-orange-400/50 transition-all group relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <Crown className="w-6 h-6 text-orange-400" />
            </div>
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-orange-500/30 to-red-500/30 flex items-center justify-center">
                <Zap className="w-8 h-8 text-orange-400" />
              </div>
              <CardTitle className="text-2xl text-orange-400">Unlock Full Power</CardTitle>
              <CardDescription className="text-gray-300">
                Get tokens for unlimited access and premium features
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-300">
                  <span className="text-orange-400 mr-2">•</span>
                  <span>Unlimited AI agent interactions</span>
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="text-orange-400 mr-2">•</span>
                  <span>Advanced training programs</span>
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="text-orange-400 mr-2">•</span>
                  <span>Premium analytics & insights</span>
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="text-orange-400 mr-2">•</span>
                  <span>Competitive matchmaking features</span>
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="text-orange-400 mr-2">•</span>
                  <span>Self-betting on matches</span>
                </div>
              </div>
              
              <div className="bg-orange-500/10 rounded-lg p-3 border border-orange-500/20 mb-4">
                <div className="flex items-center text-sm text-orange-300">
                  <Trophy className="w-4 h-4 mr-2" />
                  <span className="font-medium">Serious players choose tokens</span>
                </div>
              </div>
              
              <Button 
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold"
                onClick={handleUnlockFullPower}
              >
                Get Tokens on Virtuals Protocol
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <p className="text-gray-400 text-sm">
            You can always upgrade later. Start your journey and see what's possible.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PreviewChoice;
