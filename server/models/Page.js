const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pageSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    portalName: {
        type: String,
        required: true,
        default: ''
    }
}, { toJSON: { virtuals: true } });

pageSchema.virtual('layouts', {
    ref: 'layouts',
    localField: 'name',
    foreignField: 'page',
    justOne: false
});

module.exports = mongoose.model('children', pageSchema);