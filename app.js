const express = require('express');
app = express();
const cors = require("cors");
const config = require('./config');
const routes = require('./routes');
const db = require('./models');
const control = require('./control.js');

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
control(app)


const PORT = 3000 || config.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})