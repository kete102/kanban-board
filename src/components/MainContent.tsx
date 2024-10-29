import React from 'react'

interface Props {
  style?: string
  children: React.ReactNode
}

export const MainContent = ({ children, style }: Props) => {
  return (
    <div
      id="main-content"
      className={`mx-auto mb-6 flex h-full w-full max-w-full flex-col items-center justify-center rounded-md ${style}`}
    >
      {children}
    </div>
  )
}
