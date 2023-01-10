const router = require('express').Router();
let Media = require('../models/media.models');

// get all media route
router.route('/').get((req, res) => {
    Media.find()
    .then(media => res.json(media))
    .catch(err => res.status(400).json('Error: ' + err));
});

// get media by id route
router.route('/:id').get((req, res) => {
    Media.findById(req.params.id)
    .then(media => res.json(media))
    .catch(err => res.status(400).json('Error: ' + err));
});

// get all featured media
router.route('/').get((req, res) => {
    Media.find()
    .then(media => res.json(media))
    .catch(err => res.status(400).json('Error: ' + err));
})

// add new media route
router.route('/add').post((req, res) => {
    // if(req.files === null) {
    //     return res.status(400).json({ msg: 'No media was uploaded' });
    // }

    let name = req.body.name;
    let description = req.body.description;
    let dateOfCreation = Date.parse(req.body.dateOfCreation);

    let typeOfMedia = req.body.typeOfMedia;
    let featured = req.body.featured;

    // let file = req.files.file;

    // // uploading the file to the correct directory
    // file.mv(`${__dirname}/client/public/uploads/${typeOfMedia}/${name}`, err => {
    //     if(err) {
    //         console.error(err);
    //         return res.status(500).send(err);
    //     }

    //     res.json('upload was successful');
    // });

    // // uploading the preview to the correct directory
    // file.mv(`${__dirname}/client/public/uploads/preview/${name}`, err => {
    //     if(err) {
    //         console.error(err);
    //         return res.status(500).send(err);
    //     }

    //     res.json('upload was successful');
    // });

    let newMedia = new Media({
        name, 
        description,
        dateOfCreation,

        typeOfMedia,
        featured,
    });

    newMedia.save()
    .then(() => res.json('New media has added'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// delete media by id route
router.route('/:id').delete((req, res) => {
    Media.findByIdAndDelete(req.params.id)
    .then(() => res.json('Media was deleted'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// update media by id route
router.route('/update/:id').post((req, res) => {
    Media.findById(req.params.id)
    .then(media => {
        media.name = req.body.name;
        media.typeOfMedia = req.body.typeOfMedia;
        media.dateOfCreation = Date.parse(req.body.dateOfCreation);
        media.description = req.body.description;

        media.save()
        .then(() => res.json('Media has been updated'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router; 