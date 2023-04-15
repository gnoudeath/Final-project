const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    // check json web token exists & is verified
    if (token) {
        jwt.verify(token, 'account secret', (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect('/login');
            } else {
                console.log(decodedToken);
                next();
            }
        })
    }
    else {
        res.redirect('/login');
    }
};

// check current user
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    res.locals.user = null;
    res.locals.role = null;
    if (token) {
        jwt.verify(token, 'account secret', async (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                next();
            } else {
                // console.log(decodedToken);
                let user = await User.findById(decodedToken.id).populate('role');
                res.locals.user = user;
                res.locals.role = user.role.roleName;
                next();
            }
        })
    } else {
        next();
    }
}

function checkRole(allowedRoles) {
    return async function (req, res, next) {
        const role = res.locals.role;
        // console.log(role)
        try {
            // Find the user's role in the Role table by objectId
            // let user = await User.findById(decodedToken.id).populate('role');

            if (!role) {
                // User's role not found in the Role table, redirect to error page
                return res.redirect('/error');
            }

            if (!allowedRoles.includes(role)) {
                // User doesn't have the required role, redirect to error page
                return res.redirect('/error');
            }

            // User has the required role, proceed to the next middleware
            next();
        } catch (err) {
            // Handle errors
            console.error(err);
            // res.status(500).send('Internal server error');
            res.redirect('/');
        }
    }
}

// function checkRoleCustomer(allowedRoles) {
//     return async function (req, res, next) {
//         const role = res.locals.role;
//         console.log(role)
//         try {
//             // Find the user's role in the Role table by objectId
//             // let user = await User.findById(decodedToken.id).populate('role');

//             if (!role) {
//                 // User's role not found in the Role table, redirect to error page
//                 return res.redirect('/error');
//             }

//             if (!allowedRoles.includes(role)) {
//                 // User doesn't have the required role, redirect to error page
//                 return res.redirect('/error');
//             }

//             // User has the required role, proceed to the next middleware
//             next();
//         } catch (err) {
//             // Handle errors
//             console.error(err);
//             // res.status(500).send('Internal server error');
//             res.redirect('/');
//         }
//     }
// }



module.exports = { requireAuth, checkUser, checkRole };