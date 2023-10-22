const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let mediaSchema = new Schema({
    featured: { type: Boolean, default: false},

    typeOfMedia_ids: { type: mongoose.Schema.Types.ObjectId, ref: 'TypeOfMedia' },
    name: { type: String },
    description: { type: String },
    dateOfCreation: { type: Date },

    //default to an image for media wasn't uploaded
    previewImageURL: { type: String },
    mediaURL: { type: String },

    tool_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tool' }],
    skill_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }]
});

let Media = mongoose.model('Media', mediaSchema);

module.exports = Media;