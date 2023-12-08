const router = require('express').Router();
let Tool = require('../models/tools.model');

//#region get routes

// get all tools route
router.route('/').get((req, res) => {
    Tool.find()
    .populate('discipline_ids')
    .then(tool => res.json(tool))
    .catch(err => res.status(400).json('Error: ' + err));
});

// get tools by id route
router.route('/id_:id').get((req, res) => {
    Tool.findById(req.params.id)
    .populate('discipline_ids')
    .then(tool => res.json(tool))
    .catch(err => res.status(400).json('Error: ' + err));
});

//#endregion

//#region add routes

// add new tools route
router.route('/add').post((req, res) => {
    let name = req.body.name;
    let discipline_ids = req.body.discipline_ids;
    let description = req.body.description;

    let newTool = new Tool({
        name,
        discipline_ids,
        description,
    });

    newTool.save()
    .then(() => res.json({ id: newTool._id }))
    .catch(err => res.status(400).json('Error: ' + err));
});

//#endregion

//#region delete routes

// delete tools by id route
router.route('/:id').delete((req, res) => {
    Tool.findByIdAndDelete(req.params.id)
    .then(() => res.json('Skill was deleted'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//#endregion

//#region update routes

// update tools by id route
router.route('/update/:id').post((req, res) => {
    Tool.findById(req.params.id)
    .then(tool => {
        tool.name = req.body.name;

        tool.save()
        .then(() => res.json('Tool has been updated'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

//#endregion

module.exports = router; 