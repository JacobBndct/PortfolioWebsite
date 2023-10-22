import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class CarouselItem extends Component {
    render() {
        return (
            <Link className='featured-item-container shadow rounded' to={this.props.link}>
                <img className='preview-image shadow rounded'src={this.props.img} alt={this.props.name} />
                <div className='description-text rounded'>
                    <><b>{this.props.mediaType + ": "}</b> {this.props.name}</>
                    <p><b>Date:</b> {this.props.date}</p>
                    <p>{this.props.description}</p>
                </div>
            </Link>
        );
    }
}