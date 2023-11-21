import React, { Component } from 'react';

import Gallery from './gallery.component';

import '../CSS/gallery.css';

export default class Programming extends Component {
    render() {
        return (
            <div className='page-container'>
                <h3>Programming Projects</h3>
                <p>As a software engineer I love to take on new challenges and push myself. To do this I am constantly learning about new technologies and pushing my understanding of concept further. Some of the general programming projects I am most proud of are include below.</p>
                <p>Programming languages: C#, JavaScript, Python, GLSL, C/C++, Java, HTML, PHP, pyMel</p>
                <Gallery mediaType_id={'653fd53043100b1745db48c3'}></Gallery>
            </div>
        );
    }
}