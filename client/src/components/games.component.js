import React, { Component } from 'react';
import Axios from 'axios';

import GalleryImage from './gallery-image.component';
import Gallery from './gallery.component';

import '../CSS/gallery.css';

export default class Games extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            games: [],
        };
    }

    // Get info from database
    componentDidMount() {
        //featured media
        Axios.get('http://localhost:5000/media/type_63cb1835227300bc8c4c4726')
        .then(response => {
            this.setState({ games: response.data });
        })
        .catch((err) => {
            console.log('Error: ' + err);
        });
    }

    GalleryItems() {
        if (this.state.games === undefined || this.state.games.length === 0) {
            console.log("empty");
            return null;
        }

        return this.state.games.map(media => {
            let date = new Date(media.dateOfCreation);

            const type = media.typeOfMedia_ids.name.charAt(0).toUpperCase() + media.typeOfMedia_ids.name.slice(1);

            return <GalleryImage 
                key={media._id} 
                link={media.link} 
                img={media.previewImageURL} 
                mediaType={type} 
                name={media.name} 
                date={date.toDateString().split(' ').slice(1).join(' ')}
                description={media.description}
            />
        });
    }



    render() {
        let galleryItems = this.GalleryItems();

        return (
            <div className='page-container'>
                <h3>You are on the Games Page component</h3>
                <p>I've been participating in gamejams as well as developping my own games for a couple years now. I've learned a lot from getting to work with all sorts of people and getting to see what otheres create</p>
                <p>Tools: Unity, Maya</p>
                <Gallery galleryItems={galleryItems}></Gallery>
            </div>
        );
    }
}