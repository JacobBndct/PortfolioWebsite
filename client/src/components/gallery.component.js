import React, { Component } from 'react'
import Axios from 'axios';

import GalleryItem from './gallery-item.component';
import MediaDisplay from './media-display.component';

function SortMedia(allMedia) {
    
    allMedia?.sort((a, b) => {
        return new Date(b.props.children.props.date) - new Date(a.props.children.props.date);
    });

    let sortedMedia = [];
    let array1 = []; 
    let array2 = []; 
    let array3 = [];

    for (var i = 0; i < allMedia?.length; i++) {
        if (i % 3 === 0) {
            array1.push(allMedia[i])
        } else if (i % 3 === 1) {
            array2.push(allMedia[i])
        } else {
            array3.push(allMedia[i])
        }
    }

    sortedMedia.push(array1);
    sortedMedia.push(array2);
    sortedMedia.push(array3);

    return sortedMedia;
}

function GenerateGalleryItems(media_data) {
    if (media_data === undefined || media_data === 0) {
        console.log("gallery empty");
        return null;
    }

    return media_data.map(media => {
        let date = new Date(media.dateOfCreation);

        const type = media.typeOfMedia_ids.name.charAt(0).toUpperCase() + media.typeOfMedia_ids.name.slice(1);
        
        return <MediaDisplay media={media} key={media._id}>
            <GalleryItem 
                key={media._id} 
                img={media.previewImageURL} 
                mediaType={type}
                tools={media.tool_ids[0] != null ? media.tool_ids[0].name : null} 
                name={media.name} 
                date={date.toDateString().split(' ').slice(1).join(' ')}
                description={media.description}
                breakdowns={media.breakdowns}
            />
        </MediaDisplay>
    });
}

export default class Gallery extends Component {

    constructor(props) {
        super(props);
        this.state = {
            media: [],
        };
    }

    GetMedia(media_id) {
        Axios.get(`https://jacobbndct.games/media/type_${media_id}`)
        .then(response =>  {
            this.setState({ media: response.data });
        })
        .catch((err) => {
            console.log('Error: ' + err);
        });
    }

    componentDidMount() {
        this.GetMedia(this.props.mediaType_id)
    }

    render() {
        let items = GenerateGalleryItems(this.state.media);
        let sortedItems = SortMedia(items)

        return (
            <div className='gallery-row'>
                <div className='gallery-col'>
                    {sortedItems?.at(0)}
                </div>
                <div className='gallery-col'>
                    {sortedItems?.at(1)}
                </div>
                <div className='gallery-col'>
                    {sortedItems?.at(2)}
                </div>
            </div>
        );
    }    
}