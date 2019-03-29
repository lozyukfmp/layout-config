const Preferences = require('../models/Preferences');

module.exports.getAll = async function (req, res) {
    try {
        const allPrefs = await Preferences.find({});
        res.status(200).json(allPrefs);
    } catch (e) {
        onError(res, e)
    }
};

module.exports.get = async function (req, res) {
    try {
        const prefs = await Preferences.findById(req.params.fragmentId);
        res.status(200).json(prefs);
    } catch (e) {
        onError(res, e)
    }
};

module.exports.add = async function (req, res) {
    try {
        const prefs = await new Preferences(req.body).save();
        res.status(201).json(prefs);
    } catch (e) {
        onError(res, e)
    }
};

module.exports.update = async function (req, res) {
    try {
        const prefs = await Preferences.findOneAndUpdate(
            {_id: req.params.fragmentId},
            {$set: req.body},
            {new: true}
        );
        res.status(201).json(prefs);
    } catch (e) {
        onError(res, e)
    }
};

module.exports.remove = async function (req, res) {
    try {
        await Preferences.remove({_id: req.params.fragmentId});
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