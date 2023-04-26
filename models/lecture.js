const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lectureSchema = new Schema ({
    nameLecture: {
        type: String, maxLength: 255
    },
    contentLecture: {
        type: String, maxLength: 600
    
    },
    VideoId: {
        type: String, maxLength: 600,

    },
    noteLecture: {
        type: String, maxLength: 600,
    },
    CourseContent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CourseContent',
        required: true
    }
},{ timestamps: true });
const Lecture = mongoose.model('lecture', lectureSchema);



module.exports = Lecture;