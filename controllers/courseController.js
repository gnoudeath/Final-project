const { query } = require('express');
const Course = require('../models/courses');

// create and save new course
exports.createCourse = (req, res) => {
    // validate request
    if (!req.body) {
        res.status(400).send({message: "Content can not be emtpy!"});
        return;
    }

    // new courses
    const course = new Course({
        nameCourse: req.body.nameCourse,
        descriptionCourse: req.body.descriptionCourse,
        imageCourse: req.body.imageCourse,
        costCourse: req.body.costCourse
    })

    // save course in the database
    course
        .save(course)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some err occurred while creating a create operation"
            });
        });

}

//retrieve and return all courses/retrive and return a single course
exports.findCourse  = (req, res) => {

    if (req.query.id) {
        const id = req.query.id;

        Course.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({message: "Not found course with id" +id})
                } else {
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send({message: "Erro retrieving course with id" +id})
            })

    } else {
    Course.find()
    .then(course => {
        res.send(user)
    })
    .catch(err => {
        res.status(500).send({message: err.message || "Error Occured while retriving user information"})
    })
    }
}

//Update a new idetied course by course id
exports.updateCourse  = (req, res) => {
    if (!req.body) {
        return res
            .status(400)
            .send({message: "Data to update can not be empty"})
    }

    const id = req.params.id;
    Course.findByIdAndUpdate(id.req.body, {useFindAndModify:false})
        .then(data => {
            if(!data) {
                res.status(400).send({message: 'Cannot Update course with ${id}. May be course not found!'})
            } else {
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({message: "Error Update course information"})
        })
}

// Delete a user with specified user id in the request
exports.deleteCourse  = (req, res) => {
    const id = req.params.id;

    Course.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({message: 'Cannot Delete with id ${id}. May be id is wrong'})
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


