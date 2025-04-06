import React from 'react';

interface ResponsiveGridProps {
  children: React.ReactNode;
  columns?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: string;
  className?: string;
}

const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({
  children,
  columns = { sm: 1, md: 2, lg: 3, xl: 4 },
  gap = '1rem',
  className = '',
}) => {
  // Generate CSS grid template columns based on breakpoints
  const gridTemplateColumns = {
    sm: `repeat(${columns.sm || 1}, 1fr)`,
    md: `repeat(${columns.md || 2}, 1fr)`,
    lg: `repeat(${columns.lg || 3}, 1fr)`,
    xl: `repeat(${columns.xl || 4}, 1fr)`,
  };

  return (
    <div
      className={`grid ${className}`}
      style={{
        gap,
        gridTemplateColumns: gridTemplateColumns.sm,
        '@media (min-width: 640px)': {
          gridTemplateColumns: gridTemplateColumns.sm,
        },
        '@media (min-width: 768px)': {
          gridTemplateColumns: gridTemplateColumns.md,
        },
        '@media (min-width: 1024px)': {
          gridTemplateColumns: gridTemplateColumns.lg,
        },
        '@media (min-width: 1280px)': {
          gridTemplateColumns: gridTemplateColumns.xl,
        },
      }}
    >
      {children}
    </div>
  );
};

export default ResponsiveGrid;
