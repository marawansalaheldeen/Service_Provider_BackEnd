const { User } = require('../service');

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
            car_maker: req.body.car_maker,
            car_model: req.body.car_model,
            car_license: req.body.car_license,
            company_name: req.body.company_name, 
            company_type: req.body.company_type, 
            contact_role: req.body.contact_role,
            city: req.body.city, 
            area: req.body.area, 
            street: req.body.street
        }

        const user = await User.createUser(userData);
        console.log("contoller", user);
        if (user == false) {
            res.status(400).send({ message: "incorrect username or password" });
        } else {
            res.status(200).send(user);
        }
    } catch (err) {
        // requestHandler.HandleRequest(err, (result) => {
        //     // logger.error(`error`, `userRegister - ${result.errors}`)
        //     console.log(result.errors);
        //     res.status(result.status).send("Data Not Valid");
        // });
    }
};

