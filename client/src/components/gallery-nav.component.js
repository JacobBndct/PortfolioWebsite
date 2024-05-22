import React, { useState, useEffect } from 'react';
import Axios from 'axios';

function CardColour(type) {
    return `rgb(var(--${type.toLowerCase()}-colour))`;
}

async function getMediaCount(media_id) {
    try {
        const response = await Axios.get(`https://jacobbndct.games/media/typeCount_${media_id}`);
        return response.data;
    } catch (err) {
        console.error('Error:', err);
        return 0;
    }
}

const GalleryNav = ({ mediaType_id, mediaType }) => {
    const [background, setBackground] = useState(CardColour('var(--primary-colour)'));
    const [mediaCount, setMediaCount] = useState("");

    useEffect(() => {
        async function fetchData() {
            const count = await getMediaCount(mediaType_id);
            setMediaCount(count);
        }
        fetchData();
    }, [mediaType_id]);

    const handleMouseOver = () => {
        setBackground(CardColour(mediaType));
    };

    const handleMouseOut = () => {
        setBackground('var(--primary-colour)');
    };

    return (
        <div className='normal-section'>
            <div>
                <p>Items: {mediaCount}</p>
            </div>
            <div className='filter-nav'>
                <div>
                    <p>Tool 1 Tool 2 Tool 3</p>
                </div>
                <div className='filter-nav-dropdowns'>
                    <div className='filter-nav-dropdown'>
                        <p className='filter-nav-dropbtn'>Skills</p>
                        <div className='filter-nav-dropdown-content'>
                            <button>Test 1</button>
                            <button>Test 2</button>
                            <button>Test 3</button>
                        </div>
                    </div>
                    <div className='filter-nav-dropdown'>
                        <p className='filter-nav-dropbtn'>Sort</p>
                        <div className='filter-nav-dropdown-content'>
                            <button>Test 1</button>
                            <button>Test 2</button>
                            <button>Test 3</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GalleryNav;
