const User = require('../models/User');

// handle errors
const handleErros = (err) => {
    console.log(err.message, err.code);
    let errors = { account: '', password: '', userName: '', email: '', phone: ''};

    //duplicate error code
    if (err.code === 11000) {
        errors.email = 'that mail is already registered';
        errors.account = 'that account is already registered';
        return errors;
    }

    // validation errors
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
};

module.exports.signup_get = (req, res) => {
    res.render('signup');
}

module.exports.login_get = (req, res) => {
    res.render('login');
}

module.exports.signup_post = async (req, res) => {
    const {account, password, userName, email, phone} = req.body;

    try {
        const user = await User.create({account, password, userName, email, phone});
        res.status(201).json(user);
    } catch (err) {
        const errors = handleErros(err);
        res.status(400).json({ errors });
    }
}

module.exports.login_post = async (req, res) => {
    const {account, password, userName, email, phone} = req.body;

    console.log(account, password, userName, email, phone);

    res.send('user login');
}