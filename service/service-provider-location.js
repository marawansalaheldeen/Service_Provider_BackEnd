const { ServiceProviderLocation, RequestServiceProvider, serviceProviderService } = require('../models');

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