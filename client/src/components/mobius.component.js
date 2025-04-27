import React, { Component } from 'react';

import '../CSS/gallery.css';

export default class Mobius extends Component {
    render() {
        return (
            <div className='page-container'>
                <div className='dark-section'>
                    <h3>Mobius</h3>
                    <div className='normal-section'>
                        <p>Note to self: don't forget to store code someplace safe!</p>
                        <p>Note to note to self: I've put the code </p> 
                        <input>Code</input>
                    </div>
                </div>
            </div>
        );
    }
}