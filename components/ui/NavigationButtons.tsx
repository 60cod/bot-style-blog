import { NavigationSection } from '@/types';
import { NAVIGATION_SECTIONS } from '@/constants';
import { NavigationButton } from './NavigationButton';

interface NavigationButtonsProps {
  onSectionClick: (section: NavigationSection) => void;
}

export function NavigationButtons({ onSectionClick }: NavigationButtonsProps) {
  return (
    <div className="flex gap-3 justify-left mt-6 flex-wrap">
      {NAVIGATION_SECTIONS.map((section) => (
        <NavigationButton
          key={section}
          onClick={() => onSectionClick(section)}
        >
          {section}
        </NavigationButton>
      ))}
    </div>
  );
}