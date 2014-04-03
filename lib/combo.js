'use strict';

var fs = require('fs'),
    path = require('path');

module.exports = function(root, jsdir, options) {
    var options = options || {};
    var root = root || __dirname;

    ///sea-modules/??jquery/jquery/1.10.1/jquery.js,custom/uploadify/3.2.1/uploadify.js,gallery/underscore/1.5.2/underscore.js,gallery/placeholders/3.0.1/placeholders.js
    return function(req, res, next) {
        if (req.originalUrl.indexOf("??") === -1) {
            next();
        }
        var comboContent = "";
        var files = req.originalUrl.split("??");
        var publicDir = files[0],
            comboFiles = null;

        if (!publicDir || !files[1]) {
            next();
        }

        comboFiles = files[1].split(",");
        for (var i = 0, l = comboFiles.length; i < l; i++) {
            var t = comboFiles[i];
            if (t.indexOf("?") > -1) {
                t = t.slice(0, t.indexOf("?"));
            }
            var curFile = path.join(root, publicDir, t);
            if (fs.existsSync(curFile)) {
                comboContent += fs.readFileSync(curFile, "utf8");
            }
        }
        if (comboContent.length) {
            res.send(comboContent);
        } else {
            res.send(404, "木有鱼丸");
        }

    };
};