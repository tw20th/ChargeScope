'use client'

import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'
import Link from 'next/link'

type ButtonProps = {
  children: ReactNode
  href: string
  variant?: 'primary' | 'secondary'
}

const buttonStyles = cva(
  'inline-block px-6 py-3 rounded-full text-sm font-semibold transition',
  {
    variants: {
      variant: {
        primary: 'bg-green-600 text-white hover:bg-green-700',
        secondary:
          'bg-white text-green-600 border border-green-600 hover:bg-green-50',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  }
)

export const Button = ({
  children,
  href,
  variant = 'primary',
}: ButtonProps) => {
  return (
    <Link href={href} className={cn(buttonStyles({ variant }))}>
      {children}
    </Link>
  )
}
