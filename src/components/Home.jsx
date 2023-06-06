import { useState, useRef, useEffect } from "react";
import Canvas from "./Canvas";
import Sidebar from "./Sidebar";
import Header from "./Header";
import frame1 from '../assets/images/frame1.png';
import frame2 from '../assets/images/Janmahtmi.png';
import frame3 from '../assets/images/diya.png';
import frame4 from '../assets/images/diya2.png';
import image from '../assets/images/image.jpg';
import logoImage from '../assets/images/logo4.png';
import FabricCanvas from "./CanvasTest";
import CanvasTest from "./CanvasTest2";
import CanvasGpt from "./canvasGpt";

const address = '📍 Shankar Nagar Raipur Chhattisgarh 492001';
const email = 'testemail@gmail.com';
const mobile = '📞 9876543210';
const brandName = 'Techphant Consulting Group';

const jsonData = [
    {
        id: 'frame1',
        path: frame1,
        baseImage: image,
        logo : {
            logoImage : logoImage,
            position : 'sideUpperRight',
        },
        address : {
            address : address,
            position : 'sideBottomLeft'
        },
        email : {
            email : email,
            position : 'bottomRight'
        },
        mobile : {
            mobile : mobile,
            position : 'sideBottonLeft2'
        },
        brandName : {
            name : brandName,
            position : 'sideBottonLeft2'
        }
    },
    {
        id: 'frame2',
        path: frame2,
        baseImage: image,
        position: 'sideUpperLeft'
    },
    {
        id: 'frame3',
        path: frame3,
        baseImage: image,
        position: 'sideBottomLeft'
    },
    {
        id: 'frame4',
        path: frame4,
        baseImage: image,
        position: 'sideBottomRight'
    },
    {
        id: 'frame1',
        path: frame1,
        baseImage: image,
        position: 'sideUpperRight'
    },
    {
        id: 'frame2',
        path: frame2,
        baseImage: image,
        position: 'sideUpperLeft'
    },
    {
        id: 'frame3',
        path: frame3,
        baseImage: image,
        position: 'sideBottomLeft'
    },
    {
        id: 'frame4',
        path: frame4,
        baseImage: image,
        position: 'sideBottomRight'
    },
    {
        id: 'frame4',
        path: frame4,
        baseImage: image,
        position: 'sideBottomRight'
    }
]

const Home = () => {
    const [mapData, setMapData] = useState(new Map());
    const [selectedFrame, setSelectedFrame] = useState();
    const [selectedFrameIndex, setSelectedFrameIndex] = useState(0);
    const canvasRef = useRef(null);
    const [canvas, setCanvas] = useState(null);
    // const [canvas, setCanvas] = useState(new fabric.Canvas(canvasRef.current, {
    //     backgroundColor: 'lightblue',
    //     height: 500,
    //     width: 500,
    //     top: 50,
    //     left: 200,
    //     selection: true
    //   }));
    useEffect(() => {
        setMapData(new Map(jsonData.map(data => [data.id, data])));
    }, []);

    const handleDivClick = (frameId, index) => {
        const frame = mapData.get(frameId);
        setSelectedFrameIndex(index);
        setSelectedFrame(frame);
    };

    const download = () => {
        const dataURL = canvas.toDataURL({quality:1.0,format:"png",width:canvas.width,height:canvas.height})
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'canvas.png';
        link.click();
    }
    return (
        <>
            <Header onDownload={download} />
            <Sidebar />
            {/* <CanvasGpt jsonData={jsonData}/> */}
            {/* <FabricCanvas /> */}
            {/* <CanvasTest jsonData={jsonData} selectedFrame={selectedFrame}/> */}
           {/* <FrameGenerator jsonData={jsonData}/> */}
            <Canvas setCanvas={setCanvas} canvas={canvas} jsonData={jsonData} mapdata={mapData} selectedFrame={selectedFrame} canvasRef={canvasRef} />
           
            <div id="toolpanel_editor" className="toolpanel toolpanel_editor visible minimized ">
                <div className="frame_list_container">
                    <h5 className="frames_list_title">Select Your Frame</h5>
                    <div className="frame_list_scroll">
                        <div className="row">
                            {jsonData.map((data, index) => (
                                <div key={`frame-${index}`} className="col-sm-6">
                                    <div  onClick={() => handleDivClick(data.id, index)} className="backgroundImage_inner">
                                        <div className="button" style={{ border: index === selectedFrameIndex ? "3px solid rgb(114, 113, 245)" : "none" }}>
                                            <img id={data.id} className="backgroundImage_img" alt="" src={data.path} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
