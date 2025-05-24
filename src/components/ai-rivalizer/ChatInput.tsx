
import { Send, Mic, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface ChatInputProps {
  message: string;
  setMessage: (message: string) => void;
  isListening: boolean;
  onSendMessage: () => void;
  onToggleListening: () => void;
}

const ChatInput = ({ 
  message, 
  setMessage, 
  isListening, 
  onSendMessage, 
  onToggleListening 
}: ChatInputProps) => {
  return (
    <div className="border-t border-red-900/30 bg-gradient-to-r from-red-950/10 to-transparent p-6">
      <div className="flex space-x-4">
        <div className="flex-1">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Challenge the Rivalizer... Ask about opponents, strategies, or matches"
            className="min-h-[60px] bg-matrix-dark border-red-800/30 text-white placeholder-gray-400 focus:border-red-600 focus:ring-red-600/20 resize-none"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                onSendMessage();
              }
            }}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <Button
            onClick={onSendMessage}
            className="bg-red-600 hover:bg-red-700 text-white px-6 shadow-lg hover:shadow-red-600/20 transition-all"
            disabled={!message.trim()}
          >
            <Send className="w-4 h-4" />
          </Button>
          <Button
            onClick={onToggleListening}
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
      
      {/* Suggestion chips */}
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
  );
};

export default ChatInput;
