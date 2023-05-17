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
router.get('/contentList', checkRole('admin'), services.contentList);
router.get('/newCourseContent', checkRole('admin'), services.newCourseContent);
router.get('/updateContent', checkRole('admin'), services.updateContent);

// API Course Content
router.post('/api/newCourseContent', courseController.createCourseContent);
router.get('/api/contentList', courseController.findCourseContent);
router.get('/api/content',courseController.findContent)

router.put('/api/updateContent/:id', courseController.updateContent);
router.delete('/api/contentList/:id', courseController.deleteContent);


// Lecture
router.get('/newLecture', checkRole('admin'), services.newLecture);
router.get('/lecture', checkRole('admin'), services.lectureList);
router.get('/updateLecture', checkRole('admin'), services.updateLecture);

// API Lecture
router.post('/api/newLecture', courseController.createLecture);
router.get('/api/lecture', courseController.findLectureList);
router.get('/api/lectureList',courseController.findlecture)

router.put('/api/updateLecture/:id', courseController.updateLecture);
router.delete('/api/lecture/:id', courseController.deleteLecture);



module.exports = router;