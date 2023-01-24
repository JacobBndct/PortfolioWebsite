import React, { Component } from 'react';

export default class GalleryImage extends Component {
    render() {
        return (
            <div className='art-container shadow rounded'>
                <img className='rounded'src={this.props.img} alt={this.props.name} />
                <><b>{this.props.mediaType + ": "}</b> {this.props.name}</>
                <p><b>Date:</b> {this.props.date}</p>
                <p>{this.props.description}</p>
            </div>
        );
    }
}