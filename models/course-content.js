const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseContentSchema = new Schema ({
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

const CourseContent = mongoose.model('lecture', courseContentSchema);

module.exports = CourseContent;