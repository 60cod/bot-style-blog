interface NavigationButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}

const buttonBaseStyle = "text-sm h-9 px-4 bg-white border border-gray-300 rounded-md hover:bg-gray-50 shadow-sm hover:shadow-md transition-shadow duration-200";

export function NavigationButton({ children, onClick, className = "" }: NavigationButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${buttonBaseStyle} ${className}`}
    >
      {children}
    </button>
  );
}