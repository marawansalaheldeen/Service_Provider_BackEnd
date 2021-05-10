const {User} = require('../service');

module.exports.registerUser = async (req, res) => {
    try {
        const userData = {
            user_first_name: req.body.user_first_name.trim(),
            user_last_name: req.body.user_last_name.trim(),
            phone_number: req.body.user_phonenumber,
            user_region_id: req.body.user_region_id,
            user_email: req.body.user_email,
            user_password: req.body.user_password,
            user_type_id: req.body.user_type_id,
            longitude: req.body.user_longitude,
            latitude: req.body.user_latitude,
        }

        const user = User.createUser(userData);
        console.log(user);
    } catch (err) {
        requestHandler.HandleRequest(err, (result) => {
            // logger.error(`error`, `userRegister - ${result.errors}`)
            console.log(result.errors);
            res.status(result.status).send("Data Not Valid");
        });
    }
};

