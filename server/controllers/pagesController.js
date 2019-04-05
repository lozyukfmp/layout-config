const Page = require('../models/Page');

module.exports.getAll = async function (req, res) {
    try {
        const result = await Page.find({
            portalName: req.param('portalName')
        })
            .populate({
                path: 'Layout',
                populate: {
                    path: 'FragmentInstance',
                    populate: {
                        path: 'FragmentSchema'
                    }
                }
            });
        res.status(200).json(result);
    } catch (e) {
        onError(res, e)
    }
};

module.exports.get = async function (req, res) {
    try {
        const result = await Page.findById(req.params.layoutId);
        res.status(200).json(result);
    } catch (e) {
        onError(res, e)
    }
};

module.exports.add = async function (req, res) {
    try {
        const page = await new Page({
            name: req.body.name,
            layout: req.body.layout,
            portalName: req.body.portalName
        }).save();
        res.status(201).json(page);
    } catch (e) {
        onError(res, e)
    }
};

module.exports.update = async function (req, res) {
    try {

        let page = await Page.findById(req.params.layoutId);
        const updatedLayout = await Page.findOneAndUpdate(
            {_id: req.params.layoutId},
            {$set: req.body},
            {new: true}
        );

        const oldFragmentsInstances = getFragmentsInstances(page.toObject());
        const newFragmentsInstances = getFragmentsInstances(req.body);
        const instancesForDelete = oldFragmentsInstances.filter(fragment => !newFragmentsInstances.includes(fragment));
        //instancesForDelete.forEach(async fragmentInstance => await Preferences.remove({fragmentInstanceId: fragmentInstance}));

        res.status(201).json(updatedLayout);
    } catch (e) {
        onError(res, e)
    }
};

module.exports.remove = async function (req, res) {
    try {
        const page = await Page.findById(req.params.layoutId);
        await Page.remove({_id: req.params.layoutId});
        const instancesForDelete = getFragmentsInstances(page.toObject());
        //instancesForDelete.forEach(async fragmentInstance => await Preferences.remove({fragmentInstanceId: fragmentInstance}));
        res.status(200).json({message: "success"})
    } catch (e) {
        onError(res, e)
    }
};

const getFragmentsInstances = page => {
    return page.structure.rows
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