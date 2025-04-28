import React, { Component } from 'react';

import '../CSS/gallery.css';

function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);
}

export default class Mobius extends Component {


    render() {
        return (
            <div className='page-container'>
                <div className='dark-section'>
                    <h3>Mobius</h3>
                    <div className='normal-section'>
                        <p>Note to self: don't forget to store code someplace safe!</p>
                        <p>Note to note to self: I've put the code </p>
                        <form onSubmit={handleSubmit}>
                            <label>
                                Code: <input name='code'></input>
                            </label>
                            <button type="submit">Enter</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}