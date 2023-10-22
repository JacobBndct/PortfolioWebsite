const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let skillSchema = new Schema({
    name: { type: String },
});

let Skill = mongoose.model('Skill', skillSchema);

module.exports = Skill;