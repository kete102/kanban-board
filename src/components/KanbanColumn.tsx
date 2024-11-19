import { DropZone } from '@/atom/DropZone'
import { Task } from '@/types'
import { DndContext, useDroppable } from '@dnd-kit/core'
import { useEffect } from 'react'
import { IoFilter } from 'react-icons/io5'
import { TaskItem } from './TaskItem'

interface Props {
  columnType: string
  tasks: Task[]
  refId: string
  isDragging: Task | undefined
}

export const KanbanColumn = ({
  columnType,
  tasks,
  refId,
  isDragging
}: Props) => {
  const { setNodeRef } = useDroppable({
    id: refId
  })

  return (
    <div
      ref={setNodeRef}
      className={`my-2 flex min-h-20 w-full flex-col items-center rounded-md border-zinc-100 bg-zinc-200/90 px-3 py-2 shadow-xl shadow-white md:max-w-xl lg:max-w-2xl`}
    >
      <h4 className="inline-flex w-full items-center justify-between p-2 pt-2 text-center align-middle text-xl font-bold uppercase text-zinc-800/80">
        {columnType}
        <span className="text-md font-medium normal-case">
          <IoFilter />
        </span>
      </h4>
      <DropZone isDragging={isDragging} />
      <div className="flex w-full flex-col gap-2 py-2">
        {/* <SortableContext> */}
        {tasks.map(task => (
          <div key={task.id}>
            <TaskItem task={task} id={task.id} />
            {/* <DropZone key={`dropzone-${refId}`} isDragging={isDragging} /> */}
            {/* <DragOverlay> */}
            {/*   {isDragging ? <TaskOverlay task={isDragging} /> : null} */}
            {/* </DragOverlay> */}
          </div>
        ))}
        {/* </SortableContext> */}
      </div>
    </div>
  )
}
