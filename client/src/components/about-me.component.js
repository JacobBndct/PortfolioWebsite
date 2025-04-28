import React, { useEffect, useState } from 'react'

// React Bootstrap Components
import Image from 'react-bootstrap/Image'

//#region Get Window Size

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

//#endregion

const AboutMe = () => {
    //Constants
    const widthLimit = 992;

    //Variables
    const { width } = useWindowDimensions();

    return (
        <div className='row align-items-center normal-section'>
            <div className={`${(width < widthLimit) ? '' : 'col-6 order-2'}`}>
                <div className='portfolio-image-container d-flex justify-content-center'>
                    <Image className='shadow-lg portfolio-image' src="https://jb-portfolio-website.s3.ca-central-1.amazonaws.com/PortfolioPicture2.png" fluid roundedCircle />
                </div>
            </div>
            <div className={`${(width < widthLimit) ? '' : 'col-6'}`}>
                <div className=''>
                    <h3>About Me</h3>
                    <p>
                      I have a Bachelor of Computer Science and a certificate in Certificate in Graphics, Gaming, and Media from Dalhousie University in Halifax, Nova Scotia.
                    </p>
                    <p>
                    I'm Co-Founder of <a href='https://dalgame.dev/' target={'_blank'} rel="noreferrer">Dalhousie Interactive Gamedev (DIG)</a> & a Student Member of the <a href='https://www.interactivenovascotia.com/' target={"_blank"} rel="noreferrer">Interactive Society of Nova Scotia (ISNS)</a>.
                    </p>
                    <p>
                    I am extremely passionate about all aspects of game development with a particular interest in game design and technical art. 
                    </p>
                </div>
            </div>
        </div>
    );
}

export default AboutMe