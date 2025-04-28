import React, { Component } from 'react';

import '../CSS/gallery.css';
import '../CSS/mobius.css';

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
                                <p className='incorrect'>Your code is incorrect.</p>
                            }
                            {
                                this.state.code !== '' && this.state.code == '--|-..|-.' &&
                                <p className='correct'>Your code is correct.</p>
                            }
                        </form>
                    </div>
                    {
                        this.state.code !== '' && this.state.code == '--|-..|-.' &&
                        <div>
                            <div className='normal-section message-animate'> 
                                <h3>Congratulations Explorer!</h3>
                                <p>If you're reading this that means you've discovered and solved my mini ARG puzzle in my application.</p>
                                <p>Now that I've got your attention, I thought I would take this opportunity to write out something a little more sincere than I would normally get to put in an application.</p>
                                <p>Outer Wilds has truly had a profound impact on my life. The game has pushed me to continue to be curious, follow my passions, and helped me connection with so many people.</p>
                                <p>If you've read this far, I've included a bit of fan-art I made back in 2023 below.</p>
                                <p> Thanks for bringing a bit more curiosity to the world :)</p>
                            </div>
                            <div className='message-animate'>
                                <img src='https://jb-portfolio-website.s3.ca-central-1.amazonaws.com/OuterWilds.png'/> 
                            </div>
                        </div>
                       
                    }
                </div>
            </div>
        );
    }
}