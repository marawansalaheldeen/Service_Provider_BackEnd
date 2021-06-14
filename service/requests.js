const {Request,RequestServiceProvider,Customer,User,Service} = require('../models')

exports.getPendingRequests = async (service_provider_location_id)=>{

     return await new Promise ( (resolve, reject) => {

         RequestServiceProvider.findAll({

            where:{
                service_provider_location_id,
                request_status:"Pending"
            },
            include:[
            
                {
                    
                    model:Request,
                    where:{
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
        .then((pendingReq) => {
            resolve(pendingReq)
        })
        .catch((err) => {
            reject(err)
        })
    })
}


