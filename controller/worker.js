const workerService = require('../service/worker');

exports.updateWorker = async(req, res)=>{
    const worker = await workerService.updateWorker(req.body);
    if (worker == false) {
        res.status(400).send({ message: "incorrect data" });
    } else {
        res.status(200).send(worker);
    }
}
