import React, { Component } from 'react';
import Axios from 'axios';

import GalleryItem from './gallery-item.component';
import Gallery from './gallery.component';
import MediaDisplay from './media-display.component';

import '../CSS/gallery.css';

export default class Art extends Component {

    constructor(props) {
        super(props);
        this.state = {
            art: [],
        };
    }

    // Get info from database
    componentDidMount() {
        //featured media
        Axios.get('https://jacobbndct.games/media/type_63cb182e227300bc8c4c4724')
        .then(response => {
            this.setState({ art: response.data });
        })
        .catch((err) => {
            console.log('Error: ' + err);
        });
    }

    GalleryItems() {
        if (this.state.art === undefined || this.state.art.length === 0) {
            console.log("empty");
            return null;
        }

        return this.state.art.map(media => {
            let date = new Date(media.dateOfCreation);

            const type = media.typeOfMedia_ids.name.charAt(0).toUpperCase() + media.typeOfMedia_ids.name.slice(1);

            return <MediaDisplay media={media.previewImageURL} key={media._id}>
                <GalleryItem 
                    key={media._id} 
                    img={media.previewImageURL} 
                    mediaType={type} 
                    name={media.name} 
                    date={date.toDateString().split(' ').slice(1).join(' ')}
                    description={media.description}
                />      
            </MediaDisplay>
        });
    }

    render() {
        let galleryItems = this.GalleryItems();

        return (
            <div className='page-container'>
                <h3>Art Portfolio</h3>
                <p>I started to develop an interest in pursuing art more seriously in early 2021 where I began to spend more time practicing and learning about art. Since 2021 I’ve practiced both digital and traditional forms of art in my spare time. To develop my skills I've studied the styles and methods of different digital artists and done individual practice through exercises such as figure drawing, and still drawings. Below are a few of the works I am more proud of.</p>
                <p>Tools: Procreate, Krita, Maya</p>

                <Gallery galleryItems={galleryItems}></Gallery>
            </div>
        );
    }
}