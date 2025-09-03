import { useState } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  isEnabled: boolean;
  placeholder?: string;
  onSendMessage: (message: string) => void;
}

export function ChatInput({ isEnabled, placeholder = "Click the button...", onSendMessage }: ChatInputProps) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && isEnabled) {
      onSendMessage(inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="p-4 border-t border-gray-200 bg-gray-50">
      <form onSubmit={handleSubmit}>
        <div className="flex gap-2">
          <input
            disabled={!isEnabled}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={isEnabled ? placeholder : "Click the button..."}
            className={`flex-1 text-sm bg-white border border-gray-300 rounded-md px-3 py-2 ${
              isEnabled ? 'text-gray-900' : 'text-gray-400'
            }`}
          />
          <button 
            type="submit"
            disabled={!isEnabled || !inputValue.trim()} 
            className={`w-10 h-10 rounded-md flex items-center justify-center ${
              isEnabled && inputValue.trim() 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-gray-300 text-gray-500'
            }`}
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </form>
      <div className="text-center mt-2 text-xs text-gray-400">
          Created by zz6cod@gmail.com
      </div>
    </div>
  );
}