'use client'

import { ButtonHTMLAttributes } from 'react'
import clsx from 'clsx'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'outline'
}

export const Button = ({ children, variant = 'primary', className, ...props }: Props) => {
  return (
    <button
      {...props}
      className={clsx(
        'px-4 py-2 rounded-md font-medium transition',
        variant === 'primary'
          ? 'bg-blue-600 text-white hover:bg-blue-700'
          : 'border border-gray-300 text-gray-700 hover:bg-gray-100',
        className
      )}
    >
      {children}
    </button>
  )
}
