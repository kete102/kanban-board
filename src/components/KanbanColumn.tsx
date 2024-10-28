import useModalStore from '@/store/ModalStore'
import { Column, Task } from '@/types'
import { useState } from 'react'
import { FcPlus } from 'react-icons/fc'
import { TaskItem } from './TaskItem'

interface Props {
  columnType: string
  column: Column
  setSelectedColumn: React.Dispatch<React.SetStateAction<string>>
}

export const KanbanColumn = ({
  columnType,
  column,
  setSelectedColumn
}: Props) => {
  const { toggleModal } = useModalStore()

  const handleAddTask = ({ columnId }: { columnId: string }) => {
    setSelectedColumn(columnId)
    toggleModal('createTask')
  }
  return (
    <div
      id={column.columnId}
      className="my-2 flex min-h-20 w-full flex-col items-center rounded-md border-zinc-100 bg-zinc-200/90 p-2 shadow-xl shadow-white md:max-w-xl lg:max-w-2xl"
    >
      <h4 className="inline-flex h-20 w-full items-center justify-between p-2 pt-2 text-center align-middle text-xl font-bold uppercase text-zinc-800/80">
        {columnType}
        <FcPlus
          size={30}
          className="cursor-pointer hover:scale-125"
          onClick={() => handleAddTask({ columnId: columnType })}
        />
      </h4>
      <div className="flex w-full flex-col gap-2">
        {column.tasks.map((task: Task) => (
          <TaskItem task={task} key={task._id} />
        ))}
      </div>
    </div>
  )
}
