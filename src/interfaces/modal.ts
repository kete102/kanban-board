import { ModalType } from '@/store/ModalStore'
import { ReactElement } from 'react'

export interface Props {
  isOpen: boolean
  isUpdating?: boolean
  modalType: ModalType
  children: ReactElement
}

export interface ModalContextProps {
  isOpen: boolean
  isUpdating: boolean
  modalType: ModalType
}
