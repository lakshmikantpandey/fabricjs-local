import React, { useRef, useEffect, useState } from 'react';
import { fabric } from 'fabric';

const CanvasGpt = (props) => {
    const [canvasState, setCanvasState] = useState();
    const canvasRef = useRef(null);
    
    useEffect(() => {
        const canvas = new fabric.Canvas(canvasRef.current);
        canvas.setHeight = 600;
        canvas.setWidth = 600;
        canvas.backgroundColor = 'lightblue';
        setCanvasState(canvas);
    }, []);

    useEffect(() => {
        if (canvasState) {
            console.log(canvasState);
            addImage();
            addText();
            addCustomText();
            canvasState.renderAll();
        }
    },[canvasState]);

    const addImage = () => {
        if (canvasState) {
        const posterImage = props.jsonData[0];
            fabric.Image.fromURL(posterImage.baseImage, function (img) {
                img.set({ selectable: false });
    
                canvasState.add(img);
                canvasState.sendToBack(img);
            });
        }
    }

    const addText = () => {
        // Add text
        if (canvasState) {
            const text = new fabric.Text('Hello, World!', {
                left: 50,
                top: 50,
                fill: 'red',
                fontFamily: 'Arial',
                fontSize: 24,
            });
            canvasState.add(text);
        }
    }

    const addCustomText = () => {
        // Add custom interactable text
        if (canvasState) {
            const customText = new fabric.IText('Edit me!', {
                left: 100,
                top: 100,
                fill: 'blue',
                fontFamily: 'Arial',
                fontSize: 20,
            });
            canvasState.add(customText);
        }
    }

    return <canvas className='canvas' ref={canvasRef} />;
};

export default CanvasGpt;
