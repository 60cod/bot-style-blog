import { Message } from '@/types';
import { BRAND_COLORS, LOADING_AREA_HEIGHT } from '@/constants';

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  if (message.isFullWidth) {
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
      <p>{message.content}</p>
    </div>
  );
}