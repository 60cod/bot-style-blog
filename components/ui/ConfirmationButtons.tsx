interface ConfirmationButtonsProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmationButtons({ onConfirm, onCancel }: ConfirmationButtonsProps) {
  return (
    <div className="flex gap-2 mt-3">
      <button
        onClick={onConfirm}
        className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
      >
        Yes
      </button>
      <button
        onClick={onCancel}
        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-400 transition-colors"
      >
        No
      </button>
    </div>
  );
}