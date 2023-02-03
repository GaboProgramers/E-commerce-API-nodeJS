const { promisify } = require("util")
const jwt = require("jsonwebtoken");
const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");
const User = require("../../models/user.model");

exports.protect = catchAsync(async (req, res, next) => {
    // ? 1. obtener que venga el token
    let token
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1]
    }

    if (!token) {
        return next(new AppError('You are not logged in! Pleace log in to get access', 401))
    }

    // ? 2. verificacion del token
    const decoded = await promisify(jwt.verify)(token, process.env.SECRETE_JWT_SEED)

    // ? 3. verificar que el usuario exista
    const user = await User.findOne({
        where: {
            id: decoded.id,
            status: true
        }
    })

    if (!user) {
        return next(new AppError('The owner of this token it not loger avaliable', 401))
    }

    // ? 4. verificar si el usuario a cambiado la contraseña despues de que el token all espirado.


    next()
})