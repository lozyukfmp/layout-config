const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pageSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    portalName: {
        type: String,
        required: true,
        default: ''
    },
    layouts:[{
        type: Schema.Types.ObjectId,
        ref: 'Layout'
    }]
});

module.exports = mongoose.model('Page', pageSchema);