
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Mic, Square, User } from 'lucide-react';

interface Message {
  id: number;
  type: 'ai' | 'user';
  content: string;
  timestamp: string;
}

interface CoachChatInterfaceProps {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

const CoachChatInterface = ({ messages, setMessages }: CoachChatInterfaceProps) => {
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: Date.now() + 1,
        type: 'ai',
        content: "I've analyzed your question and prepared a personalized training recommendation. Let me break down the key areas where you can improve your gameplay...",
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1500);
  };

  const toggleListening = () => {
    setIsListening(!isListening);
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
            <p className="text-teal-400 text-sm">Ready to elevate your gameplay</p>
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
      </div>
    </div>
  );
};

export default CoachChatInterface;
