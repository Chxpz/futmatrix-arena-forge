
interface Message {
  id: number;
  type: 'ai' | 'user';
  content: string;
  timestamp: string;
}

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble = ({ message }: MessageBubbleProps) => {
  return (
    <div className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start space-x-3`}>
        {/* Avatar */}
        {message.type === 'ai' && (
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
            message.type === 'user'
              ? 'bg-red-600 text-white shadow-lg shadow-red-600/20'
              : 'bg-gradient-to-r from-red-950/40 to-red-900/30 text-gray-200 border border-red-800/30 shadow-lg'
          }`}
        >
          {message.type === 'ai' && (
            <div className="text-xs text-red-400 font-medium mb-2">RIVALIZER</div>
          )}
          <p className="text-sm leading-relaxed">{message.content}</p>
          <p className={`text-xs mt-2 ${
            message.type === 'user' ? 'text-red-200' : 'text-red-400'
          }`}>
            {message.timestamp}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
