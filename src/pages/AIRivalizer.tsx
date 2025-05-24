
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
      {/* Header with Rivalizer avatar and enhanced presence */}
      <div className="border-b border-red-900/30 bg-gradient-to-r from-red-950/20 to-transparent">
        <div className="p-6">
          <div className="flex items-center space-x-6">
            {/* Rivalizer Avatar */}
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-600 to-red-800 p-1 shadow-2xl shadow-red-600/30">
                <div className="w-full h-full rounded-full overflow-hidden border-2 border-red-400/30">
                  <img 
                    src="/lovable-uploads/cfd8bdf3-3acb-4ad6-a468-6dfb6796cc93.png" 
                    alt="Rivalizer AI Agent" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              {/* Active status indicator */}
              <div className="absolute -bottom-1 -right-1 flex items-center">
                <div className="w-6 h-6 bg-red-500 rounded-full animate-ping absolute"></div>
                <div className="w-6 h-6 bg-red-400 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Agent Info */}
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-3xl font-bold text-white">Rivalizer</h1>
                <div className="px-3 py-1 bg-red-600/20 border border-red-500/30 rounded-full">
                  <span className="text-red-300 text-sm font-medium">● ONLINE</span>
                </div>
              </div>
              <p className="text-red-300 font-medium text-lg">Your Personal Competition Agent</p>
              <p className="text-gray-400 text-sm">Analyzing opponents • Creating challenges • Maximizing your wins</p>
            </div>

            {/* Agent Stats */}
            <div className="hidden lg:flex space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-400">247</div>
                <div className="text-xs text-gray-400">Matches Arranged</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-400">89%</div>
                <div className="text-xs text-gray-400">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row h-[calc(100vh-160px)]">
        {/* Enhanced Sidebar */}
        <div className="lg:w-80 border-r border-red-900/30 bg-gradient-to-b from-red-950/10 to-transparent p-6 space-y-6">
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

          {/* Competition Status */}
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

        {/* Enhanced Chat Interface */}
        <div className="flex-1 flex flex-col">
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

          {/* Enhanced Input area */}
          <div className="border-t border-red-900/30 bg-gradient-to-r from-red-950/10 to-transparent p-6">
            <div className="flex space-x-4">
              <div className="flex-1">
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask me about opponents, strategies, or challenges..."
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
            
            {/* Enhanced suggestion chips */}
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
  );
};

export default AIRivalizer;
