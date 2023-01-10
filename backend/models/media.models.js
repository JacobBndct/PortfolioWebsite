const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let mediaSchema = new Schema({
    name: { type: String },
    description: { type: String },
    dateOfCreation: { type: Date },

    typeOfMedia: { type: String },
    featured: { type: Boolean},
});

let Media = mongoose.model('Media', mediaSchema);

module.exports = Media;