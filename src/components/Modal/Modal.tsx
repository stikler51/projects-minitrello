import React, { ReactElement } from 'react'
import { ModalProps } from './types'

const Modal = ({ open, close, content }: ModalProps): ReactElement => {
  if (open) {
    return (
      <div className="modalBackground">
        <div className="modalWindow">
          <div className="modalWindow__header">
            <span className="modalWindow__header__title">{content.title}</span>
            <button className="modalWindow__header__closeBtn" onClick={close}>
              <img src="/icons/x-lg.svg" />
            </button>
          </div>
          <div className="modalWindow__body">{content.content}</div>
        </div>
      </div>
    )
  }

  return <></>
}

export default Modal
