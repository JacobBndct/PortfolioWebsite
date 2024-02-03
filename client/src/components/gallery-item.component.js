import React, { Component } from 'react';

function CardColour(type) {
    return "linear-gradient(180deg, var(--" + type.toLowerCase() +"-colour) 0%, var(--" + type.toLowerCase() +"-colour) 100%)"
}

export default class GalleryItem extends Component {

    render() {
        
        return (
            <div className='gallery-item-container shadow rounded box' style={{background: CardColour(this.props.mediaType)}}>
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