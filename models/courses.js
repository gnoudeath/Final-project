const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema ({
    nameCourse: {
        type: String, maxLength: 255,
        require: true,
    },
    descriptionCourse: {
        type: String, maxLength: 600,
        require: true,
    
    },
    imageCourse: {
        type: String, maxLength: 255,
        require: true,
    },
    costCourse: {
        type: String,
        require: true,
    },
    createdAtCourse: {
        type: Date, default: Date.now,
    },
    updateAtCourse: {
        type: Date, default: Date.now,
    }
});
const Course = mongoose.model('course', courseSchema);

module.exports = Course;