const axios = require('axios');

exports.courseList = (req, res) => {
    // res.render('courseList',{courses: "New Data"});
    axios.get('http://localhost:3000/api/courses')
        .then(function(response){
            console.log(response)
            res.render('courseList',{courses: response.data});
        })
        .catch(err =>{
            res.send(err);
        })
}

exports.newCourse = (req, res) => {
    res.render('newCourse');
}


exports.updateCourse = (req, res) => {
    res.render('update-course');
}

exports.updateCourse = (req, res) => {
    res.render('update-course');
}