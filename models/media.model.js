const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let breakdownSchema = new Schema({
    type: { type: String },
    name: { type: String },
    breakdownDescription: { type: String },
    breakdownLink: { type: String }
})

let mediaSchema = new Schema({
    featured: { type: Boolean, default: false},
    weight: { type: Number },
    colour: { type: String },

    typeOfMedia_ids: { type: mongoose.Schema.Types.ObjectId, ref: 'TypeOfMedia' },
    name: { type: String },
    description: { type: String },
    dateOfCreation: { type: Date },

    previewImageURL: { type: String },
    link: { type: String },

    tool_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tool' }],
    skill_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }],

    breakdowns: [breakdownSchema],
});

let Media = mongoose.model('Media', mediaSchema);

module.exports = Media;