import React from 'react';
import { fabric } from 'fabric';
// import { SketchPicker } from 'react-color';
import { Row, Col, Container, Form } from "react-bootstrap";
// import { TabPanel } from 'react-web-tabs';
// import { client } from 'filestack-react';
// import Popup from 'reactjs-popup'
// import { unique, saveCanvasState, selectObject } from './Helpers'
//import $ from 'jquery';

// import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
// import classnames from 'classnames';

const INIT_SOLID_COLORS = [
  '#d0021b',
  '#f5a623',
  '#f8e71c',
  '#8b572a',
  '#b8e986',
  '#417505',
  '#4a90e2',
  '#50e3ca',
  '#000000',
  '#ffffff'
]

// const INIT_PATTERN_IMAGES = [
//   require('../images/img/pattern1.jpg'),
//   require('../images/img/pattern2.jpg'),
//   require('../images/img/pattern3.jpg'),
//   require('../images/img/pattern4.jpg'),
//   require('../images/img/pattern5.jpg'),
//   require('../images/img/pattern6.jpg'),
//   require('../images/img/pattern7.jpg'),
//   require('../images/img/pattern8.jpg'),
//   require('../images/img/pattern9.jpg')
// ]

// const INIT_ELEMENT_ICONS = [
//   require('../images/elements/circle.svg'),
//   require('../images/elements/rectangle.svg'),
//   require('../images/elements/square.svg'),
//   require('../images/elements/triangle.svg'),
//   require('../images/elements/ellipse.svg')
// ]

// const INIT_ELEMENT_SHAPES = [
//   require('../images/elements/Party_1233.svg'),
//   require('../images/elements/Party_1239.svg'),
//   require('../images/elements/Party_1241.svg'),
//   require('../images/elements/Party_1242.svg'),
//   require('../images/elements/Party_1245.svg'),
//   require('../images/elements/Party_1246.svg')
// ]

// const INIT_ELEMENT_CLIPARTS = [
//   require('../images/elements/logo_1214.svg'),
//   require('../images/elements/logo_1215.svg'),
//   require('../images/elements/logo_1216.svg'),
//   require('../images/elements/logo_1219.svg'),
//   require('../images/elements/logo_1232.svg'),
//   require('../images/elements/logo_1234.svg')
// ]

// const INIT_ELEMENT_ELEMENTS = [
//   require('../images/elements/closet.svg'),
//   require('../images/elements/confetti.svg'),
//   require('../images/elements/Email.svg'),
//   require('../images/elements/facebook.svg'),
//   require('../images/elements/gift.svg'),
//   require('../images/elements/hat.svg'),
//   require('../images/elements/fireplace.svg'),
//   require('../images/elements/instagram.svg'),
//   require('../images/elements/dryer.svg')
// ]

class LeftPanel extends React.Component {
  state = {
    displaybgColorPicker: false,
    displaygrad1ColorPicker: false,
    displaygrad2ColorPicker: false,
    canvasScale: 1,
    SCALE_FACTOR: 1.2,
    bgcolArray: [],
    backgroundcolor: '',
    grad1color: 'black',
    grad2color: 'black',
    apiImg:[],
    page: 1,
    searchkey: 'sport',
    activeTab: '1',
    imgactiveTab: '1',
    unsplashImg:[],
    unsplashsearchkey: 'woods',
    client_id: "10c09efaf736d64b6c6f38d93620399aca995d73f0379c86995521375dff759d",
    pagenum: 1
    //query:'woods'
  };

  componentDidMount() {
    let bgcolArray = localStorage.getItem("bgcolors");
    if (bgcolArray) {
      bgcolArray = JSON.parse(bgcolArray);
      this.setState({
        bgcolArray: bgcolArray
      });
    }

    this.pixaybay();
    this.unsplash();

    this.refs.iScroll.addEventListener("scroll", () => {
      if (
        this.refs.iScroll.scrollTop + this.refs.iScroll.clientHeight >=
        this.refs.iScroll.scrollHeight
      ) {
      this.incerment();
      }
    });
    this.refs.imgScroll.addEventListener("scroll", () => {
      if (
        this.refs.imgScroll.scrollTop + this.refs.imgScroll.clientHeight >=
        this.refs.imgScroll.scrollHeight
      ) {
      this.incermentpage();
      }
    });
  }

  addShape = () => {
    var canvas = this.props.canvas;
    const circle = new fabric.Circle({
      radius: 50,
      left: 10,
      top: 10,
      strokeWidth: '',
      stroke: '',
      fill: '#ff5722'
    });
    canvas.add(circle);
    canvas.setActiveObject(circle);
    selectObject(canvas);
    canvas.renderAll();
  }

  addHeadingtxt = () => {
    var canvas = this.props.canvas;
    var text = new fabric.Textbox('Add Heading', {
      fontFamily: 'Open Sans',
      left: 100,
      top: 100,
      type: 'text',
      fontSize: 36,
      width: 250,
    });
    canvas.add(text);
    canvas.setActiveObject(text);
    selectObject(canvas);
    canvas.renderAll();
  }

  addSubheadingtxt = () => {
    var canvas = this.props.canvas;
    var text = new fabric.Textbox('Add Subheading', {
      fontFamily: 'Open Sans',
      left: 100,
      top: 100,
      type: 'text',
      fontSize: 24,
      width: 200,
    });
    canvas.add(text);
    canvas.setActiveObject(text);
    selectObject(canvas);
    canvas.renderAll();
  }

  addText = () => {
    var canvas = this.props.canvas;
    var text = new fabric.Textbox('Add text', {
      fontFamily: 'Open Sans',
      left: 100,
      top: 100,
      type: 'text',
      fontSize: 18,
      width: 200,
    });
    canvas.add(text);
    canvas.setActiveObject(text);
    selectObject(canvas);
    canvas.renderAll();
  }

  deleteCanvasBg = () => {
    var canvas = this.props.canvas;
    canvas.backgroundColor = '';
    canvas.renderAll();
    //if (!lcanvas) lcanvas = canvas;
    var objects = canvas.getObjects().filter(function(o) {
      return o.bg === true;
    });
    for (var i = 0; i < objects.length; i++) {
      canvas.remove(objects[i]);
    }
    canvas.bgsrc = "";
    canvas.bgcolor = "";
  }

  setCanvasFill = (bgcolor) => {
    var canvas = this.props.canvas;
    this.deleteCanvasBg();
    canvas.backgroundColor = bgcolor.hex;
    canvas.renderAll();
    this.setState({
      backgroundColor: bgcolor.hex
    });
    saveCanvasState(canvas);
  }

  dynamicBGcolors = (bgcol) => {
    var bgcolArray = this.state.bgcolArray;
    bgcolArray.push(bgcol);
    bgcolArray = unique(bgcolArray);
    console.log(bgcolArray);
    this.setState({
      bgcolArray: bgcolArray
    });
    this.setState({
      backgroundcolor: bgcol
    });
    localStorage.setItem('bgcolors', JSON.stringify(bgcolArray));
  }

  


  refreshCanvas = (canvas) => {
    canvas.renderAll(canvas);
    saveCanvasState(canvas);
  }


  incermentpage = () => {
    this.setState({
        pagenum: this.state.pagenum + 1
    },() => {
        this.unsplash();
    });
  }

  addImage = (result) => {
    var canvas = this.props.canvas;
    fabric.Image.fromURL(result, (image) => {
      image.set({
          left: 100,
          top: 100,
          padding: 10,
          cornersize: 10,
          scaleX: 1,
          scaleY: 1
      });
      canvas.add(image);
      image.scaleToWidth(200);
      canvas.setActiveObject(image);
      selectObject(canvas);
      saveCanvasState(canvas);
    },{
      crossOrigin: 'anonymous'
    });
  }

  searchImage = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Let's stop this event.
      e.stopPropagation(); // Really this time.
      this.setState({
        searchkey: e.target.value
      },() => {
        this.pixaybay();
      });
    }
  }

  incerment = () => {
    this.setState({
        page: this.state.page + 1
    },() => {
        this.pixaybay();
    });
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  imagetoggle(tab) {
    if (this.state.imgactiveTab !== tab) {
      this.setState({
        imgactiveTab: tab
      });
    }
  }

  render() {
    const styles = {
      grad1color: {
        background: `${ this.state.grad1color }`,
      },
      grad2color: {
        background: `${ this.state.grad2color }`,
      }
    };

    return (
      <div className="side-panel-container">
        {/* <TabPanel tabId="vertical-tab-one"> */}
          <Container className="text-editer">
            <Row>
              <Col>
                <p className="first-title text-center">Add some text to your artwork.</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <h1 className="big-title" onClick = {this.addHeadingtxt}>Add Heading</h1>
              </Col>
            </Row>
            <Row>
              <Col>
                <h3 className="sub-title" onClick = {this.addSubheadingtxt}>Add Subheading</h3>
              </Col>
            </Row>
            <Row>
              <Col>
                <h5 className="text" onClick = {this.addText}>Add text</h5>
              </Col>
            </Row>
          </Container>
        {/* </TabPanel> */}
        {/* <TabPanel tabId="vertical-tab-two"> */}
          <Container>
            <Row>
              <Col>                              
                <p className="btn btn-primary" onClick={this.showUploadPopup}>Upload BG</p>
              </Col>
              <Col>
                <p className="btn btn-primary" onClick={this.deleteCanvasBg}>Remove BG</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <p className="first-title">Solid Colors</p>
                <div className="solid-colors">
                  {INIT_SOLID_COLORS.map(item => (
                    <span key={item} className="solidcolor" style={{ backgroundColor: item }} onClick={() => this.setBGcolor(item)} />
                  ))}

                  {this.state.bgcolArray.map((colorval, index) => {
                    return (
                      colorval
                        ? <span key={index} style={{ background: colorval }} className="solidcolor" onClick={() => this.setBGcolor(colorval)}></span>
                        : null
                    )
                  })}

                  <span className="solidcolor" onClick={this.bgcolorOpen}>
                    <span className="addcolor">+</span>
                  </span>

                  {this.state.displaybgColorPicker
                    ? <div className="popover">
                        <div className="cover" onClick={this.bgcolorClose}/>
                        <SketchPicker color={this.state.backgroundColor} onChangeComplete={this.setCanvasFill} />
                      </div>
                    : null 
                  }
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <p className="first-title">Gradients</p>
                <div className="gradients-colors">
                 <span className="grdcol1 grdcolor" onClick={() => this.setGradientBGcolor('#62ff00','yellow','vertical')} />
                 <span className="grdcol2 grdcolor" onClick={() => this.setGradientBGcolor('red','yellow','horizontal')} />
                 <span className="grdcol3 grdcolor" onClick={() => this.setGradientBGcolor('#ff9900','#39d4cd','horizontal')} />
                 <span className="grdcol4 grdcolor" onClick={() => this.setGradientBGcolor('rgba(255,0,0,0)','rgba(255,0,0,1)','horizontal')} />
                 <span className="grdcol4 grdcolor" onClick={() => this.setGradientBGcolor('rgba(255,0,0,0)','rgba(255,0,0,1)','horizontal')} />
      
                  {/* <Popup
                    trigger={<span className="grdcolor"><span className="addcolor">+</span></span>}
                    position="top left"
                    closeOnDocumentClick
                  > */}
                    <div className="gradcolorsection">
                      <div className="grdsection">
                        <div className="swatch" onClick={this.grad1colorOpen}>
                          <div className="grad-color" style={styles.grad1color} />
                        </div>
                        {this.state.displaygrad1ColorPicker
                          ? <div className="popover">
                              <div className="cover" onClick={this.grad1colorClose} />
                              <SketchPicker color={this.state.grad1color} onChangeComplete={this.setGradient1BGcolor}/>
                            </div>
                          : null
                        }
                        <div className="swatch" onClick={this.grad2colorOpen}>
                          <div className="grad-color" style={styles.grad2color} />
                        </div>
                        {this.state.displaygrad2ColorPicker
                          ? <div className="popover">
                              <div className="cover" onClick={this.grad2colorClose} />
                              <SketchPicker color={ this.state.grad2color } onChangeComplete={this.setGradient2BGcolor } />
                            </div>
                          : null
                        }
                      </div>
                      <div className="grdsection">
                        <div className="swatch" onClick={this.setVerticalgradient}>
                          <div className="grad-color verticalgradient" title="Vertical" />
                        </div>
                        <div className="swatch" onClick={this.setRadialgradient}>
                          <div className="grad-color radialgradient" title="Radial" />
                        </div>
                      </div>
                    </div>
                  {/* </Popup> */}
                 </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <p className="first-title">Patterns</p>
                <div className="patterns">
                  {INIT_PATTERN_IMAGES.map((item, index) => (
                    <span
                      key={index}
                      className={`pattern${index + 1}`}
                      onClick={() => this.applyBGPattern(item)}
                    />
                  ))}
                </div>
              </Col>
            </Row>
          </Container>
        {/* </TabPanel> */}
        {/* <TabPanel tabId="vertical-tab-three"> */}
          <Container className="text-editer">
            <Nav tabs>
              <Col sm="6">
                <NavItem>
                  <NavLink
                    className={classnames({ active: this.state.imgactiveTab === '1' })}
                    onClick={() => this.imagetoggle('1')}
                  >
                    Pixabay
                  </NavLink>
                </NavItem>
              </Col>
              <Col sm="6">
                <NavItem>
                  <NavLink
                    className={classnames({ active: this.state.imgactiveTab === '2' })}
                    onClick={() => this.imagetoggle('2')}
                  >
                    Unsplash
                  </NavLink>
                </NavItem>
              </Col>
            </Nav>
            <TabContent activeTab={this.state.imgactiveTab}>
              <TabPane tabId="1">
                <Row>
                  <Col sm="12">
                    <div className="pixabaysection">
                      <Form className="searchbar">
                        <Input type="text" onKeyPress={(event) => this.searchImage(event)}  placeholder="Search Images" />
                      </Form>
                      <div ref="iScroll" className="scroller" id="scroll-1">
                        {this.state.apiImg.map((img, index) => (
                          <span className="image-wrapper" key={index} onClick={() => this.addImage(img.largeImageURL)}>
                            <img className="pixabay" src={img.largeImageURL}  alt ="" />
                          </span> 
                        ))}
                      </div>
                    </div>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="2">
                <Row>
                <Col sm="12">
                  <div className="pixabaysection">
                    <Form className="searchbar">
                      <Input type="text" onKeyPress={(event) => this.searchUnsplashimg(event)} placeholder="Search Images" />
                    </Form>
                    <div ref="imgScroll" className="scroller" id="scroll-1">
                      {this.state.unsplashImg.map((photo, index) => {
                        return (
                          <span className="image-wrapper" key={index} onClick={() => this.addImage(photo.urls.small)}>
                            <img className="pixabay" src={photo.urls.small} alt ="" />
                          </span>
                        )
                      })}
                    </div>
                  </div>
                  </Col>
                </Row>
              </TabPane>
            </TabContent>
          </Container>
        {/* </TabPanel> */}

        <TabPanel tabId="vertical-tab-four">
          <Container className="text-editer">
            <Row>
              <Col>
                <Nav tabs>
                  <Col sm="4">
                    <NavItem>
                      <NavLink
                        className={classnames({ active: this.state.activeTab === '1' })}
                        onClick={() => this.toggle('1')}
                      >
                        Shapes
                      </NavLink>
                    </NavItem>
                  </Col>
                  <Col sm="4">
                    <NavItem>
                      <NavLink
                        className={classnames({ active: this.state.activeTab === '2' })}
                        onClick={() => this.toggle('2')}
                      >
                        Icons
                      </NavLink>
                    </NavItem>
                  </Col>
                  <Col sm="4">
                    <NavItem>
                      <NavLink
                        className={classnames({ active: this.state.activeTab === '3' })}
                        onClick={() => { this.toggle('3'); }}
                      >
                        ClipArts
                      </NavLink>
                    </NavItem>
                  </Col>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                  <TabPane tabId="1">
                    <Row>
                      <Col sm="12">
                        <p>Shapes</p>
                        <div className="patterns shapes">
                          {INIT_ELEMENT_ICONS.map((item, index) => (
                            <span
                              key={index}
                              className={`shape${index + 1}`}
                              onClick={() => this.addSVG(item)}
                            />
                          ))}
                        </div>
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="2">
                    <Row>
                      <Col sm="12">
                        <p>Icons</p>
                        <div className="patterns shapes">
                          {INIT_ELEMENT_SHAPES.map((item, index) => (
                            <span
                              key={index}
                              className={`icon${index + 1}`}
                              onClick={() => this.addSVG(item)}
                            />
                          ))}
                        </div>
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="3">
                    <Row>
                      <Col sm="12">
                        <p>Clip Arts</p>
                        <div className="patterns shapes">
                          {INIT_ELEMENT_CLIPARTS.map((item, index) => (
                            <span
                              key={index}
                              className={`clipart${index + 1}`}
                              onClick={() => this.addSVG(item)}
                            />
                          ))}
                        </div>
                      </Col>
                    </Row>
                  </TabPane>
                </TabContent>

                <p>Elements</p>                              
                <p className="btn btn-primary" onClick={this.uploadIcon}>Upload Icon</p>
                <div className="patterns elements">
                  {INIT_ELEMENT_ELEMENTS.map((item, index) => (
                    <span
                      key={index}
                      className={`element${index + 1}`}
                      onClick={() => this.addSVG(item)}
                    />
                  ))}
                </div>
              </Col>
            </Row>
          </Container>
        </TabPanel>
      </div>
    );
  }
}

export default LeftPanel;