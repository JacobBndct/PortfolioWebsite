import React, { Component } from 'react';

export default class GalleryItem extends Component {
    render() {
        return (
            <div className='gallery-item-container shadow rounded'>
                <h4>{this.props.name}</h4>
                <img className='rounded'src={this.props.img} alt={this.props.name} />
                <p>
                    <br/><b>Date:</b> {this.props.date}
                </p>
                <p>{this.props.description}</p>
            </div>            
        );
    }
}