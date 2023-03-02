const { body } = require('express-validator');

const User = require('../../model/user');

const userSignupValidation = () => {
    return [
        body('email')
            .isEmail()
            .withMessage('Please enter a valid email.')
            .custom((value, { req }) => {
                return User.findOne({ email: value }).then(userDoc => {
                    if (userDoc) {
                        return Promise.reject('Email already exists. Please enter different one.')
                    }
                    else {
                        return Promise.resolve(true)
                    }
                })
                // .catch(err => {
                //     console.log(err)
                //     return Promise.reject(err)
                // })
            })
            .normalizeEmail({ "gmail_remove_dots": false }),
        body('password')
            .trim()
            .isLength({ min: 5 }).withMessage('Password must be at least 5 characters long.')
            .matches(/[!@#$%^&*]/).withMessage('Password missing special character.')
            .matches(/[A-Z]/).withMessage('Password missing at least one capital letter.')
            .matches(/\d/).withMessage('Password missing at least one number.'),
        body('confirmPassword')
            .trim()
            .custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error('Passwords do not match.')
                }
                return true;
            }),
        body('name')
            .trim()
            .not()
            .isEmpty()
    ]
}

const userSigninValidation = () => {
    return [
        body('email')
            .isEmail()
            .withMessage('Please enter a valid email.')
            .normalizeEmail({ "gmail_remove_dots": false }),
        body('password')
            .trim()
            .not()
            .isEmpty()
            .withMessage('Please enter a valid password.')
    ]
}

module.exports = {
    userSignupValidation,
    userSigninValidation
}