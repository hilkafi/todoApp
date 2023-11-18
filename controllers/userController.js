const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

/**The reason is to use asyncHandler so that we don't have to hanlde 
*the error manaully. We have defined a error handler middleware which will
* handle the error. This asyncHandler will send error data accordingly to that middleware
*/

/**
 * @desc Register user
 * @route Post /api/users
 * @access Public
 */
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(422);
        throw new Error("Please provide users neccessary data");
    }

    const existUser = await User.findOne({ email });
    if (existUser) {
        res.status(422);
        throw new Error("User already existed with this email");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
        name,
        email,
        password: hashedPassword
    });

    if (newUser) {
        const token = await generateToken(newUser.id);
        res.json({
             message: "User registered successfully!",
             id: newUser.id,
             email: newUser.email,
             token
        });
    } else {
        res.status(400);
        throw new Error("Unable to register user");
    }

});

/**
 * @desc Login user
 * @route Post /api/users/login
 * @access Public
 */
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(422);
        throw new Error("User email and password is required");
    }

    const user = await User.findOne({ email });
    if (!user) {
        res.status(422);
        throw new Error("Invalid credentials");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (isValidPassword) {
        const token = await generateToken(user.id);

        res.json({
            message: "User logged in successfully!",
            token
       });
    } else {
        res.status(422);
        throw new Error("Invalid credentials");
    }
});

/**
 * @desc Get logged user details
 * @route Get /api/users/me
 * @access Private
 */
const getMe = asyncHandler(async (req, res) => {
    const { _id, name, email } = await User.findById(req.user.id);
    res.json({
        data: {
            id: _id,
            name,
            email
        }
   });
});

const generateToken = asyncHandler(async (id) => {
    return await jwt.sign({id}, process.env.JWT_SECRET, { expiresIn: "1 day" });
});

module.exports = {
    registerUser,
    login,
    getMe
};