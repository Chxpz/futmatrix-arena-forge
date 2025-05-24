
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
      content: "🔥 Welcome, champion! I'm the Rivalizer AI - your competitive edge in the arena. Ready to find your next challenge and dominate the competition?",
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
      {/* Header with red accents */}
      <div className="border-b border-red-900/30 bg-gradient-to-r from-red-950/20 to-transparent">
        <div className="p-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center shadow-lg shadow-red-600/20">
                <Flame className="w-8 h-8 text-white animate-pulse" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-400 rounded-full"></div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">AI Rivalizer</h1>
              <p className="text-red-300 font-medium">Your Competitive Intelligence Agent</p>
              <p className="text-gray-400 text-sm">Find opponents • Create challenges • Dominate matches</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row h-[calc(100vh-140px)]">
        {/* Sidebar with competition stats */}
        <div className="lg:w-80 border-r border-red-900/30 bg-gradient-to-b from-red-950/10 to-transparent p-6 space-y-4">
          <h3 className="text-lg font-semibold text-red-300 flex items-center">
            <Trophy className="w-5 h-5 mr-2" />
            Competition Status
          </h3>
          
          <div className="space-y-3">
            <Card className="p-4 bg-red-950/20 border-red-800/30">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Active Challenges</span>
                <span className="text-red-400 font-bold text-lg">3</span>
              </div>
            </Card>
            
            <Card className="p-4 bg-red-950/20 border-red-800/30">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Win Streak</span>
                <span className="text-red-400 font-bold text-lg">7</span>
              </div>
            </Card>
            
            <Card className="p-4 bg-red-950/20 border-red-800/30">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Rank Position</span>
                <span className="text-red-400 font-bold text-lg">#42</span>
              </div>
            </Card>
          </div>

          <div className="pt-4">
            <h4 className="text-md font-medium text-red-300 mb-3 flex items-center">
              <Target className="w-4 h-4 mr-2" />
              Quick Actions
            </h4>
            <div className="space-y-2">
              <Button className="w-full bg-red-600 hover:bg-red-700 text-white border-red-500">
                Find Opponent
              </Button>
              <Button variant="outline" className="w-full border-red-600 text-red-400 hover:bg-red-950/30">
                View Challenges
              </Button>
              <Button variant="outline" className="w-full border-red-600 text-red-400 hover:bg-red-950/30">
                Match History
              </Button>
            </div>
          </div>
        </div>

        {/* Chat interface */}
        <div className="flex-1 flex flex-col">
          {/* Messages area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-4 ${
                    msg.type === 'user'
                      ? 'bg-red-600 text-white'
                      : 'bg-gradient-to-r from-red-950/30 to-red-900/20 text-gray-200 border border-red-800/30'
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                  <p className={`text-xs mt-2 ${
                    msg.type === 'user' ? 'text-red-200' : 'text-red-400'
                  }`}>
                    {msg.timestamp}
                  </p>
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
                  placeholder="Ask the Rivalizer AI about opponents, strategies, or challenges..."
                  className="min-h-[60px] bg-matrix-dark border-red-800/30 text-white placeholder-gray-400 focus:border-red-600 focus:ring-red-600/20"
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
                  className="bg-red-600 hover:bg-red-700 text-white px-6"
                  disabled={!message.trim()}
                >
                  <Send className="w-4 h-4" />
                </Button>
                <Button
                  onClick={toggleListening}
                  variant="outline"
                  className={`px-6 border-red-600 ${
                    isListening 
                      ? 'bg-red-600 text-white' 
                      : 'text-red-400 hover:bg-red-950/30'
                  }`}
                >
                  {isListening ? <Square className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </Button>
              </div>
            </div>
            
            <div className="mt-3 flex flex-wrap gap-2">
              {['Find strong opponents', 'Challenge analysis', 'Winning strategies', 'Rank progression'].map((suggestion) => (
                <Button
                  key={suggestion}
                  variant="outline"
                  size="sm"
                  className="text-xs border-red-700 text-red-300 hover:bg-red-950/30"
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
