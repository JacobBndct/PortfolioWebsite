import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

import GalleryItem from './gallery-item.component';
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
        Axios.get('https://jacobbndct.games/media/type_63cb1835227300bc8c4c4726')
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
                <h3>Games Library</h3>
                <p>I've been extremely passionate about games since I was a kid and discovered in University that I am equally passionate about creating them professionally. I'm constantly focused on learning more about games and their creation through my professional working experiences, game jams, mentorships, connecting with industry professionals, and personal projects. I've learned and continue to learn a lot from getting the opportunity to work alongside many amazing people and getting to see what games others create. Here are a few of the games and prototypes of my own that I've created.</p>
                <p>Tools: Unity, Unreal Engine, Godot, Maya</p>

                <Gallery galleryItems={galleryItems}></Gallery>
            </div>
        );
    }
}