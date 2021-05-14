const { sequelize, User } = require('../models');

module.exports.isMailVerified = async (req, res)=>{
    const user_email = req.body.user_email;
    const isVerifed = await User.findOne({ where: { user_email: user_email, is_verified: 0} });
    console.log("isVerifed", isVerifed);
    if(isVerifed == null){
        res.status(403).send({message: "email not verified"});
    }
    next();
}