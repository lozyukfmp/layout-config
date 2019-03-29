const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fragmentSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        default: ''
    },
    renderTag: {
        type: String,
        default: ''
    },
    customContent: {
        type: String,
        default: ''
    },
    isCustom: {
        type: Boolean,
        default: false
    },
    hasPreferences: {
        type: Boolean,
        default: false
    },
    preferencesDefinition: [Schema.Types.Mixed]
});

module.exports = mongoose.model('fragments', fragmentSchema);