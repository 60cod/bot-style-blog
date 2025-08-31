'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  isBot: boolean;
  buttons?: string[];
  isFullWidth?: boolean;
  selectedSection?: string;
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello, I'm Yugyeong Na. What would you like to explore?",
      isBot: true
    }
  ]);
  const [showInitialButtons, setShowInitialButtons] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleButtonClick = (section: string) => {
    // Hide initial buttons and expand chatbot
    setShowInitialButtons(false);
    setIsExpanded(true);
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: section,
      isBot: false
    };

    // Add bot response with full width
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: "",
      isBot: true,
      isFullWidth: true,
      selectedSection: section
    };

    setMessages(prev => [...prev, userMessage, botMessage]);
  };

  const handleBackToHome = () => {
    // Reset to initial state
    setIsExpanded(false);
    setShowInitialButtons(true);
    setMessages([
      {
        id: "1",
        content: "Hello, I'm Yugyeong Na. What would you like to explore?",
        isBot: true
      }
    ]);
  };

  return (
    <div className="size-full flex items-center justify-center bg-gray-50 p-4">
      <div className={`flex flex-col shadow-lg border border-gray-200 transition-all duration-500 ease-in-out rounded-lg bg-white ${
        isExpanded ? "w-[1000px] h-[1200px]" : "w-[600px] h-[900px]"
      }`}>
        {/* Header */}
        <div className="flex items-center gap-3 p-6 border-b border-gray-200 bg-gray-50">
          <div className="w-10 h-10 rounded-full text-white flex items-center justify-center font-medium" style={{backgroundColor: '#030213'}}>
            YN
          </div>
          <div>
            <h2 className="font-medium">Yugyeong Na</h2>
            <p className="text-gray-600 text-sm">Online</p>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
              >
                {message.isFullWidth ? (
                  <div className="w-full h-full min-h-[820px] bg-gray-100 rounded-lg p-4 flex items-center justify-center">
                    <div className="text-center">
                      <h3 className="mb-2">Loading {message.selectedSection}...</h3>
                      <p className="text-gray-600">
                        This area will display the {message.selectedSection} content.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-3 ${
                      message.isBot
                        ? "bg-gray-100 text-gray-900"
                        : "text-white"
                    }`}
                    style={!message.isBot ? {backgroundColor: '#030213'} : {}}
                  >
                    <p>{message.content}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Initial Navigation Buttons - Outside message bubbles */}
          {showInitialButtons && (
            <div className="flex gap-3 justify-left mt-6 flex-wrap">
              {["Articles", "Projects", "About", "Contact"].map((button) => (
                <button
                  key={button}
                  onClick={() => handleButtonClick(button)}
                  className="text-sm h-9 px-4 bg-white border border-gray-300 rounded-md hover:bg-gray-50 shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  {button}
                </button>
              ))}
            </div>
          )}

          {/* Back to Home Button - Shows when expanded */}
          {isExpanded && !showInitialButtons && (
            <div className="flex justify-left mt-6">
              <button
                onClick={handleBackToHome}
                className="text-sm h-9 px-4 bg-white border border-gray-300 rounded-md hover:bg-gray-50 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                Back to Home
              </button>
            </div>
          )}
        </div>

        {/* Input Area */}
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
      </div>
    </div>
  );
}