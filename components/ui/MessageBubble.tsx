import { Message } from '@/types';
import { BRAND_COLORS } from '@/constants';
import { ArticlesPage } from '../ArticlesPage';

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  if (message.isFullWidth) {
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
    <div
      className={`flex items-end gap-2 max-w-[80%] ${
        message.isBot ? "flex-row-reverse" : ""
      }`}
    >
      {message.timestamp && (
        <span className="text-xs text-gray-400 whitespace-nowrap">
          {message.timestamp}
        </span>
      )}

      <div
        className={`rounded-2xl px-4 py-3 text-sm ${
          message.isBot
            ? "rounded-bl-none bg-gray-100 text-gray-900"
            : "rounded-br-none text-white"
        }`}
        style={!message.isBot ? { backgroundColor: BRAND_COLORS.primary } : {}}
      >
        <p>{message.content}</p>
      </div>
    </div>
  );
}