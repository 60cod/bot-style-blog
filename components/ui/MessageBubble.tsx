import { Message } from '@/types';
import { BRAND_COLORS, LOADING_AREA_HEIGHT } from '@/constants';
import { ArticlesPage } from '../ArticlesPage';

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  if (message.isFullWidth) {
    // Articles 섹션인 경우 실제 페이지 렌더링
    if (message.selectedSection === 'Articles') {
      return (
        <div className={`w-full h-full ${LOADING_AREA_HEIGHT} bg-white rounded-lg overflow-hidden`}>
          <ArticlesPage />
        </div>
      );
    }

    // 다른 섹션들은 기본 로딩 화면
    return (
      <div className={`w-full h-full ${LOADING_AREA_HEIGHT} bg-gray-100 rounded-lg p-4 flex items-center justify-center`}>
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
      className={`max-w-[80%] rounded-lg px-4 py-3 ${
        message.isBot ? "bg-gray-100 text-gray-900" : "text-white"
      }`}
      style={!message.isBot ? { backgroundColor: BRAND_COLORS.primary } : {}}
    >
      <div dangerouslySetInnerHTML={{ __html: message.content }} />
    </div>
  );
}