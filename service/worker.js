const { sequelize, Worker } = require('../models');

module.exports.createWorker = async (userData)=>{
    const { user_id, service_provider_location_id } = userData;
    console.log("dataaaa", user_id, service_provider_location_id);

    const worker = await Worker.create({
        user_id, service_provider_location_id
    })
    userData.worker_id = worker.dataValues.worker_id;
    return userData;
}