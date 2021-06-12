const {Request,RequestServiceProvider,Customer,User,Service} = require('../models')

exports.getPendingRequests = async (service_provider_location_id)=>{
    var allPendingReq =  await RequestServiceProvider.findAll({
        where:{
            service_provider_location_id,
            request_status:"Pending"
        },
        include:[
        
            {
                model:Request,
                where:{
                    service_provider_location_id,
                    request_status:"Pending"
                },
                include:[
                    {
                        model:Customer,
                        include:[
                            {
                                model:User
                            }
                        ],                        
                    }
                ],
                include:[{
                    model:Service,
                }]
                

            }
        ]
    })
    
    return allPendingReq
}


