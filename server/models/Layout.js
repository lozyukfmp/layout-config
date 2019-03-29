const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const layoutSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    tenant: {
        type: String,
        default: 'DEFAULT'
    },
    innerHtml:{
        type: String,
        required: true
    },
    rows: [
        {
            maxWidth: String,
            columns :[{
                cssClass: String,
                fragments: [
                    {
                        fragmentId: String,
                        fragmentType:{
                            ref: 'fragments',
                            type: Schema.Types.ObjectId
                        }
                    }

                ]
            }]
        }
    ]
});

module.exports = mongoose.model('layouts', layoutSchema);