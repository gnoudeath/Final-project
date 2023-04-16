const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    nameCourse: {
        type: String,
        maxLength: 255,
        require: true,     
    },
    descriptionCourse: {
        type: String,
        maxLength: 600,
        require: true,
    },
    imageCourse: {
        type: String,
        maxLength: 255,     
    },
    videoIdCourse: {
        type: String,
        maxLength: 255,
        require: true,
    },
    costCourse: {
        type: String,
        require: true,
    },
},{ timestamps: true });

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;