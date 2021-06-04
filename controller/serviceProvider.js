

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