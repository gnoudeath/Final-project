const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lecture = new Schema ({
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

module.exports = mongoose.model('lecture', lecture);