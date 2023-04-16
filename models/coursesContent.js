const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseContentSchema = new Schema ({
    nameCourseContent: {
        type: String, maxLength: 255
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
},{ timestamps: true });

const CourseContent = mongoose.model('CourseContent', courseContentSchema);



module.exports = CourseContent;
