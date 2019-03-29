const Preferences = require('../models/Preferences');
const Layout = require('../models/Layout');
const LayoutController = require('../controllers/layoutController');
const PreferencesController = require('../controllers/PreferencesController');
const path = require("path");

module.exports.getDataForTenant = async function (req, res) {
    try {
        const result = await LayoutController.getAll({});
        res.status(200).json(result);
    } catch (e) {
        onError(res, e)
    }
};


module.exports.getByPageUrl = async function (req, res) {
    try {
        const reqPath = req.params[0];
        const schemePages = await Page.find({}).populate('layout');
        if (schemePages != null && schemePages.length > 0) {
            const resultPage = filterPages(reqPath, schemePages);
            if (resultPage !== null && resultPage !== undefined) {
                res.status(200).send(resultPage.layout.innerHtml);
            }else {
                res.status(200).sendFile(path.resolve(__dirname + '/../resources/404/404.html'));
            }
        } else {
            res.status(200).sendFile(path.resolve(__dirname + '/../resources/404/404.html'));
        }
    } catch (e) {
        onError(res, e)
    }
};

module.exports.getAll = async function (req, res) {
    try {
        const result = await Page.find({}).populate('layout');
        res.status(200).json(result);
    } catch (e) {
        onError(res, e)
    }
};

module.exports.get = async function (req, res) {
    try {
        const result = await Page.findById(req.params.pageId).populate('layout');
        res.status(200).json(result);
    } catch (e) {
        onError(res, e)
    }
};

module.exports.add = async function (req, res) {
    try {
        const page = await new Page(req.body).save();
        res.status(201).json(page);
    } catch (e) {
        onError(res, e)
    }
};

module.exports.update = async function (req, res) {
    try {
        const page = await Page.findOneAndUpdate(
            {_id: req.params.pageId},
            {$set: req.body},
            {new: true}
        );
        res.status(201).json(page);
    } catch (e) {
        onError(res, e)
    }
};

module.exports.remove = async function (req, res) {
    try {
        await Page.remove({_id: req.params.pageId});
        res.status(200).json({message: "success"})
    } catch (e) {
        onError(res, e)
    }
};

function filterPages(requestUrl, schemePages) {
    let result;
    schemePages.forEach(schemePage => {
        const page = schemePage.toObject();
        page.requestUrls.forEach(pageUrl => {
            const parsedPageUrlArr = pageUrl.split("/");
            const parsedReqUrlArr = requestUrl ? requestUrl.split("/") : ["index"];
            let stillMatch = true;
            if (parsedReqUrlArr.length == parsedPageUrlArr.length) {
                for (let i = 0; i < parsedReqUrlArr.length && stillMatch; i++) {
                    if (!parsedPageUrlArr[i].includes(":") && parsedPageUrlArr[i] != parsedReqUrlArr[i]) {
                        stillMatch = false;
                    }
                }
                if (stillMatch) {
                    result = page;
                }
            }
        })
    });
    return result;
}

function onError(res, error) {
    res.status(500).json({
        success: false,
        message: error.message ? error.message : error
    })
}