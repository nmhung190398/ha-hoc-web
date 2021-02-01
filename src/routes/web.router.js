const express = require("express");
const {studentIndex} = require("../controllers/student.controller.js");

const router = express.Router();
// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now())
    next()
});

router.get("/students", studentIndex);

module.exports = router;