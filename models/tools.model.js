const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let toolSchema = new Schema({
    name: { type: String },
    discipline_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Discipline' }],
    description: { type: String },
});

let Tool = mongoose.model('Tool', toolSchema);

module.exports = Tool;