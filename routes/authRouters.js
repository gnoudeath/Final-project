const { Router } = require('express');
const authController = require('../controllers/authController');
const { checkRole } = require('../middleware/authMiddleware')
const courseController = require('../controllers/courseController');
const services = require('../services/renderCustomer');
const url = require('url');
const router = Router();

router.get('/signup', authController.signup_get);
router.post('/signup', authController.signup_post);

router.get('/login', authController.login_get);
router.post('/login', authController.login_post);

router.get('/logout', authController.logout_get);

// Section: Admin
router.get('/dashboard', checkRole('admin'), (req, res) => {
    res.render('admin/dashboard');
});
// Section: Customer
router.get('/about', checkRole('customer'), (req, res) => {
    res.render('customer/about');
});
// router.get('/course', checkRole('customer'), (req, res) => {
//     res.render('customer/courses/course');
// });
router.get('/teacher', checkRole('customer'), (req, res) => {
    res.render('customer/teacher');
});
router.get('/blog', checkRole('customer'), (req, res) => {
    res.render('customer/blog');
});
router.get('/contact', checkRole('customer'), (req, res) => {
    res.render('customer/contact');
});
router.get('/single', checkRole('customer'), (req, res) => {
    res.render('customer/single');
});
// router.get('/course-learning', checkRole('customer'), (req, res) => {
//     res.render('customer/courses/course-learning', { layout: false });
// });

// router.get('/course', checkRole('customer'), services.courseList, (req, res) => {
//     res.render('customer/courses/course');
// });
router.get('/course', checkRole('customer'), services.courseList);

router.get('/course-detail/:slug', checkRole('customer'), services.getCourseDetailAndContentList);

router.get('/course-learning/:slug', checkRole('customer'), services.getDetailAndContentList);


// router.get('/lecture', checkRole('admin'), services.lectureList);



// router.get('/api/courses', courseController.findCourse);
// router.get('/api/contentList', courseController.findCourseContent);
// router.get('/api/content',courseController.findContent)

module.exports = router;