const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const preferencesValuesSchema = new Schema({
    fragmentInstanceId: {
        type: String,
        required: true,
        unique: true
    },
    tenant: {
        type: String,
        default: 'DEFAULT'
    },
    fragment: {
        ref: 'fragments',
        type: Schema.Types.ObjectId
    },
    values: [Schema.Types.Mixed]
});

module.exports = mongoose.model('preferences', preferencesValuesSchema);