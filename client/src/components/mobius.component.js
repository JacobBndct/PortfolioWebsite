import React, { Component } from 'react';

import '../CSS/gallery.css';

export default class Mobius extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
    
        const form = e.target;
        const formData = new FormData(form);
    
        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);
      }

    render() {
        return (
            <div className='page-container'>
                <div className='dark-section'>
                    <h3>Mobius</h3>
                    <div className='normal-section'>
                        <p>Note to self: don't forget to store code someplace safe!</p>
                        <p>Note to note to self: I've put the code </p>
                        <label>
                            Code: <input name='code'></input>
                        </label>
                    </div>
                </div>
            </div>
        );
    }
}