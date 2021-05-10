const { sequelize, User } = require('../models');

exports.createUser = async function (userData) {
    var ifExist = await ifUserExist(userData.phone_number);
    // var ifExist = false;
    console.log("if exist", ifExist);
    if (!ifExist) {
        console.log("entered service");
        console.log();
        userData.id = 1;
        const { id,user_first_name,
            user_last_name,
            phone_number,
            user_region_id,
            user_email,
            user_password,
            user_type_id,
            longitude,
            latitude } = userData;
        try {
            const user = await User.create({
                user_first_name: user_first_name,
                user_last_name: user_last_name,
                phone_number: phone_number,
                user_region_id: user_region_id,
                user_email: user_email,
                user_password: user_password,
                user_type_id: user_type_id,
                longitude: longitude,
                latitude: latitude
            });
            console.log(user.user_email);
            console.log(user instanceof User)

            return user;
        } catch (err) {
            console.log(err);
        }

    }
}

async function ifUserExist(userPhoneNumber) {
    const user = await User.findOne({ where: { phone_number: userPhoneNumber } });
    console.log(user);
    if (user === null) {
        console.log('Not found!');
        return false;
    } else {
        console.log(user instanceof User); // true
        console.log(project.phone_number); // 'My phone_number'
        return true;
    }
}