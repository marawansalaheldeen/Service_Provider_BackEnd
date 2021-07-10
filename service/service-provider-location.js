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
        .catch( error => {
            console.log(error);
            isUpdated = false;
        })

        return isUpdated;
}

exports.getAllRequestsById = async(providerData)=>{
    const { service_provider_location_id } = providerData;

    const requests = await sequelize.query(`SELECT r.*,
    c.user_first_name AS customer_first_name,
    c.user_last_name AS customer_last_name,
    c.user_email AS customer_email,
    c.phone_number AS customer_phone,
    w.user_first_name AS worker_first_name,
    w.user_last_name AS worker_last_name,
    w.user_email AS worker_email,
    w.phone_number AS worker_phone
    FROM request r
    INNER JOIN user c
    ON c.user_id = r.customer_id
    INNER JOIN user w
    ON w.user_id = r.worker_id
    WHERE service_provider_location_id = ${service_provider_location_id}`,
    { type: QueryTypes.SELECT });

    return requests;
}