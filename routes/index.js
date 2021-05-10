const { Router } = require('express');
const router = Router();
const controller = require('../controller');

router.post('/signup', controller.register.registerUser);

module.exports = router;