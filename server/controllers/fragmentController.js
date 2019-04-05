const FragmentSchema = require('../models/FragmentSchema');

module.exports.getAll = async function (req, res) {
    try {
        const fragments = await FragmentSchema.find({
            portalName: req.param('portalName')
        });
        res.status(200).json(fragments);
    } catch (e) {
        onError(res, e)
    }
};

module.exports.get = async function (req, res) {
    try {
        const fragments = await FragmentSchema.findById(req.params.fragmentId);
        res.status(200).json(fragments);
    } catch (e) {
        onError(res, e)
    }
};

module.exports.add = async function (req, res) {
    try {
        const fragment = await new FragmentSchema(req.body).save();
        res.status(201).json(fragment);
    } catch (e) {
        onError(res, e)
    }
};

module.exports.update = async function (req, res) {
    try {
        const fragment = await FragmentSchema.findOneAndUpdate(
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
        await FragmentSchema.remove({_id: req.params.fragmentId});
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