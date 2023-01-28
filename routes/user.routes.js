const { Router } = require('express');
const { ckeck, check } = require("express-validator")
const {
  createUser,
  updateUser,
  deleteUser,
  findUsers,
  findUser
} = require('../controllers/users.controllers');
const { validUserById, validIfExistUserEmail } = require('../middlewares/user.middleware');
const { validateFields } = require('../middlewares/validateField.middleware');

const router = Router();


// router.post('/login', createUser);
router.get('/', findUsers);
// router.get('/me', findUsers);
router.get('/:id', validUserById, findUser);

router.post('/', [
  check('username', 'The username require').not().isEmpty(),
  check('email', 'The email require').not().isEmpty(),
  check('email', 'The email must be a correct format').isEmail(),
  check('password', 'The pasword must be mandatory').not().isEmpty(),
  validateFields,
  validIfExistUserEmail
], createUser);

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
