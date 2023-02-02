const { Router } = require('express');
const { check } = require("express-validator")
const {
  updateUser,
  deleteUser,
  findUsers,
  findUser
} = require('../controllers/users.controllers');
const { validUserById, validIfExistUserEmail } = require('../middlewares/user.middleware');
const { validateFields } = require('../middlewares/validateField.middleware');

const router = Router();

router.get('/', findUsers);
router.get('/:id', validUserById, findUser);

router.patch('/:id', [
  check('username', 'The username require').not().isEmpty(),
  check('email', 'The email require').not().isEmpty(),
  check('email', 'The email must be a correct format').isEmail(),
  validateFields,
  validUserById
], updateUser);

router.delete('/:id', validUserById, deleteUser);

// router.get('/orders', validUserById, findUser);

// router.get('/orders/:id', validUserById, findUser);


module.exports = {
  usersRouter: router,
};
