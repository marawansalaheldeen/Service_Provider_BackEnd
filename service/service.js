const { sequelize, Service, FuelCategory , serviceProviderService , ServiceProviderLocation} = require('../models');

exports.getAllService = async ()=>{
    return await Service.findAll({
        include: [{
             model: FuelCategory, as: 'FuelCategories' 
        }]
    });
}

exports.addService = async (serviceData)=>{
    const { fuel_category_id,service_id,service_provider_location_id} = serviceData;

    const sps = await serviceProviderService.create({
        fuel_category_id,
        service_id,
        service_provider_location_id,
        is_available:1,
    })

    return sps;
}

exports.get_service_by_id = async (service_id)=>{

    return await serviceProviderService.findAll({
        where:{
            service_id:service_id
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

exports.update_service_by_id = async (serviceData)=>{
    const { fuel_category_id,service_id,service_provider_location_id} = serviceData;
    
    const service = await serviceProviderService.findOne(
        {
            where:{service_id}
        }
    )
    service.update({

        fuel_category_id,
        service_provider_location_id,
        is_available:1,

        where:{
            service_id:service_id
        }
    })

    return service
}
