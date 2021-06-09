const requestService = require('../service/requests');

exports.getPendingRequests = async(req,res)=>{
    var service_provider_id = await requestService.getPendingRequests(req.body.service_id)

    if (service_provider_id == false) {
        res.status(400).send({ message: "error happened in service" });
    } else {
        res.status(200).send(service_provider_id);
    }
}