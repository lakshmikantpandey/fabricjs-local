import React, { useRef, useEffect } from 'react';
import { fabric } from 'fabric';

const FabricCanvas = () => {
  const canvasRef = useRef(null);
  const canvas = new fabric.Canvas(canvasRef.current, {
    backgroundColor: 'lightblue',
    height: 500,
    width: 500,
    top: 50,
    left: 200
  });

  useEffect(() => {
    setTimeout(() => {
        addText();
      }, 0);
    // console.log('canvasTest :', canvas._objects);
  }, []);
  
  const addText = () => {
    const text = new fabric.IText('Hello, Fabric!', {
      left: 50,
      top: 50,
    });
    canvas.add(text);
    canvas.setActiveObject(text);
  }

  return <canvas id='canvasTest' className='canvas' ref={canvasRef}></canvas>;
};

export default FabricCanvas;