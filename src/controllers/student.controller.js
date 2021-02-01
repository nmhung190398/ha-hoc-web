const path = require("path");

const studentIndex = (req, res) => {
    const html = path.join(global.rootpath, "/public/index.html");
    res.sendFile(html);
}

module.exports = { studentIndex }