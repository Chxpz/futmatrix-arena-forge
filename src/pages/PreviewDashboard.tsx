
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Bot, Trophy, Users, Brain, Home } from 'lucide-react';

const PreviewDashboard = () => {
  const navigate = useNavigate();
  const [coachInteractions, setCoachInteractions] = useState(0);
  const [rivalizerInteractions, setRivalizerInteractions] = useState(0);

  useEffect(() => {
    // Check if user has preview access
    const hasPreviewAccess = localStorage.getItem('previewAccess');
    if (!hasPreviewAccess) {
      navigate('/preview');
      return;
    }

    // Load interaction counts
    const savedCoachInteractions = parseInt(localStorage.getItem('coachInteractions') || '0');
    const savedRivalizerInteractions = parseInt(localStorage.getItem('rivalizerInteractions') || '0');
    
    setCoachInteractions(savedCoachInteractions);
    setRivalizerInteractions(savedRivalizerInteractions);
  }, [navigate]);

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
          <Card className="bg-matrix-dark border-matrix-gray/30 text-center">
            <CardContent className="py-8">
              <h3 className="text-xl font-bold text-white mb-4">Preview Complete!</h3>
              <p className="text-gray-300 mb-6">
                You've experienced both AI agents. Ready to unlock unlimited access?
              </p>
              <Button 
                className="bg-neon-green text-black hover:bg-neon-green/90"
                onClick={() => window.open('https://whop.com/futmatrix', '_blank')}
              >
                Get Full Access
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PreviewDashboard;
