import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '../ui/input';

export const SearchBar = ({ 
  value, 
  onChange, 
  placeholder = 'Search questions...', 
  className = '',
  autoFocus = false
}) => {
  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
      <Input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className="w-full pl-9 h-10 rounded-xl"
      />
    </div>
  );
};

export default SearchBar;
