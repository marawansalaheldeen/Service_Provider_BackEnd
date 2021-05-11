const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
const nodemailer = require("nodemailer");

const { sequelize, User } = require('../models');
const config = require('../config');

exports.createUser = async function (userData) {
    var ifExist = await ifUserExist(userData.user_email);
    // var ifExist = false;
    console.log("if exist", ifExist);
    if (!ifExist) {
        const databasepassword = userData.user_password;
        const encryptdPassword = cryptr.encrypt(databasepassword);
        userData.user_password = encryptdPassword;
        console.log("entered service");
        console.log();
        userData.id = 1;
        const { id, user_first_name,
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
            console.log("user._options.isNewRecord", user._options.isNewRecord);
            if (user._options.isNewRecord) {
                // send email with
                var isSent = await verifyEmail(userData.user_email);
                console.log("plaaaaaaaaaaaaa");
                console.log("is sent", isSent);
                // if (isSent) {
                    console.log("return user");
                    return user;
                // }
            }
            console.log(user.user_email);
            console.log(user instanceof User)
        } catch (err) {
            console.log(err);
        }

    }
}

async function ifUserExist(user_email) {
    const user = await User.findOne({ where: { user_email: user_email } });
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

exports.transporter = nodemailer.createTransport({
    service: "gmail",
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    rejectUnauthorized: false,
    requireTLS: true,
    auth: {
        user: "onway012@gmail.com",
        pass: "onway012!23"
    }
})

const verifyEmail = async (email) => {
    console.log("entered sendmail")
    //const emailTemplate = this.VerifyEmail(data)
    const token = config.token.createToken(email);
    console.log(token);
    let mailOptions = {

        from: "On Way",
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
         <img src="https://lh3.googleusercontent.com/ytP9VP86DItizVX2YNA-xTYzV09IS7rh4WexVp7eilIcfHmm74B7odbcwD5DTXmL0PF42i2wnRKSFPBHlmSjCblWHDCD2oD1oaM1CGFcSd48VBKJfsCi4bS170PKxGwji8CPmehwPw=w200-h247-no" alt="Person" class="card__image">
         <p class="card__name">ON WAY</p>
         <div class="grid-container">
     
         <h1 style="
         color: #990000;
         font-family: 'Google Sans';
         font-size: 17px;
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
         <ul class="social-icons">
           <li><a href="#"><i class="fa fa-instagram"></i></a></li>
           <li><a href="#"><i class="fa fa-twitter"></i></a></li>
           <li><a href="#"><i class="fa fa-linkedin"></i></a></li>
           <li><a href="#"><i class="fa fa-codepen"></i></a></li>
         </ul>
         <button class="btn draw-border" onclick="window.location.href='http://localhost:3000/confirm/?tk=${token}';">Confirm email address ✔️</button>
     
       </div>

    
       </body>
       </html>
       `
    }
    await this.transporter.sendMail(mailOptions, (err, info) => {
        console.log("tranmitted")
        if (err) {
            console.log(err)
            console.log("email Error")
            return false;
        }

        console.log(`** Email sent **`);
        // return true;

        console.log("Message sent: %s", info.messageId);
        return info
    })

    
}