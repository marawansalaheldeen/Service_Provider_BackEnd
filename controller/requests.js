const requestService = require('../service/requests');

exports.getPendingRequests = async(req,res)=>{
    var Requests_pending = await requestService.getPendingRequests(req.body.service_provider_id)
    console.log("asdasdasdsa",Requests_pending);
    if (Requests_pending === false) {
        res.status(400).send({ message: "error happened in controller" });
    } else {
        res.status(200).send(Requests_pending);
    }
}