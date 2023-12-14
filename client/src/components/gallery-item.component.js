import React, { Component, useEffect, useRef, useState } from 'react';

import image from '../image/media_types/image.svg'

function useDynamicSVGImport(name) {
    const ImportedIconRef = useRef();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        setLoading(true);
        const importIcon = async () => {
            try {
                ImportedIconRef.current = (await import(`!!@svgr/webpack?-svgo,+titleProp,+ref!../image/media_types/${name}.svg`)).default;
                console.log(`${name} successfully loaded`)
            } catch (err) {
                console.error(err.message);
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        importIcon();
    }, [name]);

    return { error, loading, SvgIcon: ImportedIconRef.current };
}

function findMediaType(breakdowns) {
    let mediaTypes = [<div className='gallery-item-media-box rounded'>
        <img className='filter-white' src={image} alt='tool'/>
    </div>]

    let breakdownTypes = findBreakdownTypes(breakdowns);
    
    mediaTypes.push(breakdownTypes?.map( types => {
        return <div className='gallery-item-media-box rounded '>
                <Icon width='100%' height='100%' className='filter-white' alt='tool' name={types}/>
            </div>
        })
    );

    return mediaTypes
}

function findBreakdownTypes(breakdowns) {

    if (breakdowns == null) return;
    
    let breakdownTypes = [];

    for (const breakdown of breakdowns) {
        if (!breakdownTypes.includes(breakdown.type) && breakdown.type !== 'image') {
            breakdownTypes.push(breakdown.type);
        }
    }

    return breakdownTypes;
}   

const Icon = ({ name, ...rest }) => {
    const { error, loading, SvgIcon } = useDynamicSVGImport(name);
    if (error) {
        return null;
    }
    if (loading) {
        return "Loading...";
    }
    if (SvgIcon) {
        return <SvgIcon {...rest} />;
    }
    return null;
};

export default class GalleryItem extends Component {

    render() {

        return (
            <div className='gallery-item-container shadow rounded box'>
                <div className='gallery-item-header'>
                    <Icon className='gallery-item-logo filter-white' alt='tool' name={this.props.tools}/>
                    <h4 className='gallery-item-name filter-white'>{this.props.name}</h4>
                </div>
                <div className='gallery-item-media'>
                    {findMediaType(this.props.breakdowns)}
                </div>
                <img className=''src={this.props.img} alt={this.props.name} />
            </div>            
        );
    }
}