import React, { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";

const Canvas = (props) => {
  const [canvasState, setCanvasState] = useState();
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = new fabric.Canvas("canvasElement", {
      backgroundColor: 'lightblue',
      height: 500,
      width: 500,
      top: 20,
      left: 200,
      selection: true
    });
    setCanvasState(canvas);
  },[])

  useEffect(() => {
    if (canvasState) {
      addImage();
      addFrame();
      addLogo();
      addEditableText();
      addBrandDetails();
      canvasState.renderAll();
  }
    props.setCanvas(canvasState);
  }, [props.selectedFrame, canvasState])

  const addImage = () => {
    if (canvasState) {
      const posterImage = props.jsonData[0];
      fabric.Image.fromURL(posterImage.baseImage, (img) => {
        img.selectable = false;
        img.set({
          left: 0,
          top: 0,
        });
        img.scaleToWidth(canvasState.width);
        canvasState.add(img);
        canvasState.sendToBack(img);
      });
    }
  };

  const addLogo = () => {
    if (canvasState) {
    const logoImage = props.jsonData[0];
    fabric.Image.fromURL(logoImage.logo.logoImage, (img) => {
      img.selectable = true;
      var size = 400;
      img.set({
        height: size,
        width: size,
        opacity: 0.60,
        left: (canvasState.width / 2) - (size / 2) - size / 2,
        top: (canvasState.height / 2) - (size / 2) - size / 2,
      });
      img.scaleToWidth(canvasState.width);
      canvasState.add(img);
    });
  }
  };

  // const addLogo2 = () => {
  //   if (canvasState) {
  //     const logoImage = props.jsonData[0];
  //     fabric.Image.fromURL(logoImage.logo.logoImage, (img) => {
  //       var size = 400;
  //       img.set({
  //         height: size,
  //         width: size,
  //         opacity: 0.60,
  //         left: (canvasState.width / 2) - (size / 2),
  //         top: (canvasState.height / 2) - (size / 2),
  //         selectable: true
  //       });
  //       img.scaleToWidth(canvasState.width);
  //       canvasState.add(img);
  //     });
  //   }
  // };

  const addFrame = () => {
    if (canvasState) {
      const frameOverlay = props.selectedFrame;
      if (frameOverlay) {
        fabric.Image.fromURL(frameOverlay.path, (frame) => {
          frame.selectable = true;
          frame.set({
            left: 0,
            top: 0,
          });
          frame.scaleToWidth(canvasState.width);
          canvasState.add(frame);
        });
      }
    }
  };

  const addEditableText = () => {
    if (canvasState) {
      var itext = new fabric.IText("Add sample text here.", {selectable: true});
      itext.set("top", 70);
      itext.set("left", 65);
      itext.selectable = true;
      canvasState.add(itext);
      // canvasState.setActiveObject(itext);
      // canvas.renderAll();
    }
  }

  const addBrandDetails = () => {
    if (canvasState) {
      const text = props.jsonData[0];
  
      const createTextElement = (content, top, left) => {
        return new fabric.Text(content, {
          top: top,
          left: left,
          fontSize: 20,
          charSpacing: -50,
          editable: true,
          selectable: true
        });
      };
  
      const textPath = createTextElement(text.brandName.name, 445, 5);
      const textPath2 = createTextElement(text.email.email, 475, 340);
      const textPath3 = createTextElement(text.mobile.mobile, 445, 290);
      const textPath4 = createTextElement(text.address.address, 475, 5);
  
      canvasState.add(textPath, textPath2, textPath3, textPath4);
    }
  };

  return <canvas id="canvasElement" className="canvas" ref={canvasRef} >{props.children}</canvas>;
};

export default Canvas;




