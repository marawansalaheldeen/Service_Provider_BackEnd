const loginService = require('../service/user');

module.exports.userLogin = async(req, res)=>{
    const user = await loginService.userLogin(req.body);
    if (user == false) {
        res.status(400).send({ message: "incorrect username or password" });
    } else {
        res.status(200).send(user);
    }
}