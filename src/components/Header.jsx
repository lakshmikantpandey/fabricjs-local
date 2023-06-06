import React from 'react';
import {Container} from 'react-bootstrap';
import {Nav} from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import logoImg from '../assets/images/logoLight.png'
import { Back, Save2Fill, ArrowBarLeft, Download } from 'react-bootstrap-icons';

const Header = ( {onDownload}) => {

  return (
    <Navbar bg="light" expand="lg">
      <Container style={{backgroundColor: '#7271f5', color: 'white'}} fluid>
        <Navbar.Brand href="#">
        <img height={60} width={150} src={logoImg}></img></Navbar.Brand>
        {/* <Navbar.Toggle aria-controls="navbarScroll" /> */}
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0"style={{ maxHeight: '100px' }}navbarScroll></Nav>
          {/* <Nav.Link href="#action1"> <Back size={20}/></Nav.Link>
          <Nav.Link href="#action2"><Save2Fill size={20}/></Nav.Link> */}
          {/* <Nav.Link href="#action3"><ArrowBarLeft size={20}/></Nav.Link> */}
          <button style={{float: 'right', backgroundColor: 'white'}} onClick={onDownload} className="download_btn btn btn-sm btn-primary"><Download color='black' size={18}/></button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;