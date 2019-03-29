const Layout = require('../models/Layout');

module.exports.getAll = async function (req, res) {
    try {
        const result = await Layout.find({})
            .populate('rows.columns.fragments.fragmentType');
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
            name: req.body.name,
            structure: req.body.structure,
            description: req.body.description,
            innerHtml: req.body.innerHtml
        }).save();
        res.status(201).json(layout);
    } catch (e) {
        onError(res, e)
    }
};

module.exports.update = async function (req, res) {
    try {
        const layout = await Layout.findOneAndUpdate(
            {_id: req.params.layoutId},
            {$set: req.body},
            {new: true}
        );
        res.status(201).json(layout);
    } catch (e) {
        onError(res, e)
    }
};

module.exports.remove = async function (req, res) {
    try {
        await Layout.remove({_id: req.params.layoutId});
        res.status(200).json({message: "success"})
    } catch (e) {
        onError(res, e)
    }
};

function onError(res, error) {
    res.status(500).json({
        success: false,
        message: error.message ? error.message : error
    })
}