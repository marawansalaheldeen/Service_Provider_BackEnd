const workerService = require('../service/worker');

exports.updateWorker = async(req, res)=>{
    const worker = await workerService.updateWorker(req.body);
    if (worker == false) {
        res.status(400).send({ message: "incorrect data" });
    } else {
        res.status(200).send(worker);
    }
}


exports.getWorkersByProviderId = async (req, res)=>{
    console.log("location id", req.body.service_provider_location_id);
    const workers = await workerService.getWorkersByProviderId(req.body.service_provider_location_id);
    if (!workers) {
        res.status(400).send({ message: "error occuered" });
    } else {
        res.status(200).send({ message: workers });
    }
}

exports.getAvailabbleWorkersBySPL = async (req, res)=>{
    
    const available_workers = await workerService.getAvailabbleWorkersBySPL(req.body.service_provider_location_id);
    
    if (!available_workers) {
        res.status(400).send({ message: "error occuered" });
    } else {
        res.status(200).send({ message: available_workers });
    }
}