var parsedJSON = require('./../../version.json');

module.exports = {
    getVersions: getVersions
}

function getVersions(req, res) {
    return res.json(parsedJSON);
}