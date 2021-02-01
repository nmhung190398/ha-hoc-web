const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const studentSchema = mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: Number,
        required: false
    }
})

module.exports = mongoose.model("Student", studentSchema);









