import { Message } from '@/types';
import { BRAND_COLORS } from '@/constants';
import { ArticlesPage } from '../ArticlesPage';
import { NavigationButton } from './NavigationButton';

interface MessageBubbleProps {
  message: Message;
  onReturnClick?: () => void;
  onAboutButtonClick?: (buttonText: string) => void;
}

export function MessageBubble({ message, onReturnClick, onAboutButtonClick }: MessageBubbleProps) {
  // Check if this is a bot message with full width capability
  if (message.isBot && 'isFullWidth' in message && message.isFullWidth) {
    // Articles 섹션인 경우 실제 페이지 렌더링
    if (message.selectedSection === 'Articles') {
      return (
        <div 
          className="w-full bg-white rounded-2xl rounded-bl-none overflow-y-auto"
          style={{ height: '810px' }}
        >
          <ArticlesPage />
        </div>
      );
    }

    // 다른 섹션들은 기본 로딩 화면
    return (
      <div 
        className="w-full bg-gray-100 rounded-2xl rounded-bl-none p-4 flex items-center justify-center overflow-y-auto"
        style={{ height: '810px' }}
      >
        <div className="text-center">
          <h3 className="mb-2">Loading {message.selectedSection}...</h3>
          <p className="text-gray-600">
            This area will display the {message.selectedSection} content.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[80%]">
      {/* Message bubble with timestamp */}
      <div
        className={`flex items-end gap-2 ${
          message.isBot ? "justify-start" : ""
        }`}
      >
        <div
          className={`rounded-2xl px-4 py-3 text-sm ${
            message.isBot
              ? "rounded-bl-none bg-gray-100 text-gray-900"
              : "rounded-br-none text-white"
          }`}
          style={!message.isBot ? { backgroundColor: BRAND_COLORS.primary } : {}}
        >
          <p className="whitespace-pre-wrap">{message.content}</p>
        </div>

        {message.timestamp && (
            <span className="text-xs text-gray-400 whitespace-nowrap">
            {message.timestamp}
          </span>
        )}
      </div>

      {/* About navigation buttons */}
      {message.isBot && 'buttons' in message && message.buttons && message.buttons.some(btn => ['Experience', 'Education', 'Technical Skills', 'Social'].includes(btn)) && onAboutButtonClick && (
        <div className="mt-3">
          <div className="flex flex-wrap gap-2">
            {message.buttons.filter(btn => ['Experience', 'Education', 'Technical Skills', 'Social'].includes(btn)).map((buttonText) => (
              <NavigationButton key={buttonText} onClick={() => onAboutButtonClick(buttonText)}>
                {buttonText}
              </NavigationButton>
            ))}
          </div>
          {/* Return Button for About section */}
          {onReturnClick && (
            <div className="flex justify-start mt-2">
              <NavigationButton onClick={onReturnClick}>
                Return
              </NavigationButton>
            </div>
          )}
        </div>
      )}

      {/* Return Button for bot messages */}
      {message.isBot && 'buttons' in message && message.buttons?.includes('Return') && onReturnClick && (
        <div className="flex justify-start mt-2">
          <NavigationButton onClick={onReturnClick}>
            Return
          </NavigationButton>
        </div>
      )}
    </div>
  );
}