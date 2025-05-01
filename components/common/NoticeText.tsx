// components/common/NoticeText.tsx

'use client'

import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export function NoticeText({ children }: Props) {
  return <p className="text-xs text-gray-500 text-center mt-8">{children}</p>
}
