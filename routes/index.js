const { Router } = require('express');
const router = Router();
const controller = require('../controller');
const { verifyRequestToken } = require('../config/token');
const { isMailVerified } = require('../middleware/isMailConfirmed');

router.post('/signup', controller.register.registerUser);
router.post('/login',isMailVerified, controller.login.userLogin);
router.post('/confirmemail',verifyRequestToken, controller.login.confirmEmail);
router.post('/resetpasswordemail', controller.login.resetPasswordEmail);
router.post('/changepassword', verifyRequestToken, controller.login.changePassword);

module.exports = router;