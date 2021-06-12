const { sequelize, Customer, User, Car, Request, RequestServiceProvider, Service } = require('../models');
const { QueryTypes } = require('sequelize');
const carService = require('./car');

module.exports.createCustomer = async (userData) => {
    console.log("enetered customer service", userData)
    const { user_id } = userData;
    console.log("user id created", user_id);
    const customer = await Customer.create({
        user_id: user_id
    });
    console.log("customer", customer);
    userData.customer_id = customer.dataValues.customer_id;
    if (customer._options.isNewRecord) {

        // Insert customer car
        return (await carService.createCustomerCar(userData));
    } else {
        console.log("error in creation customer");
    }

}

exports.updateCustomer = async (customerData) => {
    const { user_id, user_type_id, user_first_name, user_last_name, phone_number } = customerData;
    console.log(user_id, user_type_id, user_first_name);

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

exports.updateUserCar = async (carData) => {
    const { customer_car_id, car_maker, car_model, car_license } = carData;
    console.log(customer_car_id, car_maker, car_model, car_license);

    const car = await Car.findOne(
        {
            where: { customer_car_id }
        }
    )
    console.log("car", car);
    car.update(
        {
            car_maker,
            car_model,
            car_license

        },
        {
            where: { customer_car_id }
        }
    )
    // console.log(userr);
    return car;
}

const createRequest = async (requestData) => {
    console.log("req data", requestData);
    const {
        customer_id,
        service_id,
        fuel_category_id,
        total_price
    } = requestData;
    const request = await Request.create({
        customer_id,
        service_id,
        fuel_category_id,
        total_price
    });
    console.log("req", request);
    requestData.request_id = request.dataValues.request_id;
    if (request._options.isNewRecord) {
        return requestData;
        // // Insert customer car
        // return (await carService.createCustomerCar(userData));
    } else {
        console.log("error in creation customer");
    }
}

const setClosestServiceProviderToCustomer = async (serviceProviders, request_id) => {
    // const {
    //     request_id,
    //     service_provider_location_id
    // } = requestData;
    // const reqeustProvider = await RequestServiceProvider.create({
    //     request_id,
    //     service_provider_location_id
    // });
    // console.log("reqeustProvider", reqeustProvider);
    // requestData.request_sp_id = reqeustProvider.dataValues.request_sp_id;
    // if (reqeustProvider._options.isNewRecord) {
    //     return requestData;
    //     // // Insert customer car
    //     // return (await carService.createCustomerCar(userData));
    // } else {
    //     console.log("error in creation customer");
    // }
    console.log("req for each provider", request_id);

    return serviceProviders.forEach(async provider => {
        console.log("provider", provider);
        let reqeustProvider = await RequestServiceProvider.create({
            request_id: request_id,
            service_provider_location_id: provider.service_provider_location_id
        });
    });

    // RequestServiceProvider.bulkCreate(values, { returning: true })
    //     .then(function (response) {
    //         console.log(response);
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     })
}

exports.requestCustomerService = async (cutomerData, io) => {
    const lat = cutomerData.latitude;
    const long = cutomerData.longitude;
    // create request 
    const requestData = await createRequest(cutomerData);
    // get the closest service providers and send them request
    const availableProviders = await sequelize.query(`SELECT * ,(6371 * acos(cos( radians( ${lat} ) ) * cos( radians(latitude)) * 
        cos( radians(longitude) - radians ( ${long} ) ) + sin( radians( ${lat} ))  * 
        sin(radians(latitude))   )) AS distance_in_km 
        FROM user u
        INNER JOIN service_provider s
        ON s.user_id = u.user_id
        INNER JOIN service_provider_location l
        ON l.service_provider_id = s.service_provider_id
        INNER JOIN service_provider_service p
        ON p.service_provider_location_id = l.service_provider_location_id
        AND p.service_id = ${cutomerData.service_id}  
        HAVING distance_in_km < 50 
        ORDER BY distance_in_km 
        LIMIT 0, 50`,
        { type: QueryTypes.SELECT });

    console.log("availableProviders", availableProviders);
    // set available providers in database 
    await setClosestServiceProviderToCustomer(availableProviders, requestData.request_id);
    // console.log("the io", io);
    let obj = {
        request_id: requestData.request_id,
        customer_id: cutomerData.customer_id,
        user_first_name: cutomerData.user_first_name,
        user_last_name: cutomerData.user_last_name,
        phone_number: cutomerData.phone_number,
        is_confirmed: cutomerData.is_confirmed,
        car_maker: cutomerData.car_maker,
        car_model: cutomerData.car_model,
        car_license: cutomerData.car_license,
        cut_lat: lat,
        cust_lng: long
    }
    // console.log("socket", availableProviders[0].socket_id);
    availableProviders.forEach(provider => {
        console.log("v", provider);
        io.to(provider.socket_id).emit('message', { request: obj })
    })

    // return true;
}

exports.getCustomerRequestes = async (customerData) => {
    const { customer_id } = customerData;
    const requests = await Request.findAll({
        where: {
            customer_id
        },
        include: [
            {model: Service, as: 'Service'}
        ],
        order: [
            ['created_at', 'DESC']
        ]
    });
    return requests;
}