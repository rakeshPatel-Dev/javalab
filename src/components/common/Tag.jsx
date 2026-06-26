import React from 'react';

export const Tag = ({ name, onClick, className = '', active = false }) => {
  const isInteractive = typeof onClick === 'function';

  return (
    <span
      onClick={isInteractive ? onClick : undefined}
      className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium border transition-all duration-200 ${
        active
          ? 'bg-primary border-primary text-primary-foreground'
          : isInteractive
          ? 'bg-muted text-muted-foreground border-border hover:bg-accent hover:text-accent-foreground cursor-pointer'
          : 'bg-muted/40 text-muted-foreground border-border/80'
      } ${className}`}
    >
      {name}
    </span>
  );
};

export default Tag;
