const jwt = require('jsonwebtoken');
const User = require('../models/User');
const {UserLecture} = require('../models/userLecture');
const mongoose = require('mongoose');





// const requireAuth = (req, res, next) => {
// const token = req.cookies.jwt;
//     // check json web token exists & is verified
//     if (token) {
//         jwt.verify(token, 'account secret', (err, decodedToken) => {
//             if (err) {
//                 console.log(err.message);
//                 res.redirect('/login');
//             } else {
//                 console.log(decodedToken);
//                 next();
//             }
//         })
//     }
//     else {
//         res.redirect('/login');
//     }
// };

// Middleware kiểm tra user đăng nhập hay chưa
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt; // Lấy token từ cookie
    res.locals.user = null;
    res.locals.role = null; // Khởi tạo biến user và role cho locals để có thể truy cập từ view
    if (token) { // Nếu tồn tại token
        jwt.verify(token, 'account secret', async (err, decodedToken) => { // Xác thực token
            if (err) { // Nếu có lỗi xác thực, log lỗi và tiếp tục middleware tiếp theo
                console.log(err.message);
                next();
            } else { // Nếu xác thực thành công, lấy thông tin user từ database và gán vào locals
                // console.log(decodedToken);
                let user = await User.findById(decodedToken.id).populate('role');
                res.locals.user = user;
                res.locals.role = user.role.roleName;
                next();
            }
        })
    } else {
        next(); // Nếu không tồn tại token, tiếp tục middleware tiếp theo
    }
}

function checkRole(allowedRoles) {
    return async function (req, res, next) {
        const role = res.locals.role;
        // console.log(role)
        try {
            // Find the user's role in the Role table by objectId
            // let user = await User.findById(decodedToken.id).populate('role');

            if (!role) {
                // User's role not found in the Role table, redirect to error page
                return res.redirect('/error');
            }

            if (!allowedRoles.includes(role)) {
                // User doesn't have the required role, redirect to error page
                return res.redirect('/error');
            }

            // User has the required role, proceed to the next middleware
            next();
        } catch (err) {
            // Handle errors
            console.error(err);
            // res.status(500).send('Internal server error');
            res.redirect('/');
        }
    }
}

const checkLectureCompletion = async (req, res, next) => {
    const lectureId = req.query.id; // Lấy id của bài giảng từ query params
    const userId = res.locals.user._id; // Lấy id của người dùng từ biến cục bộ res.locals
    const courseSlug = req.params.slug;
    // Tìm bản ghi trong UserLecture collection với điều kiện user, lecture và course tương ứng với userId, lectureId, contentId và courseId
    const userLecture = await UserLecture.findOne({ user: userId, lecture: lectureId, courseSlug: courseSlug });

    if (!userLecture) { // Nếu không tìm thấy bản ghi tương ứng trong collection
        await UserLecture.create({ // Tạo mới bản ghi với user, lecture, course và viewedCount khởi tạo và completed = true
            user: userId,
            lecture: lectureId,
            courseSlug: courseSlug,
            completed: true,
            viewedCount: 1
        });
        req.isCompleted = true; // Gán giá trị true cho thuộc tính isCompleted trong đối tượng req
    } else if (!userLecture.completed) { // Nếu bản ghi đã tồn tại và completed = false
        userLecture.completed = true; // Cập nhật trạng thái completed = true
        userLecture.viewedCount += 1; // Tăng giá trị viewedCount lên 1 đơn vị
        await userLecture.save(); // Lưu bản ghi đã được cập nhật vào collection
        req.isCompleted = true; // Gán giá trị true cho thuộc tính isCompleted trong đối tượng req
    } else { // Nếu bản ghi đã tồn tại và completed = true
        req.isCompleted = true; // Gán giá trị true cho thuộc tính isCompleted trong đối tượng req
    }

    next(); // Gọi hàm middleware tiếp theo hoặc tiếp tục thực hiện middleware kế tiếp trong chuỗi middleware
};




// const getViewedCount = async (user, lectureId) => {
//     try {
//         const pipeline = [
//             {
//                 $match: { user: mongoose.Types.ObjectId(user), lecture: mongoose.Types.ObjectId(lectureId) }
//             },
//             {
//                 $group: {
//                     _id: { user: '$user', lecture: '$lecture' },
//                     viewedCount: { $sum: '$viewedCount' }
//                 }
//             },
//             {
//                 $project: { _id: 0, viewedCount: 1 }
//             }
//         ];

//         const result = await UserLecture.aggregate(pipeline);

//         if (result.length > 0) {
//             return result[0].viewedCount;
//         } else {
//             return 0;
//         }
//     } catch (err) {
//         console.error(err);
//         return 0;
//     }
// }



module.exports = { checkUser, checkRole, checkLectureCompletion };