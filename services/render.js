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
    axios.get('http://localhost:3000/api/contentList',{params: {id:req.query.id}})
        .then(function(response){
            res.render("admin/courses/contentList", {courseContent: response.data , id: req.query.id});
        })
        .catch(err =>{
            res.send(err);
        })
}

exports.updateContent = (req, res) => {
    // console.log(req.query.id);
    axios.get('http://localhost:3000/api/content',{params: {id:req.query.id}})
        .then(function(contentdata) {
            res.render("admin/courses/updateContent",{contentList:contentdata.data})
        })
        .catch(err => {
            res.send(err);
        })
}

// End Course Conten


// Lecture

exports.newLecture = (req, res) => {
    res.render('admin/courses/newLecture', {id:req.query.id});
}


exports.lectureList = (req, res) => {
    
    axios.get('http://localhost:3000/api/lecture',{params: {id:req.query.id}})
        .then(function(response){
            res.render("admin/courses/lecture", {lectureContent: response.data, id: req.query.id});
        })
        .catch(err =>{
            res.send(err);
        })
        
}

exports.updateLecture = (req, res) => {
    // console.log(req.query.id);
    axios.get('http://localhost:3000/api/lectureList',{params: {id:req.query.id}})
        .then(function(contentdata) {
            res.render("admin/courses/updateLecture",{lectureContent:contentdata.data})
        })
        .catch(err => {
            res.send(err);
        })
}



