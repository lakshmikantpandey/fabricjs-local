import React, { useEffect, useState } from "react";
import { fabric } from "fabric";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";

export default function CanvasTest(props) {
  const { editor, onReady } = useFabricJSEditor();

  const [color, setColor] = useState("#35363a");

  useEffect(() => {
    if (!editor || !fabric) {
      return;
    }
    console.log(props.selectedFrame);
    editor.canvas.renderAll();
  }, [editor]);

  useEffect(() => {
    if (!editor || !fabric) {
      return;
    }
    editor.canvas.setHeight(500);
    editor.canvas.setWidth(500);
    // addBrandDetails();
    addText();
    addImage();
    editor.canvas.renderAll();
  }, []);

  const addText = () => {
    const data = props.jsonData[0];
    // editor.addText(data.brandName.name);
    const textdata = new fabric.IText(data.brandName.name);
    editor.canvas.add(textdata);
    // editor.canvas.add(data.brandName.name);
  };

  const _onReady = (canvas) => {
    const posterImage = props.jsonData[0];
    fabric.Image.fromURL(posterImage.baseImage, (img) => {
      console.log("editor canvas: ", canvas);
      canvas.set("backgroundImage", img);
      canvas.renderAll();
      onReady(canvas);
    });
  };


  const addImage = () => {
    const frameOverlay = props.selectedFrame;
    if (frameOverlay) {
      fabric.Image.fromURL(frameOverlay.path, (frame) => {
        frame.set({
          left: 0,
          top: 0,
        });
        frame.scaleToWidth(canvas.width);
        editor.canvas.add(frame);
      });
    }
  };
  //     const posterImage = props.selectedFrame;
  //     fabric.Image.fromURL(posterImage.baseImage, (img) => {
  //       img.set({
  //         left: 50,
  //         top: 50,
  //       });
  //     img.scaleToWidth(editor.canvas.width);
  //     //   editor.add(img);
  //       editor.canvas.add(img);
  //     });
  //   };

  const addBrandDetails = () => {
    const text = props.jsonData[0];

    const createTextElement = (content, top, left) => {
      return new fabric.Text(content, {
        top: top,
        left: left,
        fontSize: 20,
        charSpacing: -50,
        editable: true
      });
    };

    const textPath = createTextElement(text.brandName.name, 445, 5);
    const textPath2 = createTextElement(text.email.email, 475, 340);
    const textPath3 = createTextElement(text.mobile.mobile, 445, 290);
    const textPath4 = createTextElement(text.address.address, 475, 5);

    editor.addText(textPath, textPath2, textPath3, textPath4);
  };

  return (
    <div style={{
      border: "3px solid Green",
      width: "400px",
      height: "400px",
      marginLeft: "500px"
    }}>
      <div>
        <button onClick={addText}>click</button>
        <FabricJSCanvas className="sample-canvas" onReady={_onReady} />
      </div>
    </div>
  );
}
