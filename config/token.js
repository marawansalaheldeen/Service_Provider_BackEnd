const jwt = require("jsonwebtoken");
// const { ExpiredSecurityTokenException, UnAuthorizedToken } = require('../helper/exception.js');
// const requestHandler = require('../helper/requestHandler');

// const {TOKEN_KEY} = require('./index');
const jwtExpirySeconds = '8000s'; // 24 hours

// create token by user email
const createToken = (userEmail) => {
    // console.log(TOKEN_KEY);
    const claims = { issuer: userEmail, subject: 'auth' }
    return token = jwt.sign(claims, "token-secret-key", { expiresIn: jwtExpirySeconds })
}

// verify token 
const verifyToken = (token, callback) => {
    jwt.verify(token, "token-secret-key", (err, decoded) => {
        try {
            if (err) {
                if (err.expiredAt) {
                    throw new ExpiredSecurityTokenException('Token Expired')
                } else {
                    throw new UnAuthorizedToken('Token UnAuthorized')
                }

            } else {
                callback("user Verified", decoded.issuer)
            }
        } catch (err) {
            requestHandler.HandleRequest(err, (result) => {
                callback(result, " ");
            })
        }

    });
}




const verifyRequestToken =(req,res,next)=>{
        let token = req.headers['x-access-token'];
        console.log(token);
        jwt.verify(token, "token-secret-key", (err, decoded) => {
            try {
                if (err) {
                    if (err.expiredAt) {
                        res.json('Token Expired');
                    } else {
                        res.json('Token UnAuthorized');
                    }
    
                } else {
                    req.decoded = decoded;
                    next();
                }
            } catch (err) {
                res.status(401).json({'error':'please authnticate'})
            }
        });
}


/* const auth = async (req,res,next)=>{

    try {
         
        const token = req.body.Authorization;
        const decoded = jwt.verify(token,'mytoken')
        
        const user = await User.findOne({_id:decoded._id,'tokens.token':token})

        if(!user){
            throw new Error()
        }

        req.token = token
        req.user = user
        next()

    } catch (error) {
        console.log(error)
        res.status(401).send({'error':'please authnticate'})
    }
}
 */

module.exports = {
    createToken,
    verifyToken,
    verifyRequestToken
}