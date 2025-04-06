import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  noPadding = false,
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-md ${noPadding ? '' : 'p-6 md:p-6 sm:p-4'} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
