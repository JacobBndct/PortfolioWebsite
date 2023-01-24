import React, { Component } from 'react';
import Axios from 'axios';

import GalleryImage from './gallery-image.component';

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
        Axios.get('http://localhost:5000/media/type_63cb182e227300bc8c4c4724')
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

            return <GalleryImage 
                key={media._id} 
                link={"/" + type} 
                img={media.previewImageURL} 
                mediaType={type} 
                name={media.name} 
                date={date.toDateString().split(' ').slice(1).join(' ')}
                description={media.description}
            />
        });
    }

    render() {
        return (
            <div>
                <h3>Welcome to my art gallery</h3>
                <p>I started drawing and developing an interest in art early in 2020. Since then I've developped my skills and started practicing my art skills on paper and eventually moved towards digital. I've studied a few different digital artist and worked on improving my own skills with figure drawing and still drawings</p>
                <p>Tools: Procreate, Krita, Maya</p>

                <div className='gallery-container'>
                    {this.GalleryItems()}
                </div>
            </div>
        );
    }
}