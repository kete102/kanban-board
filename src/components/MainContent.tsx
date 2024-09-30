import React from 'react'

interface Props {
  style?: string
  children: React.ReactNode
}

export const MainContent = ({ children, style }: Props) => {
  return (
    <div
      id="main-content"
      className={`mb-6 grid w-full flex-1 rounded-md bg-zinc-950 p-4 ${style}`}
    >
      {children}
    </div>
  )
}
