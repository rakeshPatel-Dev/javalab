import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '../ui/badge';

export const PageHeader = ({ title, description, badge, children, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={`mb-8 ${className}`}
    >
      {badge && (
        <Badge variant="outline" className="mb-3 bg-primary/10 text-primary border-primary/20 dark:bg-primary/20 dark:border-primary/30 uppercase tracking-wider font-semibold">
          {badge}
        </Badge>
      )}
      <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight leading-tight">
        {title}
      </h1>
      {description && (
        <p className="mt-2 text-muted-foreground text-sm sm:text-base leading-relaxed max-w-2xl">
          {description}
        </p>
      )}
      {children && <div className="mt-4">{children}</div>}
    </motion.div>
  );
};

export default PageHeader;
