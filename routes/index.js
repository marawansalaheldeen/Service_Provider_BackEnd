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
router.post('/updateworker',controller.worker.updateWorker);
router.post('/updatecustomer',verifyRequestToken, controller.customer.updateCustomer);
// Get user 
router.post('/user',verifyRequestToken, controller.login.getUserData);
// Get all users
router.get('/users',verifyRequestToken, controller.login.getAllUsers);
router.post('/updatecar',verifyRequestToken, controller.customer.updateUserCar);
router.get('/getservices',verifyRequestToken, controller.service.getAllService);
router.post('/usersbyid',verifyRequestToken, controller.login.getAllUsersByTypeId);
router.post('/workerbyid',verifyRequestToken, controller.worker.getWorkersByProviderId);
router.post('/userbyid',verifyRequestToken, controller.login.getUserById);

module.exports = router;