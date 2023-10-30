import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

import GalleryItem from './gallery-item.component';
import Gallery from './gallery.component';

import '../CSS/gallery.css';

export default class Programming extends Component {

    constructor(props) {
        super(props);
        this.state = {
            projects: [],
        };
    }

    // Get info from database
    componentDidMount() {
        //featured media
        Axios.get('https://jacobbndct.games/media/type_653fd53043100b1745db48c3')
        .then(response => {
            this.setState({ projects: response.data });
        })
        .catch((err) => {
            console.log('Error: ' + err);
        });
    }

    GalleryItems() {
        if (this.state.projects === undefined || this.state.projects.length === 0) {
            console.log("empty");
            return null;
        }

        return this.state.projects.map(media => {
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
                <h3>Programming Projects</h3>
                <p>As a software engineer I love to take on new challenges and push myself. To do this I am constantly learning about new technologies and pushing my understanding of concept further. Some of the general programming projects I am most proud of are include below.</p>
                <p>Programming languages: C#, JavaScript, Python, GLSL, C/C++, Java, HTML, PHP, pyMel</p>
                <Gallery galleryItems={galleryItems}></Gallery>
            </div>
        );
    }
}