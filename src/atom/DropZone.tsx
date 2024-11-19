import { Task } from '@/types'
import React from 'react'

export const DropZone = ({ isDragging }: { isDragging: Task | undefined }) => {
  return (
    <React.Fragment>
      {isDragging ? (
        <div className="w-full rounded-md border-2 border-dashed border-green-900 bg-green-300 p-2 text-center text-zinc-700">
          Drop it here!
        </div>
      ) : (
        ''
      )}
    </React.Fragment>
  )
}
