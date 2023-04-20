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

exports.getDetailAndContentList = (req, res) => {
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
            
            res.render('customer/courses/course-learning', { courses: courseData, courseContent: contentData, lectureList: lectureDataArray, layout: false });
        })
        .catch(err => {
            res.send(err);
        })
}