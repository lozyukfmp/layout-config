const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const preferencesValuesSchema = new Schema({
    instance: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
});

module.exports = mongoose.model('tenants', preferencesValuesSchema);