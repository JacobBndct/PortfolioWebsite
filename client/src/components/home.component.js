import React, { Component } from 'react';
import Axios from 'axios';

// CSS
import '../CSS/homepage.css'

// React Bootstrap Components
import Image from 'react-bootstrap/Image'

import Carousel from './carousel.component';
import CarouselItem from './carousel-item.component';


function truncateString(str, cutOff) {
    if (str.length <= cutOff) {
      return str
    }
    let index = str.lastIndexOf(" ", cutOff);
    return str.slice(0, index) + ' . . .'
}

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            featuredMedia: [],
            skills: [],
            typesOfMedia: []
        };
    }

    // Get info from database
    componentDidMount() {
        //featured media
        Axios.get('http://localhost:5000/media/featured')
        .then(response => {
            this.setState({ featuredMedia: response.data });
        })
        .catch((err) => {
            console.log('Error: ' + err);
        });

        //skills
        Axios.get('http://localhost:5000/skills/')
        .then(response => {
            this.setState({ skills: response.data });
        })
        .catch((err) => {
            console.log('Error: ' + err);
        });
    }

    CarouselItems() {
        if (this.state.featuredMedia === undefined || this.state.featuredMedia.length === 0) {
            console.log("empty");
            return null;
        }

        return this.state.featuredMedia.map(media => {
            let date = new Date(media.dateOfCreation);

            const type = media.typeOfMedia_ids.name.charAt(0).toUpperCase() + media.typeOfMedia_ids.name.slice(1);

            return <CarouselItem 
                key={media._id} 
                link={"/" + type} 
                img={media.previewImageURL} 
                mediaType={type} 
                name={media.name} 
                date={date.toDateString().split(' ').slice(1).join(' ')}
                description={truncateString(media.description, 90)}
            />
        });
    }

    ListItems() {
        return this.state.skills.map(skill => {
            return <li key={skill._id}>{skill.name}</li>
        });
    }

    render() {
        return (
            <div>
                <div className='homepage-section'>
                    <h3>About Me</h3>
                    <p>I'm Jacob Benedict and welcome to my portfolio website. I'm a 3rd year Bachelor of Computer Science student at Dalhousie University in Nova Scotia. I'm also Co-Vice President and a founding member of <a href='https://dalgame.dev/' target={'_blank'} rel="noreferrer">Dalhousie Interactive Gamedev (DIG)</a> & a Student Member of <a href='https://www.interactivenovascotia.com/' target={"_blank"} rel="noreferrer">Interactive Society of Nova Scotia (ISNS)</a>. I am extremely passionate about all aspects of game development with a particular interest in technical art. </p>
                    <div className='portfolio-image-container'>
                    <Image className='shadow-lg portfolio-image' src="https://jb-portfolio-website.s3.ca-central-1.amazonaws.com/PortfolioPicture2.png" fluid roundedCircle />
                </div>
                </div>
                <div className='homepage-section'>
                    <h3>Featured Work</h3>
                    <p>Here are a few of my featured projects and works</p>
                    <Carousel show='3' length={this.state.featuredMedia.length}>
                        {  this.CarouselItems() }    
                    </Carousel>
                </div>
                <div className='homepage-section'>
                    {/* Click on skill in list of skills to open into pop up with previews of projects that use that skill */}
                    {/* Populate skills depending on skills in the database */}
                    <h3>Skills</h3>
                    <p>See my skills in practice with my projects</p>                
                    <ul>
                        { this.ListItems() }
                    </ul>
                </div>
            </div>
        );
    }
}