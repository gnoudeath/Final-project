const User = require('../models/User');
const Role = require('../models/Role');
const jwt = require('jsonwebtoken');

// handle errors
const handleErros = (err) => {
    console.log(err.message, err.code);
    let errors = { account: '', password: '', email: '', phone: '' };

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
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
};

const maxAge = 3 * 24 * 60 * 60; // giá trị 3 ngày, tính bằng giây
const createToken = (id, role) => { //sử dụng thư viện jsonwebtoken để tạo token với thông tin được truyền vào id, role
    return jwt.sign({ id, role }, 'account secret', { // sử dụng chuỗi làm chìa khóa mã hóa token
        expiresIn: maxAge // đặt thời gian hết hạn của token
    });// trả về chuỗi token đã được mã hóa
};

module.exports.signup_get = (req, res) => {
    res.render('signup');
}

module.exports.login_get = (req, res) => {
    res.render('login');
}

module.exports.signup_post = async (req, res) => {
    const { account, password, userName, email, phone } = req.body;
    try {
        const customerRole = await Role.findOne({ roleName: "customer" }); // Tìm role customer trong database
        const user = await User.create({ account, password, userName, email, phone, role: customerRole._id }); // Tạo user với role là ObjectId của role customer
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ user: user._id });
    } catch (err) {
        const errors = handleErros(err);
        res.status(400).json({ errors });
    }
}

module.exports.login_post = async (req, res) => {
    const { account, password } = req.body; // lấy thông tin tài khoản và mật khẩu được gửi từ phía client.
    try {
        const user = await User.login(account, password);
        const role = await Role.findById(user.role);
        // tạo token bằng id người dùng và rolename tìm được với phương thức createToken
        const token = createToken(user._id, role.roleName);
        // lưu token vào cookie đặt tên jwt và thiết lập bằng HTTP và giới hạn thời gian 3 ngày
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 }); 
        // lưu role vào cookie và thiết lập bằng HTTP và giới hạn thời gian 3 ngày
        res.cookie('role', role.roleName, { maxAge: maxAge * 1000 });
        res.status(200).json({ user: user._id });
        
    } catch (err) {
        const errors = handleErros(err); //gọi hàm handleErros và truyền exception để xử lý
        // trả về một HTTP response với mã lỗi 400 (bad request) và một object chứa các lỗi
        res.status(400).json({ errors });
    }
};

module.exports.logout_get = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');

}
