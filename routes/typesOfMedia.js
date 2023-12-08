const router = require('express').Router();
let TypeOfMedia = require('../models/typesOfMedia.model');

//#region get routes

// get all typeOfMedia route
router.route('/').get((req, res) => {
    TypeOfMedia.find()
    .then(typeOfMedia => res.json(typeOfMedia))
    .catch(err => res.status(400).json('Error: ' + err));
});

// get typeOfMedia by id route
router.route('/id_:id').get((req, res) => {
    TypeOfMedia.findById(req.params.id)
    .then(typeOfMedia => res.json(typeOfMedia))
    .catch(err => res.status(400).json('Error: ' + err));
});

//#endregion

//#region add routes

// add new typeOfMedia route
router.route('/add').post((req, res) => {
    let name = req.body.name;

    let newTypeOfMedia= new TypeOfMedia({
        name, 
    });

    newTypeOfMedia.save()
    .then(() => res.json({ id: newTypeOfMedia._id }))
    .catch(err => res.status(400).json('Error: ' + err));
});

//#endregion

//#region delete routes

// delete typeOfMedia by id route
router.route('/:id').delete((req, res) => {
    TypeOfMedia.findByIdAndDelete(req.params.id)
    .then(() => res.json('Type of media was deleted'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//#endregion

//#region update routes

// update typeOfMedia by id route
router.route('/update/:id').post((req, res) => {
    TypeOfMedia.findById(req.params.id)
    .then(typeOfMedia => {
        typeOfMedia.name = req.body.name;

        typeOfMedia.save()
        .then(() => res.json('Type of media has been updated'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

//#endregion

module.exports = router; 