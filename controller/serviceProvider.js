const serviceProviderLocation = require('../service/service-provider-location');

exports.serSocketUSerId = (req, res) => {
    var io = req.app.get('socketio');
    io.on('connection',(socket)=>{
        console.log("socket connected");
        // console.log("req", req.body);
        socket.on('provider', (data)=>{
            console.log(data);
            console.log(socket.id);
    
        })
    })
}

exports.rejectingCustomerRequest = async (req, res)=>{
    const isRejectes = await serviceProviderLocation.rejectingCustomerRequest(req.body);
    if (isRejectes == false) {
        res.status(400).send({ message: "incorrect data" });
    } else {
        res.status(200).send({message: "request rejected"});
    }
}

exports.changeServiceStatus = async (req, res)=>{
    const isUpdated = await serviceProviderLocation.changeServiceStatus(req.body);
    console.log("isUpdated", isUpdated);
    if (!isUpdated) {
        res.status(400).send({ message: "incorrect data" });
    } else {
        res.status(200).send({message: "status updated"});
    }
}