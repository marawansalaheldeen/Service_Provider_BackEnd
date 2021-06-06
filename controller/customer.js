const customerService = require('../service/customer');

exports.updateCustomer = async (req, res) => {
    const worker = await customerService.updateCustomer(req.body);
    if (worker == false) {
        res.status(400).send({ message: "incorrect data" });
    } else {
        res.status(200).send(worker);
    }
}

exports.updateUserCar = async (req, res)=>{
    const car = await customerService.updateUserCar(req.body);
    if (car == false) {
        res.status(400).send({ message: "incorrect data" });
    } else {
        res.status(200).send(car);
    }
} 

exports.requestCustomerService = async (req, res)=>{
    var io = req.app.get('socketio');
    const availableServices = await customerService.requestCustomerService(req.body, io);
    if (availableServices == false) {
        res.status(400).send({ message: "incorrect data" });
    } else {
        res.status(200).send({message: availableServices});
    }
}