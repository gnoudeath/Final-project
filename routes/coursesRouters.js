const { Router } = require('express');
const { checkRole } = require('../middleware/authMiddleware')

const router = Router();
const services = require('../services/render');

const courseController = require('../controllers/courseController');

// Course
router.get('/courseList', checkRole('admin'), services.courseList);
router.get('/newCourse', checkRole('admin'), services.newCourse);
router.get('/update-course', checkRole('admin'), services.updateCourse);

// API Course
router.post('/api/courses', courseController.createCourse);
router.get('/api/courses', courseController.findCourse)
router.put('/api/courses/:id', courseController.updateCourse);
router.delete('/api/courses/:id', courseController.deleteCourse);



// Course Content
router.get('/newCourseContent', checkRole('admin'), services.newCourseContent);
router.get('/contentList', checkRole('admin'), services.contentList);

// API Course Content
router.post('/api/newCourseContent', courseController.createCourseContent);
router.get('/api/contentList', courseController.findCourseContent)


module.exports = router;