import React, { Component } from 'react';

import Gallery from './gallery.component';

import '../CSS/gallery.css';

export default class Shaders extends Component {
    render() {
        return (
            <div className='page-container'>
                <div className='dark-section'>
                    <h3>Shaders</h3>
                    <div className='normal-section'>
                        <p>Shaders facinate me because they combine art with math and programming. I've explore the use of both fragment and vertex shaders, though most of my projects tend to use fragment shaders. Below are a few shaders that I've written.</p>
                        <p>Tools: Shadertoy, Unity</p>
                    </div>
                </div>
                <Gallery mediaType_id={'653fd51043100b1745db48c2'}></Gallery>
            </div>
        );
    }
}