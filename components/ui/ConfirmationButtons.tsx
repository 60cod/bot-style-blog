interface ConfirmationButtonsProps {
  onConfirm: () => void;
  onCancel: () => void;
  disabled?: boolean;
}

export function ConfirmationButtons({ onConfirm, onCancel, disabled = false }: ConfirmationButtonsProps) {
  return (
    <div className="flex gap-2 mt-3">
      <button
        onClick={onConfirm}
        disabled={disabled}
        className={`px-4 py-2 text-white rounded-md text-sm font-medium transition-colors ${
          disabled 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {disabled ? 'Sending...' : 'Yes'}
      </button>
      <button
        onClick={onCancel}
        disabled={disabled}
        className={`px-4 py-2 text-gray-700 rounded-md text-sm font-medium transition-colors ${
          disabled 
            ? 'bg-gray-200 cursor-not-allowed' 
            : 'bg-gray-300 hover:bg-gray-400'
        }`}
      >
        No
      </button>
    </div>
  );
}