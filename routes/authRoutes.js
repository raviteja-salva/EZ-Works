const express = require('express');
const router = express.Router();
const { signup, login, verifyEmail } = require('../controllers/authController');
const { signupValidationRules, loginValidationRules, validate } = require('../middleware/validators');

router.post('/signup', signupValidationRules(), validate, signup);
router.post('/login', loginValidationRules(), validate, login);
router.get('/verify/:token', verifyEmail);

module.exports = router;