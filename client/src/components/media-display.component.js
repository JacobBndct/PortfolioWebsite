import React from 'react'
import { Modal } from 'react-bootstrap'

import '../CSS/mediaDisplay.css'

import Carousel from './carousel.component';

function ShowMedia(media) {
  let mediaBreakdowns = [<div className='BreakdownItem'>
    <img
      className='MediaDisplayImage'
      src={media.previewImageURL}
      alt='media'
    />
    <p>{media.description}</p>
  </div>]

  mediaBreakdowns.push(media.breakdowns?.map(breakdowns => {
    return <div className='BreakdownItem'>
        <img
          className='MediaDisplayImage'
          src={breakdowns.breakdownLink}
          alt='media'
        />
        <p>{breakdowns.breakdownDescription}</p>
      </div>
    })
  );  

  return mediaBreakdowns
}

function MediaDisplay({ children, media }) {
  const [isShow, invokeModal] = React.useState(false)
  const initModal = () => {
    return invokeModal(!isShow)
  }

  let date = new Date(media.dateOfCreation);

  return (
    <>
      <div onClick={initModal}>
        {children}
      </div>
      <Modal className='DisplayModal' show={isShow} centered size='lg'>
        <Modal.Header closeButton onClick={initModal}>
          <Modal.Title>
            {media.name}
            <p>{date.toDateString().split(' ').slice(1).join(' ')}</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {(media.link != null) ? <p>Media Link: <a href={media.link} target='blank'>{media.link}</a></p> : null}
          <Carousel show='1' length={1 + media.breakdowns?.length} autoScroll={false}>
            { ShowMedia(media) }
          </Carousel>
        </Modal.Body>
      </Modal>
    </>
  )
}
export default MediaDisplay