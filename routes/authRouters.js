const { Router } = require('express');
const authController = require('../controllers/authController');
const { checkRole } = require('../middleware/authMiddleware')

const router = Router();

router.get('/signup', authController.signup_get);
router.post('/signup', authController.signup_post);

router.get('/login', authController.login_get);
router.post('/login', authController.login_post);

router.get('/logout', authController.logout_get);

// Section: Admin
router.get('/admin', checkRole('admin'));
// Section: Customer
router.get('/home', checkRole('customer'));
router.get('/about', checkRole('customer'), (req, res) => {
    res.render('about');
});
router.get('/course', checkRole('customer'));
router.get('/teacher', checkRole('customer'));
router.get('/blog', checkRole('customer'));
router.get('/contact', checkRole('customer'));
router.get('/single', checkRole('customer'));
router.get('/course-detail', checkRole('customer'));
router.get('/course-learning', checkRole('customer'));


// router.get('/about', (req, res) => {
//     res.render('about');
// })
router.get('/course', (req, res) => {
    res.render('course');
})
router.get('/teacher', (req, res) => {
    res.render('teacher');
})
router.get('/blog', (req, res) => {
    res.render('blog');
})
router.get('/contact', (req, res) => {
    res.render('contact');
})
router.get('/single', (req, res) => {
    res.render('single');
})
router.get('/course-detail', (req, res) => {
    res.render('course-detail');
})
router.get('/course-learning', (req, res) => {
    res.render('course-learning');
})

module.exports = router;