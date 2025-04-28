import React, { Component } from 'react';

import '../CSS/gallery.css';

export default class Mobius extends Component {
    constructor(props) {
        super(props);
        this.state = {
          code: ''
        };
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
    
        const form = e.target;
        const formData = new FormData(form);
    
        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);

        this.setState({code: formJson.code})
    }

    render() {
        return (
            <div className='page-container'>
                <div className='dark-section'>
                    <h3>Mobius</h3>
                    <div className='normal-section'>
                        <p>Note to self: don't forget to store code someplace safe!</p>
                        <p>Note to note to self: I've put the code </p>
                        <form onSubmit={this.handleSubmit}>
                            <label>
                                Code: <input name='code'></input>
                            </label>
                            <button type="submit">Enter</button>
                            {
                                this.state.code !== '' && this.state.code !== '--|-..|-.' &&
                                <p>Your code is incorrect.</p>
                            }
                            {
                                this.state.code !== '' && this.state.code == '--|-..|-.' &&
                                <p>Your code is correct.</p> &&
                                <img src='https://jb-portfolio-website.s3.ca-central-1.amazonaws.com/OuterWilds.png'/>
                            }
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}