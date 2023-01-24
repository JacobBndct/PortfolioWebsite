const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let typeOfMediaSchema = new Schema({
    name: { type: String },
});

let TypeOfMedia = mongoose.model('TypeOfMedia', typeOfMediaSchema);

module.exports = TypeOfMedia;