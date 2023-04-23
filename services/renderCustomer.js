const axios = require('axios');
const Course = require('../models/courses');
const { getTotalViewedCount } = require('../models/userLecture');


exports.courseList = (req, res) => {
    axios.get('http://localhost:3000/api/courses')
        .then(function (response) {
            // console.log(response)
            res.render('customer/courses/course', { courses: response.data });
        })
        .catch(err => {
            res.send(err);
        })
}

exports.courseHome = (req, res) => {
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


exports.getCourseDetailAndContentList = (req, res) => {
    const courseSlug = req.params.slug; // lấy slug khóa học từ tham số URL
    // console.log(courseSlug)

    Course.findOne({ slug: courseSlug })
        .then(async function (courseData) {
            // truy vấn các thông tin liên quan đến khóa học như bình thường
            const contentPromise = axios.get(`http://localhost:3000/api/contentList?id=${courseData._id}`);
            const contentData = (await contentPromise).data;
            const contentIds = contentData.map(content => content._id);
            const lecturePromiseArray = contentIds.map(contentId => axios.get(`http://localhost:3000/api/lecture?id=${contentId}`));
            const lectureResponseArray = await Promise.all(lecturePromiseArray);
            const lectureDataArray = lectureResponseArray.map(response => response.data);

            // trả về dữ liệu khóa học và các thông tin liên quan
            res.render('customer/courses/course-detail', { courses: courseData, courseContent: contentData, lectureList: lectureDataArray });
        })
        .catch(err => {
            res.send(err);
        });
}



// exports.getDetailAndContentList = (req, res) => {
//     const courseSlug = req.params.slug;
//     const lectureId = req.query.id;

//     Course.findOne({ slug: courseSlug })
//         .then(async function (courseData) {
//             const contentPromise = axios.get(`http://localhost:3000/api/contentList?id=${courseData._id}`);
//             const contentData = (await contentPromise).data;
//             const lectureDataArray = [];

//             for (const content of contentData) {
//                 const lecturePromiseArray = axios.get(`http://localhost:3000/api/lecture?id=${content._id}`);
//                 const lectureData = (await lecturePromiseArray).data;

//                 // convert ObjectId to string
//                 const stringifiedLectureData = lectureData.map(lecture => ({
//                     ...lecture,
//                     _id: lecture._id.toString()
//                 }));

//                 lectureDataArray.push(stringifiedLectureData);
//             }

//             const flattenedLectureDataArray = lectureDataArray.flat();

//             const lectures = flattenedLectureDataArray.find(lecture => lecture._id === lectureId);    

//             console.log(lectures)

//             res.render('customer/courses/course-learning', { courses: courseData,courseContent: contentData, lectureList: lectureDataArray, lectures, layout: false });
//         })
//         .catch(err => {
//             res.send(err);
//         });
// }

exports.getDetailAndContentList = async (req, res) => {
    const courseSlug = req.params.slug;
    const lectureId = req.query.id;
    const userId = res.locals.user._id;
    
    try {
        const courseData = await Course.findOne({ slug: courseSlug });
        const contentPromise = axios.get(`http://localhost:3000/api/contentList?id=${courseData._id}`);
        const contentData = (await contentPromise).data;
        const lectureDataArray = [];

        for (const content of contentData) {
            const lecturePromiseArray = axios.get(`http://localhost:3000/api/lecture?id=${content._id}`);
            const lectureData = (await lecturePromiseArray).data;

            // convert ObjectId to string
            const stringifiedLectureData = lectureData.map(lecture => ({
                ...lecture,
                _id: lecture._id.toString()
            }));

            lectureDataArray.push(stringifiedLectureData);
        }

        const flattenedLectureDataArray = lectureDataArray.flat();

        const lectures = flattenedLectureDataArray.find(lecture => lecture._id === lectureId); 

        // Check lecture completion
        const isCompleted = req.isCompleted;

        // Get the total viewed count for the lecture
        const viewedCount = await getTotalViewedCount(userId, courseSlug);
        console.log(viewedCount)
        lectures.isCompleted = isCompleted;
        lectures.viewedCount = viewedCount;

        res.render('customer/courses/course-learning', { courses: courseData, courseContent: contentData, lectureList: lectureDataArray, lectures, layout: false });
    } catch (err) {
        res.send(err);
    }
}









