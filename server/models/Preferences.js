const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const preferencesValuesSchema = new Schema({
    fragmentId: {
        type: String,
        required: true,
        unique: true
    },
    tenantId: {
        type: String,
        required: true,
        unique: true
    },
    values: [Schema.Types.Mixed]
});

module.exports = mongoose.model('fragments', fragmentSchema);