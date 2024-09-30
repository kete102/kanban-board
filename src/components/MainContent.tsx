import React from 'react'

interface Props {
  style?: string
  children: React.ReactNode
}

export const MainContent = ({ children, style }: Props) => {
  return (
    <div
      id="main-content"
      className={`mb-6 grid w-10/12 max-w-full flex-1 rounded-md bg-zinc-900 p-10 ${style}`}
    >
      {children}
    </div>
  )
}
