const axios = require('axios');

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

// exports.courseDetail = (req, res) => {
//     axios.get('http://localhost:3000/api/courses',{params: {id:req.query.id}})
//         .then(function(response) {
//             res.render('customer/courses/course-detail', {courses: response.data});
//         })
//         .catch(err => {
//             res.send(err);
//         })
// }


// exports.contentList = (req, res) => {
//     axios.get('http://localhost:3000/api/contentList',{params: {id:req.query.id}})
//         .then(function(response){
//             res.render("customer/courses/course-detail", {courseContent: response.data});
//         })
//         .catch(err =>{
//             res.send(err);
//         })
// }


// exports.getCourseDetailAndContentList = (req, res) => {
//     const courseId = req.query.id;
//     const coursePromise = axios.get(`http://localhost:3000/api/courses?id=${courseId}`);
//     const contentPromise = axios.get(`http://localhost:3000/api/contentList?id=${courseId}`);
//     Promise.all([coursePromise, contentPromise])
//         .then(function ([courseResponse, contentResponse]) {
//             const courseData = courseResponse.data;
//             const contentData = contentResponse.data;
//             console.log(courseData); // log dữ liệu courseData
//             console.log(contentData); // log dữ liệu contentData
//             res.render('customer/courses/course-detail', { courses: courseData, courseContent: contentData });
//         })
//         .catch(err => {
//             res.send(err);
//         })
// }

exports.getCourseDetailAndContentList = (req, res) => {
    const courseId = req.query.id;
    const coursePromise = axios.get(`http://localhost:3000/api/courses?id=${courseId}`);
    const contentPromise = axios.get(`http://localhost:3000/api/contentList?id=${courseId}`);
    Promise.all([coursePromise, contentPromise])
        .then(async function ([courseResponse, contentResponse]) {
            const courseData = courseResponse.data;
            const contentData = contentResponse.data;
            
            // Lấy thông tin đầy đủ về các courseContent
            const contentIds = contentData.map(content => content._id);
            // console.log(contentIds);
            const lecturePromiseArray = contentIds.map(contentId => axios.get(`http://localhost:3000/api/lecture?id=${contentId}`));
            const lectureResponseArray = await Promise.all(lecturePromiseArray);
            const lectureDataArray = lectureResponseArray.map(response => response.data);
            
            // console.log(courseData); 
            // console.log(contentData); 
            // console.log(lectureDataArray); 
            
            res.render('customer/courses/course-detail', { courses: courseData, courseContent: contentData, lectureList: lectureDataArray });
        })
        .catch(err => {
            res.send(err);
        })
}





// exports.getCourseDetailAndContentList = (req, res) => {
//     const courseId = req.query.id;
//     const contentId = req.query.contentId;
//     console.log(contentId);

//     const coursePromise = axios.get(`http://localhost:3000/api/courses?id=${courseId}`);
//     const contentPromise = axios.get(`http://localhost:3000/api/contentList?id=${courseId}`);

//     Promise.all([coursePromise, contentPromise])
//         .then(function ([courseResponse, contentResponse]) {
//             const courseData = courseResponse.data;
//             const contentData = contentResponse.data;
//             // console.log(contentData)

//             // Tìm content theo ID
//             const courseContent = contentData.find(content => content._id == contentId);
//             if (!courseContent) {
//                 return res.status(404).send({ message: `Not found course content with id ${contentId}` });
//             }

//             // Lấy danh sách bài giảng của content đó
//             const lecturePromise = axios.get(`http://localhost:3000/api/lecture?id=${courseContent._id}`);
//             return Promise.all([courseData, courseContent, lecturePromise]);
//         })
//         .then(function ([courseData, courseContent, lectureResponse]) {
//             const lectureData = lectureResponse.data;

//             // Render template và truyền dữ liệu sang view
//             res.render('customer/courses/course-detail', {
//                 courses: courseData,
//                 courseContent: courseContent,
//                 lectureList: lectureData,
//             });
//         })
//         .catch(err => {
//             res.send(err);
//         });
// }








