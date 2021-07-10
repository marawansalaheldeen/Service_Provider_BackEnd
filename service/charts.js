const { sequelize , request , User, Car, Request, RequestServiceProvider, Service } = require('../models');
const Op = require('sequelize').Op;

module.exports.requestBarChart = async(data)=>{
    const cancelled_req = await Request.count({ 
        where: {
            is_cancelled: 1,
            service_provider_location_id: data.service_provider_location_id
        } 
    })

    const accepted_req = await Request.count({ 
        where: {
            request_status :"Assigned",
            service_provider_location_id: data.service_provider_location_id
            /* is_cancelled: {[Op.ne]: 0 } */
        } 
    })

    const all_req = await Request.count({ 
        where: {
            service_provider_location_id: data.service_provider_location_id,
        } 
    })
    var barCharData= {
        accepted:accepted_req,
        cancelled:cancelled_req,
        no_allrequests:all_req
    } 

    return barCharData
}


module.exports.totalMoneyEarned = async(data)=>{
    const totalAmount = await Request.findAll({
        attributes: [
          data.service_provider_location_id,
          [sequelize.fn('sum', sequelize.col('total_price')), 'total_money'],
        ],
        group: [data.service_provider_location_id],
    });

    const totalFine = await Request.findAll({
        attributes: [
          data.service_provider_location_id,
          [sequelize.fn('sum', sequelize.col('fine')), 'total_money_cancelled'],
        ],
        where:{
            is_cancelled:1
        },
        group: [data.service_provider_location_id],
    });

    var total = totalAmount + totalFine
    var money_data = {
        totalAmount,
        totalFine,
        total
    }
    return money_data
}

