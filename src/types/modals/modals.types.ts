import { FieldError } from 'react-hook-form'

export interface TaskInputs {
  taskTitle: string
  taskDescription: string
  taskPriority: string
  taskEndDate: string
}

export interface CustomModalErrorProps {
  errors: FieldError | undefined
}

export interface BoardInputs {
  boardTitle: string
  boardDescription: string
}
