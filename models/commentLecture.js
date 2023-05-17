const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const commentSchema = new Schema ({
    Comment: {
        type: String,
        require: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    lecture: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'lecture'
    },
},{ timestamps: true });
const Comment = mongoose.model('comment', commentSchema);

module.exports = Comment;