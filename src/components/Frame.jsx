import React, { useEffect, useRef } from 'react';
import { fabric } from 'fabric';

const FrameGenerator = ({ jsonData }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current);
    canvas.setWidth(380);
    canvas.setHeight(380);

    jsonData.forEach((item) => {
      const { id, path, baseImage, position } = item;

      fabric.Image.fromURL(baseImage, (baseImg) => {
        baseImg.set({ selectable: false, evented: false });

        fabric.Image.fromURL(path, (frameImg) => {
          frameImg.set({ selectable: false, evented: false });

          if (position === 'sideUpperRight') {
            frameImg.set({ top: 0, left: canvas.getWidth() - frameImg.width })  ;
          } else if (position === 'sideUpperLeft') {
            frameImg.set({ top: 0, left: 0 });
          } else if (position === 'sideBottomLeft') {
            frameImg.set({ top: canvas.getHeight() - frameImg.height, left: 0 });
          } else if (position === 'sideBottomRight') {
            frameImg.set({ top: canvas.getHeight() - frameImg.height, left: canvas.getWidth() - frameImg.width });
          }

          canvas.add(baseImg);
          canvas.add(frameImg);
          canvas.renderAll();
        });
      });
    });
  }, [jsonData]);

  return <canvas ref={canvasRef} />;
};

export default FrameGenerator;
