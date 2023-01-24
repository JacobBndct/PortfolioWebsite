import React, { Component } from 'react';
import { Outlet } from 'react-router-dom';

// react bootstrap components
import Navbar from './navbar.component'

export default class Root extends Component {
    render() {
        return (
            <>
                <Navbar />
                <br />
                <Outlet />
            </>
        );
    }
}