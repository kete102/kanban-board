import React from 'react'

interface Props {
  style?: string
  children: React.ReactNode
}

export const MainContent = ({ children, style }: Props) => {
  return (
    <div
      id="main-content"
      className={`mx-auto grid h-fit w-full max-w-6xl place-content-center rounded-md bg-zinc-900 p-2 ${style}`}
    >
      {children}
    </div>
  )
}
