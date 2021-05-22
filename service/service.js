const { sequelize, Service } = require('../models');

exports.getAllService = async ()=>{
    return await Service.findAll();
}