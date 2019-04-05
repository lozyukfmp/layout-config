const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const layout = new Schema({
    page: { type: Schema.Types.ObjectId, ref: 'Page'},
    tenant: {
        type: String,
        default: 'DEFAULT'
    },
    innerHtml:{
        type: String,
        required: true
    },
    structure:{
        rows: [{
            maxWidth: String,
            columns: [{
                cssClass: String,
                fragmentInstances: [
                    {
                        type: Schema.Types.ObjectId,
                        ref: 'FragmentInstance'
                    }
                ]
            }]
        }]
    }
});

module.exports = mongoose.model('Layout', layout);