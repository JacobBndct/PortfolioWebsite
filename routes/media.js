const router = require('express').Router();
let Media = require('../models/media.model');

//#region get routes

// get all media route
router.route('/').get((req, res) => {
    Media.find()
    .populate('typeOfMedia_ids')
    .populate('tool_ids')
    .populate('skill_ids')  
    .then(media => res.json(media))
    .catch(err => res.status(400).json('Error: ' + err));
});

// get all featured media
router.route('/featured').get((req, res) => {
    Media.find({featured: true})
    .populate('typeOfMedia_ids')
    .populate('tool_ids')
    .populate('skill_ids') 
    .then(media => res.json(media))
    .catch(err => res.status(400).json('Error: ' + err));
});

// get all media for a type
router.route('/type_:typeOfMedia').get((req, res) => {
    Media.find({typeOfMedia_ids: req.params.typeOfMedia})
    .populate('typeOfMedia_ids')
    .populate('tool_ids')
    .populate('skill_ids') 
    .then(media => res.json(media))
    .catch(err => res.status(400).json('Error: ' + err));
});

// get media by id route
router.route('/id_:id').get((req, res) => {
    Media.findById(req.params.id)
    .populate('typeOfMedia_ids')
    .populate('tool_ids')
    .populate('skill_ids') 
    .then(media => res.json(media))
    .catch(err => res.status(400).json('Error: ' + err));
});

//#endregion

//#region add routes

// add new media route
router.route('/add').post((req, res) => {
    let featured = req.body.featured;

    let typeOfMedia_ids = req.body.typeOfMedia_ids;
    let name = req.body.name;
    let description = req.body.description;
    let dateOfCreation = Date.parse(req.body.dateOfCreation);

    let previewImageURL = req.body.previewImageURL;
    let mediaURL = req.body.mediaURl;
    
    let tool_ids = req.body.tool_ids;
    let skill_ids = req.body.skill_ids;

    let newMedia = new Media({
        featured,

        typeOfMedia_ids,
        name,
        description,
        dateOfCreation,

        previewImageURL,
        mediaURL,

        tool_ids,
        skill_ids,
    });

    newMedia.save()
    .then(() => res.json('New media has added'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//#endregion

//#region delete routes

// delete media by id route
router.route('/:id').delete((req, res) => {
    Media.findByIdAndDelete(req.params.id)
    .then(() => res.json('Media was deleted'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//#endregion

//#region update routes

// update media by id route
router.route('/update/:id').post((req, res) => {
    Media.findById(req.params.id)
    .then(media => {
        media.featured = req.body.featured;

        media.typeOfMedia = req.body.typeOfMedia;
        media.name = req.body.name;
        media.description = req.body.description;
        media.dateOfCreation = Date.parse(req.body.dateOfCreation);
    
        media.previewImageURL = req.body.previewImageURL;
        media.mediaURL = req.body.mediaURl;
        
        media.tool_ids = req.body.tool_ids;
        media.skill_ids = req.body.skill_ids;

        media.save()
        .then(() => res.json('Media has been updated'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

//#endregion

module.exports = router; 