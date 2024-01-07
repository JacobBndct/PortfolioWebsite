import React, { Component } from 'react';

export default class GalleryItem extends Component {

    render() {
        
        return (
            <div className='gallery-item-container shadow rounded box'>
                <div className='gallery-item-header'>
                    {this.props.toolIcons}
                    <h4 className='gallery-item-name filter-white'>{this.props.name}</h4>
                </div>
                <div className='gallery-item-media'>
                    {this.props.breakdownIcons}
                </div>
                <img className=''src={this.props.img} alt={this.props.name} />
            </div>            
        );
    }
}