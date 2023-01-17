import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PortfolioImage from '../images/PortfolioPicture2.png';
import PortfolioImageHover from '../images/PortfolioPicture1.png';

import '../CSS/homepage.css'

// react bootstrap components
import Image from 'react-bootstrap/Image'
import Carousel from './carousel.component';

export default class Home extends Component {
    render() {
        return (
            <div>
                <div>
                    <h3>I'm Jacob Benedict and welcome to my portfolio website :DD</h3>
                    <p>I'm a 3rd year Bachelor of Computer Science student at Dalhousie University in Nova Scotia. I'm also Co-Vice President and a founding member of <a href='https://dalgame.dev/' target={'_blank'} rel="noreferrer">Dalhousie Interactive Gamedev (DIG)</a> & a Student Member of <a href='https://www.interactivenovascotia.com/' target={"_blank"} rel="noreferrer">Interactive Society of Nova Scotia (ISNS)</a>. I am extremely passionate about all aspects of game development with a particular interest in technical art. </p>
                </div>
                <div className='portfolio-image-container'>
                    <Image className='shadow-lg portfolio-image' src={PortfolioImage} fluid roundedCircle />
                </div>
                <div>
                    <h3>Featured Work</h3>
                    <p>Here are a few of my featured projects and works</p>
                    <Carousel show='3'>
                        <div className='featured-item-container'>
                            <Link to="/Art">
                                <img className='preview-image'src={PortfolioImage} alt="placeholder" />
                                <div className='description-text'>
                                    <p>Image1</p>
                                </div>
                            </Link>
                        </div>
                        <div className='featured-item-container'>
                            <Link to="/Art">
                                <img className='preview-image' src="https://via.placeholder.com/1600x300" alt="placeholder" />
                                <div className='description-text'>
                                    <p>Image2</p>
                                </div>
                            </Link>
                        </div>
                        <div className='featured-item-container'>
                            <Link to="/Art">
                                <img className='preview-image' src={PortfolioImageHover} alt="placeholder" />
                                <div className='description-text'>
                                    <p>Image3</p>
                                </div>
                            </Link>
                        </div>
                        <div className='featured-item-container'>
                            <Link to="/Art">
                                <img className='preview-image' src="https://via.placeholder.com/1600x300" alt="placeholder" />
                                <div className='description-text'>
                                        <p>Image4</p>
                                </div>
                            </Link>
                        </div>
                        <div className='featured-item-container'>
                            <Link to="/Art">
                                    <img className='preview-image' src={PortfolioImageHover} alt="placeholder" />
                                    <div className='description-text'>
                                        <p>Image5</p>
                                    </div>
                            </Link>
                        </div>
                    </Carousel>
                </div>
                <div>
                    {/* Click on skill in list of skills to open into pop up with previews of projects that use that skill */}
                    {/* Populate skills depending on skills in the database */}
                    <h3>Skills</h3>
                    <p>See my skills in practice with my projects</p>                
                    <ul>
                        <li>Skill 1</li>
                        <li>Skill 2</li>
                        <li>Skill 3</li>
                        <li>Skill 4</li>
                        <li>Skill 5</li>
                        <li>Skill 6</li>
                        <li>Skill 7</li>
                    </ul>
                </div>
            </div>
        );
    }
}