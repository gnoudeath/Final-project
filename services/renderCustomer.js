const axios = require('axios');

exports.courseList = (req, res) => {
    axios.get('http://localhost:3000/api/courses')
        .then(function(response){
            // console.log(response)
            res.render('customer/courses/course', {courses: response.data});
        })
        .catch(err =>{
            res.send(err);
        })
}

// exports.newCourse = (req, res) => {
//     res.render('admin/courses/newCourse');
// }

// exports.updateCourse = (req, res) => {
//     axios.get('http://localhost:3000/api/courses',{params: {id:req.query.id}})
//         .then(function(coursedata) {
//             res.render("admin/courses/update-course",{courses:coursedata.data})
//         })
//         .catch(err => {
//             res.send(err);
//         })
// }
