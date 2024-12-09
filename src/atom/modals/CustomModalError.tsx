import { CustomModalErrorProps } from '@/types/modals/modals.types'

export const CustomModalError = ({ errors }: CustomModalErrorProps) => {
  return (
    <>
      {errors && (
        <span className="mt-1 text-sm text-red-500">{errors.message}</span>
      )}
    </>
  )
}
