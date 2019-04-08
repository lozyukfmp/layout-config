const Tenant = require('../models/Tenant');


module.exports.getAll = async function (req, res) {
    try {
        const result = await Tenant.find();
        res.status(200).json(result);
    } catch (e) {
        onError(res, e)
    }
};

module.exports.get = async function (req, res) {
    try {
        const result = await Tenant.findById(req.params.tenantId);
        res.status(200).json(result);
    } catch (e) {
        onError(res, e)
    }
};

module.exports.add = async function (req, res) {
    try {
        const layout = await new Tenant({
            instance: req.body.instance,
            name: req.body.instance
        }).save();
        res.status(201).json(layout);
    } catch (e) {
        onError(res, e)
    }
};

module.exports.update = async function (req, res) {
    try {
        let layout = await Tenant.findById(req.params.layoutId);
        const updatedLayout = await Tenant.findOneAndUpdate(
            {_id: req.params.tenantId},
            {$set: req.body},
            {new: true}
        );
        res.status(201).json(updatedLayout);
    } catch (e) {
        onError(res, e)
    }
};

module.exports.remove = async function (req, res) {
    try {
        const layout = await Tenant.findById(req.params.layoutId);
        await Tenant.remove({_id: req.params.tenantId});
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