import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

import GalleryItem from './gallery-item.component';
import Gallery from './gallery.component';

import '../CSS/gallery.css';

export default class Shaders extends Component {

    constructor(props) {
        super(props);
        this.state = {
            shaders: [],
        };
    }

    // Get info from database
    componentDidMount() {
        //featured media
        Axios.get('https://jacobbndct.games/media/type_653fd51043100b1745db48c2')
        .then(response => {
            this.setState({ shaders: response.data });
        })
        .catch((err) => {
            console.log('Error: ' + err);
        });
    }

    GalleryItems() {
        if (this.state.shaders === undefined || this.state.shaders.length === 0) {
            console.log("empty");
            return null;
        }

        return this.state.shaders.map(media => {
            let date = new Date(media.dateOfCreation);

            const type = media.typeOfMedia_ids.name.charAt(0).toUpperCase() + media.typeOfMedia_ids.name.slice(1);

            return <Link to={media.link} target='blank' key={media._id}>
                <GalleryItem 
                    key={media._id} 
                    img={media.previewImageURL} 
                    mediaType={type} 
                    name={media.name} 
                    date={date.toDateString().split(' ').slice(1).join(' ')}
                    description={media.description}
                />
            </Link>
        });
    }

    render() {
        let galleryItems = this.GalleryItems();

        return (
            <div className='page-container'>
                <h3>Shaders</h3>
                <p>Shaders facinate me because they combine art with math and programming. I've explore the use of both fragment and vertex shaders, though most of my projects tend to use fragment shaders. Below are a few shaders that I've written.</p>
                <p>Tools: Shadertoy, Unity</p>
                <Gallery galleryItems={galleryItems}></Gallery>
            </div>
        );
    }
}