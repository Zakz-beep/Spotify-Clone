import React from 'react';

interface ProgressBarProps {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  currentTime, 
  duration, 
  onSeek 
}) => {
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    onSeek(newTime);
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center gap-x-2 w-full">
      <div className="text-xs text-neutral-400 min-w-[40px]">
        {formatTime(currentTime)}
      </div>
      
      <div 
        className="flex-1 h-2 bg-neutral-600 rounded-full cursor-pointer group relative"
        onClick={handleClick}
      >
        <div 
          className="h-full bg-white rounded-full transition-all duration-150 group-hover:bg-green-500"
          style={{ width: `${progress}%` }}
        />
        
        {/* Hover indicator */}
        <div 
          className="absolute top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-150 shadow-lg"
          style={{ left: `${progress}%`, marginLeft: '-6px' }}
        />
      </div>
      
      <div className="text-xs text-neutral-400 min-w-[40px]">
        {formatTime(duration)}
      </div>
    </div>
  );
};

export default ProgressBar;