import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class GalleryItem extends Component {
    render() {
        return (
            <div className='art-container shadow rounded'>
                <h4>{this.props.name}</h4>
                <img className='rounded'src={this.props.img} alt={this.props.name} />
                <p>
                    <br/><b>Date:</b> {this.props.date}
                    {this.props.link == null ? <></> : <span><br/><b>Link:</b></span>} <Link to={this.props.link} target='blank'>{this.props.link}</Link>
                </p>
                <p>{this.props.description}</p>
            </div>
        );
    }
}