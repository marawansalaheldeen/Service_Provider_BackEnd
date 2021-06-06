const { sequelize, Customer, User, Car, Request } = require('../models');
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

exports.updateUserCar = async (carData)=>{
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

exports.requestCustomerService = async (cutomerData, io)=>{
    const lat = cutomerData.latitude;
    const long = cutomerData.longitude;
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
        AND p.service_id = 4  
        HAVING distance_in_km < 50 
        ORDER BY distance_in_km 
        LIMIT 0, 50`,
     { type: QueryTypes.SELECT });

     console.log("availableProviders", availableProviders);
     
     console.log("the io",io);
     console.log("socket", availableProviders[0].socket_id);
     availableProviders.forEach(provider => {
        console.log("v", provider);
        io.to(provider.socket_id).emit('message', `A Customer request place and data, ${lat}, ${long}`)
     })
     

}