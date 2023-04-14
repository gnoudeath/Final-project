const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Course = new Schema ({
    nameCourse: {
        type: String, maxLength: 255
    },
    descriptionCourse: {
        type: String, maxLength: 600
    
    },
    imageCourse: {
        type: String, maxLength: 255
    },
    costCourse: {
        type: String
    },
    createdAtCourse: {
        type: Date, default: Date.now,
    },
    updateAtCourse: {
        type: Date, default: Date.now,
    }
});

module.exports = mongoose.model('Course', Course);