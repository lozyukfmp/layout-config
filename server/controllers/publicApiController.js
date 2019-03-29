const Preferences = require('../models/Preferences');
const Layout = require('../models/Layout');
const LayoutController = require('../controllers/layoutController');
const PreferencesController = require('../controllers/PreferencesController');
const path = require("path");

module.exports.getDataForTenant = async function (req, res) {
    try {
        const tenant =  req.params.tenant;
        const layouts = await Layout.find({});
        const preferences = await Preferences.find({});
        const result = {layouts,preferences};
        res.status(200).json(result);
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