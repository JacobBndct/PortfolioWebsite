import React, { Component } from 'react';
import PortfolioImage from '../images/PortfolioPicture2.png';
import PortfolioImageHover from '../images/PortfolioPicture1.png';

// react bootstrap components
import Image from 'react-bootstrap/Image'
import Carousel from 'react-bootstrap/Carousel';

export default class Home extends Component {
    render() {
        return (
            <div>
                <div style={{
                    display: 'block', 
                    width: '50%', 
                    margin: 'auto', 
                    padding: 30
                }}>
                    <Image className='shadow-lg' 
                    src={PortfolioImage} 
                    fluid 
                    roundedCircle 
                    style={
                        {
                            width: '100%',
                            height: '100%',
                            maxWidth: '500px',
                            maxHeight: '500px',
                        }
                    }/>
                </div>
                <div>
                    <p>I'm Jacob Benedict, a 3rd year student at Dalhousie University in Nova Scotia. I am extremely passionate about technical art, art, and game design.</p>
                </div>
                <div>
                    <h3>Featured Work</h3>
                    <Carousel>
                        <Carousel.Item>
                            <img
                            className="d-block w-100"
                            src={PortfolioImage}
                            alt="First slide"
                            />
                            <Carousel.Caption>
                            <h3>First slide label</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                            className="d-block w-100"
                            src={PortfolioImage}
                            alt="Second slide"
                            />
                            <Carousel.Caption>
                            <h3>Second slide label</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                            className="d-block w-100"
                            src={PortfolioImage}
                            alt="Third slide"
                            />
                            <Carousel.Caption>
                            <h3>Third slide label</h3>
                            <p>
                                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                            </p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        </Carousel>
                </div>
            </div>
        );
    }
}