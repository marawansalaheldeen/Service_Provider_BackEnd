

exports.getPendingRequests = async (service_provider_id)=>{
    return await request.findAll({
        where:{
            service_provider_id,
            request_status:"Pending"
        }
    })
}


