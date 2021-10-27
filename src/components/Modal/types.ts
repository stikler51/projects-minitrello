import { ReactElement } from 'react'

export type ModalProps = {
  open: boolean
  close: () => void
  content: ModalContentType
}

export type ModalContentType = {
  title: string
  content: ReactElement
}
