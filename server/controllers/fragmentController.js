const Fragment = require('../models/Fragment');

module.exports.getAll = async function (req, res) {
    try {
        const fragments = await Fragment.find({});
        res.status(200).json(fragments);
    } catch (e) {
        onError(res, e)
    }
};

module.exports.get = async function (req, res) {
    try {
        const fragments = await Fragment.findById(req.params.fragmentId);
        res.status(200).json(fragments);
    } catch (e) {
        onError(res, e)
    }
};

module.exports.add = async function (req, res) {
    try {
        const fragment = await new Fragment(req.body).save();
        res.status(201).json(fragment);
    } catch (e) {
        onError(res, e)
    }
};

module.exports.update = async function (req, res) {
    try {
        const fragment = await Fragment.findOneAndUpdate(
            {_id: req.params.fragmentId},
            {$set: req.body},
            {new: true}
        );
        res.status(201).json(fragment);
    } catch (e) {
        onError(res, e)
    }
};

module.exports.remove = async function (req, res) {
    try {
        await Fragment.remove({_id: req.params.fragmentId});
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