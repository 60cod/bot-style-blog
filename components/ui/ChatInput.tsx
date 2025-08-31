import { Send } from 'lucide-react';

export function ChatInput() {
  return (
    <div className="p-6 border-t border-gray-200 bg-gray-50">
      <div className="flex gap-2">
        <input
          disabled
          placeholder="Click the button..."
          className="flex-1 bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-400"
        />
        <button 
          disabled 
          className="w-10 h-10 bg-gray-300 rounded-md flex items-center justify-center text-gray-500"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}