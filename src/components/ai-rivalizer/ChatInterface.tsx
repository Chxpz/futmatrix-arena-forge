
import { useState } from 'react';
import { Button } from '@/components/ui/button';
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
  onSendMessage?: () => void;
  interactionLimit?: number;
}

const ChatInterface = ({ 
  messages, 
  setMessages, 
  onSendMessage,
  interactionLimit
}: ChatInterfaceProps) => {
  const [message, setMessage] = useState('');
  const [isListening, setIsListening] = useState(false);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // Check interaction limit
    if (interactionLimit !== undefined && interactionLimit <= 0) {
      return;
    }

    const newMessage = {
      id: messages.length + 1,
      type: 'user' as const,
      content: message,
      timestamp: new Date().toLocaleTimeString(),
    };

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setMessage('');

    // Call the interaction callback if provided
    if (onSendMessage) {
      onSendMessage();
    }

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "🎯 Excellent question! I've analyzed the competitive landscape and found some worthy opponents for you. Based on your skill level, I recommend challenging players in the #150-200 rank range.",
        "🔥 Perfect timing! I see some high-value matches available right now. There's a player with similar stats to yours looking for a challenge - want me to set up the connection?",
        "⚡ Smart strategy thinking! For your next match, focus on exploiting your opponent's weak defensive positioning. I've identified their pattern from recent games.",
        "🏆 Great competitive mindset! I recommend warming up with a few skill drills before your next ranked match. Your peak performance window is typically in the evening sessions.",
      ];

      const aiResponse = {
        id: updatedMessages.length + 1,
        type: 'ai' as const,
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages([...updatedMessages, aiResponse]);
    }, 1000);
  };

  const toggleListening = () => {
    setIsListening(!isListening);
  };

  const isLimitReached = interactionLimit !== undefined && interactionLimit <= 0;

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
            <p className="text-red-400 text-sm">
              {interactionLimit !== undefined 
                ? `Ready to dominate the competition (${interactionLimit} interactions left)`
                : 'Ready to dominate the competition'
              }
            </p>
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
      <div className="border-t border-red-900/30 bg-gradient-to-r from-red-950/10 to-transparent p-6">
        {isLimitReached ? (
          <div className="text-center py-4">
            <p className="text-gray-400 mb-4">You've reached your preview interaction limit</p>
            <Button
              className="bg-neon-green text-black hover:bg-neon-green/90"
              onClick={() => window.open('https://whop.com/futmatrix', '_blank')}
            >
              Get Full Access
            </Button>
          </div>
        ) : (
          <ChatInput
            message={message}
            setMessage={setMessage}
            isListening={isListening}
            onSendMessage={handleSendMessage}
            onToggleListening={toggleListening}
          />
        )}
      </div>
    </div>
  );
};

export default ChatInterface;
