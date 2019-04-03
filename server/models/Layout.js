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
    structure:{
        rows: [
            {
                maxWidth: String,
                columns :[{
                    cssClass: String,
                    fragments: [
                        {
                            instanceId: String,
                            fragmentType:{
                                ref: 'fragments',
                                type: Schema.Types.ObjectId
                            }
                        }

                    ]
                }]
            }
        ]
    },
    portalName: {
        type: String,
        required: true,
        default: ''
    }
});

module.exports = mongoose.model('layouts', layoutSchema);