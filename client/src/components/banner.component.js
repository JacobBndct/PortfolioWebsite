import React, { useEffect, useState } from 'react'

import '../CSS/homepage.css'

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

const Banner = () => {
    //Constants
    const widthLimit = 992;

    //Variables
    const { width } = useWindowDimensions();

    return (
        <div className='banner'>
            <div className='art-section'></div>
            <div className='game-section'></div>
            <div className='tech-art-section'></div>
            <div className='programming-section'></div>
            <div className='banner-textbox'>
              <div className='banner-align'>
                <h1 className='banner-h1'>Jacob Benedict</h1>
                <h3 className='banner-h3'>Art - Games - Tech Art - Programming</h3>
              </div>
            </div>
        </div>
    );
}

export default Banner