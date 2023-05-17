// errorController.js

exports.get404Page = (req, res) => {
    res.status(404).render('', { pageTitle: 'Page Not Found' });
};

