const { Service, FuelCategory, serviceProviderService, ServiceProviderLocation, User, Customer } = require('../models');

exports.getAllService = async (userData) => {
    const { user_id, user_type_id } = userData;
    const services = await Service.findAll({
        include: [{
            model: FuelCategory, as: 'FuelCategories'
        }]
    });
    console.log("get all services", services);
    if (user_type_id == 4) {
        const user = await User.findOne({
            where: {
                user_id
            },
            include: [
                {
                    model: Customer,
                    where: {
                        user_id
                    }
                }
            ]
        })

        services.forEach(service => {
            console.log("service id", service.dataValues.service_id);
            if (service.dataValues.service_id == 2) {
                console.log("fuel", service.dataValues.FuelCategories);
                service.dataValues.FuelCategories.forEach(category => {
                    console.log("caaaat", category.dataValues.fuel_category_price);
                    category.dataValues.fuel_category_price =
                        category.dataValues.fuel_category_price + user.dataValues.Customer.dataValues.total_fees;
                });

            } else {
                console.log("service id", service.dataValues.service_price);

                service.dataValues.service_price = 
                service.dataValues.service_price + user.dataValues.Customer.dataValues.total_fees;
            }
        });
    console.log("service", services);
        return services;

    }else{
        return services;
    }

    // return services;
}

exports.addService = async (serviceData) => {
    const { fuel_category_id, service_id, service_provider_location_id } = serviceData;
    console.log("data", fuel_category_id, service_id, service_provider_location_id);
    const providerService = await serviceProviderService.findOne({
        where: {
            service_id: service_id,
            service_provider_location_id: service_provider_location_id,
            fuel_category_id: fuel_category_id
        }
    })
    console.log("service provider", providerService);
    // console.log("sssssssssss", providerS/ervice);
    if (providerService) {
        return "service allready exist";
    } else {
        const sps = await serviceProviderService.create({
            fuel_category_id,
            service_id,
            service_provider_location_id,
            is_available: 1,
        })
        return sps;
    }

}

exports.get_service_by_id = async (service_provider_location_id) => {

    return await serviceProviderService.findAll({
        where: {
            service_provider_location_id

        },
        include: [
            {
                model: FuelCategory
            },
            {
                model: Service
            },
            {
                model: ServiceProviderLocation
            }
        ]
    })
}

exports.update_service_by_id = async (serviceData) => {
    const { fuel_category_id, service_id, service_provider_location_id } = serviceData;

    const service = await serviceProviderService.findOne(
        {
            where: { service_id }
        }
    )
    service.update({

        fuel_category_id,
        service_provider_location_id,
        is_available: 1,

        where: {
            service_id: service_id
        }
    })

    return service
}
