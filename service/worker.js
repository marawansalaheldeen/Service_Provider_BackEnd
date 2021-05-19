const { sequelize, Worker } = require('../models');
const { User } = require('../models');

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
    console.log(user_id, user_type_id,user_first_name);

    const userr = await User.findOne(
        {
            where:{user_id}
        }
    )
    User.update(
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