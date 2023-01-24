import React, { useEffect, useState, useRef } from 'react'
import '../CSS/carousel.css'

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

function useInterval(callback, delay) {
    const savedCallback = useRef();
  
    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
  
    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
}

const Carousel = (props) => {
    //Constants
    const widthLimit = 992;
    
    const resetInterval = 10000;
    const shortInterval = 3000;

    let count = 0;

    const [canClick, setCanClick] = useState(true);
    const [hasInteracted, setInteracted] = useState(false);

    const [transitionEnabled, setTransitionEnabled] = useState(true);

    const { children, show, length } = props;
    

    const { width } = useWindowDimensions();

    const [currentIndex, setCurrentIndex] = useState(show);
    const [touchPosition, setTouchPosition] = useState(null);

    // Set the length to match current children from props

    const next = () => {
        setCurrentIndex(prevState => parseInt(prevState) + 1);
        setTransitionEnabled(true);
    }
    
    const prev = () => {
        setCurrentIndex(prevState => prevState - 1);
        setTransitionEnabled(true);
    }

    const leftButton = () => {
        if (canClick) {
            prev();
            setCanClick(false);
            setInteracted(true);
            count = 0;
        }
    }

    const rightButton = () => {
        if (canClick) {
            next();
            setCanClick(false);
            setInteracted(true);
            count = 0;
        }
    }

    // Auto Scroll through the carousel
    useInterval(() => {
        if (hasInteracted) {return;}
        next();
    }, shortInterval);

    useInterval(() => {
        count += 1000;
        if (count >= resetInterval) {
            setInteracted(false);
            count = 0;
        }
    }, 1000)

    const handleTransitionEnd = () => {
        if (currentIndex <= 0) {
            setTransitionEnabled(false);
            setCurrentIndex(length);
        } else if (currentIndex >= (parseInt(length) + parseInt(show))) {
            setTransitionEnabled(false);
            setCurrentIndex(show);
        }

        setCanClick(true);
    }

    const renderExtraPrev = () => {
        let output = [];
        if (children === null) {return output}
        for (let index = 0; index < show; index++) {
            output.push(children[length - 1 - index]);
        }
        output.reverse();
        return output;
    }

    const renderExtraNext = () => {
        let output = [];
        if (children === null) {return output}
        for (let index = 0; index < show; index++) {
            output.push(children[index]);
        }
        return output;
    }

//#region Carousel Touch Controls

    const handleTouchStart = (e) => {
        const touchDown = e.touches[0].clientX;
        setTouchPosition(touchDown);
    }

    const handleTouchMove = (e) => {
        const touchDown = touchPosition;
    
        if(touchDown === null) {
            return;
        }
    
        const currentTouch = e.touches[0].clientX;
        const diff = touchDown - currentTouch;
    
        //left swipe
        if (diff > 5) {
            rightButton();
        }
    
        //right swipe
        if (diff < -5) {
            leftButton();
        }
    
        setTouchPosition(null);
    }

//#endregion

    return (
        <div className="carousel-container">
            <div className="carousel-wrapper">
                <button onClick={leftButton} className="left-arrow">{'<'}</button>
                <div className="carousel-content-wrapper" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}>
                    <div className={`carousel-content`} style={{ 
                        width: `calc((83.5% / ${(width < widthLimit) ? 1 : show}))`, 
                        transform: `translateX(-${currentIndex * (100 + 20)}%)`,
                        transition: !transitionEnabled ? 'none' : undefined, 
                        }}
                        onTransitionEnd={() => handleTransitionEnd()}
                        >
                        {renderExtraPrev()}
                        {children}
                        {renderExtraNext()}
                    </div>
                </div>
                <button onClick={rightButton} className="right-arrow">{'>'}</button>
            </div>
        </div>
    );
}

export default Carousel