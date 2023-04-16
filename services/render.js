const axios = require('axios');


// Course
exports.courseList = (req, res) => {
    axios.get('http://localhost:3000/api/courses')
        .then(function(response){
            // console.log(response)
            res.render('admin/courses/courseList', {courses: response.data});
        })
        .catch(err =>{
            res.send(err);
        })
}

exports.newCourse = (req, res) => {
    res.render('admin/courses/newCourse');
}

exports.updateCourse = (req, res) => {
    axios.get('http://localhost:3000/api/courses',{params: {id:req.query.id}})
        .then(function(coursedata) {
            res.render("admin/courses/update-course",{courses:coursedata.data})
        })
        .catch(err => {
            res.send(err);
        })
}

// End Course

// Course Content

exports.newCourseContent = (req, res) => {
    res.render('admin/courses/newCourseContent', {id:req.query.id});
}

exports.contentList = (req, res) => {
    axios.get('http://localhost:3000/api/contentList')
        .then(function(response){
            res.render("admin/courses/contentList", {courseContent: response.data});
            // console.log(response.data)
        })
        .catch(err =>{
            res.send(err);
        })
}


// End Course Conten
