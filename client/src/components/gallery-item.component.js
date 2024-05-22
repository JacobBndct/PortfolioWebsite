import React, { Component } from 'react';

function CardColour(type) {
    return "rgb(var(--" + type.toLowerCase() +"-colour))"
}

export default class GalleryItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            background: CardColour('var(--primary-colour)')
        };
    }

    handleMouseOver = () => {
        this.setState({ background: CardColour(this.props.mediaType) });
    };

    handleMouseOut = () => {
        this.setState({ background: 'var(--primary-colour)' });
    };

    render() {
        return (
            <div 
                className='gallery-item-container shadow rounded box gallery-item-animate' 
                style={{background: this.state.background, transition: "background 150ms ease-in-out"}}
                onMouseOver={this.handleMouseOver}
                onMouseOut={this.handleMouseOut}
            >
                <div className='gallery-item-header'>
                    {this.props.toolIcons}
                    <h4 className='gallery-item-name filter-white'>{this.props.name}</h4>
                </div>
                <div className='gallery-item-media'>
                    {this.props.breakdownIcons}
                </div>
                <div className='gallery-item-thumbnail-container'>
                    <img className='gallery-item-thumbnail'src={this.props.img} alt={this.props.name} />
                </div>
            </div>            
        );
    }
}