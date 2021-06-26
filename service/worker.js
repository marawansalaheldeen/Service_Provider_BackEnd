const { Worker, User, RequestServiceProvider, ServiceProviderLocation, ServiceProvider,
    Request, Customer, Car } = require('../models');

exports.createWorker = async (userData) => {
    const { user_id, service_provider_location_id } = userData;
    console.log("dataaaa", user_id, service_provider_location_id);

    const worker = await Worker.create({
        user_id, service_provider_location_id
    })
    userData.worker_id = worker.dataValues.worker_id;
    return userData;
}

exports.updateWorker = async (workerData) => {
    const { user_id, user_type_id, user_first_name, user_last_name, phone_number } = workerData;


    const userr = await User.findOne(
        {
            where: { user_id }
        }
    )
    userr.update(
        {
            user_first_name,
            user_last_name,
            phone_number

        },
        {
            where: { user_id, user_type_id }
        }
    )
    console.log(userr);
    return userr
}

exports.getWorkersByProviderId = async (servieProviderLocation) => {
    const workers = await Worker.findAll({
        where: {
            service_provider_location_id: servieProviderLocation
        },
        include: [
            { model: User, as: 'User' }
        ]
    })
    console.log("worker in user", workers[0].User);
    return workers;
}

exports.getAvailabbleWorkersBySPL = async (servieProviderLocation) => {
    const availble_worker = await Worker.findAll({
        where: {
            service_provider_location_id: servieProviderLocation,
            is_available: 1
        },
        include: [
            { model: User, as: 'User' }
        ]
    })

    console.log("available workers", availble_worker);

    return availble_worker;
}

exports.assignWorkerToMission = async (workerData, io) => {
    const { request_id, service_provider_location_id, worker_id } = workerData;
    //remove request from other providers
    const serviceProviders = await RequestServiceProvider.findAll({
        where: {
            request_id: request_id
        },
        include: [
            {
                model: ServiceProviderLocation, as: 'ServiceProviderLocation',
                include: [
                    {
                        model: ServiceProvider, as: 'ServiceProvider',
                        include: [
                            { model: User, as: 'User' }
                        ]
                    }
                ]
            },

        ]
    })

    console.log("services", serviceProviders[0].dataValues.ServiceProviderLocation.ServiceProvider.User);

    serviceProviders.forEach(provider => {
        // console.log("v", provider);
        console.log("user", provider.dataValues.ServiceProviderLocation.ServiceProvider.User.socket_id);
        let providerSocket = provider.dataValues.ServiceProviderLocation.ServiceProvider.User.socket_id;
        io.to(providerSocket).emit('removeRequest', { requestId: request_id })
    });
    let isAssigend;
    // set in databse
    console.log("req id", request_id);
    await RequestServiceProvider.update(
        { request_status: 'Assigned' },
        {
            where: {
                request_id: request_id,
                service_provider_location_id: service_provider_location_id
            }
        }
    ).then(async ([affectedCount]) => {
        console.log("affected count", affectedCount);
        if (affectedCount > 0) {
            return await Request.update(
                {
                    service_provider_location_id: service_provider_location_id,
                    request_status: 'Assigned',
                    worker_id: worker_id
                },
                {
                    where: {
                        request_id: request_id,
                    }
                }
            )
        }
    }).then(async () => {
        // send to worker
        const assigned = await assignWorker(worker_id);
        if (!assigned) {
            return isAssigend = false;
        }
        isAssigend = true;
        return isAssigend;
    }).catch((error) => {
        isAssigend = false;
        console.log(error);
        return isAssigend;
    });
    console.log("isAssigend", isAssigend);

    return isAssigend;
}

const assignWorker = async (workerId) => {
    const isAssigned = await Worker.update({
        is_available: 0
    },
        {
            where: {
                worker_id: workerId,
                is_available: 1
            }
        }).then(() => {
            return true;
        }).catch((err) => {
            console.log(err);
            return false;
        })
    console.log("is assigned worker", isAssigned);
    return isAssigned;
}

exports.getRequestAssignedByWorkerId = async (workerData) => {
    const request = await Request.findAll({
        where: {
            worker_id: workerData.worker_id
        },

        include: [
            {
                model: Customer, as: 'Customer',
                include: [
                    {
                        model: User, as: 'User'
                    }, {
                        model: Car, as: 'Cars'
                    }
                ]
            },

        ]

    });
    request[0].Customer.User.longitude = parseFloat(request[0].Customer.User.longitude)
    request[0].Customer.User.latitude = parseFloat(request[0].Customer.User.latitude)
    return request;
};

exports.changeRequestStatus = async (workerData) => {
    const { request_id, worker_id, request_status } = workerData;
    const isChanged = await Request.update({
        request_status: request_status
    },
        {
            where: {
                request_id,
                worker_id
            }
        }
    )
    console.log("is cahnged", isChanged);
    return isChanged[0] == 0 ? false : true;
}