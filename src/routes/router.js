const express = require("express");
const { createStudent, getStudent } = require("../api/student");

const router = express.Router();
// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now())
    next()
});

router.post("/student", createStudent);
router.get("/student", getStudent);

module.exports = router;
