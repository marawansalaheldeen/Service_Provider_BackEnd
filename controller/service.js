const serviceService = require('../service/service');

exports.getAllService = async (req, res)=>{
    const services = await serviceService.getAllService();
    if (!services) {
        res.status(400).send({ message: "error occuered" });
    } else {
        res.status(200).send({ message: services });
    }
}