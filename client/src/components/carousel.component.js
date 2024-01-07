import React, { useEffect, useState, useRef } from 'react'
import '../CSS/carousel.css'

import {ReactComponent as RightArrow} from '../image/right-arrow.svg'
import {ReactComponent as LeftArrow} from '../image/left-arrow.svg'

//#region Get Window Size

function GetWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

function UseWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(GetWindowDimensions());

  useEffect(() => {
    function HandleResize() {
      setWindowDimensions(GetWindowDimensions());
    }

    window.addEventListener('resize', HandleResize);
    return () => window.removeEventListener('resize', HandleResize);
  }, []);

  return windowDimensions;
}

//#endregion

function UseInterval(callback, delay) {
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

    const { children, show, length, autoScroll } = props;
    

    const { width } = UseWindowDimensions();

    const [currentIndex, setCurrentIndex] = useState(show);
    const [touchPosition, setTouchPosition] = useState(null);

    const [isShowingDots, setShowingDots] = useState(false);
    const [dots, setDots] = useState(null);

    useEffect(() => {
        console.log(isShowingDots)
        setDots(RenderDots(currentIndex % length));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentIndex]);

    const RenderDots = (index) => {
        let output = [];
        if (length <= 1) {return null}
        for (let i = 0; i < length; i++) {
            if (i === index)
                output.push(<span className='highlighted-dot'/>)
            else
                output.push(<span className='dot'/>);
        }
        return output;
    }
    
    // Set the length to match current children from props

    const Next = () => {
        setCurrentIndex(prevState => parseInt(prevState) + 1);
        setTransitionEnabled(true);
        setShowingDots(true);
    }
    
    const Prev = () => {
        setCurrentIndex(prevState => prevState - 1);
        setTransitionEnabled(true);
        setShowingDots(true);
    }

    const LeftButton = () => {
        if (canClick) {
            Prev();
            setCanClick(false);
            setInteracted(true);
            count = 0;
        }
    }

    const RightButton = () => {
        if (canClick) {
            Next();
            setCanClick(false);
            setInteracted(true);
            count = 0;
        }
    }

    // Auto Scroll through the carousel
    UseInterval(() => {
        if (hasInteracted || !autoScroll) {return;}
        Next();
    }, shortInterval);

    // Reset interaction tracker
    UseInterval(() => {
        count += 1000;
        if (count >= resetInterval) {
            setInteracted(false);
            count = 0;
        }
    }, 1000);

    // // Hide dots
    // UseInterval(() => {
    //     setDots(null);
    // }, 1000);

    const HandleTransitionEnd = () => {
        if (currentIndex <= 0) {
            setTransitionEnabled(false);
            setCurrentIndex(length);
        } else if (currentIndex >= (parseInt(length) + parseInt(show))) {
            setTransitionEnabled(false);
            setCurrentIndex(show);
        }

        setCanClick(true);
    }

    const RenderExtraPrev = () => {
        let output = [];
        if (children === null) {return output}
        for (let index = 0; index < show; index++) {
            output.push(children[length - 1 - index]);
        }
        output.reverse();
        return output;
    }

    const RenderExtraNext = () => {
        let output = [];
        if (children === null) {return output}
        for (let index = 0; index < show; index++) {
            output.push(children[index]);
        }
        return output;
    }

//#region Carousel Touch Controls

    const HandleTouchStart = (e) => {
        const touchDown = e.touches[0].clientX;
        setTouchPosition(touchDown);
    }

    const HandleTouchMove = (e) => {
        const touchDown = touchPosition;
    
        if(touchDown === null) {
            return;
        }
    
        const currentTouch = e.touches[0].clientX;
        const diff = touchDown - currentTouch;
    
        //left swipe
        if (diff > 5) {
            RightButton();
        }
    
        //right swipe
        if (diff < -5) {
            LeftButton();
        }
    
        setTouchPosition(null);
    }

//#endregion

    return (
        <div className="carousel-container">
            <div className="carousel-wrapper">
                {(length > 1) ? <button onClick={LeftButton} className="left-arrow"><LeftArrow fill='gray' width='25' height='25'/></button> : null}
                <div className="carousel-content-wrapper" onTouchStart={HandleTouchStart} onTouchMove={HandleTouchMove}>
                    <div className={`carousel-content`} style={{ 
                        width: `calc((83.5% / ${(width < widthLimit) ? 1 : show}))`, 
                        transform: (length > 1) ? `translateX(-${currentIndex * (100 + 20)}%)` : '0%',
                        transition: !transitionEnabled ? 'none' : undefined, 
                        }}
                        onTransitionEnd={() => HandleTransitionEnd()}
                        >
                        {RenderExtraPrev()}
                        {children}
                        {RenderExtraNext()}
                    </div>
                </div>
                {(length > 1) ? <button onClick={RightButton} className="right-arrow"><RightArrow fill='gray' width='25' height='25'/></button> : null}
                <div className={`dot-container ${(isShowingDots) ? 'dot-show' : 'dot-hidden'}`} onTransitionEnd={() => setShowingDots(false)}>
                    {dots}
                </div>
            </div>
        </div>
    );
}

export default Carousel