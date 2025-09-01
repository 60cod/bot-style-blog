import { BRAND_COLORS } from '@/constants';

interface AvatarProps {
  initials: string;
  name: string;
  status: string;
}

export function Avatar({ initials, name, status }: AvatarProps) {
  return (
    <div className="flex items-center gap-3">
      <div 
        className="w-10 h-10 rounded-full text-white flex items-center justify-center font-medium" 
        style={{ backgroundColor: BRAND_COLORS.avatar }}
      >
        {initials}
      </div>
      <div>
        <h2 className="font-medium">{name}</h2>
        <p className="text-gray-600 text-sm">
          <span style={{color: '#00e9ff'}}>• </span>
          {status}
        </p>
      </div>
    </div>
  );
}