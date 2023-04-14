const { Router } = require('express');
const { checkRole } = require('../middleware/authMiddleware')

const router = Router();
const services = require('../services/render');

const courseController = require('../controllers/courseController');

// router.get('/create', courseController.create);


router.get('/newCourse', checkRole('admin'), services.newCourse)

router.get('/courseList', checkRole('admin'), services.courseList)

router.get('/update-course', checkRole('admin'), services.updateCourse)

// API
router.post('/api/courses', courseController.createCourse);
router.get('/api/courses', courseController.findCourse)
router.put('/api/courses/:id', courseController.updateCourse);
router.delete('/api/courses/:id', courseController.deleteCourse);

module.exports = router;