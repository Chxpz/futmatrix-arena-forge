
import { useState, useRef, useEffect } from 'react';
import { 
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, User, Bot } from 'lucide-react';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
};

const Coach = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your AI Coach. I\'ve analyzed your recent matches and I\'m ready to help you improve your EAFC25 gameplay. What would you like to work on today?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response (replace with your backend API call)
    setTimeout(() => {
      const responses = [
        "Based on your recent matches, I've noticed that you're struggling with defensive positioning. Try using the jockey button (L2/LT) more when defending in 1v1 situations.",
        "I analyzed your shot statistics and you have a 35% conversion rate. That's good, but we can improve by practicing power shots from just outside the box. This will add more variety to your attacking options.",
        "Let's work on your build-up play. I've prepared a custom drill that focuses on quick passes and movement. Would you like to see it?",
        "Your counterattacking is excellent! You're in the top 15% of players for goals scored on the break. Let's maintain that strength while working on your possession game.",
      ];

      const aiResponse: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">AI Coach</h1>
        <p className="text-sm text-gray-400 mt-1">Get personalized training and analysis for your gameplay</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Coach chat */}
        <Card className="lg:col-span-3 bg-matrix-dark border-matrix-gray/30 flex flex-col h-[calc(100vh-12rem)]">
          <CardHeader>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-neon-green/20 flex items-center justify-center mr-3">
                <Bot className="h-4 w-4 text-neon-green" />
              </div>
              <div>
                <CardTitle>Coach Chat</CardTitle>
                <CardDescription>Chat with your AI Coach for gameplay advice</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-hidden flex flex-col">
            <div className="flex-1 overflow-y-auto pr-2 space-y-4">
              {messages.map((message) => (
                <div 
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === 'user' 
                        ? 'bg-neon-green/10 border border-neon-green/30 text-white' 
                        : 'bg-matrix-darker border border-matrix-gray/30'
                    }`}
                  >
                    <div className="flex items-center mb-1">
                      {message.role === 'assistant' ? (
                        <Bot className="h-4 w-4 mr-2 text-neon-green" />
                      ) : (
                        <User className="h-4 w-4 mr-2 text-gray-400" />
                      )}
                      <span className="text-xs text-gray-400">
                        {message.role === 'assistant' ? 'AI Coach' : 'You'}
                      </span>
                      <span className="ml-auto text-xs text-gray-500">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-matrix-darker border border-matrix-gray/30 rounded-lg p-3 max-w-[80%]">
                    <div className="flex items-center space-x-2">
                      <Bot className="h-4 w-4 text-neon-green" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            <div className="mt-4 pt-4 border-t border-matrix-gray/20">
              <div className="flex items-center space-x-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask your AI Coach a question..."
                  className="bg-matrix-darker border-matrix-gray/30"
                />
                <Button 
                  onClick={handleSendMessage} 
                  className="bg-neon-green text-black hover:bg-neon-green/90 px-4"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Training recommendations */}
        <Card className="bg-matrix-dark border-matrix-gray/30">
          <CardHeader>
            <CardTitle>Training Focus</CardTitle>
            <CardDescription>Based on your recent performance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium mb-1">Skill Areas to Improve</p>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between items-center text-xs mb-1">
                      <span>Defensive Positioning</span>
                      <span className="text-neon-green">Priority</span>
                    </div>
                    <div className="w-full bg-matrix-gray/20 rounded-full h-1.5">
                      <div className="bg-neon-green h-1.5 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center text-xs mb-1">
                      <span>Power Shot Accuracy</span>
                      <span className="text-neon-green">High</span>
                    </div>
                    <div className="w-full bg-matrix-gray/20 rounded-full h-1.5">
                      <div className="bg-neon-green h-1.5 rounded-full" style={{ width: '70%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center text-xs mb-1">
                      <span>Build-up Play</span>
                      <span className="text-neon-green">Medium</span>
                    </div>
                    <div className="w-full bg-matrix-gray/20 rounded-full h-1.5">
                      <div className="bg-neon-green h-1.5 rounded-full" style={{ width: '55%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center text-xs mb-1">
                      <span>Set Pieces</span>
                      <span className="text-neon-green">Low</span>
                    </div>
                    <div className="w-full bg-matrix-gray/20 rounded-full h-1.5">
                      <div className="bg-neon-green h-1.5 rounded-full" style={{ width: '30%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-3 rounded-md bg-matrix-darker border border-matrix-gray/30">
                <p className="text-sm font-medium mb-2">This Week's Focus</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="text-neon-green mr-2">•</span>
                    <span>Practice jockey defending in 1v1 situations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-neon-green mr-2">•</span>
                    <span>Improve power shot accuracy from outside the box</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-neon-green mr-2">•</span>
                    <span>Work on quick transitions from defense to attack</span>
                  </li>
                </ul>
              </div>
              
              <Button 
                variant="outline" 
                className="w-full mt-2 border-neon-green/30 text-neon-green hover:bg-neon-green/10"
              >
                View Training Plan
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Coach;
