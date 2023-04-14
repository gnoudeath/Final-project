const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lectureSchema = new Schema ({
    namelecture: {
        type: String, maxLength: 255
    },
    descriptionlecture: {
        type: String, maxLength: 600
    
    },
    createdAtlecture: {
        type: Date, default: Date.now,
    },
    updateAtlecture: {
        type: Date, default: Date.now,
    }
});
const Lecture = mongoose.model('lecture', lectureSchema);

module.exports = Lecture;