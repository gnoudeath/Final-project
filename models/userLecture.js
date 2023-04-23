const mongoose = require('mongoose');

const userLectureSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    lecture: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'lecture'
    },
    courseSlug: {
        type: String,
        maxLength: 255,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    viewedCount: {
        type: Number,
        default: 0
    }
});


const UserLecture = mongoose.model('UserLecture', userLectureSchema);

async function getTotalViewedCount(userId) {
    try {
        const result = await UserLecture.aggregate([
            {
                $match: { user: new mongoose.Types.ObjectId(userId) },
            },
            {
                $group: {
                    _id: { courseSlug: "$courseSlug", user: "$user" },
                    totalViewedCount: { $sum: "$viewedCount" },
                },
            },
            {
                $group: {
                    _id: "$_id.courseSlug",
                    userId: { $first: "$_id.user" },
                    totalViewedCount: { $sum: "$totalViewedCount" },
                },
            },
        ]);
        const data = result.map(item => ({
            slug: item._id,
            userId: item.userId,
            totalViewedCount: item.totalViewedCount
        }));
        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}





module.exports = { UserLecture, getTotalViewedCount };



