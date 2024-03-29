import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// CSS
import '../CSS/navbar.css'

import githubLogo from '../image/github.svg'
import envelopeLogo from '../image/envelope-solid.svg'
import linkedinLogo from '../image/linkedin.svg'

// react bootstrap components
import NavBS from 'react-bootstrap/Nav';
import NavbarBS from 'react-bootstrap/Navbar';
// import NavDropdownBS from 'react-bootstrap/NavDropdown';

export default class Navbar extends Component {
    render() {
        return (
            <NavbarBS className='nav-bar sticky-top' variant='dark' expand="lg">
                <NavbarBS.Brand><Link to="/" className='navbar-brand'>JACOB BENEDICT</Link></NavbarBS.Brand>
                <NavbarBS.Toggle aria-controls="basic-navbar-nav" />
                <NavbarBS.Collapse id="basic-navbar-nav">
                    <NavBS className="me-auto">
                        <NavBS.Item><Link to="/Art" className='nav-link nav-dir'>Art</Link></NavBS.Item>
                        <NavBS.Item><Link to="/Game" className='nav-link nav-dir'>Games</Link></NavBS.Item>
                        <NavBS.Item><Link to="/Shaders" className='nav-link nav-dir'>Shaders</Link></NavBS.Item>
                        <NavBS.Item><Link to="/Programming" className='nav-link nav-dir'>Programming</Link></NavBS.Item>                       
                        {/* <NavDropdownBS title="Technical Art" id='nav-down'>
                            <Link to="/Rigging" className='nav-link nav-dir'>Rigging</Link>
                            <Link to="/Technical-Art" className='nav-link nav-dir'>Technical Art</Link>
                        </NavDropdownBS> */}

                    </NavBS>
                    <NavBS className="navbar-nav sm-icons mr-0">
                        <NavBS.Item>
                            <a href="https://github.com/JacobBndct" target="_blank" rel="noreferrer" className='nav-link nav-dir filter-white'><img src={githubLogo} alt='github' height={35} /></a>
                        </NavBS.Item>
                        <NavBS.Item>
                            <a href="https://www.linkedin.com/in/jacob-benedict" target="_blank" rel="noreferrer" className='nav-link nav-dir filter-white'><img src={linkedinLogo} alt='linkedin' height={35} /></a>
                        </NavBS.Item>
                        <NavBS.Item>
                            <a href="mailto:jacobbndct@gmail.com" target="_blank" rel="noreferrer" className='nav-link nav-dir filter-white'><img src={envelopeLogo} alt='email' height={35} /></a>
                        </NavBS.Item>
                    </NavBS>
                </NavbarBS.Collapse>
            </NavbarBS>
        );
    }
}