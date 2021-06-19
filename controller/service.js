const serviceService = require('../service/service');

exports.getAllService = async (req, res)=>{
    const services = await serviceService.getAllService();
    if (!services) {
        res.status(400).send({ message: "error occuered" });
    } else {
        res.status(200).send({ message: services });
    }
}

exports.addService = async (req,res)=>{
    const add_service = await serviceService.addService(req.body);
    console.log(add_service);
    if (!add_service) {
        res.status(400).send({ message: "error occuered" });
    }else if(add_service == "service allready exist"){
        res.status(409).send({message: add_service})
    } else {
        res.status(200).send({ message: add_service });
    }
}

exports.getServiceByServiceId = async (req,res)=>{
    const get_service_by_id = await serviceService.get_service_by_id(req.params.service_id);

    if (!get_service_by_id) {
        res.status(400).send({ message: "error occuered" });
    } else {
        res.status(200).send({ message: get_service_by_id });
    }
}


exports.updateServiceById = async (req,res)=>{
    const update_service_by_id = await serviceService.update_service_by_id(req.body);

    if (!update_service_by_id) {
        res.status(400).send({ message: "error occuered" });
    } else {
        res.status(200).send({ message: update_service_by_id });
    }
}