const User = require("../models/user.model")

exports.findUsers = async (req, res) => {

  try {
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
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};

exports.findUser = async (req, res) => {
  try {
    const { user } = req

    res.status(200).json({
      status: 'success',
      message: 'peticion GET - desde findUser',
      user
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const newUser = await User.create({
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      password
    });

    res.status(201).json({
      status: 'success',
      message: 'The user was created successfully',
      newUser
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};

exports.updateUser = async (req, res) => {

  try {
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
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { user } = req

    await user.update({ status: false })

    res.json({
      status: 'success',
      message: 'the user was delete succssefully'
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};
