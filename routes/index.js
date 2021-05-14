const { Router } = require('express');
const router = Router();
const controller = require('../controller');
const { verifyRequestToken } = require('../config/token');
const { isMailVerified } = require('../middleware/isMailConfirmed');

router.post('/signup', controller.register.registerUser);
router.post('/login', controller.login.userLogin);

module.exports = router;