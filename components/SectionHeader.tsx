import React from 'react'
import clsx from 'clsx'

interface SectionHeaderProps {
  badge?: string
  title: string
  subtitle?: string
  description?: string
  centered?: boolean
  className?: string
}

export default function SectionHeader({
  badge,
  title,
  subtitle,
  description,
  centered = true,
  className,
}: SectionHeaderProps) {
  return (
    <div className={clsx('space-y-3 md:space-y-4', centered && 'text-center', className)}>
      {badge && (
        <div className={centered ? 'flex justify-center' : ''}>
          <span className="inline-block px-4 py-2 rounded-full bg-blue-50 text-rae-blue text-sm font-semibold border border-blue-100">
            {badge}
          </span>
        </div>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-rae-gray-dark">{title}</h2>
      {subtitle && <p className="text-lg md:text-xl text-rae-blue font-semibold">{subtitle}</p>}
      {description && (
        <p className="text-base md:text-lg text-rae-gray-dark max-w-2xl mx-auto opacity-80">
          {description}
        </p>
      )}
    </div>
  )
}
