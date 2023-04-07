const mongoose = require('mongoose');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
    account: {
        type: String,
        require: [true, 'Please enter your new account'],
        unique: true,
        lowercase: true
    },
    userName: {
        type: String,
        require: [true, 'Please enter your user name'],
    },
    password: {
        type: String,
        require: [true, 'Please enter your password'],
        minlength: [6, 'Password must be 6 characters or more'],
    },
    email: {
        type: String,
        require: [true, 'Please enter your email'],
        unique: true,
        validate: [isEmail, 'Please enter a vaild email']
    },
    phone: {
        type: String,
        require: [true, 'Please enter your phone number'],
    },
});

const User = mongoose.model('user', userSchema);

module.exports = User;