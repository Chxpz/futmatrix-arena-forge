
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Bot, Trophy, Users, Brain, Home, Coins, Zap, Crown, Star } from 'lucide-react';

const PreviewDashboard = () => {
  const navigate = useNavigate();
  const [coachInteractions, setCoachInteractions] = useState(0);
  const [rivalizerInteractions, setRivalizerInteractions] = useState(0);

  useEffect(() => {
    // Load interaction counts
    const savedCoachInteractions = parseInt(localStorage.getItem('coachInteractions') || '0');
    const savedRivalizerInteractions = parseInt(localStorage.getItem('rivalizerInteractions') || '0');
    
    setCoachInteractions(savedCoachInteractions);
    setRivalizerInteractions(savedRivalizerInteractions);
  }, []);

  const handleAgentClick = (agentType: 'coach' | 'rivalizer') => {
    const currentInteractions = agentType === 'coach' ? coachInteractions : rivalizerInteractions;
    
    if (currentInteractions >= 5) {
      return; // Don't navigate if limit reached
    }

    if (agentType === 'coach') {
      navigate('/preview-coach');
    } else {
      navigate('/preview-rivalizer');
    }
  };

  const handleGetTokens = () => {
    window.open('https://virtuals.io/tokens/FUTM', '_blank');
  };

  return (
    <div className="min-h-screen bg-matrix-darker p-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <div className="flex justify-between items-start mb-4">
            <Button 
              variant="outline" 
              onClick={() => navigate('/')}
              className="border-matrix-gray/30 text-gray-400 hover:text-white hover:bg-matrix-dark"
            >
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <div className="flex-1 flex justify-center">
              <img 
                src="/lovable-uploads/43b4aae5-404e-48b7-9d0b-f05717d5161a.png" 
                alt="Futmatrix" 
                className="h-16 w-auto" 
              />
            </div>
            <div className="w-[120px]"></div> {/* Spacer to center the logo */}
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome to Futmatrix Preview</h1>
          <p className="text-gray-400 text-lg">Choose your AI agent to get started</p>
          <div className="inline-block py-2 px-4 rounded-full bg-neon-green/20 border border-neon-green/40 text-sm text-neon-green mt-4">
            ⚡ Preview Mode - 5 interactions per agent
          </div>
        </div>

        {/* Prominent Token CTA */}
        <Card className="bg-gradient-to-br from-orange-500/15 via-red-500/10 to-purple-500/15 border-2 border-orange-500/40 shadow-2xl mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-400/5 via-red-400/5 to-purple-400/5 animate-pulse"></div>
          <CardHeader className="text-center relative z-10">
            <div className="flex justify-center mb-4">
              <div className="p-4 rounded-full bg-gradient-to-br from-orange-500/30 to-red-500/30 border border-orange-400/50">
                <Crown className="w-8 h-8 text-orange-400" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-2">
              Unlock Elite Status
            </CardTitle>
            <CardDescription className="text-gray-300 text-lg">
              Join the competitive elite with unlimited AI access and self-betting features
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center justify-center gap-2 text-sm text-orange-300">
                <Star className="w-4 h-4 text-orange-400" />
                <span>Unlimited AI Training</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-red-300">
                <Zap className="w-4 h-4 text-red-400" />
                <span>Self-Betting Matches</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-purple-300">
                <Trophy className="w-4 h-4 text-purple-400" />
                <span>Competitive Edge</span>
              </div>
            </div>
            <Button 
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold px-8 py-3 text-lg shadow-xl transform hover:scale-105 transition-all duration-200"
              onClick={handleGetTokens}
            >
              <Coins className="w-5 h-5 mr-3" />
              Get FUTM Tokens Now
              <Zap className="w-5 h-5 ml-3" />
            </Button>
            <p className="text-xs text-gray-500 mt-3">Join elite players earning through skill</p>
          </CardContent>
        </Card>

        {/* Token CTA for experienced users */}
        {(coachInteractions > 2 || rivalizerInteractions > 2) && (
          <Card className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-500/30 mb-8">
            <CardContent className="py-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-gradient-to-br from-orange-500/20 to-red-500/20">
                    <Crown className="w-6 h-6 text-orange-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-orange-400 mb-1">Ready to Dominate?</h3>
                    <p className="text-gray-300 text-sm">
                      Join elite players with unlimited AI access and competitive advantages
                    </p>
                  </div>
                </div>
                <Button 
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold"
                  onClick={handleGetTokens}
                >
                  <Coins className="w-4 h-4 mr-2" />
                  Get Tokens
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Agent Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* AI Coach Card */}
          <Card className="bg-matrix-dark border-matrix-gray/30 hover:border-teal-500/50 transition-all cursor-pointer group">
            <CardHeader className="text-center pb-4">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-teal-600 to-teal-800 p-1">
                <div className="w-full h-full rounded-full overflow-hidden border border-teal-400/30">
                  <img 
                    src="/lovable-uploads/6f6aaf60-65da-4127-b5d4-15e5e3327b26.png" 
                    alt="AI Coach" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <CardTitle className="text-2xl text-teal-400">AI Coach</CardTitle>
              <CardDescription className="text-gray-300">
                Your personal training assistant for skill improvement
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-300">
                  <Brain className="w-4 h-4 mr-2 text-teal-400" />
                  <span>Personalized training recommendations</span>
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <Trophy className="w-4 h-4 mr-2 text-teal-400" />
                  <span>Performance analysis and feedback</span>
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <Bot className="w-4 h-4 mr-2 text-teal-400" />
                  <span>AI-powered skill development</span>
                </div>
              </div>
              
              <div className="text-center py-2">
                <div className="text-sm text-gray-400">
                  Interactions remaining: <span className="text-teal-400 font-semibold">{5 - coachInteractions}</span>
                </div>
              </div>
              
              <Button 
                className={`w-full ${
                  coachInteractions >= 5 
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                    : 'bg-teal-600 hover:bg-teal-700 text-white group-hover:bg-teal-700'
                }`}
                onClick={() => handleAgentClick('coach')}
                disabled={coachInteractions >= 5}
              >
                {coachInteractions >= 5 ? 'Preview Limit Reached' : 'Chat with AI Coach'}
              </Button>
            </CardContent>
          </Card>

          {/* Rivalizer Card */}
          <Card className="bg-matrix-dark border-matrix-gray/30 hover:border-red-500/50 transition-all cursor-pointer group">
            <CardHeader className="text-center pb-4">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-red-600 to-red-800 p-1">
                <div className="w-full h-full rounded-full overflow-hidden border border-red-400/30">
                  <img 
                    src="/lovable-uploads/cfd8bdf3-3acb-4ad6-a468-6dfb6796cc93.png" 
                    alt="Rivalizer" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <CardTitle className="text-2xl text-red-400">Rivalizer</CardTitle>
              <CardDescription className="text-gray-300">
                Your competitive matchmaking and strategy advisor
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-300">
                  <Users className="w-4 h-4 mr-2 text-red-400" />
                  <span>Smart opponent matching</span>
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <Trophy className="w-4 h-4 mr-2 text-red-400" />
                  <span>Competitive strategy analysis</span>
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <Bot className="w-4 h-4 mr-2 text-red-400" />
                  <span>Match preparation insights</span>
                </div>
              </div>
              
              <div className="text-center py-2">
                <div className="text-sm text-gray-400">
                  Interactions remaining: <span className="text-red-400 font-semibold">{5 - rivalizerInteractions}</span>
                </div>
              </div>
              
              <Button 
                className={`w-full ${
                  rivalizerInteractions >= 5 
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                    : 'bg-red-600 hover:bg-red-700 text-white group-hover:bg-red-700'
                }`}
                onClick={() => handleAgentClick('rivalizer')}
                disabled={rivalizerInteractions >= 5}
              >
                {rivalizerInteractions >= 5 ? 'Preview Limit Reached' : 'Chat with Rivalizer'}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Status Message */}
        {(coachInteractions >= 5 && rivalizerInteractions >= 5) && (
          <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/30 text-center">
            <CardContent className="py-8">
              <div className="mb-4">
                <div className="inline-block p-4 rounded-full bg-gradient-to-br from-orange-500/20 to-red-500/20 mb-4">
                  <Trophy className="w-8 h-8 text-orange-400" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-orange-400 mb-2">Preview Complete!</h3>
              <p className="text-gray-300 mb-6 max-w-md mx-auto">
                You've experienced both AI agents. Ready to unlock unlimited access and join the competitive elite?
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold px-8"
                  onClick={handleGetTokens}
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Get Tokens & Unlock Full Power
                </Button>
                <Button 
                  variant="outline"
                  className="border-neon-green text-neon-green hover:bg-neon-green/10"
                  onClick={() => window.open('https://whop.com/futmatrix', '_blank')}
                >
                  Subscribe for Full Access
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PreviewDashboard;
