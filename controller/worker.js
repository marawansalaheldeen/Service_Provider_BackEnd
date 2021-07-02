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
    console.log("workersssss", workers);
    if (!workers) {
        res.status(400).send({ message: "error occuered" });
    } else {
        res.status(200).send({ message: workers });
    }
}

exports.getAvailabbleWorkersBySPL = async (req, res)=>{
    
    const available_workers = await workerService.getAvailabbleWorkersBySPL(req.body.service_provider_location_id);
    console.log("available_workers", available_workers);
    if (!available_workers) {
        res.status(400).send({ message: "error occuered" });
    } else {
        res.status(200).send({ message: available_workers });
    }
}

exports.assignWorkerToMission = async (req, res)=>{
    let io = req.app.get('socketio');
    const isAssigned = await workerService.assignWorkerToMission(req.body, io);
    
    if (!isAssigned) {
        res.status(400).send({ message: "error occuered" });
    } else {
        res.status(200).send({ message: "worker assigned" });
    }
} 

exports.getRequestAssignedByWorkerId = async (req, res)=>{
    const request = await workerService.getRequestAssignedByWorkerId(req.body);
    
    if (!request) {
        res.status(400).send({ message: "error occuered" });
    } else {
        res.status(200).send({ message: request });
    }
}

exports.changeRequestStatus = async (req, res)=>{
    console.log("direname", __dirname);
    const isChanged = await workerService.changeRequestStatus(req.body);
    
    if (!isChanged) {
        res.status(400).send({ message: "error occuered" });
    } else {
        res.status(200).send({ message: "status changed" });
    }
}