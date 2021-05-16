const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
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

module.exports.sendMail = async(mailOptions)=>{
    const info = await transporter.sendMail(mailOptions, (err, info) => {
        console.log("tranmitted")
        if (err) {
            console.log(err)
            console.log("email Error")
            return false;
        }

        console.log(`** Email sent **`);
        // return true;

        console.log("Message sent: %s", info.messageId);
        return info;
    })
    console.log("out of callback", info);
    return info;
}