import React from 'react'

interface Props {
  style?: string
  children: React.ReactNode
}

export const MainContent = ({ children, style }: Props) => {
  return (
    <section
      className={`h-[80dvh] w-full max-w-screen-2xl rounded-md bg-zinc-900 ${style}`}
    >
      {children}
    </section>
  )
}
