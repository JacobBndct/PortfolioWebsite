import React, { Component } from 'react';
import Gallery from './gallery.component';

import '../CSS/gallery.css';

// function test() {
//     fetch("https://jacobbndct.games/media/add", {
//         method: "POST",
//         body: JSON.stringify({
//             featured: false,

//             typeOfMedia_ids: "63cb182e227300bc8c4c4724",
//             name: "test",
//             description: "this is a test",
//             dateOfCreation: new Date('2022-03-27T14:48:00.000+00:00'),
    
//             previewImageURL: 'https://jb-portfolio-website.s3.ca-central-1.amazonaws.com/A_Dream.jpg',
//             mediaURL: 'https://jb-portfolio-website.s3.ca-central-1.amazonaws.com/A_Dream.jpg',
    
//             tool_ids: [],
//             skill_ids: [],
//         }),
//         headers: {
//             "Content-type": "application/json; charset=UTF-8"
//         }
//     }).then((response) => response.json())
//     .then((json) => console.log(json));
// }

export default class Games extends Component {
    render() {
        return (
            <div className='page-container'>
                <h3>Games Library</h3>
                <p>I've been extremely passionate about games since I was a kid and discovered in University that I am equally passionate about creating them professionally. I'm constantly focused on learning more about games and their creation through my professional working experiences, game jams, mentorships, connecting with industry professionals, and personal projects. I've learned and continue to learn a lot from getting the opportunity to work alongside many amazing people and getting to see what games others create. Here are a few of the games and prototypes of my own that I've created.</p>
                <p>Tools: Unity, Unreal Engine, Godot</p>
                <Gallery mediaType_id={'63cb1835227300bc8c4c4726'}></Gallery>
            </div>
        );
    }
}