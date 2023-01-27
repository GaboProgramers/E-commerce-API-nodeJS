const { Router } = require('express');
const {
  createUser,
  updateUser,
  deleteUser,
  findUsers,
  findUser
} = require('../controllers/users.controllers');
const { validUserById } = require('../middlewares/user.middleware');

const router = Router();

router.get('/', findUsers);

router.get('/:id', validUserById, findUser);

router.post('/', createUser);

router.patch('/:id', validUserById, updateUser);

router.delete('/:id', validUserById, deleteUser);

module.exports = {
  usersRouter: router,
};
