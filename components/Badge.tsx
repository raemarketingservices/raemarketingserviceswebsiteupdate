import React from 'react'
import clsx from 'clsx'

interface BadgeProps {
  variant?: 'blue' | 'gray' | 'outline'
  className?: string
  children: React.ReactNode
}

export default function Badge({ variant = 'blue', className, children }: BadgeProps) {
  const variants = {
    blue: 'bg-blue-50 text-rae-blue border border-blue-100',
    gray: 'bg-rae-gray-light text-rae-gray-dark border border-gray-200',
    outline: 'border-2 border-rae-blue text-rae-blue',
  }

  return (
    <span className={clsx('inline-block px-3 py-1 text-sm font-semibold rounded-full', variants[variant], className)}>
      {children}
    </span>
  )
}
