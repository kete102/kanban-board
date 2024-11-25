import { Task } from '@/types'
import clsx from 'clsx'

export const DropZone = ({
  isDragging,
  isOver
}: {
  isDragging: Task | undefined
  isOver: boolean
}) => {
  return (
    <div
      className={clsx(
        'relative h-2 w-full transition-[padding,opacity] before:absolute before:inset-2 before:rounded-xl before:border-2 before:border-dashed before:border-zinc-800 before:bg-zinc-400/60 only:h-32',
        { 'py-8 opacity-100': isDragging },
        { 'opacity-0': !isDragging }
      )}
    ></div>
  )
}
