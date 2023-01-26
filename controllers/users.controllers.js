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
    const { id } = req.params

    const user = await User.findOne({
      where: {
        id,
        status: true
      }
    })


    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'The user was not fount'
      })
    }

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
      username,
      email,
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
    const { id } = req.params

    const { username, email } = req.body

    const user = await User.findOne({
      where: {
        id,
        status: true
      }
    })

    if (!user) {
      return res.status(404).json({
        status: 'error',
        messaje: 'The user was not fount'
      })
    }

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
    const { id } = req.params

    const user = await User.findOne({
      where: {
        id,
        status: true
      }
    })

    if (!user) {
      return res.status(404).json({
        status: 'error',
        messaje: 'The user was not fount'
      })
    }

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
