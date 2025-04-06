import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  onClick,
  disabled = false,
  type = 'button',
}) => {
  // Base classes
  let buttonClasses = 'rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 touch-target';
  
  // Variant classes
  switch (variant) {
    case 'primary':
      buttonClasses += ' bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500';
      break;
    case 'secondary':
      buttonClasses += ' bg-secondary-500 text-white hover:bg-secondary-600 focus:ring-secondary-500';
      break;
    case 'danger':
      buttonClasses += ' bg-danger-500 text-white hover:bg-danger-600 focus:ring-danger-500';
      break;
    case 'outline':
      buttonClasses += ' border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500';
      break;
    default:
      buttonClasses += ' bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500';
  }
  
  // Size classes
  switch (size) {
    case 'sm':
      buttonClasses += ' px-3 py-1.5 text-sm';
      break;
    case 'md':
      buttonClasses += ' px-4 py-2';
      break;
    case 'lg':
      buttonClasses += ' px-6 py-3 text-lg';
      break;
    default:
      buttonClasses += ' px-4 py-2';
  }
  
  // Width classes
  if (fullWidth) {
    buttonClasses += ' w-full';
  }
  
  // Disabled classes
  if (disabled) {
    buttonClasses += ' opacity-50 cursor-not-allowed';
  }
  
  // Additional classes
  if (className) {
    buttonClasses += ` ${className}`;
  }
  
  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
