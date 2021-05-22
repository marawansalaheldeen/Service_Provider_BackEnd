const { sequelize, Customer, User, Car } = require('../models');
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