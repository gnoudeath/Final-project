const axios = require('axios');
const Course = require('../models/courses');
const { getTotalViewedCount } = require('../models/userLecture');
const { getCountVideo, getTotalVideo } = require('../services/youtobe');

function courseList(req, res) {
    axios.get('http://localhost:3000/api/courses')
        .then(function (response) {
            // console.log(response)
            res.render('customer/courses/course', { courses: response.data });
        })
        .catch(err => {
            res.send(err);
        })
}

function courseHome(req, res) {
    axios.get('http://localhost:3000/api/courses')
        .then(function (response) {
            // console.log(response)
            res.render('home', { courses: response.data });
        })
        .catch(err => {
            res.send(err);
        })
}
// exports.getCourseDetailAndContentList = (req, res) => {
//     const courseId = req.query.id; // Lấy id của course truy vấn từ req
//     const coursePromise = axios.get(`http://localhost:3000/api/courses?id=${courseId}`); //Tạo ra một promise để thực hiện yêu cầu get đến API với tham số id là courseId
//     const contentPromise = axios.get(`http://localhost:3000/api/contentList?id=${courseId}`);
//     Promise.all([coursePromise, contentPromise])//sử dụng Promise.all để đợi cho cả hai Promise được
//         .then(async function ([courseResponse, contentResponse]) { //hoàn thành và truyền kết quả là một callback dưới dạng mảng
//             const courseData = courseResponse.data; // tạo ra 2 biến và truyền dữ liệu đã lấy được từ hai promise trên
//             const contentData = contentResponse.data;           
//             const contentIds = contentData.map(content => content._id);//tạo mảng chứa giá trị được lặp lại và lấy giá trị _id của từng phần tử
//             // console.log(contentIds);
//             // tạo một mảng Promise để thực hiện yêu cầu get đến API với các contentId trong mảng contentId
//             const lecturePromiseArray = contentIds.map(contentId => axios.get(`http://localhost:3000/api/lecture?id=${contentId}`));
//             //Dùng Promise.all để đợi mảng hoàn thành trước khi chạy tiếp và kết quả được truyền vào lectureResponseArray là một mảng
//             const lectureResponseArray = await Promise.all(lecturePromiseArray);
//             // lặp qua từng phần tử trong lectureResponseArray và lấy dữ liệu trả về là data từ mỗi phản hồi
//             const lectureDataArray = lectureResponseArray.map(response => response.data);

//             // console.log(courseData); 
//             // console.log(contentData); 
//             // console.log(lectureDataArray); 

//             // trả render theo đường dẫn kèm theo với dữ liệu đã lấy từ các API.
//             res.render('customer/courses/course-detail', { courses: courseData, courseContent: contentData, lectureList: lectureDataArray });
//         })
//         .catch(err => {
//             res.send(err);
//         })
// }


function getCourseDetailAndContentList (req, res) {
    const courseSlug = req.params.slug; // lấy slug khóa học từ tham số URL
    // console.log(courseSlug)

    Course.findOne({ slug: courseSlug }) // tìm kiếm một khóa học với slug được truyền vào
        .then(async function (courseData) {
            // GET tới API để lấy danh sách nội dung của khóa học với _id tương ứng.
            const contentPromise = axios.get(`http://localhost:3000/api/contentList?id=${courseData._id}`);
            //đợi kết quả trả về của yêu cầu GET và lấy ra danh sách.
            const contentData = (await contentPromise).data;
            //lấy ra một mảng các _id của các nội dung bằng cách sử dụng phương thức map.
            const contentIds = contentData.map(content => content._id);
            //GET tới API để lấy danh sách lecturePromiseArray của từng content bằng cách sử dụng mảng contentIds _id đã lấy được.
            const lecturePromiseArray = contentIds.map(contentId => axios.get(`http://localhost:3000/api/lecture?id=${contentId}`));
            // đợi tất cả các yêu cầu GET trên trả về và lấy ra mảng kết quả trả về của từng yêu cầu.
            const lectureResponseArray = await Promise.all(lecturePromiseArray);
            // Lấy ra một mảng chứa thông tin của tất cả các lecture, sử dụng phương thức map để lấy dữ liệu từ mỗi phản hồi (response).
            const lectureDataArray = lectureResponseArray.map(response => response.data);
            const videoIds = lectureDataArray.flatMap((lectures) => lectures.map((lecture) => lecture.VideoId));
            // console.log(videoIds);
            const durationsPromiseArray = videoIds.map(videoId => getCountVideo(videoId));
            const durations = await Promise.all(durationsPromiseArray);
            const totalDuration = await getTotalVideo(durations);
            // console.log(totalDuration)
            // trả về dữ liệu khóa học và các thông tin liên quan
            res.render('customer/courses/course-detail', {
                courses: courseData,
                courseContent: contentData,
                lectureList: lectureDataArray,
                videoDurations: durations,
                totalDuration: totalDuration
            });
        })
        .catch(err => {
            res.send(err);
        });
}

async function getDetailAndContentList (req, res) {
    const courseSlug = req.params.slug; // lấy slug của course truy vấn từ req /course-learning/:slug
    const lectureId = req.query.id; // lấy id của lecture truy vấn từ req
    const userId = res.locals.user._id; // lấy id của user từ session
    // console.log(userId)
    try {
        const courseData = await Course.findOne({ slug: courseSlug }); //tìm kiếm thông tin khóa học dựa trên slug truyền vào
        const contentPromise = axios.get(`http://localhost:3000/api/contentList?id=${courseData._id}`); // lấy thông tin các content của khóa học từ API bên ngoài
        const contentData = (await contentPromise).data; // lưu trữ dữ liệu content trả về từ API
        const lectureDataArray = []; // khởi tạo mảng rỗng
        for (const content of contentData) {
            const lecturePromiseArray = axios.get(`http://localhost:3000/api/lecture?id=${content._id}`); // lấy thông tin các lecture của content từ API bên ngoài
            const lectureData = (await lecturePromiseArray).data; // lưu trữ dữ liệu lecture trả về từ API
            // convert ObjectId to string để đảm bảo lecture có thể so sánh với lectureId kiểu string được truyền vào
            const stringifiedLectureData = lectureData.map(lecture => ({
                ...lecture,
                _id: lecture._id.toString()
            }));
            lectureDataArray.push(stringifiedLectureData); // truyền dữ liệu lecture đã chuyển đổi vào mảng dữ liệu lectureDataArray rỗng đã tạo trước đó
        }
        const flattenedLectureDataArray = lectureDataArray.flat(); // chuyển đổi mảng dữ liệu lecture từ mảng lồng nhau sang mảng 1 chiều
        const lectures = flattenedLectureDataArray.find(lecture => lecture._id === lectureId); // lấy thông tin lecture tương ứng với lectureId
        // kiểm tra xem lecture đã được xem hay chưa
        const isCompleted = req.isCompleted;
        // lấy tổng số lần xem lecture của user và khóa học đang truy cập, nếu null thì trả về giá trị bên phải của toán tử logic || = (hoặc) (ở đây là số 0)
        const viewedCount = (await getTotalViewedCount(userId)).find((item) => item.slug === courseSlug && 
                                                                                item.userId.toString() === userId.toString())?.totalViewedCount || 0;
        lectures.isCompleted = isCompleted; // thêm thuộc tính isCompleted vào dữ liệu lectures
        lectures.totalViewedCount = viewedCount; // thêm thuộc tính totalViewedCount vào dữ liệu lectures

        const videoIds = lectureDataArray.flatMap((lectures) => lectures.map((lecture) => lecture.VideoId));
        // console.log(videoIds);
        const durationsPromiseArray = videoIds.map(videoId => getCountVideo(videoId));
        const durations = await Promise.all(durationsPromiseArray);

        res.render('customer/courses/course-learning', {
            courses: courseData,
            courseContent: contentData,
            lectureList: lectureDataArray,
            lectures,
            videoDurations: durations,
            userId: userId, // Truyền userId vào phần render
            layout: false
        });
    } catch (err) {
        res.send(err);
    }
}

// exports.getCommentList = async (req, res) => {
//     try {
//         const comments = await Comment.find().populate('user', 'username').populate('lecture', 'nameLecture');
//         res.json(comments);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// }

module.exports = {
    courseList, courseHome, getCourseDetailAndContentList, getDetailAndContentList
};
