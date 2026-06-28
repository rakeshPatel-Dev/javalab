import React from 'react';

export const Container = ({ children, className = '' }) => {
  return (
    <div className={`max-w-6xl mx-auto px-4 py-2 sm:px-6 lg:px-8 w-full ${className}`}>
      {children}
    </div>
  );
};

export default Container;
