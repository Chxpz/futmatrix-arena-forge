
import { useState } from 'react';
import CoachUserStatsHeader from '@/components/ai-coach/CoachUserStatsHeader';
import CoachDisplaySection from '@/components/ai-coach/CoachDisplaySection';
import CoachChatInterface from '@/components/ai-coach/CoachChatInterface';

interface Message {
  id: number;
  type: 'ai' | 'user';
  content: string;
  timestamp: string;
}

const AICoach = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'ai',
      content: "🧠 Welcome to your personalized training center! I'm your AI Coach - I've analyzed thousands of gameplay patterns and I'm here to elevate your skills to the next level. What aspect of your game would you like to improve today?",
      timestamp: new Date().toLocaleTimeString(),
    }
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-matrix-darker via-teal-950/20 to-matrix-darker">
      <div className="flex flex-col h-screen">
        <CoachUserStatsHeader />
        
        <div className="flex-1 flex flex-col lg:flex-row">
          {/* Main Content Area */}
          <div className="flex-1 flex flex-col lg:flex-row">
            <CoachDisplaySection />
            <CoachChatInterface messages={messages} setMessages={setMessages} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AICoach;
