const { sequelize, ServiceProvider } = require('../models');
const providerLocation = require('./service-provider-location');

module.exports.createServiceProvider = async (userData) => {
    console.log("eneterd serv provider");
    const { user_id, company_name, company_type, contact_role } = userData;
    const serviceProvider = await ServiceProvider.create({
        user_id, company_name, company_type, contact_role
    });
    console.log('service prov', serviceProvider.dataValues.service_provider_id);
    userData.service_provider_id = serviceProvider.dataValues.service_provider_id;
    return (await providerLocation.createServiceProviderLocation(userData));
}
