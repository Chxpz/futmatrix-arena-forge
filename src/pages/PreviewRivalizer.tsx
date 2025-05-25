
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bot, Coins, Crown, Target } from 'lucide-react';
import AgentDisplaySection from '@/components/ai-rivalizer/AgentDisplaySection';
import ChatInterface from '@/components/ai-rivalizer/ChatInterface';
import { Card, CardContent } from '@/components/ui/card';

interface Message {
  id: number;
  type: 'ai' | 'user';
  content: string;
  timestamp: string;
}

const PreviewRivalizer = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'ai',
      content: "🔥 Welcome to the Rivalizer preview! I'm your competitive edge, ready to help you find worthy opponents and dominate the competition. Ask me about matchmaking strategies, opponent analysis, or competitive tips. You have limited interactions in this preview mode.",
      timestamp: new Date().toLocaleTimeString(),
    }
  ]);
  const [interactionCount, setInteractionCount] = useState(0);

  useEffect(() => {
    const savedInteractions = parseInt(localStorage.getItem('rivalizerInteractions') || '0');
    setInteractionCount(savedInteractions);

    if (savedInteractions >= 5) {
      navigate('/preview-dashboard');
    }
  }, [navigate]);

  const incrementInteraction = () => {
    const newCount = interactionCount + 1;
    setInteractionCount(newCount);
    localStorage.setItem('rivalizerInteractions', newCount.toString());
    
    if (newCount >= 5) {
      setTimeout(() => {
        navigate('/preview-dashboard');
      }, 2000);
    }
  };

  const handleGetTokens = () => {
    window.open('https://virtuals.io/tokens/FUTM', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-matrix-darker via-red-950/20 to-matrix-darker">
      <div className="flex flex-col h-screen">
        {/* Header */}
        <div className="border-b border-red-900/30 bg-gradient-to-r from-red-950/20 to-transparent p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/preview-dashboard')}
                className="border-red-600 text-red-400 hover:bg-red-950/30"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
              <div className="flex items-center space-x-3">
                <Bot className="w-6 h-6 text-red-400" />
                <div>
                  <h1 className="text-lg font-bold text-white">Rivalizer Preview</h1>
                  <p className="text-sm text-red-400">
                    {5 - interactionCount} interactions remaining
                  </p>
                </div>
              </div>
            </div>
            
            {/* Competitive Edge CTA */}
            {interactionCount >= 3 && (
              <Card className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-500/30">
                <CardContent className="py-2 px-4">
                  <div className="flex items-center gap-3">
                    <Target className="w-5 h-5 text-orange-400" />
                    <div className="text-xs">
                      <p className="text-orange-400 font-medium">Unlock Self-Betting</p>
                      <Button 
                        size="sm"
                        className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white text-xs h-6 mt-1"
                        onClick={handleGetTokens}
                      >
                        Get Tokens
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            
            <div className="text-sm text-gray-400">
              Preview Mode
            </div>
          </div>
        </div>
        
        <div className="flex-1 flex flex-col lg:flex-row">
          <AgentDisplaySection />
          <ChatInterface 
            messages={messages} 
            setMessages={setMessages}
            onSendMessage={incrementInteraction}
            interactionLimit={5 - interactionCount}
          />
        </div>
      </div>
    </div>
  );
};

export default PreviewRivalizer;
