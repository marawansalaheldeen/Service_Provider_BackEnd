const { sequelize, ServiceProviderLocation } = require('../models');

module.exports.createServiceProviderLocation = async (userData) => {
    const { service_provider_id, city, area, street } = userData;
    const serviceProviderLocation = await ServiceProviderLocation.create({
        service_provider_id, city, area, street
    });
    console.log("service location ", serviceProviderLocation);
    userData.service_provider_location_id  = serviceProviderLocation.dataValues.service_provider_location_id ;
    return userData;
}
