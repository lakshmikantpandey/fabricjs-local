import React from 'react';
import './BackgroundImage.scss';
import __ from '../utils/translation';
import { fabric } from 'fabric';

const FrameImages = ({ canvas, setMinimized, ...props }) => {
  const frameImages = props.data.frame_data

  // set the frame on canvas
  const handleFrameImageAdd = async (wm_img, frame_id, key) => {
    // dispatch(selectedFrameID(key))
    sessionStorage.setItem('selected_frame', frame_id)
    fabric.Image.fromURL(wm_img, function(img) {
      img.set({
          scaleX: (canvas.getWidth() / canvas.getZoom()) / img.width,
          scaleY: (canvas.getHeight()/ canvas.getZoom()) / img.height,
          objectCaching: false,
          originX: 'left',
          originY: 'top',
          // crossOrigin: 'anonymous'
       });
       canvas.setOverlayImage(img, canvas.renderAll.bind(canvas));
    },{
      crossOrigin:"anonymous"
    });
    setMinimized && setMinimized(true)
  }

  // get the list of from get Frame Images and set in our stacture
  const listOfFrameImages = frameImages !== null ?
    frameImages && frameImages.map((frameImage, key) =>
      <div key={`backgroundImage${key}`} className="backgroundImage_inner">
        <div className="button" onClick={(e) => handleFrameImageAdd(frameImage.org_img, frameImage.frame_id,  key)}>
          <img id={`backgroundImage_img_${key}`} className="backgroundImage_img" alt="" src={frameImage.thumb_img} />
        </div>
      </div>

    )
    : 'No Result'

  return ( 
    <>
      <div className="title_sticky">
        <p className="title">{__('Select your frame')}</p>
      </div>
      <div className="backgroundImages">
        <div className="list_of_backgroundImage list_of_frameImage" >
          {listOfFrameImages}
        </div>
      </div>
    </>
  )
}

export default FrameImages