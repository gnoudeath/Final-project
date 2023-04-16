const Course = require('../models/courses');
const CourseContent = require('../models/coursesContent');
const Lecture = require('../models/lecture');
const mongoose = require('mongoose');

// create and save new course
exports.createCourse = (req, res) => {
    // validate request
    if (!req.body) {
        res.status(400).send({ message: "Content can not be emtpy!" });
        return;
    }
    // new courses
    const formData = req.body;
    formData.imageCourse = `https://img.youtube.com/vi/${req.body.videoIdCourse}/sddefault.jpg`;
    const course = new Course({
        nameCourse: formData.nameCourse,
        descriptionCourse: formData.descriptionCourse,
        imageCourse: formData.imageCourse,
        videoIdCourse: formData.videoIdCourse,
        costCourse: formData.costCourse
    });

    // save course in the database
    course.save()
        .then(data => {
            res.redirect('/courseList')
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                message: err.message || "Some err occurred while creating a create operation"
            });
        });
}

//retrieve and return all courses/retrive and return a single course
exports.findCourse = (req, res) => {

    if (req.query.id) {
        const id = req.query.id;

        Course.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: "Not found course with id" + id })
                } else {
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send({ message: "Erro retrieving course with id" + id })
            })

    } else {
        Course.find()
            .then(course => {
                res.send(course)
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Error Occured while retriving course information" })
            })
    }
}

//Update a new idetied course by course id
exports.updateCourse = (req, res) => {
    if (!req.body) {
        return res
            .status(400)
            .send({ message: "Data to update can not be empty" })
    }
    const id = req.params.id;
    const formData = req.body;
    formData.imageCourse = `https://img.youtube.com/vi/${req.body.videoIdCourse}/sddefault.jpg`;
    Course.findByIdAndUpdate(id, formData, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot Update course with ${id}. May be course not found!` })
            } else {
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error Update course information" })
        })
}


// Delete a course with specified course id in the request
exports.deleteCourse = (req, res) => {
    const id = req.params.id;

    Course.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: 'Cannot Delete with id ${id}. May be id is wrong' })
            } else {
                res.send({
                    message: "Course was deleted successfuly!"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Course with id=" + id
            });
        })
}


// Course Content

exports.createCourseContent = (req, res) => {
    // validate request
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    // new course content
    const courseContent = new CourseContent({
        nameCourseContent: req.body.nameCourseContent,
        course: new mongoose.Types.ObjectId(req.body.id),
    });

    // save course content in the database
    courseContent.save()
        .then(data => {
            res.redirect('/courseList')
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                message: err.message || "Some error occurred while creating a create operation"
            });
        });
}


exports.findCourseContent = async (req, res) => {
    try {
        const id = req.query.id;
        let courseContent;   
        if (id) {
            courseContent = await CourseContent.find({course: id});
            if (!courseContent) {
                return res.status(404).send({ message: `Not found course with id ${id}` });
            }
            else{
                
                res.send(courseContent)
                
            }
            
        }
        
    } catch (error) {
        res.status(500).send({ message: error.message || "Error occurred while retrieving course information" });
    }
}
exports.findContent = async (req,res) =>{
    try {
        const id = req.query.id; // in ra giá trị của id
        let content;
        if (id) {
            content = await CourseContent.findById(id);
            if (!content) {
                return res.status(404).send({ message: `Not found course with id ${id}` });
            }
            else{
                
                res.send(content)
                
            }
            
        }
        
    } catch (error) {
        res.status(500).send({ message: error.message || "Error occurred while retrieving course information" });
    }
}

exports.updateContent = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }
    const id = req.params.id;
    // console.log(req.params.id)
    CourseContent.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update user information"})
        })
}

exports.deleteContent = (req, res) => {
    const id = req.params.id;
    // console.log(req.params.id);
    CourseContent.findByIdAndDelete(id, req.body, { useFindAndModify: false})
        .then(data => {
            if (!data) {
                res.status(404).send({ message: 'Cannot Delete with id ${id}. May be id is wrong' })
            } else {
                res.send({
                    message: "Course was deleted successfuly!"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Course with id=" + id
            });
        })
}



// Lecture

exports.createLecture = (req, res) => {
    // validate request
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    // new course content
    const lecture = new Lecture({
        nameLecture: req.body.nameLecture,
        contentLecture: req.body.contentLecture,
        VideoId: req.body.VideoId,
        noteLecture: req.body.noteLecture,
        CourseContent: new mongoose.Types.ObjectId(req.body.id),
    });
    // console.log(lecture);

    // save course content in the database
    lecture.save()
        .then(data => {
            res.redirect('/courseList')
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                message: err.message || "Some error occurred while creating a create operation"
            });
        });
}

exports.findlectureList = async (req, res) => {
    try {
        const id = req.query.id;
        let lectureContent;   
        // console.log(req.query.id);
        if (id) {
            lectureContent = await Lecture.find({CourseContent: id});
            if (!lectureContent) {
                return res.status(404).send({ message: `Not found course with id ${id}` });
            }
            else{
                
                res.send(lectureContent)
                
            }
            
        }
        
    } catch (error) {
        res.status(500).send({ message: error.message || "Error occurred while retrieving course information" });
    }
}
exports.findlecture = async (req,res) =>{
    try {
        const id = req.query.id;
        // console.log('lecture', id); // in ra giá trị của id
        let lecture;    
        if (id) {
            lecture = await Lecture.findById(id);
            if (!lecture) {
                return res.status(404).send({ message: `Not found course with id ${id}` });
            }
            else{
                
                res.send(lecture)
                
            }
            
        }
        
    } catch (error) {
        res.status(500).send({ message: error.message || "Error occurred while retrieving course information" });
    }
}


exports.updateLecture = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }
    const id = req.params.id;
    console.log(req.params.id)
    Lecture.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update user information"})
        })
}

exports.deleteLecture = (req, res) => {
    const id = req.params.id;
    // console.log(req.params.id);
    Lecture.findByIdAndDelete(id, req.body, { useFindAndModify: false})
        .then(data => {
            if (!data) {
                res.status(404).send({ message: 'Cannot Delete with id ${id}. May be id is wrong' })
            } else {
                res.send({
                    message: "Course was deleted successfuly!"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Course with id=" + id
            });
        })
}