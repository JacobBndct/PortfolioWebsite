import React, { Component } from 'react'
import Axios from 'axios';

import GalleryItem from './gallery-item.component';
import MediaDisplay from './media-display.component';

import image from '../image/media_types/image.svg'

// function useDynamicSVGImport(name) {
//     const ImportedIconRef = useRef();
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState();

//     useEffect(() => {
//         setLoading(true);
//         const importIcon = async () => {
//             try {              
//                 ImportedIconRef.current = (await import(`!!@svgr/webpack?-svgo,+titleProp,+ref!../image/media_types/${name}.svg`)).default;
//                 console.log(`${name} successfully loaded`);
//             } catch (err) {
//                 console.error(err.message);
//                 setError(err);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         importIcon();
//     }, []);

//     return { error, loading, SvgIcon: ImportedIconRef.current };
// }

// const Icon = ({ name, ...rest }) => {
//     const { error, loading, SvgIcon } = useDynamicSVGImport(name);
//     if (error) {
//         return null;
//     }
//     if (loading) {
//         return "Loading...";
//     }
//     if (SvgIcon) {
//         return <SvgIcon {...rest} />;
//     }
//     return null;
// };

const Icon = ({ name, ...rest }) => {
    const reqSvgs = require.context("!!@svgr/webpack?-svgo,+titleProp,+ref!../image/media_types/", true, /\.svg$/);

    const svgs = reqSvgs.keys().reduce((svgFiles, path) => {
            svgFiles[path] = reqSvgs(path).default
            return svgFiles
        }, {} 
    );
    
    const SvgIcon = svgs[`./${name}.svg`];
    
    return (SvgIcon) ? <SvgIcon {...rest} /> : null;
}

function findMediaType(breakdowns) {
    let mediaTypes = [<div className='gallery-item-media-box rounded'>
        <img className='filter-white' src={image} alt='tool'/>
    </div>]

    let breakdownTypes = findMediaTypeHelper(breakdowns);
    
    mediaTypes.push(breakdownTypes?.map( types => {
        return <div className='gallery-item-media-box rounded '>
                <Icon width='100%' height='100%' className='filter-white' alt='tool' name={types}/>
            </div>
        })
    );

    return mediaTypes
}

function findMediaTypeHelper(breakdowns) {

    if (breakdowns == null) return;
    
    let breakdownTypes = [];

    for (const breakdown of breakdowns) {
        if (!breakdownTypes.includes(breakdown.type) && breakdown.type !== 'image') {
            breakdownTypes.push(breakdown.type);
        }
    }

    return breakdownTypes;
}

function SortMedia(allMedia) {
    
    allMedia?.sort((a, b) => {
        return new Date(b.props.children.props.date) - new Date(a.props.children.props.date);
    });

    let sortedMedia = [];
    let array1 = []; 
    let array2 = []; 
    let array3 = [];

    for (var i = 0; i < allMedia?.length; i++) {
        if (i % 3 === 0) {
            array1.push(allMedia[i])
        } else if (i % 3 === 1) {
            array2.push(allMedia[i])
        } else {
            array3.push(allMedia[i])
        }
    }

    sortedMedia.push(array1);
    sortedMedia.push(array2);
    sortedMedia.push(array3);

    return sortedMedia;
}

function GenerateGalleryItems(media_data) {
    if (media_data === undefined || media_data === 0) {
        console.log("gallery empty");
        return null;
    }

    return media_data.map(media => {
        let date = new Date(media.dateOfCreation);

        const type = media.typeOfMedia_ids.name.charAt(0).toUpperCase() + media.typeOfMedia_ids.name.slice(1);

        const mediaToolIcons = <Icon className='gallery-item-logo filter-white' alt='tool' name={media.tool_ids[0] != null ? media.tool_ids[0].name : null}/>;
        const mediaBreakdownIcons = findMediaType(media.breakdowns);
        
        return <MediaDisplay media={media} key={media._id}>
            <GalleryItem 
                key={media._id} 
                img={media.previewImageURL} 
                mediaType={type}
                tools={media.tool_ids[0] != null ? media.tool_ids[0].name : null}
                toolIcons={mediaToolIcons}
                name={media.name} 
                date={date.toDateString().split(' ').slice(1).join(' ')}
                description={media.description}
                breakdowns={media.breakdowns}
                breakdownIcons={mediaBreakdownIcons}
            />
        </MediaDisplay>
    });
}

export default class Gallery extends Component {

    constructor(props) {
        super(props);
        this.state = {
            media: [],
        };
    }

    GetMedia(media_id) {
        Axios.get(`https://jacobbndct.games/media/type_${media_id}`)
        .then(response =>  {
            this.setState({ media: response.data });
        })
        .catch((err) => {
            console.log('Error: ' + err);
        });
    }

    componentDidMount() {
        this.GetMedia(this.props.mediaType_id)
    }

    render() {
        let items = GenerateGalleryItems(this.state.media);
        let sortedItems = SortMedia(items)

        return (
            <div className='gallery-row wide-section'>
                <div className='gallery-col'>
                    {sortedItems?.at(0)}
                </div>
                <div className='gallery-col'>
                    {sortedItems?.at(1)}
                </div>
                <div className='gallery-col'>
                    {sortedItems?.at(2)}
                </div>
            </div>
        );
    }    
}