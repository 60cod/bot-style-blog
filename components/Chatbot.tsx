'use client';

import { useRef, useEffect } from 'react';
import { Message } from '@/types';
import { CHATBOT_DIMENSIONS } from '@/constants';
import { useChatbot } from '@/hooks/useChatbot';
import { Avatar } from './ui/Avatar';
import { MessageBubble } from './ui/MessageBubble';
import { NavigationButtons } from './ui/NavigationButtons';
import { NavigationButton } from './ui/NavigationButton';
import { ChatInput } from './ui/ChatInput';
import { ConfirmationButtons } from './ui/ConfirmationButtons';

export default function Chatbot() {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const {
    messages,
    showInitialButtons,
    isExpanded,
    isInputEnabled,
    contactStep,
    aboutStep,
    isEmailSending,
    handleSectionClick,
    handleAboutButtonClick,
    handleBackToHome,
    handleSendMessage,
    handleConfirmSend,
    handleCancelSend
  } = useChatbot();

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messages]);

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
        <div className="flex-1 p-6 overflow-auto" ref={messagesEndRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
              >
                <MessageBubble 
                  message={message} 
                  onReturnClick={handleBackToHome}
                  onAboutButtonClick={handleAboutButtonClick}
                />
              </div>
            ))}
          </div>
          
          {/* Initial Navigation Buttons */}
          {showInitialButtons && (
            <NavigationButtons onSectionClick={handleSectionClick} />
          )}

          {/* Return Button for expanded sections (not Contact or About) */}
          {isExpanded && !showInitialButtons && contactStep === null && aboutStep === null && (
            <div className="flex justify-left mt-3">
              <NavigationButton onClick={handleBackToHome}>
                Return
              </NavigationButton>
            </div>
          )}

          {/* Confirmation Buttons for Contact workflow */}
          {contactStep === 'confirmation' && (
            <div className="flex justify-start mt-3">
              <ConfirmationButtons 
                onConfirm={handleConfirmSend}
                onCancel={handleCancelSend}
                disabled={isEmailSending}
              />
            </div>
          )}
        </div>

        {/* Input Area */}
        <ChatInput 
          isEnabled={isInputEnabled}
          placeholder={
            contactStep === 'email' ? "Enter your email address..." :
            contactStep === 'message' ? "Enter your message..." :
            "Click the button..."
          }
          onSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
}