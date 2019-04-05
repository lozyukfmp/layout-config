const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fragmentInstanceSchema = new Schema({
    fragmentSchema: {
        type: Schema.Types.ObjectId,
        ref: 'FragmentSchema'
    },
    values: Schema.Types.Mixed
});

module.exports = mongoose.model('FragmentInstance', fragmentInstanceSchema);