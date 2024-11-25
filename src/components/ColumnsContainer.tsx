import { useTasks } from '@/hooks/useTasks'
import useTaskStore from '@/store/TaskStore'
import { Column, ColumnType, Task } from '@/types'
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { snapCenterToCursor } from '@dnd-kit/modifiers'
import { arrayMove } from '@dnd-kit/sortable'
import { useState } from 'react'
import { KanbanColumn } from './KanbanColumn'
import { TaskOverlay } from './TaskOverlay'

export const ColumnsContainer = () => {
  const { updateStatus } = useTasks()
  const { getTasksByColumns, findTaskById } = useTaskStore()
  const [isDragging, setIsDragging] = useState<Task | undefined>(undefined)
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 500,
        tolerance: 100
      }
    }),
    useSensor(KeyboardSensor)
  )
  const columns = getTasksByColumns()

  const handleDragStart = (event: DragStartEvent) => {
    const activeTask = findTaskById(event.active.id.toString())
    setIsDragging(activeTask)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setIsDragging(undefined)

    if (!over) return

    console.log({ over })

    const sourceColumn = active.data.current?.columnId as ColumnType
    let targetColumn = sourceColumn
    if (over.data.current?.columnId) {
      targetColumn = over.data.current?.columnId as ColumnType
    } else {
      targetColumn = over.id as ColumnType
    }
    const taskId = active.id as string

    console.log({ sourceColumn, targetColumn })
    //TODO: is same column return
    if (sourceColumn === targetColumn) {
      console.log('misma columna')
      return
      // const column = columns.get(sourceColumn)
      // if (!column) return
      //
      // const oldIndex = column.tasks.findIndex(
      //   (task: Task) => task.id === active.id
      // )
      // const newIndex = column.tasks.findIndex(
      //   (task: Task) => task.id === over.id
      // )
      //
      // const newUpdatedTaskArray = arrayMove(column.tasks, oldIndex, newIndex)
      // onUpdateTasks(newUpdatedTaskArray)
      // console.log('Tasks despues: ', newUpdatedTaskArray)
    }

    updateStatus({ taskId, targetColumn })
  }

  return (
    <DndContext
      sensors={sensors}
      modifiers={[snapCenterToCursor]}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
    >
      <div className="mx-auto mt-2 flex h-full max-h-fit w-full min-w-fit max-w-xs flex-col items-center justify-start gap-4 p-4 sm:max-w-md md:max-w-lg lg:max-w-4xl lg:flex-row lg:items-start xl:max-w-6xl">
        {Array.from(columns as Map<ColumnType, Column>).map(
          ([columnType, column]) => (
            <KanbanColumn
              key={columnType}
              tasks={column.tasks}
              columnType={columnType}
            />
          )
        )}
      </div>
      <DragOverlay>
        {isDragging && <TaskOverlay task={isDragging} />}
      </DragOverlay>
    </DndContext>
  )
}
