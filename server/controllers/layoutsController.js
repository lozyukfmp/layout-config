const Layout = require('../models/Layout');
const Preferences = require('../models/Preferences');


module.exports.getAll = async function (req, res) {
    try {
        const result = await Layout.find({
            page: req.param('pageId')
        })
            .populate('structure.rows.columns.fragments.fragmentType');
        res.status(200).json(result);
    } catch (e) {
        onError(res, e)
    }
};

module.exports.get = async function (req, res) {
    try {
        const result = await Layout.findById(req.params.layoutId);
        res.status(200).json(result);
    } catch (e) {
        onError(res, e)
    }
};

module.exports.add = async function (req, res) {
    try {
        const layout = await new Layout({
            page: req.body.page,
            structure: req.body.structure,
            tenant: req.body.tenant,
            innerHtml: req.body.innerHtml,
        }).save();
        res.status(201).json(layout);
    } catch (e) {
        onError(res, e)
    }
};

module.exports.update = async function (req, res) {
    try {

        let layout = await Layout.findById(req.params.layoutId);
        const updatedLayout = await Layout.findOneAndUpdate(
            {_id: req.params.layoutId},
            {$set: req.body},
            {new: true}
        );

        const oldFragmentsInstances = getFragmentsInstances(layout.toObject());
        const newFragmentsInstances = getFragmentsInstances(req.body);
        const instancesForDelete = oldFragmentsInstances.filter(fragment => !newFragmentsInstances.includes(fragment));
        instancesForDelete.forEach(async fragmentInstance => await Preferences.remove({fragmentInstanceId: fragmentInstance}));

        res.status(201).json(updatedLayout);
    } catch (e) {
        onError(res, e)
    }
};

module.exports.remove = async function (req, res) {
    try {
        const layout = await Layout.findById(req.params.layoutId);
        await Layout.remove({_id: req.params.layoutId});
        const instancesForDelete = getFragmentsInstances(layout.toObject());
        instancesForDelete.forEach(async fragmentInstance => await Preferences.remove({fragmentInstanceId: fragmentInstance}));
        res.status(200).json({message: "success"})
    } catch (e) {
        onError(res, e)
    }
};

const getFragmentsInstances = layout => {
    return layout.structure.rows
        .reduce((a, b) => a.concat(b), [])
.map(row => row.columns)
.reduce((a, b) => a.concat(b), [])
.map(column => column.fragments)
.reduce((a, b) => a.concat(b), [])
.map(fragment => fragment.instanceId)
.reduce((a, b) => a.concat(b), []);
};

function onError(res, error) {
    res.status(500).json({
        success: false,
        message: error.message ? error.message : error
    })
}
