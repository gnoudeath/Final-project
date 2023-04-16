const Course = require('../models/courses');
const CourseContent = require('../models/coursesContent');
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

exports.findCourseContent = (req, res) => {
    if (req.query.id) {
        const id = req.query.id;

        CourseContent.findById(id)
        .populate({
            path: 'course',
            select: 'nameCourse'
        })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: "Not found course with id" + id })
            } else {
                console.log(data.course.nameCourse);
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Erro retrieving course with id" + id })
        })

    } else {
        CourseContent.find()
            .populate('course', 'nameCourse') // populate course name
            .then(course => {
                res.send(course)
            })
            .catch(err => {
                console.log(data.course.nameCourse);
                res.status(500).send({ message: err.message || "Error Occured while retriving course information" })
            })
    }
}


