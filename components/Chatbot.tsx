'use client';

import { Message } from '@/types';
import { CHATBOT_DIMENSIONS } from '@/constants';
import { useChatbot } from '@/hooks/useChatbot';
import { Avatar } from './ui/Avatar';
import { MessageBubble } from './ui/MessageBubble';
import { NavigationButtons } from './ui/NavigationButtons';
import { NavigationButton } from './ui/NavigationButton';
import { ChatInput } from './ui/ChatInput';

export default function Chatbot() {
  const {
    messages,
    showInitialButtons,
    isExpanded,
    handleSectionClick,
    handleBackToHome
  } = useChatbot();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4">
      <div className={`flex flex-col shadow-lg border border-gray-200 transition-all duration-500 ease-in-out rounded-lg bg-white ${
        isExpanded ? "w-[1000px] h-[1200px]" : "w-[600px] h-[900px]"
      }`}>
        
        {/* Header */}
        <div className="flex items-center gap-3 p-4 border-b border-gray-200 bg-gray-50">
          <Avatar 
            initials="YN" 
            name="Yugyeong Na" 
            status="Online" 
          />
        </div>

        {/* Messages Area */}
        <div className="flex-1 p-6">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
              >
                <MessageBubble message={message} />
              </div>
            ))}
          </div>
          
          {/* Initial Navigation Buttons */}
          {showInitialButtons && (
            <NavigationButtons onSectionClick={handleSectionClick} />
          )}

          {/* Return Button */}
          {isExpanded && !showInitialButtons && (
            <div className="flex justify-left mt-3">
              <NavigationButton onClick={handleBackToHome}>
                Return
              </NavigationButton>
            </div>
          )}
        </div>

        {/* Input Area */}
        <ChatInput />
      </div>
    </div>
  );
}