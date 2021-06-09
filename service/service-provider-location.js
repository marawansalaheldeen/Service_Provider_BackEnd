const {  ServiceProviderLocation, RequestServiceProvider } = require('../models');

exports.createServiceProviderLocation = async (userData) => {
    const { service_provider_id, city, area, street } = userData;
    const serviceProviderLocation = await ServiceProviderLocation.create({
        service_provider_id, city, area, street
    });
    console.log("service location ", serviceProviderLocation);
    userData.service_provider_location_id  = serviceProviderLocation.dataValues.service_provider_location_id ;
    return userData;
}

exports.rejectingCustomerRequest = async (providerData)=>{
    const {request_id, service_provider_location_id} = providerData;
    const requestProvider = await RequestServiceProvider.findOne(
        {
            where:{
                request_id: request_id,
                service_provider_location_id: service_provider_location_id
            }
        }
    )
    const isRejected = await requestProvider.update({
        request_status: "Rejected",
        where:{
            request_id: request_id,
            service_provider_location_id: service_provider_location_id
        }
    })
    // console.log(isRejected);
    return true;
}