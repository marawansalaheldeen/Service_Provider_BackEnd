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
    let io = req.app.get('socketio');
    const availableServices = await customerService.requestCustomerService(req.body, io);
    if (availableServices == false) {
        res.status(400).send({ message: "incorrect data" });
    } else {
        res.status(200).send({message: availableServices});
    }
}

exports.getCustomerRequestes = async (req, res)=>{
    const requests = await customerService.getCustomerRequestes(req.body);
    if (!requests) {
        res.status(400).send({ message: "incorrect data" });
    } else {
        res.status(200).send({message: requests});
    }
}

exports.cancelCustomerRequestWithFine = async(req, res)=>{
    let io = req.app.get('socketio');

    const result = await customerService.cancelCustomerRequestWithFine(req.body, io);
    if (!result) {
        res.status(400).send({ message: "incorrect data" });
    } else {
        res.status(200).send({message: result});
    }
}

exports.cancelCustomerRequest = async (req, res)=>{
    let io = req.app.get('socketio');

    const result = await customerService.cancelCustomerRequest(req.body, io);
    if (!result) {
        res.status(400).send({ message: "incorrect data" });
    } else {
        res.status(200).send({message: "cancelled successfully"});
    }
}

exports.addWorkerRate = async(req, res)=>{
    const result = await customerService.addWorkerRate(req.body);
    if (!result) {
        res.status(400).send({ message: "incorrect data" });
    } else {
        res.status(200).send({message: "worker rated successfully"});
    }

}

exports.addNewUserLngLat = async(req, res)=>{
    const result = await customerService.addNewUserLngLat(req.body);
    if (!result) {
        res.status(400).send({ message: "incorrect data" });
    } else {
        res.status(200).send({message: "worker rated successfully"});
    }
}

exports.getNewUserLngLat = async(req, res)=>{
    const user = await customerService.getNewUserLngLat(req.body);
    if (!user) {
        res.status(400).send({ message: "incorrect data" });
    } else {
        res.status(200).send({message: user});
    }
}