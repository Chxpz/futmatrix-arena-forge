
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Mic, Square, User, Coins, Zap, Brain } from 'lucide-react';

interface Message {
  id: number;
  type: 'ai' | 'user';
  content: string;
  timestamp: string;
}

interface CoachChatInterfaceProps {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  onSendMessage?: () => void;
  interactionLimit?: number;
}

const CoachChatInterface = ({ 
  messages, 
  setMessages, 
  onSendMessage,
  interactionLimit
}: CoachChatInterfaceProps) => {
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    // Check interaction limit
    if (interactionLimit !== undefined && interactionLimit <= 0) {
      return;
    }

    const newMessage: Message = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');

    // Call the interaction callback if provided
    if (onSendMessage) {
      onSendMessage();
    }

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Based on your question, I recommend focusing on defensive positioning. Practice using the jockey button (L2/LT) to maintain better control in 1v1 situations.",
        "Great question! Your shot conversion rate could improve with better timing. Try practicing power shots from just outside the box during training mode.",
        "I've analyzed similar gameplay patterns - consider working on your build-up play. Quick passes and movement off the ball are key to creating space.",
        "Excellent focus area! Your counterattacking shows promise. Let's work on maintaining possession to complement your existing strengths.",
      ];

      const aiResponse: Message = {
        id: Date.now() + 1,
        type: 'ai',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1500);
  };

  const toggleListening = () => {
    setIsListening(!isListening);
  };

  const isLimitReached = interactionLimit !== undefined && interactionLimit <= 0;

  const handleGetTokens = () => {
    window.open('https://virtuals.io/tokens/FUTM', '_blank');
  };

  return (
    <div className="lg:w-1/2 flex flex-col">
      {/* Chat Header */}
      <div className="border-b border-teal-900/30 bg-gradient-to-r from-teal-950/20 to-transparent p-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-600 to-teal-800 p-0.5">
            <div className="w-full h-full rounded-full overflow-hidden border border-teal-400/30">
              <img 
                src="/lovable-uploads/6f6aaf60-65da-4127-b5d4-15e5e3327b26.png" 
                alt="AI Coach" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Chat with AI Coach</h2>
            <p className="text-teal-400 text-sm">
              {interactionLimit !== undefined 
                ? `Ready to elevate your gameplay (${interactionLimit} interactions left)`
                : 'Ready to elevate your gameplay'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start space-x-3`}>
              {/* Avatar */}
              {message.type === 'ai' && (
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-teal-600 to-teal-800 p-0.5">
                  <div className="w-full h-full rounded-full overflow-hidden border border-teal-400/30">
                    <img 
                      src="/lovable-uploads/6f6aaf60-65da-4127-b5d4-15e5e3327b26.png" 
                      alt="AI Coach" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}
              
              {/* Message bubble */}
              <div
                className={`rounded-lg p-4 ${
                  message.type === 'user'
                    ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/20'
                    : 'bg-gradient-to-r from-teal-950/40 to-teal-900/30 text-gray-200 border border-teal-800/30 shadow-lg'
                }`}
              >
                {message.type === 'ai' && (
                  <div className="text-xs text-teal-400 font-medium mb-2">AI COACH</div>
                )}
                <p className="text-sm leading-relaxed">{message.content}</p>
                <p className={`text-xs mt-2 ${
                  message.type === 'user' ? 'text-teal-200' : 'text-teal-400'
                }`}>
                  {message.timestamp}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input area */}
      <div className="border-t border-teal-900/30 bg-gradient-to-r from-teal-950/10 to-transparent p-6">
        {isLimitReached ? (
          <div className="text-center py-6">
            <div className="mb-4">
              <div className="inline-block p-3 rounded-full bg-gradient-to-br from-orange-500/20 to-red-500/20 mb-3">
                <Brain className="w-6 h-6 text-orange-400" />
              </div>
              <h3 className="text-lg font-bold text-orange-400 mb-2">Unlock Your Potential</h3>
              <p className="text-gray-400 mb-4 text-sm">
                Get unlimited AI coaching and personalized training programs
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold"
                onClick={handleGetTokens}
              >
                <Zap className="w-4 h-4 mr-2" />
                Get Tokens & Train Unlimited
              </Button>
              <Button
                variant="outline"
                className="border-neon-green text-neon-green hover:bg-neon-green/10"
                onClick={() => window.open('https://whop.com/futmatrix', '_blank')}
              >
                <Coins className="w-4 h-4 mr-2" />
                Subscribe Instead
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex space-x-4">
              <div className="flex-1">
                <Textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask your AI Coach anything... training tips, strategies, gameplay analysis"
                  className="min-h-[60px] bg-matrix-dark border-teal-800/30 text-white placeholder-gray-400 focus:border-teal-600 focus:ring-teal-600/20 resize-none"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
              </div>
              <div className="flex flex-col space-y-2">
                <Button
                  onClick={handleSendMessage}
                  className="bg-teal-600 hover:bg-teal-700 text-white px-6 shadow-lg hover:shadow-teal-600/20 transition-all"
                  disabled={!inputMessage.trim()}
                >
                  <Send className="w-4 h-4" />
                </Button>
                <Button
                  onClick={toggleListening}
                  variant="outline"
                  className={`px-6 border-teal-600 transition-all ${
                    isListening 
                      ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/20' 
                      : 'text-teal-400 hover:bg-teal-950/30'
                  }`}
                >
                  {isListening ? <Square className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </Button>
              </div>
            </div>
            
            {/* Suggestion chips */}
            <div className="mt-4 flex flex-wrap gap-2">
              {['Improve my defense', 'Attacking strategies', 'Training drills', 'Match analysis'].map((suggestion) => (
                <Button
                  key={suggestion}
                  variant="outline"
                  size="sm"
                  className="text-xs border-teal-700 text-teal-300 hover:bg-teal-950/30 hover:border-teal-600 transition-all"
                  onClick={() => setInputMessage(suggestion)}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CoachChatInterface;
