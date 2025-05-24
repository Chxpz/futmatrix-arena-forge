
import { useState } from 'react';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';

interface Message {
  id: number;
  type: 'ai' | 'user';
  content: string;
  timestamp: string;
}

interface ChatInterfaceProps {
  messages: Message[];
  setMessages: (messages: Message[]) => void;
}

const ChatInterface = ({ messages, setMessages }: ChatInterfaceProps) => {
  const [message, setMessage] = useState('');
  const [isListening, setIsListening] = useState(false);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      type: 'user' as const,
      content: message,
      timestamp: new Date().toLocaleTimeString(),
    };

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setMessage('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: updatedMessages.length + 1,
        type: 'ai' as const,
        content: "🎯 Excellent question! Let me analyze the competitive landscape and find you the perfect opponent. Based on your skill level and recent performance, I have some exciting match proposals...",
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages([...updatedMessages, aiResponse]);
    }, 1000);
  };

  const toggleListening = () => {
    setIsListening(!isListening);
  };

  return (
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
          <MessageBubble key={msg.id} message={msg} />
        ))}
      </div>

      {/* Input area */}
      <ChatInput
        message={message}
        setMessage={setMessage}
        isListening={isListening}
        onSendMessage={handleSendMessage}
        onToggleListening={toggleListening}
      />
    </div>
  );
};

export default ChatInterface;
