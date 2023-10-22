function SortMedia(allMedia) {
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

const Gallery = (props) => {

    const { galleryItems } = props;
    const sortedItems = SortMedia(galleryItems);
    
    return (
        <div className='gallery-row'>
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

export default Gallery