
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Bot, User } from 'lucide-react';

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

  return (
    <div className="lg:w-1/2 flex flex-col bg-gradient-to-br from-matrix-darker via-teal-950/5 to-matrix-darker">
      {/* Chat Header */}
      <div className="p-6 border-b border-teal-900/30">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-teal-600/20 border border-teal-500/30 flex items-center justify-center">
            <Bot className="w-5 h-5 text-teal-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">AI Coach Chat</h2>
            <p className="text-sm text-gray-400">Personal training and gameplay analysis</p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-lg p-4 ${
              message.type === 'user' 
                ? 'bg-teal-600/20 border border-teal-500/30' 
                : 'bg-matrix-dark border border-teal-900/30'
            }`}>
              <div className="flex items-center mb-2">
                {message.type === 'ai' ? (
                  <Bot className="w-4 h-4 text-teal-400 mr-2" />
                ) : (
                  <User className="w-4 h-4 text-gray-400 mr-2" />
                )}
                <span className="text-xs text-gray-400">{message.timestamp}</span>
              </div>
              <p className="text-sm text-white">{message.content}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-6 border-t border-teal-900/30">
        <div className="flex space-x-3">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask your AI Coach anything..."
            className="bg-matrix-dark border-teal-900/30 text-white placeholder-gray-400 focus:border-teal-500/50"
          />
          <Button 
            onClick={handleSendMessage}
            className="bg-teal-600 hover:bg-teal-700 text-white px-6"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CoachChatInterface;
