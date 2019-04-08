const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const layoutSchema = new Schema({
    page: {
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
                            fragmentType: {
                                ref: 'fragments',
                                type: Schema.Types.ObjectId
                            }
                        }

                    ]
                }]
            }
        ]
    }
});

module.exports = mongoose.model('layouts', layoutSchema);