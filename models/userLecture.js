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
        const result = await UserLecture.aggregate([ //sử dụng phương thức aggregate để biến đổi dữ liệu trên collection "UserLecture".
            {
                $match: { user: new mongoose.Types.ObjectId(userId) },
                // lọc các document trong collection có user = userId
            },
            // Group the matching documents by courseSlug and user
            {
                $group: {
                    _id: { courseSlug: "$courseSlug", user: "$user" }, //nhóm các giá trị dựa trên các trường courseSlug và user
                    totalViewedCount: { $sum: "$viewedCount" }, // tính tổng viewedCount dự trên trường viewedCount
                },
            },
            // Group the previous grouping by courseSlug and compute the total viewed count
            {
                $group: {
                    _id: "$_id.courseSlug", //được nhóm theo courseSlug , cũng chính là id của khóa học
                    userId: { $first: "$_id.user" }, // là id của người dùng đã xem khóa học đó.
                    totalViewedCount: { $sum: "$totalViewedCount" }, //tổng số lần xem của người dùng đó đối với khóa học đã nhóm ở trên.
                },
            },
        ]);
        // Map the result to a simpler format and return it
        const data = result.map(item => ({
            slug: item._id,
            userId: item.userId,
            totalViewedCount: item.totalViewedCount
        }));
        return data;
    } catch (error) {
        // Log any errors and return null
        console.log(error);
        return null;
    }
}


module.exports = { UserLecture, getTotalViewedCount };



