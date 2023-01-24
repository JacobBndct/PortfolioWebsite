const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let disciplineSchema = new Schema({
    name : { type: String },
});

let Discipline = mongoose.model('Discipline', disciplineSchema);

module.exports = Discipline;