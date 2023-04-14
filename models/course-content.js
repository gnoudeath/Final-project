const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseContent = new Schema ({
    nameCourseContent: {
        type: String, maxLength: 255
    },
    descriptionCourseContent: {
        type: String, maxLength: 600
    
    },
    createdAtCourseContent: {
        type: Date, default: Date.now,
    },
    updateAtCourseContent: {
        type: Date, default: Date.now,
    }
});

module.exports = mongoose.model('courseContent', courseContent);