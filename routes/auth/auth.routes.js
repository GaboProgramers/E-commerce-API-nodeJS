const { Router } = require("express");
const { check } = require("express-validator");
const { createUser } = require("../../controllers/auth/auth.controller");
const { validIfExistUserEmail } = require("../../middlewares/user.middleware");
const { validateFields } = require("../../middlewares/validateField.middleware");

const router = Router()

router.post('/signup', [
    check('username', 'The username require').not().isEmpty(),
    check('email', 'The email require').not().isEmpty(),
    check('email', 'The email must be a correct format').isEmail(),
    check('password', 'The pasword must be mandatory').not().isEmpty(),
    validateFields,
    validIfExistUserEmail
], createUser);

module.exports = {
    authRouter: router
}