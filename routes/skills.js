const router = require('express').Router();
let Skill = require('../models/skills.model');

//#region get routes

// get all skills route
router.route('/').get((req, res) => {
    Skill.find()
    .then(skill => res.json(skill))
    .catch(err => res.status(400).json('Error: ' + err));
});

// get skills by id route
router.route('/id_:id').get((req, res) => {
    Skill.findById(req.params.id)
    .then(skill => res.json(skill))
    .catch(err => res.status(400).json('Error: ' + err));
});

//#endregion

//#region add routes

// add new skills route
router.route('/add').post((req, res) => {
    let name = req.body.name;

    let newSkill = new Skill({
        name, 
    });

    newSkill.save()
    .then(() => res.json('New skill has added'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//#endregion

//#region delete routes

// delete skills by id route
router.route('/:id').delete((req, res) => {
    Skill.findByIdAndDelete(req.params.id)
    .then(() => res.json('Skill was deleted'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//#endregion

//#region update routes

// update skills by id route
router.route('/update/:id').post((req, res) => {
    Skill.findById(req.params.id)
    .then(skill => {
        skill.name = req.body.name;

        skill.save()
        .then(() => res.json('Skill has been updated'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

//#endregion

module.exports = router; 