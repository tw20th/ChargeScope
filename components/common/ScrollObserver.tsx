'use client'

import { useEffect, useRef } from 'react'

type Props = {
  onIntersect: () => void
  disabled?: boolean
}

export const ScrollObserver = ({ onIntersect, disabled }: Props) => {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!ref.current || disabled) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onIntersect()
        }
      },
      { threshold: 1.0 }
    )

    observer.observe(ref.current)

    return () => {
      observer.disconnect()
    }
  }, [onIntersect, disabled])

  return <div ref={ref} className="h-1" />
}
