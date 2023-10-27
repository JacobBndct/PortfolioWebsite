import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../CSS/featuredItems.css'

export default class CarouselItem extends Component {
    render() {
        return (
            <Link className='featured-item-card shadow rounded' to={this.props.link}>
                <div className='featured-item-container'>
                    <h4 className='featured-item-title rounded shadow-sm'>{this.props.name}</h4>
                    <img className='preview-image shadow-sm'src={this.props.img} alt={this.props.name} />
                    <h5 className='featured-item-type rounded shadow-sm'>{this.props.mediaType}</h5>
                    <div className='description-text shadow-sm'>
                        <p>{this.props.description}</p>
                    </div>
                    <div className='featured-item-notes'>
                        <p className='featured-item-creators'><b>Creator: Jacob Benedict</b></p>
                        <p className='featured-item-date'><i>Date of creation: {this.props.date}</i></p>
                    </div>
                </div>
            </Link>
        );
    }
}