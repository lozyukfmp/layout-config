const Layout = require('../models/Layout');

module.exports.getDataForTenant = async function (req, res) {
    try {
        const tenant = req.params.tenant;
        const layouts = await Layout.find({});
        //const preferences = await Preferences.find({});
        const preferences = {};
        const result = {
            layouts: convertLayouts(layouts, tenant),
            preferences: convertPreferences(preferences)
        };
        res.status(200).json(result);
    } catch (e) {
        onError(res, e)
    }
};

const convertLayouts = (layouts, tenant) => {
    const res = {};
    layouts
        .map(item => item._doc)
        .filter(item => {
            const filteredLayouts = layouts.filter(layout => layout.name === item.name);
            const tenantLayout = filteredLayouts.find(layout => layout.tenant === tenant);
            if (tenantLayout) {
                return item.tenant === tenant;
            }
            return item.tenant === 'DEFAULT';
        })
        .forEach(item => res[item.name] = item.innerHtml);
    return res;
};

const convertPreferences = preferences => {
    const res = {};
    preferences.map(item => item._doc).forEach(item => res[item.fragmentInstanceId] = item.values);
    return res;
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