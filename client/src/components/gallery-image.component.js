import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class GalleryImage extends Component {
    render() {
        return (
            <div className='art-container shadow rounded'>
                <img className='rounded'src={this.props.img} alt={this.props.name} />
                <p>
                    <b>{this.props.mediaType + ": "}</b> {this.props.name}
                    <br/><b>Date:</b> {this.props.date}
                    {this.props.link == null ? <></> : <span><br/><b>Link:</b></span>} <Link to={this.props.link} target='blank'>{this.props.link}</Link>
                </p>
                <p>{this.props.description}</p>
            </div>
        );
    }
}