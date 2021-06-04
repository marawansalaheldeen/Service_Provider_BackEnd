const router = require('./routes');

module.exports = (app)=>{
    // console.log(app);
    // router(io);
    app.use(router);
} 