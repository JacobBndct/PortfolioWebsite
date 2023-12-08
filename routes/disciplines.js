const router = require('express').Router();
let Discipline = require('../models/disciplines.model');

//#region get routes

// get all disciplines route
router.route('/').get((req, res) => {
    Discipline.find()
    .then(discipline => res.json(discipline))
    .catch(err => res.status(400).json('Error: ' + err));
});

// get discipline by id route
router.route('/id_:id').get((req, res) => {
    Discipline.findById(req.params.id)
    .then(discipline => res.json(discipline))
    .catch(err => res.status(400).json('Error: ' + err));
});

//#endregion

//#region add routes

// add new discipline route
router.route('/add').post((req, res) => {
    let name = req.body.name;

    let newDiscipline = new Discipline({
        name, 
    });

    newDiscipline.save()
    .then(() => res.json({ id: newDiscipline._id }))
    .catch(err => res.status(400).json('Error: ' + err));
});

//#endregion

//#region delete routes

// delete discipline by id route
router.route('/:id').delete((req, res) => {
    Discipline.findByIdAndDelete(req.params.id)
    .then(() => res.json('Discipline was deleted'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//#endregion

//#region update routes

// update discipline by id route
router.route('/update/:id').post((req, res) => {
    Discipline.findById(req.params.id)
    .then(discipline => {
        discipline.name = req.body.name;

        discipline.save()
        .then(() => res.json('Discipline has been updated'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

//#endregion

module.exports = router; 