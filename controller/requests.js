const requestService = require('../service/requests');

exports.getPendingRequests = async(req,res)=>{
    var Requests_pending = await requestService.getPendingRequests(req.body.service_provider_id)
    console.log(Requests_pending);
    if (Requests_pending.length != 0) {
        res.status(400).send({ message: "error happened in controller" });
    } else {
        res.status(200).send(Requests_pending);
    }
}