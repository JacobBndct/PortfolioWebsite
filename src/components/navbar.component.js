import React, { Component } from 'react';
import { Link, Outlet } from 'react-router-dom';

// react bootstrap components
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import Test from './test.component'

export default class CustomNavbar extends Component {
    render() {
        return (
            <>
                <Navbar className='sticky-top' bg="primary" variant='dark' expand="lg">
                    <Container>
                        <Navbar.Brand><Link to="/" className='navbar-brand'>Jacob Benedict's Portfolio Website</Link></Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link><Link to="/Art" className='nav-link'>Art</Link></Nav.Link>
                                <Nav.Link><Link to="/Games" className='nav-link'>Games</Link></Nav.Link>
                                <Nav.Link><Link to="/Shaders" className='nav-link'>Shaders</Link></Nav.Link>
                                <Nav.Link><Link to="/Rigging" className='nav-link'>Rigging</Link></Nav.Link>
                                <Nav.Link><Link to="/Technical-Art" className='nav-link'>Technical Art</Link></Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                
                <br />
                <Test />
                <Outlet />
            </>
        );
    }
}