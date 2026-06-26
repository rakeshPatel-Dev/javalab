import React from 'react';

export const ProgressBar = ({ 
  value = 0, 
  showLabel = false, 
  size = 'md', 
  className = '',
  labelPrefix = 'Progress'
}) => {
  // Ensure value is between 0 and 100
  const percentage = Math.max(0, Math.min(100, Math.round(value)));

  const heightClass = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4'
  }[size] || 'h-2.5';

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center mb-1 text-xs font-semibold text-muted-foreground">
          <span>{labelPrefix}</span>
          <span className="font-mono">{percentage}%</span>
        </div>
      )}
      <div className={`w-full bg-muted rounded-full overflow-hidden ${heightClass}`}>
        <div 
          className="bg-primary rounded-full h-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
