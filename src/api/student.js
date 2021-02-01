const mongoose = require('mongoose');
const Student = require('../models/student');

const createStudent = async (req, res) => {
    process(res, async () => {
        const student = new Student({
            // _id: mongoose.Types.ObjectId,
            name: req.body.name,
            age: req.body.age,
            gender: req.body.gender
        })
        const newStudent = await student.save();
        return newStudent;
    })

}
const process = async (res, cb) => {
    try {
        const rs = await cb();
        res.json({
            status: 200,
            data: rs
        })
    } catch (e) {
        console.error(e);
        res.json({
            status: 400,
            msg: e.message
        });
    }
}


const getStudent = async (req, res) => {
    process(res, async () => {
        console.log(req.query);
        let { name, page, perPage } = req.query;
        if (!page) {
            page = 0;
        }
        if (!perPage) {
            perPage = 10;
        }
        let keys = Object.keys(req.query);
        let exceptKeys = ["page", "perPage"];
        let query = {};
        keys.forEach((item) => {
            if (req.query[item] && !exceptKeys.includes(item)) {
                query[item] = req.query[item]
            }
        })
        const totalItems = await Student.find(query).count();
        const offset = parseInt(page) * parseInt(perPage)
        const students = await Student.find(query).sort({ age: 'asc' }).skip(offset).limit(parseInt(perPage));
        return {
            items: students,
            totalItems,
            page: parseInt(page),
            perPage: parseInt(perPage)
        };
    })
}

module.exports = { createStudent, getStudent };