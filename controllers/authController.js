const User  = require('../models/User');
const Role  = require('../models/Role');
const jwt = require('jsonwebtoken');

// handle errors
const handleErros = (err) => {
    console.log(err.message, err.code);
    let errors = { account: '', password: '', email: '', phone: ''};

    // incorrect account
    if (err.message === 'Incorrect account') {
        errors.account = 'That account is incorrect'
    }

    // incorrect password
    if (err.message === 'Incorrect password') {
        errors.password = 'That account is incorrect'
    }

    //duplicate error code
    if (err.code === 11000) {
        if (err.keyPattern && err.keyPattern.account) {
            errors.account = 'That account is already registered';
        }
        if (err.keyPattern && err.keyPattern.email) {
            errors.email = 'That email is already registered';
        }
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

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id, role) => {
    return jwt.sign({ id, role }, 'account secret', {
        expiresIn: maxAge
    });
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
        const customerRole = await Role.findOne({roleName: "customer"}); // Tìm role customer trong database
        const user = await User.create({account, password, userName, email, phone, role: customerRole._id}); // Tạo user với role là ObjectId của role customer
        const token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000});
        res.status(201).json({user:  user._id});
    } catch (err) {
        const errors = handleErros(err);
        res.status(400).json({ errors });
    }
}

module.exports.login_post = async (req, res) => {
        const { account, password } = req.body;
        try {
        const user = await User.login(account, password);
        const role = await Role.findById(user.role);
        const token = createToken(user._id, role.roleName);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.cookie('role', role.roleName, { maxAge: maxAge * 1000 });
        res.status(200).json({ user: user._id });
        } catch (err) {
        const errors = handleErros(err);
        res.status(400).json({ errors });
        }
    };

module.exports.logout_get = (req, res) => {
    res.cookie('jwt', '', {maxAge: 1});
    res.redirect('/');

}