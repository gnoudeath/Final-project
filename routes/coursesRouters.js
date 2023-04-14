const { Router } = require('express');
const { checkRole } = require('../middleware/authMiddleware')

const router = Router();

// const courseController = require('../controllers/courseController');

// router.get('/create', courseController.create);


router.get('/newCourse', checkRole('admin'), (req, res) => {
    res.render('newCourse');
});

router.get('/courseList', checkRole('admin'), (req, res) => {
    res.render('courseList');
});

router.get('/update-course', checkRole('admin'), (req, res) => {
    res.render('update-course');
});

module.exports = router;