import React from 'react'
import clsx from 'clsx'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  isLoading?: boolean
}

export default function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = 'font-semibold transition-all duration-300 rounded-sm focus-visible:outline-none disabled:opacity-50 disabled:cursor-not-allowed'

  const variants = {
    primary: 'bg-rae-blue hover:bg-blue-700 text-white shadow-md hover:shadow-lg active:scale-95',
    secondary: 'bg-rae-gray-light hover:bg-gray-200 text-rae-gray-dark shadow-subtle hover:shadow-md',
    outline: 'border-2 border-rae-blue text-rae-blue hover:bg-rae-blue hover:text-white transition-all',
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  return (
    <button
      className={clsx(
        baseStyles,
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
          Enviando...
        </span>
      ) : (
        children
      )}
    </button>
  )
}
