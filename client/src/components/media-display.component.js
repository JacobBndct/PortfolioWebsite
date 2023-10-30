import React from 'react'
import { Modal } from 'react-bootstrap'

import '../CSS/mediaDisplay.css'

function MediaDisplay({ children, media }) {
  const [isShow, invokeModal] = React.useState(false)
  const initModal = () => {
    return invokeModal(!isShow)
  }

  return (
    <>
      <div onClick={initModal}>
        {children}
      </div>
      <Modal className='DisplayModal' show={isShow} centered size='lg'>
        <Modal.Header closeButton onClick={initModal}>
          <Modal.Title>Media Viewer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            className='MediaDisplayImage'
            src={media}
            alt='media'
          />
        </Modal.Body>
      </Modal>
    </>
  )
}
export default MediaDisplay