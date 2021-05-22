const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');

const sendMailService = require('../utils/sendEmail');
const { sequelize, User, Customer, ServiceProvider, Worker, ServiceProviderLocation, Car } = require('../models');
const custoemrService = require('./customer');
const providerService = require('./service-provider');
const workerService = require('./worker');
const config = require('../config');
const { resetPassword } = require('../controller/login');

exports.createUser = async function (userData) {
    var ifExist = await ifUserExist(userData.user_email);
    console.log("checking is done");
    console.log("if exist", ifExist);
    if (!ifExist) {
        const databasepassword = userData.user_password;
        const encryptdPassword = cryptr.encrypt(databasepassword);
        userData.user_password = encryptdPassword;

        const { user_first_name,
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
                user_first_name,
                user_last_name,
                phone_number,
                user_region_id,
                user_email,
                user_password,
                user_type_id,
                longitude,
                latitude
            })
            console.log("user", user.dataValues.user_id);
            if (user._options.isNewRecord) {
                // send email with
                var isSent = await verifyEmail(userData.user_email);

                userData.user_id = user.dataValues.user_id;
                // Worker
                if (userData.user_type_id == 4) {
                    console.log("entered for adding cust", userData.user_type_id);
                    return (await custoemrService.createCustomer(userData));
                } else if (userData.user_type_id == 2) {
                    // Service provider
                    return (await providerService.createServiceProvider(userData));
                } else if (userData.user_type_id == 3) {
                    // worker registered by worker provider
                    return (await workerService.createWorker(userData));
                }
                console.log("plaaaaaaaaaaaaa");
                console.log("is sent", isSent);
                // if (isSent) {
                console.log("return user");
                return user;
                // }
            } else {
                return false;
            }
        } catch (err) {
            console.log(err);
            return false;
        }

    } else {
        return false;
    }
}

async function ifUserExist(user_email) {
    let user = await User.findOne({ where: { user_email: user_email } });
    console.log(user);
    if (user === null) {
        console.log('Not found!');
        return false;
    } else {
        console.log(user instanceof User); // true
        return user;
    }
}

 async function getUserData (user_email) {
    console.log("entered with email", user_email);
    let user = await User.findOne({
        where:
            { user_email: user_email },
        include: [
            {
                model: Customer, as: 'Customer', include: [{
                    model: Car
                }]
            },
            {
                model: ServiceProvider, as: 'ServiceProvider', include: [{
                    model: ServiceProviderLocation
                }]
            },
            { model: Worker, as: 'Worker' }
        ]
    })
    console.log("uuuuuuuuuuu", user);
    return user;
}

exports.getUser = async(userData)=>{
    return await getUserData(userData);
}

exports.getAllUsers = async()=>{
    return await User.findAll();
}

exports.userLogin = async (userData) => {
    var ifExist = await ifUserExist(userData.user_email);

    if (ifExist) {
        console.log("plaaaaa");
        let user = ifExist;
        const decryptdPassword = cryptr.decrypt(user.user_password);
        console.log(decryptdPassword);
        console.log(userData.user_password);
        if (decryptdPassword == userData.user_password) {
            // User login
            // Get user data
            console.log("entered to get user");
            let user_data = await getUserData(user.user_email);
            // console.log("got user", user_data);
            // console.log("got user", user_data.serviceProviderLocation);
            const token = await config.token.createToken(userData.user_email);
            // const allUserData = {
            //     user: user_data,
            //     serviceProviderLocation: user_data.serviceProviderLocation
            // }
            // user_data.token = token;
            console.log(user_data);
            const userr = {
                user_id: user_data.user_id,
                user_type_id: user_data.user_type_id,
                user_first_name: user_data.user_first_name,
                user_last_name: user_data.user_last_name,
                user_email: user_data.user_email,
                phone_number: user_data.phone_number,
                longitude: user_data.longitude,
                latitude: user_data.latitude,
                created_at: user_data.created_at,
                updated_at:user_data.updated_at,
                Customer: user_data.Customer,
                ServiceProvider: user_data.ServiceProvider,
                Worker: user_data.Worker,
                token: token
            }
            console.log("service prov", user_data);
            return userr;

        } else {
            return false;
        }
    } else {
        return false;
    }
}

exports.confirmEmail = async (userEmail) => {
    console.log("userEmail", userEmail);
    const user = await User.findOne({ where: { user_email: userEmail } });
    // console.log(user);
    // Check if record exists in db
    if (user) {
        user.is_confirmed = true;
        await user.save();
        return ("email confirmed successfully");
    } else {
        return false;
    }
}

const verifyEmail = async (email) => {
    console.log("entered sendmail")
    //const emailTemplate = this.VerifyEmail(data)
    const token = config.token.createToken(email);
    console.log(token);
    let mailOptions = {

        from: "ON WAY",
        to: email,
        subject: "🚛 On Way Verify Email 🚛",
        html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
       <html xmlns="http://www.w3.org/1999/xhtml">
       <div  classname="center">
        <head>
         <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
         <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
         <p> <b  style="color:#808080; font-size: 26px; "> On Way </b></p>
      
         <p> <b  style="color:#990000; font-size: 20px; "> Email Confirmation 🚚 </b></p>
      
       </head>
     
       <body  style="margin: 50; padding: 50;">

       <div class="container">
       <div class="card">
         <img style="
         margin-left: 45%;
       " src="https://lh3.googleusercontent.com/ytP9VP86DItizVX2YNA-xTYzV09IS7rh4WexVp7eilIcfHmm74B7odbcwD5DTXmL0PF42i2wnRKSFPBHlmSjCblWHDCD2oD1oaM1CGFcSd48VBKJfsCi4bS170PKxGwji8CPmehwPw=w200-h247-no" alt="Person" class="card__image">
         <p class="card__name"  style="
         line-height: 26px;
         margin-left: 50%;
         font-weight: bold;
       ">ON WAY</p>
         <div class="grid-container">
     
         <h1 style="
         font-family: 'Google Sans';
         font-size: 17px;
         padding: 10px 0;
         line-height: 26px;
         margin-left: 78px;
         color: #000000;
         font-weight: bold;
       ">You're on your way!
       Let's confirm your email address.</h1>
       <p style="
         font-size: 17px;
         padding: 10px 0;
         line-height: 26px;
         margin-left: 78px;
         color: #000000;
         font-weight: bold;
       ">
       By clicking on the following link, you are confirming your email address.</p>
     
         </div>
        
         <form action="http://localhost:3000/confirm/?tk=${token}">
            <input style="
            margin-left: 50%;
            color: #008000;
            font-weight: bold;
          " type="submit" value="Confirm" />
        </form>
       </div>

    
       </body>
       </html>
       `
    }

    await sendMailService.sendMail(mailOptions);

}

exports.resetPasswordEmail = async (userEmail) => {
    const user = ifUserExist(userEmail);
    if (user) {
        const token = config.token.createToken(userEmail);

        let mailOptions = {
            from: "ON WAY",
            to: userEmail,
            subject: "🌻 On Way Password Reset 🌻",
            html: `
                <p style="
                font-size: 17px;
                padding: 10px 0;
                line-height: 26px;
                margin-left: 78px;
                color: #000000;
                font-weight: bold;
              ">Hello From On Way team! </p>
                <p style="
                font-size: 14px;
                line-height: 26px;
                margin-left: 78px;
                color: #000000;
                font-weight: bold;
              ">We heard that you forgot your On Way account password.</p>
                <p style="
                font-size: 14px;
                line-height: 26px;
                margin-left: 78px;
                color: #000000;
                font-weight: bold;
              ">Don't worry! we got you.</p>
                <p style="
                font-size: 14px;
                line-height: 26px;
                margin-left: 78px;
                color: #000000;
                font-weight: bold;
              ">click the button below and enter your new password</p>
                <form action="http://localhost:3000/resetpsw/?tk=${token}">
                    <input style="
                    margin-left: 50%;
                    color: #008000;
                    font-weight: bold;
                " type="submit" value="Change Password" />
                </form>
            `
        }
        console.log(token);
        const info = await sendMailService.sendMail(mailOptions);
        console.log(info);
    } else {
        return false;
    }

}

exports.changePassword = async (userData) => {
    console.log("req", userData.body);
    const encryptdPassword = cryptr.encrypt(userData.body.user_password);
    console.log(userData.decoded);
    const user = await User.findOne({ where: { user_email: userData.decoded.issuer } });
    // console.log(user);
    // Check if record exists in db
    if (user) {
        user.user_password = encryptdPassword;
        await user.save();
        return ("password changed successfully");
    } else {
        return false;
    }
}