const User = require("../models/user.model")

exports.findUsers = async (req, res) => {

  const users = await User.findAll({
    where: {
      status: true
    }
  })

  res.json({
    status: 'success',
    message: 'peticion GET - desde findUsers',
    users
  });
};

exports.findUser = async (req, res) => {
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
};

exports.createUser = async (req, res) => {
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
};

exports.updateUser = async (req, res) => {
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
};

exports.deleteUser = async (req, res) => {
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
};
