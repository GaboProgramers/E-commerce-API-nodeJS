const User = require("../../models/user.model");
const catchAsync = require("../../utils/catchAsync");
const bcrypt = require("bcryptjs");
const generateJWT = require("../../utils/jwt");

exports.createUser = catchAsync(async (req, res, next) => {

    const { username, email, password, role } = req.body

    const user = new User({ username, email, password, role });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const token = await generateJWT(user.id)

    res.status(201).json({
        status: 'success',
        message: 'The user was created successfully',
        token,
        user: {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role
        }
    });
})


// ! Casi siempre sera de este modo la creacion de usuario