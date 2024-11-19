import useTaskStore from '@/store/TaskStore'
import { Column, ColumnType, Task } from '@/types'
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { KanbanColumn } from './KanbanColumn'

export const ColumnsContainer = () => {
  const { getTasksByColumns, findTaskById, onStateChange } = useTaskStore()
  const columns = getTasksByColumns()
  const [isDragging, setIsDragging] = useState<Task | undefined>(undefined)
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 100
      }
    }),
    useSensor(KeyboardSensor)
  )

  const handleDragStart = (event: DragStartEvent) => {
    const activeTask = findTaskById(event.active.id.toString())
    setIsDragging(activeTask)
    const { active } = event
    console.log('drag start', active)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setIsDragging(undefined)
    console.log('drag end', { active, over })

    if (!over) return

    const taskId = active.id as string
    const newStatus = over.id as Task['status']
    console.log('Task dragged: ', { taskId, newStatus })
    onStateChange(taskId, newStatus)

    if (!over?.id) {
      toast.error(`Can't drop it there 😑`)
    }
  }

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
    >
      <div className="mx-auto mt-2 flex h-full max-h-fit w-full min-w-fit max-w-xs flex-col items-center justify-start gap-4 p-4 sm:max-w-md md:max-w-lg lg:max-w-4xl lg:flex-row lg:items-start xl:max-w-6xl">
        {Array.from(columns as Map<ColumnType, Column>).map(
          ([columnType, column]) => (
            <KanbanColumn
              key={columnType}
              tasks={column.tasks}
              refId={column.columnId}
              columnType={columnType}
              isDragging={isDragging}
            />
          )
        )}
      </div>
    </DndContext>
  )
}
