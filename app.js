const express = require('express');

const cors = require("cors");
const config = require('./config');
// const routes = require('./routes');
const db = require('./models');
const control = require('./control.js');
app = express();

const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
      }
});

// const server = http.createServer(app)
// const io = socketio(server)

// socket connection
// const http = require('http').createServer();
// const io = require('socket.io')(http, {
//     cors: {origin: "*"}
// })



// io.on('connection', (socket)=>{
//     console.log('user is connected ...');
//     console.log(socket.id);
//     socket.on('connect', (socket)=>{
//         const sessionID = socket.id;
//         console.log(socket.id);
//     })
//    // io.to(socket.id).emit("this is a message from server");
//     io.to(socket.id).emit('message', 'welcome to on way')
//     // io.to(socketId).emit(/* ... */);

// })



// const { messaging} = require('./utils/pushNotification');

// console.log(messaging);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Enable cors
var corsOptions = {
    origin: "*"
};
app.use(cors(corsOptions));
app.options('*', cors())

app.all('', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    //Auth Each API Request created by user.
    next();
});

// Init DB
db.sequelize
    .sync({
        // force: config.NODE_ENV === 'development' ? true : false
        force:  false 
        // console.log("database connected");
    })
    .then(() => console.log("DB connected"))
    .catch((err) => console.log("error", err));

// app.use('/api', routes);

io.on('connection',(socket)=>{
    console.log("socket connected");
    // console.log("req", req.body);
    socket.on('provider', (data)=>{
        console.log(data);
        console.log(socket.id);

    })
})
app.set('socketio', io);

control(app)


const PORT = 3000 || config.PORT;

http.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})