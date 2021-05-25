const { sequelize, Service, FuelCategory } = require('../models');

exports.getAllService = async ()=>{
    return await Service.findAll({
        include: [{
             model: FuelCategory, as: 'FuelCategories' 
        }]
    });
}