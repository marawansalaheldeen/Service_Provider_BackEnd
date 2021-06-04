const {  Worker, User } = require('../models');

exports.createWorker = async (userData)=>{
    const { user_id, service_provider_location_id } = userData;
    console.log("dataaaa", user_id, service_provider_location_id);

    const worker = await Worker.create({
        user_id, service_provider_location_id
    })
    userData.worker_id = worker.dataValues.worker_id;
    return userData;
}

exports.updateWorker = async (workerData)=>{
    const { user_id, user_type_id,user_first_name,user_last_name,phone_number } = workerData;
    

    const userr = await User.findOne(
        {
            where:{user_id}
        }
    )
    userr.update(
        {
            user_first_name,
            user_last_name,
            phone_number

        },
        {
            where:{user_id,user_type_id}
        }
    )
    console.log(userr);
    return userr
}

exports.getWorkersByProviderId = async(servieProviderLocation)=>{
    const workers = await Worker.findAll({
        where: {
            service_provider_location_id: servieProviderLocation
        },
        include: [
            { model: User, as: 'User' }
        ]
    })

    return workers;
}

exports.getAvailabbleWorkersBySPL = async(servieProviderLocation)=>{
    const availble_worker = await Worker.findAll({
        where: {
            service_provider_location_id: servieProviderLocation,
            is_available:1
        },
        include: [
            { model: User, as: 'User' }
        ]
    })

    return availble_worker;
}