import React from 'react';
import * as LucideIcons from 'lucide-react';

export const Icon = ({ name, className = '', size }) => {
  // Get the icon component from Lucide
  const IconComponent = LucideIcons[name] || LucideIcons.HelpCircle;
  
  return <IconComponent className={className} size={size} />;
};

export default Icon;
