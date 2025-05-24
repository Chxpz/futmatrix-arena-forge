
import { useState } from 'react';
import AgentDisplaySection from '@/components/ai-rivalizer/AgentDisplaySection';
import ChatInterface from '@/components/ai-rivalizer/ChatInterface';

interface Message {
  id: number;
  type: 'ai' | 'user';
  content: string;
  timestamp: string;
}

const AIRivalizer = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'ai',
      content: "🔥 Welcome, champion! I'm the Rivalizer - your competitive edge in the arena. Ready to find your next challenge and dominate the competition?",
      timestamp: new Date().toLocaleTimeString(),
    }
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-matrix-darker via-red-950/20 to-matrix-darker">
      <div className="flex flex-col lg:flex-row h-screen">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col lg:flex-row">
          <AgentDisplaySection />
          <ChatInterface messages={messages} setMessages={setMessages} />
        </div>
      </div>
    </div>
  );
};

export default AIRivalizer;
