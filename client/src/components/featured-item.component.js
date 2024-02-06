import React, { Component, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import VanillaTilt from 'vanilla-tilt';
import fitty from 'fitty'

import '../CSS/featuredItems.css'

function Tilt(props) {
    const { options, ...rest } = props;
    const tilt = useRef(null);
  
    useEffect(() => {
      VanillaTilt.init(tilt.current, options);
    }, [options]);
  
    return <div ref={tilt} {...rest} />;
}

function CardColour(type, opacity) {
    return "rgba(var(--" + type.toLowerCase() +"-colour), " + opacity + ")"
}

function CardColourBlendWhite(type, percent) {
    return "color-mix(in srgb, rgb(var(--" + type.toLowerCase() +"-colour)) "+ percent +"%, white)"
    
}

export default class FeaturedItem extends Component {
    
    componentDidMount() {
        fitty('.featured-item-title', {
            maxSize: 300,
            minSize: 6
        });
    }

    render() {
        const options = {
            reverse: true,
            glare: true,
            "max-glare": 0.3,
            scale: 1.1,
            speed: 1000,
            max: 20
        };

        return (
            <Tilt className='featured-item-card shadow rounded' options={options}>
                <Link className='featured-item-link' to={this.props.link}>
                    <div className='featured-item-background' style={{backgroundImage: `url(card_backgrounds/${this.props.mediaType.toLowerCase()}.jpg)`}} data-tilt>
                        <div className='featured-item-container' style={{backgroundColor: CardColour(this.props.mediaType, 0.8)}}>
                            <div className='title-container rounded shadow-sm' style={{backgroundColor: CardColourBlendWhite(this.props.mediaType, 50), borderColor: CardColour(this.props.mediaType, 0.9)}}>
                                <div className='fit-container'>
                                    <h4 className='featured-item-title'>{this.props.name}</h4>
                                </div>
                            </div>
                            <img className='preview-image shadow-sm' src={this.props.img} alt={this.props.name} style={{borderColor: CardColour(this.props.mediaType, 0.9)}}/>
                            <h5 className='featured-item-type rounded shadow-sm' style={{backgroundColor: CardColourBlendWhite(this.props.mediaType, 50), borderColor: CardColour(this.props.mediaType, 0.9)}}>{this.props.mediaType}</h5>
                            <div className='description-text shadow-sm' style={{backgroundColor: "color-mix(in srgb," + CardColour(this.props.mediaType, 0.7) + "40%, white)", borderColor: CardColour(this.props.mediaType, 0.9)}}>
                                <p>{this.props.description}</p>
                            </div>
                            <div className='featured-item-notes'>
                                <p className='featured-item-creators'><b>Creator: Jacob Benedict</b></p>
                                <p className='featured-item-date'><i>Date of creation: {this.props.date}</i></p>
                            </div>
                        </div>
                    </div>
                </Link>
            </Tilt>
        );
    }
}