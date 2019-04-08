const Layout = require('../models/Layout');
const Page = require('../models/Page');
const Preferences = require('../models/Preferences');


module.exports.getAll = async function (req, res) {
    try {
        const result = await Page.find({
            portalName: req.param('portalName')
        })
            .populate({
                    path: 'layouts',
                    populate: {
                        path: 'structure.rows.columns.fragments.fragmentType'
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
            portalName: req.body.portalName
        }).save();

        req.body.layouts.forEach(layout => {
            new Layout({
                page: page.name,
                tenant: layout.tenant,
                innerHtml: layout.innerHtml,
                structure: layout.structure
            }).save();
        });

        res.status(201).json(page);
    } catch (e) {
        onError(res, e)
    }
};

module.exports.update = async function (req, res) {
    try {
        let page = await Page.findById(req.params.pageId);

        const updatedPage = await Page.findOneAndUpdate(
            {_id: req.params.pageId},
            {$set: req.body},
            {new: true}
        );

        console.log(req.body.layouts.length);
        req.body.layouts.forEach(async layout => {
            await Layout.findOneAndUpdate(
                {_id: layout._id},
                {$set: layout},
                {new: true})
        });

        const pageLayouts = await Layout.find({
            page: page.name
        });

        pageLayouts.forEach(layout => {
            const layoutFromRequest = req.body.layouts.find(value => value.tenant === layout.tenant);
            const oldFragmentsInstances = getFragmentsInstances(layout.toObject());
            const newFragmentsInstances = getFragmentsInstances(layoutFromRequest);
            const instancesForDelete = oldFragmentsInstances.filter(fragment => !newFragmentsInstances.includes(fragment));
            instancesForDelete.forEach(async fragmentInstance => await Preferences.remove({fragmentInstanceId: fragmentInstance}));
        });

        res.status(201).json(updatedPage);
    } catch (e) {
        onError(res, e)
    }
};

module.exports.remove = async function (req, res) {
    try {
        const page = await Page.findById(req.params.pageId);
        await Page.remove({_id: req.params.pageId});

        const pageLayouts = await Page.find({
            page: page.name
        });

        pageLayouts.forEach(layout => {
            const instancesForDelete = getFragmentsInstances(layout.toObject());
            instancesForDelete.forEach(async fragmentInstance => await Preferences.remove({fragmentInstanceId: fragmentInstance}));
        });

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