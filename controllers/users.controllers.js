const User = require("../models/user.model");
const catchAsync = require("../utils/catchAsync");

exports.findUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll({
    where: {
      status: true
    }
  })

  res.status(200).json({
    status: 'success',
    message: 'peticion GET - desde findUsers',
    users
  });

})

exports.findUser = catchAsync(async (req, res, next) => {
  const { user } = req

  res.status(200).json({
    status: 'success',
    message: 'peticion GET - desde findUser',
    user
  });

})

exports.createUser = catchAsync(async (req, res, next) => {
  const { username, email, password, role } = req.body;

  const newUser = await User.create({
    username: username.toLowerCase(),
    email: email.toLowerCase(),
    password,
    role
  });

  res.status(201).json({
    status: 'success',
    message: 'The user was created successfully',
    newUser
  });
})

exports.updateUser = catchAsync(async (req, res, next) => {
  const { user } = req

  const { username, email } = req.body

  const updateUser = await user.update({
    username,
    email
  })

  res.status(200).json({
    status: 'success',
    message: 'the user was update succssfully',
    updateUser
  });
})

exports.deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req

  await user.update({ status: false })

  res.json({
    status: 'success',
    message: 'the user was delete succssefully'
  });
})
