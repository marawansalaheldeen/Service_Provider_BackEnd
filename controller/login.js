const loginService = require('../service/user');

exports.userLogin = async (req, res) => {
    let user = await loginService.userLogin(req.body);
    console.log(user);
    if (user == false) {
        res.status(400).send({ message: "incorrect username or password" });
    } else {
        res.status(200).send(user);
    }
}

exports.confirmEmail = async (req, res) => {
    console.log("confirming email", req.decoded.issuer);
    const isConfirmed = await loginService.confirmEmail(req.decoded.issuer);
    if (!isConfirmed) {
        res.status(400).send({ message: "resend confirmation mail" });
    } else {
        res.status(200).send({ message: isConfirmed });
    }
}

exports.resetPasswordEmail = async (req, res) => {
    const emailSent = await loginService.resetPasswordEmail(req.body.userEmail);
    console.log("email sent", emailSent);
    if (emailSent == false) {
        res.status(400).send({ message: "invalid email" });
    } else {
        res.status(200).send({ message: "change password message sent" });
    }
}

exports.resendConfirmEmail = async(req, res)=>{
    console.log("eneterd resend controller");
    const isSent = await loginService.resendConfirmEmail(req.decoded.issuer);
    console.log("is sent", isSent);
    if (!isSent) {
        res.status(400).send({ message: "resend confirmation mail" });
    } else {
        res.status(200).send({ message: "email sent successfully" });
    }
}

exports.changePassword = async (req, res) => {
    const isPasswordChange = await loginService.changePassword(req);
    if (!isPasswordChange) {
        res.status(400).send({ message: "error occuered" });
    } else {
        res.status(200).send({ message: isPasswordChange });
    }
}

exports.getUserData = async (req, res) => {
    // console.log(req.body);
    const user = await loginService.getUser(req.body.user_email);
    if (!user) {
        res.status(400).send({ message: "error occuered" });
    } else {
        res.status(200).send({ message: user });
    }
}

exports.getAllUsers = async (req, res)=>{
    const user = await loginService.getAllUsers();
    if (!user) {
        res.status(400).send({ message: "error occuered" });
    } else {
        res.status(200).send({ message: user });
    }
}

exports.getAllUsersByTypeId = async (req, res)=>{
    const users = await loginService.getAllUsersByTypeId(req.body.user_type_id);
    if (!users) {
        res.status(400).send({ message: "error occuered" });
    } else {
        res.status(200).send({ message: users });
    }
}

exports.getUserById = async(req, res)=>{
    const user = await loginService.getUserById(req.body.user_id);
    if (!user) {
        res.status(400).send({ message: "error occuered" });
    } else {
        res.status(200).send({ message: user });
    }
}