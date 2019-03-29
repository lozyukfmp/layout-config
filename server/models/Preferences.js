const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const preferencesValuesSchema = new Schema({
    fragmentId: {
        type: String,
        required: true,
        unique: true
    },
    tenant: {
        type: String,
        default: 'DEFAULT'
    },
    values: [Schema.Types.Mixed]
});

module.exports = mongoose.model('preferences', preferencesValuesSchema);