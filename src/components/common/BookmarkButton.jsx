import React from 'react';
import { Bookmark } from 'lucide-react';
import { Button } from '../ui/button';

export const BookmarkButton = ({ 
  isBookmarked, 
  onClick, 
  showText = false, 
  className = '' 
}) => {
  return (
    <Button
      variant="outline"
      size={showText ? "default" : "icon"}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={`transition-all duration-200 cursor-pointer ${
        isBookmarked
          ? 'bg-amber-500/10 text-amber-500 border-amber-500/30 hover:bg-amber-500/20 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/40 hover:text-amber-600'
          : 'hover:bg-accent text-muted-foreground hover:text-foreground'
      } ${className}`}
      aria-label={isBookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}
      title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Question'}
    >
      <Bookmark 
        className={`w-4 h-4 transition-transform duration-200 ${isBookmarked ? 'fill-amber-500 text-amber-500' : ''}`} 
      />
      {showText && <span>{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>}
    </Button>
  );
};

export default BookmarkButton;
