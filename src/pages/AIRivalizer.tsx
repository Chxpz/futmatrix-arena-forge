
import { useState } from 'react';
import { Send, Mic, Square, Flame, Trophy, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';

const AIRivalizer = () => {
  const [message, setMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: "🔥 Welcome, champion! I'm the Rivalizer - your competitive edge in the arena. Ready to find your next challenge and dominate the competition?",
      timestamp: new Date().toLocaleTimeString(),
    }
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      type: 'user',
      content: message,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages([...messages, newMessage]);
    setMessage('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        type: 'ai',
        content: "🎯 Excellent question! Let me analyze the competitive landscape and find you the perfect opponent. Based on your skill level and recent performance, I have some exciting match proposals...",
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const toggleListening = () => {
    setIsListening(!isListening);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-matrix-darker via-red-950/20 to-matrix-darker">
      <div className="flex flex-col lg:flex-row h-screen">
        {/* Sidebar with Competition Stats at top */}
        <div className="lg:w-80 border-r border-red-900/30 bg-gradient-to-b from-red-950/10 to-transparent p-6 space-y-6 overflow-y-auto">
          {/* Competition Status - Moved to top */}
          <div>
            <h3 className="text-lg font-semibold text-red-300 flex items-center mb-4">
              <Trophy className="w-5 h-5 mr-2" />
              Your Competition Stats
            </h3>
            
            <div className="space-y-3">
              <Card className="p-4 bg-red-950/20 border-red-800/30 hover:bg-red-950/30 transition-colors">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Active Challenges</span>
                  <span className="text-red-400 font-bold text-lg">3</span>
                </div>
              </Card>
              
              <Card className="p-4 bg-red-950/20 border-red-800/30 hover:bg-red-950/30 transition-colors">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Win Streak</span>
                  <span className="text-red-400 font-bold text-lg">7</span>
                </div>
              </Card>
              
              <Card className="p-4 bg-red-950/20 border-red-800/30 hover:bg-red-950/30 transition-colors">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Rank Position</span>
                  <span className="text-red-400 font-bold text-lg">#42</span>
                </div>
              </Card>
            </div>
          </div>

          {/* Rivalizer's Current Focus */}
          <div className="bg-gradient-to-r from-red-950/30 to-red-900/20 border border-red-800/30 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-red-300 flex items-center mb-3">
              <Flame className="w-5 h-5 mr-2 animate-pulse" />
              Current Focus
            </h3>
            <p className="text-gray-300 text-sm">
              "Scanning for opponents matching your skill level... 
              <span className="text-red-400 font-medium"> 3 potential matches found!</span>"
            </p>
          </div>

          {/* Quick Actions */}
          <div>
            <h4 className="text-md font-medium text-red-300 mb-3 flex items-center">
              <Target className="w-4 h-4 mr-2" />
              Quick Actions
            </h4>
            <div className="space-y-2">
              <Button className="w-full bg-red-600 hover:bg-red-700 text-white border-red-500 transition-all hover:shadow-lg hover:shadow-red-600/20">
                Find Opponent
              </Button>
              <Button variant="outline" className="w-full border-red-600 text-red-400 hover:bg-red-950/30 transition-all">
                View Challenges
              </Button>
              <Button variant="outline" className="w-full border-red-600 text-red-400 hover:bg-red-950/30 transition-all">
                Match History
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col lg:flex-row">
          {/* Massive Rivalizer Agent Display */}
          <div className="lg:w-1/2 border-r border-red-900/30 bg-gradient-to-br from-red-950/20 to-red-900/10 flex flex-col items-center justify-center p-8 relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 bg-gradient-radial from-red-600/10 via-transparent to-transparent opacity-60"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(239,68,68,0.1),transparent_50%)]"></div>
            
            {/* Main Agent Container */}
            <div className="relative z-10 flex flex-col items-center space-y-6">
              {/* Status Header */}
              <div className="text-center mb-4">
                <h1 className="text-4xl font-bold text-white mb-2 glow-text">RIVALIZER</h1>
                <div className="flex items-center justify-center space-x-3">
                  <div className="px-4 py-2 bg-red-600/20 border border-red-500/30 rounded-full">
                    <span className="text-red-300 font-medium flex items-center">
                      <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse mr-2"></div>
                      ONLINE & READY
                    </span>
                  </div>
                </div>
              </div>

              {/* Massive Agent Image */}
              <div className="relative">
                {/* Outer glow ring */}
                <div className="absolute -inset-8 bg-gradient-to-r from-red-600/30 via-red-500/40 to-red-600/30 rounded-full blur-2xl animate-pulse"></div>
                
                {/* Main image container */}
                <div className="relative w-80 h-80 rounded-full bg-gradient-to-br from-red-600 to-red-800 p-2 shadow-2xl shadow-red-600/50">
                  <div className="w-full h-full rounded-full overflow-hidden border-4 border-red-400/40 shadow-inner">
                    <img 
                      src="/lovable-uploads/cfd8bdf3-3acb-4ad6-a468-6dfb6796cc93.png" 
                      alt="Rivalizer AI Agent" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Floating status indicators */}
                <div className="absolute -top-4 -right-4 flex items-center space-x-2">
                  <div className="w-8 h-8 bg-red-500 rounded-full animate-ping absolute"></div>
                  <div className="w-8 h-8 bg-red-400 rounded-full flex items-center justify-center">
                    <Flame className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>

              {/* Agent Stats Display */}
              <div className="flex space-x-8 mt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-400">247</div>
                  <div className="text-sm text-gray-400">Matches Arranged</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-400">89%</div>
                  <div className="text-sm text-gray-400">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-400">24/7</div>
                  <div className="text-sm text-gray-400">Availability</div>
                </div>
              </div>

              {/* Agent Description */}
              <div className="text-center max-w-md">
                <p className="text-red-300 font-medium text-lg mb-2">Your Personal Competition Agent</p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Advanced AI engineered for competitive excellence. Analyzing opponents, creating strategic challenges, and maximizing your winning potential in every match.
                </p>
              </div>
            </div>
          </div>

          {/* Chat Interface */}
          <div className="lg:w-1/2 flex flex-col">
            {/* Chat Header */}
            <div className="border-b border-red-900/30 bg-gradient-to-r from-red-950/20 to-transparent p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-red-800 p-0.5">
                  <div className="w-full h-full rounded-full overflow-hidden border border-red-400/30">
                    <img 
                      src="/lovable-uploads/cfd8bdf3-3acb-4ad6-a468-6dfb6796cc93.png" 
                      alt="Rivalizer" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Chat with Rivalizer</h2>
                  <p className="text-red-400 text-sm">Ready to dominate the competition</p>
                </div>
              </div>
            </div>

            {/* Messages area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex max-w-[80%] ${msg.type === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start space-x-3`}>
                    {/* Avatar */}
                    {msg.type === 'ai' && (
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-red-800 p-0.5">
                        <div className="w-full h-full rounded-full overflow-hidden border border-red-400/30">
                          <img 
                            src="/lovable-uploads/cfd8bdf3-3acb-4ad6-a468-6dfb6796cc93.png" 
                            alt="Rivalizer" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    )}
                    
                    {/* Message bubble */}
                    <div
                      className={`rounded-lg p-4 ${
                        msg.type === 'user'
                          ? 'bg-red-600 text-white shadow-lg shadow-red-600/20'
                          : 'bg-gradient-to-r from-red-950/40 to-red-900/30 text-gray-200 border border-red-800/30 shadow-lg'
                      }`}
                    >
                      {msg.type === 'ai' && (
                        <div className="text-xs text-red-400 font-medium mb-2">RIVALIZER</div>
                      )}
                      <p className="text-sm leading-relaxed">{msg.content}</p>
                      <p className={`text-xs mt-2 ${
                        msg.type === 'user' ? 'text-red-200' : 'text-red-400'
                      }`}>
                        {msg.timestamp}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input area */}
            <div className="border-t border-red-900/30 bg-gradient-to-r from-red-950/10 to-transparent p-6">
              <div className="flex space-x-4">
                <div className="flex-1">
                  <Textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Challenge the Rivalizer... Ask about opponents, strategies, or matches"
                    className="min-h-[60px] bg-matrix-dark border-red-800/30 text-white placeholder-gray-400 focus:border-red-600 focus:ring-red-600/20 resize-none"
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
                    className="bg-red-600 hover:bg-red-700 text-white px-6 shadow-lg hover:shadow-red-600/20 transition-all"
                    disabled={!message.trim()}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={toggleListening}
                    variant="outline"
                    className={`px-6 border-red-600 transition-all ${
                      isListening 
                        ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' 
                        : 'text-red-400 hover:bg-red-950/30'
                    }`}
                  >
                    {isListening ? <Square className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
              
              {/* Suggestion chips */}
              <div className="mt-4 flex flex-wrap gap-2">
                {['Find strong opponents', 'Challenge analysis', 'Winning strategies', 'Rank progression'].map((suggestion) => (
                  <Button
                    key={suggestion}
                    variant="outline"
                    size="sm"
                    className="text-xs border-red-700 text-red-300 hover:bg-red-950/30 hover:border-red-600 transition-all"
                    onClick={() => setMessage(suggestion)}
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIRivalizer;
