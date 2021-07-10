const { sequelize, ServiceProviderLocation, RequestServiceProvider, serviceProviderService,
    Request } = require('../models');
const { QueryTypes, where } = require('sequelize');

exports.createServiceProviderLocation = async (userData) => {
    const { service_provider_id, city, area, street } = userData;
    const serviceProviderLocation = await ServiceProviderLocation.create({
        service_provider_id, city, area, street
    });
    console.log("service location ", serviceProviderLocation);
    userData.service_provider_location_id = serviceProviderLocation.dataValues.service_provider_location_id;
    return userData;
}

exports.rejectingCustomerRequest = async (providerData) => {
    const { request_id, service_provider_location_id } = providerData;
    const requestProvider = await RequestServiceProvider.findOne(
        {
            where: {
                request_id: request_id,
                service_provider_location_id: service_provider_location_id
            }
        }
    )
    const isRejected = await requestProvider.update({
        request_status: "Rejected",
        where: {
            request_id: request_id,
            service_provider_location_id: service_provider_location_id
        }
    })
    // console.log(isRejected);
    return true;
}

exports.changeServiceStatus = async (serviceData) => {
    const { service_provider_location_id, service_id, fuel_category_id, is_available } = serviceData
    let isUpdated;
    await serviceProviderService.findOne({
        where: {
            service_provider_location_id: service_provider_location_id,
            service_id: service_id,
            fuel_category_id: fuel_category_id
        }
    })
        .then(async serviceProviderService => {

            console.log("serviceProviderService", serviceProviderService);
            if (serviceProviderService) {
                await serviceProviderService.update({
                    is_available: is_available
                })
                    .then(async () => {
                        await console.log("true1");
                        isUpdated = true;
                    })
                    .catch((error) => {
                        console.log(error);
                        isUpdated = false;
                    })
            }
        })
        .catch(error => {
            console.log(error);
            isUpdated = false;
        })

    return isUpdated;
}

exports.getAllRequestsById = async (providerData) => {
    const { service_provider_location_id } = providerData;

    const requests = await sequelize.query(`SELECT r.*,
    c.user_first_name AS customer_first_name,
    c.user_last_name AS customer_last_name,
    c.user_email AS customer_email,
    c.phone_number AS customer_phone,
    w.user_first_name AS worker_first_name,
    w.user_last_name AS worker_last_name,
    w.user_email AS worker_email,
    w.phone_number AS worker_phone,
    s.*
    FROM request r
    INNER JOIN user c
    ON c.user_id = r.customer_id
    INNER JOIN user w
    ON w.user_id = r.worker_id
    INNER JOIN service s
    ON s.service_id = r.service_id
    WHERE service_provider_location_id = ${service_provider_location_id}`,
        { type: QueryTypes.SELECT });

    return requests;
}

exports.getProviderTotals = async (providerData) => {
    const { service_provider_location_id } = providerData;

    const completedRequests = await sequelize.query(`
    SELECT COUNT(*) AS total_completed 
    FROM request 
    WHERE service_provider_location_id = ${service_provider_location_id} AND request_status = 'Completed'
    `,
        { type: QueryTypes.SELECT });

    const inprogressRequests = await sequelize.query(`
    SELECT COUNT(*) AS total_inprogress
    FROM request 
    WHERE service_provider_location_id = ${service_provider_location_id} AND request_status = 'Inprogress'
    `,
        { type: QueryTypes.SELECT });

    const totalServices = await sequelize.query(`
    SELECT COUNT(sps_id) AS total_services
    FROM service_provider_service 
    WHERE service_provider_location_id = ${service_provider_location_id} AND is_available = 1
    `,
        { type: QueryTypes.SELECT });

    const totalWorkers = await sequelize.query(`
    SELECT COUNT(worker_id) AS total_workers 
    FROM worker 
    WHERE service_provider_location_id = ${service_provider_location_id}
    `,
        { type: QueryTypes.SELECT });

    // console.log(completedRequests, inprogressRequests, totalServices, totalWorkers);
    let totals = {};
    totals.total_completed = completedRequests[0].total_completed;
    totals.total_inprogress = inprogressRequests[0].total_inprogress;
    totals.total_services = totalServices[0].total_services;
    totals.total_workers = totalWorkers[0].total_workers;
    // console.log(totals);

    return totals;
}