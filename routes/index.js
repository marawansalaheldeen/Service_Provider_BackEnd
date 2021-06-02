const { Router } = require('express');
const router = Router();
const controller = require('../controller');
const { verifyRequestToken, verifyToken } = require('../config/token');
const { isMailVerified } = require('../middleware/isMailConfirmed');


router.post('/signup', controller.register.registerUser);
router.post('/login',isMailVerified, controller.login.userLogin);
router.post('/confirmemail',verifyToken, controller.login.confirmEmail);
router.post('/resendconfirmemail',verifyToken, controller.login.resendConfirmEmail);
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

//services
router.post('/addservice',verifyRequestToken,controller.service.addService);
router.get('/getservicebyid/:service_id',verifyRequestToken,controller.service.getServiceByServiceId);
router.post('/updateservicebyid',verifyRequestToken,controller.service.updateServiceById);

router.post('/customer/closestproviders',verifyRequestToken, controller.customer.requestCustomerService);

module.exports = router;