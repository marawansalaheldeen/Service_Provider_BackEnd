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
router.post('/getservices',verifyRequestToken, controller.service.getAllService);
router.post('/usersbyid',verifyRequestToken, controller.login.getAllUsersByTypeId);
router.post('/workerbyid',verifyRequestToken, controller.worker.getWorkersByProviderId);
router.post('/userbyid',verifyRequestToken, controller.login.getUserById);

//services
router.post('/addservice',controller.service.addService);
router.get('/getservicebyid/:service_id',verifyRequestToken,controller.service.getServiceByServiceId);
router.post('/updateservicebyid',verifyRequestToken,controller.service.updateServiceById);

router.post('/customer/closestproviders',verifyRequestToken, controller.customer.requestCustomerService);
router.post('/workers/getavailableworkers',verifyRequestToken, controller.worker.getAvailabbleWorkersBySPL);

router.post('/setsocketid', controller.servicecProvider.serSocketUSerId);

router.post('/provider/rejectrequest',verifyRequestToken, controller.servicecProvider.rejectingCustomerRequest);
router.post('/provider/sesrvicestatus',verifyRequestToken, controller.servicecProvider.changeServiceStatus);

router.post('/provider/assignworker',verifyRequestToken, controller.worker.assignWorkerToMission);

router.post('/worker/requests',verifyRequestToken, controller.worker.getRequestAssignedByWorkerId);

router.post('/worker/changerequest',verifyRequestToken, controller.worker.changeRequestStatus);

router.post('/customer/requests', controller.customer.getCustomerRequestes);

router.post('/getrequestedservices',controller.requests.getPendingRequests);

router.post('/getbarchardata',controller.charts.requestBarChart);

router.post('/gettotalmoney',controller.charts.totalMoneyEarned);

router.post('/customer/cancelwfine', controller.customer.cancelCustomerRequestWithFine);

router.post('/customer/cancel', controller.customer.cancelCustomerRequest);

router.post('/customer/rateworker', controller.customer.addWorkerRate);

router.post('/set/lnglat', controller.customer.addNewUserLngLat);

router.post('/get/lnglat', controller.customer.getNewUserLngLat);

router.post('/provider/getequests', controller.servicecProvider.getAllRequestsById);

router.post('/provider/reports', controller.servicecProvider.getProviderTotals);


module.exports = router;