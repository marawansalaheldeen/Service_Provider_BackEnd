const loginService = require('../service/user');

exports.userLogin = async(req, res)=>{
    const user = await loginService.userLogin(req.body);
    if (user == false) {
        res.status(400).send({ message: "incorrect username or password" });
    } else {
        res.status(200).send(user);
    }
}

exports.confirmEmail = async(req, res)=>{
    const isConfirmed = await loginService.confirmEmail(req.decoded.issuer);
    if(!isConfirmed){
        res.status(400).send({ message: "resend confirmation mail" });
    }else{
        res.status(200).send({message: isConfirmed});
    }
}

exports.resetPasswordEmail = async (req, res)=>{
    const emailSent = await loginService.resetPasswordEmail(req.body.userEmail);
    console.log("email sent", emailSent); 
    if(emailSent == false){
        res.status(400).send({ message: "invalid email" });
    }else{
        res.status(200).send({message: "change password message sent"});
    }
}

exports.changePassword = async(req, res)=>{
    const isPasswordChange = await loginService.changePassword(req);
    if(!isPasswordChange){
        res.status(400).send({ message: "error occuered" });
    }else{
        res.status(200).send({message: isPasswordChange});
    }
 }