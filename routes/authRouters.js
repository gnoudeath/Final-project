const { Router } = require('express');
const authController = require('../controllers/authController');
// const { checkUser } = require('../middleware/authMiddleware')

const router = Router();

router.get('/signup', authController.signup_get);
router.post('/signup', authController.signup_post);

router.get('/login', authController.login_get);
router.post('/login', authController.login_post);

router.get('/logout', authController.logout_get);


router.get('/about', (req, res) => {
    res.render('about');
})
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

module.exports = router;