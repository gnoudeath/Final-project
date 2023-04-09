const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    account: {
        type: String,
        require: [true, 'Please enter your new account'],
        unique: true,
        lowercase: true,
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
        validate: [isEmail, 'Please enter a vaild email'],
    },
    phone: {
        type: String,
        required: [true, 'Please enter your phone number'],
        match: [/^[0-9]{9,10}$/, 'Please enter a valid phone number'],
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'role',
    }
});

// fire a function before doc saved to database
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// static method to login user
userSchema.statics.login = async function(account, password) {
    const user = await this.findOne({ account });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('Incorrect password')
    }
    throw Error('Incorrect account')
}

const User = mongoose.model('user', userSchema);

// const roleSchema = new mongoose.Schema ({
//     roleName: {
//         type: String
//     }
// })

// const Role = mongoose.model('role', roleSchema);

module.exports = User;