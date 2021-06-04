const { Car } = require('../models');

module.exports.createCustomerCar= async(userData)=>{
    console.log("entered car service");
    const {customer_id , car_maker, car_model, car_license } = userData;
    const car = await Car.create({
        customer_id , car_maker, car_model, car_license
    });
    console.log("car id", car._options.isNewRecord, car.dataValues.id);
    if(car._options.isNewRecord){
        userData.car_id = car.dataValues.customer_car_id;
        return userData;
    }else{
        console.log("error on creation of customer car");
        
    }
}